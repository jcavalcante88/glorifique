import {
  pgTable,
  text,
  timestamp,
  integer,
  boolean,
  uuid,
  primaryKey,
  index,
} from "drizzle-orm/pg-core";

/* ============================================================
   Tabelas do Auth.js (login com Google, GitHub e e-mail)
   Os nomes seguem o padrão exigido pelo @auth/drizzle-adapter.
   ============================================================ */

export const users = pgTable("user", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  criadoEm: timestamp("criado_em", { mode: "date" }).defaultNow().notNull(),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (t) => [primaryKey({ columns: [t.provider, t.providerAccountId] })]
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (t) => [primaryKey({ columns: [t.identifier, t.token] })]
);

/* ============================================================
   Tabelas do Glorifique
   ============================================================ */

// status: "pendente" (aguardando moderação) | "aprovado" | "rejeitado"
export const testemunhos = pgTable(
  "testemunhos",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    autorId: text("autor_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    titulo: text("titulo").notNull(),
    resumo: text("resumo").notNull(),
    categoria: text("categoria").notNull(),
    videoUrl: text("video_url").notNull(),
    duracaoSeg: integer("duracao_seg"),
    aceitaContato: boolean("aceita_contato").notNull().default(true),
    status: text("status").notNull().default("pendente"),
    visualizacoes: integer("visualizacoes").notNull().default(0),
    criadoEm: timestamp("criado_em", { mode: "date" }).defaultNow().notNull(),
    moderadoEm: timestamp("moderado_em", { mode: "date" }),
  },
  (t) => [
    index("testemunhos_status_idx").on(t.status),
    index("testemunhos_categoria_idx").on(t.categoria),
    index("testemunhos_autor_idx").on(t.autorId),
  ]
);

// Pedido de "quero conversar com essa pessoa"
// status: "novo" | "respondido"
export const pedidosConversa = pgTable(
  "pedidos_conversa",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    testemunhoId: uuid("testemunho_id")
      .notNull()
      .references(() => testemunhos.id, { onDelete: "cascade" }),
    solicitanteId: text("solicitante_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    mensagem: text("mensagem").notNull(),
    status: text("status").notNull().default("novo"),
    criadoEm: timestamp("criado_em", { mode: "date" }).defaultNow().notNull(),
  },
  (t) => [index("pedidos_testemunho_idx").on(t.testemunhoId)]
);

// Denúncias de conteúdo impróprio
export const denuncias = pgTable("denuncias", {
  id: uuid("id").primaryKey().defaultRandom(),
  testemunhoId: uuid("testemunho_id")
    .notNull()
    .references(() => testemunhos.id, { onDelete: "cascade" }),
  denuncianteId: text("denunciante_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  motivo: text("motivo").notNull(),
  resolvida: boolean("resolvida").notNull().default(false),
  criadoEm: timestamp("criado_em", { mode: "date" }).defaultNow().notNull(),
});
