import { useEffect } from 'react'

// Componente SEO reutilizável.
// Atualiza dinamicamente o title, meta description e a tag canonical da página.
// Assim o Google entende qual é a URL "oficial" de cada página e evita problema
// de "Cópia sem página canônica selecionada".
function Seo({ title, description, canonical }) {
  useEffect(() => {
    // 1) Atualiza o title da aba do navegador
    if (title) {
      document.title = title
    }

    // 2) Atualiza a meta description
    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]')
      if (!metaDesc) {
        metaDesc = document.createElement('meta')
        metaDesc.setAttribute('name', 'description')
        document.head.appendChild(metaDesc)
      }
      metaDesc.setAttribute('content', description)
    }

    // 3) Atualiza (ou cria) a tag canonical
    if (canonical) {
      let linkCanonical = document.querySelector('link[rel="canonical"]')
      if (!linkCanonical) {
        linkCanonical = document.createElement('link')
        linkCanonical.setAttribute('rel', 'canonical')
        document.head.appendChild(linkCanonical)
      }
      linkCanonical.setAttribute('href', canonical)
    }
  }, [title, description, canonical])

  // Componente não renderiza nada visual — só manipula o <head>
  return null
}

export default Seo
