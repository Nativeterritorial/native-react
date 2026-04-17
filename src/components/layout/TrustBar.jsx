// Barra de trust badges — recebe um array de { strong, span }
function TrustBar({ items }) {
  return (
    <div className="trust-bar">
      <div className="container">
        <div className="trust-inner">
          {items.map((item) => (
            <div className="trust-item" key={item.strong}>
              <strong>{item.strong}</strong>
              <span>{item.span}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TrustBar
