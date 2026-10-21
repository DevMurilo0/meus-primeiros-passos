# Capturas da proposta

Capturas reais em Chromium, com fontes locais carregadas e movimento reduzido apenas para estabilizar as imagens. Não são mockups externos.

- `hero-1440.png`, `hero-390.png`, `hero-768.png`: apresentação inicial em desktop, celular e tablet.
- `institucional-*.png`: página completa.
- `escola-1440.png`, `descobertas-1440.png`: trechos da narrativa.
- `entrada-*`, `painel-*`, `turmas-*`, `alunos-*`, `notas-*`, `frequencia-*`, `atividades-*`: portal demonstrativo, em desktop e celular.

Todas as imagens institucionais são ilustrações conceituais próprias, sem fotografias reais da escola. Todos os nomes e registros do portal são fictícios. Uso destinado à apresentação desta proposta independente, sem vínculo de contratação ou aprovação.

## Verificação

- TypeScript, ESLint, 9 testes unitários e build de produção.
- 12 testes Playwright: navegação, pesquisa, modal e devolução de foco, notas e validação, troca de períodos, chamada por data, reinício dos registros, atividades, ausência de chamadas a serviços externos.
- Geometria das oito rotas em 360, 390, 768, 1366 e 1440 px, sem transbordamento da página. Tabelas largas usam rolagem interna.
- Axe WCAG 2 A/AA e 2.1 AA nas telas capturadas de desktop/celular; `revisao.json` vazio significa nenhuma violação ou transbordamento detectado na rodada final.
- Movimento normal confirmado no navegador: animações `sun-breathe`, `plant-sway` e revelações por rolagem (`movimento.json`). Movimento reduzido preserva conteúdo e uso.
- Revisão independente de acabamento: ajustes do hero tablet e do reinício dos rascunhos confirmados como resolvidos.

Reproduzir a captura automatizada com servidor local ativo: `node scripts/review.mjs`. O script usa Chromium instalado pelo Playwright ou `PLAYWRIGHT_CHROMIUM_EXECUTABLE` e aceita `REVIEW_URL`. A captura tablet e os recortes editoriais foram feitos adicionalmente durante a revisão.

A verificação automatizada complementa a revisão visual; não equivale a certificação completa de acessibilidade ou a testes em dispositivos físicos.

O inspetor Taste concluiu sem falhas com duas exceções explícitas: exigência de imagens raster (não há fotos autorizadas; o briefing impede substitutos enganosos) e classificação da legenda conceitual como kicker (a legenda existe para identificar a natureza da arte). Os avisos restantes são escolhas documentadas: papel quente, variações responsivas de tamanho tipográfico e ausência de vídeo institucional autorizado. O detector Impeccable retornou lista vazia.
