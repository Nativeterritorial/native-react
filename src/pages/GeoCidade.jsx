import { useParams, Navigate } from 'react-router-dom'
import LPHeader from '../components/layout/LPHeader'
import LPFooter from '../components/layout/LPFooter'
import LPHero from '../components/layout/LPHero'
import TrustBar from '../components/layout/TrustBar'
import CookieBanner from '../components/layout/CookieBanner'
import geoCidades from '../data/geoCidades'
import Seo from '../components/Seo'

// useParams() lê o parâmetro :cidade da URL.
// Ex: /georreferenciamento/cotipora → cidade = 'cotipora'

const trustItems = [
  { strong: 'SIGEF / INCRA', span: 'Processo completo' },
  { strong: 'ART', span: 'Responsabilidade técnica' },
  { strong: 'GNSS', span: 'Equipamentos de precisão' },
  { strong: 'Direto', span: 'com quem executa' },
]

const geoServices = [
  { icon: '📐', title: 'Georreferenciamento rural — SIGEF/INCRA', desc: 'Levantamento de campo com GNSS, processamento dos dados, memorial descritivo e certificação no SIGEF conforme normas do INCRA.' },
  { icon: '🗺️', title: 'Levantamento topográfico', desc: 'Plantas, mapas, cotas e conferência de área para imóveis rurais, terrenos e projetos que precisam de base técnica precisa.' },
  { icon: '📋', title: 'Memorial descritivo e ART', desc: 'Documentação técnica completa com memorial, planta georreferenciada e ART assinada para uso em cartório e INCRA.' },
  { icon: '🤝', title: 'Orientação pós-entrega', desc: 'Explicação clara sobre os próximos passos — o que levar ao cartório, como avançar no INCRA, o que preparar.' },
]

const WA = 'https://typebot.co/my-typebot-ort5blj'

function GeoCidade() {
  // Pega o slug da URL (ex: 'cotipora', 'nova-prata')
  const { cidade } = useParams()

  // Busca os dados dessa cidade no arquivo de dados
  const data = geoCidades[cidade]

  // Se a cidade não existe, redireciona para a página principal de georreferenciamento
  if (!data) {
    return <Navigate to="/georreferenciamento-veranopolis" replace />
  }

  // Monta os steps do processo com o nome da cidade
  const steps = [
    { num: '1', title: 'Diagnóstico', desc: 'Você informa a localização, o tamanho e o objetivo. A NATIVE analisa a documentação e explica exatamente o que é necessário.' },
    { num: '2', title: `Campo em ${data.cidade}`, desc: 'Execução técnica na propriedade com equipamentos GNSS de precisão. Responsabilidade técnica desde o levantamento.' },
    { num: '3', title: 'Processamento e certificação', desc: 'Dados processados, planta e memorial gerados, submissão ao SIGEF/INCRA quando aplicável ao processo.' },
    { num: '4', title: 'Entrega com ART', desc: 'Documentação completa com ART e orientação clara sobre o que fazer em seguida — sem deixar você perdido no meio do processo.' },
  ]

  return (
    <>
      <Seo
        title={data.metaTitle}
        description={data.metaDesc}
        canonical={`https://nativeterritorial.com.br/georreferenciamento/${cidade}`}
      />
      <LPHeader />

      <LPHero
        badge={data.badge}
        breadcrumb={data.breadcrumb}
        h1Main={data.h1Main}
        h1Em={data.h1Em}
        subtitle={data.heroSub}
        ctaHref={WA}
        ctaLabel="💬 Solicitar orçamento"
      />

      <TrustBar items={trustItems} />

      {/* Quando é obrigatório */}
      <section className="lp-section lp-alt" aria-labelledby="when-title">
        <div className="container">
          <div className="section-label">Quando o georreferenciamento é obrigatório</div>
          <h2 className="section-title" id="when-title">{data.whenTitle}</h2>
          <p className="section-sub">{data.whenSub}</p>
          <div className="lp-cards-grid" style={{ marginTop: '40px' }}>
            {data.whenCards.map((c) => (
              <div className="lp-card-border" key={c.title}>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section className="lp-section" aria-labelledby="services-title">
        <div className="container">
          <div className="section-label">{data.servicesTitle}</div>
          <h2 className="section-title" id="services-title">Serviços com escopo claro e prazo definido</h2>
          <p className="section-sub">{data.servicesSub}</p>
          <div className="lp-cards-grid" style={{ marginTop: '40px' }}>
            {geoServices.map((s) => (
              <div className="lp-card-plain" key={s.title}>
                <div style={{ fontSize: '22px', marginBottom: '12px' }}>{s.icon}</div>
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
          <div className="section-label">Como funciona</div>
          <h2 className="section-title" id="process-title">{data.processTitle}</h2>
          <p className="section-sub">{data.processSub}</p>
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

      {/* Região */}
      <section className="lp-section" aria-labelledby="region-title">
        <div className="container">
          <div className="lp-two-col">
            <div>
              <div className="section-label">Área de atendimento</div>
              <h2 className="section-title" id="region-title">{data.regionTitle}</h2>
              <p className="section-sub">{data.regionSub}</p>
              <div className="region-tags" style={{ marginTop: '20px' }}>
                {data.regionTags.map((t) => (
                  <span key={t.label} className={`region-tag ${t.main ? 'main' : ''}`}>{t.label}</span>
                ))}
              </div>
            </div>
            <div>
              <div className="section-label">Situações comuns em {data.cidade}</div>
              <h2 className="section-title">O que a NATIVE resolve por aqui</h2>
              <ul className="region-list">
                {data.regionList.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="lp-cta-section">
        <div className="container">
          <div className="section-label">Precisa de georreferenciamento em {data.cidade}?</div>
          <h2 className="section-title">{data.ctaTitle}</h2>
          <p className="cta-sub">{data.ctaSub}</p>
          <a href={WA} className="btn-primary" target="_blank" rel="noopener noreferrer" style={{ fontSize: '16px', padding: '16px 32px' }}>
            💬 Falar no WhatsApp
          </a>
          <div className="lp-cta-meta">
            <strong>NATIVE Inteligência Territorial e Ambiental</strong><br />
            {data.ctaMeta}
          </div>
        </div>
      </section>

      <LPFooter />
      <CookieBanner />
    </>
  )
}

export default GeoCidade
