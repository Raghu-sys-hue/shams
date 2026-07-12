import { motion } from 'framer-motion';
import { Music } from 'lucide-react';

export function Loader({ isLoaded }) {
  return (
    <motion.div
      className={`loader ${isLoaded ? 'hidden' : ''}`}
      initial={false}
      animate={{ opacity: isLoaded ? 0 : 1, visibility: isLoaded ? 'hidden' : 'visible' }}
      transition={{ duration: 0.5, delay: 0.2 }}
      role="status"
      aria-label="Loading"
      aria-busy={!isLoaded}
    >
      <motion.div
        className="loader-ring"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        aria-hidden="true"
      />
      <motion.span
        className="loader-text"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        EMOTIONAL RESONANCE
      </motion.span>
    </motion.div>
  );
}