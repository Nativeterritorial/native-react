import { Link } from 'react-router-dom'
import Reveal from '../Reveal'
import Terrain3D from '../Terrain3D'

// Cada página (serviço ou cidade) ganha um relevo próprio, derivado do nome
function seedFrom(text = '') {
  let h = 0
  for (let i = 0; i < text.length; i++) h = (h * 31 + text.charCodeAt(i)) % 997
  return 1 + (h % 40)
}

// Componente reutilizável para o hero das landing pages.
// Recebe props para customizar o conteúdo de cada página.
function LPHero({ badge, breadcrumb, h1Main, h1Em, subtitle, ctaHref, ctaLabel = 'Solicitar orçamento' }) {
  return (
    <div className="lp-hero">
      <Terrain3D seed={seedFrom(breadcrumb)} />
      <div className="container">
        {/* Breadcrumb — mostra onde o usuário está */}
        <div className="lp-breadcrumb">
          <Link to="/">Início</Link>
          <span>›</span>
          <span>{breadcrumb}</span>
        </div>

        <div className="lp-badge">{badge}</div>

        <Reveal as="h1" threshold={0.1}>
          {h1Main}
          {h1Em && <><br /><em>{h1Em}</em></>}
        </Reveal>

        <p className="lp-hero-p">{subtitle}</p>

        <div className="lp-hero-actions">
          <a href={ctaHref} className="btn-primary" target="_blank" rel="noopener noreferrer">
            {ctaLabel}
          </a>
          <Link to="/" className="btn-ghost">← Voltar ao site</Link>
        </div>
      </div>
    </div>
  )
}

export default LPHero
