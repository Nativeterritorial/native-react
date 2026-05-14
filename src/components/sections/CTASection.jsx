const IconMail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="1.5" />
    <path d="M3 7l9 6 9-6" />
  </svg>
)

const IconPin = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 22s8-7.5 8-13a8 8 0 1 0-16 0c0 5.5 8 13 8 13z" />
    <circle cx="12" cy="9" r="2.8" />
  </svg>
)

const IconWhats = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-1.6-.8-2.6-1.4-3.7-3.2-.3-.5.3-.5.8-1.5.1-.2 0-.4 0-.5 0-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3 1.8.7 2.5.8 3.4.7.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.5-.3z M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2z" />
  </svg>
)

function CTASection() {
  return (
    <section id="contato" className="cta-section" aria-labelledby="cta-title">
      <div className="container">
        <div className="section-label fade-in">Contato</div>
        <h2 className="section-title fade-in" id="cta-title">Fale com a NATIVE</h2>
        <p className="section-sub fade-in">
          Chama no WhatsApp e manda a cidade, o tipo de serviço e uma noção da área ou do
          objetivo da demanda. Respondemos rápido e com clareza.
        </p>

        <a
          href="https://typebot.co/my-typebot-ort5blj"
          className="btn-primary fade-in"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="btn-icon"><IconWhats /></span>
          Falar no WhatsApp
        </a>

        <div className="cta-info">
          <div className="cta-info-item fade-in" style={{ transitionDelay: '160ms' }}>
            <span className="cta-info-icon"><IconMail /></span>
            <div>
              <strong>E-mail</strong>
              <p>
                <a href="mailto:contato@nativeterritorial.com.br">
                  contato@nativeterritorial.com.br
                </a>
              </p>
            </div>
          </div>
          <div className="cta-info-item fade-in" style={{ transitionDelay: '240ms' }}>
            <span className="cta-info-icon"><IconPin /></span>
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
