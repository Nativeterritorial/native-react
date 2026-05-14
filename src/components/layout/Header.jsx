import { useState, useEffect } from 'react'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={scrolled ? 'scrolled' : ''}>
      <div className="container nav-inner">
        <a href="#" className="nav-logo">
          <img src="/images/logo.png" alt="NATIVE" />
          <span>
            NATIVE
            <span className="logo-accent">Inteligência Territorial</span>
          </span>
        </a>

        <nav aria-label="Menu principal">
          <ul>
            <li><a href="#servicos">Serviços</a></li>
            <li><a href="#como-funciona">Método</a></li>
            <li><a href="#area">Área atendida</a></li>
            <li><a href="#faq">Dúvidas</a></li>
          </ul>
        </nav>

        <div className="nav-cta">
          <a
            href="https://typebot.co/my-typebot-ort5blj"
            className="btn-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Orçamento →
          </a>
        </div>

        <button
          className="hamburger"
          aria-label="Abrir menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <nav className={`mobile-menu ${menuOpen ? 'open' : ''}`} aria-label="Menu mobile">
        <a href="#servicos" onClick={() => setMenuOpen(false)}>Serviços</a>
        <a href="#como-funciona" onClick={() => setMenuOpen(false)}>Método</a>
        <a href="#area" onClick={() => setMenuOpen(false)}>Área atendida</a>
        <a href="#faq" onClick={() => setMenuOpen(false)}>Dúvidas</a>
        <a
          href="https://typebot.co/my-typebot-ort5blj"
          style={{ color: 'var(--terracotta)', fontWeight: '600' }}
          onClick={() => setMenuOpen(false)}
        >
          Orçamento no WhatsApp →
        </a>
      </nav>
    </header>
  )
}

export default Header
