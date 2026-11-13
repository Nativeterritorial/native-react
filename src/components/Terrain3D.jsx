import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'

// three.js fica em chunk próprio — só baixa quando a seção se aproxima
// da tela e o navegador está ocioso, sem competir com o primeiro paint.
const TerrainScene = lazy(() => import('./TerrainScene'))
const OrthoScene = lazy(() => import('./OrthoScene'))

/**
 * Terrain3D — camada de fundo com a maquete 3D da propriedade rural.
 * Deve ficar dentro de um pai com position: relative.
 *
 * variant: 'rural' (maquete ilustrada) | 'orto' (levantamento real: ortofoto + relevo)
 * seed: número — muda a paisagem gerada (variant 'rural')
 * focus: true destaca o imóvel (divisa, marcos, sede); false mostra só a paisagem
 */
function Terrain3D({ variant = 'rural', seed = 0, focus = true, className = '', onReady, onElevation }) {
  const ref = useRef(null)
  const [load, setLoad] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let idle = 0
    const schedule = () => {
      idle = window.requestIdleCallback
        ? window.requestIdleCallback(() => setLoad(true), { timeout: 1500 })
        : window.setTimeout(() => setLoad(true), 300)
    }
    let observer
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            observer.disconnect()
            schedule()
          }
        },
        { rootMargin: '400px' }
      )
      observer.observe(el)
    } else {
      schedule()
    }
    return () => {
      observer?.disconnect()
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle)
      else window.clearTimeout(idle)
    }
  }, [])

  const handleReady = useCallback(() => {
    setReady(true)
    onReady?.()
  }, [onReady])

  return (
    <div
      ref={ref}
      className={`terrain-3d${ready ? ' is-on' : ''} ${className}`.trim()}
      aria-hidden="true"
    >
      {load && (
        <Suspense fallback={null}>
          {variant === 'orto' ? (
            <OrthoScene onReady={handleReady} onElevation={onElevation} />
          ) : (
            <TerrainScene seed={seed} focus={focus} onReady={handleReady} onElevation={onElevation} />
          )}
        </Suspense>
      )}
    </div>
  )
}

export default Terrain3D
