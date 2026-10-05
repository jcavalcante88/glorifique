// Proxy (antigo "middleware") — roda antes de cada requisição.
// Aqui aplicamos o limite de requisições por IP.
import { NextResponse } from "next/server";
import { limites, ipDaRequisicao } from "@/lib/ratelimit";

export async function proxy(request) {
  const ip = ipDaRequisicao(request.headers);
  const { pathname } = request.nextUrl;

  const ehLogin = pathname.startsWith("/api/auth") && request.method === "POST";
  const limitador = ehLogin ? limites.login : limites.geral;
  const { success, reset } = await limitador.limit(`${ehLogin ? "login" : "geral"}:${ip}`);

  if (!success) {
    const segundos = Math.max(1, Math.ceil((reset - Date.now()) / 1000));
    return new NextResponse("Muitas requisições. Aguarde um pouco e tente novamente.", {
      status: 429,
      headers: { "Retry-After": String(segundos), "Content-Type": "text/plain; charset=utf-8" },
    });
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|svg)$).*)"],
};
