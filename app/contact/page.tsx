'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  subject: string;
  message: string;
}

interface FormError {
  field: string;
  message: string;
}

const WHATSAPP_NUMBER = '51916018783';
const WHATSAPP_MESSAGE = '¡Hola! 👋 Me gustaría consultar sobre los servicios de Norvex Perú.';

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormError[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Limpiar errores del campo cuando empiece a escribir
    setErrors(errors.filter(err => err.field !== name));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrors([]);

    try {
      const response = await fetch('/api/contact/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.details && Array.isArray(data.details)) {
          setErrors(data.details);
          toast.error('Por favor completa todos los campos correctamente');
        } else {
          throw new Error(data.error || 'Error al enviar el mensaje');
        }
        return;
      }

      // Éxito
      setSubmitted(true);
      toast.success('✅ ¡Mensaje enviado correctamente!');
      setFormData({ name: '', email: '', phone: '', company: '', subject: '', message: '' });

      // Limpiar mensaje de éxito después de 5 segundos
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      toast.error(errorMessage);
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(WHATSAPP_MESSAGE);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
    toast.success('Abriendo WhatsApp...');
  };

  const contactMethods = [
    {
      icon: '💬',
      title: 'WhatsApp',
      description: 'Respuestas instantáneas',
      action: 'Chatear ahora',
      color: 'from-green-600 to-emerald-600',
      onClick: handleWhatsAppClick,
    },
    {
      icon: '📧',
      title: 'Email',
      description: 'Respuestas en 24-48 horas',
      action: 'soporte@norvexperu.xyz',
      color: 'from-purple-600 to-pink-600',
      onClick: () => {
        window.location.href = 'mailto:soporte@norvexperu.xyz';
      },
    },
    {
      icon: '🌐',
      title: 'Discord',
      description: 'Comunidad 24/7',
      action: 'Unirse al servidor',
      color: 'from-blue-600 to-indigo-600',
      onClick: () => {
        window.open('https://discord.gg/norvex', '_blank');
      },
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Hablemos de tu Negocio
            </h1>
            <p className="text-xl text-gray-300">
              Estamos aquí para ayudarte a crecer. Contacta con nosotros de la forma que prefieras.
            </p>
          </motion.div>

          {/* Contact Methods */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          >
            {contactMethods.map((method, idx) => (
              <motion.button
                key={idx}
                onClick={method.onClick}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className={`p-6 rounded-xl bg-gradient-to-br ${method.color} text-white shadow-xl hover:shadow-2xl transition-all duration-300 text-left group`}
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                  {method.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{method.title}</h3>
                <p className="text-sm opacity-90 mb-4">{method.description}</p>
                <div className="text-sm font-semibold opacity-75 group-hover:opacity-100">
                  {method.action} →
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* Main Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 shadow-2xl border border-purple-500/20"
          >
            <h2 className="text-3xl font-bold text-white mb-2 text-center">Formulario de Contacto</h2>
            <p className="text-gray-400 text-center mb-8">
              Completa el formulario y nos pondremos en contacto contigo pronto
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nombre */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-white font-semibold mb-2">
                  👤 Nombre Completo *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                  className={`w-full px-4 py-3 rounded-lg bg-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 transition ${
                    errors.some(e => e.field === 'name') ? 'ring-2 ring-red-500' : ''
                  }`}
                  disabled={loading}
                />
                {errors.find(e => e.field === 'name') && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.find(e => e.field === 'name')?.message}
                  </p>
                )}
              </motion.div>

              {/* Email y Teléfono */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Email */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.45 }}
                >
                  <label className="block text-white font-semibold mb-2">
                    📧 Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="tu@email.com"
                    className={`w-full px-4 py-3 rounded-lg bg-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 transition ${
                      errors.some(e => e.field === 'email') ? 'ring-2 ring-red-500' : ''
                    }`}
                    disabled={loading}
                  />
                  {errors.find(e => e.field === 'email') && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.find(e => e.field === 'email')?.message}
                    </p>
                  )}
                </motion.div>

                {/* Teléfono */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.45 }}
                >
                  <label className="block text-white font-semibold mb-2">
                    📱 Teléfono *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+51 910 000 000"
                    className={`w-full px-4 py-3 rounded-lg bg-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 transition ${
                      errors.some(e => e.field === 'phone') ? 'ring-2 ring-red-500' : ''
                    }`}
                    disabled={loading}
                  />
                  {errors.find(e => e.field === 'phone') && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.find(e => e.field === 'phone')?.message}
                    </p>
                  )}
                </motion.div>
              </div>

              {/* Empresa */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label className="block text-white font-semibold mb-2">
                  🏢 Empresa (Opcional)
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company || ''}
                  onChange={handleChange}
                  placeholder="Nombre de tu empresa"
                  className="w-full px-4 py-3 rounded-lg bg-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
                  disabled={loading}
                />
              </motion.div>

              {/* Asunto */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.55 }}
              >
                <label className="block text-white font-semibold mb-2">
                  📌 Asunto *
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-600 transition ${
                    errors.some(e => e.field === 'subject') ? 'ring-2 ring-red-500' : ''
                  }`}
                  disabled={loading}
                >
                  <option value="">Selecciona un asunto</option>
                  <option value="Consulta sobre programas">Consulta sobre programas</option>
                  <option value="Mentoría personalizada">Mentoría personalizada</option>
                  <option value="Soporte técnico">Soporte técnico</option>
                  <option value="Asociarse con Norvex">Asociarse con Norvex</option>
                  <option value="Otro">Otro</option>
                </select>
                {errors.find(e => e.field === 'subject') && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.find(e => e.field === 'subject')?.message}
                  </p>
                )}
              </motion.div>

              {/* Mensaje */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <label className="block text-white font-semibold mb-2">
                  💬 Mensaje *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Cuéntanos más detalles..."
                  rows={6}
                  className={`w-full px-4 py-3 rounded-lg bg-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 transition resize-none ${
                    errors.some(e => e.field === 'message') ? 'ring-2 ring-red-500' : ''
                  }`}
                  disabled={loading}
                />
                {errors.find(e => e.field === 'message') && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.find(e => e.field === 'message')?.message}
                  </p>
                )}
              </motion.div>

              {/* Botones */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 }}
                className="flex gap-4 flex-col md:flex-row"
              >
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-purple-600/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? '📤 Enviando...' : '📤 Enviar Mensaje'}
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppClick}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-green-600/50 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  💬 WhatsApp Directo
                </button>
              </motion.div>
            </form>

            {/* Success Message */}
            <AnimatePresence>
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 text-center"
                >
                  ✅ ¡Gracias por tu mensaje! Nos pondremos en contacto pronto.
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-16 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-purple-500/20"
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              ❓ Preguntas Frecuentes
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  q: '¿Cuál es el tiempo de respuesta?',
                  a: 'Respondemos por email en 24-48 horas. Por WhatsApp es instantáneo durante horario laboral.',
                },
                {
                  q: '¿Dónde están ubicados?',
                  a: 'Somos una empresa 100% online con equipo distribuido en Perú y Latinoamérica.',
                },
                {
                  q: '¿Ofrecen consultas gratuitas?',
                  a: 'Sí, oferecemos una consulta inicial gratuita de 30 minutos para conocer tu situación.',
                },
                {
                  q: '¿Qué métodos de pago aceptan?',
                  a: 'Aceptamos transferencias, tarjeta de crédito y métodos de pago locales en Perú.',
                },
              ].map((faq, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.75 + idx * 0.05 }}
                >
                  <h3 className="text-lg font-bold text-purple-400 mb-2">{faq.q}</h3>
                  <p className="text-gray-300">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
