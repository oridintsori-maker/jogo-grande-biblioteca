'use strict';
/*
 * Servidor multiplayer — Aurora Tri (Capítulo 1 e Arena de treino)
 * ------------------------------------------------------
 * - Entrega o jogo (index.html), as músicas da pasta musica/ (se existirem) e um canal WebSocket em /ws.
 * - Administra salas de até 3 jogadores identificadas por um código de 5 caracteres.
 * - O 3º jogador pode entrar no meio da partida quando o anfitrião libera (porta entre salas / biblioteca).
 * - O anfitrião (J1) simula a partida; o servidor apenas organiza as salas e retransmite as mensagens.
 * - Trata desconexões com prazo de reconexão, sala vazia, sala cheia, código inválido e limpeza de salas.
 * Sem dependências: só precisa do Node.js 18 ou mais novo.  Uso:  node server.js   (porta padrão 8080)
 */
const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = Number(process.env.PORT) || 8080;
const HOST = process.env.HOST || '0.0.0.0';
const GAME_FILE = process.env.GAME_FILE || path.join(__dirname, 'index.html');
const MUSIC_DIR = path.join(__dirname, 'musica');
const AUDIO_TYPES = { '.mp3': 'audio/mpeg', '.ogg': 'audio/ogg', '.m4a': 'audio/mp4', '.wav': 'audio/wav' };
const GRACE_MS = Number(process.env.GRACE_MS) || 30000;      // tempo para um jogador reconectar
const MAX_ROOMS = Number(process.env.MAX_ROOMS) || 500;
const MAX_MSG = 256 * 1024;                                  // tamanho máximo de uma mensagem
const MAX_MSGS_PER_SEC = 300;
const ROOM_MAX_AGE_MS = 6 * 60 * 60 * 1000;                  // salas são encerradas após 6 h
const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';         // sem 0/O e 1/I para evitar confusão
const CHARS = new Set(['zane', 'viajante', 'deus', 'taka', 'clarice']);
const STORY_CHARS = new Set(['zane', 'viajante', 'deus']); // Capítulo 1 (Taka e Clarice jogam na Arena de treino)
const MODES = new Set(['story', 'arena']);
const CHAR_ORDER = ['zane', 'viajante', 'deus'];
const MAX_PLAYERS = 3;
const WS_GUID = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';

const rooms = new Map();
const conns = new Set();
const log = (...a) => console.log(new Date().toISOString().slice(11, 19), ...a);

// ------------------------------------------------------------------ WebSocket (RFC 6455)
class WSConn {
  constructor(socket) {
    this.socket = socket; this.buf = Buffer.alloc(0); this.frags = null; this.fragLen = 0;
    this.open = true; this.closed = false; this.alive = true; this.handlers = {};
    socket.setNoDelay(true);
    socket.on('data', d => this.onData(d));
    socket.on('close', () => this.onClose());
    socket.on('error', () => this.onClose());
  }
  on(ev, fn) { this.handlers[ev] = fn; }
  onData(d) {
    this.buf = this.buf.length ? Buffer.concat([this.buf, d]) : d;
    try { while (this.open && this.parse()); } catch (e) { this.close(1002); }
  }
  parse() {
    const b = this.buf;
    if (b.length < 2) return false;
    const fin = (b[0] & 0x80) !== 0, op = b[0] & 0x0f, masked = (b[1] & 0x80) !== 0;
    let len = b[1] & 0x7f, off = 2;
    if (len === 126) { if (b.length < 4) return false; len = b.readUInt16BE(2); off = 4; }
    else if (len === 127) {
      if (b.length < 10) return false;
      if (b.readUInt32BE(2) !== 0) { this.close(1009); return false; }
      len = b.readUInt32BE(6); off = 10;
    }
    if (len > MAX_MSG) { this.close(1009); return false; }
    if (!masked) { this.close(1002); return false; }                 // clientes sempre mascaram
    if (b.length < off + 4 + len) return false;
    const mask = b.subarray(off, off + 4); off += 4;
    const payload = Buffer.allocUnsafe(len);
    for (let i = 0; i < len; i++) payload[i] = b[off + i] ^ mask[i & 3];
    this.buf = b.subarray(off + len);
    this.alive = true;
    switch (op) {
      case 0x8: this.close(1000); return false;                        // close
      case 0x9: this.frame(0xA, payload); return true;                 // ping -> pong
      case 0xA: return true;                                           // pong
      case 0x1: case 0x2:
        if (this.frags) { this.close(1002); return false; }
        if (fin) this.emit(payload); else { this.frags = [payload]; this.fragLen = len; }
        return true;
      case 0x0:
        if (!this.frags) { this.close(1002); return false; }
        this.frags.push(payload); this.fragLen += len;
        if (this.fragLen > MAX_MSG) { this.close(1009); return false; }
        if (fin) { const all = Buffer.concat(this.frags); this.frags = null; this.emit(all); }
        return true;
      default: this.close(1002); return false;
    }
  }
  emit(buf) { if (this.handlers.message) this.handlers.message(buf.toString('utf8')); }
  frame(op, payload) {
    if (!this.open || this.socket.destroyed) return;
    const len = payload.length; let head;
    if (len < 126) head = Buffer.from([0x80 | op, len]);
    else if (len < 65536) { head = Buffer.alloc(4); head[0] = 0x80 | op; head[1] = 126; head.writeUInt16BE(len, 2); }
    else { head = Buffer.alloc(10); head[0] = 0x80 | op; head[1] = 127; head.writeUInt32BE(0, 2); head.writeUInt32BE(len, 6); }
    this.socket.write(Buffer.concat([head, payload]));
  }
  send(obj) { this.frame(0x1, Buffer.from(typeof obj === 'string' ? obj : JSON.stringify(obj), 'utf8')); }
  ping() { this.frame(0x9, Buffer.alloc(0)); }
  close(code = 1000) {
    if (!this.open) return;
    const p = Buffer.alloc(2); p.writeUInt16BE(code, 0);
    try { this.frame(0x8, p); } catch (e) { /* ignora */ }
    this.open = false;
    try { this.socket.end(); } catch (e) { /* ignora */ }
    setTimeout(() => this.socket.destroy(), 1000).unref();
    this.onClose();
  }
  terminate() { this.open = false; this.socket.destroy(); this.onClose(); }
  onClose() {
    if (this.closed) return;
    this.closed = true; this.open = false;
    if (this.handlers.close) this.handlers.close();
  }
}

// Músicas: só arquivos com nome simples dentro de musica/ (sem subpastas), com suporte a Range
// (o navegador pede pedaços do arquivo para tocar e repetir a faixa).
function serveMusic(req, res, name) {
  const ext = path.extname(name).toLowerCase();
  if (!/^[a-z0-9_-]+\.(mp3|ogg|m4a|wav)$/i.test(name) || !AUDIO_TYPES[ext]) { res.writeHead(404); res.end(); return; }
  const file = path.join(MUSIC_DIR, name);
  fs.stat(file, (err, st) => {
    if (err || !st.isFile()) { res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }); res.end('Música não encontrada'); return; }
    const head = { 'Content-Type': AUDIO_TYPES[ext], 'Accept-Ranges': 'bytes', 'Cache-Control': 'public, max-age=3600' };
    const m = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range || '');
    let start = 0, end = st.size - 1, code = 200;
    if (m && (m[1] || m[2])) {
      if (m[1]) { start = Number(m[1]); if (m[2]) end = Math.min(Number(m[2]), st.size - 1); }
      else { start = Math.max(0, st.size - Number(m[2])); }
      if (start > end || start >= st.size) { res.writeHead(416, { 'Content-Range': 'bytes */' + st.size }); res.end(); return; }
      code = 206; head['Content-Range'] = 'bytes ' + start + '-' + end + '/' + st.size;
    }
    head['Content-Length'] = end - start + 1;
    res.writeHead(code, head);
    if (req.method === 'HEAD') { res.end(); return; }
    fs.createReadStream(file, { start, end }).on('error', () => res.destroy()).pipe(res);
  });
}

// ------------------------------------------------------------------ HTTP: jogo + músicas + /health
const server = http.createServer((req, res) => {
  const url = (req.url || '/').split('?')[0];
  if (req.method !== 'GET' && req.method !== 'HEAD') { res.writeHead(405); res.end(); return; }
  if (url === '/' || url === '/index.html') {
    fs.readFile(GAME_FILE, (err, data) => {
      if (err) { res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' }); res.end('index.html não encontrado ao lado do server.js'); return; }
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-cache' });
      res.end(req.method === 'HEAD' ? undefined : data);
    });
    return;
  }
  if (url === '/health') {
    let players = 0;
    for (const r of rooms.values()) players += r.players.filter(p => p && p.connected).length;
    res.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
    res.end(JSON.stringify({ ok: true, rooms: rooms.size, players, uptime: Math.round(process.uptime()) }));
    return;
  }
  if (url === '/favicon.ico') { res.writeHead(204); res.end(); return; }
  if (url === '/musica/lista.json') { // lista das faixas disponíveis: o jogo só pede o que existe
    fs.readdir(MUSIC_DIR, (err, names) => {
      const list = err ? [] : names.filter(n => /^[a-z0-9_-]+\.(mp3|ogg|m4a|wav)$/i.test(n));
      res.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
      res.end(JSON.stringify(list));
    });
    return;
  }
  if (url.startsWith('/musica/')) { let n = ''; try { n = decodeURIComponent(url.slice(8)); } catch (e) {} serveMusic(req, res, n); return; }
  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }); res.end('Não encontrado');
});

server.on('upgrade', (req, socket, head) => {
  const url = (req.url || '').split('?')[0];
  const key = req.headers['sec-websocket-key'];
  if (url !== '/ws' || !key || String(req.headers.upgrade || '').toLowerCase() !== 'websocket') {
    socket.end('HTTP/1.1 400 Bad Request\r\nConnection: close\r\n\r\n'); return;
  }
  const accept = crypto.createHash('sha1').update(key + WS_GUID).digest('base64');
  socket.write('HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Accept: ' + accept + '\r\n\r\n');
  const ws = new WSConn(socket);
  onConnection(ws);
  if (head && head.length) ws.onData(head);
});

// ------------------------------------------------------------------ Salas
const roomPlayers = room => room.players.filter(Boolean);
const newToken = () => crypto.randomBytes(16).toString('hex');
function makeCode() {
  for (let tries = 0; tries < 2000; tries++) {
    let c = ''; for (let i = 0; i < 5; i++) c += ALPHABET[crypto.randomInt(ALPHABET.length)];
    if (!rooms.has(c)) return c;
  }
  return null;
}
function lobbyState(room, you) {
  return { t: 'lobby', room: room.code, phase: room.phase, you, mode: room.mode || 'story',
    players: roomPlayers(room).map(p => ({ slot: p.slot, char: p.char, ready: p.ready, connected: p.connected })) };
}
function broadcastLobby(room) { for (const p of roomPlayers(room)) if (p.connected) p.ws.send(lobbyState(room, p.slot)); }
function others(room, slot, msg) { const s = typeof msg === 'string' ? msg : JSON.stringify(msg); for (const p of roomPlayers(room)) if (p.slot !== slot && p.connected) p.ws.send(s); }
const playerList = room => roomPlayers(room).map(p => ({ slot: p.slot, char: p.char }));

// Cada personagem só pode ser escolhido por um jogador da sala.
const charTaken = (room, ch, except) => roomPlayers(room).some(p => p.slot !== except && p.char === ch);
function freeChar(room, want, except) {
  if (CHARS.has(want) && !charTaken(room, want, except)) return want;
  return CHAR_ORDER.find(ch => !charTaken(room, ch, except)) || 'zane';
}
function addPlayer(room, slot, ws, char) {
  room.players[slot] = { slot, ws, token: newToken(), char: freeChar(room, char, slot), ready: false, connected: true, timer: null };
  ws.client.room = room; ws.client.slot = slot; room.active = Date.now();
}
function removePlayer(room, slot, reason) {
  const p = room.players[slot]; if (!p) return;
  clearTimeout(p.timer); room.players[slot] = null;
  if (p.ws && p.ws.client && p.ws.client.room === room) { p.ws.client.room = null; p.ws.client.slot = -1; }
  if (roomPlayers(room).length === 0) { rooms.delete(room.code); log('sala encerrada', room.code, '(' + reason + ')'); return; }
  if (slot === 0) {
    // O anfitrião saiu de vez: o próximo jogador assume como anfitrião e a sala volta para a espera.
    const idx = room.players.findIndex(p => p);
    const o = room.players[idx]; room.players[idx] = null; o.slot = 0; room.players[0] = o;
    if (o.ws && o.ws.client && o.ws.client.room === room) o.ws.client.slot = 0;
    room.phase = 'lobby'; room.joinable = false; for (const q of roomPlayers(room)) q.ready = false;
    for (const q of roomPlayers(room)) if (q.connected) q.ws.send({ t: 'to_lobby', reason: q === o ? 'host_left' : 'host_changed' });
  } else if (room.phase === 'game') {
    others(room, slot, { t: 'peer_gone', slot });
  }
  broadcastLobby(room);
  log('saiu', room.code, 'J' + (slot + 1), '(' + reason + ')');
}
function leaveCurrent(ws, reason) { const c = ws.client; if (c && c.room) removePlayer(c.room, c.slot, reason); }

function onConnection(ws) {
  conns.add(ws);
  ws.client = { room: null, slot: -1, count: 0, windowStart: Date.now() };
  ws.on('message', raw => {
    const c = ws.client, now = Date.now();
    if (now - c.windowStart >= 1000) { c.windowStart = now; c.count = 0; }
    if (++c.count > MAX_MSGS_PER_SEC) { ws.close(1008); return; }
    let m; try { m = JSON.parse(raw); } catch (e) { return; }
    if (!m || typeof m.t !== 'string') return;
    try { handle(ws, m); } catch (e) { log('erro ao tratar mensagem', e && e.message); }
  });
  ws.on('close', () => { conns.delete(ws); onSocketClose(ws); });
}

function handle(ws, m) {
  const c = ws.client, room = c.room, me = room ? room.players[c.slot] : null;
  switch (m.t) {
    case 'ping': ws.send({ t: 'pong', c: m.c }); return;

    case 'create': {
      leaveCurrent(ws, 'leave');
      if (rooms.size >= MAX_ROOMS) { ws.send({ t: 'error', code: 'server_full' }); return; }
      const code = makeCode(); if (!code) { ws.send({ t: 'error', code: 'server_full' }); return; }
      const r = { code, phase: 'lobby', mode: 'story', players: new Array(MAX_PLAYERS).fill(null), created: Date.now(), active: Date.now(), joinable: false };
      rooms.set(code, r); addPlayer(r, 0, ws, m.char);
      ws.send({ t: 'created', room: code, slot: 0, token: r.players[0].token });
      broadcastLobby(r); log('sala criada', code);
      return;
    }

    case 'join': {
      const code = String(m.room || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
      if (code.length !== 5) { ws.send({ t: 'error', code: 'invalid' }); return; }
      const r = rooms.get(code);
      if (!r) { ws.send({ t: 'error', code: 'not_found' }); return; }
      if (room === r) { ws.send({ t: 'joined', room: code, slot: c.slot, token: me.token }); broadcastLobby(r); return; }
      // Durante a partida só dá para entrar quando o anfitrião libera (transição entre salas).
      if (r.phase === 'game' && !r.joinable) { ws.send({ t: 'error', code: 'in_game' }); return; }
      let slot = r.players.findIndex(p => !p);
      if (slot < 0 && r.phase === 'lobby') {  // na sala de espera, a vaga de quem caiu pode ser ocupada por outra pessoa
        const idx = r.players.findIndex(p => p && !p.connected);
        if (idx > 0) { removePlayer(r, idx, 'replaced'); slot = r.players.findIndex(p => !p); }
      }
      if (slot < 0) { ws.send({ t: 'error', code: 'full' }); return; }
      leaveCurrent(ws, 'leave');
      if (!rooms.has(code)) { ws.send({ t: 'error', code: 'not_found' }); return; }
      addPlayer(r, slot, ws, m.char);
      const np = r.players[slot];
      if (r.phase === 'game') {
        np.ready = true;
        ws.send({ t: 'joined', room: code, slot, token: np.token, phase: 'game', mode: r.mode, players: playerList(r) });
        others(r, slot, { t: 'peer_joined', slot, char: np.char });
      } else ws.send({ t: 'joined', room: code, slot, token: np.token });
      broadcastLobby(r); log('entrou', code, 'J' + (slot + 1), r.phase === 'game' ? '(no meio da partida)' : '');
      return;
    }

    case 'resume': {
      const code = String(m.room || '').toUpperCase();
      const r = rooms.get(code);
      const p = r && roomPlayers(r).find(q => q.token === m.token && typeof m.token === 'string');
      if (!p) { ws.send({ t: 'error', code: 'resume_failed' }); return; }
      if (room && room !== r) leaveCurrent(ws, 'leave');
      const old = p.ws;
      clearTimeout(p.timer); p.timer = null; p.ws = ws; p.connected = true;
      ws.client.room = r; ws.client.slot = p.slot; r.active = Date.now();
      if (old && old !== ws) { try { old.client.room = null; old.close(4000); } catch (e) { /* ignora */ } }
      if (r.phase === 'game' && p.slot === 0 && !m.hasGame) {
        // O anfitrião recarregou a página e perdeu a simulação: a sala volta para a espera.
        r.phase = 'lobby'; r.joinable = false; for (const q of roomPlayers(r)) q.ready = false;
        ws.send({ t: 'resumed', room: code, slot: p.slot, phase: 'lobby', players: playerList(r) });
        others(r, 0, { t: 'to_lobby', reason: 'host_reload' });
      } else {
        ws.send({ t: 'resumed', room: code, slot: p.slot, phase: r.phase, mode: r.mode, players: playerList(r) });
        others(r, p.slot, { t: 'peer_back', slot: p.slot });
      }
      broadcastLobby(r); log('reconectou', code, 'J' + (p.slot + 1));
      return;
    }

    case 'char':
      if (!me || room.phase !== 'lobby' || !CHARS.has(m.char)) return;
      if (charTaken(room, m.char, me.slot)) { ws.send({ t: 'error', code: 'char_taken' }); broadcastLobby(room); return; }
      me.char = m.char; broadcastLobby(room); return;

    case 'mode':  // o anfitrião escolhe o modo na sala de espera: Capítulo 1 ou Arena de treino
      if (!me || c.slot !== 0 || room.phase !== 'lobby' || !MODES.has(m.v)) return;
      room.mode = m.v; broadcastLobby(room); return;

    case 'joinable':  // o anfitrião libera/fecha a entrada no meio da partida
      if (!me || c.slot !== 0 || room.phase !== 'game') return;
      room.joinable = !!m.v; return;

    case 'ready':
      if (!me || room.phase !== 'lobby') return;
      me.ready = !!m.v; broadcastLobby(room); return;

    case 'start': {
      if (!me) return;
      if (c.slot !== 0) { ws.send({ t: 'error', code: 'not_host' }); return; }
      const ps = roomPlayers(room);
      if (room.phase !== 'lobby' || ps.length < 2 || !ps.every(p => p.connected && p.ready)) { ws.send({ t: 'error', code: 'not_ready' }); return; }
      if ((room.mode || 'story') === 'story' && ps.some(p => !STORY_CHARS.has(p.char))) { ws.send({ t: 'error', code: 'story_chars' }); return; }
      room.phase = 'game'; room.active = Date.now(); room.joinable = false;
      const list = playerList(room);
      for (const p of ps) p.ws.send({ t: 'start', mode: room.mode || 'story', players: list });
      broadcastLobby(room); log('partida iniciada', room.code, list.map(p => p.char).join(' + '));
      return;
    }

    case 'lobby_return':
      if (!me || c.slot !== 0 || room.phase !== 'game') return;
      room.phase = 'lobby'; room.joinable = false; for (const p of roomPlayers(room)) p.ready = false;
      for (const p of roomPlayers(room)) if (p.connected) p.ws.send({ t: 'to_lobby', reason: 'host' });
      broadcastLobby(room); return;

    case 'leave': leaveCurrent(ws, 'leave'); return;

    case 'g':  // mensagens da partida: retransmitidas ao outro jogador da sala
      if (!me || room.phase !== 'game') return;
      room.active = Date.now();
      others(room, c.slot, '{"t":"g","from":' + c.slot + ',"d":' + JSON.stringify(m.d === undefined ? null : m.d) + '}');
      return;

    default: ws.send({ t: 'error', code: 'bad_request' });
  }
}

function onSocketClose(ws) {
  const c = ws.client; if (!c || !c.room) return;
  const room = c.room, p = room.players[c.slot];
  if (!p || p.ws !== ws) return;
  p.connected = false;
  others(room, p.slot, { t: 'peer_left', slot: p.slot });
  broadcastLobby(room);
  log('desconectou', room.code, 'J' + (p.slot + 1), '— aguardando reconexão');
  // Mantém a vaga por um tempo; depois disso o jogador é removido (e a sala, se ficar vazia).
  p.timer = setTimeout(() => { if (room.players[p.slot] === p && !p.connected) removePlayer(room, p.slot, 'timeout'); }, GRACE_MS);
  p.timer.unref && p.timer.unref();
}

// Batimentos: derruba conexões mortas (ex.: aba fechada sem aviso, Wi-Fi caiu).
setInterval(() => {
  for (const ws of conns) { if (!ws.alive) { ws.terminate(); continue; } ws.alive = false; ws.ping(); }
}, 20000).unref();
// Limpeza: salas sem ninguém conectado ou muito antigas não ficam ocupando recursos.
setInterval(() => {
  const now = Date.now();
  for (const r of [...rooms.values()]) {
    const anyone = roomPlayers(r).some(p => p.connected);
    if ((!anyone && now - r.active > GRACE_MS * 2) || now - r.created > ROOM_MAX_AGE_MS) {
      for (const p of roomPlayers(r)) { clearTimeout(p.timer); if (p.connected) { p.ws.client.room = null; p.ws.send({ t: 'error', code: 'resume_failed' }); } }
      rooms.delete(r.code); log('sala removida pela limpeza', r.code);
    }
  }
}, 60000).unref();

server.listen(PORT, HOST, () => {
  log('Aurora Tri — servidor em http://localhost:' + PORT + '  (WebSocket em /ws)');
});
for (const sig of ['SIGINT', 'SIGTERM']) process.on(sig, () => { log('encerrando…'); server.close(); process.exit(0); });
