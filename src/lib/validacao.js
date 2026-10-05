import { z } from "zod";
import { SLUGS } from "./categorias";

// Só aceitamos vídeos que foram enviados para o NOSSO Vercel Blob
const urlDeVideoValida = z
  .string()
  .url()
  .refine((u) => {
    try {
      const { protocol, hostname } = new URL(u);
      return protocol === "https:" && hostname.endsWith(".public.blob.vercel-storage.com");
    } catch {
      return false;
    }
  }, "Endereço de vídeo inválido");

export const testemunhoSchema = z.object({
  titulo: z.string().trim().min(5, "Título muito curto").max(80, "Título muito longo"),
  resumo: z.string().trim().min(20, "Conte um pouco mais (mínimo 20 letras)").max(600),
  categoria: z.enum(SLUGS, { message: "Escolha uma categoria" }),
  videoUrl: urlDeVideoValida,
  duracaoSeg: z.coerce.number().int().min(10).max(240).optional(),
  aceitaContato: z.coerce.boolean(),
});

export const conversaSchema = z.object({
  testemunhoId: z.string().uuid(),
  mensagem: z.string().trim().min(10, "Escreva pelo menos 10 letras").max(500),
});

export const denunciaSchema = z.object({
  testemunhoId: z.string().uuid(),
  motivo: z.string().trim().min(5).max(300),
});
