'use client';

import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SectionTitle from '../../components/SectionTitle';
import Button from '../../components/Button';

export default function PricingPage() {
  const plans = [
    {
      name: 'Acceso Básico',
      price: '29',
      period: '/mes',
      description: 'Perfecto para comenzar tu viaje como emprendedor',
      features: [
        '✅ Acceso a Discord comunidad',
        '✅ Contenido grabado (biblioteca inicial)',
        '✅ Sesiones en vivo (2 por semana)',
        '✅ Plantillas y recursos básicos',
        '❌ Mentoría 1:1',
        '❌ Acceso a cursos premium',
      ],
      cta: 'Empezar Gratis',
      featured: false,
    },
    {
      name: 'Plan Constructor',
      price: '99',
      period: '/mes',
      description: 'Para emprendedores serios que quieren resultados',
      features: [
        '✅ Todo del plan Básico',
        '✅ Acceso a cursos premium (6 módulos)',
        '✅ Sesiones en vivo (4 por semana)',
        '✅ Grupo VIP de soporte',
        '✅ 4 sesiones mensuales de mentoría',
        '✅ Certificación Norvex',
      ],
      cta: 'Unirme Ahora',
      featured: true,
    },
    {
      name: 'Plan Mentor',
      price: '299',
      period: '/mes',
      description: 'Para los que quieren escalar y mentorear',
      features: [
        '✅ Todo del plan Constructor',
        '✅ Sesiones ilimitadas de mentoría 1:1',
        '✅ Acceso a todos los cursos exclusivos',
        '✅ Grupo privado de mentores',
        '✅ Revenue share en ciertos productos',
        '✅ Prioridad en eventos especiales',
      ],
      cta: 'Acceso Mentores',
      featured: false,
    },
  ];

  return (
    <main className="w-full overflow-hidden">
      <Navbar />

      {/* Header */}
      <section className="section-container pt-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.div
            animate={{ opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-section mx-auto relative z-10 text-center mb-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            Planes para cada etapa <span className="gradient-text">de tu negocio</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-white/70 max-w-2xl mx-auto mb-8"
          >
            Todos incluyen acceso a comunidad, contenido y mentoría. Elige el que se ajuste a tu presupuesto.
          </motion.p>

          {/* Billing Toggle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass px-6 py-3 rounded-full inline-block"
          >
            <span className="text-white/70 mr-4">Facturación:</span>
            <span className="text-purple-400 font-semibold">Mensual</span>
            <span className="text-white/50 ml-4">(Anual disponible)</span>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="section-container relative overflow-hidden">
        <div className="max-w-section mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {plans.map((plan, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                viewport={{ once: true }}
                className={`relative ${plan.featured ? 'md:scale-105 md:z-10' : ''}`}
              >
                {/* Background gradient */}
                {plan.featured && (
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl blur opacity-20" />
                )}

                <div className={`glass p-8 rounded-3xl h-full relative flex flex-col ${
                  plan.featured ? 'border-purple-400/50' : ''
                }`}>
                  {/* Featured Badge */}
                  {plan.featured && (
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-1 rounded-full text-sm font-bold text-white"
                    >
                      ⭐ Más Popular
                    </motion.div>
                  )}

                  {/* Plan Name */}
                  <h3 className={`text-2xl font-bold mb-2 ${
                    plan.featured ? 'gradient-text' : 'text-white'
                  }`}>
                    {plan.name}
                  </h3>

                  {/* Description */}
                  <p className="text-white/60 text-sm mb-6">{plan.description}</p>

                  {/* Price */}
                  <div className="mb-8">
                    <span className="text-5xl font-bold text-white">${plan.price}</span>
                    <span className="text-white/60">{plan.period}</span>
                  </div>

                  {/* CTA Button */}
                  <Button
                    variant={plan.featured ? 'primary' : 'secondary'}
                    size="lg"
                    className="w-full mb-8"
                  >
                    {plan.cta}
                  </Button>

                  {/* Features List */}
                  <div className="space-y-4 flex-1">
                    {plan.features.map((feature, fidx) => (
                      <motion.div
                        key={fidx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: fidx * 0.05 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3 text-white/80 text-sm"
                      >
                        <span className="text-lg">{feature.split(' ')[0]}</span>
                        <span>{feature.substring(4)}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="mt-8 pt-8 border-t border-white/10 text-center text-white/60 text-xs">
                    Sin contrato. Cancela cuando quieras.
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* FAQ */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-20 pt-20 border-t border-white/10"
          >
            <SectionTitle
              title="Preguntas Frecuentes"
              subtitle="Todo lo que necesitas saber sobre nuestros planes"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[
                {
                  q: '¿Puedo cambiar de plan?',
                  a: 'Sí, puedes cambiar de plan en cualquier momento. El cambio se refleja en tu próxima facturación.',
                },
                {
                  q: '¿Hay una garantía de dinero de vuelta?',
                  a: 'Garantía de 7 días. Si no te gusta, devolvemos tu dinero completamente, sin preguntas.',
                },
                {
                  q: '¿Incluye acceso a Discord?',
                  a: 'Todos los planes incluyen acceso a Discord. La diferencia está en sesiones de mentoría y contenido premium.',
                },
                {
                  q: '¿Hay descuento anual?',
                  a: 'Sí, el plan anual te da 2 meses gratis. Contacta con soporte para más detalles.',
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="glass p-6 rounded-xl"
                >
                  <h4 className="text-white font-bold mb-3">{item.q}</h4>
                  <p className="text-white/70 text-sm">{item.a}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-container">
        <div className="max-w-section mx-auto text-center glass p-12 rounded-3xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white mb-6"
          >
            ¿Necesitas más información?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-white/70 mb-8 max-w-2xl mx-auto"
          >
            Contáctanos directamente en Discord o por email. Nuestro equipo está disponible para responder cualquier pregunta.
          </motion.p>
          <Button variant="primary" size="lg">
            Contactar ahora
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
