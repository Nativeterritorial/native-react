import LPHeader from '../components/layout/LPHeader'
import LPFooter from '../components/layout/LPFooter'
import LPHero from '../components/layout/LPHero'
import TrustBar from '../components/layout/TrustBar'
import CookieBanner from '../components/layout/CookieBanner'
import Seo from '../components/Seo'
import FAQ from '../components/FAQ'

const faqItems = [
  { q: 'O que é levantamento topográfico e quando preciso dele?', a: 'É a medição técnica de um terreno (área, desníveis, limites) com GNSS. Você precisa dele antes de construir, comprar/vender, implantar projetos, terraplenar ou protocolar em prefeitura.' },
  { q: 'Qual a diferença entre topografia e georreferenciamento?', a: 'Topografia é o levantamento técnico do terreno (plantas, cotas, medidas). Georreferenciamento é o processo específico para imóveis rurais exigido pelo INCRA, com certificação no SIGEF. A NATIVE entrega os dois.' },
  { q: 'Quanto tempo leva um levantamento topográfico?', a: 'Depende do tamanho e acesso à área. Levantamentos urbanos simples saem em poucos dias; áreas rurais maiores podem levar semanas entre campo, processamento e entrega da planta.' },
  { q: 'A entrega vem com ART?', a: 'Sim. Todo serviço da NATIVE é entregue com ART (Anotação de Responsabilidade Técnica) assinada pelo profissional que executou o levantamento.' },
  { q: 'Vocês atendem fora de Veranópolis?', a: 'Sim. Atendemos toda a Serra Gaúcha — Nova Prata, Cotiporã, Fagundes Varela, Antônio Prado, Ipê, Nova Bassano e cidades vizinhas.' },
]

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Topografia em Veranópolis',
    serviceType: 'Levantamento topográfico planialtimétrico',
    provider: { '@type': 'ProfessionalService', name: 'NATIVE Inteligência Territorial e Ambiental', url: 'https://nativeterritorial.com.br/' },
    areaServed: { '@type': 'City', name: 'Veranópolis' },
    url: 'https://nativeterritorial.com.br/topografia-veranopolis',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  },
]

const trustItems = [
  { strong: 'GNSS', span: 'Equipamentos de precisão' },
  { strong: 'ART', span: 'Responsabilidade técnica' },
  { strong: 'Plantas', span: 'e mapas georreferenciados' },
  { strong: 'Direto', span: 'com o profissional' },
]

const uses = [
  { title: 'Terrenos urbanos', desc: 'Levantamento para compra, venda, conferência de medidas, implantação de obras e organização técnica do lote.' },
  { title: 'Imóveis rurais', desc: 'Mapeamento do terreno, leitura de relevo, divisas aparentes e apoio técnico para projetos no meio rural.' },
  { title: 'Projetos e obras', desc: 'Base topográfica para arquitetos, engenheiros, loteamentos, acessos, terraplenagem e execução com menos margem de erro.' },
  { title: 'Plantas e mapas', desc: 'Entrega organizada de peças técnicas para análise, protocolo, conferência interna e tomada de decisão.' },
]

const steps = [
  { num: '1', title: 'Entendimento da demanda', desc: 'Recebemos as informações do imóvel, objetivo do serviço e contexto do cliente para definir a melhor abordagem.' },
  { num: '2', title: 'Levantamento em campo', desc: 'Execução com equipamentos adequados, coleta dos pontos necessários e leitura técnica do terreno.' },
  { num: '3', title: 'Processamento dos dados', desc: 'Organização das informações levantadas para gerar planta, mapa e base confiável para uso técnico.' },
  { num: '4', title: 'Entrega e orientação', desc: 'Você recebe o material com explicação objetiva sobre o resultado e sobre como utilizar o levantamento.' },
]

const diffs = [
  { icon: '📍', title: 'Precisão no campo', desc: 'Uso de equipamentos adequados e metodologia de trabalho orientada pela finalidade real do serviço.' },
  { icon: '📐', title: 'Material técnico organizado', desc: 'Plantas, mapas e informações entregues com clareza para facilitar obra, projeto ou conferência do imóvel.' },
  { icon: '🤝', title: 'Atendimento sem enrolação', desc: 'Contato direto, alinhamento objetivo e resposta clara sobre o que faz sentido executar em cada caso.' },
  { icon: '🧾', title: 'Responsabilidade técnica', desc: 'Serviço com ART e cuidado profissional desde o levantamento até a entrega final.' },
]

const WA = 'https://wa.me/5554997104400?text=Olá,%20vim%20pelo%20site%20e%20gostaria%20de%20um%20orçamento%20de%20topografia.'

function Topografia() {
  return (
    <>
      <Seo
        title="Topografia em Veranópolis | NATIVE Inteligência Territorial"
        description="Levantamento topográfico, planialtimétrico, plantas e mapas em Veranópolis-RS e região. Equipamentos GNSS, ART e atendimento direto. NATIVE Topografia."
        canonical="https://nativeterritorial.com.br/topografia-veranopolis"
        ogImage="https://nativeterritorial.com.br/images/topografia.jpg"
        jsonLd={jsonLd}
      />
      <LPHeader />

      <LPHero
        badge="Topografia • Veranópolis e região"
        breadcrumb="Topografia em Veranópolis"
        h1Main="Levantamento Topográfico em Veranópolis com"
        h1Em="precisão técnica e prazo definido"
        subtitle="A NATIVE executa levantamento topográfico, planialtimétrico, plantas e mapas para terrenos urbanos, imóveis rurais, obras e implantação de projetos — com equipamentos GNSS, responsabilidade técnica e atendimento direto com o profissional."
        ctaHref={WA}
        ctaLabel="💬 Solicitar orçamento"
      />

      <TrustBar items={trustItems} />

      {/* Aplicações */}
      <section className="lp-section lp-alt" aria-labelledby="uses-title">
        <div className="container">
          <div className="section-label">Quando esse serviço é necessário</div>
          <h2 className="section-title" id="uses-title">Aplicações da topografia em Veranópolis</h2>
          <p className="section-sub">A topografia é a base para decisões seguras em obras, regularizações e divisão de áreas. Com um levantamento correto, você reduz retrabalho, evita erros de implantação e ganha clareza real sobre o imóvel.</p>
          <div className="lp-cards-grid" style={{ marginTop: '40px' }}>
            {uses.map((u) => (
              <div className="lp-card-border" key={u.title}>
                <h3>{u.title}</h3>
                <p>{u.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Processo */}
      <section className="lp-section" aria-labelledby="process-title">
        <div className="container">
          <div className="section-label">Como a NATIVE trabalha</div>
          <h2 className="section-title" id="process-title">Etapas do levantamento topográfico</h2>
          <p className="section-sub">A condução do serviço é feita com clareza desde o primeiro contato, para que você saiba o que será executado, o que será entregue e qual é o objetivo técnico do levantamento.</p>
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
          <div className="section-label">Por que fazer com a NATIVE</div>
          <h2 className="section-title" id="diff-title">Topografia com critério técnico e comunicação direta</h2>
          <p className="section-sub">Não basta medir. O valor real do serviço está em interpretar corretamente o terreno, produzir material utilizável e conduzir o cliente com objetividade ao longo do processo.</p>
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
      <FAQ items={faqItems} title="Dúvidas frequentes sobre topografia" />

      <section className="lp-cta-section">
        <div className="container">
          <div className="section-label">Solicitar orçamento</div>
          <h2 className="section-title">Precisa de topografia em Veranópolis?</h2>
          <p>Fale com a NATIVE pelo WhatsApp e explique a sua necessidade. A partir disso, alinhamos o tipo de levantamento, a forma de execução e a melhor solução técnica para o seu caso.</p>
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

export default Topografia
