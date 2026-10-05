// Limite de requisições (rate limiting) — impede ataques de força bruta,
// spam de envios e robôs martelando o servidor.
// Em produção usa Upstash Redis (compartilhado entre todos os servidores da Vercel).
// Sem Redis configurado (desenvolvimento), usa um contador em memória.

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const temRedis = Boolean(
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
);
const redis = temRedis ? Redis.fromEnv() : null;

function limitadorMemoria(limite, janelaMs) {
  const contadores = new Map();
  return {
    async limit(id) {
      const agora = Date.now();
      const atual = contadores.get(id);
      if (!atual || atual.reset < agora) {
        contadores.set(id, { total: 1, reset: agora + janelaMs });
        return { success: true, remaining: limite - 1, reset: agora + janelaMs };
      }
      atual.total += 1;
      return {
        success: atual.total <= limite,
        remaining: Math.max(0, limite - atual.total),
        reset: atual.reset,
      };
    },
  };
}

function criar(prefixo, limite, janela, janelaMs) {
  if (redis) {
    return new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(limite, janela),
      prefix: `glorifique:${prefixo}`,
    });
  }
  return limitadorMemoria(limite, janelaMs);
}

export const limites = {
  // Navegação geral: 120 requisições por minuto por IP
  geral: criar("geral", 120, "1 m", 60_000),
  // Tentativas de login: 10 a cada 10 minutos por IP
  login: criar("login", 10, "10 m", 600_000),
  // Envio de testemunhos/vídeos: 5 por hora por usuário
  envio: criar("envio", 5, "1 h", 3_600_000),
  // Pedidos de conversa e denúncias: 10 por hora por usuário
  contato: criar("contato", 10, "1 h", 3_600_000),
};

export function ipDaRequisicao(headers) {
  return (
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headers.get("x-real-ip") ||
    "anonimo"
  );
}
