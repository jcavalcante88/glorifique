// Autoriza o navegador a enviar o vídeo direto para o Vercel Blob.
// O arquivo NÃO passa pelo nosso servidor (vídeos são grandes), mas só
// usuários logados, dentro do limite e com formato de vídeo recebem permissão.
import { handleUpload } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { limites } from "@/lib/ratelimit";

export async function POST(request) {
  const body = await request.json();

  try {
    const resposta = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        const sessao = await auth();
        if (!sessao?.user?.id) throw new Error("Faça login para enviar vídeos.");

        const { success } = await limites.envio.limit(`upload:${sessao.user.id}`);
        if (!success) throw new Error("Limite de envios por hora atingido.");

        if (!pathname.startsWith("testemunhos/")) throw new Error("Caminho inválido.");

        return {
          allowedContentTypes: ["video/mp4", "video/webm", "video/quicktime"],
          maximumSizeInBytes: 150 * 1024 * 1024, // 150 MB
          addRandomSuffix: true,
          tokenPayload: JSON.stringify({ userId: sessao.user.id }),
        };
      },
      onUploadCompleted: async () => {
        // Chamado pela Vercel quando o upload termina (só em produção).
      },
    });
    return NextResponse.json(resposta);
  } catch (erro) {
    return NextResponse.json({ error: erro.message }, { status: 400 });
  }
}
