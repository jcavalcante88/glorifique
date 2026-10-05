# 🕊️ Glorifique

> Você não ouve uma teoria. Ouve alguém igual a você.

Banco de testemunhos em vídeo de vidas transformadas por Jesus, organizados por
situação de vida, com a opção "Quero conversar com essa pessoa".

**Stack:** Next.js 16 · JavaScript · Bootstrap 5 · Neon (PostgreSQL) · Drizzle ·
Auth.js (Google, GitHub, e-mail) · Vercel Blob · Upstash · Vercel · Power BI

---

## 🚀 Rodando no seu computador (VS Code)

```bash
npm install
cp .env.example .env.local     # no Windows: copy .env.example .env.local
npx auth secret                # gera o AUTH_SECRET e salva no .env.local
npm run db:push                # cria as tabelas no Neon
npm run dev                    # abre em http://localhost:3000
```

> ⚠️ O `npm run db:push` lê o arquivo `.env`. Duplique o `.env.local` como `.env`
> (os dois já estão no `.gitignore`, então não vão para o GitHub).

---

## 🔑 Configurando cada serviço

### 1. Neon (banco de dados)
1. Crie um projeto em https://console.neon.tech (região **São Paulo / sa-east-1**).
2. Copie a *connection string* → `DATABASE_URL`.

### 2. Login com Google
1. https://console.cloud.google.com/apis/credentials → **Criar credenciais → ID do cliente OAuth** → *Aplicativo da Web*.
2. **URIs de redirecionamento autorizados:**
   - `http://localhost:3000/api/auth/callback/google`
   - `https://SEU-SITE.vercel.app/api/auth/callback/google`
3. Copie para `AUTH_GOOGLE_ID` e `AUTH_GOOGLE_SECRET`.

### 3. Login com GitHub
1. https://github.com/settings/developers → **New OAuth App**.
2. *Authorization callback URL:* `http://localhost:3000/api/auth/callback/github`
   (crie um segundo OAuth App para produção com a URL da Vercel).
3. Copie para `AUTH_GITHUB_ID` e `AUTH_GITHUB_SECRET`.

### 4. Login por e-mail (Resend)
1. Crie conta em https://resend.com, verifique um domínio e gere uma API Key.
2. Preencha `AUTH_RESEND_KEY` e `EMAIL_FROM`.
   *(Sem domínio próprio, o Resend só envia para o seu próprio e-mail — bom para testar.)*

### 5. Vídeos (Vercel Blob)
No painel da Vercel → seu projeto → **Storage → Create → Blob**. O `BLOB_READ_WRITE_TOKEN`
é adicionado sozinho. Para usar localmente: `npx vercel env pull .env.local`.

### 6. Proteção contra ataques (Upstash Redis)
Vercel → **Storage / Marketplace → Upstash Redis** (plano grátis). As variáveis
`UPSTASH_REDIS_REST_URL` e `UPSTASH_REDIS_REST_TOKEN` entram sozinhas.
Sem isso, o limite funciona só na memória (ok para testar, fraco em produção).

### 7. Administrador
Coloque seu e-mail em `ADMIN_EMAILS`. Ao entrar com ele, aparece **Moderação** no menu.

---

## ☁️ Publicando (GitHub + Vercel)

```bash
git init
git add .
git commit -m "Glorifique: primeira versão"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/glorifique.git
git push -u origin main
```
Depois: https://vercel.com/new → importe o repositório → cole as variáveis do
`.env.local` em **Settings → Environment Variables** → **Deploy**.
Lembre de trocar `NEXT_PUBLIC_SITE_URL` para o endereço final.

---

## 🛡️ Segurança incluída

| Proteção | Onde |
|---|---|
| Limite de requisições por IP (120/min) e no login (10 a cada 10 min) | `src/proxy.js` |
| Limite de envios (5/h) e de pedidos de conversa (10/h) por usuário | `src/lib/ratelimit.js` |
| Validação de todos os dados com Zod | `src/lib/validacao.js` |
| Login sem senha (OAuth / link mágico) e sessão em cookie criptografado | `src/auth.js` |
| Content-Security-Policy, HSTS, anti-clickjacking, nosniff | `next.config.mjs` |
| Proteção CSRF nativa das Server Actions | Next.js |
| Upload só de vídeo, até 150 MB, só para usuários logados | `src/app/api/upload/route.js` |
| Moderação antes de publicar + denúncias | `/admin` |
| Usuário somente-leitura para o Power BI | `powerbi/analytics.sql` |

---

## 📊 Power BI
Veja `powerbi/COMO-CONECTAR.md`.

## 🤖 Usando com o Claude Code
- `CLAUDE.md` — explica o projeto e as regras para o Claude.
- `.claude/skills/revisao-seguranca` — digite `/revisao-seguranca` para uma auditoria.
- `.claude/skills/nova-pagina` — digite `/nova-pagina` ou peça "crie uma página sobre nós".

---

*“Se eu subir aos céus, lá estás; se eu fizer a minha cama no Sheol, também lá estás.” — Salmos 139:8*
