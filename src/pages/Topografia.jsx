import LPHeader from '../components/layout/LPHeader'
import LPFooter from '../components/layout/LPFooter'
import LPHero from '../components/layout/LPHero'
import TrustBar from '../components/layout/TrustBar'
import CookieBanner from '../components/layout/CookieBanner'
import Seo from '../components/Seo'
import FAQ from '../components/FAQ'

const faqItems = [
  {
    q: 'Qual a diferença entre levantamento planimétrico, altimétrico e planialtimétrico?',
    a: 'Planimétrico mede só o plano horizontal (limites, área, divisas) — usado em lote urbano simples. Altimétrico mede só relevo (cotas, curvas de nível). Planialtimétrico junta os dois — é o levantamento completo, o mais pedido em obras, projetos e licenciamentos. Quando você não sabe qual precisa, é planialtimétrico.',
  },
  {
    q: 'Quanto custa um levantamento topográfico?',
    a: 'Depende do tamanho, do acesso, do tipo de levantamento e do que precisa ser entregue (planta, memorial, curvas de nível, perfil). Para terreno urbano simples na Serra Gaúcha o serviço começa em torno de R$ 800. Áreas rurais ou com complexidade variam — a Native envia orçamento por escopo após receber localização e finalidade.',
  },
  {
    q: 'Quanto tempo leva do contato à entrega?',
    a: 'Levantamento urbano simples: 7 a 15 dias úteis entre agenda de campo, processamento e entrega da planta. Áreas rurais ou com peças complexas (memorial, perfis, locação): 15 a 30 dias. O prazo exato sai junto com a proposta — sem promessa vazia.',
  },
  {
    q: 'O que a Native entrega no final?',
    a: 'Planta topográfica em formato técnico (PDF + DWG quando solicitado), memorial descritivo, ART assinada, e dependendo do escopo: curvas de nível, perfil longitudinal, locação de eixos, planta de implantação. Tudo no padrão exigido por prefeitura, cartório ou engenheiro responsável pela obra.',
  },
  {
    q: 'Qual equipamento vocês usam?',
    a: 'Receptores GNSS RTK (precisão centimétrica em campo aberto) e estação total para áreas urbanas ou com obstrução de sinal. A escolha do equipamento depende da exigência de precisão do serviço — quem usa só um tipo está usando errado em parte dos casos.',
  },
  {
    q: 'Preciso de topografia mesmo pra terreno pequeno?',
    a: 'Sim, em três situações: vai construir e precisa de projeto aprovado, vai comprar e quer conferir as medidas reais antes da escritura, ou vai regularizar / desmembrar. Pra terreno só registrado e parado, não. Mas antes de qualquer movimentação técnica, vale.',
  },
  {
    q: 'Vocês atendem fora de Veranópolis?',
    a: 'Sim. A base é em Veranópolis-RS, mas atendemos toda a Serra Gaúcha — Nova Prata, Cotiporã, Fagundes Varela, Antônio Prado, Vila Flores, Nova Bassano, Ipê, Guabiju, São Jorge — e demandas em todo o Rio Grande do Sul.',
  },
]

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Topografia em Veranópolis e Serra Gaúcha',
    serviceType: 'Levantamento topográfico planialtimétrico, locação de obra, conferência de área',
    provider: { '@type': 'ProfessionalService', name: 'NATIVE Inteligência Territorial e Ambiental', url: 'https://nativeterritorial.com.br/' },
    areaServed: { '@type': 'State', name: 'Rio Grande do Sul' },
    url: 'https://nativeterritorial.com.br/topografia-veranopolis',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  },
]

const trustItems = [
  { strong: 'GNSS RTK', span: 'Precisão centimétrica em campo' },
  { strong: 'Estação total', span: 'Áreas urbanas e obstruídas' },
  { strong: 'ART', span: 'Em todos os serviços' },
  { strong: 'PDF + DWG', span: 'Entregas técnicas' },
]

const servicos = [
  {
    title: 'Planialtimétrico cadastral',
    desc: 'O levantamento completo: divisas, área, curvas de nível, cotas e referências. Base obrigatória para projeto de obra, loteamento, licenciamento ou regularização.',
  },
  {
    title: 'Conferência de área',
    desc: 'Validação das medidas reais do terreno antes da escritura — evita comprar imóvel com área menor que a anunciada. Comparação com a matrícula.',
  },
  {
    title: 'Locação de obra',
    desc: 'Marcação física dos eixos, fundações e pontos de implantação no terreno conforme o projeto aprovado — antes da fundação começar.',
  },
  {
    title: 'As-built',
    desc: 'Levantamento da obra como foi efetivamente construída, para atualizar projeto e instruir habite-se, vistoria ou averbação.',
  },
  {
    title: 'Curvas de nível e perfil',
    desc: 'Para projetos de drenagem, terraplenagem, açude, barragem, estrada vicinal ou movimentação de terra com cálculo de volume.',
  },
  {
    title: 'Plantas para prefeitura e cartório',
    desc: 'Peças técnicas no padrão exigido pelo município e pelo registro de imóveis — pra não voltar com diligência.',
  },
]

const when = [
  {
    title: 'Vai construir',
    desc: 'Toda obra com projeto aprovado precisa do levantamento planialtimétrico do terreno. Sem ele, o arquiteto não tem base e a prefeitura não aprova.',
  },
  {
    title: 'Vai comprar um terreno',
    desc: 'Conferir as medidas reais antes da escritura blinda contra área menor, divisa errada e litígio com vizinho depois da compra.',
  },
  {
    title: 'Vai dividir, vender parte ou desmembrar',
    desc: 'Toda divisão de imóvel — urbano ou rural — precisa de levantamento técnico pra abrir matrículas separadas no cartório.',
  },
  {
    title: 'Vai regularizar',
    desc: 'Regularização de área urbana, REURB ou averbação no cartório exige planta atualizada com ART do responsável técnico.',
  },
  {
    title: 'Vai mover terra',
    desc: 'Terraplenagem, açude, drenagem, barragem — todos exigem cota atual do terreno e cálculo de volume de corte/aterro.',
  },
  {
    title: 'Vai fazer projeto de engenharia',
    desc: 'Engenheiro civil, arquiteto e agrônomo trabalham em cima da planta topográfica. Sem ela, o projeto é chute.',
  },
]

const steps = [
  { num: '1', title: 'Diagnóstico', desc: 'Você manda localização, tamanho aproximado e finalidade. A gente define escopo, prazo e valor — sem caixa-preta.' },
  { num: '2', title: 'Levantamento de campo', desc: 'Visita técnica com GNSS RTK e/ou estação total conforme a área. Coleta de pontos, divisas e referências altimétricas.' },
  { num: '3', title: 'Processamento', desc: 'Tratamento dos dados em escritório: cálculo de área, geração da planta em CAD, memorial descritivo e peças complementares.' },
  { num: '4', title: 'Entrega', desc: 'PDF + DWG (quando solicitado), memorial, ART assinada e orientação sobre como usar o material no próximo passo.' },
]

const diffs = [
  { icon: '📐', title: 'Equipamento certo pra cada caso', desc: 'GNSS RTK pra campo aberto e estação total pra área urbana ou com obstrução de sinal — não é tudo medido do mesmo jeito.' },
  { icon: '🧾', title: 'ART e responsabilidade técnica', desc: 'Cada planta sai com ART assinada pelo profissional que executou. Documento que vale em prefeitura, cartório e processo.' },
  { icon: '📁', title: 'Entrega no formato certo', desc: 'PDF + DWG (quando o projetista precisa), planta com timbre técnico, memorial descritivo — peças que não voltam por exigência burocrática.' },
  { icon: '🤝', title: 'Atendimento direto', desc: 'Você fala com o técnico que vai a campo. Sem intermediário, sem orçamento de empresa terceirizado, sem responsabilidade diluída.' },
]

const WA = 'https://typebot.co/my-typebot-ort5blj'

function Topografia() {
  return (
    <>
      <Seo
        title="Topografia em Veranópolis-RS e Serra Gaúcha | NATIVE"
        description="Levantamento topográfico planialtimétrico, conferência de área, locação de obra e as-built em Veranópolis e toda a Serra Gaúcha. GNSS RTK, ART em todos os serviços, atendimento direto."
        canonical="https://nativeterritorial.com.br/topografia-veranopolis"
        ogImage="https://nativeterritorial.com.br/images/topografia.jpg"
        jsonLd={jsonLd}
      />
      <LPHeader />

      <LPHero
        badge="Topografia · Veranópolis · Serra Gaúcha · RS"
        breadcrumb="Topografia"
        h1Main="Topografia com"
        h1Em="precisão e ART"
        subtitle="Levantamento planialtimétrico, conferência de área, locação de obra e as-built em Veranópolis e toda a Serra Gaúcha. GNSS RTK ou estação total conforme o caso, entrega em PDF + DWG, ART em todos os serviços."
        ctaHref={WA}
        ctaLabel="Solicitar orçamento →"
      />

      <TrustBar items={trustItems} />

      <section className="lp-section" aria-labelledby="services-title">
        <div className="folio" aria-hidden="true">FL. 01 · O QUE A NATIVE FAZ</div>
        <div className="container">
          <div className="section-label">Serviços de topografia</div>
          <h2 id="services-title">O que a NATIVE entrega em <em>topografia</em></h2>
          <p>
            Topografia não é um serviço único — é um conjunto de levantamentos com objetivos
            técnicos diferentes. Pedir o tipo errado é fonte comum de retrabalho. A Native
            identifica o que seu caso exige antes de mandar a equipe a campo.
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

      <section className="lp-section lp-alt" aria-labelledby="when-title">
        <div className="folio" aria-hidden="true">FL. 02 · QUANDO VOCÊ PRECISA</div>
        <div className="container">
          <div className="section-label">Quando contratar</div>
          <h2 id="when-title">Situações que <em>exigem</em> topografia</h2>
          <p>
            Se você está em alguma dessas seis situações, o levantamento topográfico é
            etapa obrigatória — não dá pra pular ou improvisar com croqui aproximado.
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

      <section className="lp-section" aria-labelledby="process-title">
        <div className="folio" aria-hidden="true">FL. 03 · MÉTODO</div>
        <div className="container">
          <div className="section-label">Como funciona</div>
          <h2 id="process-title">Do diagnóstico à <em>entrega final</em></h2>
          <p>
            Processo direto, com etapa visível e prazo definido na proposta — você acompanha
            em que parte o serviço está.
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

      <section className="lp-section lp-alt" aria-labelledby="diff-title">
        <div className="folio" aria-hidden="true">FL. 04 · DIFERENCIAL</div>
        <div className="container">
          <div className="section-label">Por que a NATIVE</div>
          <h2 id="diff-title">Topografia que <em>não volta</em> da prefeitura</h2>
          <p>
            A maioria dos atrasos em obra e regularização vem de planta topográfica
            incompleta, com erro de cota ou fora do padrão exigido. Quatro coisas que
            mudam o resultado:
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

      <FAQ items={faqItems} title="Dúvidas sobre topografia" />

      <section className="lp-cta">
        <div className="container">
          <div className="section-label">Solicitar orçamento</div>
          <h2>Precisa de levantamento <em>topográfico</em>?</h2>
          <p>
            Manda no WhatsApp a localização, o tamanho aproximado da área e a finalidade
            (obra, compra, regularização, projeto). A gente devolve com escopo, prazo e valor.
          </p>
          <a href={WA} className="btn-primary" target="_blank" rel="noopener noreferrer">
            Pedir orçamento no WhatsApp →
          </a>
        </div>
      </section>

      <LPFooter />
      <CookieBanner />
    </>
  )
}

export default Topografia
