import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { CustomCursor } from './components/CustomCursor';
import { ParticleCanvas } from './components/ParticleCanvas';
import { FloatingParticles } from './components/FloatingParticles';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { ExecomPage } from './components/ExecomPage';
import { GalleryPage } from './components/GalleryPage';
import { EventsPage } from './components/EventsPage';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname, hash]);

  return null;
}

function App() {
  return (
    <>
      <Navbar />
      <CustomCursor />
      <ParticleCanvas />
      <FloatingParticles />
      <ScrollToTop />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/execom" element={<ExecomPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
