function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-bg">
        <img src="/images/aerial.jpg" alt="" aria-hidden="true" />
      </div>

      <div className="hero-coord" aria-hidden="true">
        <strong>28°56′13″ S</strong>
        51°33′23″ W
      </div>

      <div className="container">
        <div className="hero-content">
          <div className="hero-badge">Base · Veranópolis · Rio Grande do Sul</div>

          <h1 id="hero-title">
            Limite, área e<br />
            documentação técnica<br />
            <em>do seu imóvel.</em>
          </h1>

          <p className="hero-sub">
            Topografia, georreferenciamento rural (SIGEF/INCRA) e licenciamento ambiental
            em toda a Serra Gaúcha. Atendimento direto com o profissional técnico que executa.
          </p>

          <div className="hero-actions">
            <a
              href="https://typebot.co/my-typebot-ort5blj"
              className="btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Solicitar orçamento →
            </a>
            <a href="#servicos" className="btn-ghost">Ver serviços</a>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-num accent">+1.000</span>
              <span className="stat-label">hectares · serra gaúcha</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">13</span>
              <span className="stat-label">cidades atendidas · RS</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">SIGEF</span>
              <span className="stat-label">certificação · INCRA</span>
            </div>
            <div className="stat-item">
              <span className="stat-num accent">ART</span>
              <span className="stat-label">responsabilidade técnica</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
