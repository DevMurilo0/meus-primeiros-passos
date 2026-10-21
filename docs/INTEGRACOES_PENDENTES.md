# Integrações pendentes

A proposta é um frontend local. Não há Supabase, backend, credenciais, contas, autenticação, envio de mensagens ou operações administrativas remotas. A entrada explicita o caráter demonstrativo e não simula um login seguro. Rotas do portal são abertas de propósito.

Após eventual aprovação comercial, definir e implementar:

- Autenticação real, recuperação de acesso, ciclo de vida de usuários e proteção de rotas e APIs.
- Perfis e permissões por turma, gestão administrativa, auditoria e política de acesso.
- Banco independente, modelagem, migrações, backups, restauração e ambientes isolados.
- Matrículas, cadastros permanentes, regras acadêmicas e dados autorizados da instituição.
- Critérios de avaliação, períodos, calendário, frequência, justificativas e relatórios oficiais. Definir avaliação descritiva apropriada para Educação Infantil, sem reutilizar as notas demonstrativas do Fundamental.
- Persistência, sincronização, concorrência, validação no servidor e proteção contra perda de alterações.
- Relatórios, impressão, exportação e documentos com validade institucional.
- Integrações administrativas, notificações e comunicação com famílias, somente se contratadas.
- Tratamento de dados pessoais, autorizações, retenção, exclusão e revisão de conformidade.
- Hospedagem, domínio, TLS, CSP, cabeçalhos, monitoramento, suporte e implantação.
- Validação dos textos, logotipo oficial e liberação de uso das fotografias antes de publicação.

## Fronteira atual

`src/config/school.ts` centraliza dados institucionais. `src/features/demo/data.ts` fornece fixtures tipadas. `src/features/demo/context.tsx` oferece o estado em memória. As telas não importam clientes de banco nem endpoints. As operações demonstrativas atualizam esse estado e exibem feedback que informa seu escopo. Recarregar a página reinicia os dados; navegar entre telas preserva o que foi salvo na sessão React. Alterações ainda não salvas nos formulários são rascunhos locais.

Para a integração futura, substituir o provedor por uma camada de repositório tipada, com consultas, estados assíncronos, validação, autorização e persistência no servidor. Não confundir o provider em memória com controle de segurança.

Não foram copiados Worker, configuração de produção, .env, .dev.vars, migrations, histórico Git ou imagens da Escola Peralta. Não executar seed, deploy ou comandos remotos deste projeto de origem.
