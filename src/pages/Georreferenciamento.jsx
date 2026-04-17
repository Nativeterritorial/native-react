import LPHeader from '../components/layout/LPHeader'
import LPFooter from '../components/layout/LPFooter'
import LPHero from '../components/layout/LPHero'
import TrustBar from '../components/layout/TrustBar'
import CookieBanner from '../components/layout/CookieBanner'

const trustItems = [
  { strong: 'INCRA', span: 'Suporte técnico para exigências do processo' },
  { strong: 'SIGEF', span: 'Organização e envio técnico' },
  { strong: 'ART', span: 'Responsabilidade técnica no serviço' },
  { strong: 'Precisão', span: 'Base segura para regularização' },
]

const services = [
  { title: 'Georreferenciamento de imóveis rurais', desc: 'Levantamento técnico completo para definição precisa dos limites do imóvel, conforme a finalidade do processo.' },
  { title: 'Organização para INCRA e SIGEF', desc: 'Apoio técnico para estruturação da documentação, submissão e acompanhamento das etapas ligadas à regularização.' },
  { title: 'Levantamento de campo', desc: 'Coleta de dados com método e precisão para gerar uma base confiável para o serviço.' },
]

const steps = [
  { num: '1', title: 'Análise inicial', desc: 'Entendemos a demanda, a localização da área e a documentação disponível.' },
  { num: '2', title: 'Levantamento técnico', desc: 'Executamos o trabalho de campo com equipamentos adequados e responsabilidade técnica.' },
  { num: '3', title: 'Processamento e conferência', desc: 'Organizamos os dados e estruturamos o material conforme a necessidade do processo.' },
  { num: '4', title: 'Entrega e suporte', desc: 'Entregamos o serviço com clareza e seguimos disponíveis para orientar os próximos passos.' },
]

const whenCards = [
  { title: 'Venda, desmembramento ou regularização', desc: 'Quando o imóvel precisa estar tecnicamente organizado para registro, negociação ou adequação documental.' },
  { title: 'Exigências do cartório ou órgãos competentes', desc: 'Quando há necessidade de documentação técnica precisa para avançar no processo.' },
  { title: 'Segurança sobre limites e confrontações', desc: 'Quando o proprietário quer clareza técnica sobre a área e seus limites.' },
]

const WA = 'https://typebot.co/my-typebot-ort5blj'

function Georreferenciamento() {
  return (
    <>
      <LPHeader />

      <LPHero
        badge="Georreferenciamento • Veranópolis e região"
        breadcrumb="Georreferenciamento em Veranópolis"
        h1Main="Georreferenciamento em Veranópolis com"
        h1Em="precisão técnica e segurança jurídica"
        subtitle="A NATIVE atua com georreferenciamento de imóveis rurais, levantamento de campo, organização técnica e apoio em processos ligados ao INCRA e ao SIGEF, sempre com clareza, responsabilidade e foco na regularização correta da área."
        ctaHref={WA}
        ctaLabel="💬 Solicitar orçamento"
      />

      <TrustBar items={trustItems} />

      {/* Atendimento — seção com dois blocos lado a lado */}
      <section className="lp-section lp-alt" aria-labelledby="attend-title">
        <div className="container">
          <div className="lp-two-col">
            <div>
              <div className="section-label">Atendimento com a NATIVE</div>
              <h2 className="section-title" id="attend-title">O que a NATIVE realiza no georreferenciamento</h2>
              <ul className="attend-list">
                <li>Georreferenciamento de imóveis rurais</li>
                <li>Apoio técnico para processos no INCRA e SIGEF</li>
                <li>Levantamento de campo com precisão</li>
                <li>Atendimento em Veranópolis e região</li>
              </ul>
            </div>
            <div>
              <div className="section-label">Por que regularizar?</div>
              <h2 className="section-title">Sem georreferenciamento, o cartório não registra</h2>
              <p className="section-sub">É obrigatório para qualquer transação de imóvel rural — venda, inventário, divisão, desmembramento. A NATIVE organiza todo o processo técnico e documental.</p>
              <div className="badge-row">
                <div className="badge-pill"><strong>GNSS</strong><span>Precisão INCRA</span></div>
                <div className="badge-pill"><strong>ART</strong><span>Respaldo legal</span></div>
                <div className="badge-pill"><strong>Direto</strong><span>Com o técnico</span></div>
                <div className="badge-pill"><strong>Serra</strong><span>Gaúcha</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section className="lp-section" aria-labelledby="services-title">
        <div className="container">
          <div className="section-label">Serviços de georreferenciamento</div>
          <h2 className="section-title" id="services-title">Atuamos em demandas que exigem segurança técnica</h2>
          <p className="section-sub">Definição de limites, documentação organizada e suporte confiável para o proprietário rural.</p>
          <div className="lp-cards-grid" style={{ marginTop: '40px' }}>
            {services.map((s) => (
              <div className="lp-card-border" key={s.title}>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Processo */}
      <section className="lp-section lp-alt" aria-labelledby="process-title">
        <div className="container">
          <div className="section-label">Como funciona o processo</div>
          <h2 className="section-title" id="process-title">Claro e objetivo do início ao fim</h2>
          <p className="section-sub">Você entende o que será feito, em que etapa está o trabalho e como avançar com segurança.</p>
          <div className="lp-steps-grid" style={{ marginTop: '40px' }}>
            {steps.map((s) => (
              <div className="lp-step" key={s.num}>
                <div className="lp-step-num">{s.num}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quando é necessário */}
      <section className="lp-section" aria-labelledby="when-title">
        <div className="container">
          <div className="section-label">Quando esse serviço costuma ser necessário</div>
          <h2 className="section-title" id="when-title">Situações comuns que a NATIVE resolve</h2>
          <div className="lp-cards-plain" style={{ marginTop: '40px' }}>
            {whenCards.map((c) => (
              <div className="lp-card-plain" key={c.title}>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="lp-cta-section">
        <div className="container">
          <div className="section-label">Precisa de georreferenciamento em Veranópolis?</div>
          <h2 className="section-title">Fale com a NATIVE e solicite um orçamento</h2>
          <p>Para seu imóvel rural, levantamento técnico ou processo de regularização. Respondemos com clareza e prazo definido.</p>
          <a href={WA} className="btn-primary" target="_blank" rel="noopener noreferrer" style={{ fontSize: '16px', padding: '16px 32px' }}>
            💬 Falar no WhatsApp
          </a>
          <div className="lp-cta-meta">
            <strong>NATIVE Inteligência Territorial e Ambiental</strong><br />
            Atendimento em Veranópolis, Vila Flores, Nova Prata, Cotiporã, Fagundes Varela e região.
          </div>
        </div>
      </section>

      <LPFooter />
      <CookieBanner />
    </>
  )
}

export default Georreferenciamento
