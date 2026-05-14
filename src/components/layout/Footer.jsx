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
              <li><a href="/loteamentos-veranopolis">Loteamentos</a></li>
            </ul>
          </div>

          <div className="footer-links">
            <h5>Contato</h5>
            <ul>
              <li><a href="https://wa.me/5554997104400?text=Ol%C3%A1%2C%20vim%20pelo%20site%20e%20gostaria%20de%20um%20or%C3%A7amento.">WhatsApp</a></li>
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
