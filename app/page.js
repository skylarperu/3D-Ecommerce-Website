'use client';

import Navbar from '../components/Navbar';
import HeroMinimal from '../components/HeroMinimal';
import FeaturesSection from '../components/FeaturesSection';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main className="w-full overflow-hidden bg-black">
      <Navbar />
      <HeroMinimal />
      <FeaturesSection />
      <Footer />
    </main>
  );
}
