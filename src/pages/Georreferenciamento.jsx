import LPHeader from '../components/layout/LPHeader'
import LPFooter from '../components/layout/LPFooter'
import LPHero from '../components/layout/LPHero'
import TrustBar from '../components/layout/TrustBar'
import CookieBanner from '../components/layout/CookieBanner'
import Seo from '../components/Seo'
import FAQ from '../components/FAQ'

const faqItems = [
  {
    q: 'Quando o georreferenciamento é obrigatório?',
    a: 'Em toda movimentação de imóvel rural — venda, compra, inventário, partilha, desmembramento, remembramento, doação, hipoteca ou regularização. A Lei 10.267/2001 e a Norma Técnica do INCRA exigem o certificado SIGEF antes do cartório registrar qualquer transação. Não importa o tamanho do imóvel.',
  },
  {
    q: 'Imóvel rural pequeno (menos de 4 módulos fiscais) também precisa?',
    a: 'Sim. Desde 20/11/2023 todo imóvel rural — independente do tamanho — precisa de georreferenciamento certificado pra ser registrado em cartório após qualquer movimentação. Antes existia faseamento, hoje vale pra todos.',
  },
  {
    q: 'O que é SIGEF e por que é importante?',
    a: 'SIGEF (Sistema de Gestão Fundiária) é a plataforma oficial do INCRA que recebe, analisa e certifica o georreferenciamento de imóveis rurais. Sem o certificado SIGEF, o levantamento existe mas não tem validade legal — o cartório não registra. O número de certificação é o que vai pra matrícula.',
  },
  {
    q: 'Quanto custa o georreferenciamento?',
    a: 'Depende do tamanho da área, do acesso, do formato do imóvel (terreno fechado é mais fácil que um com vários "dentes"), da complexidade dos limites e da documentação existente. Pequenas propriedades até 5 ha começam em torno de R$ 2.500. Áreas maiores: orçamento por escopo. A Native devolve proposta com prazo e valor após receber localização e tamanho.',
  },
  {
    q: 'Quanto tempo leva do contato à certificação SIGEF?',
    a: 'Do orçamento aceito à certificação no SIGEF: 30 a 90 dias em casos sem complicação. Etapas: agenda de campo (1-2 semanas), processamento e peças técnicas (1-2 semanas), submissão e aceite no SIGEF (15 a 60 dias dependendo do INCRA-RS, das exigências e da fila). A Native acompanha cada etapa e te avisa em tempo real.',
  },
  {
    q: 'Preciso ir ao INCRA pessoalmente em algum momento?',
    a: 'Não. A submissão é toda eletrônica via SIGEF. Você fornece a documentação do imóvel (matrícula atualizada, IPTU/ITR, CPF/CNPJ dos proprietários) e a Native cuida da parte técnica e da submissão. Eventuais exigências do INCRA também são respondidas pelo técnico.',
  },
  {
    q: 'Vocês emitem ART?',
    a: 'Sim. Todo serviço sai com ART (Anotação de Responsabilidade Técnica) assinada pelo profissional habilitado que executou o levantamento. ART é obrigatória pra submissão no SIGEF.',
  },
  {
    q: 'Cartório não aceitou o georreferenciamento de outra empresa. Vocês refazem?',
    a: 'Sim. Em alguns casos é possível retificar a peça técnica existente; em outros precisa refazer o levantamento. A Native analisa o material atual, identifica o problema (geralmente erro de divisa, sobreposição com vizinho ou peça fora do padrão) e propõe o caminho mais curto pra resolver.',
  },
  {
    q: 'Vocês atendem fora de Veranópolis?',
    a: 'Sim. A base é em Veranópolis-RS, mas atendemos toda a Serra Gaúcha — Nova Prata, Cotiporã, Fagundes Varela, Antônio Prado, Vila Flores, Nova Bassano, Ipê, Guabiju, São Jorge, Nova Roma do Sul, Protásio Alves, Vista Alegre do Prata — e demandas em todo o Rio Grande do Sul.',
  },
]

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Georreferenciamento Rural — SIGEF/INCRA em Veranópolis e Serra Gaúcha',
    serviceType: 'Georreferenciamento rural, certificação SIGEF, retificação de área',
    provider: { '@type': 'ProfessionalService', name: 'NATIVE Inteligência Territorial e Ambiental', url: 'https://nativeterritorial.com.br/' },
    areaServed: { '@type': 'State', name: 'Rio Grande do Sul' },
    url: 'https://nativeterritorial.com.br/georreferenciamento-veranopolis',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  },
]

const trustItems = [
  { strong: 'SIGEF / INCRA', span: 'Submissão técnica completa' },
  { strong: 'Lei 10.267', span: 'Conformidade total' },
  { strong: 'GNSS RTK', span: 'Precisão centimétrica' },
  { strong: 'ART', span: 'Em todos os serviços' },
]

const servicos = [
  {
    title: 'Georreferenciamento certificado SIGEF',
    desc: 'Levantamento completo do perímetro com GNSS RTK, geração de peças técnicas, submissão ao SIGEF e acompanhamento até a certificação oficial do INCRA.',
  },
  {
    title: 'Retificação de área e divisas',
    desc: 'Correção de matrícula com área ou divisas erradas no cartório — comum em imóveis antigos ou com peças técnicas desatualizadas.',
  },
  {
    title: 'Desmembramento e remembramento',
    desc: 'Divisão de uma área em duas ou mais matrículas (desmembramento) ou união de áreas vizinhas numa só matrícula (remembramento) — com georreferenciamento individual.',
  },
  {
    title: 'Identificação de divisas',
    desc: 'Levantamento e marcação técnica das divisas no campo — útil pra fechamento de cerca, prevenção de litígio com vizinho ou conferência antes de compra.',
  },
  {
    title: 'Conferência de área antes da compra',
    desc: 'Levantamento técnico do imóvel rural pretendido pra validar se a área real bate com a matrícula. Blindagem antes da escritura.',
  },
  {
    title: 'Atendimento a exigência do INCRA',
    desc: 'Quando o processo já está aberto e o INCRA pediu peças complementares, retificação ou correção — a Native assume e leva até a certificação.',
  },
]

const when = [
  {
    title: 'Vai vender ou comprar imóvel rural',
    desc: 'O cartório não registra a transação sem o certificado SIGEF. Mesmo terreno pequeno (menos de 4 módulos fiscais) hoje precisa.',
  },
  {
    title: 'Inventário ou partilha de herança rural',
    desc: 'Divisão entre herdeiros exige abrir matrículas separadas — e cada nova matrícula precisa de georreferenciamento certificado.',
  },
  {
    title: 'Desmembramento ou união de áreas',
    desc: 'Dividir uma fazenda em duas ou juntar áreas vizinhas numa matrícula só — sempre passa por SIGEF.',
  },
  {
    title: 'Crédito rural ou Pronaf',
    desc: 'Banco exige matrícula atualizada com georreferenciamento certificado pra liberar financiamento agrícola, custeio ou investimento.',
  },
  {
    title: 'Doação ou hipoteca',
    desc: 'Toda transferência de domínio ou garantia exige a área certificada SIGEF antes do registro em cartório.',
  },
  {
    title: 'Cartório travou o processo',
    desc: 'Quando a movimentação parou porque a matrícula não tem certificado SIGEF — Native faz o levantamento e destrava.',
  },
]

const steps = [
  { num: '1', title: 'Análise documental', desc: 'Recebemos matrícula, IPTU/ITR, CPF/CNPJ dos proprietários e identificamos o que falta antes de marcar o campo.' },
  { num: '2', title: 'Levantamento de campo', desc: 'Visita ao imóvel com GNSS RTK pra coletar todo o perímetro, divisas, marcos e referências. Tempo varia conforme tamanho e acesso.' },
  { num: '3', title: 'Peças técnicas + submissão SIGEF', desc: 'Processamento, planta georreferenciada, memorial descritivo, ART e submissão eletrônica no sistema do INCRA.' },
  { num: '4', title: 'Certificação e registro', desc: 'Acompanhamento até a certificação SIGEF sair. Com o número de certificação você protocola no cartório pra registrar a transação.' },
]

const diffs = [
  { icon: '🛰️', title: 'GNSS RTK em todo o perímetro', desc: 'Precisão centimétrica obrigatória pelo INCRA. Não fazemos georref. com receptor básico — não passa no SIGEF.' },
  { icon: '📑', title: 'Acompanhamento até certificar', desc: 'Não entregamos peça e sumimos. Acompanhamos a submissão no SIGEF e respondemos eventuais exigências do INCRA-RS.' },
  { icon: '🗺️', title: 'Conhecimento do território', desc: 'Atuamos há anos na Serra Gaúcha — conhecemos cartórios, particularidades regionais e o INCRA-RS. Reduz fricção.' },
  { icon: '🤝', title: 'Direto com o técnico', desc: 'Você fala com quem vai a campo, processa e assina a ART. Sem comercial, sem terceirização, sem responsabilidade diluída.' },
]

const WA = 'https://typebot.co/my-typebot-ort5blj'

function Georreferenciamento() {
  return (
    <div className="theme-georref">
      <Seo
        title="Georreferenciamento Rural — SIGEF/INCRA em Veranópolis-RS | NATIVE"
        description="Georreferenciamento certificado SIGEF/INCRA em Veranópolis e Serra Gaúcha. Retificação, desmembramento, remembramento e atendimento a exigência do INCRA. GNSS RTK, ART em todos os serviços."
        canonical="https://nativeterritorial.com.br/georreferenciamento-veranopolis"
        ogImage="https://nativeterritorial.com.br/images/georreferenciamento.jpg"
        jsonLd={jsonLd}
      />
      <LPHeader />

      <LPHero
        badge="Georreferenciamento · SIGEF · INCRA · RS"
        breadcrumb="Georreferenciamento"
        h1Main="Georreferenciamento rural"
        h1Em="certificado pelo INCRA"
        subtitle="Levantamento, peças técnicas, submissão no SIGEF e acompanhamento até a certificação oficial. Desmembramento, retificação, regularização e atendimento a exigência do INCRA — em toda a Serra Gaúcha e no RS."
        ctaHref={WA}
        ctaLabel="Solicitar orçamento →"
      />

      <TrustBar items={trustItems} />

      <section className="lp-section" aria-labelledby="services-title">
        <div className="folio" aria-hidden="true">FL. 01 · O QUE A NATIVE FAZ</div>
        <div className="container">
          <div className="section-label">Serviços de georreferenciamento</div>
          <h2 id="services-title">O que a NATIVE entrega em <em>georreferenciamento</em></h2>
          <p>
            Georreferenciamento não é só "medir o terreno": é um processo técnico-administrativo
            com etapa de campo, peças técnicas e submissão eletrônica ao INCRA. A Native
            cobre o fluxo inteiro — do agendamento da visita à certificação SIGEF sair.
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
          <h2 id="when-title">Situações que <em>exigem</em> georreferenciamento</h2>
          <p>
            Desde 2023, qualquer movimentação de imóvel rural — venda, herança, divisão,
            financiamento — passa obrigatoriamente pelo SIGEF. Sem certificação, o cartório
            não registra.
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
          <h2 id="process-title">Do contato à <em>certificação SIGEF</em></h2>
          <p>
            Quatro etapas, prazo estimado em cada uma na proposta. Você acompanha onde está
            o processo o tempo todo — não é caixa-preta.
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
          <h2 id="diff-title">Georreferenciamento que <em>chega ao registro</em></h2>
          <p>
            A diferença entre o georref. que vira certificado e o que fica parado no SIGEF
            está em quatro coisas — todas técnicas, nenhuma comercial.
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

      <FAQ items={faqItems} title="Dúvidas sobre georreferenciamento e SIGEF" />

      <section className="lp-cta">
        <div className="container">
          <div className="section-label">Solicitar orçamento</div>
          <h2>Imóvel rural travado <em>no cartório</em>?</h2>
          <p>
            Manda no WhatsApp a localização, o tamanho aproximado e a situação (venda, herança,
            financiamento, exigência do cartório). A gente devolve com escopo, prazo e valor.
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

export default Georreferenciamento
