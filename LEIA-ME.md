# Expedição da Grande Biblioteca — v3

Jogo em HTML com dois personagens (**Zane** e o **Viajante dos Espelhos**) e **multiplayer online para 2 jogadores por código de sala**.

| Arquivo | Para que serve |
|---|---|
| `index.html` | O jogo inteiro (um arquivo só). Funciona sozinho para jogar solo. |
| `server.js` | Servidor multiplayer (Node.js, **sem dependências** — não precisa de `npm install`). Também entrega o jogo pelo navegador. |
| `package.json` | Informa à hospedagem como iniciar o servidor (`node server.js`). |

---

## 1. Jogar sozinho

Dê dois cliques no `index.html`. Escolha o personagem e clique em **JOGAR**. Não precisa de servidor nem de internet.

## 2. Jogar online (2 computadores, qualquer rede)

O multiplayer precisa do `server.js` rodando em algum lugar acessível pela internet. Depois disso, os dois jogadores só abrem o endereço do servidor no navegador.

### Opção A — Hospedar de graça no Render (recomendado; tudo pelo navegador, não instala nada)

1. Crie uma conta em **github.com** e um repositório novo (pode ser privado).
2. No repositório, clique em **Add file → Upload files** e envie `index.html`, `server.js` e `package.json`.
3. Crie uma conta em **render.com** e clique em **New → Web Service**. Conecte o GitHub e escolha o repositório.
4. Preencha:
   - **Language/Runtime:** Node
   - **Build Command:** deixe vazio (ou `npm install`, que não instala nada)
   - **Start Command:** `node server.js`
   - **Instance Type:** Free
   - (opcional) **Health Check Path:** `/health`
5. Clique em **Deploy**. Ao terminar, o Render mostra um endereço como `https://expedicao-xxxx.onrender.com`.
6. Esse endereço **é o jogo**: os dois jogadores abrem esse link no navegador.

> No plano gratuito, o servidor "adormece" depois de 15 minutos sem ninguém jogando e leva cerca de 1 minuto para acordar no primeiro acesso. Durante uma partida ele fica acordado. Se o Render reiniciar o servidor, as salas abertas se perdem e é só criar outra.

### Opção B — Rodar no seu próprio computador (precisa do Node.js 18+)

```bash
node server.js
```

- Abra `http://localhost:8080` no navegador.
- **Mesma rede (Wi-Fi de casa):** o outro computador abre `http://SEU-IP-LOCAL:8080`. Descubra o IP com `ipconfig` no Windows ou `ip addr` no Linux.
- **Redes diferentes (pela internet):** crie um túnel público, por exemplo com o Cloudflare Tunnel:
  ```bash
  cloudflared tunnel --url http://localhost:8080
  ```
  Ele mostra um link `https://….trycloudflare.com`. Os dois jogadores abrem esse link. O seu computador precisa ficar ligado com o servidor e o túnel abertos.

Para usar outra porta: `PORT=3000 node server.js` (no Windows/PowerShell: `$env:PORT=3000; node server.js`).

### Abrir o `index.html` direto e jogar online

Também funciona. Em **MULTIPLAYER ONLINE → Endereço do servidor**, digite o endereço onde o servidor está, por exemplo `expedicao-xxxx.onrender.com`. O jogo lembra esse endereço para as próximas vezes.

## 3. Criar uma sala e chamar um amigo

1. Os dois abrem o jogo e clicam em **MULTIPLAYER ONLINE**.
2. **Quem cria:** clica em **CRIAR SALA**. Aparece um código de 5 caracteres, por exemplo `K7M2Q`. Clique em **COPIAR CÓDIGO** e mande para o amigo pelo WhatsApp, Discord etc.
3. **Quem entra:** digita o código e clica em **ENTRAR NA SALA**.
4. Cada um escolhe seu personagem. Podem escolher o mesmo, e a escolha aparece para os dois.
5. Os dois clicam em **ESTOU PRONTO**. O anfitrião (J1) clica em **INICIAR PARTIDA**.

Durante a partida:
- **Pausa (Esc / Start / II):** pausa para os dois.
- **Se alguém cair da internet:** o outro vê o aviso e o jogo espera até 30 segundos pela volta. Recarregar a página também reconecta.
- **No fim da partida:** o anfitrião escolhe **Enter** (jogar de novo) ou **M** (voltar à sala).

---

## 4. Controles

| Ação | Teclado | Gamepad | Touch |
|---|---|---|---|
| Mover (8 direções) | WASD / Setas | Analógico / D-pad | Joystick |
| Atacar (segure para carregar) | Z | RT | ATQ |
| Zane: trocar arma · Viajante: Correntes ↔ Amarras | X | RB | TROCAR / FORMA |
| Zane: recarregar · Viajante: Véu | R | Y | REC / VÉU |
| Zane: esquivar · Viajante: Travessia Espelhada | C | LT | ESQ / TRAV |
| Viajante: Ouroboros | F | LB | OURO |
| Pausar | Esc | Start | II |

### Viajante dos Espelhos — habilidades e limites

- **Correntes de Mil Elos** (longo alcance)
  - Toque: **perfuração**. A corrente é guiada pela sua direção enquanto voa e atravessa até 2 inimigos.
  - Carga média: **chicote** em arco. Acerta todos na faixa, mas não quem está colado em você.
  - Carga alta: **captura**. Prende o inimigo (zumbi 1,6 s, chefe 0,7 s) e puxa zumbis até você. O alvo fica imune a nova captura por alguns segundos.
- **Amarras de Mil Elos** (as correntes viram extensões dos braços)
  - Golpe concentrado com 40 de dano e empurrão, mas alcance curto.
  - Carga alta: **impacto** ao redor que atordoa. O personagem fica mais lento nessa forma.
- **Travessia Espelhada:** entra num reflexo do ar e sai até ~170 px adiante, invulnerável durante a passagem. Perto de um dos **espelhos antigos das paredes**, atravessa até o espelho na direção que você apertar.
- **Véu:** abre uma superfície refletora à sua frente que captura projéteis, gira e devolve contra o inimigo mais próximo, com o mesmo dano. Só cobre a frente.
  - Se a investida do chefe atingir o Véu, o Viajante é jogado para trás sem levar dano, e o Véu se rompe.
- **Ouroboros:** círculo de correntes que anula ataques, mas não é invulnerabilidade.
  - Fica parado onde foi invocado.
  - Anula até 3 golpes e até 14 projéteis.
  - Interrompe 1 ataque do chefe que ainda esteja em preparação.
  - Dura 2,4 s e recarrega em 14 s.
  - Protege também o aliado que estiver dentro do círculo.

Cada arma e cada forma tem seu próprio combo (x1 até x5, 2,5 s sem acertar zera). Todos os números de equilíbrio estão no bloco `BALANCE`, no começo do script do `index.html`.

---

## 5. Configurações do servidor (variáveis de ambiente)

| Variável | Padrão | O que faz |
|---|---|---|
| `PORT` | 8080 | Porta HTTP/WebSocket (o Render define sozinho) |
| `GRACE_MS` | 30000 | Tempo para um jogador reconectar antes de liberar a vaga |
| `MAX_ROOMS` | 500 | Limite de salas simultâneas |

Endereços úteis: `/` (o jogo), `/ws` (WebSocket), `/health` (status em JSON: salas e jogadores conectados).

## 6. Problemas comuns

- **"Informe o endereço do servidor":** você abriu o `index.html` direto do computador. Preencha o campo "Endereço do servidor" ou abra o jogo pelo link do servidor.
- **Fica em "Conectando…":** o servidor pode estar acordando (Render gratuito, ~1 min) ou o endereço está errado.
- **"Sala não encontrada":** confira o código. Salas vazias são apagadas automaticamente.
- **"Sala cheia":** a sala já tem 2 jogadores.
- **"A partida desta sala já começou":** peça ao anfitrião para voltar à sala (M no fim da partida ou no menu de pausa).
