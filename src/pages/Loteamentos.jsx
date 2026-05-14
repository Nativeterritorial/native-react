import LPHeader from '../components/layout/LPHeader'
import LPFooter from '../components/layout/LPFooter'
import LPHero from '../components/layout/LPHero'
import TrustBar from '../components/layout/TrustBar'
import CookieBanner from '../components/layout/CookieBanner'
import Seo from '../components/Seo'
import FAQ from '../components/FAQ'

const faqItems = [
  {
    q: 'Quais etapas técnicas um loteamento exige?',
    a: 'Levantamento topográfico planialtimétrico, projeto urbanístico, projetos complementares (drenagem, água, esgoto, energia, pavimentação), licenciamento ambiental, aprovação na prefeitura e registro no cartório. A NATIVE atua nas etapas de topografia, georreferenciamento, ambiental e conferência de lotes.',
  },
  {
    q: 'Quanto tempo leva pra liberar um loteamento?',
    a: 'Varia muito conforme o município, o tamanho e a complexidade ambiental. Em geral, 12 a 24 meses do levantamento ao registro. Loteamentos rurais ou com supressão vegetal levam mais. A Native organiza o cronograma técnico pra evitar gargalo.',
  },
  {
    q: 'Vocês fazem só a parte técnica ou tocam o processo todo?',
    a: 'A Native faz a parte técnica e cartográfica — topografia, georreferenciamento, ambiental, CAR, conferência de lotes. Aprovação municipal e registro em cartório envolvem também advogado e equipe própria do empreendedor. A gente conecta com profissionais que trabalham nesses elos.',
  },
  {
    q: 'É possível regularizar um loteamento antigo?',
    a: 'Sim. A regularização fundiária urbana (REURB-S ou REURB-E) é o caminho legal pra loteamentos consolidados sem registro. Envolve levantamento, ato administrativo do município e registro coletivo. A Native faz a parte topográfica e cartográfica.',
  },
  {
    q: 'Conferência de lotes — o que é?',
    a: 'É o serviço técnico de validar se cada lote corresponde ao que foi projetado e vendido: medidas reais, divisas, área e localização. Importante antes da escritura de cada unidade pra evitar litígio futuro com o comprador.',
  },
  {
    q: 'Vocês atendem só Veranópolis?',
    a: 'Não. A base é em Veranópolis-RS e a Native atende toda a Serra Gaúcha e o Rio Grande do Sul.',
  },
]

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Loteamentos e Regularização Fundiária em Veranópolis e Serra Gaúcha',
    serviceType: 'Loteamentos, regularização fundiária, conferência de lotes, REURB',
    provider: { '@type': 'ProfessionalService', name: 'NATIVE Inteligência Territorial e Ambiental', url: 'https://nativeterritorial.com.br/' },
    areaServed: { '@type': 'State', name: 'Rio Grande do Sul' },
    url: 'https://nativeterritorial.com.br/loteamentos-veranopolis',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  },
]

const trustItems = [
  { strong: 'Loteamentos', span: 'Topografia, georref. e ambiental' },
  { strong: 'REURB', span: 'Regularização urbana' },
  { strong: 'Conferência', span: 'Validação de lotes' },
  { strong: 'ART', span: 'Em todas as etapas' },
]

const servicos = [
  {
    title: 'Levantamento topográfico',
    desc: 'Planialtimétrico cadastral com todas as cotas, divisas e referências necessárias para projeto urbanístico.',
  },
  {
    title: 'Projeto cartográfico do loteamento',
    desc: 'Implantação, locação de eixos, marcos, divisas dos lotes, áreas públicas e sistema viário em arquivo técnico.',
  },
  {
    title: 'Conferência de lotes',
    desc: 'Validação técnica de cada lote conforme projeto aprovado — medidas, área, divisas e localização antes da escritura.',
  },
  {
    title: 'Regularização fundiária urbana',
    desc: 'REURB-S ou REURB-E: levantamento técnico, peças cartográficas e instrução para o processo de registro coletivo.',
  },
  {
    title: 'Apoio em licenciamento ambiental',
    desc: 'Integração com o setor ambiental: CAR, supressão vegetal, áreas de APP e instrução técnica pro órgão competente.',
  },
  {
    title: 'Integração com cartório',
    desc: 'Peças técnicas no padrão exigido pelo cartório e pelo município pra evitar diligências e retorno do processo.',
  },
]

const when = [
  {
    title: 'Vai implantar loteamento novo',
    desc: 'Antes do projeto, o terreno precisa de topografia de qualidade e leitura ambiental — é onde 80% dos atrasos começam.',
  },
  {
    title: 'Tem loteamento sem registro',
    desc: 'Loteamentos antigos vendidos por contrato particular podem ser regularizados via REURB. A NATIVE faz a parte técnica.',
  },
  {
    title: 'Comprou lote e quer validar',
    desc: 'Conferência de lote antes da escritura evita comprar área menor ou em local diferente do prometido pelo vendedor.',
  },
  {
    title: 'Vai dividir gleba ou desmembrar',
    desc: 'Desmembramento, fracionamento ou loteamento — cada caso tem rito legal próprio. Identificamos o caminho técnico certo.',
  },
]

const steps = [
  { num: '1', title: 'Diagnóstico', desc: 'Visita técnica, leitura do terreno, levantamento da documentação existente e definição do escopo.' },
  { num: '2', title: 'Levantamento de campo', desc: 'Topografia planialtimétrica, georreferenciamento de divisas e marcação dos pontos de referência.' },
  { num: '3', title: 'Peças técnicas', desc: 'Plantas, memoriais, mapas, projeto cartográfico do loteamento e tudo o que o município/cartório exige.' },
  { num: '4', title: 'Acompanhamento', desc: 'Apoio em diligências, atendimento a exigências e conferência final de lotes na fase de venda.' },
]

const diffs = [
  { icon: '📐', title: 'Topografia que sustenta o projeto', desc: 'Levantamento com precisão GNSS e estação total — não levantamento de croqui. Reduz retrabalho na aprovação.' },
  { icon: '🏞️', title: 'Ambiental conectado', desc: 'CAR, APP, supressão e licença ambiental tratados junto com a parte cartográfica — sem refazer levantamento depois.' },
  { icon: '🤝', title: 'Conversa com prefeitura e cartório', desc: 'Conhecemos as exigências dos municípios da Serra Gaúcha e dos cartórios regionais — peças saem no padrão.' },
  { icon: '✅', title: 'Conferência final', desc: 'Antes de cada escritura, conferência de lote pra blindar o empreendedor contra litígio futuro com comprador.' },
]

const WA = 'https://typebot.co/my-typebot-ort5blj'

function Loteamentos() {
  return (
    <div className="theme-loteamentos">
      <Seo
        title="Loteamentos e Regularização Fundiária em Veranópolis-RS | NATIVE"
        description="Topografia, georreferenciamento, ambiental e conferência de lotes para implantação e regularização de loteamentos em Veranópolis e Serra Gaúcha. ART em todas as etapas."
        canonical="https://nativeterritorial.com.br/loteamentos-veranopolis"
        ogImage="https://nativeterritorial.com.br/images/loteamento.jpg"
        jsonLd={jsonLd}
      />
      <LPHeader />

      <LPHero
        badge="Loteamentos · Veranópolis · Serra Gaúcha · RS"
        breadcrumb="Loteamentos e Regularização"
        h1Main="Loteamentos e regularização"
        h1Em="fundiária com base técnica"
        subtitle="Topografia, georreferenciamento, ambiental e conferência de lotes — todas as etapas técnicas que sustentam o projeto até o registro em cartório. Atendimento direto com o profissional que executa."
        ctaHref={WA}
        ctaLabel="Solicitar orçamento →"
      />

      <TrustBar items={trustItems} />

      <section className="lp-section" aria-labelledby="services-title">
        <div className="folio" aria-hidden="true">FL. 01 · O QUE A NATIVE FAZ</div>
        <div className="container">
          <div className="section-label">Serviços técnicos</div>
          <h2 id="services-title">O que a NATIVE entrega em <em>loteamentos</em></h2>
          <p>
            Loteamento é projeto longo e com muitas pontes técnicas — topografia, cartografia,
            ambiental e cartório. A NATIVE faz a parte técnica que sustenta o processo.
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
          <h2 id="when-title">Quando faz <em>sentido</em> chamar a Native</h2>
          <p>
            A base técnica de um loteamento é o que decide se ele atrasa 6 meses ou 6 anos.
            Estes são os momentos em que vale acionar a Native antes.
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
          <h2 id="process-title">Da gleba ao <em>lote escriturado</em></h2>
          <p>
            Cada etapa tem entrega objetiva pra você acompanhar o avanço — sem caixa-preta.
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
          <h2 id="diff-title">Loteamento que não <em>destrava no meio</em></h2>
          <p>
            A maioria dos atrasos em loteamento vem da parte técnica feita pela metade —
            topografia sem precisão, ambiental fora de hora, peças que voltam do cartório.
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

      <FAQ items={faqItems} title="Dúvidas sobre loteamentos e regularização" />

      <section className="lp-cta">
        <div className="container">
          <div className="section-label">Solicitar orçamento</div>
          <h2>Vai implantar ou <em>regularizar</em> um loteamento?</h2>
          <p>
            Manda no WhatsApp a localização, o tamanho da área e em que etapa o projeto
            está. A gente devolve com escopo técnico, prazo e valor.
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

export default Loteamentos
