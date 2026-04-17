function CTASection() {
  return (
    <section id="contato" className="cta-section" aria-labelledby="cta-title">
      <div className="container">
        <div className="section-label">Contato</div>
        <h2 className="section-title" id="cta-title">Fale com a NATIVE</h2>
        <p className="section-sub">
          Chama no WhatsApp e manda a cidade, o tipo de serviço e uma noção da área ou do
          objetivo da demanda. Respondemos rápido e com clareza.
        </p>

        <a
          href="https://typebot.co/my-typebot-ort5blj"
          className="btn-primary"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: '16px', padding: '16px 32px' }}
        >
          💬 Falar no WhatsApp
        </a>

        <div className="cta-info">
          <div className="cta-info-item">
            <span className="cta-info-icon">📧</span>
            <div>
              <strong>E-mail</strong>
              <p>
                <a href="mailto:contato@nativeterritorial.com.br">
                  contato@nativeterritorial.com.br
                </a>
              </p>
            </div>
          </div>
          <div className="cta-info-item">
            <span className="cta-info-icon">📍</span>
            <div>
              <strong>Endereço</strong>
              <p>Rua Dr. José Montaury, 595 — Veranópolis/RS</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTASection
