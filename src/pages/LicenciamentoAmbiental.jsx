import LPHeader from '../components/layout/LPHeader'
import LPFooter from '../components/layout/LPFooter'
import LPHero from '../components/layout/LPHero'
import TrustBar from '../components/layout/TrustBar'
import CookieBanner from '../components/layout/CookieBanner'
import Seo from '../components/Seo'

const trustItems = [
  { strong: 'Loteamentos', span: 'Apoio técnico completo' },
  { strong: 'Regularização', span: 'de áreas e imóveis' },
  { strong: 'Ambiental', span: 'Suporte conectado ao uso' },
  { strong: 'ART', span: 'Em todos os serviços' },
]

const services = [
  { title: 'Loteamentos', desc: 'Apoio técnico em etapas ligadas à implantação, conferência de lotes, organização da base territorial e demandas correlatas.' },
  { title: 'Regularização de áreas', desc: 'Suporte para entender a situação do imóvel, organizar informações e avançar com mais clareza no processo necessário.' },
  { title: 'Demandas ambientais', desc: 'Atuação em casos que exigem leitura técnica do uso da área, documentação e apoio ambiental vinculado ao imóvel.' },
  { title: 'Integração com topografia', desc: 'Quando necessário, a NATIVE conecta o licenciamento com levantamentos e peças técnicas para dar base ao processo.' },
]

const steps = [
  { num: '1', title: 'Análise inicial', desc: 'Você apresenta a demanda, a área e o objetivo. A partir disso, identificamos o que realmente precisa ser feito.' },
  { num: '2', title: 'Leitura técnica do caso', desc: 'Avaliamos documentação, contexto territorial e necessidade de peças complementares para dar sustentação ao processo.' },
  { num: '3', title: 'Execução do suporte', desc: 'Organizamos a parte técnica ligada à regularização, licenciamento ou demanda ambiental conforme o caso concreto.' },
  { num: '4', title: 'Orientação e entrega', desc: 'Você recebe direcionamento claro sobre a etapa executada e sobre os próximos passos para seguir com mais segurança.' },
]

const diffs = [
  { icon: '🧭', title: 'Diagnóstico antes da execução', desc: 'Antes de sair produzindo documentos, a NATIVE avalia o cenário para entender o que realmente faz sentido.' },
  { icon: '📄', title: 'Organização técnica', desc: 'As informações são tratadas com lógica e critério para evitar retrabalho e reduzir ruído no andamento do processo.' },
  { icon: '🌱', title: 'Visão ambiental conectada ao uso da área', desc: 'O foco não é complicar. É encontrar a melhor forma de encaminhar a demanda conforme a realidade do imóvel.' },
  { icon: '🤝', title: 'Contato direto', desc: 'Atendimento objetivo, sem promessas vazias e com comunicação clara sobre o que pode ou não ser feito.' },
]

const WA = 'https://typebot.co/my-typebot-ort5blj'

function LicenciamentoAmbiental() {
  return (
    <>
      <Seo
        title="Licenciamento Ambiental e Loteamentos em Veranópolis | NATIVE"
        description="Apoio técnico para loteamentos, regularização de áreas e demandas ambientais em Veranópolis-RS e região. ART, diagnóstico e atendimento direto."
        canonical="https://nativeterritorial.com.br/licenciamento-ambiental-veranopolis"
      />
      <LPHeader />

      <LPHero
        badge="Loteamentos e Ambiental • Veranópolis e região"
        breadcrumb="Licenciamento Ambiental em Veranópolis"
        h1Main="Loteamentos, Regularização e"
        h1Em="Suporte Ambiental em Veranópolis"
        subtitle="A NATIVE apoia loteamentos, conferência de lotes, regularização de áreas e demandas ambientais conectadas ao uso seguro do imóvel — com orientação técnica clara, responsabilidade e visão prática em cada etapa."
        ctaHref={WA}
        ctaLabel="💬 Solicitar orçamento"
      />

      <TrustBar items={trustItems} />

      {/* Serviços */}
      <section className="lp-section lp-alt" aria-labelledby="services-title">
        <div className="container">
          <div className="section-label">O que a NATIVE realiza</div>
          <h2 className="section-title" id="services-title">Serviços de loteamento, regularização e ambiental</h2>
          <p className="section-sub">Suporte técnico integrado para o uso seguro do imóvel, do levantamento inicial até a organização documental necessária para encaminhar o processo com mais segurança.</p>
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
      <section className="lp-section" aria-labelledby="process-title">
        <div className="container">
          <div className="section-label">Como funciona</div>
          <h2 className="section-title" id="process-title">Etapas do atendimento</h2>
          <p className="section-sub">Cada caso tem uma necessidade específica. Por isso, o processo começa com entendimento técnico do cenário e segue com a definição do caminho mais viável para o imóvel ou empreendimento.</p>
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

      {/* Diferenciais */}
      <section className="lp-section lp-alt" aria-labelledby="diff-title">
        <div className="container">
          <div className="section-label">Diferencial NATIVE</div>
          <h2 className="section-title" id="diff-title">Clareza técnica para processos que costumam travar</h2>
          <p className="section-sub">O problema de muita demanda ambiental ou de regularização não é só a burocracia. É a falta de uma leitura técnica objetiva do caso. É aí que a NATIVE entra.</p>
          <div className="lp-diff-grid" style={{ marginTop: '40px' }}>
            {diffs.map((d) => (
              <div className="lp-diff-item" key={d.title}>
                <div className="diff-icon">{d.icon}</div>
                <h4>{d.title}</h4>
                <p>{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="lp-cta-section">
        <div className="container">
          <div className="section-label">Solicitar orçamento</div>
          <h2 className="section-title">Precisa de apoio em licenciamento ambiental ou regularização?</h2>
          <p>Fale com a NATIVE no WhatsApp e explique a sua demanda. A partir disso, avaliamos o cenário e alinhamos a melhor forma de conduzir o suporte técnico em Veranópolis e região.</p>
          <a href={WA} className="btn-primary" target="_blank" rel="noopener noreferrer">
            💬 Pedir orçamento no WhatsApp
          </a>
          <div className="lp-cta-meta">Atendimento em Veranópolis e região • NATIVE Inteligência Territorial</div>
        </div>
      </section>

      <LPFooter />
      <CookieBanner />
    </>
  )
}

export default LicenciamentoAmbiental
