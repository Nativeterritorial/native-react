import LPHeader from '../components/layout/LPHeader'
import LPFooter from '../components/layout/LPFooter'
import LPHero from '../components/layout/LPHero'
import TrustBar from '../components/layout/TrustBar'
import CookieBanner from '../components/layout/CookieBanner'
import Seo from '../components/Seo'
import FAQ from '../components/FAQ'

const faqItems = [
  {
    q: 'O que é licenciamento ambiental e quando é obrigatório?',
    a: 'Licenciamento ambiental é a autorização do órgão competente (no RS, normalmente a FEPAM ou o município) para atividades que usam recursos naturais ou podem causar impacto. É obrigatório para implantação de loteamentos, atividades rurais de maior porte, supressão de vegetação nativa, captação de água, criação de barragens, postos de combustível, agroindústrias e muito mais. A NATIVE faz o enquadramento e indica o caminho técnico mais curto pro seu caso.',
  },
  {
    q: 'O que é CAR e quem precisa fazer?',
    a: 'O CAR (Cadastro Ambiental Rural) é obrigatório para todo imóvel rural do país — independente do tamanho. Sem CAR ativo, a propriedade não consegue crédito agrícola, não regulariza áreas de reserva legal nem APP, e fica exposta a multa. A NATIVE faz o cadastro com base no georreferenciamento real do imóvel (não no croqui aproximado), reduzindo risco de retificação futura.',
  },
  {
    q: 'Preciso de outorga pra usar água da minha propriedade?',
    a: 'Sim, quando o uso configura captação significativa: poço artesiano, açude, barragem, captação em rio para irrigação ou dessedentação animal em grande escala. A outorga é emitida pelo DRH/SEMA-RS e pode ser dispensada em alguns casos (uso insignificante). A NATIVE analisa o caso e conduz o processo quando necessário.',
  },
  {
    q: 'Quero suprimir vegetação pra plantar / construir. Como faz?',
    a: 'Supressão de vegetação nativa exige autorização específica — mesmo em área já antropizada às vezes precisa. O processo passa por inventário florestal, projeto de adequação e, dependendo do bioma, compensação ambiental. A NATIVE faz o estudo técnico e instrui o pedido junto à FEPAM ou prefeitura.',
  },
  {
    q: 'Recebi multa ambiental — vocês ajudam?',
    a: 'Sim. A NATIVE faz o laudo técnico ambiental, projeto de recuperação de área degradada (PRAD) quando aplicável, e fornece subsídio técnico para o advogado conduzir a defesa. Atuamos do lado técnico — a defesa jurídica fica com seu advogado de confiança.',
  },
  {
    q: 'Vocês emitem ART em serviços ambientais?',
    a: 'Sim. Todo serviço técnico — laudo, projeto, levantamento, CAR — sai com ART (Anotação de Responsabilidade Técnica) assinada pelo profissional responsável.',
  },
  {
    q: 'Vocês atendem só Veranópolis?',
    a: 'Não. A base é em Veranópolis-RS, mas atendemos toda a Serra Gaúcha — Nova Prata, Cotiporã, Fagundes Varela, Vila Flores, Nova Bassano, Antônio Prado, Ipê, Guabiju, São Jorge, Nova Roma do Sul, Protásio Alves, Vista Alegre do Prata — e demandas em todo o Rio Grande do Sul.',
  },
]

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Licenciamento Ambiental, CAR e Outorga em Veranópolis e Serra Gaúcha',
    serviceType: 'Licenciamento ambiental, CAR rural, outorga de água, supressão vegetal',
    provider: { '@type': 'ProfessionalService', name: 'NATIVE Inteligência Territorial e Ambiental', url: 'https://nativeterritorial.com.br/' },
    areaServed: { '@type': 'State', name: 'Rio Grande do Sul' },
    url: 'https://nativeterritorial.com.br/licenciamento-ambiental-veranopolis',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  },
]

const trustItems = [
  { strong: 'FEPAM / Municípios', span: 'Encaminhamento técnico' },
  { strong: 'CAR rural', span: 'Cadastro com base no georreferenciamento' },
  { strong: 'Outorga d’água', span: 'DRH / SEMA-RS' },
  { strong: 'ART', span: 'Em todos os serviços' },
]

const servicos = [
  {
    title: 'Licenciamento ambiental',
    desc: 'Enquadramento, formulação e acompanhamento do processo de licença prévia, de instalação e de operação junto à FEPAM ou municípios.',
  },
  {
    title: 'CAR — Cadastro Ambiental Rural',
    desc: 'Cadastro feito com base no georreferenciamento real do imóvel, com identificação correta de APPs, reserva legal e áreas consolidadas.',
  },
  {
    title: 'Outorga de água',
    desc: 'Solicitação de outorga para captação (poço, açude, captação superficial) ou lançamento de efluentes junto ao DRH/SEMA.',
  },
  {
    title: 'Supressão vegetal nativa',
    desc: 'Inventário florestal, projeto técnico de supressão e instrução do pedido junto ao órgão competente.',
  },
  {
    title: 'PRAD',
    desc: 'Projeto de Recuperação de Área Degradada para imóveis com passivo ambiental, multa ou exigência de TAC.',
  },
  {
    title: 'Laudo ambiental técnico',
    desc: 'Laudos para apoio em processo administrativo, judicial ou de regularização — com responsabilidade técnica.',
  },
]

const when = [
  {
    title: 'Comprou ou herdou imóvel rural',
    desc: 'Antes de qualquer movimentação você precisa do CAR ativo e da situação ambiental clara — reserva legal, APP e áreas consolidadas.',
  },
  {
    title: 'Vai abrir poço, barragem ou açude',
    desc: 'A captação ou acumulação de água em volume significativo exige outorga prévia do DRH/SEMA-RS antes da execução.',
  },
  {
    title: 'Precisa suprimir vegetação',
    desc: 'Pra plantar, construir, abrir estrada ou ampliar área produtiva, a supressão de vegetação nativa exige autorização — mesmo em mata em regeneração.',
  },
  {
    title: 'Recebeu multa ou TAC ambiental',
    desc: 'Laudo técnico, PRAD e instrução técnica pra defesa: a NATIVE faz a parte técnica, seu advogado conduz o jurídico.',
  },
  {
    title: 'Vai implantar atividade que polui',
    desc: 'Posto de combustível, agroindústria, criação intensiva, abate, beneficiamento — todas exigem licenciamento prévio.',
  },
  {
    title: 'Quer crédito rural ou Pronaf',
    desc: 'Sem CAR ativo o banco não libera. Sem reserva legal regularizada, financiamento trava. A gente organiza isso antes de você chegar na agência.',
  },
]

const steps = [
  { num: '1', title: 'Diagnóstico ambiental', desc: 'Entendemos sua demanda, o imóvel e o contexto — e identificamos exatamente que tipo de licença, cadastro ou autorização o caso exige.' },
  { num: '2', title: 'Levantamento técnico', desc: 'Visita ao imóvel quando necessário, leitura de imagem aérea, georreferenciamento, identificação de APPs, RL e áreas consolidadas.' },
  { num: '3', title: 'Projeto / instrução', desc: 'Montagem do processo: estudos técnicos, mapas, memoriais, projetos e formulários — tudo conforme exigência do órgão.' },
  { num: '4', title: 'Acompanhamento', desc: 'Protocolo, acompanhamento dos pareceres, atendimento a exigências e entrega da licença / autorização emitida.' },
]

const diffs = [
  { icon: '🗺️', title: 'CAR feito com georreferenciamento real', desc: 'A maioria do mercado faz CAR no croqui aproximado e gera passivo. A NATIVE usa o levantamento topográfico real do imóvel.' },
  { icon: '⚖️', title: 'Suporte técnico pra defesa', desc: 'Recebeu multa? A gente faz laudo, PRAD e subsídio técnico pra seu advogado conduzir a defesa com base sólida.' },
  { icon: '🌱', title: 'Foco no encaminhamento', desc: 'Não complicamos pra cobrar mais. O objetivo é destravar o uso do imóvel pelo caminho técnico mais curto e seguro.' },
  { icon: '📋', title: 'ART em tudo', desc: 'Cada laudo, projeto, cadastro ou levantamento sai com ART assinada pelo profissional responsável. Documento de verdade.' },
]

const WA = 'https://wa.me/5554997104400?text=Ol%C3%A1%2C%20vim%20pelo%20site%20e%20gostaria%20de%20um%20or%C3%A7amento.'

function LicenciamentoAmbiental() {
  return (
    <div className="theme-ambiental">
      <Seo
        title="Licenciamento Ambiental, CAR e Outorga em Veranópolis-RS | NATIVE"
        description="Licenciamento ambiental, Cadastro Ambiental Rural (CAR), outorga de água, supressão vegetal e laudo técnico em Veranópolis e Serra Gaúcha. Encaminhamento direto, ART em tudo."
        canonical="https://nativeterritorial.com.br/licenciamento-ambiental-veranopolis"
        ogImage="https://nativeterritorial.com.br/images/ambiental-1.jpg"
        jsonLd={jsonLd}
      />
      <LPHeader />

      <LPHero
        badge="Ambiental · Veranópolis · Serra Gaúcha · RS"
        breadcrumb="Licenciamento Ambiental"
        h1Main="Licenciamento, CAR e"
        h1Em="ambiental do seu imóvel"
        subtitle="Licenciamento ambiental junto à FEPAM e municípios, Cadastro Ambiental Rural (CAR) com base no georreferenciamento real, outorga de água, supressão vegetal e laudos técnicos — com ART em todos os serviços."
        ctaHref={WA}
        ctaLabel="Solicitar orçamento →"
      />

      <TrustBar items={trustItems} />

      {/* Serviços */}
      <section className="lp-section" aria-labelledby="services-title">
        <div className="folio" aria-hidden="true">FL. 01 · O QUE A NATIVE FAZ</div>
        <div className="container">
          <div className="section-label">Serviços ambientais</div>
          <h2 id="services-title">O que a NATIVE entrega em <em>ambiental</em></h2>
          <p>
            A área ambiental da Native cobre os processos que mais travam o uso do imóvel:
            do cadastro inicial à licença de operação. Sempre com responsabilidade técnica
            assinada — porque parecer sem ART não vale processo.
          </p>
          <div className="lp-cards-grid">
            {servicos.map((s) => (
              <div className="lp-card-border" key={s.title}>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quando você precisa */}
      <section className="lp-section lp-alt" aria-labelledby="when-title">
        <div className="folio" aria-hidden="true">FL. 02 · QUANDO VOCÊ PRECISA</div>
        <div className="container">
          <div className="section-label">Quando contratar</div>
          <h2 id="when-title">Situações que <em>exigem</em> ambiental</h2>
          <p>
            Se você está em alguma dessas situações, vai precisar de ambiental antes de
            avançar — e tentar fazer sem trava o cartório, o banco e o órgão fiscalizador.
          </p>
          <div className="lp-cards-plain">
            {when.map((w) => (
              <div className="lp-card-plain" key={w.title}>
                <h3>{w.title}</h3>
                <p>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Processo */}
      <section className="lp-section" aria-labelledby="process-title">
        <div className="folio" aria-hidden="true">FL. 03 · MÉTODO</div>
        <div className="container">
          <div className="section-label">Como funciona</div>
          <h2 id="process-title">Do diagnóstico à <em>licença emitida</em></h2>
          <p>
            Cada caso tem um caminho técnico específico — depende do tipo de imóvel, da
            atividade pretendida, do órgão competente e do passivo existente. O método
            abaixo é o esqueleto geral.
          </p>
          <div className="lp-steps-grid">
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
        <div className="folio" aria-hidden="true">FL. 04 · DIFERENCIAL</div>
        <div className="container">
          <div className="section-label">Por que a NATIVE</div>
          <h2 id="diff-title">Ambiental conectado ao <em>território real</em></h2>
          <p>
            A diferença da Native em ambiental é que o cadastro nasce do imóvel medido,
            não do croqui aproximado. Isso evita retificação, retrabalho e passivo futuro.
          </p>
          <div className="lp-diff-grid">
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

      <FAQ items={faqItems} title="Dúvidas sobre licenciamento ambiental e CAR" />

      <section className="lp-cta">
        <div className="container">
          <div className="section-label">Solicitar orçamento</div>
          <h2>Precisa resolver a parte <em>ambiental</em> do seu imóvel?</h2>
          <p>
            Manda no WhatsApp o tipo de demanda (licença, CAR, outorga, multa…), a localização
            e o tamanho aproximado da área. A gente analisa e devolve com escopo, prazo e valor.
          </p>
          <a href={WA} className="btn-primary" target="_blank" rel="noopener noreferrer">
            Pedir orçamento no WhatsApp →
          </a>
        </div>
      </section>

      <LPFooter />
      <CookieBanner />
    </div>
  )
}

export default LicenciamentoAmbiental
