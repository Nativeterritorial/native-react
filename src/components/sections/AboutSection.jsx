import Reveal from '../Reveal'

const team = [
  {
    initial: 'F',
    name: 'Felipe Nadal',
    role: 'Sócio · Operações e Gestão',
    label: '01 · OP / GESTÃO',
    bio: 'Conduz a operação da NATIVE — atendimento, comercial, organização técnica do escritório e relacionamento com cartórios, prefeituras e órgãos. É o ponto de contato do cliente do primeiro orçamento à entrega final.',
    photo: '/images/felipe.jpg',
  },
  {
    initial: 'P',
    name: 'Precila Cicconeto Nadal',
    role: 'Sócia · Ambiental e Gestão',
    label: '02 · AMBIENTAL',
    bio: 'Conduz a área ambiental da NATIVE — licenciamento, Cadastro Ambiental Rural (CAR), outorga de água, supressão vegetal e laudos técnicos. Também responde pela parte administrativa do escritório.',
    photo: '/images/precila.jpg',
  },
]

function AboutSection() {
  return (
    <section className="about-section" aria-labelledby="about-title">
      <div className="grid-bg" aria-hidden="true" />
      <div className="folio folio-paper" aria-hidden="true">FL. 04 · EQUIPE</div>
      <div className="container">
        <div className="about-header">
          <div className="section-label">Quem faz</div>
          <Reveal as="h2" className="section-title" id="about-title">
            A NATIVE é feita por <em>duas pessoas</em>
          </Reveal>
          <p className="section-sub">
            Atendimento direto, sem terceirização. Você fala com quem assina a ART, conduz
            o processo e entrega o trabalho. Os dois sócios atuam de ponta a ponta —
            cada um na sua frente.
          </p>
        </div>

        <div className="team-grid">
          {team.map((m) => (
            <article className="team-card" key={m.name}>
              <div className="team-photo">
                {m.photo ? (
                  <img src={m.photo} alt={`Retrato de ${m.name}`} loading="lazy" />
                ) : (
                  <>
                    <span className="team-photo-initial" aria-hidden="true">{m.initial}.</span>
                    <span className="team-photo-label" aria-hidden="true">{m.label}</span>
                    <span className="team-photo-soon" aria-hidden="true">FOTO EM BREVE</span>
                  </>
                )}
              </div>
              <div className="team-body">
                <div className="team-role">{m.role}</div>
                <h3 className="team-name">{m.name}</h3>
                <p>{m.bio}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="about-cta">
          <p className="about-cta-text">
            Os dois trabalham com responsabilidade técnica. Cada serviço sai com ART
            assinada. Cada processo tem um nome próprio acompanhando do começo ao fim.
          </p>
          <a
            href="https://wa.me/5554997104400?text=Ol%C3%A1%2C%20vim%20pelo%20site%20e%20gostaria%20de%20um%20or%C3%A7amento."
            className="btn-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Fale com a equipe →
          </a>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
