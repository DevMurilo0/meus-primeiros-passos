---
name: "Escola Meus Primeiros Passos — identidade provisória"
description: "Proposta independente: acolhimento editorial para famílias e clareza operacional para professores."
colors: {"paper": "#faf8f1", "ink": "#244d40", "green": "#214e41", "green-hover": "#173c31", "muted": "#62685d", "sage": "#e7eddf", "peach": "#f3e3d9", "pink": "#f0e0dd", "yellow": "#f1e6c8", "lavender": "#e9e5f0", "line": "#e6e9e0", "white": "#fff", "accent": "#a95e43", "portal-paper": "#f7f8f3", "portal-line": "#e8ece3", "focus": "#b17332", "field-border": "#d7dcd3", "status-success-bg": "#eef4e8", "status-success-text": "#4d6e36", "status-attention-bg": "#f9efdc", "status-attention-text": "#806021", "status-neutral-bg": "#f1f3ed", "status-neutral-text": "#617057"}
typography: {"display": {"fontFamily": "Fraunces, Georgia, serif", "fontSize": "clamp(56px, 5.9vw, 88px)", "fontWeight": 400, "lineHeight": 1.08, "letterSpacing": "-0.04em"}, "headline": {"fontFamily": "Fraunces, Georgia, serif", "fontSize": "clamp(36px, 3.6vw, 54px)", "fontWeight": 400, "lineHeight": 1.16, "letterSpacing": "-0.04em"}, "portal-title": {"fontFamily": "Fraunces, Georgia, serif", "fontSize": "35px", "fontWeight": 400, "lineHeight": 1.2, "letterSpacing": "-0.045em"}, "body": {"fontFamily": "Manrope, Arial, sans-serif", "lineHeight": 1.8}, "portal-body": {"fontFamily": "Manrope, Arial, sans-serif", "fontSize": "15px"}, "label": {"fontFamily": "Manrope, Arial, sans-serif", "fontSize": "13px", "fontWeight": 700, "lineHeight": 1.4}, "panel-title": {"fontFamily": "Manrope, Arial, sans-serif", "fontSize": "15px", "fontWeight": 700, "letterSpacing": "-0.02em"}}
rounded: {"button": "7px", "field": "8px", "stat": "9px", "panel": "10px", "modal": "13px", "nav": "6px", "status": "5px"}
spacing: {"xs": "8px", "sm": "12px", "md": "16px", "lg": "24px", "panel": "28px", "wide": "38px"}
components: {"button-primary": {"backgroundColor": "{colors.green}", "textColor": "{colors.paper}", "typography": "{typography.label}", "rounded": "{rounded.button}", "padding": "14px 23px"}, "button-primary-hover": {"backgroundColor": "{colors.green-hover}"}, "button-secondary": {"backgroundColor": "{colors.white}", "textColor": "{colors.ink}", "rounded": "{rounded.button}", "padding": "14px 23px", "typography": "{typography.label}"}, "button-portal": {"backgroundColor": "{colors.green}", "textColor": "{colors.portal-paper}", "rounded": "{rounded.button}", "padding": "11px 17px"}, "input": {"backgroundColor": "{colors.white}", "textColor": "{colors.ink}", "rounded": "{rounded.field}", "padding": "11px 13px"}, "nav-active": {"backgroundColor": "{colors.green}", "textColor": "{colors.portal-paper}", "rounded": "{rounded.nav}", "padding": "14px 12px"}, "panel": {"backgroundColor": "{colors.white}", "rounded": "{rounded.panel}"}, "status-success": {"backgroundColor": "{colors.status-success-bg}", "textColor": "{colors.status-success-text}", "rounded": "{rounded.status}", "padding": "5px 9px"}}
---

## Overview

**Creative North Star: "Um começo acolhedor, uma rotina clara"**

O nome “primeiros passos” vira um caminho de papel que sai de um livro e atravessa um portal. Essa forma reaparece no símbolo, nas etapas e no convite final. As ilustrações SVG são conceituais e autorais, nunca fotografias ou uma representação dos espaços reais. A identidade depende de validação da direção.

O institucional (Persuade) usa composição editorial, serifas expressivas, arte vetorial com campos suaves e seções de ritmos distintos. O portal (Operate) usa a mesma paleta com hierarquia operacional, sidebar, tabelas e formulários claros. Conteúdo fictício sempre identificado. Marca oficial, fotos autorizadas e backend continuam pendentes.

**Key Characteristics:**
- Caminho/portal como assinatura visual recorrente.
- Papel claro e verde profundo com campos suaves de cor.
- Serifas editoriais e interface de leitura direta.
- Superfícies de persuasão e operação com densidades distintas.

Fontes normativas: `src/styles/global.css`, `src/styles/home.css` e `src/styles/portal.css`. Os tokens no frontmatter registram valores atuais; não constituem identidade aprovada. Referências e licenças estão registradas abaixo e em `docs/`.

## Colors

Primary: verde profundo em ações e navegação ativa; tinta verde em texto. Secondary: terracota em ênfase editorial. Tertiary: sálvia, pêssego, rosa, amarelo e lavanda em campos ilustrativos, ícones e agrupamentos. Neutral: papel institucional, branco e linhas discretas. O portal sobrescreve papel e linha com seus tokens próprios; a tela de entrada permanece branca com campo sálvia.

Status usa pares próprios de fundo/texto para sucesso, atenção e neutro. O foco usa ocre e não depende apenas do fundo do componente. A paleta local das ilustrações contém variações que não são tokens globais.

**The Surface Scope Rule.** Respeitar os tokens de papel e linha de cada superfície; o portal tem substituições locais próprias.

## Typography

Fraunces variável local (pesos disponíveis 100–900) fornece títulos e momentos acolhedores. Manrope variável local (200–800) fornece leitura, controles e dados. Ambas usam `font-display: swap`, com fallbacks definidos no frontmatter. Licenças OFL em `public/fonts/OFL-*.txt`; o uso não depende de requisições externas.

O hero institucional usa o papel display; a partir de 600px ou menos passa a `clamp(33px, 8.7vw, 52px)`, entrelinha 1.16. Há ajustes intermediários de 59px em até 900px e valor de 88px acima de 1500px. Títulos internos do portal usam serifas, mas títulos de painéis usam Manrope. O corpo varia conforme contexto; não há tamanho global único. Números de estatísticas e chamadas usam algarismos tabulares.

**The Operational Type Rule.** Manter tabelas, formulários e navegação em Manrope; reservar a serifa para títulos e acolhimento.

## Layout

Institucional (Persuade): largura limitada (1280px) e margens laterais de 56px; em até 900px, margens de 32px; em até 600px, 20px. Hero assimétrico em duas colunas (1.14fr/1fr), com sobreposição intencional de título e arte. Ritmo amplo entre seções, alternando campo escuro, índice com prévia, etapas em arco, convite ilustrado e perguntas. Menu compacto aparece em até 900px; hero e principais seções empilham em até 600px.

Portal (Operate): sidebar de 235px, cabeçalho de 88px e conteúdo limitado a 1450px com padding padrão de 30px 38px 36px. Sidebar vira gaveta de 250px em até 760px; conteúdo chega a 22px 18px em até 560px. Estatísticas, listas, filtros e painéis ajustam colunas por contexto. Tabelas preservam rolagem horizontal interna. Breakpoints reais adicionais: 1200px, 1000px e 1600px no portal; 1150px e 1500px no institucional. A entrada do portal passa de duas colunas a uma em até 760px, ocultando a arte lateral.

Espaçamentos no frontmatter são valores recorrentes observados, não uma escala rígida aplicada a cada elemento.

## Elevation & Depth

Painéis são predominantemente planos, definidos por campos de cor e bordas finas. Sombras sinalizam sobreposição ou interação: botão em hover (`0 5px 16px #214e4117`), menu mobile (`0 14px 40px #173c3120`), notificações (`0 12px 35px #183c3215`), modal (`0 20px 80px #193e3229`) e toast (`0 8px 30px #173c3126`). O backdrop do modal é `#1b32296b`. O inset da seleção de frequência é feedback de controle, não elevação de painel.

**The Quiet Depth Rule.** Usar profundidade para estados e camadas; painéis de rotina permanecem planos.

## Shapes

Controles têm cantos suavizados, painéis um pouco mais amplos e modal com raio próprio, conforme tokens. Navegação ativa e status têm raios menores. Avatares e acionadores ilustrados são circulares. A arte de descobertas usa contorno orgânico; etapas usam topo em arco (`100px 100px 9px 9px`). Essas silhuetas pertencem ao institucional e não são a forma padrão de tabelas e formulários.

## Components

Botões: primário verde com texto de papel, secundário branco com borda discreta; altura mínima padrão de 49px. Hover muda o fundo e o primário recebe sombra; pressão reduz escala para 0.98. No portal e em modais, controles usam fonte de 14px, padding de 11px 17px e mínimo de 42px. Em telas pequenas, existem ajustes locais. Links de texto deslocam a seta brevemente.

Campos: fundo branco, borda fina e padding definido no frontmatter. Filtros têm altura de 41px e padding específico; formulários mobile sobem o mínimo a 44px. Foco compartilhado usa outline ocre de 3px com offset de 4px. Desabilitados mostram cursor indisponível e opacidade 0.48.

Navegação: institucional usa links com sublinhado animado e menu compacto verde. Portal usa lista vertical, item ativo verde e hover claro; em telas pequenas vira gaveta. Indicadores de status são pequenos rótulos com texto explícito, sem simular ação.

Painéis e tabelas: fundo branco com bordas próprias do portal e raios de painel; títulos operacionais compactos; overflow de tabelas fica em contêiner interno. Modais nativos usam camada escura e raio próprio. Estados vazios, erros, notificações e confirmação por toast acompanham as operações em memória.

Índice com prévia: linhas editoriais com título em serifa, acionador circular e conteúdo selecionado expandido; a ilustração muda com transição breve. Símbolo e ilustrações repetem caminho, livro e portal, com legendas de arte conceitual.

Movimento: easing compartilhado `cubic-bezier(0.22, 1, 0.36, 1)`; controles em cerca de 0.18–0.25s, conteúdo em 0.3s, revelações em 0.65s e entrada do hero em até 1.1s. Deriva de nuvens e plantas dura 7–8s. `prefers-reduced-motion` elimina animações, reduz transições e restaura conteúdo oculto para revelação. Animações não condicionam cliques.

## Do's and Don'ts

### Do:
- Do identificar a arte conceitual e os dados fictícios.
- Do preservar contraste, foco visível e acesso a conteúdo com movimento reduzido.
- Do usar Manrope para tabelas, navegação e formulários.
- Do manter o caminho/portal como assinatura autoral provisória.

### Don't:
- Don't apresentar a identidade provisória como marca oficial.
- Don't apresentar ilustrações como fotos ou espaços reais da escola.
- Don't converter dados de demonstração em afirmações institucionais.

Referências e decisões preservadas da documentação original:

- [Awwwards · educação](https://www.awwwards.com/websites/education/): pesquisa de ritmo editorial e composição, incluindo FORMAT, Shorodo e Los Angeles Public Library listados na galeria. Nenhum layout ou asset de terceiros foi copiado; a leitura textual não permite afirmar inspeção de suas animações.
- [React Bits](https://reactbits.dev/): consulta de repertório de movimento; não houve cópia de componentes nem instalação de biblioteca de animação.
- Taste Frontend Design: sorteio de direção `one-motif`, com “Index with preview” convertido no seletor de descobertas. A composição principal segue o caminho/portal derivado do nome. Tipografia, cores, hero e imagens sugeridos pelo sorteio foram adaptados ao briefing acolhedor e à ausência de fotos autorizadas; não se aplicou a exigência de quatro fotografias genéricas porque conflitaria com o pedido.
- Impeccable UI: separação de superfícies de persuasão e operação, hierarquia, estados, acesso por teclado e revisão visual.
- Emil Design Engineering: transições curtas em controles, sequência sem atrasos artificiais, transform/opacity e respeito ao movimento reduzido.

As fontes Google Fonts são hospedadas localmente, sem requisição a terceiros durante o uso. Licenças e atribuições em `public/fonts/OFL-*.txt`.
