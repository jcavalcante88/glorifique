---
name: revisao-seguranca
description: Revisa o código do Glorifique em busca de falhas de segurança (login, limite de requisições, validação, segredos, CSP, uploads). Use quando o Jerry pedir "revisar segurança", "está seguro?", antes de publicar (deploy) ou depois de criar uma Server Action ou rota de API nova.
---

# Revisão de segurança do Glorifique

Faça a revisão nesta ordem e, no final, entregue um relatório em português simples.

## 1. Server Actions e rotas de API
Abra `src/app/acoes.js` e todos os arquivos `src/app/api/**/route.js`. Para CADA função exportada confira:
- [ ] Chama `auth()` (ou `exigirLogin()` / `exigirAdmin()`) antes de qualquer coisa?
- [ ] Ações de moderação exigem `role === "admin"`?
- [ ] Usa um limitador de `src/lib/ratelimit.js` (`limites.envio`, `limites.contato`, ...)?
- [ ] Valida a entrada com Zod (`safeParse`) antes de tocar no banco?
- [ ] Ao alterar algo de um usuário, confere se ele é o DONO do registro?

## 2. Segredos
- Procure no código (`src/`) por chaves, tokens ou senhas escritos diretamente.
- Confirme que `.env` e `.env.local` estão no `.gitignore`.
- Nenhum segredo pode usar o prefixo `NEXT_PUBLIC_`.

## 3. Conteúdo do usuário
- Procure `dangerouslySetInnerHTML` — não pode ser usado com dados de usuários.
- Links externos com `target="_blank"` precisam de `rel="noopener noreferrer"`.
- Páginas públicas não podem mostrar e-mails de usuários.

## 4. Uploads
- `src/app/api/upload/route.js` só aceita `video/mp4`, `video/webm`, `video/quicktime` e limite de tamanho.
- `src/lib/validacao.js` só aceita URLs de vídeo do domínio `*.public.blob.vercel-storage.com`.

## 5. Cabeçalhos e proxy
- `next.config.mjs` mantém CSP, `X-Frame-Options: DENY`, HSTS e `nosniff`.
- `src/proxy.js` aplica limite por IP em todas as rotas e limite mais rígido no login.

## 6. Dependências
Rode `npm audit --omit=dev` e liste vulnerabilidades altas ou críticas.

## 7. Compilação
Rode `npm run build` e confirme que não há erros.

## Formato do relatório
Para cada problema encontrado:
- **Gravidade**: 🔴 Alta / 🟡 Média / 🟢 Baixa
- **Onde**: arquivo e linha
- **O que é** (explicação simples, sem jargão)
- **Como corrigir** (e ofereça corrigir na hora)

Se estiver tudo certo, diga isso claramente.
