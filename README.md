# Escola Meus Primeiros Passos

Proposta comercial independente: site institucional e Portal do Professor demonstrativo. Não é o site oficial da instituição. React + TypeScript + Vite + BrowserRouter, sem dependência de backend.

## Iniciar

Node.js 22.18+ e npm:

```bash
npm install
npm run dev
```

Abra http://localhost:5173. Portal: http://localhost:5173/portal. Clique em **Entrar na demonstração**. Não precisa de .env, Supabase, senha ou conta.

```bash
npm run typecheck
npm run lint
npm test
npm run build
npm run test:browser
```

Para testes de navegador, instale o Chromium com `npx playwright install chromium` caso ainda não exista. `PLAYWRIGHT_CHROMIUM_EXECUTABLE` permite indicar um navegador existente. `npm run preview` serve o build. Em hospedagem futura, configurar fallback SPA para `index.html` nas rotas do BrowserRouter; não houve deploy.

## O que explorar

- Institucional: hero fotográfico com colagem, tipografia cinética, faixa animada, galeria filtrável com ampliação, momentos da escola, etapas, comunidade, perguntas e contato pelo Instagram.
- Portal: painel com indicadores derivados dos fixtures, turmas e detalhes, pesquisa de alunos e modal individual, quatro períodos, notas editáveis com validação e média, chamada por data, atividades e criação/conclusão local.
- Dados fictícios ficam em memória: salvar preserva durante a navegação; recarregar reinicia. Rascunhos não salvos devem ser salvos antes de trocar os filtros.
- Menu mobile, atalhos, notificações ilustrativas, perfis, estados vazios, feedback e reinício da demonstração.

## Organização

`src/app`: rotas e proteção contra erros de renderização. `src/config`: conteúdo institucional. `src/components`: identidade, arte, movimento e diálogos. `src/features/demo`: fixtures e estado isolado. `src/pages`: apresentação. `src/shared/academic`: tipos e funções puras reaproveitados da base. `src/styles`: tokens e superfícies.

A Escola Peralta foi lida como referência técnica e permaneceu intacta. Foram mantidos React/TypeScript/Vite/BrowserRouter, a separação por módulos e os tipos acadêmicos e funções puras de notas. Os componentes antigos de gestão eram acoplados aos serviços remotos; sua apresentação foi refeita para um provider em memória. Nenhum segredo, imagem, configuração de produção ou histórico Git foi copiado. As dependências foram instaladas novamente.

## Dados, imagens e apresentação

- [Validação de dados e imagens](docs/VALIDACAO_DADOS.md)
- [Integrações pendentes](docs/INTEGRACOES_PENDENTES.md)
- [Direção visual](DESIGN.md)
- [Capturas desktop e mobile](docs/apresentacao/)

Fotografias de publicações públicas da instituição foram incorporadas localmente em WebP; origens, recortes e necessidade de validar as autorizações individuais antes de divulgação pública estão no inventário `public/assets/school/inventory.json`. A marca exibida no cabeçalho, no rodapé, no Portal do Professor e no favicon usa o logotipo fornecido diretamente pelo solicitante; o arquivo transparente otimizado está em `public/assets/brand/logo-mpp.png`. A composição visual do site continua sendo uma proposta independente. A tipografia principal da homepage é Red Hat Display, com Manrope para leitura; há também Fraunces no projeto. Nenhum dado real de aluno ou professor é utilizado no portal.


## Verificação contínua e capturas

O fluxo do GitHub Actions em `.github/workflows/quality.yml` instala dependências, executa checagens e publica um artefato com capturas de desktop/mobile. As imagens antigas de `docs/apresentacao/` são registros anteriores à reformulação; o fluxo automatizado gera `docs/apresentacao/atualizadas/` e, após testes aprovados, tenta versionar as capturas com um commit do GitHub Actions. As imagens também ficam disponíveis como artefatos do workflow. O workflow não faz deploy nem altera sistemas externos.

## Compartilhamento social — WhatsApp, Instagram, Facebook e outras redes

A homepage disponibiliza metadados Open Graph e Twitter Card **estáticos**, escritos no `index.html` (e não após a renderização React). O cartão principal utiliza logo fornecida pelo responsável, cores do site e fotografia real autorizada da escola.

- URL da página: `https://meus-primeiros-passos.vercel.app/`
- Imagem pública: `https://meus-primeiros-passos.vercel.app/og-meus-primeiros-passos-2026.jpg`
- Arquivo: `public/og-meus-primeiros-passos-2026.jpg` (1200 × 630, JPEG otimizado).
- A arte é gerada com `python scripts/generate_social_preview.py` e requer Pillow. O workflow de qualidade a gera e, após os testes, versiona a imagem junto das capturas.
- Para alterar título, descrição ou domínio, sincronizar `index.html` e o teste `tests/browser/social-preview.spec.ts`.
- O campo `robots=noindex,nofollow` continua presente por se tratar de uma demonstração; não confundir com a configuração de compartilhamento.
- O aplicativo de mensagens pode manter em cache uma prévia antiga. Ao trocar a arte no futuro, usar um novo nome de imagem para forçar atualização.
