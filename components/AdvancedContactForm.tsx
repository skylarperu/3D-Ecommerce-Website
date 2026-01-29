'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaWhatsapp, FaCheckCircle } from 'react-icons/fa';

const WHATSAPP_NUMBER = '51916018783';
const WHATSAPP_MESSAGE = 'Hola Norvex Perú! 👋 Quisiera conocer más sobre tus servicios.';

interface FormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

interface FormState {
  status: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
}

export function AdvancedContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [formState, setFormState] = useState<FormState>({ status: 'idle' });

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState({ status: 'loading' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al enviar el mensaje');
      }

      setFormState({ status: 'success', message: data.message });
      toast.success('¡Mensaje enviado exitosamente!');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });

      // Resetear después de 3 segundos
      setTimeout(() => setFormState({ status: 'idle' }), 3000);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      setFormState({ status: 'error', message: errorMessage });
      toast.error(errorMessage);
    }
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(WHATSAPP_MESSAGE);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  const contactMethods = [
    {
      icon: FaPhone,
      label: 'Teléfono',
      value: '+51 916 018 783',
      action: `tel:+51916018783`,
      actionLabel: 'Llamar',
    },
    {
      icon: FaWhatsapp,
      label: 'WhatsApp',
      value: '+51 916 018 783',
      action: handleWhatsApp,
      actionLabel: 'Escribir',
      color: 'text-green-400',
    },
    {
      icon: FaEnvelope,
      label: 'Email',
      value: 'soporte@norvexperu.xyz',
      action: `mailto:soporte@norvexperu.xyz`,
      actionLabel: 'Enviar Email',
    },
    {
      icon: FaMapMarkerAlt,
      label: 'Ubicación',
      value: 'Lima, Perú 🇵🇪',
      action: '#',
      actionLabel: 'Ver ubicación',
    },
  ];

  const inputVariants = {
    focus: { scale: 1.02, borderColor: '#667eea' },
    blur: { scale: 1 },
  };

  return (
    <div className="space-y-12">
      {/* Contact Methods Grid */}
      <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {contactMethods.map((method, idx) => {
          const Icon = method.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="glass p-6 rounded-xl hover:border-purple-400/50 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-br from-purple-600/20 to-pink-600/20 ${method.color || 'text-purple-400'}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">{method.label}</h3>
                    <p className="text-gray-400 text-sm">{method.value}</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (typeof method.action === 'function') {
                      method.action();
                    } else if (method.action !== '#') {
                      window.location.href = method.action;
                    }
                  }}
                  className="px-3 py-1.5 text-xs font-semibold bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg hover:shadow-purple-600/50 transition-all"
                >
                  {method.actionLabel}
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Main Contact Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass p-8 rounded-2xl"
      >
        <h3 className="text-2xl font-bold text-white mb-6">Envía tu Mensaje 💬</h3>

        <AnimatePresence mode="wait">
          {formState.status === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center py-12"
            >
              <FaCheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h4 className="text-xl font-bold text-white mb-2">¡Mensaje Enviado! 🎉</h4>
              <p className="text-gray-400">{formState.message}</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Field */}
              <motion.div
                variants={inputVariants}
                whileFocus="focus"
              >
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                  required
                  minLength={2}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/30 transition-all duration-300"
                />
              </motion.div>

              {/* Email Field */}
              <motion.div
                variants={inputVariants}
                whileFocus="focus"
              >
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  required
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/30 transition-all duration-300"
                />
              </motion.div>

              {/* Phone Field */}
              <motion.div
                variants={inputVariants}
                whileFocus="focus"
              >
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Teléfono
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+51 999 999 999"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/30 transition-all duration-300"
                />
              </motion.div>

              {/* Subject Field */}
              <motion.div
                variants={inputVariants}
                whileFocus="focus"
              >
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Asunto *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="¿Cuál es tu consulta?"
                  required
                  minLength={3}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/30 transition-all duration-300"
                />
              </motion.div>

              {/* Message Field */}
              <motion.div
                variants={inputVariants}
                whileFocus="focus"
              >
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Mensaje *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Cuéntanos más sobre tu consulta..."
                  required
                  minLength={10}
                  maxLength={5000}
                  rows={6}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/30 transition-all duration-300 resize-none"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.message.length} / 5000 caracteres
                </p>
              </motion.div>

              {/* Error Message */}
              <AnimatePresence>
                {formState.status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm"
                  >
                    ⚠️ {formState.message}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={formState.status === 'loading'}
                whileHover={{ scale: formState.status !== 'loading' ? 1.02 : 1 }}
                whileTap={{ scale: formState.status !== 'loading' ? 0.98 : 1 }}
                className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-purple-600/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {formState.status === 'loading' ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Enviando...
                  </span>
                ) : (
                  '📧 Enviar Mensaje'
                )}
              </motion.button>

              <p className="text-xs text-gray-500 text-center">
                Responderemos en las próximas 24-48 horas
              </p>
            </form>
          )}
        </AnimatePresence>
      </motion.div>

      {/* WhatsApp Quick Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <p className="text-gray-400 mb-4">¿Prefieres contactarnos por WhatsApp?</p>
        <motion.button
          onClick={handleWhatsApp}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full shadow-lg shadow-green-500/50 transition-all duration-300"
        >
          <FaWhatsapp className="w-6 h-6" />
          Escribir en WhatsApp
        </motion.button>
      </motion.div>
    </div>
  );
}
