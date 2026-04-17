const testimonials = [
  {
    initials: 'JM',
    name: 'João M.',
    role: 'Proprietário rural — Veranópolis/RS · Georreferenciamento',
    text: 'Precisava regularizar uma propriedade rural há anos parada no INCRA. A NATIVE resolveu tudo — georreferenciamento, SIGEF e matrícula — com clareza e prazo cumprido. Recomendo sem hesitar.',
  },
  {
    initials: 'AR',
    name: 'Ana R.',
    role: 'Investidora — Serra Gaúcha/RS · Levantamento Topográfico',
    text: 'Contratei para levantamento topográfico de um terreno antes da compra. O laudo foi detalhado, entregue dentro do prazo e com toda a documentação em ordem. Profissional e eficiente.',
  },
  {
    initials: 'CS',
    name: 'Camila S.',
    role: 'Advogada — Caxias do Sul/RS · Laudo Técnico',
    text: 'Como advogada, preciso de laudos técnicos confiáveis para processos de inventário e divisão de área. A NATIVE entrega documentação impecável, com TRT e memorial descritivo completo.',
  },
]

function TestimonialsSection() {
  return (
    <section className="testimonials-section" aria-labelledby="testimonials-title">
      <div className="container">
        <div className="section-header">
          <div className="section-label">O que dizem nossos clientes</div>
          <h2 className="section-title" id="testimonials-title">
            Resultados reais de quem já contratou
          </h2>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((t) => (
            <div className="testimonial-card" key={t.name}>
              <div className="stars">★★★★★</div>
              <p className="testimonial-text">"{t.text}"</p>
              <div className="testimonial-author">
                <div className="author-avatar">{t.initials}</div>
                <div className="author-info">
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
