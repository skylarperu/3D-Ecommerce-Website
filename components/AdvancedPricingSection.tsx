'use client';

import { motion } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';

interface PricingPlan {
  name: string;
  price: number;
  description: string;
  features: string[];
  popular?: boolean;
  cta: string;
}

const plans: PricingPlan[] = [
  {
    name: 'Starter',
    price: 29,
    description: 'Para empezar tu jornada',
    features: [
      'Acceso a 5 cursos',
      'Comunidad Discord',
      'Soporte por email',
      'Certificados digitales',
      'Material descargable',
    ],
    cta: 'Comenzar ahora',
  },
  {
    name: 'Professional',
    price: 97,
    description: 'Para emprendedores serios',
    features: [
      'Acceso a todos los cursos',
      'Mentoría 1-a-1 mensual',
      'Comunidad Discord VIP',
      'Soporte prioritario',
      'Certificados y credenciales',
      'Actualizaciones de contenido',
      'Blueprints de negocio',
    ],
    popular: true,
    cta: 'Quiero ser profesional',
  },
  {
    name: 'Enterprise',
    price: 297,
    description: 'Para escalar tu negocio',
    features: [
      'Todo en Professional',
      'Mentoría semanal',
      'Grupo privado de WhatsApp',
      'Acceso anticipado a nuevos cursos',
      'Estrategia personalizada',
      'Dashboard de análisis',
      'Conexiones B2B',
    ],
    cta: 'Contáctanos',
  },
];

export function PricingSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-white mb-4">
            Planes Flexible para Todos
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Elige el plan que mejor se adapte a tus necesidades y comienza a construir tu imperio
          </p>
        </motion.div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: plan.popular ? -10 : -5 }}
              className={`rounded-2xl p-8 relative transition-all duration-300 ${
                plan.popular
                  ? 'bg-gradient-to-br from-purple-600 to-pink-600 shadow-2xl scale-105'
                  : 'bg-slate-800 shadow-lg hover:shadow-xl'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <motion.div
                  animate={{ rotate: [0, 5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                >
                  <div className="bg-yellow-400 text-black px-4 py-2 rounded-full font-bold text-sm">
                    ⭐ POPULAR
                  </div>
                </motion.div>
              )}

              {/* Content */}
              <div className="mb-8">
                <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-white'}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mb-4 ${plan.popular ? 'text-white/80' : 'text-gray-400'}`}>
                  {plan.description}
                </p>

                <div className="flex items-baseline gap-1 mb-4">
                  <span className={`text-5xl font-bold ${plan.popular ? 'text-white' : 'text-purple-400'}`}>
                    ${plan.price}
                  </span>
                  <span className={`${plan.popular ? 'text-white/80' : 'text-gray-400'}`}>
                    /mes
                  </span>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {plan.features.map((feature, fidx) => (
                  <motion.div
                    key={fidx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: fidx * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <FaCheck
                      className={`${plan.popular ? 'text-white' : 'text-green-400'}`}
                      size={16}
                    />
                    <span className={`${plan.popular ? 'text-white' : 'text-gray-300'}`}>
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full py-3 rounded-lg font-semibold transition-all ${
                  plan.popular
                    ? 'bg-white text-purple-600 hover:bg-gray-100'
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg'
                }`}
              >
                {plan.cta}
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 max-w-2xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            Preguntas Frecuentes
          </h3>

          <div className="space-y-4">
            {[
              {
                q: '¿Puedo cambiar de plan en cualquier momento?',
                a: 'Sí, puedes cambiar o cancelar tu suscripción en cualquier momento sin penalidades.',
              },
              {
                q: '¿Ofrecen garantía de dinero devuelto?',
                a: '100% garantía de 30 días. Si no estás satisfecho, te devolvemos tu dinero.',
              },
              {
                q: '¿Qué métodos de pago aceptan?',
                a: 'Aceptamos tarjetas de crédito/débito, PayPal, y Mercado Pago.',
              },
            ].map((faq, idx) => (
              <motion.div
                key={idx}
                whileHover={{ backgroundColor: 'rgba(88, 86, 214, 0.1)' }}
                className="bg-slate-800 rounded-lg p-4 cursor-pointer transition"
              >
                <p className="font-semibold text-white mb-2">{faq.q}</p>
                <p className="text-gray-400 text-sm">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
