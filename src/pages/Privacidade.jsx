import { Link } from 'react-router-dom'
import Seo from '../components/Seo'

function Privacidade() {
  return (
    <>
      <Seo
        title="Política de Privacidade | NATIVE Inteligência Territorial"
        description="Política de Privacidade da NATIVE Inteligência Territorial e Ambiental. Como coletamos, usamos e protegemos seus dados conforme a LGPD."
        canonical="https://nativeterritorial.com.br/politica-de-privacidade"
      />
      <header style={{ background: 'var(--grafite-900)', borderBottom: '1px solid var(--grafite-500)', padding: '0 24px' }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto', height: '64px', display: 'flex', alignItems: 'center' }}>
          <Link to="/" className="nav-logo">
            <img src="https://nativeterritorial.com.br/logo.png" alt="NATIVE" />
            <span>NATIVE <span className="logo-accent">Inteligência Territorial</span></span>
          </Link>
        </div>
      </header>

      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '48px 24px 80px' }}>
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 400, color: 'var(--off-white)', marginBottom: '8px' }}>
          Política de Privacidade
        </h1>
        <p style={{ fontSize: '13px', color: 'var(--grafite-300)', marginBottom: '40px' }}>Última atualização: abril de 2026</p>

        <p>A NATIVE Inteligência Territorial e Ambiental (CNPJ 64.247.072/0001-10), com sede em Veranópolis/RS, está comprometida com a proteção dos seus dados pessoais. Esta Política de Privacidade descreve como coletamos, usamos e protegemos as informações fornecidas ao acessar nosso site ou entrar em contato conosco.</p>

        <Section title="1. Dados que coletamos">
          <p>Podemos coletar os seguintes dados pessoais:</p>
          <ul>
            <li>Nome e sobrenome</li>
            <li>Número de telefone e WhatsApp</li>
            <li>Endereço de e-mail</li>
            <li>Localização (cidade/município)</li>
            <li>Informações sobre o imóvel ou demanda técnica</li>
            <li>Dados de navegação (via cookies e pixels de rastreamento)</li>
          </ul>
        </Section>

        <Section title="2. Como usamos seus dados">
          <p>As informações coletadas são utilizadas para:</p>
          <ul>
            <li>Responder a solicitações de orçamento e atendimento</li>
            <li>Elaborar propostas técnicas personalizadas</li>
            <li>Enviar comunicações relacionadas aos nossos serviços</li>
            <li>Melhorar a experiência no site e nos anúncios</li>
            <li>Cumprir obrigações legais e contratuais</li>
          </ul>
        </Section>

        <Section title="3. Cookies e pixels de rastreamento">
          <p>Nosso site utiliza cookies e pixels (incluindo o Meta Pixel e Google Ads) para mensurar o desempenho de campanhas e melhorar a navegação. Você pode recusar o uso de cookies não essenciais através do banner exibido ao acessar o site.</p>
        </Section>

        <Section title="4. Compartilhamento de dados">
          <p>Seus dados não são vendidos a terceiros. Podemos compartilhá-los apenas com:</p>
          <ul>
            <li>Plataformas de atendimento utilizadas pela NATIVE (ex: WhatsApp Business API)</li>
            <li>Ferramentas de análise e publicidade (Meta, Google)</li>
            <li>Autoridades competentes, quando exigido por lei</li>
          </ul>
        </Section>

        <Section title="5. Seus direitos (LGPD)">
          <p>Conforme a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você tem direito a:</p>
          <ul>
            <li>Confirmar a existência de tratamento dos seus dados</li>
            <li>Acessar, corrigir ou excluir seus dados</li>
            <li>Revogar o consentimento a qualquer momento</li>
            <li>Solicitar a portabilidade dos dados</li>
          </ul>
          <p>Para exercer seus direitos, entre em contato: <a href="mailto:contato@nativeterritorial.com.br" style={{ color: 'var(--verde)' }}>contato@nativeterritorial.com.br</a></p>
        </Section>

        <Section title="6. Segurança">
          <p>Adotamos medidas técnicas e organizacionais adequadas para proteger seus dados contra acesso não autorizado, perda ou divulgação indevida.</p>
        </Section>

        <Section title="7. Retenção de dados">
          <p>Mantemos seus dados pelo tempo necessário para cumprir as finalidades descritas nesta política ou conforme exigido por lei.</p>
        </Section>

        <Section title="8. Alterações nesta política">
          <p>Esta política pode ser atualizada periodicamente. A data da última revisão está indicada no topo desta página.</p>
        </Section>

        <Section title="9. Contato">
          <p>
            Em caso de dúvidas sobre esta Política de Privacidade, entre em contato:<br />
            <strong style={{ color: 'var(--off-white)' }}>NATIVE Inteligência Territorial e Ambiental</strong><br />
            E-mail: <a href="mailto:contato@nativeterritorial.com.br" style={{ color: 'var(--verde)' }}>contato@nativeterritorial.com.br</a><br />
            WhatsApp: (54) 99710-4400<br />
            Veranópolis — RS
          </p>
        </Section>
      </div>

      <footer style={{ background: 'var(--grafite-900)', borderTop: '1px solid var(--grafite-600)', padding: '24px', textAlign: 'center', fontSize: '13px', color: 'var(--grafite-300)' }}>
        © 2026 NATIVE Inteligência Territorial e Ambiental · CNPJ 64.247.072/0001-10
      </footer>
    </>
  )
}

// Componente auxiliar para cada seção do texto — só usado aqui
function Section({ title, children }) {
  return (
    <div style={{ marginTop: '32px' }}>
      <h2 style={{ fontFamily: 'var(--serif)', fontSize: '1.3rem', fontWeight: 400, color: 'var(--off-white)', marginBottom: '12px' }}>
        {title}
      </h2>
      <div style={{ fontSize: '15px', color: 'var(--grafite-200)', lineHeight: 1.7 }}>
        {children}
      </div>
    </div>
  )
}

export default Privacidade
