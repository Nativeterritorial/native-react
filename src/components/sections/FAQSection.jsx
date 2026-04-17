import { useState } from 'react'

// Cada item do FAQ tem pergunta e resposta.
// A resposta pode ser uma string simples ou JSX para formatação rica.
const faqs = [
  {
    question: 'Quanto custa um serviço de topografia ou georreferenciamento?',
    answer: (
      <>
        <p>
          O valor depende da área, acesso, tipo de imóvel, documentação disponível, urgência
          e tipo de entrega. A proposta é feita sob medida após entendermos sua demanda.
        </p>
        <p style={{ marginTop: '12px' }}>
          <strong>Referência de valores:</strong><br />
          Levantamento topográfico urbano (lote padrão): a partir de R$ 800<br />
          Georreferenciamento rural (pequenas propriedades até 5 ha): a partir de R$ 2.500<br />
          Áreas maiores ou com complexidade: orçamento sob consulta
        </p>
        <p style={{ marginTop: '12px' }}>
          <a href="https://typebot.co/my-typebot-ort5blj">
            💬 Solicitar orçamento personalizado
          </a>
        </p>
      </>
    ),
  },
  {
    question: 'Em quanto tempo fica pronto?',
    answer: (
      <p>
        Varia conforme a demanda, agenda de campo e necessidade de processamento. A proposta
        já sai com prazo estimado. Georreferenciamentos simples costumam ser entregues em
        15 a 30 dias após a execução de campo.
      </p>
    ),
  },
  {
    question: 'Vocês atendem rural e urbano?',
    answer: (
      <p>
        Sim. Atendemos áreas rurais, urbanas, loteamentos, conferência de lotes, levantamento
        topográfico e georreferenciamento. A proposta é adaptada conforme o tipo de imóvel
        e a necessidade.
      </p>
    ),
  },
  {
    question: 'Vocês atendem só Veranópolis?',
    answer: (
      <p>
        Não. Nossa base é em Veranópolis, mas atendemos também Vila Flores, Nova Bassano,
        Cotiporã, Fagundes Varela, Nova Prata e outras cidades da Serra Gaúcha, além de
        demandas em RS, SC, PR e SP.
      </p>
    ),
  },
  {
    question: 'O que é georreferenciamento e quando é obrigatório?',
    answer: (
      <p>
        Georreferenciamento é o processo de determinar os limites de um imóvel rural com
        coordenadas geográficas precisas, conforme exigências do INCRA. É obrigatório para
        qualquer transação (venda, inventário, divisão, desmembramento) de imóveis rurais,
        independente do tamanho. Sem ele, o cartório não registra.
      </p>
    ),
  },
]

function FAQSection() {
  // openIndex guarda qual item está aberto (null = nenhum)
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (index) => {
    // Se clicou no que já está aberto, fecha. Senão, abre o clicado.
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="faq-section" aria-labelledby="faq-title">
      <div className="container">
        <div className="section-header">
          <div className="section-label">Dúvidas frequentes</div>
          <h2 className="section-title" id="faq-title">
            Perguntas sobre topografia e georreferenciamento
          </h2>
        </div>

        <div className="faq-list">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index

            return (
              <div className={`faq-item ${isOpen ? 'open' : ''}`} key={index}>
                <button
                  className="faq-question"
                  aria-expanded={isOpen}
                  onClick={() => toggle(index)}
                >
                  {faq.question}
                  <span className="faq-chevron">+</span>
                </button>
                <div className="faq-answer" role="region">
                  <div className="faq-answer-inner">
                    {faq.answer}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FAQSection
