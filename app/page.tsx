import Hero from './components/Hero';
import FeaturedProducts from './components/FeaturedProducts';
import ImageGallerySection from './components/ImageGallerySection';
import Testimonials from './components/Testimonials';

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedProducts />
      <ImageGallerySection />
      <Testimonials />
    </main>
  );
} 