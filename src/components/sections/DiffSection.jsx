const diffs = [
  {
    icon: '🎯',
    title: 'Precisão nos dados',
    desc: 'Equipamentos GNSS e processamento rigoroso em campo e escritório.',
  },
  {
    icon: '🛡️',
    title: 'Responsabilidade técnica',
    desc: 'TRT assinado e respaldo legal completo em todos os serviços.',
  },
  {
    icon: '💬',
    title: 'Comunicação direta',
    desc: 'Você fala direto com quem executa o serviço, sem intermediários.',
  },
  {
    icon: '📍',
    title: 'Base na região',
    desc: 'Conhecemos a Serra Gaúcha, os cartórios e os órgãos locais.',
  },
]

function DiffSection() {
  return (
    <section className="diff-section" aria-labelledby="diff-title">
      <div className="container">
        <div className="section-header">
          <div className="section-label">Diferenciais</div>
          <h2 className="section-title" id="diff-title">Por que contratar a NATIVE?</h2>
          <p className="section-sub">
            Um serviço bem executado reduz risco, evita divergência de área e dá mais segurança
            para compra, venda, regularização e obras.
          </p>
        </div>

        <div className="diff-grid">
          {diffs.map((diff) => (
            <div className="diff-card" key={diff.title}>
              <div className="diff-icon">{diff.icon}</div>
              <h4>{diff.title}</h4>
              <p>{diff.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default DiffSection
