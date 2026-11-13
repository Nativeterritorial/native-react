import { useCallback, useRef, useState } from 'react'
import Reveal from '../Reveal'
import Magnetic from '../Magnetic'
import CountUp from '../CountUp'
import Terrain3D from '../Terrain3D'

const fmtCota = new Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
})

function Hero() {
  const [ready3d, setReady3d] = useState(false)
  const cotaRef = useRef(null)

  const handleReady = useCallback(() => setReady3d(true), [])
  const handleElevation = useCallback((alt) => {
    const el = cotaRef.current
    if (!el) return
    el.textContent = alt == null ? '' : `Cota ${fmtCota.format(alt)} m`
  }, [])

  return (
    <section className={`hero${ready3d ? ' has-3d' : ''}`} aria-labelledby="hero-title">
      <div className="hero-bg">
        <img src="/images/rural-hero.jpg" alt="" aria-hidden="true" />
        <Terrain3D variant="orto" onReady={handleReady} onElevation={handleElevation} />
      </div>

      <div className="hero-coord" aria-hidden="true">
        <strong>28°56′13″ S</strong>
        51°33′23″ W
        <span className="hero-cota" ref={cotaRef} />
      </div>

      <div className="container">
        <div className="hero-content">
          <div className="hero-badge">Base · Veranópolis · Rio Grande do Sul</div>

          <Reveal as="h1" id="hero-title" threshold={0.1}>
            Limite, área e <br />
            documentação técnica <br />
            <em>do seu imóvel.</em>
          </Reveal>

          <p className="hero-sub">
            Topografia, georreferenciamento rural (SIGEF/INCRA) e licenciamento ambiental
            em toda a Serra Gaúcha. Atendimento direto com o profissional técnico que executa.
          </p>

          <div className="hero-actions">
            <Magnetic>
              <a
                href="https://wa.me/5554997104400?text=Ol%C3%A1%2C%20vim%20pelo%20site%20e%20gostaria%20de%20um%20or%C3%A7amento."
                className="btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Solicitar orçamento →
              </a>
            </Magnetic>
            <a href="#servicos" className="btn-ghost">Ver serviços</a>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-num accent">RTK</span>
              <span className="stat-label">precisão centimétrica</span>
            </div>
            <div className="stat-item">
              <CountUp className="stat-num" value="13" />
              <span className="stat-label">cidades atendidas · RS</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">SIGEF</span>
              <span className="stat-label">certificação · INCRA</span>
            </div>
            <div className="stat-item">
              <span className="stat-num accent">ART</span>
              <span className="stat-label">responsabilidade técnica</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
