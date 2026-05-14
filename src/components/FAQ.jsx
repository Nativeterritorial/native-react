function FAQ({ items, title = 'Perguntas frequentes', label = 'FAQ' }) {
  if (!items || items.length === 0) return null

  return (
    <section className="lp-section faq-section" aria-labelledby="faq-title">
      <div className="container">
        <div className="section-label">{label}</div>
        <h2 className="section-title" id="faq-title">{title}</h2>
        <div className="faq-list">
          {items.map((item, i) => (
            <details className="faq-item" key={i}>
              <summary className="faq-question">
                <span>{item.q}</span>
                <span className="faq-chevron" aria-hidden="true">+</span>
              </summary>
              <div className="faq-answer">
                <div className="faq-answer-inner">
                  {typeof item.a === 'string' ? <p>{item.a}</p> : item.a}
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ
