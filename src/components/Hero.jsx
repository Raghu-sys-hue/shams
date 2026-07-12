import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause, Flower2, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';

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

// Audio configuration - replace with actual audio file URL
const AUDIO_SRC = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'; // Placeholder - replace with your audio

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(2); // Start at middle
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const carouselRef = useRef(null);
  const audioRef = useRef(null);
  const progressRef = useRef(null);
  const animationRef = useRef(null);
  const scrollContainerRef = useRef(null);

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

  // Handle scroll to update current index
  const handleScroll = useCallback(() => {
    if (!carouselRef.current) return;
    const cardWidth = carouselRef.current.querySelector('.carousel-card')?.offsetWidth || 340;
    const gap = 24;
    const index = Math.round(carouselRef.current.scrollLeft / (cardWidth + gap));
    setCurrentIndex(Math.max(0, Math.min(index, carouselItems.length - 1)));
  }, []);

  // Audio controls
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      setProgress(audio.duration ? audio.currentTime / audio.duration : 0);
    };
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.volume = isMuted ? 0 : volume;

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [isMuted, volume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [isMuted, volume]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressClick = (e) => {
    if (!progressRef.current || !audioRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = percent * audioRef.current.duration;
  };

  const handleSeek = (e) => {
    if (!audioRef.current) return;
    const percent = parseFloat(e.target.value);
    audioRef.current.currentTime = percent * audioRef.current.duration;
  };

  const formatTime = (sec) => {
    if (isNaN(sec)) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const toggleMute = () => setIsMuted(!isMuted);
  const handleVolumeChange = (e) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    setIsMuted(vol === 0);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') scrollLeft('left');
      if (e.key === 'ArrowRight') scrollLeft('right');
      if (e.key === ' ') {
        e.preventDefault();
        togglePlay();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [scrollLeft, togglePlay]);

  return (
    <section id="hero" className="hero-section" aria-labelledby="hero-heading">
      <audio
        ref={audioRef}
        src={AUDIO_SRC}
        preload="metadata"
        crossOrigin="anonymous"
      />

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
            aria-label="Previous theme"
            disabled={currentIndex === 0}
            style={{ opacity: currentIndex === 0 ? 0.3 : 1 }}
          >
            <ChevronLeft className="w-8 h-8" aria-hidden="true" />
          </button>

          <div
            ref={carouselRef}
            className="carousel-track"
            onScroll={handleScroll}
          >
            {carouselItems.map((item, index) => {
              const isActive = index === currentIndex;
              const isAdjacent = Math.abs(index - currentIndex) === 1;
              const scale = isActive ? 1.15 : isAdjacent ? 0.9 : 0.75;
              const zIndex = isActive ? 10 : isAdjacent ? 5 : 1;
              const opacity = isActive ? 1 : isAdjacent ? 0.85 : 0.6;
              const translateY = isActive ? 0 : isAdjacent ? 20 : 40;
              const filter = isActive ? 'none' : 'blur(2px) grayscale(0.3)';
              
              return (
                <motion.article
                  key={item.id}
                  className="carousel-card card card-glow"
                  style={{
                    minWidth: '340px',
                    flex: '0 0 340px',
                    transform: `scale(${scale}) translateY(${translateY}px)`,
                    zIndex,
                    opacity,
                    filter,
                    transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.5s, filter 0.5s, z-index 0s',
                  }}
                  whileHover={{ 
                    scale: isActive ? 1.18 : isAdjacent ? 0.93 : 0.78,
                    y: -12,
                    filter: 'none',
                    opacity: 1,
                    zIndex: 20,
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  onClick={() => goToSlide(index)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="carousel-card-image">
                    <img
                      src={item.image}
                      alt=""
                      loading={index === currentIndex ? 'eager' : 'lazy'}
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
              );
            })}
          </div>

          <button
            className="carousel-btn carousel-btn-right"
            onClick={() => scrollLeft('right')}
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

      {/* Global Audio Player at Bottom */}
      <motion.div
        className="global-audio-player card card-glow"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <div className="player-thumbnail">
          <div className="waveform-container">
            <Waveform bars={64} color="white" isPlaying={isPlaying} />
          </div>
        </div>

        <div className="player-info">
          <h3 className="player-track-title" style={{ fontWeight: '700' }}>
            Ethereal Echoes
          </h3>
          <span className="player-track-format" style={{ fontWeight: '600', fontFamily: 'var(--font-mono)' }}>
            AUDIO ESSAY
          </span>
          <div className="player-progress-wrapper" ref={progressRef} onClick={handleProgressClick} role="slider" aria-label="Playback progress" tabIndex={0} onKeyDown={(e) => {
            if (e.key === 'ArrowRight' && audioRef.current) {
              e.preventDefault();
              audioRef.current.currentTime = Math.min(audioRef.current.duration, audioRef.current.currentTime + 5);
            }
            if (e.key === 'ArrowLeft' && audioRef.current) {
              e.preventDefault();
              audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 5);
            }
          }}>
            <motion.div
              className="player-progress-bar"
              style={{ width: `${progress * 100}%`, background: 'linear-gradient(90deg, var(--accent), var(--rose))' }}
              animate={{ width: `${progress * 100}%` }}
              transition={{ duration: 0.1, ease: 'linear' }}
            />
          </div>
          <div className="player-time" style={{ fontWeight: '600', fontFamily: 'var(--font-mono)' }}>
            {formatTime(currentTime)} / {formatTime(duration || 0)}
          </div>
        </div>

        <div className="player-controls">
          <div className="player-volume">
            <button className="icon-btn" onClick={toggleMute} aria-label={isMuted ? 'Unmute' : 'Mute'} whileTap={{ scale: 0.9 }}>
              {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="volume-slider"
              aria-label="Volume"
            />
          </div>

          <div className="player-main-controls">
            <button className="icon-btn" onClick={() => { if (audioRef.current) audioRef.current.currentTime = 0; }} aria-label="Restart" whileTap={{ scale: 0.9 }}>
              <SkipBack className="w-5 h-5" />
            </button>
            <motion.button
              className="main-play-btn"
              onClick={togglePlay}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={isPlaying ? 'Pause' : 'Play'}
              aria-pressed={isPlaying}
            >
              {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
            </motion.button>
            <button className="icon-btn" onClick={() => { if (audioRef.current) audioRef.current.currentTime = audioRef.current.duration; }} aria-label="Skip to end" whileTap={{ scale: 0.9 }}>
              <SkipForward className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function Waveform({ bars = 64, color = 'currentColor', isPlaying }) {
  const [heights, setHeights] = useState(() => Array.from({ length: bars }, () => Math.random() * 0.3 + 0.1));

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setHeights((prev) =>
        prev.map((h) => Math.max(0.1, Math.min(1, h + (Math.random() - 0.5) * 0.4)))
      );
    }, 120);
    return () => clearInterval(interval);
  }, [isPlaying, bars]);

  return (
    <svg className="waveform-svg" viewBox={`0 0 ${bars * 4} 100`} preserveAspectRatio="none" aria-hidden="true">
      {heights.map((height, i) => (
        <motion.rect
          key={i}
          x={i * 4 + 1}
          y={50 - height * 40}
          width={2}
          height={height * 80}
          fill={color}
          rx={1}
          animate={{ y: 50 - height * 40, height: height * 80 }}
          transition={{ duration: 0.12, ease: 'easeOut' }}
        />
      ))}
    </svg>
  );
}