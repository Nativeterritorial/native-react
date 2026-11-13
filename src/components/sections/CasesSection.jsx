import Reveal from '../Reveal'
import Tilt from '../Tilt'

const cases = [
  {
    img: '/images/case-veranopolis.jpg',
    alt: 'Matrícula retificada com representação gráfica georreferenciada averbada — Registro de Imóveis de Veranópolis',
    tag: 'Imóvel rural · 2,18 ha · Veranópolis-RS',
    title: 'Retificação de área e matrícula',
    desc: 'Matrícula sem descrição precisa dos limites. Elaboramos o levantamento, a planta e o memorial, e conduzimos o processo em cartório. O resultado registrado: a matrícula retificada com a representação gráfica georreferenciada averbada.',
  },
  {
    img: '/images/case-vila-flores.png',
    alt: 'Planta georreferenciada com vértices, azimutes e coordenadas — imóvel rural em Vila Flores',
    tag: 'Imóvel rural · 33,55 ha · Vila Flores-RS',
    title: 'Novas matrículas georreferenciadas',
    desc: 'Duas matrículas antigas com áreas e divisas divergentes da realidade. Elaboramos a planta georreferenciada com vértices, azimutes e coordenadas de precisão centimétrica. Resultado: novas matrículas abertas no registro de imóveis.',
  },
]

function CasesSection() {
  return (
    <section className="cases-section" aria-labelledby="cases-title">
      <div className="folio" aria-hidden="true">FL. 06 · RESULTADOS</div>
      <div className="container">
        <div className="section-header">
          <div className="section-label">Resultados recentes</div>
          <Reveal as="h2" className="section-title" id="cases-title">
            Cases de georreferenciamento
          </Reveal>
          <p className="section-sub">
            Não prometemos resultado — mostramos. Documentos reais de processos concluídos,
            com os dados dos clientes preservados.
          </p>
        </div>

        <div className="cases-grid">
          {cases.map((c) => (
            <article className="case-card" key={c.title}>
              <Tilt className="case-doc" max={5}>
                <img src={c.img} alt={c.alt} loading="lazy" />
              </Tilt>
              <div className="case-tag">{c.tag}</div>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
            </article>
          ))}
        </div>

        <p className="cases-more">
          Quer ver o trabalho completo?{' '}
          <a href="/portfolio-native.pdf" target="_blank" rel="noopener noreferrer">
            Baixe o portfólio em PDF →
          </a>
        </p>
      </div>
    </section>
  )
}

export default CasesSection
