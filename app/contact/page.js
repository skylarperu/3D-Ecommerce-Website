'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SectionTitle from '../../components/SectionTitle';
import Button from '../../components/Button';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la integración con un backend o servicio de email
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactMethods = [
    {
      icon: '💬',
      title: 'Discord',
      description: 'Canal #soporte en nuestro servidor',
      action: 'Unirse al Discord',
    },
    {
      icon: '📧',
      title: 'Email',
      description: 'respuestas en 24-48 horas',
      action: 'soporte@norvexperu.xyz',
    },
    {
      icon: '🌐',
      title: 'Twitter',
      description: 'Respuestas rápidas a consultas',
      action: '@norvexperu',
    },
  ];

  return (
    <main className="w-full overflow-hidden">
      <Navbar />

      {/* Header */}
      <section className="section-container pt-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.div
            animate={{ y: [0, 30, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-20 right-20 w-72 h-72 bg-cyan-600/20 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-section mx-auto relative z-10 text-center mb-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            Ponte en <span className="gradient-text">contacto</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-white/70 max-w-2xl mx-auto"
          >
            ¿Preguntas? ¿Comentarios? Queremos escucharte. Contáctanos por el medio que prefieras.
          </motion.p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="section-container relative overflow-hidden">
        <div className="max-w-section mx-auto mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="glass p-8 rounded-2xl text-center group hover:border-purple-400/30 transition-all duration-300"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {method.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{method.title}</h3>
                <p className="text-white/60 text-sm mb-6">{method.description}</p>
                <Button variant="secondary" size="sm">
                  {method.action}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="section-container">
        <div className="max-w-2xl mx-auto">
          <SectionTitle
            title="Envíanos tu mensaje"
            subtitle="Completa el formulario y nos pondremos en contacto lo antes posible."
          />

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="glass p-8 rounded-2xl space-y-6"
          >
            {/* Success Message */}
            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-emerald-600/20 border border-emerald-400/50 text-emerald-300 p-4 rounded-lg text-sm"
              >
                ✅ ¡Mensaje enviado! Nos pondremos en contacto pronto.
              </motion.div>
            )}

            {/* Name Field */}
            <div>
              <label className="block text-white font-semibold mb-3">
                Nombre completo
              </label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Tu nombre"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-purple-400/50 transition-colors duration-300"
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-white font-semibold mb-3">
                Correo electrónico
              </label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="tu@email.com"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-purple-400/50 transition-colors duration-300"
              />
            </div>

            {/* Subject Field */}
            <div>
              <label className="block text-white font-semibold mb-3">
                Asunto
              </label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="¿En qué podemos ayudarte?"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-purple-400/50 transition-colors duration-300"
              />
            </div>

            {/* Message Field */}
            <div>
              <label className="block text-white font-semibold mb-3">
                Mensaje
              </label>
              <motion.textarea
                whileFocus={{ scale: 1.01 }}
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Cuéntanos más..."
                rows="6"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-purple-400/50 transition-colors duration-300 resize-none"
              />
            </div>

            {/* Submit Button */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <button
                type="submit"
                className="w-full btn-primary py-4 rounded-lg font-semibold"
              >
                Enviar mensaje
              </button>
            </motion.div>

            {/* Privacy Notice */}
            <p className="text-white/50 text-xs text-center">
              Tu privacidad es importante. Tus datos no serán compartidos.
            </p>
          </motion.form>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-container">
        <div className="max-w-4xl mx-auto">
          <SectionTitle
            title="Preguntas Frecuentes sobre Contacto"
            subtitle="Las respuestas a las dudas más comunes"
          />

          <div className="space-y-4">
            {[
              {
                q: '¿Cuánto tiempo tarda la respuesta?',
                a: 'Respondemos en máximo 48 horas. Discord usualmente más rápido (24h).',
              },
              {
                q: '¿Cuál es el mejor canal para contactar?',
                a: 'Discord para consultas urgentes, email para lo demás. Twitter solo para menciones públicas.',
              },
              {
                q: '¿Pueden ayudarme con problemas de acceso?',
                a: 'Sí, contáctanos por Discord en #soporte y te ayudaremos inmediatamente.',
              },
              {
                q: '¿Hacen demostraciones personales?',
                a: 'Sí, agenda una sesión gratuita de 30 minutos. Envíanos un email a demostración@norvexperu.xyz',
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="glass p-6 rounded-xl"
              >
                <h4 className="text-white font-bold mb-2">{item.q}</h4>
                <p className="text-white/70 text-sm">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}