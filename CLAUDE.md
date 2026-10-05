# Glorifique — instruções para o Claude

Este arquivo é lido automaticamente pelo Claude Code toda vez que ele trabalha
neste projeto. Ele explica o que é o projeto e as regras que devem ser seguidas.

## O que é
Glorifique é um banco de **testemunhos em vídeo** (1 a 3 min) de pessoas que tiveram
a vida transformada por Jesus. Os vídeos são organizados por situação de vida
(vícios, luto, depressão, ansiedade, divórcio, prisão, etc.). Quem está passando
pelo mesmo pode pedir para **conversar com o autor**, se ele permitir.
Objetivo: evangelizar com histórias reais, com respeito e cuidado.

Dono do projeto: Jerry Cavalcante (iniciante — explique as coisas de forma simples, em português).

## Stack
- **Next.js 16** (App Router) em **JavaScript** (sem TypeScript)
- **Bootstrap 5** + **Bootstrap Icons** (classes utilitárias; CSS próprio em `src/app/globals.css`)
- **Neon** (PostgreSQL) com **Drizzle ORM** (`src/db/schema.js`)
- **Auth.js / NextAuth v5**: Google, GitHub e e-mail (link mágico via Resend) — `src/auth.js`
- **Vercel Blob** para os vídeos (upload direto do navegador) — `src/app/api/upload/route.js`
- **Upstash Redis** para limite de requisições — `src/lib/ratelimit.js`
- **Zod** para validar tudo que vem do usuário — `src/lib/validacao.js`
- Deploy na **Vercel**, código no **GitHub**, relatórios no **Power BI** (`powerbi/`)

## Comandos
```bash
npm install          # instala dependências
npm run dev          # roda em http://localhost:3000
npm run build        # compila para produção (rode antes de dar push)
npm run db:push      # cria/atualiza as tabelas no Neon a partir do schema.js
npm run db:studio    # abre um visualizador do banco
```

## Mapa das pastas
```
src/
  app/
    page.js                 → página inicial (hero, categorias, recentes)
    acoes.js                → TODAS as Server Actions (enviar, conversar, moderar...)
    testemunhos/            → lista e página de cada testemunho
    enviar/                 → formulário de envio (login obrigatório)
    painel/                 → painel do usuário
    admin/                  → moderação (só e-mails em ADMIN_EMAILS)
    doar/                   → doação Pix com QR Code
    entrar/                 → login
    api/upload/route.js     → autoriza upload de vídeo
  components/               → Navbar, VersoFixo, cartões, formulários
  lib/                      → categorias, pix, ratelimit, validação
  db/                       → schema e conexão
  proxy.js                  → limite de requisições por IP (antigo middleware)
powerbi/                    → views SQL e guia do Power BI
```

## Regras OBRIGATÓRIAS
1. **Segurança primeiro.** Toda Server Action e rota de API deve:
   - verificar login com `auth()` (e `role === "admin"` quando for moderação);
   - aplicar `limites.*.limit(...)` de `src/lib/ratelimit.js`;
   - validar a entrada com um schema Zod em `src/lib/validacao.js`.
2. **Nunca** colocar segredos no código. Tudo vai em `.env.local` (veja `.env.example`).
   Variáveis com `NEXT_PUBLIC_` ficam visíveis no navegador — nunca use isso para segredos.
3. **Nunca** usar `dangerouslySetInnerHTML` com conteúdo de usuário.
4. Todo testemunho novo entra como `status: "pendente"` e só aparece depois de aprovado.
5. Não expor e-mail de usuários em páginas públicas. O e-mail do solicitante só aparece
   para o autor do testemunho, no painel, porque o solicitante pediu o contato.
6. Ao mudar o banco, edite `src/db/schema.js` e rode `npm run db:push`.
7. Se adicionar um domínio externo (imagens, scripts, vídeos), atualize a CSP em `next.config.mjs`.

## Estilo
- Textos da interface em **português do Brasil**, tom acolhedor, sem jargão religioso pesado.
- Paleta: noite (`--g-noite`) + dourado (`--g-ouro`). Fontes: Fraunces (títulos) e Manrope (texto).
- Use as classes existentes: `cartao`, `cartao-hover`, `btn-ouro`, `btn-contorno`, `selo`, `revelar`.
- Ícones: Bootstrap Icons (`<i className="bi bi-nome" />`).
- Animações sempre respeitando `prefers-reduced-motion` (já tratado no CSS).
- Componentes que usam estado/eventos começam com `"use client"`; o resto fica no servidor.
- Em Next 16, `params` e `searchParams` são Promises: use `const { id } = await params`.

## Elementos fixos (não remover)
- Versículo fixo no rodapé (`src/components/VersoFixo.js`) — Salmos 139:8.
- Doação Pix: chave `+5511998817076`, beneficiário **Jerry Cavalcante** (`src/lib/pix.js`).

## Antes de terminar qualquer tarefa
- Rode `npm run build` e confirme que compila sem erros.
- Explique ao Jerry, em linguagem simples, o que mudou e como testar.
