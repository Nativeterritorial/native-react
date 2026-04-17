import { useState } from 'react'
import { Link } from 'react-router-dom'

// Header das landing pages internas — nav links apontam para as páginas de serviço
function LPHeader({ whatsappMsg = 'Olá, vim pelo site e gostaria de um orçamento.' }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const waLink = `https://wa.me/5554997104400?text=${encodeURIComponent(whatsappMsg)}`

  return (
    <header>
      <div className="container nav-inner">
        <Link to="/" className="nav-logo">
          <img src="/images/logo.png" alt="NATIVE" />
          <span>NATIVE <span className="logo-accent">Inteligência Territorial</span></span>
        </Link>

        <nav aria-label="Menu principal">
          <ul>
            <li><Link to="/">Início</Link></li>
            <li><Link to="/topografia-veranopolis">Topografia</Link></li>
            <li><Link to="/georreferenciamento-veranopolis">Georreferenciamento</Link></li>
            <li><Link to="/licenciamento-ambiental-veranopolis">Licenciamento</Link></li>
          </ul>
        </nav>

        <div className="nav-cta">
          <a href="https://typebot.co/my-typebot-ort5blj" className="btn-primary" target="_blank" rel="noopener noreferrer">
            💬 Orçamento
          </a>
        </div>

        <button className="hamburger" aria-label="Abrir menu" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span><span></span><span></span>
        </button>
      </div>

      <nav className={`mobile-menu ${menuOpen ? 'open' : ''}`} aria-label="Menu mobile">
        <Link to="/" onClick={() => setMenuOpen(false)}>Início</Link>
        <Link to="/topografia-veranopolis" onClick={() => setMenuOpen(false)}>Topografia</Link>
        <Link to="/georreferenciamento-veranopolis" onClick={() => setMenuOpen(false)}>Georreferenciamento</Link>
        <Link to="/licenciamento-ambiental-veranopolis" onClick={() => setMenuOpen(false)}>Licenciamento</Link>
        <a href="https://typebot.co/my-typebot-ort5blj" style={{ color: 'var(--verde)', fontWeight: '600' }} onClick={() => setMenuOpen(false)}>
          💬 Orçamento no WhatsApp
        </a>
      </nav>
    </header>
  )
}

export default LPHeader
