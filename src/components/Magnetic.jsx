import { useEffect, useRef } from 'react'

/**
 * Magnetic — o filho "puxa" suavemente em direção ao cursor quando ele
 * se aproxima (proximidade configurável). Solta de volta ao sair.
 * Desativado em touch e prefers-reduced-motion.
 *
 * Uso: <Magnetic><a className="btn-primary">...</a></Magnetic>
 */
function Magnetic({ children, strength = 0.35, radius = 90 }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const isTouch = 'ontouchstart' in window || (navigator.maxTouchPoints || 0) > 1
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (isTouch || reduced) return

    let raf = 0
    const state = { x: 0, y: 0, tx: 0, ty: 0 }

    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.hypot(dx, dy)
      if (dist < r.width / 2 + radius) {
        state.tx = dx * strength
        state.ty = dy * strength
      } else {
        state.tx = 0
        state.ty = 0
      }
    }
    const onLeaveWin = () => { state.tx = 0; state.ty = 0 }

    const loop = () => {
      state.x += (state.tx - state.x) * 0.15
      state.y += (state.ty - state.y) * 0.15
      el.style.transform = `translate(${state.x.toFixed(2)}px, ${state.y.toFixed(2)}px)`
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseout', onLeaveWin)
    raf = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseout', onLeaveWin)
      cancelAnimationFrame(raf)
      el.style.transform = ''
    }
  }, [strength, radius])

  return (
    <span ref={ref} className="magnetic" style={{ display: 'inline-block' }}>
      {children}
    </span>
  )
}

export default Magnetic
