import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useAnimation } from 'framer-motion';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Philosophy } from './components/Philosophy';
import { Explore } from './components/Explore';
import { ThemeStudy } from './components/ThemeStudy';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/ToastContainer';
import { Loader } from './components/Loader';
import { ScrollProgress } from './components/ScrollProgress';
import { useToast } from './hooks/useToast';
import { useScrollProgress } from './hooks/useScrollProgress';

export function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { toasts } = useToast();
  const scrollProgress = useScrollProgress();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Loader isLoaded={isLoaded} />
      <ScrollProgress progress={scrollProgress} />
      <div className="hero-bg" aria-hidden="true">
        <div className="grid-pattern" aria-hidden="true"></div>
      </div>
      <div className="noise-overlay" aria-hidden="true"></div>
      <a href="#main" className="skip-link">Skip to main content</a>
      <Header />
      <main id="main" style={{ opacity: isLoaded ? 1 : 0 }} className="flex-1">
        <Hero />
        <Philosophy />
        <Explore />
        <ThemeStudy />
        <Footer />
      </main>
      <ToastContainer />
    </>
  );
}

export default App;