const stats = [
  { number: '+1.000', label: 'hectares georreferenciados' },
  { number: '13', label: 'cidades atendidas na Serra Gaúcha' },
  { number: 'SIGEF', label: 'certificação oficial INCRA' },
  { number: 'ART', label: 'em todos os serviços' },
]

function TestimonialsSection() {
  return (
    <section className="testimonials-section" aria-labelledby="credibility-title">
      <div className="container">
        <div className="section-header">
          <div className="section-label">Credibilidade técnica</div>
          <h2 className="section-title" id="credibility-title">
            Números que falam mais alto do que promessa
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '24px',
            marginTop: '48px',
          }}
        >
          {stats.map((s) => (
            <div
              key={s.label}
              style={{
                textAlign: 'center',
                padding: '32px 20px',
                background: 'rgba(255,255,255,0.04)',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <div
                style={{
                  fontSize: '42px',
                  fontWeight: 600,
                  fontFamily: 'DM Serif Display, serif',
                  color: '#fff',
                  lineHeight: 1.1,
                  marginBottom: '12px',
                }}
              >
                {s.number}
              </div>
              <div
                style={{
                  fontSize: '14px',
                  color: 'rgba(255,255,255,0.75)',
                  lineHeight: 1.5,
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
