import NativeMap from '../NativeMap'

function MapStrip() {
  return (
    <section className="map-strip" aria-label="Localização da NATIVE em Veranópolis-RS">
      <div className="map-strip-meta">
        <div className="map-strip-coord">28°56′13″ S · 51°33′23″ W</div>
        <div className="map-strip-addr">
          <strong>NATIVE · Veranópolis / RS</strong>
          <span>Rua Dr. José Montaury, 595</span>
        </div>
        <a
          href="https://maps.google.com/?q=Rua+Dr.+José+Montaury,+595,+Veranópolis,+RS"
          className="map-strip-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Abrir no Google Maps →
        </a>
      </div>
      <div className="map-strip-canvas">
        <NativeMap />
      </div>
    </section>
  )
}

export default MapStrip
