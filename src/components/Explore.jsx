import { motion } from 'framer-motion';
import {
  Droplet,
  Volume2,
  PenTool,
  Users,
  Headphones,
  Briefcase,
  Sparkles,
} from 'lucide-react';

const exploreItems = [
  {
    id: 1,
    icon: Droplet,
    title: 'GUIDED MEDITATIONS',
    description: 'Journey inward with expertly crafted sessions for every emotional landscape—from anxiety to gratitude, grief to wonder.',
  },
  {
    id: 2,
    icon: Volume2,
    title: 'SOUNDSCAPES ARCHIVE',
    description: 'Immersive audio environments: rain on leaves, ocean depths, forest dawn, crystal bowls, binaural beats, and more.',
  },
  {
    id: 3,
    icon: PenTool,
    title: 'CREATIVE PROMPTS',
    description: 'Writing, drawing, and movement prompts designed to bypass the critic and awaken authentic expression.',
  },
  {
    id: 4,
    icon: Users,
    title: 'COMMUNITY REFLECTIONS',
    description: 'Shared stories, insights, and practices from fellow travelers. Witness and be witnessed in our growing community.',
  },
  {
    id: 5,
    icon: Headphones,
    title: 'AUDIO ESSAYS',
    description: 'Thought-provoking explorations of emotional themes—part philosophy, part poetry, part personal narrative.',
  },
  {
    id: 6,
    icon: Briefcase,
    title: 'WORKSHOPS',
    description: 'Live and recorded deep-dives with guides, therapists, artists, and wisdom keepers from diverse traditions.',
  },
];

export function Explore() {
  return (
    <section id="explore" className="section explore-section" aria-labelledby="explore-heading">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label" style={{ fontWeight: '700' }}>THE OFFERING</span>
          <h2 id="explore-heading" className="section-title gradient-text" style={{ fontWeight: '800' }}>
            EXPLORE THE LANDSCAPE OF EMOTION
          </h2>
          <p className="section-description" style={{ fontWeight: '500' }}>
            Six pathways into the heart. Each offers a different doorway—choose what calls to you today.
          </p>
        </motion.div>

        <div className="grid grid-3 explore-grid">
          {exploreItems.map((item, index) => (
            <motion.article
              key={item.id}
              className="explore-card card card-glow"
              whileHover={{ y: -8, scale: 1.02 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <div className="explore-icon">
                <item.icon className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="explore-title" style={{ fontWeight: '700' }}>{item.title}</h3>
              <p className="explore-description" style={{ fontWeight: '500', lineHeight: 1.6 }}>{item.description}</p>
              <motion.button
                className="explore-link"
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                style={{ fontWeight: '600' }}
              >
                Begin Journey
                <Sparkles className="w-4 h-4" aria-hidden="true" />
              </motion.button>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}