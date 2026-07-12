# Emotional Resonance — A Sanctuary for the Soul

A fully responsive, visually stunning landing page built with React, Tailwind CSS v4, and Framer Motion. Designed with an elegant, emotional, and ethereal aesthetic featuring a silk/satin fabric background texture.

## ✨ Features

- **Hero Carousel** - Horizontal scrolling glassmorphism cards with smooth animations
- **Floating Audio Player** - Animated progress bar and play/pause controls
- **Philosophy Section** - Elegant typography with animated principles grid
- **Explore Grid** - 2x3 glassmorphism cards with hover effects
- **Theme Study** - Three vertical sections with imagery and audio companions
- **Contact Form** - Glassmorphism form with validation and toast notifications
- **Global Audio Player** - Animated waveform visualization with full controls
- **Smooth Animations** - Framer Motion powered scroll-triggered animations
- **Fully Responsive** - Mobile-first design with breakpoints at 768px, 1024px
- **Accessible** - Semantic HTML, ARIA labels, focus management, reduced motion support

## 🛠 Tech Stack

- **React 19** - Latest React with concurrent features
- **Tailwind CSS v4** - Utility-first CSS with custom theme
- **Framer Motion** - Production-ready animation library
- **Lucide React** - Beautiful, consistent icons
- **Vite** - Lightning-fast build tool
- **Netlify** - Deployment platform

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
cd emotional-resonance

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` folder.

## 📁 Project Structure

```
emotional-resonance/
├── public/
│   ├── _redirects          # Netlify SPA redirects
│   └── og-image.svg        # Open Graph social image
├── src/
│   ├── components/
│   │   ├── Header.jsx      # Sticky transparent navbar
│   │   ├── Hero.jsx        # Carousel + floating player
│   │   ├── Philosophy.jsx  # Philosophy section
│   │   ├── Explore.jsx     # 2x3 grid of pathways
│   │   ├── ThemeStudy.jsx  # Three vertical sections
│   │   ├── Contact.jsx     # Contact form + info
│   │   ├── Footer.jsx      # Episodes + global player
│   │   ├── Loader.jsx      # Initial loading screen
│   │   ├── ScrollProgress.jsx
│   │   └── ToastContainer.jsx
│   ├── hooks/
│   │   ├── useToast.jsx    # Toast notification system
│   │   └── useScrollProgress.jsx
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles + Tailwind v4 theme
├── index.html
├── netlify.toml            # Netlify configuration
├── package.json
├── vite.config.js
└── README.md
```

## 🎨 Design System

### Colors
- **Background**: Deep charcoal (`#0a0a0f`) with animated gradient orbs
- **Text**: Soft white (`#e8e8ec`) with muted variants
- **Accent**: Purple (`#c084fc`) with rose (`#f472b6`) and warm (`#fbbf24`) gradients
- **Cards**: Glassmorphism - `rgba(255,255,255,0.1)` with backdrop blur

### Typography
- **Display**: Space Grotesk (headings, uppercase, letter-spaced)
- **Body**: Outfit (clean, legible, 1.7 line-height)
- **Mono**: JetBrains Mono (counters, durations, codes)

### Spacing
- Section padding: 120px (80px mobile)
- Card padding: 24-32px
- Component gaps: 16-24px

## 🎬 Animations

- **Page Load**: Staggered entrance animations
- **Scroll Reveal**: IntersectionObserver-triggered reveals
- **Carousel**: Smooth horizontal scroll with snap
- **Waveform**: Real-time animated audio visualization
- **Orbs**: Continuous floating background gradients
- **Hover States**: Scale, translate, glow transitions
- **Reduced Motion**: Full support via `prefers-reduced-motion`

## ♿ Accessibility

- Semantic HTML5 elements
- ARIA labels and roles
- Focus-visible outlines
- Skip to main content link
- Sufficient color contrast
- Keyboard navigation
- Screen reader announcements
- Reduced motion support

## 🌐 Deployment

### Netlify (Recommended)

1. Push to GitHub/GitLab/Bitbucket
2. Connect repository to Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Deploy!

The `netlify.toml` handles:
- SPA redirects
- Security headers
- Asset caching

### Other Platforms

The `dist/` folder can be deployed to any static hosting:
- Vercel
- Cloudflare Pages
- GitHub Pages
- AWS S3 + CloudFront
- Firebase Hosting

## 📝 Customization

### Theme Colors
Edit `src/index.css` @theme block:
```css
@theme {
  --color-accent: #your-color;
  --color-rose: #your-color;
  --color-warm: #your-color;
}
```

### Content
- Update component data arrays in each component file
- Replace Unsplash images with your own assets
- Modify copy in section components

### Fonts
Update Google Fonts imports in `index.html` and `--font-*` variables in `src/index.css`

## 📄 License

MIT License - Feel free to use for personal or commercial projects.

---

Built with 💜 for emotional wellness and human connection.