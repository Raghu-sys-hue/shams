import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, Globe2, Share2 } from 'lucide-react';
import { useToast } from '../hooks/useToast';

const formFields = [
  { name: 'name', label: 'Name', type: 'text', placeholder: 'Your name', required: true },
  { name: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com', required: true },
  { name: 'subject', label: 'Subject', type: 'text', placeholder: "What's this about?", required: true },
  { name: 'message', label: 'Message', type: 'textarea', placeholder: 'Share your thoughts...', required: true, rows: 5 },
];

const contactInfo = [
  { icon: MapPin, label: 'Address', value: '123 Resonance Way, Harmony Valley, HV 90210' },
  { icon: Phone, label: 'Phone', value: '+1 (555) 123-4567' },
  { icon: Mail, label: 'Email', value: 'hello@emotionalresonance.com' },
];

const socialLinks = [
  { icon: Share2, href: '#', label: 'Share' },
  { icon: Globe2, href: '#', label: 'Website' },
  { icon: MessageSquare, href: '#', label: 'Community' },
];

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const { addToast } = useToast();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setSubmitStatus('success');
    addToast('Message sent successfully! We\'ll get back to you soon.', 'success');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);

    setTimeout(() => setSubmitStatus(null), 5000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  return (
    <section id="contact" className="section contact-section" aria-labelledby="contact-heading">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label" style={{ fontWeight: '700' }}>GET IN TOUCH</span>
          <h2 id="contact-heading" className="section-title gradient-text" style={{ fontWeight: '800' }}>
            CONNECT WITH US
          </h2>
          <p className="section-description" style={{ fontWeight: '500' }}>
            Questions, reflections, collaboration inquiries—we\'d love to hear from you.
          </p>
        </motion.div>

        <motion.div
          className="contact-wrapper card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="contact-form-column">
            <h3 className="contact-column-title" style={{ fontWeight: '700' }}>SEND A MESSAGE</h3>

            <form onSubmit={handleSubmit} className="contact-form" noValidate>
              {formFields.map((field) => (
                <motion.div
                  key={field.name}
                  className="form-field"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * formFields.indexOf(field) }}
                >
                  <label htmlFor={field.name} className="form-label" style={{ fontWeight: '600' }}>
                    {field.label}
                  </label>
                  {field.type === 'textarea' ? (
                    <textarea
                      id={field.name}
                      name={field.name}
                      className={`form-input ${errors[field.name] ? 'error' : ''}`}
                      placeholder={field.placeholder}
                      value={formData[field.name]}
                      onChange={handleChange}
                      rows={field.rows}
                      required={field.required}
                      aria-invalid={!!errors[field.name]}
                      aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
                      style={{ fontWeight: '500' }}
                    />
                  ) : (
                    <input
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      className={`form-input ${errors[field.name] ? 'error' : ''}`}
                      placeholder={field.placeholder}
                      value={formData[field.name]}
                      onChange={handleChange}
                      required={field.required}
                      aria-invalid={!!errors[field.name]}
                      aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
                      style={{ fontWeight: '500' }}
                    />
                  )}
                  {errors[field.name] && (
                    <motion.span
                      id={`${field.name}-error`}
                      className="form-error"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{ fontWeight: '500' }}
                    >
                      {errors[field.name]}
                    </motion.span>
                  )}
                </motion.div>
              ))}

              <AnimatePresence mode="wait">
                {submitStatus === 'success' && (
                  <motion.div
                    className="submit-success"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    style={{ fontWeight: '600' }}
                  >
                    <MessageSquare className="w-5 h-5" aria-hidden="true" />
                    Thank you! Your message has been sent.
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                type="submit"
                className="btn btn-primary submit-btn"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{ fontWeight: '700', width: '100%' }}
              >
                {isSubmitting ? (
                  <>
                    <motion.div className="spinner" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="w-5 h-5" aria-hidden="true" />
                  </>
                )}
              </motion.button>
            </form>
          </div>

          <div className="contact-info-column">
            <h3 className="contact-column-title" style={{ fontWeight: '700' }}>CONTACT</h3>

            <div className="contact-info-list">
              {contactInfo.map((item) => (
                <motion.div
                  key={item.label}
                  className="contact-info-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * contactInfo.indexOf(item) }}
                >
                  <div className="contact-info-icon">
                    <item.icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div className="contact-info-text">
                    <span className="contact-info-label" style={{ fontWeight: '600' }}>{item.label}</span>
                    <span className="contact-info-value" style={{ fontWeight: '500' }}>{item.value}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="contact-social">
              <span className="contact-social-label" style={{ fontWeight: '700' }}>CONNECT</span>
              <div className="social-icons">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className="social-icon"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" aria-hidden="true" />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}