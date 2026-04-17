// A página Home importa e organiza todos os componentes em ordem.
// Cada seção vive no seu próprio arquivo — fácil de editar individualmente.

import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import CookieBanner from '../components/layout/CookieBanner'
import Hero from '../components/sections/Hero'
import ResolveSection from '../components/sections/ResolveSection'
import AboutSection from '../components/sections/AboutSection'
import ServicesSection from '../components/sections/ServicesSection'
import ProcessSection from '../components/sections/ProcessSection'
import AreaSection from '../components/sections/AreaSection'
import LocationSection from '../components/sections/LocationSection'
import GallerySection from '../components/sections/GallerySection'
import DiffSection from '../components/sections/DiffSection'
import TestimonialsSection from '../components/sections/TestimonialsSection'
import FAQSection from '../components/sections/FAQSection'
import CTASection from '../components/sections/CTASection'

function Home() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <ResolveSection />
        <AboutSection />
        <ServicesSection />
        <ProcessSection />
        <AreaSection />
        <LocationSection />
        <GallerySection />
        <DiffSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>

      <Footer />
      <CookieBanner />
    </>
  )
}

export default Home
