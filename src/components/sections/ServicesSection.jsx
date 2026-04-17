// Link do React Router — navega sem recarregar a página
import { Link } from 'react-router-dom'

const services = [
  {
    tag: 'Topografia',
    title: 'Levantamento Topográfico e Planialtimétrico',
    desc: 'Levantamento topográfico, planialtimétrico, plantas, mapas e conferência de área para terrenos urbanos, imóveis rurais, obras e implantação de projetos.',
    img: '/images/topografia.jpg',
    imgAlt: 'Levantamento topográfico em campo',
    link: '/topografia-veranopolis',
  },
  {
    tag: 'Georreferenciamento',
    title: 'Georreferenciamento Rural — SIGEF / INCRA',
    desc: 'Perímetro, compatibilização documental, mapas e acompanhamento técnico para processos conforme exigências do SIGEF e do INCRA.',
    img: '/images/georreferenciamento.jpg',
    imgAlt: 'Georreferenciamento rural SIGEF',
    link: '/georreferenciamento-veranopolis',
  },
  {
    tag: 'Loteamentos e Ambiental',
    title: 'Loteamentos, Regularização e Suporte Ambiental',
    desc: 'Apoio técnico para loteamentos, conferência de lotes, regularização de áreas e demandas ambientais conectadas ao uso seguro do imóvel.',
    img: '/images/loteamento.jpg',
    imgAlt: 'Loteamento e regularização de área',
    link: '/licenciamento-ambiental-veranopolis',
  },
]

function ServicesSection() {
  return (
    <section id="servicos" className="services-section" aria-labelledby="services-title">
      <div className="container">
        <div className="section-header">
          <div className="section-label fade-in">Serviços</div>
          <h2 className="section-title fade-in" id="services-title">
            Topografia, Georreferenciamento e Ambiental
          </h2>
          <p className="section-sub fade-in">
            Soluções técnicas sob medida para imóveis rurais, áreas urbanas, loteamentos
            e regularização territorial.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, i) => (
            <div className="service-card fade-in" style={{ transitionDelay: `${i * 80}ms` }} key={service.tag}>
              <div className="service-card-img">
                <img src={service.img} alt={service.imgAlt} loading="lazy" />
              </div>
              <div className="service-card-body">
                <div className="service-tag">{service.tag}</div>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
                {/* Link interno — React Router não recarrega a página */}
                <Link to={service.link} className="service-link">Saiba mais →</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
