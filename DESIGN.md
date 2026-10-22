# Direção visual — álbum de primeiros passos

**Status:** identidade gráfica de proposta comercial independente, **não** marca homologada da Escola Meus Primeiros Passos.

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
