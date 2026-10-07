export const metadata = {
  title: "Política de Privacidade",
  description: "Como o Glorifique coleta, usa e protege seus dados.",
};

const atualizadoEm = "6 de outubro de 2026";

export default function Privacidade() {
  return (
    <section className="container py-5" style={{ maxWidth: 820 }}>
      <div className="text-center mb-5">
        <i className="bi bi-shield-lock text-ouro display-5" />
        <h1 className="display-6 mt-3">Política de Privacidade</h1>
        <p className="text-suave">Atualizada em {atualizadoEm}</p>
      </div>

      <div className="cartao p-4 p-md-5 d-grid gap-4">
        <p className="mb-0">
          O Glorifique é um espaço de testemunhos em vídeo de pessoas que tiveram a vida transformada
          por Jesus. Cuidamos dos seus dados com o mesmo respeito com que cuidamos das histórias
          compartilhadas aqui, seguindo a Lei Geral de Proteção de Dados (LGPD — Lei 13.709/2018).
        </p>

        <div>
          <h2 className="h5 text-ouro">1. Quais dados coletamos</h2>
          <ul className="mb-0">
            <li><strong>Ao entrar</strong> (com Google, GitHub ou e-mail): seu nome, e-mail e foto de perfil.</li>
            <li><strong>Ao enviar um testemunho</strong>: o vídeo, o título, o resumo e a categoria que você escolher.</li>
            <li><strong>Ao pedir para conversar</strong> com um autor: a mensagem que você escrever.</li>
            <li><strong>Ao denunciar</strong> um conteúdo: o motivo informado.</li>
            <li><strong>Dados técnicos</strong>: endereço IP, usado apenas para proteger o site contra abusos e robôs.</li>
          </ul>
        </div>

        <div>
          <h2 className="h5 text-ouro">2. Para que usamos</h2>
          <ul className="mb-0">
            <li>Permitir que você entre na sua conta e envie seu testemunho.</li>
            <li>Moderar os vídeos antes de publicá-los, para manter o ambiente seguro e respeitoso.</li>
            <li>Conectar quem pede uma conversa ao autor do testemunho, quando o autor permite.</li>
            <li>Evitar spam, fraudes e ataques.</li>
          </ul>
          <p className="mt-2 mb-0">Não vendemos seus dados e não usamos seus dados para publicidade.</p>
        </div>

        <div>
          <h2 className="h5 text-ouro">3. O que fica público</h2>
          <p className="mb-0">
            Depois de aprovado, o testemunho (vídeo, título, resumo e categoria) e o nome do autor ficam
            visíveis para todos. <strong>Seu e-mail nunca aparece em páginas públicas.</strong> Ele só é
            mostrado ao autor de um testemunho quando você mesmo pede para conversar com ele.
          </p>
        </div>

        <div>
          <h2 className="h5 text-ouro">4. Com quem compartilhamos</h2>
          <p className="mb-2">Usamos serviços confiáveis para o site funcionar:</p>
          <ul className="mb-0">
            <li><strong>Google e GitHub</strong> — para o login.</li>
            <li><strong>Vercel</strong> — hospedagem do site e armazenamento dos vídeos.</li>
            <li><strong>Neon</strong> — banco de dados.</li>
            <li><strong>Upstash</strong> — proteção contra excesso de acessos.</li>
            <li><strong>Resend</strong> — envio do e-mail com o link de acesso.</li>
          </ul>
        </div>

        <div>
          <h2 className="h5 text-ouro">5. Seus direitos</h2>
          <p className="mb-0">
            Você pode pedir a qualquer momento para ver, corrigir ou apagar seus dados, ou para retirar
            um testemunho do ar. Ao apagar sua conta, seus testemunhos, pedidos de conversa e denúncias
            também são apagados. Para isso, entre em contato com o responsável pelo Glorifique,
            Jerry Cavalcante.
          </p>
        </div>

        <div>
          <h2 className="h5 text-ouro">6. Segurança</h2>
          <p className="mb-0">
            Usamos conexão segura (HTTPS), login sem senha armazenada no site, moderação de todo
            conteúdo novo e limite de requisições contra robôs.
          </p>
        </div>

        <div>
          <h2 className="h5 text-ouro">7. Cookies</h2>
          <p className="mb-0">
            Usamos apenas os cookies necessários para manter você conectado. Não usamos cookies de
            rastreamento ou de publicidade.
          </p>
        </div>

        <p className="text-suave small mb-0">
          Esta política pode ser atualizada. Quando isso acontecer, a data no topo da página será alterada.
        </p>
      </div>
    </section>
  );
}
