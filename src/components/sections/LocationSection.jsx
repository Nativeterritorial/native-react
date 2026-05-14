import NativeMap from '../NativeMap'

const IconPin = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 22s8-7.5 8-13a8 8 0 1 0-16 0c0 5.5 8 13 8 13z" />
    <circle cx="12" cy="9" r="2.8" />
  </svg>
)
const IconChat = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-5.2A8 8 0 1 1 21 12z" />
  </svg>
)
const IconMail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="1.5" />
    <path d="M3 7l9 6 9-6" />
  </svg>
)

function LocationSection() {
  return (
    <section className="location-section" aria-labelledby="location-title">
      <div className="container">
        <div className="section-label">Localização</div>
        <h2 className="section-title" id="location-title">Base em Veranópolis, RS</h2>
        <p className="section-sub">
          Atendemos com agilidade toda a Serra Gaúcha e região, com deslocamento rápido
          para os municípios vizinhos.
        </p>

        <div className="location-cards">
          <div className="location-card">
            <div className="location-card-icon"><IconPin /></div>
            <h4>Endereço</h4>
            <p>Rua Dr. José Montaury, 595</p>
            <small>Veranópolis — RS</small>
          </div>
          <div className="location-card">
            <div className="location-card-icon"><IconChat /></div>
            <h4>WhatsApp</h4>
            <p>(54) 99710-4400</p>
            <small>Direto com o profissional</small>
          </div>
          <div className="location-card">
            <div className="location-card-icon"><IconMail /></div>
            <h4>E-mail</h4>
            <p>
              <a href="mailto:contato@nativeterritorial.com.br">
                contato@nativeterritorial.com.br
              </a>
            </p>
            <small>Atende toda a Serra Gaúcha e o RS</small>
          </div>
        </div>

        <div className="location-map">
          <NativeMap />
        </div>

        <div className="location-actions">
          <a
            href="https://maps.google.com/?q=Rua+Dr.+José+Montaury,+595,+Veranópolis,+RS"
            className="btn-ghost"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="btn-icon"><IconPin /></span>
            Abrir no Google Maps
          </a>
        </div>
      </div>
    </section>
  )
}

export default LocationSection
