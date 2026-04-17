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
            <div className="location-card-icon">📍</div>
            <h4>Endereço</h4>
            <p>Rua Dr. José Montaury, 595</p>
            <small>Veranópolis — RS</small>
          </div>
          <div className="location-card">
            <div className="location-card-icon">💬</div>
            <h4>WhatsApp</h4>
            <p>(54) 99710-4400</p>
            <small>Direto com o profissional</small>
          </div>
          <div className="location-card">
            <div className="location-card-icon">📧</div>
            <h4>E-mail</h4>
            <p>
              <a href="mailto:contato@nativeterritorial.com.br">
                contato@nativeterritorial.com.br
              </a>
            </p>
            <small>Atendimento também em RS, SC, PR e SP</small>
          </div>
        </div>

        <div className="location-map">
          <iframe
            src="https://www.google.com/maps?q=Rua+Dr.+José+Montaury,+595,+Veranópolis,+RS&output=embed"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Mapa da NATIVE em Veranópolis"
          />
        </div>

        <div className="location-actions">
          <a
            href="https://maps.google.com/?q=Rua+Dr.+José+Montaury,+595,+Veranópolis,+RS"
            className="btn-ghost"
            target="_blank"
            rel="noopener noreferrer"
          >
            📍 Abrir no Google Maps
          </a>
        </div>
      </div>
    </section>
  )
}

export default LocationSection
