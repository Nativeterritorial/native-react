import { useEffect, useRef } from 'react'

/**
 * Tilt — inclina o elemento em 3D acompanhando o cursor, com um brilho
 * que segue o ponteiro. Desativado em touch e prefers-reduced-motion.
 *
 * Uso: <Tilt className="service-card">...</Tilt>
 */
function Tilt({ className = '', max = 6, children, ...rest }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    let raf = 0
    let hovering = false
    const s = { rx: 0, ry: 0, trx: 0, try: 0, lift: 0 }

    const loop = () => {
      s.rx += (s.trx - s.rx) * 0.14
      s.ry += (s.try - s.ry) * 0.14
      s.lift += ((hovering ? 1 : 0) - s.lift) * 0.14
      const settled =
        !hovering && Math.abs(s.rx) < 0.02 && Math.abs(s.ry) < 0.02 && s.lift < 0.01
      if (settled) {
        el.style.transform = ''
        el.style.transition = ''
        raf = 0
        return
      }
      el.style.transform =
        `perspective(900px) rotateX(${s.rx.toFixed(2)}deg) rotateY(${s.ry.toFixed(2)}deg) ` +
        `translate3d(0, ${(-4 * s.lift).toFixed(2)}px, 0)`
      raf = requestAnimationFrame(loop)
    }

    const onMove = (e) => {
      if (e.pointerType === 'touch') return
      const r = el.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width
      const py = (e.clientY - r.top) / r.height
      s.try = (px - 0.5) * 2 * max
      s.trx = -(py - 0.5) * 2 * max
      el.style.setProperty('--gx', `${(px * 100).toFixed(1)}%`)
      el.style.setProperty('--gy', `${(py * 100).toFixed(1)}%`)
      if (!hovering) {
        hovering = true
        // a transição de transform do CSS atrapalharia o acompanhamento do cursor
        el.style.transition = 'border-color 0.3s, box-shadow 0.3s'
        el.classList.add('is-tilting')
      }
      if (!raf) raf = requestAnimationFrame(loop)
    }
    const onLeave = () => {
      hovering = false
      s.trx = 0
      s.try = 0
      el.classList.remove('is-tilting')
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      cancelAnimationFrame(raf)
      el.style.transform = ''
      el.style.transition = ''
    }
  }, [max])

  return (
    <div ref={ref} className={`tilt ${className}`.trim()} {...rest}>
      {children}
      <span className="tilt-glare" aria-hidden="true" />
    </div>
  )
}

export default Tilt
