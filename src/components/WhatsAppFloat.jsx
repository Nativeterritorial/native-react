const WA_URL = 'https://typebot.co/my-typebot-ort5blj'

function WhatsAppFloat() {
  const handleClick = () => {
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-18051450854/XfrNCOb3kaIcEOaPzZ9D',
        'value': 1.0,
        'currency': 'BRL'
      })
    }
  }

  return (
    <a
      href={WA_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      onClick={handleClick}
      style={{
        position: 'fixed',
        right: '20px',
        bottom: '20px',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        background: '#25D366',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
        zIndex: 9999,
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.08)'
        e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)'
        e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.25)'
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        width="32"
        height="32"
        fill="#fff"
        aria-hidden="true"
      >
        <path d="M16.002 3.2C9.2 3.2 3.67 8.73 3.67 15.53c0 2.17.57 4.29 1.65 6.15L3.2 28.8l7.31-2.06a12.27 12.27 0 0 0 5.49 1.33h.01c6.8 0 12.33-5.53 12.33-12.33 0-3.3-1.28-6.4-3.62-8.73a12.25 12.25 0 0 0-8.72-3.6zm0 22.47h-.01a10.21 10.21 0 0 1-5.2-1.42l-.37-.22-4.34 1.22 1.16-4.23-.24-.39a10.19 10.19 0 0 1-1.56-5.42c0-5.65 4.6-10.24 10.25-10.24 2.74 0 5.31 1.07 7.24 3s3 4.51 3 7.24c0 5.65-4.6 10.25-10.23 10.25zm5.62-7.67c-.31-.15-1.82-.9-2.1-1s-.49-.15-.69.15-.79 1-.97 1.2-.36.23-.67.08a8.38 8.38 0 0 1-2.46-1.52 9.22 9.22 0 0 1-1.7-2.12c-.18-.31-.02-.48.13-.63.14-.14.31-.36.46-.54s.2-.31.31-.51.05-.39-.03-.54-.69-1.66-.95-2.28c-.25-.6-.5-.51-.69-.52l-.59-.01a1.13 1.13 0 0 0-.82.39 3.45 3.45 0 0 0-1.08 2.57c0 1.52 1.1 2.98 1.25 3.19s2.16 3.3 5.24 4.63c.73.32 1.3.51 1.75.65.73.23 1.4.2 1.92.12.59-.09 1.82-.74 2.07-1.46.26-.72.26-1.33.18-1.46-.08-.13-.28-.2-.59-.36z" />
      </svg>
    </a>
  )
}

export default WhatsAppFloat
