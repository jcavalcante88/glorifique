-- =====================================================================
-- GLORIFIQUE — preparação do banco Neon para o Power BI
-- Rode este arquivo no SQL Editor do Neon (console.neon.tech) DEPOIS
-- de criar as tabelas com "npm run db:push".
-- =====================================================================

-- 1) Usuário SOMENTE LEITURA para o Power BI (troque a senha!)
CREATE ROLE powerbi_leitura WITH LOGIN PASSWORD 'TROQUE-POR-UMA-SENHA-FORTE';
CREATE SCHEMA IF NOT EXISTS relatorios;
GRANT USAGE ON SCHEMA relatorios TO powerbi_leitura;

-- 2) Visões (views) — o Power BI enxerga só isto, nunca e-mails ou tokens

-- Testemunhos (sem dados pessoais)
CREATE OR REPLACE VIEW relatorios.vw_testemunhos AS
SELECT
  t.id,
  t.categoria,
  t.status,
  t.visualizacoes,
  t.duracao_seg,
  t.aceita_contato,
  t.criado_em::date        AS data_envio,
  t.moderado_em::date      AS data_moderacao,
  EXTRACT(EPOCH FROM (t.moderado_em - t.criado_em)) / 3600 AS horas_ate_moderar
FROM testemunhos t;

-- Pedidos de conversa por testemunho/categoria
CREATE OR REPLACE VIEW relatorios.vw_conversas AS
SELECT
  p.id,
  p.status,
  p.criado_em::date AS data_pedido,
  t.categoria,
  t.id AS testemunho_id
FROM pedidos_conversa p
JOIN testemunhos t ON t.id = p.testemunho_id;

-- Novos cadastros por dia e por forma de login
CREATE OR REPLACE VIEW relatorios.vw_cadastros AS
SELECT
  u.criado_em::date AS data_cadastro,
  COALESCE(a.provider, 'email') AS forma_login,
  COUNT(*) AS total
FROM "user" u
LEFT JOIN account a ON a."userId" = u.id
GROUP BY 1, 2;

-- Resumo por categoria (bom para gráfico de barras)
CREATE OR REPLACE VIEW relatorios.vw_resumo_categoria AS
SELECT
  t.categoria,
  COUNT(*) FILTER (WHERE t.status = 'aprovado') AS publicados,
  COALESCE(SUM(t.visualizacoes), 0)             AS visualizacoes,
  (SELECT COUNT(*) FROM pedidos_conversa p
     JOIN testemunhos t2 ON t2.id = p.testemunho_id
    WHERE t2.categoria = t.categoria)           AS pedidos_conversa
FROM testemunhos t
GROUP BY t.categoria;

GRANT SELECT ON ALL TABLES IN SCHEMA relatorios TO powerbi_leitura;
