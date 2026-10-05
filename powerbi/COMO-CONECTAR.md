# Conectando o Power BI ao Glorifique

Sim, dá para usar o Power BI! O Neon é um PostgreSQL, e o Power BI Desktop
tem conector nativo para PostgreSQL.

## Passo a passo

1. **Prepare o banco**: abra o SQL Editor no painel do Neon e rode `analytics.sql`
   (troque a senha antes). Isso cria um usuário que só consegue LER relatórios.
2. **No Neon**, copie os dados de conexão: *Connection Details* → host
   (algo como `ep-xxxx.sa-east-1.aws.neon.tech`) e nome do banco (`neondb`).
3. **No Power BI Desktop**: *Obter dados* → *Banco de dados PostgreSQL*
   - Servidor: o host do Neon
   - Banco de dados: `neondb`
   - Modo: **Importar** (mais rápido e não gasta o banco a cada clique)
4. Credenciais: aba **Banco de dados** → usuário `powerbi_leitura` + a senha que você definiu.
5. Marque as visões do schema `relatorios` (`vw_testemunhos`, `vw_conversas`,
   `vw_cadastros`, `vw_resumo_categoria`).

## Ideias de painéis

- Testemunhos publicados por categoria (barras)
- Visualizações ao longo do tempo (linha)
- Categorias que mais geram pedidos de conversa → mostram onde há mais dor
- Tempo médio até moderar (cartão/KPI) → ajuda a equipe a não deixar ninguém esperando
- Cadastros por forma de login (Google × GitHub × e-mail)

## Observações

- Se der erro de SSL, confira se a conexão está exigindo SSL (o Neon exige).
- Para atualização automática no Power BI Service (online), pode ser
  necessário configurar um gateway ou credenciais na nuvem, dependendo do seu plano.
- **Nunca** use o usuário principal do banco no Power BI — use sempre o `powerbi_leitura`.
