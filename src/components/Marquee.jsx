/**
 * Marquee — faixa horizontal infinita estilo régua topográfica.
 * Duplica o conteúdo 2x e anima -50% pra loop sem emenda.
 */
const CIDADES = [
  'Veranópolis', 'Nova Prata', 'Cotiporã', 'Fagundes Varela',
  'Vila Flores', 'Nova Bassano', 'Antônio Prado', 'Ipê',
  'Guabiju', 'São Jorge', 'Nova Roma do Sul', 'Protásio Alves',
  'Vista Alegre do Prata',
]

function Track() {
  return (
    <div className="marquee-track" aria-hidden="true">
      <span className="marquee-coord">28°56′S · 51°33′W</span>
      {CIDADES.map((c) => (
        <span className="marquee-item" key={c}>
          <span className="marquee-plus">+</span>
          {c}
        </span>
      ))}
      <span className="marquee-coord">SERRA GAÚCHA · RS</span>
    </div>
  )
}

function Marquee() {
  return (
    <section className="marquee" aria-label="Cidades atendidas pela NATIVE">
      <div className="marquee-inner">
        <Track />
        <Track />
      </div>
    </section>
  )
}

export default Marquee
