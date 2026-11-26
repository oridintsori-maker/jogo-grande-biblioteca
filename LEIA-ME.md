# Aurora Tri — v16.4 — MODO DESENVOLVEDOR E CORREÇÃO DOS OSSOS NO LOCAL

> **Desta vez mudaram dois arquivos: `index.html` e `server.js`.** Suba os dois no GitHub para o Render publicar. Sem o server.js novo, o botão de assistir como desenvolvedor dá erro de sala cheia ou de partida em andamento.

## Correção: ossos na biblioteca (multiplayer local)
- **Antes:** com dois jogadores no mesmo PC, J1 e J2 viam só os ossos do J1 (do personagem principal). O Guevar do J2 não achava os ossos dele e o grupo ficava preso.
- **Agora:** cada dono de osso que joga neste computador enxerga os seus. Com a tela dividida, cada metade mostra só os ossos do próprio jogador.
- A mesma correção vale para os reflexos dos espelhos, que só o Guevar percebe.

## Modo desenvolvedor
**Como ligar:** abra o terminal da Ordem (digite ORDEM, ou segure ou toque o título no celular) e digite `dev`. O mesmo comando desliga. Há também um botão DEV entre os atalhos do terminal no celular.

### Entrar numa sala online só para assistir
- No Multiplayer, digite o código da sala e toque em **ASSISTIR COMO DESENVOLVEDOR**. O botão só aparece com o modo ligado.
- Dá para entrar a qualquer momento, inclusive no meio da partida.
- O desenvolvedor **não ocupa vaga nem personagem** e não conta nos 5 jogadores.
- Na sala de espera, ele aparece como "DEV · ASSISTINDO".
- Quando ele entra, o anfitrião vê o aviso "Um desenvolvedor entrou na sala". Quando ele sai, ninguém recebe aviso de jogador desconectado.
- Comandos de jogo enviados pelo desenvolvedor são ignorados pelo anfitrião. Ele só consegue usar o painel.

### O painel DEV (canto inferior esquerdo; no celular, canto superior direito)
| Linha | O que faz |
|---|---|
| **CENA** | ◀ Fala volta uma fala · Fala ▶ avança · ⏭ Pular cena pula a cena inteira, a conversa andando, o ritual ou o confronto |
| **PARTE** | ⏮ e ⏭ vão para a parte anterior ou a próxima. A lista tem as 19 partes dos dois capítulos. "Ir para a parte escolhida" leva até ela e "Reiniciar parte" recomeça a atual |
| **CÂMERA** | Auto, seguir qualquer personagem (jogador ou IA) ou Livre. Zoom − e +. "Trazer grupo p/ câmera" leva todos até o centro da sua câmera |
| **GRUPO** | Curar · Limpar inimigos · Chefe 10% · Alarme off (cidade) · Pausar/Despausar |

- Os comandos valem **para a sala inteira**. Quem executa é o anfitrião, e todos veem um aviso curto, por exemplo "Desenvolvedor pulou a cena".
- **A câmera só muda a tela do desenvolvedor.**
- Ir do Capítulo 1 para o 2, ou voltar, monta o grupo certo. Cada jogador continua com o próprio personagem.
- **Teclas de quem assiste:**
  - N ou Enter: próxima fala; B: volta uma fala; K: pula a cena.
  - [ e ]: parte anterior e próxima.
  - 0: câmera auto; 1 a 5: seguir um personagem; L ou WASD: câmera livre; + e −: zoom.
  - H: recolhe o painel; Esc: pausa.
- **No celular:** em câmera livre, arraste a tela. Jogando, o painel começa recolhido para não cobrir o joystick.
- O painel também funciona no solo e para o anfitrião, quando o modo está ligado.

## Avisos
- Ajustei a coluna do comando `elden` na ajuda do terminal. Ela estava desalinhada desde a troca de nome.
- Atualizei um teste antigo que esperava a mochila pausar. Ela abre sem pausar desde a v16.1.

---

# Aurora Tri — v16.3 — CONTROLES DE CONTROLE MAIS INTUITIVOS

O controle segue o padrão dos jogos de ação (vale para todos os controles, inclusive J2 a J5 no mesmo PC):

| Botão | Ação |
|---|---|
| Analógico esquerdo | mover |
| **Analógico direito** | **mirar** (novo) |
| **X** ou RT | atacar (segure para o golpe carregado) |
| **A** ou LT | esquivar. No Cap. 2, quando aparece o aviso perto de algo (baú, barril, morador, porta), o A usa |
| **Y** | trocar arma / habilidade do X do teclado |
| **B** | recarregar / habilidade do R do teclado (véu, escudo, crânios, cura) |
| LB | especial |
| RB | poder furtivo (Cap. 2); fora da exploração, também troca |
| **L3** (apertar o analógico) | agachar (Cap. 2) |
| **Select** | mochila (sem pausar); na biblioteca continua trocando de personagem |
| Start | pausa |
| Metamorfose | X tigre · Y mamute · B águia (na posição dos botões) |

- A dica de controles embaixo da tela mostra os botões do controle quando há um ligado.
- O aviso de "usar" mostra **A**.
- Ao conectar um controle aparece um resumo rápido.
- O layout também está em Pausa → Configurações → Controle e celular.

Só o index.html mudou.

---

# Aurora Tri — v16.2 — ZANE ÁGUIA, CIDADE MAIS CALMA E HUD NOVO

## Metamorfose do Zane: ÁGUIA (no lugar da "água", que foi um erro)
- **Z:** garras rápidas.
- **Segurar Z:** **mergulho**. A águia sobe e cai à frente, com dano em área e um atordoamento curto.
- **X ou R:** **leque de penas cortantes** (5 penas).
- **C:** **voo rasante** longo e invulnerável.
- **Passivo:** anda 30% mais rápido.
- Tecla 3, ou B no controle, na hora de escolher a forma.

## Cidade mais calma
- **Guardas:** 10 em vez de 16 (7 rondas mais espaçadas e 3 postos).
- **Mais devagar:**
  - os guardas andam e correm mais devagar e demoram mais para notar alguém;
  - eles demoram mais para atacar;
  - o alarme dura menos e só chama quem está por perto.
- **Menos avisos:** sem textos ao entrar nas áreas nem de alarme (a faixa ALARME já mostra), e no máximo 2 avisos na tela ao mesmo tempo.

## Personagens da máquina mais calmos (no jogo todo)
- Andam um pouco mais devagar, mudam menos de lado e fazem uma pausa entre as decisões.
- Só esquivam de perigo real.
- Guardam o especial para lutas grandes (chefe ou muitos inimigos) e não o usam durante a exploração.
- Na cidade, seguem de mais longe.

## HUD
- **Topo mais limpo:** capítulo em dourado e objetivo em itálico à esquerda; nome e vida à direita, com moldura dourada. Os botões de som e mochila não cobrem mais nada.
- **Aliados:** viraram uma lista compacta embaixo do topo, com a bolsa e o mapinha logo abaixo e alinhados.
- **Estética:** painéis de combate com moldura dourada e fundo vinho, no estilo das cenas.

Só o index.html mudou.

---

# Aurora Tri — v16.1 — ELDEN, CIDADE EM PERSPECTIVA, HUD MAIS LIMPO E CONFIGURAÇÕES

- **Nome:** "Alstrea" virou **Elden** em todo o jogo. O comando do terminal agora é `elden`; o antigo continua valendo.
- **Casas em perspectiva:** fachada da frente com porta e janelas acesas, telhado de duas águas com cumeeira, beiral e chaminé.
  - Quem está atrás de uma casa fica escondido atrás dela; quem está na frente aparece na frente (casas, guardas e personagens desenhados por profundidade).
  - Becos escuros com bordas suaves.
  - Guardas dos portões reposicionados.
- **HUD mais limpo:**
  - A bolsa (moedas e materiais) fica pequena no canto direito.
  - O estado (agachado, escondido, poder) é uma pílula só no centro, e o alarme toma o lugar dela.
  - O mapinha foi para a direita, longe do painel de combate.
  - No celular, os diálogos ficam mais para cima e os botões somem durante as cenas.
- **Vários jogadores no mesmo PC:** cada um tem o próprio painel.
  - 1 jogador: painel completo.
  - 2 jogadores: dois painéis médios.
  - 3 a 5 jogadores: painéis compactos.
- **Pausa → CONFIGURAÇÕES:**
  - **Moveset** de cada personagem, com o poder furtivo e as melhorias.
  - **Opções:** volume, silenciar, modo leve, tela dividida e mapinha.
  - **Controle e celular.**
- **🎒 (ao lado do som):** abre a mochila **sem pausar** o jogo. A tecla I também não pausa mais.

Só o index.html mudou.

---

# Aurora Tri — v16.0 — CAPÍTULO 2 LIVRE: ELDEN, FURTIVIDADE E PROGRESSO

Só o index.html mudou (o server.js é o mesmo da v15.0).

## Depois da briga Guevar x Taka, o capítulo fica livre
- **Campo Laranja:**
  - a **muralha ao norte** é o atalho do Taka (a cena na primeira vez; depois, direto);
  - a **borda oeste** leva ao **Caminho de Ossos**.
- **Caminho de Ossos:** é a estrada do Cap. 1, sem o velho do sino, e a trilha ainda machuca. No fim dela fica o **portão da cidade** (cena nova na primeira vez, com o "Lá ele" também). Pela trilha a sudoeste se volta ao campo.
- **Elden:** cidade grande, com o fogo já controlado.
  - **Casas:** dá para entrar; o telhado some para quem está dentro.
  - **Revistar:** baús, armários, sacos e caixotes.
  - **Moradores escondidos:** Arnaldo, Iara e Teodoro, que dão pistas sobre o Rei.
  - **Loja da Marta, Forja do Bento.**
  - **Mapinha** no canto.
- **O Rei:** o **portão do castelo** (noroeste) leva ao corredor de espelhos e ao trono. Ninguém é obrigado a ir direto.
- **Atalho no menu:** no menu de capítulos aparece **CAPÍTULO 2 · ELDEN** para voltar direto à cidade.
- **Exploração sem fim de jogo:** quem cai volta em 6 s no ponto seguro.

## Furtividade
- **Guardas:** 16 no total, entre rondas e postos fixos (o portão do castelo, o quartel e o portão leste).
  - Um **"?"** com barrinha mostra que o guarda está desconfiando.
  - O **"!"** é o **alarme**: os guardas por perto vêm lutar.
  - Para escapar, fuja e se esconda até o alarme baixar (cerca de 20 s sem ninguém te ver).
- **Como se esconder:**
  - **Agachar:** Shift, B no controle ou AGACHAR no celular.
  - **Becos escuros e fumaça:** os guardas enxergam menos.
  - **Barris:** E, A no controle ou USAR no celular. Não dá para entrar se estiverem te vendo.
  - **Paredes** bloqueiam a visão.
- **Pelas costas:** acertar um guarda que não te viu dá 2,5× de dano.
- **Poderes (V, X no controle ou PODER no celular):**
  - **Deus:** vira fumaça (6 s, invisível).
  - **Zane:** **modo camaleão**. Por 9 s fica quase invisível andando e totalmente parado.
  - **Clarice:** confunde a mente de um guarda (9 s).
  - **Guevar:** atravessa espelhos (fonte, poças, vitrine, pedra espelhada, espelho do castelo) e sai no que estiver na direção do olhar.
  - **Taka:** é **furtivo por natureza**. Os guardas demoram mais para notá-lo, e ele anda agachado quase na velocidade normal.
- **Personagens da máquina:** não chamam atenção e só entram na briga quando o alarme toca.

## Progresso (vale em todos os capítulos, com teto)
- **O que se junta:** moedas, ferro, couro e osso.
- **O que se melhora (por personagem):**
  - **Forja:** Arma (+10% de dano por nível) e Armadura (−7% de dano recebido).
  - **Loja:** Vigor (+12 de vida).
- **Teto:** Capítulo 1 até o nível 1, Capítulo 2 até o nível 3.
- **Amuletos:** 6 no total, um por personagem; equipe na mochila (aba Amuletos). Uns estão escondidos, dois estão à venda e dois são recompensa de desafio.
- **Desafios (recompensas por ações específicas):**
  - Sombra de Elden: chegar ao castelo sem nenhum alarme.
  - Mãos leves: abrir os 3 baús da Casa do Coletor.
  - Só uma sentadinha: barril com um guarda em alerta do lado.
  - Pelas costas.
  - Ouvidos atentos: ouvir os 3 moradores.
  - Ninguém fica para trás: vencer o Rei sem ninguém cair.
- **Saque:** cada recipiente dá o saque uma vez por save; repetir o capítulo não dá saque infinito.
- **Online:** cada jogador leva o próprio progresso. O saque vai para quem abriu.
- **Mochila (I):** abas Itens, Amuletos, Desafios e Personagens.

## Tela dividida (local)
- Quando os jogadores do mesmo computador se afastam, a tela divide: 2 metades, até 5 partes. Quando se juntam, volta a ser uma tela só.
- Cada parte mostra o jogador e a vida dele.
- No teste: 60 fps com 2 telas e cerca de 40 fps com 5 telas.

---

# Aurora Tri — v15.1 — BILHETE MAIS SUTIL

- Ninguém lê mais o bilhete em voz alta. Quem pega pergunta só "Taka, caiu um papel do seu bolso. Que bilhete é esse?". Se o próprio Taka pegar, Clarice pergunta "Que papel é esse, Taka?" e ele diz "Hm? Ah, um bilhete do Felipe.".
- O Taka responde com as falas de sempre ("...não é como se alguém fosse descobrir, é tipo código secreto de jogo" / "Saudades, Felipe..."). Sem o texto do bilhete, a conversa não faz sentido de primeira.
- O que está escrito só aparece para quem abrir o bilhete na mochila.
- O P.S. do celular ficou vago: "no celular também dá, é só segurar firme lá em cima."

Só o index.html mudou (o server.js é o mesmo da v15.0).

---

# Aurora Tri — v15.0 — ONLINE + LOCAL JUNTOS, TERMINAL DA ORDEM E ITENS

**Atenção no deploy:** desta vez mudaram o **index.html e o server.js**. Suba os dois no GitHub para o Render pegar a versão nova; o servidor antigo não entende os jogadores locais.

## Multiplayer online misturado com local
- **Até 5 jogadores no total por sala.** Pode ser 5 computadores, ou poucos computadores com controles: por exemplo, um PC com teclado e 1 controle e outro PC com teclado e 2 controles.
- **Na sala de espera:** em cada computador, aperte **A** num controle para ele entrar. Use **◀ ▶** para trocar o personagem e **B** para sair. Os controles só entram enquanto aquele computador não marcou "Estou pronto". A lista mostra **J1..J5**, de qual computador é cada um (anfitrião ou convidado) e se é teclado ou controle.
- **Modos online:** Capítulo 1, **Capítulo 2** (novo) e Arena. O anfitrião só consegue escolher o Capítulo 2 se já tiver concluído o Capítulo 1.
- **Capítulo 2 online inteiro:** as cutscenes, o confronto, a caminhada com a conversa e a **batalha do Rei** (espinhos, vinhas, mão que agarra e arremessa, raios, narração). Quem é agarrado pelo Rei fica preso de verdade também no computador do convidado.
- Cada jogador continua com a etiqueta **J1..J5** em cima da cabeça. A câmera de cada computador enquadra os jogadores daquele computador.
- **Regras que continuam iguais:**
  - Um computador pode entrar no meio da partida nas transições. No Capítulo 2, isso vale durante a caminhada.
  - Se alguém cai, a máquina assume os personagens daquele computador.
  - Na vitória contra o Rei, o anfitrião volta todo mundo para a sala de espera.

## Terminal: agora é da Ordem
- **Código novo:** no menu, digite **ORDEM** (o antigo "postumo" ainda funciona, escondido). O visual e os textos agora são do terminal interno da Ordem (prompt `agente@ordem`).
- **No celular:** segure o dedo uns 1 segundo no título **AURORA TRI**, ou toque 7 vezes nele. Aparece um campinho discreto: toque nele e digite **ORDEM**. Dentro do terminal, toque na tela para abrir o teclado. Há botões de atalho (AJUDA, STATUS, ITENS, ARQUIVOS, DOSSIE, TUDO, LIMPAR, SAIR).
- **Comandos novos:**
  - `itens`: o que tem na sua mochila.
  - `analisar <item>`: o laudo da Ordem sobre um item. Exemplos: `analisar cranio`, `analisar bilhete`.
  - `dossie felipe`.

## Itens coletáveis
Passe por cima do brilho no chão para pegar. Fica salvo neste navegador.
- **Livro dos Justos:** no Santuário (Capítulo 1).
- **Livro de capa cinza:** na Grande Biblioteca, entre as estantes da ala oeste.
- **Gravetos e Crânio com selo:** no Campo Laranja, durante a caminhada (Capítulo 2). O crânio fica perto da trilha de ossos.
- **Bilhete amassado:** uns segundos depois de começar a caminhada, cai do bolso do Taka (ele nem percebe). Quem pegar pergunta sobre o bilhete, e o Taka responde. O texto do bilhete só aparece na mochila (veja a v15.1 acima).

**Para analisar:** tecla **I** no jogo, botão **ITENS** na pausa, ou **ITENS COLETADOS** na seleção de capítulos. A mochila mostra o desenho grande, onde foi achado, a descrição e a análise. O bilhete aparece transcrito. No solo, abrir a mochila pausa o jogo.

---

# Aurora Tri — v14.1 — DESEMPENHO DA LUTA DO REI + DIÁLOGOS DO CAPÍTULO 2

**Desempenho:** a luta contra o Rei caía para 8–14 fps. Agora roda a 60 fps estáveis (testado nas 3 fases, com as máquinas lutando).
- O culpado era o desenho do Rei: um filtro de brilho (`ctx.filter`) aplicado a cada quadro, mais o efeito de sombra borrada (`shadowBlur`) nas orbes do cajado, ampliado 2,7 vezes. Isso foi trocado por um clarão branco translúcido e por um halo simples, que custam quase nada e têm a mesma aparência.
- Também troquei o brilho borrado dos tiros (jogadores e inimigos) e do texto de narração do Rei por halos baratos.
- **Modo leve automático:** se o computador ficar abaixo de ~40 fps por uns segundos durante o jogo, os brilhos borrados que sobraram (golpes, Capítulo 1, cenas) são desligados até recarregar a página. Para forçar sempre: no console do navegador, `localStorage.setItem('egb_lowfx','1')`.

**Diálogos do Capítulo 2:** voltaram ao tom da v12.0, com adultos falando como adultos. O Zane não é mais o alívio cômico das piadas de comida.
- Mantido: os 5 personagens jogáveis; "Só uma sentadinha" → Guevar: "Lá ele" (todo mundo ri); o mergulho na muralha sem ninguém saber que foi o Guevar, saindo da pedra espelhada; "...o que vocês seriam sem mim?"; o Rei de barba e cabelo longos e grisalhos.
- Só um pouco do tom novo: a Clarice fala do bar ou de bebida de vez em quando; o Guevar se faz de desentendido sobre a muralha e comenta "Quanto espelho. Alguém aqui é bem vaidoso."; o Taka pede "Faz de novo!".
- **Deus dos Justos** ficou mais chatinho: corrige os outros ("Fumaça não anda. Eu, sim."), dá respostas secas ("Não era."), alfineta ("Que comovente. Podemos ir, ou vocês querem se abraçar primeiro?", "Era óbvio, mas tudo bem.") e às vezes ri do pessoal.

Só o index.html mudou.

---

# Aurora Tri — v14.0 — MULTIPLAYER LOCAL (até 5 no mesmo computador)

**Como jogar junto no mesmo PC:** escolha o modo (Capítulo 1, Capítulo 2 ou Arena). Na tela de personagem aparece a caixa **"Jogadores neste computador"**:
- **J1** é o teclado. Um controle sem dono também comanda o J1, como antes.
- Em cada controle extra, aperte **A** para entrar como **J2, J3, J4 ou J5**. Use **◀ ▶** para trocar de personagem (nunca repete o de outro jogador), **B** para sair e **START** para começar.
- Cada um aparece em jogo com a etiqueta **J1 · ZANE**, **J2 · GUEVAR**... em cima da cabeça.
- **Controles no jogo:** analógico/D-pad move, RT ataca (segure para carregar), RB troca/especial, LT esquiva, Y recarrega/habilidade (segure: Taka dispara os crânios, Clarice usa a Cura de Morte), LB ultimate, START pausa. A Metamorfose do Zane no controle sai como Tigre; segurando ◀ sai Mamute, segurando ▶ sai Água.
- Quem não tem jogador vira máquina. No Capítulo 1 só existem Zane, Guevar e o Deus dos Justos: quem escolher o Deus espera e assume quando ele entra no grupo, e quem ficar sem personagem livre aparece como "aguardando". No Capítulo 2 e na Arena todos os 5 jogam.
- Com vários jogadores no mesmo PC, a câmera enquadra todo mundo (afasta o zoom se vocês se separarem).
- Se um controle desconectar no meio da partida, a máquina assume aquele personagem.

O online misturado com o local (vários jogadores por computador na mesma sala) e o Capítulo 2 online vêm na próxima versão.
Só o index.html mudou.

---

# Aurora Tri — v13.0 — A BATALHA CONTRA O REI DE ELDEN

Logo depois de o Rei aparecer na sala do trono, a luta começa numa **sala do trono enorme** (2400 × 1640), com câmera que enquadra você e o Rei, para dar espaço de correr.

**As 3 fases:**
1. Até 66% da vida, ele segura o cajado com um braço.
2. Depois esse braço é arrancado: sangue, pausa curta e o braço caído no chão. Ele passa a segurar o cajado com o outro.
3. A partir de 33%, os dois braços se vão e o cajado levita ao lado dele.

**Moveset de sangue:** espinhos que brotam sob cada jogador (com aviso em círculo vermelho); linhas de espinhos que correm do Rei até alguém; vinhas de sangue que perseguem, prendem e machucam; a mão de sangue que sai do chão, agarra e **arremessa** longe; leque de orbes de sangue (o Véu do Guevar devolve); varrida do cajado quando alguém chega perto; na fase 2, ele vira névoa de sangue e reaparece perto de alguém; na fase 3, os 5 raios do cajado giram pela sala e cai uma chuva de espinhos.

**Dificuldade:** o Rei tem muita vida e resistência, causa dano alto, e a máquina das outras personagens foge dos avisos. Taka começa a luta ainda ferido (70% de vida).

**Narração da vontade do Rei**, no mesmo estilo da cena do trono, no começo, nas trocas de fase, no primeiro agarrão, nas primeiras vinhas, com a vida baixa e na derrota.

**Aposta Incansável (Taka) nesta luta:** dura 26 s em vez de 14, e o jackpot dura no mínimo 14 s, mas dá menos dano (x1,6 em vez de x2,2). Fora dessa luta, volta ao normal.

Vencer: "O REI DE ELDEN CAIU — Capítulo 2 concluído" e volta ao menu. Perder: Enter recomeça a batalha direto.
Terminal Póstumo: `rei` vai direto para a batalha (como Taka). Música opcional: `musica/cap2_rei.mp3`.
Só o index.html mudou.

---

# Aurora Tri — v12.2

- Campo laranja (cenas do Capítulo 2) mais cheio: três camadas de montanhas, a mais distante com neve suja no topo; árvores de copa cor de ferrugem e oliva no horizonte e nas laterais; mais textura na grama; e uma faixa de grama alta balançando na frente dos pés dos personagens.
- Quando a câmera vira para o lado de Zane e Guevar, o castelo aparece espelhado do outro lado da cidade, e as montanhas e árvores também mudam.
- Campo jogável (vista de cima) mais cheio: touceiras de grama alta, árvores com sombra, árvores secas e montanhas atrás da cidade.
- Só o index.html mudou.

---

# Aurora Tri — v12.1

- **Capítulo 2: todos os 5 personagens jogáveis** na seleção (Zane, Guevar, Taka, Clarice e o Deus dos Justos). No confronto, Clarice e o Deus ficam de fora: quem joga com eles anda livremente e os golpes não acertam ninguém.
- **Diálogos reescritos.** Guevar e Zane ficaram mais leves, sem tanta frieza. O Zane virou o "burrão" engraçado (bombeiros, a árvore, o pão do Jorge...). A Clarice é a resenha que topa bebida, cigarro e cochilo.
- Taka: "...o que vocês seriam sem mim?" no lugar de "vamos de crânio".
- Depois de "Só uma sentadinha", o Guevar diz "Lá ele" e todo mundo ri (o Deus ri "hihihi").
- **Mergulho na muralha:** ninguém sabe quem fez. O Guevar se faz de desentendido e só o Deus solta um "Hihi...". Eles saem **horizontalmente** de uma pedra altamente reflexiva no campo, e não mais de uma poça.
- Rei de Elden com barba longa e cabelo comprido grisalho.
- Só o index.html mudou.

---

# Aurora Tri — v12.0 — CAPÍTULO 2: O CAMPO LARANJA (até o Rei de Elden)

**Como jogar:** Capítulos → Capítulo 2. O botão libera depois de concluir o Capítulo 1 (ou com o comando `alstrea` no terminal Póstumo). Você escolhe Zane, Guevar ou Taka; os outros personagens ficam com a máquina. Por enquanto o Capítulo 2 é só no solo; o online entra junto com a luta do Rei.

**O que tem no capítulo:**
1. **Cena:** Taka e Clarice no campo de grama laranja e céu cinza do Mundo Z. Avistam duas silhuetas, e Clarice pede para Taka ser mais precavido.
2. **Cena:** do outro lado, Zane e Guevar conversam sobre se aproximar, até Taka gritar "VIEMOS EM PAAAAAZ!". O Deus dos Justos chega primeiro e se apresenta. Depois Zane e Guevar chegam, ouvem os gritos e veem a cidade da trilha de ossos em chamas.
3. **Mergulho Mental — Verdadeiro:** tudo fica preto. Guevar pergunta e Taka, em transe, responde "não" três vezes. Vem a pergunta "Shiro Taka...", a resposta com impacto, 10 crânios rituais ao redor de Guevar, e Guevar salta desviando dos raios.
4. **Jogável — confronto amistoso:** Zane e Guevar contra Taka. Ninguém perde vida: os golpes viram acertos "DE RASPÃO", o Taka apara quando corta na hora certa, e quem esquiva não é atingido. As ultimates ficam desligadas nessa luta. Uma barra de TENSÃO enche com os acertos (ou em até 60 s). Clarice assiste 😒 e o Deus fica de fora.
5. **Cena:** tentáculos da morte saem do chão e prendem os três. Guevar e Taka pedem desculpas.
6. **Jogável — caminhada:** o grupo atravessa o campo até a muralha, com uma seta indicando o caminho. No caminho conversam sobre a Ordem e o Jorge.
7. **Cena:** sobem a muralha montados num crânio gigante. Lá em cima, quatro guardas os cercam e Guevar faz todos afundarem e saírem por uma poça no campo. O Deus sugere o castelo. Eles passam pelo corredor de espelhos e chegam à sala do trono. Taka senta no trono, a voz da consciência fala, uma espada atravessa Taka e ele é lançado longe. Surge o **REI DE ELDEN**.
8. "CONTINUA..." (a luta do Rei fica para a próxima versão) e volta ao menu de capítulos.

**Músicas opcionais novas:** `cap2_campo`, `cap2_luta`, `cap2_mente`, `cap2_castelo` e `cap2_rei` (veja `musica/COMO-USAR.txt`).
Só o index.html e o COMO-USAR mudaram desde a v11.0.

---

# Aurora Tri — v11.5

- Zane: roupa nova. Casaco azul-escuro até a coxa, com gola alta, fecho e bolsos, e calça cinza larga que abre para baixo. Saíram a capa vermelha, o cinto e o lenço.
- Zane jovem (cena secreta "evans"): mesma roupa, mas sem o machado nem a arma e com o cabelo curto e solto, sem coque. O retrato dele no diálogo também é o jovem.
- Cena "nila": Nila não sabe o nome dos mundos. Ela fala "o mundo inteiro" e, quando Guevar diz "Mundo X", pergunta "Mundo o quê?".
- Só o index.html mudou desde a v11.0.

---

# Aurora Tri — v11.4 — Cenas secretas no terminal Póstumo

Comandos novos no terminal (`postumo` no menu):
- `arquivos` — lista as memórias guardadas pela facção.
- `nila` — **MEM-01 // MUNDO Z.** Guevar, com 15 anos, janta nos escombros com a irmã adotiva Nila, de 9 anos, que pula em volta da fogueira enquanto ele lê sentado. Os dois conversam sobre o Mundo X (árvores, o céu azul) e ele promete levá-la para lá. Nila tem cabelo comprido castanho-claro, olhos castanho-escuros e um blusão mostarda grande demais.
- `evans` — **MEM-02 // PROTÓTIPO P-0.** Zane mais jovem entra na versão alfa da Máquina Póstuma, uma máquina de ferro e cobre com cabos expostos e vidro rachado, a pedido de "??? Evans", uma silhueta de jaleco com óculos que refletem a luz. O nome que Zane fala aparece censurado com estática. Depois vem a montagem dos 10 anos de saltos por linhas do tempo, com lugar, tempo de permanência (de segundos a meses) e o contador de anos.

As cenas avançam com Z / Enter / toque e voltam ao menu no fim, sem marcar progresso. Músicas opcionais: `musica/segredo_nila.mp3` e `musica/segredo_evans.mp3` (sem elas, usa `cena.mp3`). Só o index.html mudou desde a v11.0; o COMO-USAR da pasta musica ganhou as duas linhas novas.

---

# Aurora Tri — v11.3 — Terminal secreto PÓSTUMO

**Como abrir:** no menu, digite `postumo` no teclado. No celular, toque 7 vezes rápido no título AURORA TRI. A tela vira uma TV de tubo âmbar (liga com o efeito da linha no meio, tem linhas de varredura, cintilação e vinheta) com o terminal da facção do futuro. Esc, `sair` ou o botão no canto desligam.

**Comandos:**
- `shiro` — libera o Taka
- `clarice` — libera a Clarice
- `justos` — libera o Deus dos Justos
- `tudo` — libera os três de uma vez
- `roger` — rastreia o sinal e vai direto para a cena final na faculdade. Não marca o capítulo como concluído; no fim volta ao menu.
- `montalvo` — o Viajante fica sem capuz desde o começo e é chamado de Guevar no menu, no HUD e nos avisos. Os diálogos continuam iguais. Digite de novo para desligar.
- `imortal` — você não recebe dano nas partidas solo (liga/desliga)
- `status` — mostra o que está liberado e ligado
- `dossie <nome>` — fichas da Póstumo: zane, guevar, deus, taka, clarice, roger, maquina
- `data` — o relógio temporal
- `ajuda`, `limpar`, `sair` (setas ↑/↓ repetem comandos anteriores)

Tudo fica salvo neste navegador. Só o index.html mudou desde a v11.0.

---

# Aurora Tri — v11.2

- Taka: os crânios rituais ficaram maiores (os selos mantêm o tamanho). Ao carregar, cada crânio vai para trás do seu selo e aponta o focinho, de boca fechada, para o alvo. No disparo ele racha e se desfaz em pó roxo, que é puxado para dentro do selo (com som próprio), e o raio sai do selo.
- Só o index.html mudou desde a v11.0/v11.1.

---

# Aurora Tri — v11.1

- Taka: as chamas roxas viraram **crânios rituais** no estilo Ordem Paranormal. Cada um é um crânio de carneiro com chifres em espiral, flutuando sobre um selo de ritual roxo (anéis, triângulos e marcas). Ao disparar, o selo gira de lado na direção do alvo, os olhos do crânio acendem, o crânio vai para trás do selo e o raio sai do centro do selo. Os comandos e o equilíbrio continuam iguais (R toque posiciona, R segurar dispara).
- Os textos foram atualizados: HUD "CRÂNIOS [R]", botão de toque "CRÂNIOS" e dicas de controle.
- Só o index.html mudou desde a v11.0. O server.js e a pasta musica/ continuam iguais.

---

# Aurora Tri — v11.0

**Agora atualize os 3: `index.html`, `server.js` e a pasta nova `musica/`.**

- **Cutscene da faculdade refeita:** o prédio fica no chão, com rua, calçada, praça, caminho, postes e árvores. A câmera se aproxima pelo chão até a porta enquanto Taka e Clarice sobem o caminho. A porta se abre e acende quando eles chegam. A cena ficou um pouco mais longa (6 s).
- **Efeitos sonoros:** todos gerados por código, sem arquivos. Tem som para tiros, cortes, correntes, Ouroboros (girar e esmagar), esquiva, reflexos, aparar, chamas e raios do Taka, roleta e jackpot, pássaros, armadilha, cura, ritual, metamorfose, acertos, mortes, dano, chefes, sino, menus, diálogos, avisos, vitória e derrota. Funciona no solo, online (cada um ouve as ações dos outros, sem eco) e no celular.
- **Músicas por ambiente:** o jogo toca `musica/<nome>.mp3` conforme o lugar (menu, corredor, santuário, biblioteca, estrada, chefes, arena, final, créditos...), com transição suave. Os nomes dos arquivos e as sugestões de faixas estão em `musica/COMO-USAR.txt`. As músicas não vêm com o jogo.
- **Botão 🔊 no canto superior direito:** volume dos efeitos e da música, e opção de silenciar tudo. A tecla **N** também silencia. O som liga no primeiro clique ou toque (regra dos navegadores).
- **server.js:** agora também entrega os arquivos da pasta `musica/`.
- A dica de controles some durante as cenas finais.

---

# Aurora Tri — v10.17

- Guevar: franja igual à imagem de referência enviada. Saiu a base branca da v10.16; agora o castanho desce até o topo das mechas, então não aparece pele entre a coroa e as mechas. A testa só aparece entre as mechas brancas (50% maiores), que ficam por cima do castanho.
- Só o index.html mudou (server.js igual). No Render, basta atualizar o index.html.

---

# Aurora Tri — v10.16

- Guevar: cada uma das 4 mechas brancas da testa ficou 50% maior, crescendo a partir do próprio topo, sem mudar a posição nem o espaçamento.
- Uma base branca fecha os vãos de pele entre a coroa e as mechas e fica por cima da parte de baixo das abas castanhas. A testa fica toda coberta pela franja branca.
- Só o index.html mudou (server.js igual). No Render, basta atualizar o index.html.

---

# Aurora Tri — v10.15

- Guevar: a franja volta ao desenho da v10.13, agora na proporção exata do desenho, sem achatar. As mechas brancas caem um pouco por cima dos olhos. O aumento de tamanho da v10.14 foi descartado.
- Só o index.html mudou (server.js igual). No Render, basta atualizar o index.html.

---

# Aurora Tri — v10.14

- Guevar: as 4 mechas brancas da testa estão 100% maiores (2x) e a coroa branca do topo está 60% maior. As duas crescem a partir do ponto onde se encontram, no meio da testa.
- Só o index.html mudou (server.js igual). No Render, basta atualizar o index.html.

---

# Aurora Tri — v10.13

- Guevar: franja seguindo o segundo desenho. As abas marcadas de vermelho agora são castanhas, a coroa de 3 pontas continua branca e entraram as 4 mechas brancas novas caindo na testa, parando logo acima dos olhos.
- Só o index.html mudou (server.js igual). No Render, basta atualizar o index.html.

---

# Aurora Tri — v10.12

- Guevar: franja branca refeita copiando o contorno exato do desenho enviado (coroa com 3 pontas subindo no cabelo e duas abas caindo sobre a testa), preenchida de branco.
- Só o index.html mudou (server.js igual). No Render, basta atualizar o index.html.

---

# Aurora Tri — v10.11

- Guevar: franja branca bagunçada e assimétrica (ponta fora do centro, lado esquerdo maior), mais baixa, quase nas sobrancelhas, com pontas irregulares, um pequeno Λ no meio e mechas escuras cruzando por cima.
- Só o index.html mudou (server.js igual). No Render, basta atualizar o index.html.

---

# Aurora Tri — v10.10

- Guevar: franja refeita seguindo o desenho colorido. Mecha branca no meio com a ponta subindo no cabelo escuro, abrindo em duas asas que descem até as têmporas, e um pequeno Λ no centro mostrando a testa (risca). Mechas escuras caem dos lados.
- Só o index.html mudou (server.js igual). No Render, basta atualizar o index.html.

---

# Aurora Tri — v10.9

- Guevar: as mechas do meio da franja agora sobem até o alto da cabeça, formando um pico com a risca no meio (seguindo o desenho enviado). As laterais da franja continuam iguais.
- Só o index.html mudou (server.js igual). No Render, basta atualizar o index.html.

---

# Aurora Tri — v10.8 (refeita a partir da v10.6)

- Taka: mesma camisa da v10.6, só com as mangas largas em cone, terminando no cotovelo (antebraço continua aparecendo).
- Guevar: franja igual à da v10.6; só as duas mechas do meio sobem e abrem a risca, com a base delas reta na testa.
- As mudanças da v10.7 foram descartadas. Só o index.html mudou (server.js igual). No Render, basta atualizar o index.html.

---

# Aurora Tri — v10.7

- Taka: mangas largas e sobrando, em forma de cone até o cotovelo.
- Guevar: só as mechas bem do meio da franja branca sobem e formam a risca no meio; a base delas fica reta, marcando a testa baixa.
- Só o index.html mudou (server.js igual ao da v9/v10). No Render, basta atualizar o index.html.

---

# Aurora Tri — v10.6

- Taka: cabelo mais arredondado (menos quadrado), camisa com mangas até o cotovelo e mechas da franja quase na mesma altura.
- Só o index.html mudou (server.js igual ao da v9/v10). No Render, basta atualizar o index.html.

---

# Aurora Tri — v10.5

> **v10.5:** Taka com camisa normal (manga curta), cabelo menos alto e franja um pouco mais longa no rosto. Só o `index.html` mudou.

> **v10.4:** cabelos refeitos a partir dos desenhos de referência: Taka com a massa de cabelo branco arredondada e bagunçada, laterais sobre as orelhas e franja comprida até os olhos; Guevar com o cabelo castanho bem escuro, curto e bagunçado, e a franja branca atravessando a testa (repartida no meio). Só o `index.html` mudou.

> **v10.3:** Taka com corpo magro e roupa larga (camisa solta, braços finos), laterais do cabelo menores e franja mais comprida; franja do Guevar um pouco mais baixa, sobre o rosto. Só o `index.html` mudou.

> **v10.2:** cabelo do Taka solto e caído (franja na testa, volume moderado), visual um pouco mais simples, olhos do Guevar no mesmo tamanho dos outros, tatuagem de duas listras no rosto do Zane e marcas leves de queimadura no lado esquerdo do rosto da Clarice. Só o `index.html` mudou.

> **v10.1:** cabelos refeitos e mais arrumados (Taka com o cabelo branco volumoso para cima, Guevar com o mullet repartido no meio, Zane com o cabelo longo preso atrás), rostos simples num padrão masculino e feminino, e o Deus dos Justos sem as três bolinhas girando. Só o `index.html` mudou.

> **v10:** novos visuais (personagens mais esguios; Zane sem capacete, com o cabelo escuro esverdeado preso; Guevar com o cabelo repartido no meio; Taka e Clarice refeitos; Deus dos Justos como fumaça), a ult do Guevar agora é o **Ouroboros**, a esquiva dele é normal e a travessia por reflexos virou passiva. Só o `index.html` mudou em relação à v9 — se o `server.js` da v9 já está no Render, basta trocar o `index.html`.

Jogo em HTML com **Zane**, **Guevar** (o Viajante dos Espelhos), o **Deus dos Justos**, **Taka** e **Clarice**, com **multiplayer online para até 3 jogadores por código de sala**.

**Menu:** AURORA TRI → **CAPÍTULOS** (Capítulo 1 — A Grande Biblioteca · Capítulo 2 — em breve) · **ARENA DE TREINO** · **MULTIPLAYER ONLINE**.

> **Atualizando no Render/GitHub:** nesta versão o `server.js` também mudou (modos de jogo e os personagens novos). Envie **os três arquivos** (`index.html`, `server.js` e `package.json`) para o repositório, substituindo os antigos.

| Arquivo | Para que serve |
|---|---|
| `index.html` | O jogo inteiro (um arquivo só). Funciona sozinho para jogar solo. |
| `server.js` | Servidor multiplayer (Node.js, **sem dependências** — não precisa de `npm install`). Também entrega o jogo pelo navegador. |
| `package.json` | Informa à hospedagem como iniciar o servidor (`node server.js`). |

---

## 1. Jogar sozinho

Dê dois cliques no `index.html`. Escolha **CAPÍTULOS → CAPÍTULO 1** (história) ou **ARENA DE TREINO**, escolha o personagem e clique em **JOGAR**. Não precisa de servidor nem de internet.

### Arena de treino
Ondas sem fim num coliseu à noite, com **qualquer personagem desbloqueado** (é aqui que Taka e Clarice jogam). No solo você luta sozinho; online, cada jogador usa o próprio personagem.
- Cada onda vencida: **+25 de vida** e quem caiu volta com 40.
- A cada **3 ondas** as ultimates recarregam.
- A cada **5 ondas**, um chefe: o Carrasco Rubro e o Velho do Sino se alternam (ficam mais fortes a cada volta).
- Zumbis desde o começo, espíritos a partir da onda 2 e Apóstolos a partir da onda 3. O **recorde** fica salvo no navegador.

No solo, **uma máquina joga como seu parceiro**: escolhendo Zane, a máquina controla o Viajante; escolhendo o Viajante, a máquina controla Zane. A máquina causa um pouco menos de dano que um jogador e recebe um pouco menos de dano (para não deixar você sozinho cedo demais).

Escolhendo o **Deus dos Justos** (depois de desbloqueado), as duas máquinas jogam com Zane e o Viajante até o fim da luta contra o "Deus" dos Justos — você assiste (**T** ou toque na tela muda a velocidade: x1, x2, x3). Depois da cutscene, você passa a controlar a entidade junto com eles.

## No celular
Abra o link do servidor (ou o `index.html`) na horizontal. Joystick à esquerda, botões à direita, II para pausar. Pausa e fim de partida têm botões na tela.

## 2. Jogar online (2 computadores, qualquer rede)

O multiplayer precisa do `server.js` rodando em algum lugar acessível pela internet. Depois disso, os jogadores só abrem o endereço do servidor no navegador.

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
6. Esse endereço **é o jogo**: os jogadores abrem esse link no navegador.

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
  Ele mostra um link `https://….trycloudflare.com`. Os jogadores abrem esse link. O seu computador precisa ficar ligado com o servidor e o túnel abertos.

Para usar outra porta: `PORT=3000 node server.js` (no Windows/PowerShell: `$env:PORT=3000; node server.js`).

### Abrir o `index.html` direto e jogar online

Também funciona. Em **MULTIPLAYER ONLINE → Endereço do servidor**, digite o endereço onde o servidor está, por exemplo `expedicao-xxxx.onrender.com`. O jogo lembra esse endereço para as próximas vezes.

## 3. Criar uma sala e chamar um amigo

1. Os dois abrem o jogo e clicam em **MULTIPLAYER ONLINE**.
2. **Quem cria:** clica em **CRIAR SALA**. Aparece um código de 5 caracteres, por exemplo `K7M2Q`. Clique em **COPIAR CÓDIGO** e mande para o amigo pelo WhatsApp, Discord etc.
3. **Quem entra:** digita o código e clica em **ENTRAR NA SALA**.
4. O anfitrião escolhe o **modo**: **CAPÍTULO 1** ou **ARENA DE TREINO**. Cada um escolhe seu personagem (cada personagem só pode ser de um jogador). Taka e Clarice só aparecem no modo Arena.
5. Todos clicam em **ESTOU PRONTO** (mínimo 2, máximo 3). O anfitrião (J1) clica em **INICIAR PARTIDA**.

Se ninguém estiver com Zane ou com o Viajante, uma máquina assume esse personagem. Quem escolher o Deus dos Justos assiste até a cutscene e então controla a entidade.

**Terceiro jogador:** durante a partida, a sala só aceita alguém novo nas **transições entre salas** — quando a porta do Carrasco está aberta e na biblioteca. Quem entra assume a entidade (se ela já estiver no grupo, controlada pela máquina) ou assiste até ela surgir. Para **reiniciar do zero com os três**, o anfitrião pausa e aperta **M** (volta à sala); todos marcam "pronto" e a partida recomeça do corredor.

Se alguém sai de vez no meio da partida, a máquina assume o personagem dessa pessoa.

Durante a partida:
- **Pausa (Esc / Start / II):** pausa para todos.
- **Se alguém cair da internet:** o outro vê o aviso e o jogo espera até 30 segundos pela volta. Recarregar a página também reconecta.
- **No fim da partida:** o anfitrião escolhe **Enter** (jogar de novo) ou **M** (voltar à sala).

---

## Progressão
1. **Corredor da Grande Biblioteca:** zumbis e depois o Carrasco Rubro.
2. Ao derrotar o Carrasco, a porta no alto se abre. Entre nela para ir à sala 2.
3. **Santuário dos Justos:** espíritos (de perto e de longe), depois os Apóstolos dos Justos (civis controlados com armas de fogo, machados e facas) e por fim o **"Deus" dos Justos**, que usa rituais de Morte (espiral de projéteis), Conhecimento (selos que explodem no chão) e Energia (rajadas e colunas de chamas azuis) e invoca Apóstolos. Abaixo de 50% de vida, o ritual se intensifica.
4. Se a expedição cair no Santuário, ela recomeça na entrada do Santuário. As ultimates recarregam a cada sala.
5. **Cutscene:** o corpo do "Deus" se desfaz e a entidade fala com o grupo. Cada um escolhe um **desejo final** (1, 2 ou 3, toque nos botões ou X/Y/B no gamepad; Z, Enter ou toque avançam o diálogo). O dono de cada personagem escolhe o desejo dele; desejos de personagens da máquina são escolhidos pelo anfitrião.
   - Zane: **Força aprimorada** (+25% de dano em todos os ataques) · **Resistência aprimorada** (−30% de dano corpo a corpo recebido) · **Alcance aprimorado** (+25% de alcance corpo a corpo, inclusive na Metamorfose).
   - Viajante: **Correntes ampliadas** (+30% de alcance em todos os ataques com correntes) · **Ouroboros prolongado** (modo Ouroboros de 18 s para 26 s) · **Véu aprimorado** (Véu dura 0,9 s em vez de 0,55 s, mais largo e mais longe).
6. **União:** a entidade se une ao grupo. A partir daí, nas lutas, todos recuperam **+6 de vida a cada 5 s** (o pedido era até +10; com +10 a recuperação anulava boa parte do dano dos Apóstolos, então ficou em 6 — ajuste em `BALANCE.union`). O Deus dos Justos fica desbloqueado no menu.
7. **A Grande Biblioteca (sala 3):** depois de uma frase da entidade, todos desmaiam e acordam na biblioteca. A câmera começa mostrando a biblioteca inteira e depois se aproxima dos personagens. A biblioteca é maior que a tela: a câmera segue o seu personagem (online, cada jogador tem a própria câmera). As estantes bloqueiam a passagem, mas o Viajante com o modo C ligado passa por elas.
   - **A entidade explica o que fazer:** assim que eles acordam, ela fala (sem travar o jogo) que precisa de seis ossos: três verde-escuros de Zane e três vermelhos de Guevar.
   - **Os ossos se veem por instinto:** sem usar habilidade nenhuma, cada um enxerga só os seus — Zane vê os verde-escuros e Guevar os vermelhos, brilhando pelas alas da biblioteca. Basta encostar para pegar. Online, cada jogador vê só os do seu personagem.
   - Quando um termina, a entidade chama esse para o ritual; quando os dois terminam, chama os dois.
   - **Máquinas:** o parceiro da máquina procura os próprios ossos sozinho, leva ao ritual e espera lá. No solo também dá para trocar de personagem com **Q** e procurar com o outro (o registro continua).
   - A Metamorfose e o Ouroboros funcionam normalmente (1x por sala). Guevar entra nos espelhos e poças esquivando contra eles.
   - **Ritual:** cada personagem leva os próprios ossos ao círculo no centro e eles se encaixam sozinhos. Com os seis no lugar, o Deus dos Justos posiciona o crânio no centro, o ritual brilha e as 36 chamas azuis se apagam uma de cada vez (~20 s) até tudo ficar escuro.
   - **Fortalecimento permanente:** Zane e Guevar absorvem o conhecimento da biblioteca: **+20 de vida máxima e +10% de dano em todos os ataques** (soma com o desejo; ajuste em `BALANCE.power`).
   - **A entidade se oculta:** ela some da percepção dos dois e sai do grupo (fim da União). Quem a controlava passa para um personagem livre ou assiste. Ela continua desbloqueada no menu e no código Fairs.
8. **Fora da biblioteca (Mundo Z, à noite):** Zane e Guevar acordam perto dos escombros, sob um céu vermelho noturno com lua vermelha. A estrada tem tochas de osso e o vilarejo brilha ao longe. Guevar fica um instante olhando para trás.
   - **A estrada de ossos** leva ao vilarejo, mas **pisar na trilha machuca** (4 de vida a cada 0,5 s) **e deixa o personagem bem mais lento**. Andem pelo terreno ao lado. Os ossos espalhados fora da trilha são só decoração.
   - O parceiro da máquina segue para o vilarejo por conta própria, mas **para e espera** se ficar muito à frente de você.
   - **O crânio com o símbolo** fica perto da estrada. Quando Guevar se aproxima, ele percebe ("!") e o guarda ao tocar nele (se Guevar for da máquina, ele mesmo vai buscar). O crânio fica registrado como objeto da história.
   - **O velho do lampião:** depois do crânio, um velho encapuzado, com um lampião e um sino no pescoço, aparece atrás deles e os segue calmamente, andando por cima da trilha de ossos sem se ferir. Os dois se preparam para o ataque, mas ele passa reto em direção ao vilarejo. Zane pergunta "Quem é você?" — nenhuma resposta — e grita "Quem é você, seu velho? Olha pra cá!". O velho para, se vira, vem até eles e se transforma numa criatura de pescoço enorme, com o sino balançando.
   - **Chefe: O Velho do Sino** (bem mais resistente que os anteriores):
     - **Badalada:** o sino solta anéis de som que se espalham. Esquive na hora em que o anel passa (a esquiva atravessa o som). Quem é atingido **perde o combo**. O **Véu do Guevar reflete o som** e o protege.
     - **Bote do pescoço:** uma faixa dourada avisa a direção; a cabeça dispara em linha reta. O Véu do Guevar também segura o bote.
     - **Lampião:** joga chamas que viram fogo no chão por alguns segundos (círculo tracejado mostra onde vão cair).
     - **Varredura:** quem fica colado leva uma varrida em arco do pescoço e é empurrado.
     - **Recuo:** se ficarem colados nele muito tempo, o pescoço puxa o corpo para longe.
     - Abaixo de 50% de vida: "o sino não para" — três anéis por badalada, botes duplos, mais chamas e menos descanso.
   - Se a expedição cair na luta, recomeça já na luta, perto do velho, com o crânio, os desejos e o fortalecimento mantidos.
   - Depois de derrotar o velho, Zane e Guevar voltam ao Santuário.
9. **Fim do Capítulo 1:** no Santuário eles invocam de novo o Deus dos Justos com o crânio marcado e as chamas azuis aumentam. A entidade surge numa fumaça atrás deles, e no "Tira a mão!" o **capuz de Guevar cai** — a partir daí ele aparece sem capuz (cabelo castanho bem escuro com a franja e a nuca brancas, olhos dourados e a cicatriz no lado esquerdo do rosto), e o nome dele passa de VIAJANTE para **GUEVAR**. O diálogo avança com Z / Enter / toque (online, qualquer jogador avança).
   - Depois vêm **FIM DO CAPÍTULO 1**, os créditos e a **cena pós-créditos** (São Paulo, a faculdade, o porão e a **Máquina Póstuma**). Z / Enter / toque pulam os trechos sem fala.
   - Ao terminar: **Taka e Clarice ficam disponíveis na Arena de treino**, o Capítulo 1 aparece como concluído e Guevar aparece sem capuz no menu e na Arena.

## 4. Controles

| Ação | Teclado | Gamepad | Touch |
|---|---|---|---|
| Mover (8 direções) | WASD / Setas | Analógico / D-pad | Joystick |
| Atacar (segure para carregar) | Z | RT | ATQ |
| Zane: trocar arma · Viajante: Correntes ↔ Amarras | X | RB | TROCAR / FORMA |
| Zane: recarregar · Viajante: Véu | R | Y | REC / VÉU |
| Esquivar (Guevar: esquivar contra uma poça/espelho atravessa o reflexo) | C | LT | ESQ |
| Ultimate (Zane: Metamorfose · Guevar: Ouroboros · Deus: Ritual) — 1x por sala | F | LB | META / OUROB. / RITUAL |
| Trocar de personagem (só na biblioteca) | Q | Select | TROCA |
| Zane: faro do Tigre na biblioteca | F → 1 | LB → X | META → TIGRE |
| Velocidade do espectador (solo com o Deus) | T | A | toque na tela |
| Pausar | Esc | Start | II |

### Deus dos Justos — buffer e invocador (verdadeira forma: fumaça triangular com olhos brancos)

- **Z (toque): Centelha** — projétil elemental que alterna Morte → Conhecimento → Energia (16 de dano, combo próprio).
- **Z (segurar): Invocar Apóstolo aliado** — um Apóstolo com aura dourada luta sozinho por 20 s (arma de fogo, machado ou faca). Máximo 2 ao mesmo tempo (4 durante o Ritual).
- **X: Selo do Conhecimento** — selo no chão por 6 s: aliados dentro causam +35% de dano e recuperam 4 de vida por segundo. Recarga 9 s.
- **R: Véu da Morte** — escudo de 25 pontos por 8 s para todos os aliados próximos (inclusive ele). Recarga 12 s.
- **C: Dissipar** — esquiva em fumaça.
- **F: Ritual dos Justos** (1x por sala) — invoca 3 Apóstolos aliados e, por 10 s, todo o grupo causa +50% de dano e recebe 30% menos dano.

### Códigos de desbloqueio
No **MULTIPLAYER ONLINE**, digite no campo do código de sala (maiúsculas ou minúsculas):
- `T4K4` → **Taka** (Arena de treino)
- `russianGirl` → **Clarice** (Arena de treino)
- `Fairs` → **Deus dos Justos**
O desbloqueio fica salvo no navegador. Terminar a cutscene do Santuário também desbloqueia o Deus dos Justos, e terminar o Capítulo 1 desbloqueia Taka e Clarice.

### Taka — espadachim (Arena de treino)
- **Z:** corte de katana. Com **uma katana**, corte forte e preciso (o alvo mais próximo); com **duas katanas**, cortes rápidos que pegam todos no arco.
- **Segurar Z:** uma katana = **Iai** (corte-relâmpago em linha, atravessa todos e fica invulnerável no avanço) · duas katanas = **redemoinho** (três giros ao redor).
- **Aparar:** o começo de cada corte apara — projéteis voltam contra o inimigo com **dobro de dano** ("DEFLETIDO"/"APARADO") e golpes corpo a corpo são anulados.
- **X:** alterna entre uma e duas katanas.
- **R (toque):** posiciona uma **chama roxa** à frente (até 3, ou 5 no jackpot). **Segurar R:** todas disparam ao mesmo tempo, com mira automática no inimigo mais próximo — o raio sai largo, **afina e some** (não é projétil).
- **F — Expansão de Domínio: Aposta Incansável** (1x; na Arena recarrega a cada 3 ondas): a arena vira um gramado com pétalas de sakura e uma grande cerejeira no meio, e um caça-níquel sorteia 3 números de 1 a 4. **Três iguais = JACKPOT**: bem mais rápido (+60%), muito mais forte (2,2x de dano), cortes mais rápidos, chamas sem espera, +40 de vida, por pelo menos 8 s. Se errar, gira de novo sozinho até o domínio acabar (14 s). Quando os dois primeiros números são iguais aparece **REACH!** e o terceiro tem 50% de chance de fechar (ajuste em `BALANCE.taka.gamble.reachBoost`; use 0.25 para sorteio puro).

### Clarice — escopeta, pistola e rituais (Arena de treino)
- **Z:** atira com mira automática. **Escopeta:** 6 chumbos, curto alcance, 3x o dano da Winchester do Zane, 4 cartuchos. **Pistola longa:** longo alcance, dano médio, 12 balas.
- **Segurar Z:** **armadilha de sangue** no chão (até 3): explode quando um inimigo pisa, causa dano e prende.
- **X:** troca escopeta ↔ pistola. **Segurar X:** **pássaros do conhecimento** (3 pássaros pequenos de olhos amarelos que bicam os inimigos por 12 s; recarga 15 s).
- **R:** recarrega. **Segurar R:** **Cura de Morte** (aura cinza: cura Clarice e os aliados próximos; recarga 12 s).
- **F — Controle Mental Forçado:** paralisa **todos os inimigos** da área por 4 s (chefes por 2,2 s) e apaga projéteis próximos.

No celular, **toque** e **segurar** funcionam nos botões CHAMAS (Taka), ARMA/PÁSS. e REC/CURA (Clarice). No gamepad: RB e Y.

### Viajante dos Espelhos — habilidades e limites

- **Correntes de Mil Elos** (longo alcance)
  - Toque: **perfuração**. A corrente é guiada pela sua direção enquanto voa e atravessa até 2 inimigos.
  - Carga média: **chicote** em arco. Acerta todos na faixa, mas não quem está colado em você.
  - Carga alta: **captura**. Prende o inimigo (zumbi 1,6 s, chefe 0,7 s) e puxa zumbis até você. O alvo fica imune a nova captura por alguns segundos.
- **Amarras de Mil Elos** (as correntes viram extensões dos braços)
  - Golpe concentrado com 40 de dano e empurrão, mas alcance curto.
  - Carga alta: **impacto** ao redor que atordoa. O personagem fica mais lento nessa forma.
- **Travessia (passiva):** Guevar não atravessa paredes, só **reflexos**. Esquivando (C) contra uma poça do chão, ele mergulha nela e despenca do teto sobre a outra poça; na biblioteca, esquivando contra um espelho, entra no reflexo e volta. Fora disso, C é uma esquiva normal.
- **Véu (R):** abre uma superfície refletora à frente que captura projéteis, gira e devolve contra o inimigo mais próximo, com o mesmo dano. Se a investida do chefe atingir o Véu, o Viajante é jogado para trás sem dano.
- **Ouroboros (F, 1x por sala; na Arena recarrega a cada 3 ondas):** uma espiral de correntes negras surge nas costas de Guevar. No **modo Ouroboros** (18 s) ele causa +30% de dano, as correntes alcançam +15%, anda 12% mais rápido e recebe 20% menos dano. **Apertando F de novo** (ou quando o modo acaba), a espiral se abre sobre a arena inteira (ou uma grande área nas salas maiores), converge no ponto com mais inimigos — ou no chefe — e **esmaga tudo ali dentro**: 230 de dano (com os bônus) em cada inimigo e cerca de 10% da vida dos chefes.

### Zane — Metamorfose (F, 1x por sala, 12 s)
Escolha com 1/2/3 (ou toque, ou X/Y/B no gamepad):
- **Tigre:** mais rápido. Z garras · segure Z: bote · X rugido (atordoa) · C esquiva.
- **Mamute:** lento e recebe metade do dano. Z presas em arco · segure Z: pisoteio · X investida.
- **Água:** regenera vida. Z jato · segure Z: onda (apaga projéteis) · X maré (empurra e cura aliados) · C dissolver.

Cada arma e cada forma tem seu próprio combo, **sem limite**: cada acerto soma +1 no multiplicador de dano (x1, x2 … x8, x9…). Ficar 2,5 s sem acertar com aquela arma zera o combo. Todos os números de equilíbrio estão no bloco `BALANCE`, no começo do script do `index.html`.

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
- **"Sala cheia":** a sala já tem 3 jogadores.
- **"A partida desta sala já começou":** espere o grupo chegar a uma transição (porta aberta depois do Carrasco ou a biblioteca) e tente de novo, ou peça ao anfitrião para voltar à sala (M no menu de pausa).
- **Onde está a Intersecção?** Foi substituída pelo Ouroboros (v10).
- **"Taka e Clarice jogam na Arena de treino":** no modo Capítulo 1 só entram Zane, Guevar e o Deus dos Justos. Troque de personagem ou mude o modo para Arena.
- **O modo Arena não aparece na sala:** o `server.js` do Render ainda é o antigo — envie o novo `server.js` também.
