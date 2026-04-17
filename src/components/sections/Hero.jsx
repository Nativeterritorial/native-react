function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-bg">
        <img src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1400&h=700&fit=crop" alt="" aria-hidden="true" />
      </div>

      <div className="container">
        <div className="hero-content">
          <div className="hero-badge">📍 Base em Veranópolis-RS · RS, SC, PR e SP</div>

          <h1 id="hero-title">
            Seu imóvel resolvido<br />
            com quem <em>domina</em><br />
            o processo
          </h1>

          <p className="hero-sub">
            Topografia, georreferenciamento e medição de áreas na Serra Gaúcha.
            Atendimento direto com o técnico, do orçamento à entrega.
          </p>

          <div className="hero-actions">
            <a
              href="https://typebot.co/my-typebot-ort5blj"
              className="btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              💬 Orçamento no WhatsApp
            </a>
            <a href="#servicos" className="btn-ghost">Ver serviços</a>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-num accent">4</span>
              <span className="stat-label">Estados atendidos</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">GNSS</span>
              <span className="stat-label">Equipamentos de precisão</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">TRT</span>
              <span className="stat-label">Responsabilidade técnica</span>
            </div>
            <div className="stat-item">
              <span className="stat-num accent">Direto</span>
              <span className="stat-label">Com o profissional</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
