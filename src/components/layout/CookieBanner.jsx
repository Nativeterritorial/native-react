import { useState, useEffect } from 'react'

// useEffect roda código depois que o componente aparece na tela.
// Aqui usamos para checar se o usuário já respondeu ao banner.

function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('native_cookie_consent')
    if (!consent) {
      setVisible(true)
    }
  }, []) // [] = roda só uma vez, quando o componente é montado

  const aceitar = () => {
    localStorage.setItem('native_cookie_consent', 'accepted')
    setVisible(false)
  }

  const recusar = () => {
    localStorage.setItem('native_cookie_consent', 'declined')
    setVisible(false)
  }

  // Se não está visível, não renderiza nada
  if (!visible) return null

  return (
    <div id="native-cookie-banner" role="dialog" aria-label="Aviso de cookies">
      <div className="nc-header">
        <div className="nc-dot"></div>
        <div>
          <p className="nc-title">Privacidade e cookies</p>
          <p className="nc-text">
            Utilizamos cookies para melhorar sua experiência e mensurar o desempenho do site.
            Ao continuar, você concorda com nossa{' '}
            <a href="/politica-de-privacidade.html" target="_blank" rel="noopener noreferrer">
              Política de Privacidade
            </a>.
          </p>
        </div>
      </div>
      <div className="nc-actions">
        <button className="nc-btn-recusar" onClick={recusar}>Recusar</button>
        <button className="nc-btn-aceitar" onClick={aceitar}>Aceitar</button>
      </div>
    </div>
  )
}

export default CookieBanner
