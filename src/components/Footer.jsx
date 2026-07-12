import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Heart,
  Users,
  Mountain,
  TreePine,
  Globe2,
  Share2,
} from 'lucide-react';

const episodes = [
  {
    id: 1,
    title: 'Episode 1: Sympathy as a Soundscape',
    subtitle: '42 min · Exploration',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80',
  },
  {
    id: 2,
    title: 'Episode 2: Rhythm of Community',
    subtitle: '38 min · Practice',
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&q=80',
  },
  {
    id: 3,
    title: 'Episode 3: Natural Resonances',
    subtitle: '45 min · Journey',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&q=80',
  },
];

const playerTracks = [
  { id: 1, title: 'Reflection (Track 2)', artist: 'MP3', duration: 180, color: 'from-purple-500 to-pink-500' },
  { id: 2, title: 'Morning Dew', artist: 'WAV', duration: 240, color: 'from-blue-500 to-cyan-500' },
  { id: 3, title: 'Heartbeat Symphony', artist: 'FLAC', duration: 300, color: 'from-rose-500 to-red-500' },
];

export function Footer() {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const progressRef = useRef(null);
  const animationRef = useRef(null);
  const waveformRef = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      animationRef.current = requestAnimationFrame(updateProgress);
    } else {
      cancelAnimationFrame(animationRef.current);
    }
    return () => cancelAnimationFrame(animationRef.current);
  }, [isPlaying]);

  const updateProgress = () => {
    const track = playerTracks[currentTrack];
    const increment = (1 / track.duration) * 100 / 60;
    setProgress((prev) => {
      const next = prev + increment;
      if (next >= 100) {
        setIsPlaying(false);
        return 0;
      }
      return next;
    });
    animationRef.current = requestAnimationFrame(updateProgress);
  };

  const handleProgressClick = (e) => {
    if (!progressRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    setProgress(Math.max(0, Math.min(100, percent * 100)));
  };

  const handleSeek = (e) => {
    setProgress(Math.max(0, Math.min(100, parseFloat(e.target.value))));
  };

  const togglePlay = () => setIsPlaying(!isPlaying);
  const nextTrack = () => setCurrentTrack((prev) => (prev + 1) % playerTracks.length);
  const prevTrack = () => setCurrentTrack((prev) => (prev - 1 + playerTracks.length) % playerTracks.length);
  const toggleMute = () => setIsMuted(!isMuted);
  const handleVolumeChange = (e) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    setIsMuted(vol === 0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <footer id="listen" className="footer-section" role="contentinfo">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label" style={{ fontWeight: '700' }}>LISTEN</span>
          <h2 className="section-title gradient-text" style={{ fontWeight: '800' }}>
            THE SOUNDS OF RESONANCE
          </h2>
          <p className="section-description" style={{ fontWeight: '500' }}>
            Curated audio journeys for the heart. Each episode an invitation to feel more deeply.
          </p>
        </motion.div>

        <div className="episodes-grid" role="list" aria-label="Audio episodes">
          {episodes.map((episode, index) => (
            <motion.article
              key={episode.id}
              className="episode-card card card-glow"
              role="listitem"
              whileHover={{ y: -8 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="episode-image-wrapper">
                <img src={episode.image} alt="" className="episode-image cover" loading="lazy" />
                <motion.button
                  className="episode-play-overlay"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`Play ${episode.title}`}
                >
                  <Play className="w-8 h-8" aria-hidden="true" />
                </motion.button>
              </div>
              <div className="episode-content">
                <div className="episode-icon">
                  {index === 0 && <Heart className="w-5 h-5" aria-hidden="true" />}
                  {index === 1 && <Users className="w-5 h-5" aria-hidden="true" />}
                  {index === 2 && <TreePine className="w-5 h-5" aria-hidden="true" />}
                </div>
                <h3 className="episode-title" style={{ fontWeight: '700' }}>{episode.title}</h3>
                <p className="episode-meta" style={{ fontWeight: '500', fontSize: '0.85rem' }}>{episode.subtitle}</p>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          id="global-player"
          className="global-player card card-glow"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="player-thumbnail">
            <div className="waveform-container" ref={waveformRef}>
              <Waveform bars={64} color="white" />
            </div>
          </div>

          <div className="player-info">
            <h3 className="player-track-title" style={{ fontWeight: '700' }}>
              {playerTracks[currentTrack].title}
            </h3>
            <span className="player-track-format" style={{ fontWeight: '600', fontFamily: 'var(--font-mono)' }}>
              {playerTracks[currentTrack].artist}
            </span>
            <div className="player-progress-wrapper" ref={progressRef} onClick={handleProgressClick} role="slider" aria-label="Playback progress" tabIndex={0} onKeyDown={(e) => {
              if (e.key === 'ArrowRight') setProgress(Math.min(100, progress + 5));
              if (e.key === 'ArrowLeft') setProgress(Math.max(0, progress - 5));
            }}>
              <motion.div
                className="player-progress-bar"
                style={{ width: `${progress}%`, background: 'linear-gradient(90deg, var(--accent), var(--rose))' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: 'linear' }}
              />
            </div>
            <div className="player-time" style={{ fontWeight: '600', fontFamily: 'var(--font-mono)' }}>
              {formatTime(progress / 100 * playerTracks[currentTrack].duration)}
              <span> / </span>
              {formatTime(playerTracks[currentTrack].duration)}
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
              <button className="icon-btn" onClick={prevTrack} aria-label="Previous track" whileTap={{ scale: 0.9 }}>
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
              <button className="icon-btn" onClick={nextTrack} aria-label="Next track" whileTap={{ scale: 0.9 }}>
                <SkipForward className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="footer-bottom"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p style={{ fontWeight: '700', letterSpacing: '0.1em', fontSize: '0.7rem' }}>
            EMOTIONAL RESONANCE — ALL RIGHTS RESERVED.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}

function Waveform({ bars = 32, color = 'currentColor' }) {
  const [heights, setHeights] = useState(() => Array.from({ length: bars }, () => Math.random() * 0.3 + 0.1));

  useEffect(() => {
    const interval = setInterval(() => {
      setHeights((prev) =>
        prev.map((h) => Math.max(0.1, Math.min(1, h + (Math.random() - 0.5) * 0.3)))
      );
    }, 150);
    return () => clearInterval(interval);
  }, [bars]);

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
          transition={{ duration: 0.15, ease: 'easeOut' }}
        />
      ))}
    </svg>
  );
}