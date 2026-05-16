import { useEffect } from 'react'

/**
 * ScrollTilt — aplica perspectiva sutil nas seções conforme entram/saem
 * da viewport. Versão contida (sóbria) pra não enjoar: rotateX máx ~3.5°,
 * leve scale e fade. Só anima seções visíveis (IntersectionObserver) e
 * atualiza via rAF num único listener de scroll.
 */
const SELECTOR = [
  '.resolve-section',
  '.about-section',
  '.services-section',
  '.process-section',
  '.area-section',
  '.location-section',
  '.gallery-section',
  '.diff-section',
  '.testimonials-section',
  '.faq-section',
].join(',')

function ScrollTilt() {
  useEffect(() => {
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const els = Array.from(document.querySelectorAll(SELECTOR))
    if (!els.length) return

    const visible = new Set()
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) visible.add(e.target)
          else {
            visible.delete(e.target)
            e.target.style.transform = ''
            e.target.style.opacity = ''
          }
        })
      },
      { threshold: [0, 0.1, 0.5, 1] }
    )

    els.forEach((el) => {
      // pivota a partir da BASE — efeito "carta levantando da mesa" (Weecom)
      el.style.transformOrigin = 'center bottom'
      el.style.willChange = 'transform, opacity'
      io.observe(el)
    })

    let raf = 0
    const update = () => {
      const vh = window.innerHeight
      visible.forEach((el) => {
        const r = el.getBoundingClientRect()
        // Parametros clonados do Weecom (inspecionado ao vivo):
        //  - rotateX ~80deg -> 0, pivot bottom center
        //  - perspective ~1500px (baked no matrix3d deles)
        //  - easing LINEAR (data-anim-ease="none")
        //  - sem opacity / scale / translateY
        //  - mapeado em ~1 tela inteira de scroll
        const startAt = vh          // 0%: topo da secao entra pelo rodape
        const endAt = vh * 0.05     // 100%: topo quase no topo da tela
        const p = Math.min(1, Math.max(0, (startAt - r.top) / (startAt - endAt)))
        const rot = (1 - p) * 80          // 80deg -> 0, linear
        el.style.transform = `perspective(1500px) rotateX(${rot.toFixed(2)}deg)`
        el.style.opacity = ''
      })
      raf = 0
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    update()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      io.disconnect()
      cancelAnimationFrame(raf)
      els.forEach((el) => {
        el.style.transform = ''
        el.style.opacity = ''
        el.style.willChange = ''
      })
    }
  }, [])

  return null
}

export default ScrollTilt
