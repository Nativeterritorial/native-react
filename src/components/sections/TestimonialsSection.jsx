import Reveal from '../Reveal'
import CountUp from '../CountUp'

const stats = [
  { number: '+1.000', label: 'hectares georreferenciados' },
  { number: '13', label: 'cidades atendidas na Serra Gaúcha' },
  { number: 'SIGEF', label: 'certificação oficial INCRA' },
  { number: 'ART', label: 'em todos os serviços' },
]

function TestimonialsSection() {
  return (
    <section className="testimonials-section" aria-labelledby="credibility-title">
      <div className="folio" aria-hidden="true">FL. 07 · NÚMEROS</div>
      <div className="container">
        <div className="section-header">
          <div className="section-label">Credibilidade técnica</div>
          <Reveal as="h2" className="section-title" id="credibility-title">
            Números que falam mais alto <em>do que promessa</em>
          </Reveal>
        </div>

        <div className="stats-grid">
          {stats.map((s) => (
            <div className="stat-block" key={s.label}>
              <CountUp className="stat-block-num" value={s.number} />
              <div className="stat-block-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
