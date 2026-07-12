import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Mountain, Heart, Users, Music, Leaf, Sun } from 'lucide-react';

const miniAudioCards = [
  {
    id: 1,
    title: 'LISTEN: "A Shared Heartbeat"',
    subtitle: 'Audio Essay · 12 min',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&q=80',
  },
  {
    id: 2,
    title: 'PRACTICE: Guided Meditation for Belonging',
    subtitle: 'Guided Meditation · 18 min',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&q=80',
  },
];

const themeItems = [
  {
    id: 1,
    title: 'SECTION 1: EMBRACING THE COLLECTIVE',
    subtitle: 'The We in Me',
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&q=80',
    paragraphs: [
      'The illusion of separation is perhaps the greatest source of modern suffering. We are taught to compete, to distinguish ourselves, to stand alone. Yet every breath we take is shared air. Every cell in our body contains atoms forged in ancient stars—stardust that has journeyed through countless forms before becoming this moment\'s "you."',
      'When we embrace the collective, we do not lose ourselves—we find our true scale. The personal story nestles inside the human story, which nestles inside the earth story, which nestles inside the cosmic story. Each layer adds meaning, context, belonging. This section explores practices for feeling your place in the web: group meditation, shared ritual, collaborative creativity, and the simple, radical act of asking "How are you?" and staying for the answer.',
    ],
    icon: Users,
  },
  {
    id: 2,
    title: 'SECTION 2: CONNECTION WITHIN SELF',
    subtitle: 'The Inner Landscape',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80',
    paragraphs: [
      'Before we can truly meet another, we must meet ourselves. The relationship with self is the template for all other relationships. Yet many of us are strangers to our own inner world—unfamiliar with the texture of our sadness, the temperature of our anger, the geography of our joy.',
      'This section guides you into intimate acquaintance with your interior territory. Through somatic awareness practices, emotional mapping, inner dialogue techniques, and guided visualizations, you\'ll learn to navigate your inner landscape with the curiosity of an explorer and the compassion of a dear friend. The goal is not to fix or change, but to witness and welcome—to become the safe harbor your own emotions have been seeking.',
    ],
    icon: Heart,
  },
  {
    id: 3,
    title: 'SECTION 3: NATURAL RESONANCE',
    subtitle: 'Earth Body, Sky Mind',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&q=80',
    paragraphs: [
      'We are not separate from nature—we are nature, momentarily arranged in human form. The same forces that shape mountains and rivers shape our emotional tides. The moon pulls our waters as it pulls the oceans. The seasons cycle through us as they cycle through forests.',
      'This section invites you into reciprocal relationship with the more-than-human world. Forest bathing, sky gazing, plant communication, elemental meditations, and seasonal ceremonies—practices that dissolve the boundary between "inside" and "outside." When we remember our embeddedness in the living world, anxiety transforms into belonging, isolation into kinship, and the ordinary becomes miraculous.',
    ],
    icon: Mountain,
  },
];

export function ThemeStudy() {
  const [playingId, setPlayingId] = useState(null);

  const togglePlay = (id) => {
    setPlayingId(playingId === id ? null : id);
  };

  return (
    <section id="theme-study" className="section theme-study-section" aria-labelledby="theme-study-heading">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label" style={{ fontWeight: '700' }}>DEEP DIVE</span>
          <h2 id="theme-study-heading" className="section-title gradient-text" style={{ fontWeight: '800' }}>
            THEME STUDY: CONNECTION
          </h2>
        </motion.div>

        <div className="theme-study-list">
          {themeItems.map((item, index) => (
            <motion.article
              key={item.id}
              className="theme-study-card card card-glow"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <div className="theme-study-image-wrapper">
                <img
                  src={item.image}
                  alt=""
                  className="theme-study-image cover"
                  loading="lazy"
                  aria-hidden="true"
                />
                <div className="theme-study-image-overlay" aria-hidden="true"></div>
              </div>
              <div className="theme-study-content">
                <div className="theme-study-icon">
                  <item.icon className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="theme-study-title" style={{ fontWeight: '700' }}>
                  {item.title}
                </h3>
                <p className="theme-study-subtitle" style={{ fontWeight: '600', color: 'var(--accent)' }}>
                  {item.subtitle}
                </p>
                <div className="theme-study-paragraphs">
                  {item.paragraphs.map((para, pIndex) => (
                    <motion.p
                      key={pIndex}
                      className="theme-study-paragraph"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + pIndex * 0.1 }}
                      style={{ fontWeight: '500', lineHeight: 1.8, marginBottom: '1rem' }}
                    >
                      {para}
                    </motion.p>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          className="mini-audio-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="mini-audio-heading" style={{ fontWeight: '700' }}>
            AUDIO COMPANIONS
          </h3>
          <div className="grid grid-2 mini-audio-grid">
            {miniAudioCards.map((card) => (
              <motion.button
                key={card.id}
                className="mini-audio-card card card-glow"
                onClick={() => togglePlay(card.id)}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * card.id }}
              >
                <div className="mini-audio-image">
                  <img src={card.image} alt="" className="cover" />
                  <motion.div
                    className="mini-audio-play-overlay"
                    animate={{ scale: playingId === card.id ? 1 : 0.8 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <motion.div
                      className="mini-audio-play-btn"
                      animate={{ scale: playingId === card.id ? [1, 1.1, 1] : 1 }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      {playingId === card.id ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                    </motion.div>
                  </motion.div>
                </div>
                <div className="mini-audio-info">
                  <span className="mini-audio-title" style={{ fontWeight: '600' }}>
                    {card.title}
                  </span>
                  <span className="mini-audio-meta" style={{ fontWeight: '500', fontSize: '0.75rem' }}>
                    {card.subtitle}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}