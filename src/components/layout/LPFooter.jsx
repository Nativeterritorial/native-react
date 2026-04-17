import { Link } from 'react-router-dom'

function LPFooter() {
  return (
    <footer>
      <div className="container">
        <div className="footer-inner">
          <div className="footer-brand">
            <Link to="/" className="nav-logo">
              <img src="https://nativeterritorial.com.br/logo.png" alt="NATIVE" />
              <span>NATIVE <span className="logo-accent">Territorial</span></span>
            </Link>
            <p>Inteligência Territorial e Ambiental · Veranópolis, RS · CNPJ 64.247.072/0001-10</p>
          </div>

          <div className="footer-links">
            <h5>Municípios</h5>
            <ul>
              <li><Link to="/georreferenciamento-veranopolis">Veranópolis</Link></li>
              <li><Link to="/georreferenciamento/nova-prata">Nova Prata</Link></li>
              <li><Link to="/georreferenciamento/cotipora">Cotiporã</Link></li>
              <li><Link to="/georreferenciamento/fagundes-varela">Fagundes Varela</Link></li>
              <li><Link to="/georreferenciamento/vila-flores">Vila Flores</Link></li>
            </ul>
          </div>

          <div className="footer-links">
            <h5>Serviços</h5>
            <ul>
              <li><Link to="/topografia-veranopolis">Topografia</Link></li>
              <li><Link to="/georreferenciamento-veranopolis">Georreferenciamento</Link></li>
              <li><Link to="/licenciamento-ambiental-veranopolis">Licenciamento Ambiental</Link></li>
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

export default LPFooter
