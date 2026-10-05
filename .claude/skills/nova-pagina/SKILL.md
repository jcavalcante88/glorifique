---
name: nova-pagina
description: Cria uma nova página ou seção no Glorifique seguindo o visual (Bootstrap 5, noite + dourado, animações) e as regras de segurança do projeto. Use quando o Jerry pedir "criar uma página", "nova tela", "adicionar uma seção" ou algo parecido.
---

# Criar nova página no Glorifique

## Passo 1 — Entender o pedido
Se não estiver claro, pergunte em UMA frase: o que a página mostra e se precisa de login.

## Passo 2 — Criar o arquivo
- Página pública: `src/app/<nome-da-rota>/page.js`
- Use nomes de rota em português, minúsculos, com hífen (ex.: `sobre-nos`, `como-orar`).
- Exporte `metadata` com `title` e `description`.
- Se usar o banco ou `auth()`, adicione `export const dynamic = "force-dynamic";`.
- Se precisar de login:
  ```js
  const sessao = await auth();
  if (!sessao?.user) redirect("/entrar");
  ```

## Passo 3 — Visual (obrigatório)
Use este esqueleto:
```jsx
<section className="container py-5">
  <p className="text-ouro fw-bold text-uppercase small mb-1">Subtítulo</p>
  <h1 className="display-6 mb-4">Título</h1>
  <div className="row g-4">
    <div className="col-md-6">
      <div className="cartao cartao-hover p-4 h-100 revelar">...</div>
    </div>
  </div>
</section>
```
- Botão principal: `btn btn-ouro rounded-pill px-4`. Secundário: `btn btn-contorno rounded-pill`.
- Ícones: Bootstrap Icons — `<i className="bi bi-heart" />` (procure em https://icons.getbootstrap.com).
- Adicione a classe `revelar` nos blocos para a animação de aparecer ao rolar.
- Textos acolhedores, em português do Brasil. Pode incluir um versículo curto.

## Passo 4 — Se tiver formulário
- Crie a Server Action em `src/app/acoes.js` seguindo as regras do `CLAUDE.md`
  (auth + rate limit + Zod).
- O formulário em si fica num componente `"use client"` em `src/components/` usando `useActionState`.

## Passo 5 — Menu
Se a página deve aparecer no menu, adicione um `<li>` em `src/components/Navbar.js`.

## Passo 6 — Conferir
- Rode `npm run build`.
- Diga ao Jerry o endereço para testar (ex.: http://localhost:3000/sobre-nos).
