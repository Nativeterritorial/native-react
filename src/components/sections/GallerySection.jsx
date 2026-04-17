const images = [
  { src: 'https://nativeterritorial.com.br/aerial.jpg',    alt: 'Vista aérea Serra Gaúcha',         main: true },
  { src: 'https://nativeterritorial.com.br/campo-1.jpg',   alt: 'GNSS em campo' },
  { src: 'https://nativeterritorial.com.br/campo-2.jpg',   alt: 'Equipe em levantamento' },
  { src: 'https://nativeterritorial.com.br/campo-3.jpg',   alt: 'Anotações técnicas em campo' },
  { src: 'https://nativeterritorial.com.br/ambiental-1.jpg', alt: 'Vistoria ambiental' },
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
