import { useEffect, useRef, useState } from 'react'

/**
 * CountUp — anima um número de 0 até o alvo quando entra na viewport.
 * Aceita strings tipo "+1.000", "13", "98%". Partes não-numéricas
 * (ex.: "SIGEF", "ART") são renderizadas estáticas.
 */
function parse(value) {
  const str = String(value)
  const m = str.match(/^(\D*)([\d.,]+)(\D*)$/)
  if (!m) return null
  const prefix = m[1] || ''
  const rawNum = m[2]
  const suffix = m[3] || ''
  // remove separadores de milhar (. ou espaço); vírgula vira decimal
  const normalized = rawNum.replace(/\.(?=\d{3}\b)/g, '').replace(',', '.')
  const target = parseFloat(normalized)
  if (Number.isNaN(target)) return null
  const decimals = (normalized.split('.')[1] || '').length
  return { prefix, target, suffix, decimals }
}

function format(n, decimals) {
  return n.toLocaleString('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

function CountUp({ value, duration = 1600, className, style }) {
  const ref = useRef(null)
  const parsed = parse(value)
  const [display, setDisplay] = useState(
    parsed ? `${parsed.prefix}0${parsed.suffix}` : String(value)
  )

  useEffect(() => {
    if (!parsed) return
    const el = ref.current
    if (!el) return
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setDisplay(`${parsed.prefix}${format(parsed.target, parsed.decimals)}${parsed.suffix}`)
      return
    }

    let raf = 0
    let started = false
    const run = (t0) => {
      const tick = (t) => {
        const p = Math.min(1, (t - t0) / duration)
        const eased = 1 - Math.pow(1 - p, 3) // easeOutCubic
        const cur = parsed.target * eased
        setDisplay(`${parsed.prefix}${format(cur, parsed.decimals)}${parsed.suffix}`)
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true
          run(performance.now())
          io.disconnect()
        }
      },
      { threshold: 0.4 }
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration])

  // não-numérico: renderiza estático
  if (!parsed) {
    return (
      <span ref={ref} className={className} style={style}>
        {value}
      </span>
    )
  }

  return (
    <span ref={ref} className={className} style={style}>
      {display}
    </span>
  )
}

export default CountUp
