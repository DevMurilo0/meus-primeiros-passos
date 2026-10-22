# Direção visual — álbum de primeiros passos

**Status:** proposta comercial independente, com **logotipo institucional fornecido pelo solicitante**. A composição, a tipografia e a paleta desta apresentação ainda são conceitos visuais, não um manual de marca homologado pela escola.

## Identidade institucional

A marca visual fornecida pelo solicitante foi preparada com transparência e incorporada como `public/assets/brand/logo-mpp.png`. `Brand.tsx` reaproveita essa imagem na navegação institucional, no rodapé, na entrada e na barra lateral do Portal do Professor. A versão colorida recebe uma pequena base creme na entrada violeta para legibilidade; o favicon usa o mesmo arquivo. Não foram recriados elementos da logo nem alteradas cores oficiais.

## Conceito

A página institucional é um álbum fotográfico interativo sobre infância, afeto, descoberta e movimento. Fotografias **reais** obtidas de publicações públicas do perfil exato da instituição entram em colagens editoriais, sem cópia de imagens da Escola Peralta. Os elementos de estrelas, flores e trilhas são ilustrações conceituais criadas em SVG/CSS. O portal preserva uma densidade visual mais operacional, usando os tons do site, sem aplicar movimento excessivo a tabelas e registros.

## Tokens vigentes

As variáveis normativas estão em `src/styles/global.css`.

| Papel | Token | Cor |
|---|---|---|
| Fundo creme | `--paper` | `#FFF5E9` |
| Texto principal | `--ink` | `#24313D` |
| Coral de destaque | `--coral` | `#F15B6C` |
| Amarelo | `--yellow` | `#FFC247` |
| Violeta | `--violet` | `#6554D8` |
| Turquesa | `--turquoise` | `#21A8A0` |

Essa paleta é uma interpretação criativa das atividades coloridas da escola, não uma extração confirmada do manual de marca. Contraste e fontes de texto devem ser verificados no navegador.

## Tipografia e composição

- Red Hat Display Black (arquivo local) para grandes títulos institucionais.
- Manrope (local) para textos, botões e interface de operação.
- Fraunces permanece disponível para algumas superfícies institucionais legadas.
- Hero: fotografia da Corrida do Dia dos Pais e recorte da Semana Maluca; palavras grandes, disco amarelo, trilha e flor clicável.
- Capítulos: campo violeta para a história, transições cromáticas para descobertas e etapas, galeria-colagem rosada, campo turquesa para comunidade e convite final coral.
- Fotografias são tratadas com recortes, máscaras e molduras editoriais; links de origem e textos alternativos acompanham os registros.

## Motion design

- `src/components/SiteMotion.tsx`: IntersectionObserver + Web Animations API com entrada por máscara ou transformação; parallax limitado em requestAnimationFrame; atração magnética somente em ponteiro preciso.
- `src/components/PlayfulArt.tsx`: adesivo-flor interativo e trilhas.
- `src/styles/home.css`: entrada coreografada do hero, faixa contínua e transições de galeria.
- Botão “Pausar movimento”, preferência por movimento reduzido e compatibilidade de teclado são parte da experiência.
- Movimento nunca deve impedir a interação e precisa respeitar `prefers-reduced-motion`.

## Fotografia e proveniência

Consultar `public/assets/school/inventory.json` e `docs/VALIDACAO_DADOS.md`. As imagens foram convertidas para WebP e versões menores sem depender de hotlinks. A autorização geral foi informada pelo solicitante; aprovações individuais de imagem e autorização para publicação pública devem ser validadas antes de qualquer divulgação.

## Portal demonstrativo

Dados fictícios e interações somente em memória. A identidade visual usa as mesmas variáveis cromáticas, mas evita motion excessivo na manipulação de registros. Não há login real, banco de dados ou implantação de serviços.

## Qualidade

Conferir desktop e mobile, foco, contraste, navegação por teclado, testes do portal e estados vazios. A nova suíte de verificação automatizada no GitHub é uma camada adicional, não substitui revisão visual.


## Extensões de navegação e presença física (outubro/2026)

- Navegação desktop com foco e hover de camada lavanda, sublinhado coral animado e feedback discreto no acesso ao portal. Menu mobile recebe entrada curta, sem atrasar o clique.
- Barra de progresso de leitura passiva implementada em `ReadingProgress.tsx` com `requestAnimationFrame` e `prefers-reduced-motion` preservado nas animações decorativas.
- `ExplorePaths.tsx`: três caminhos reais para explorar a escola, o álbum de fotografias e a demonstração do portal; seleção por botões com `aria-pressed` e conteúdo que acompanha a opção.
- Rodapé com mapa Google Maps em iframe quadrado, carregamento adiado e alternativa de navegação externa, usando o nome e a cidade no mapa para não fixar localização duvidosa.
- Crédito de desenvolvimento ligado ao portfólio de Murilo Gabriel.

- O componente `SchoolMap.tsx` oferece uma prévia cartográfica **abstrata e declaradamente sem escala** que funciona sem conexão; um clique ativa o mapa Google incorporado. Mantém o link direto para o serviço caso o iframe seja bloqueado. O componente não inventa um ponto geográfico exato.


## Rodapé cromático

O rodapé termina em três campos de cor: localização turquesa com mapa, faixa amarela de palavras e núcleo azul-petróleo com logo oficial, headline editorial, navegação e contato. A linha de autoria de Murilo Gabriel permanece com link ao portfólio. Foi retirada a frase “Proposta de experiência digital · apresentação independente” da interface e configuração, sem alterar a natureza demonstrativa documentada do projeto.


## Fotografia cinética — entradas por capítulo (outubro/2026)

- A fotografia na seção **“Amor no começo”** usa entrada `bloom` com deslocamento lateral, rotação e máscara vertical suave.
- **Descobertas** usa `rise` na primeira aparição; na troca entre abas mantém sua transição de imagens local sem reanimar toda a seção.
- **Comunidade** usa `swing`, com movimento editorial lateral em sintonia com o ângulo do quadro.
- **Galeria** usa `cascade`, com delays curtos escalonados a cada coluna; filtros dinâmicos são observados automaticamente.
- **ExplorePaths** usa `lift`; a troca de fotografia após clicar mantém feedback próprio.
- O **hero** conserva as molduras originais e ganha uma revelação fotográfica em duas camadas dentro delas, preservando o carregamento prioritário.
- Todas as imagens recebem hover de profundidade somente com ponteiro fino; o lightbox ganha entrada rápida com escala e foco.
- Coreografia coordenada em `SiteMotion.tsx` (IntersectionObserver e Web Animations API), sem nova biblioteca. Fotos continuam visíveis sem JavaScript, com pausa e `prefers-reduced-motion` desligando movimento.


## Caderno de capítulos — extensão da linguagem visual

A Escola Meus Primeiros Passos tem registros documentados no inventário de mídias do perfil público, em especial a Corrida do Dia dos Pais e a Semana Maluca. A seção `MemoryChapters.tsx` reúne esses dois capítulos em um álbum editorial com fotos locais, duas camadas de recortes, furinhos de filme e textos de contexto **sem testemunhos inventados**. O usuário escolhe pelos nomes dos eventos ou por setas, e cada capítulo inclui o link da publicação original. A logo transparente cedida pelo solicitante aparece como selo na página do álbum, preservando proporções e legibilidade. As transições são coordenadas e desativadas em movimento reduzido. Não houve coleta nova de publicações: o Instagram bloqueou consulta externa nesta etapa; a fonte é o inventário existente em `public/assets/school/inventory.json`.
