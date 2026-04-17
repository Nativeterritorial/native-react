import { Link } from 'react-router-dom'

// Componente reutilizável para o hero das landing pages.
// Recebe props para customizar o conteúdo de cada página.
function LPHero({ badge, breadcrumb, h1Main, h1Em, subtitle, ctaHref, ctaLabel = '💬 Solicitar orçamento' }) {
  return (
    <div className="lp-hero">
      <div className="container">
        {/* Breadcrumb — mostra onde o usuário está */}
        <div className="lp-breadcrumb">
          <Link to="/">Início</Link>
          <span>›</span>
          <span>{breadcrumb}</span>
        </div>

        <div className="lp-badge">{badge}</div>

        <h1>
          {h1Main}
          {h1Em && <><br /><em>{h1Em}</em></>}
        </h1>

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
