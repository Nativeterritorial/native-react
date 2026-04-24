import { useEffect } from 'react'

// Componente SEO reutilizável.
// Atualiza title, meta description, canonical, tags Open Graph/Twitter e
// injeta blocos JSON-LD (structured data) no <head>.
function Seo({
  title,
  description,
  canonical,
  ogImage = 'https://nativeterritorial.com.br/images/aerial.jpg',
  ogType = 'website',
  jsonLd,
}) {
  useEffect(() => {
    if (title) document.title = title

    const setMeta = (attr, key, content) => {
      if (!content) return
      let el = document.querySelector(`meta[${attr}="${key}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, key)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    setMeta('name', 'description', description)
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', canonical)
    setMeta('property', 'og:image', ogImage)
    setMeta('property', 'og:type', ogType)
    setMeta('property', 'og:site_name', 'NATIVE Inteligência Territorial')
    setMeta('property', 'og:locale', 'pt_BR')
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', ogImage)

    if (canonical) {
      let linkCanonical = document.querySelector('link[rel="canonical"]')
      if (!linkCanonical) {
        linkCanonical = document.createElement('link')
        linkCanonical.setAttribute('rel', 'canonical')
        document.head.appendChild(linkCanonical)
      }
      linkCanonical.setAttribute('href', canonical)
    }

    // Remove JSON-LD dinâmicos de renderizações anteriores
    document
      .querySelectorAll('script[data-seo-jsonld="dynamic"]')
      .forEach((n) => n.remove())

    const blocks = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : []
    blocks.forEach((block) => {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.setAttribute('data-seo-jsonld', 'dynamic')
      script.textContent = JSON.stringify(block)
      document.head.appendChild(script)
    })

    return () => {
      document
        .querySelectorAll('script[data-seo-jsonld="dynamic"]')
        .forEach((n) => n.remove())
    }
  }, [title, description, canonical, ogImage, ogType, jsonLd])

  return null
}

export default Seo
