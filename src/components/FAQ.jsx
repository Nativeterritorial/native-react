function FAQ({ items, title = 'Perguntas frequentes', label = 'FAQ' }) {
  if (!items || items.length === 0) return null

  return (
    <section className="lp-section" aria-labelledby="faq-title">
      <div className="container">
        <div className="section-label">{label}</div>
        <h2 className="section-title" id="faq-title">{title}</h2>
        <div style={{ marginTop: '32px', maxWidth: '820px' }}>
          {items.map((item, i) => (
            <details
              key={i}
              style={{
                borderTop: '1px solid rgba(0,0,0,0.08)',
                padding: '18px 0',
              }}
            >
              <summary
                style={{
                  cursor: 'pointer',
                  fontWeight: 500,
                  fontSize: '17px',
                  listStyle: 'none',
                }}
              >
                {item.q}
              </summary>
              <p style={{ marginTop: '12px', opacity: 0.8, lineHeight: 1.6 }}>
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ
