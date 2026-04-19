function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-inner">
          <div className="footer-brand">
            <a href="#" className="nav-logo">
              <img src="/images/logo.png" alt="NATIVE" />
              <span>NATIVE <span className="logo-accent">Territorial</span></span>
            </a>
            <p>Inteligência Territorial e Ambiental · Veranópolis, RS · CNPJ 64.247.072/0001-10</p>
          </div>

          <div className="footer-links">
            <h5>Serviços</h5>
            <ul>
              <li><a href="/topografia-veranopolis">Topografia em Veranópolis</a></li>
              <li><a href="/georreferenciamento-veranopolis">Georreferenciamento em Veranópolis</a></li>
              <li><a href="/licenciamento-ambiental-veranopolis">Licenciamento Ambiental</a></li>
            </ul>
          </div>

          <div className="footer-links">
            <h5>Contato</h5>
            <ul>
              <li><a href="https://typebot.co/my-typebot-ort5blj">WhatsApp</a></li>
              <li><a href="mailto:contato@nativeterritorial.com.br">E-mail</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          © 2026 NATIVE Inteligência Territorial e Ambiental · Todos os direitos reservados
        </div>
      </div>
    </footer>
  )
}

export default Footer
