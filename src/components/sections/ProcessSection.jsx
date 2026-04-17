const steps = [
  {
    num: '1',
    title: 'Diagnóstico',
    desc: 'Entendemos seu objetivo, localização do imóvel e documentação disponível.',
  },
  {
    num: '2',
    title: 'Campo',
    desc: 'Execução técnica no local com equipamentos de precisão (GNSS, estação total).',
  },
  {
    num: '3',
    title: 'Processamento',
    desc: 'Mapas, plantas, memoriais descritivos, relatórios e organização completa dos dados.',
  },
  {
    num: '4',
    title: 'Entrega',
    desc: 'Tudo organizado com TRT, orientação clara e indicação do próximo passo.',
  },
]

function ProcessSection() {
  return (
    <section id="como-funciona" className="process-section" aria-labelledby="process-title">
      <div className="container">
        <div className="section-header">
          <div className="section-label">Processo</div>
          <h2 className="section-title" id="process-title">Como funciona</h2>
          <p className="section-sub">Do primeiro contato à entrega final, um processo claro e organizado.</p>
        </div>

        <div className="process-steps">
          {steps.map((step) => (
            <div className="process-step" key={step.num}>
              <div className="step-num">{step.num}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProcessSection
