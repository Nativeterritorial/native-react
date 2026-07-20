import Reveal from '../Reveal'
import Icon from '../icons'

// Dados separados do JSX — boa prática para listas repetitivas
const cards = [
  {
    icon: 'wheat',
    title: 'Proprietário rural',
    desc: 'Evita prejuízo por área errada, acelera regularização e melhora a segurança documental.',
  },
  {
    icon: 'building',
    title: 'Empresa / Investidor',
    desc: 'Compra, venda e implantação com documentação clara e menor risco técnico.',
  },
  {
    icon: 'scale',
    title: 'Advogados e Cartórios',
    desc: 'Laudos, memoriais e documentação técnica com TRT para processos e registros imobiliários.',
  },
]

function ResolveSection() {
  return (
    <section className="resolve-section" aria-labelledby="resolve-title">
      <div className="folio" aria-hidden="true">FL. 01 · ESCOPO</div>
      <div className="container">
        <div className="section-label">O que você resolve com a NATIVE</div>
        <Reveal as="h2" className="section-title" id="resolve-title">
          Limites, mapas, documentação <br />e leitura técnica do território
        </Reveal>

        <div className="resolve-grid">
          {/* .map() transforma o array em elementos JSX — equivalente a um loop */}
          {cards.map((card) => (
            <div className="resolve-card" key={card.title}>
              <div className="resolve-icon"><Icon name={card.icon} /></div>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ResolveSection
