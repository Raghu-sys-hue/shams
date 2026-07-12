import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Infinity,
  Heart,
  Brain,
  Users,
  Leaf,
  Music,
  Sun,
  Moon,
} from 'lucide-react';

const principles = [
  { title: 'RADICAL ACCEPTANCE', desc: 'Embracing every emotion as a messenger, not a mistake', icon: Heart },
  { title: 'EMBODIED AWARENESS', desc: 'Listening to the body\'s wisdom beneath the mind\'s noise', icon: Brain },
  { title: 'SHARED HUMANITY', desc: 'Recognizing that your feelings connect you to all beings', icon: Users },
  { title: 'NATURAL RHYTHMS', desc: 'Honoring the cycles of expansion and contraction within', icon: Leaf },
  { title: 'SOUND AS MEDICINE', desc: 'Using vibration to bypass story and touch sensation directly', icon: Music },
  { title: 'LIGHT AND SHADOW', desc: 'Integrating both joy and sorrow as essential wholeness', icon: Sun },
];

export function Philosophy() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="section philosophy-section"
      aria-labelledby="philosophy-heading"
    >
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="section-label">OUR CORE</span>
          <h2 id="philosophy-heading" className="section-title" style={{ fontWeight: '700' }}>
            OUR PHILOSOPHY: RESONANCE IN EMOTION
          </h2>
          <p className="section-description" style={{ fontWeight: '500' }}>
            We believe every emotion carries intelligence. By learning to listen deeply—to ourselves, to each other, to the world—we discover that vulnerability is not weakness, but the very gateway to authentic connection and profound aliveness.
          </p>
        </motion.div>

        <motion.div
          className="philosophy-content"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        >
          <div className="philosophy-principles grid grid-3">
            {principles.map((principle, index) => (
              <motion.div
                key={principle.title}
                className="principle-card card card-glow"
                whileHover={{ y: -8, scale: 1.02 }}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1, ease: 'easeOut' }}
              >
                <div className="principle-icon">
                  <principle.icon className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="principle-title" style={{ fontWeight: '700', fontSize: '1.1rem' }}>{principle.title}</h3>
                <p className="principle-desc" style={{ fontWeight: '500', fontSize: '0.95rem', lineHeight: 1.6 }}>{principle.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="philosophy-centerpiece"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          >
            <div className="infinity-container">
              <motion.svg
                className="infinity-symbol"
                viewBox="0 0 100 50"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                aria-hidden="true"
              >
                <path
                  d="M50 25 C20 25 20 5 50 5 C80 5 80 25 50 25 C20 25 20 45 50 45 C80 45 80 25 50 25"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  style={{ color: 'var(--accent)' }}
                />
                <circle cx="50" cy="25" r="15" stroke="currentColor" strokeWidth="1" fill="none" style={{ color: 'var(--accent)', opacity: 0.3 }} />
              </motion.svg>
              <div className="center-text">
                <span style={{ fontWeight: '700', letterSpacing: '0.2em', fontSize: '0.75rem' }}>INFINITE</span>
                <br />
                <span style={{ fontWeight: '700', letterSpacing: '0.2em', fontSize: '0.75rem' }}>RESONANCE</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}