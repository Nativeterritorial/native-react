function AboutSection() {
  return (
    <section className="about-section" aria-labelledby="about-title">
      <div className="container">
        <div className="about-grid">
          <div className="about-image">
            <img
              src="/images/escritorio-1.jpg"
              alt="Escritório NATIVE Territorial"
              loading="lazy"
            />
          </div>

          <div className="about-text">
            <div className="section-label">Quem somos</div>
            <h2 className="section-title" id="about-title">
              Trabalho técnico com presença real no campo
            </h2>
            <p>
              A NATIVE Inteligência Territorial e Ambiental é especializada em topografia,
              georreferenciamento rural e licenciamento ambiental, com base em Veranópolis/RS
              e atuação em toda a Serra Gaúcha e estados vizinhos.
            </p>
            <p>
              Trabalhamos com equipamentos GNSS de precisão, emitimos TRT em todos os serviços
              e você fala direto com o profissional que executa — sem intermediários.
            </p>
            <p>
              Nossa missão é entregar clareza técnica, documentação segura e orientação real
              para proprietários rurais, empresas, investidores e profissionais que precisam
              de precisão no território.
            </p>
            <a
              href="https://typebot.co/my-typebot-ort5blj"
              className="btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              💬 Fale com a equipe
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
