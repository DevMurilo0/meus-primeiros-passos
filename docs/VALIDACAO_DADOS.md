# Validação de dados institucionais

Consulta em 21/10/2026. Esta é uma proposta comercial independente, não um site oficial aprovado.

## Dados identificados em fontes públicas

| Informação                                              | Evidência e fonte                                                                                                     | Limite da verificação                                                                               |
| ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Nome: Escola Meus Primeiros Passos                      | Briefing e [perfil informado](https://www.instagram.com/escola_meus_primeiros_passos/)                                | Nome fornecido pelo solicitante e presente no resultado indexado do perfil exato.                   |
| Gravatá — PE                                            | Biografia indexada do mesmo perfil: “Gravatá - PE”                                                                    | Confirmar diretamente com a direção antes da publicação. Não foi possível ler o perfil completo.    |
| Educação Infantil ao 5º ano                             | Biografia indexada: “Educação Infantil ao 5º ano”                                                                     | Fundamenta somente as etapas, não a disponibilidade, idades, horários ou turmas reais.              |
| “Aprender com amor e propósito”                         | Biografia indexada do perfil exato                                                                                    | Mensagem transcrita da fonte; não representa uma metodologia verificada.                            |
| Comunicação sobre experiências, aprendizagem e memórias | Trecho público indexado do perfil exato                                                                               | Inspiração para a redação editorial; não prova uma metodologia.                                     |
| Evento familiar                                         | [Publicação indexada: Corrida do Dia dos Pais](https://www.instagram.com/escola_meus_primeiros_passos/p/DcHTwb2JL3T/) | Apenas título/trecho acessível; não há galeria local ou afirmação de calendário recorrente no site. |
| Canal de contato                                        | URL do Instagram fornecida pelo solicitante                                                                           | Os CTAs abrem esse perfil. Não há telefone ou WhatsApp inferidos.                                   |

A consulta foi feita com Firecrawl Search, incluindo a busca `site:instagram.com/escola_meus_primeiros_passos/`. A leitura direta com Firecrawl Scrape foi recusada pelo provedor por se tratar de site não suportado. A pesquisa web complementar não retornou resultados úteis. Foram descartados perfis `@escolaempp`, páginas de Salvador e de Saúde/BA: não há vínculo comprovado com o perfil fornecido.

## Pendências de confirmação

- Razão social, endereço completo, telefone, e-mail, responsáveis e canais adicionais.
- Etapas efetivamente oferecidas no período de implantação, idades, horários, vagas e serviços.
- História institucional, equipe, documentos pedagógicos, metodologia e características dos espaços.
- Logotipo oficial, manual de marca e paleta institucional. O símbolo de dois caminhos/portais, cores e tipografia são uma proposta provisória, sem reivindicação de identidade oficial.
- Aprovação da redação editorial. Imaginar, explorar e conviver são temas conceituais, não serviços ou métodos afirmados.
- Fotografias originais, autoria, permissão para reprodução e autorização de imagem. Não se deve inferir licença ou consentimento de uma publicação pública.

## Imagens e direitos

**Nenhuma fotografia real da instituição foi obtida com acesso e autorização verificáveis. Nenhuma fotografia de criança foi incorporada.** Não se copiaram fotos da Escola Peralta, nem se utilizaram imagens genéricas como se fossem da nova escola. Não há hotlinks do Instagram.

As ilustrações SVG são autorais, produzidas em código em `src/components/Illustration.tsx`, com legenda conceitual. Não representam os espaços reais. O símbolo em `Brand.tsx` e o favicon são criações provisórias para a proposta. Os arquivos de fontes ficam em `public/fonts`, com licenças OFL.

Reservar os futuros arquivos autorizados em `public/assets/school/`, registrar fonte, autoria, autorização, escopo e prazo em inventário, gerar WebP/AVIF com tamanhos responsivos e revisar os recortes. Fotografias identificáveis de crianças exigem confirmação expressa do direito de uso para o site e o PDF antes da publicação. Os originais não devem entrar no repositório sem necessidade.

## Dados demonstrativos

54 alunos, três turmas (1º, 2º e 3º anos), professora Marina Oliveira, notas, frequências e atividades são inteiramente fictícios. Nomes das turmas e distribuição de turnos não descrevem a operação real. A média aritmética simples é apenas ilustrativa e não constitui regra acadêmica da escola. O painel usa a data de referência fixa 21/10/2026 e a identifica como agenda ilustrativa. Os dados ficam em `src/features/demo/data.ts` e as informações institucionais em `src/config/school.ts`.
