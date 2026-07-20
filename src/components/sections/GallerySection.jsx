const images = [
  { src: '/images/galeria-aerea-loteamento.jpg', alt: 'Vista aérea de loteamento em execução na Serra Gaúcha', main: true },
  { src: '/images/galeria-gnss-vale.jpg', alt: 'Receptor GNSS RTK em levantamento no vale' },
  { src: '/images/galeria-levantamento-campo.jpg', alt: 'Levantamento em campo com tripé e receptor GNSS' },
  { src: '/images/galeria-ambiental-araucaria.jpg', alt: 'Vistoria ambiental junto a araucária' },
  { src: '/images/galeria-marco-vertice.jpg', alt: 'Marco de vértice credenciado implantado em campo' },
]

function GallerySection() {
  return (
    <section className="gallery-section" aria-label="Trabalhos em campo">
      <div className="container">
        <div className="section-label">Trabalhos em campo</div>
        <h2 className="section-title" style={{ marginBottom: '32px' }}>
          Do campo à entrega — veja nosso trabalho
        </h2>

        <div className="gallery-grid">
          {images.map((img) => (
            <img
              key={img.src}
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className={img.main ? 'g-main' : ''}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default GallerySection
