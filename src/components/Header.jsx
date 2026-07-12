import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Menu, X, Music } from 'lucide-react';

const navLinks = [
  { label: 'ABOUT', href: '#philosophy' },
  { label: 'EXPLORE', href: '#explore' },
  { label: 'THEMES', href: '#theme-study' },
  { label: 'CONTACT', href: '#contact' },
  { label: 'LISTEN', href: '#listen' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 100], [0, 1]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      ref={headerRef}
      className="header"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <motion.div
        className="header-inner"
        style={{
          background: isScrolled
            ? 'rgba(255, 255, 255, 0.1)'
            : 'transparent',
          backdropFilter: isScrolled ? 'blur(20px)' : 'none',
          borderBottom: isScrolled
            ? '1px solid rgba(255, 255, 255, 0.15)'
            : 'none',
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <motion.a
          href="#"
          className="logo"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          aria-label="Emotional Resonance Home"
        >
          <Music className="logo-icon w-6 h-6" aria-hidden="true" />
          <span className="logo-text" style={{ fontWeight: '600', letterSpacing: '0.1em' }}>
            EMOTIONAL RESONANCE
          </span>
        </motion.a>

        <nav
          className={`nav-links ${isMenuOpen ? 'open' : ''}`}
          role="navigation"
          aria-label="Main navigation"
        >
          <ul className="nav-list" style={{ fontWeight: '600' }}>
            {navLinks.map((link, index) => (
              <motion.li
                key={link.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <a
                  href={link.href}
                  className="nav-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              </motion.li>
            ))}
          </ul>
        </nav>

        <button
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </motion.div>
    </motion.header>
  );
}