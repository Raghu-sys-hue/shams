import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause, Flower2, Volume2, VolumeX } from 'lucide-react';

const carouselItems = [
  {
    id: 1,
    title: 'JOY',
    subtitle: 'The Radiant Heart',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    description: 'Joy arrives unannounced, a sunbeam through storm clouds. It lives in shared laughter, in the warmth of a child\'s hand in yours, in the sudden recognition of beauty in ordinary moments.',
  },
  {
    id: 2,
    title: 'CONNECTION',
    subtitle: 'Threads Unseen',
    image: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?w=800&q=80',
    description: 'Invisible threads bind heart to heart across distance and time. A glance, a touch, a shared silence—these are the sacred architecture of belonging, reminding us we are never truly alone.',
  },
  {
    id: 3,
    title: 'STILLNESS',
    subtitle: 'The Quiet Within',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80',
    description: 'Beneath the noise of becoming lies the sanctuary of being. In stillness, we remember our wholeness. The lake reflects the mountain only when its surface rests undisturbed.',
  },
  {
    id: 4,
    title: 'GRIEF',
    subtitle: 'Love\'s Shadow',
    image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=800&q=80',
    description: 'Grief is love with nowhere to go. It carves chambers in the heart so compassion has room to dwell. To grieve deeply is to have loved fully—there is no other path.',
  },
  {
    id: 5,
    title: 'WONDER',
    subtitle: 'Eyes Wide Open',
    image: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&q=80',
    description: 'The world burns with wonder for those who pause to see. A dewdrop holds galaxies. A stranger\'s smile contains universes. Wonder is the antidote to the sleepwalking of familiarity.',
  },
];

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const carouselRef = useRef(null);
  const progressRef = useRef(null);
  const animationRef = useRef(null);

  const scrollLeft = useCallback((direction) => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.querySelector('.carousel-card')?.offsetWidth || 340;
      const gap = 24;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -(cardWidth + gap) : cardWidth + gap,
        behavior: 'smooth',
      });
    }
  }, []);

  const goToSlide = useCallback((index) => {
    setCurrentIndex(index);
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.querySelector('.carousel-card')?.offsetWidth || 340;
      const gap = 24;
      carouselRef.current.scrollTo({
        left: index * (cardWidth + gap),
        behavior: 'smooth',
      });
    }
  }, []);

  useEffect(() => {
    if (isPlaying) {
      animationRef.current = requestAnimationFrame(function animate() {
        setProgress((prev) => {
          const next = prev + 0.008;
          if (next >= 1) {
            setCurrentIndex((prevIdx) => (prevIdx + 1) % carouselItems.length);
            return 0;
          }
          return next;
        });
        animationRef.current = requestAnimationFrame(animate);
      });
    }
    return () => cancelAnimationFrame(animationRef.current);
  }, [isPlaying]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') scrollLeft('left');
      if (e.key === 'ArrowRight') scrollLeft('right');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [scrollLeft]);

  return (
    <section id="hero" className="hero-section" aria-labelledby="hero-heading">
      <div className="hero-top-bar">
        <span className="hero-label" style={{ fontWeight: '700', letterSpacing: '0.2em' }}>THEME</span>
        <span className="hero-counter" style={{ fontWeight: '700', fontFamily: 'var(--font-mono)' }}>04/12</span>
      </div>

      <motion.div
        className="carousel-container"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
      >
        <div className="carousel-wrapper">
          <button
            className="carousel-btn carousel-btn-left"
            onClick={() => scrollLeft('left')}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            aria-label="Previous theme"
            disabled={currentIndex === 0}
            style={{ opacity: currentIndex === 0 ? 0.3 : 1 }}
          >
            <ChevronLeft className="w-8 h-8" aria-hidden="true" />
          </button>

          <div
            ref={carouselRef}
            className="carousel-track"
            onScroll={() => {
              if (carouselRef.current) {
                const cardWidth = carouselRef.current.querySelector('.carousel-card')?.offsetWidth || 340;
                const gap = 24;
                const index = Math.round(carouselRef.current.scrollLeft / (cardWidth + gap));
                setCurrentIndex(Math.max(0, Math.min(index, carouselItems.length - 1)));
              }
            }}
          >
            {carouselItems.map((item, index) => (
              <motion.article
                key={item.id}
                className="carousel-card card card-glow"
                style={{ minWidth: '340px', flex: '0 0 340px' }}
                whileHover={{ y: -12, scale: 1.02 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <div className="carousel-card-image">
                  <img
                    src={item.image}
                    alt=""
                    loading={index === 0 ? 'eager' : 'lazy'}
                    className="cover"
                  />
                  <div className="card-overlay">
                    <span className="card-subtitle" style={{ fontWeight: '600', letterSpacing: '0.1em' }}>
                      {item.subtitle}
                    </span>
                  </div>
                </div>
                <div className="carousel-card-content">
                  <h3 className="carousel-card-title" style={{ fontWeight: '700', letterSpacing: '0.05em' }}>
                    {item.title}
                  </h3>
                  <p className="carousel-card-desc" style={{ fontWeight: '500', lineHeight: 1.7 }}>
                    {item.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>

          <button
            className="carousel-btn carousel-btn-right"
            onClick={() => scrollLeft('right')}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            aria-label="Next theme"
            disabled={currentIndex === carouselItems.length - 1}
            style={{ opacity: currentIndex === carouselItems.length - 1 ? 0.3 : 1 }}
          >
            <ChevronRight className="w-8 h-8" aria-hidden="true" />
          </button>
        </div>

        <motion.div
          className="carousel-indicators"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {carouselItems.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to ${carouselItems[index].title}`}
              aria-current={index === currentIndex ? 'true' : 'false'}
            >
              <span className="indicator-dot" />
            </button>
          ))}
        </motion.div>
      </motion.div>

      <motion.aside
        className="floating-player"
        initial={{ opacity: 0, x: 40, y: 40 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.8, delay: 1, ease: 'easeOut' }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="floating-player-inner card card-glow">
          <div className="player-content">
            <div className="player-icon">
              <Flower2 className="w-6 h-6" aria-hidden="true" />
            </div>
            <div className="player-info">
              <span className="player-label" style={{ fontWeight: '600', letterSpacing: '0.1em', fontSize: '0.7rem' }}>
                NOW PLAYING
              </span>
              <span className="player-title" style={{ fontWeight: '700' }}>Ethereal Echoes</span>
            </div>
            <motion.button
              className="player-play-btn"
              onClick={() => setIsPlaying(!isPlaying)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={isPlaying ? 'Pause' : 'Play'}
              aria-pressed={isPlaying}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </motion.button>
          </div>
          <motion.div
            className="player-progress"
            style={{
              width: `${progress * 100}%`,
              background: 'linear-gradient(90deg, var(--accent), var(--rose))',
            }}
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.1, ease: 'linear' }}
          />
        </div>
      </motion.aside>
    </section>
  );
}