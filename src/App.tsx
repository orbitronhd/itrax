import { useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { CustomCursor } from './components/CustomCursor';
import { ParticleCanvas } from './components/ParticleCanvas';
import { FloatingParticles } from './components/FloatingParticles';
import { Footer } from './components/Footer';
const HomePage = lazy(() => import('./components/HomePage').then(module => ({ default: module.HomePage })));
const ExecomPage = lazy(() => import('./components/ExecomPage').then(module => ({ default: module.ExecomPage })));
const GalleryPage = lazy(() => import('./components/GalleryPage').then(module => ({ default: module.GalleryPage })));
const EventsPage = lazy(() => import('./components/EventsPage').then(module => ({ default: module.EventsPage })));

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

function PageTitleManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    switch (pathname) {
      case '/':
        document.title = 'Welcome to iTrax';
        break;
      case '/execom':
        document.title = 'Execom - iTrax';
        break;
      case '/events':
        document.title = 'Events - iTrax';
        break;
      case '/gallery':
        document.title = 'Gallery - iTrax';
        break;
      default:
        document.title = 'iTrax';
    }
  }, [pathname]);

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
      <PageTitleManager />
      
      <Suspense fallback={<div />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/execom" element={<ExecomPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
        </Routes>
      </Suspense>

      <Footer />
    </>
  );
}

export default App;
