import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import Reveal from '../Reveal'

// O visor (three.js) só é baixado quando a seção se aproxima da tela
const Pano360 = lazy(() => import('../Pano360'))

const ALT = 'Panorama aéreo 360° de propriedades rurais com lavouras e mata nativa, capturado com drone'

function PanoSection() {
  const frameRef = useRef(null)
  const [load, setLoad] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const el = frameRef.current
    if (!el || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: '500px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const handleReady = useCallback(() => setReady(true), [])

  return (
    <section className="pano-section" aria-labelledby="pano-title">
      <div className="container">
        <div className="section-label">Vista aérea 360°</div>
        <Reveal as="h2" className="section-title" id="pano-title">
          O território visto <em>de cima</em>
        </Reveal>
        <p className="section-sub">
          Imagem 360° capturada com drone em campo. Arraste para olhar em volta — lavouras,
          mata nativa, estradas e divisas como elas são no terreno.
        </p>
      </div>

      <div className={`pano-frame${ready ? ' is-on' : ''}`} ref={frameRef}>
        <img className="pano-poster" src="/images/pano-poster.jpg" alt={ALT} loading="lazy" />
        {load && (
          <Suspense fallback={null}>
            <Pano360
              src="/images/pano-360.jpg"
              srcSmall="/images/pano-360-sm.jpg"
              label={ALT}
              onReady={handleReady}
            />
          </Suspense>
        )}
        <div className="pano-hint" aria-hidden="true">
          <span className="pano-hint-icon">←→</span> Arraste para girar · 360°
        </div>
        <div className="pano-tag" aria-hidden="true">Drone · 18.12.2025</div>
      </div>
    </section>
  )
}

export default PanoSection
