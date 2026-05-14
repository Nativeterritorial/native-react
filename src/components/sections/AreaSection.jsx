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
              href="https://wa.me/5554997104400?text=Ol%C3%A1%2C%20vim%20pelo%20site%20e%20gostaria%20de%20um%20or%C3%A7amento."
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
