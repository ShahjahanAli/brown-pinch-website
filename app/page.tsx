import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedProducts from './components/FeaturedProducts';
import Testimonials from './components/Testimonials';
import ProgressBar from './components/ProgressBar';

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedProducts />
      <Testimonials />
    </main>
  );
} 