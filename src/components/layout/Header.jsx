import { useState } from 'react'

// useState é o hook do React para guardar estado (dados que mudam).
// Aqui usamos para controlar se o menu mobile está aberto ou fechado.

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header>
      <div className="container nav-inner">
        <a href="#" className="nav-logo">
          <img src="/images/logo.png" alt="NATIVE" />
          <span>NATIVE <span className="logo-accent">Inteligência Territorial</span></span>
        </a>

        <nav aria-label="Menu principal">
          <ul>
            <li><a href="#servicos">Serviços</a></li>
            <li><a href="#como-funciona">Como funciona</a></li>
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
            💬 Orçamento
          </a>
        </div>

        {/* Botão hamburger — aparece só no mobile */}
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

      {/* Menu mobile — className muda conforme o estado menuOpen */}
      <nav className={`mobile-menu ${menuOpen ? 'open' : ''}`} aria-label="Menu mobile">
        <a href="#servicos" onClick={() => setMenuOpen(false)}>Serviços</a>
        <a href="#como-funciona" onClick={() => setMenuOpen(false)}>Como funciona</a>
        <a href="#area" onClick={() => setMenuOpen(false)}>Área atendida</a>
        <a href="#faq" onClick={() => setMenuOpen(false)}>Dúvidas</a>
        <a
          href="https://typebot.co/my-typebot-ort5blj"
          style={{ color: 'var(--verde)', fontWeight: '600' }}
          onClick={() => setMenuOpen(false)}
        >
          💬 Orçamento no WhatsApp
        </a>
      </nav>
    </header>
  )
}

export default Header
