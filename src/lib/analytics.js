// Medição do site: consentimento de cookies e cliques de WhatsApp.
// As tags (Google Ads, GA4, Meta Pixel) são carregadas no index.html.

const ADS_CONTACT_CONVERSION = 'AW-18051450854/XfrNCOb3kaIcEOaPzZ9D'
const WA_SELECTOR = 'a[href*="wa.me/"], a[href*="api.whatsapp.com/"]'

/** Chamado pelo banner de cookies quando o visitante aceita ou recusa. */
export function setConsent(granted) {
  const state = granted ? 'granted' : 'denied'
  window.gtag?.('consent', 'update', {
    ad_storage: state,
    ad_user_data: state,
    ad_personalization: state,
    analytics_storage: state,
  })
  window.fbq?.('consent', granted ? 'grant' : 'revoke')
}

// De onde veio o clique: botão flutuante, hero, CTA, header...
function linkLocation(link) {
  if (link.dataset.waLocation) return link.dataset.waLocation
  const area = link.closest('section, header, footer, nav, .lp-hero, .mobile-menu')
  if (!area) return 'outro'
  return area.id || area.classList[0] || area.tagName.toLowerCase()
}

/**
 * Um único listener cobre todos os links de WhatsApp do site, inclusive os
 * que forem criados depois — nenhum componente precisa de onClick próprio.
 */
export function initWhatsAppTracking() {
  const onClick = (e) => {
    const link = e.target.closest?.(WA_SELECTOR)
    if (!link || !window.gtag) return
    // Conversão "Contato" do Google Ads
    window.gtag('event', 'conversion', {
      send_to: ADS_CONTACT_CONVERSION,
      value: 1.0,
      currency: 'BRL',
    })
    // Evento do Google Analytics (relatório mensal: contatos gerados)
    window.gtag('event', 'whatsapp_click', {
      page_path: window.location.pathname,
      link_location: linkLocation(link),
    })
  }
  document.addEventListener('click', onClick, true)
  return () => document.removeEventListener('click', onClick, true)
}
