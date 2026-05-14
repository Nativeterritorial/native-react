const tags = [
  { label: 'Veranópolis', main: true },
  { label: 'Vila Flores' },
  { label: 'Nova Bassano' },
  { label: 'Cotiporã' },
  { label: 'Fagundes Varela' },
  { label: 'Nova Prata' },
  { label: 'Serra Gaúcha' },
  { label: 'Rio Grande do Sul' },
]

const areaList = [
  'Compra ou venda de terrenos',
  'Regularização de imóveis rurais',
  'Georreferenciamento para SIGEF/INCRA',
  'Implantação de loteamentos',
  'Conferência de área e divisas',
  'Projetos de construção e obras',
]

function AreaSection() {
  return (
    <section id="area" className="area-section" aria-labelledby="area-title">
      <div className="container">
        <div className="area-grid">
          <div>
            <div className="section-label fade-in">Área de atendimento</div>
            <h2 className="section-title fade-in" id="area-title">
              Topografia em Veranópolis e em <em>todo o RS</em>
            </h2>
            <p className="section-sub fade-in" style={{ marginBottom: '40px' }}>
              A NATIVE tem base em{' '}
              <strong style={{ color: 'var(--ink)' }}>Veranópolis-RS</strong> e atende
              demandas em toda a Serra Gaúcha e no{' '}
              <strong style={{ color: 'var(--ink)' }}>Rio Grande do Sul</strong>.
            </p>

            <div className="area-tags">
              {tags.map((tag, i) => (
                <span
                  key={tag.label}
                  className={`area-tag fade-in ${tag.main ? 'main' : ''}`}
                  style={{ transitionDelay: `${i * 50}ms` }}
                >
                  {tag.label}
                </span>
              ))}
            </div>

            <a
              href="https://typebot.co/my-typebot-ort5blj"
              className="btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Verificar atendimento na sua cidade →
            </a>
          </div>

          <div>
            <ul className="area-list">
              {areaList.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AreaSection
