import { lazy, Suspense, useEffect, useRef, useState } from 'react'

// Leaflet é pesado — só baixa o chunk quando o visitante se aproxima do mapa
const NativeMap = lazy(() => import('../NativeMap'))

function MapStrip() {
  const canvasRef = useRef(null)
  const [showMap, setShowMap] = useState(false)

  useEffect(() => {
    const el = canvasRef.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      setShowMap(true)
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShowMap(true)
          observer.disconnect()
        }
      },
      { rootMargin: '600px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

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
      <div className="map-strip-canvas" ref={canvasRef}>
        {showMap && (
          <Suspense fallback={null}>
            <NativeMap />
          </Suspense>
        )}
      </div>
    </section>
  )
}

export default MapStrip
