import { motion } from 'framer-motion';

export function ScrollProgress({ progress }) {
  return (
    <motion.div
      className="scroll-progress"
      style={{
        width: `${progress * 100}%`,
        background: 'linear-gradient(90deg, var(--accent), var(--rose), var(--warm))',
      }}
      animate={{ width: `${progress * 100}%` }}
      transition={{ duration: 0.1, ease: 'linear' }}
      aria-hidden="true"
    />
  );
}