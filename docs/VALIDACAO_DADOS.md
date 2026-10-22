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

A primeira consulta foi feita com pesquisa pública indexada; uma investigação posterior encontrou mídias servidas nos embeds públicos das publicações do perfil exato da escola. Os arquivos selecionados foram convertidos para WebP e registrados em inventário local. Foram descartados perfis `@escolaempp`, páginas de Salvador e de Saúde/BA: não há vínculo comprovado com o perfil fornecido.

## Pendências de confirmação

- Razão social, endereço completo, telefone, e-mail, responsáveis e canais adicionais.
- Etapas efetivamente oferecidas no período de implantação, idades, horários, vagas e serviços.
- História institucional, equipe, documentos pedagógicos, metodologia e características dos espaços.
- O logotipo foi fornecido diretamente pelo solicitante e está incorporado em `public/assets/brand/logo-mpp.png`. Permanecem pendentes um manual de marca, versão vetorial/alta resolução e confirmação da paleta e tipografia institucionais. A composição do site segue sendo uma proposta visual independente.
- Aprovação da redação editorial. Imaginar, explorar e conviver são temas conceituais, não serviços ou métodos afirmados.
- Confirmar com a instituição a disponibilidade de arquivos originais de maior qualidade e os termos de uso final. O solicitante informou autorização institucional para o projeto, mas autorizações individuais de imagem de pessoas identificáveis, especialmente crianças, devem ser confirmadas antes de divulgação pública.

## Imagens e direitos

**Fotografias reais de publicações públicas da instituição foram incorporadas.** Há nove arquivos WebP principais, com versões menores, em `public/assets/school/`. A galeria institucional exibe seis; outros três apoiam o hero e a seção de descobertas. A origem, o slide, os recortes e o contexto estão em `public/assets/school/inventory.json`. Não há hotlinks, fotografias da Escola Peralta ou imagens genéricas apresentadas como sendo da escola.

As ilustrações SVG são autorais, produzidas em código em `src/components/Illustration.tsx`, com legenda conceitual. Não representam os espaços reais. O símbolo em `Brand.tsx` e o favicon são criações provisórias para a proposta. Os arquivos de fontes ficam em `public/fonts`, com licenças OFL.

Para qualquer imagem adicional, registrar fonte, autoria, autorização e escopo no inventário, gerar formatos responsivos e revisar os recortes. O responsável pelo projeto informou que possui autorização institucional para uso do material; isso não substitui a conferência das autorizações individuais das pessoas identificáveis, sobretudo crianças, antes de publicar o site ou o PDF. Evitar subir originais ao repositório sem necessidade.

### Publicações de origem confirmadas

- Semana Maluca: https://www.instagram.com/p/DeeZjW_IN4A/ — colagens, cabelo criativo e mochilas.
- Corrida do Dia dos Pais: https://www.instagram.com/p/DcHT8nZCUxI/ — crianças e famílias em atividade.
- Atividade Cor Azul, Infantil I: https://www.instagram.com/p/DJ6myLjgebw/ — capa indexada.

**Ainda pendente:** confirmação de logotipo/manual de marca, endereço exato, contatos adicionais e liberação das imagens para distribuição pública.

## Dados demonstrativos

54 alunos, três turmas (1º, 2º e 3º anos), professora Marina Oliveira, notas, frequências e atividades são inteiramente fictícios. Nomes das turmas e distribuição de turnos não descrevem a operação real. A média aritmética simples é apenas ilustrativa e não constitui regra acadêmica da escola. O painel usa a data de referência fixa 21/10/2026 e a identifica como agenda ilustrativa. Os dados ficam em `src/features/demo/data.ts` e as informações institucionais em `src/config/school.ts`.


## Localização e mapa incorporado — verificação adicional (21/10/2026)

- Diretório [Locais do Brasil — Boa Vista, Gravatá](https://www.locaisdobrasil.com.br/bairro/boa-vista/gravata-pe?pagina=5) divulga **Rua São Sebastião, 59 — Boa Vista, Gravatá — PE, CEP 55644-130** para a Escola Meus Primeiros Passos.
- [Varejão do Estudante](https://www.varejao.com.br/ListaEscolas.aspx?argumento=Escola) confirma a **Rua São Sebastião** para a escola em Gravatá, sem número.
- A ficha de localização do provedor de mapas consultado também menciona **Rua Manoel Bezerra de Lima, 59** na linha principal, divergente dos diretórios. Há ainda registro de unidade **anexo** em Rua Djalma Pereira de Lima em listagem distinta, que não deve ser confundida com o endereço principal.
- O rodapé exibe o endereço corroborado pelos diretórios, **com aviso para confirmar a visita**. O iframe e o link externo pesquisam o nome completo da escola e Gravatá, sem fixar coordenadas supostamente exatas.
- Não converter esses dados em informação institucional definitivamente validada sem confirmação da escola.
