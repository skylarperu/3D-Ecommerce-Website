'use client';

import { motion } from 'framer-motion';
import SectionTitle from './SectionTitle';
import Button from './Button';

export default function AboutSection() {
  const features = [
    {
      icon: '🎓',
      title: 'Educación Real',
      description: 'Enseñanza basada en principios probados y experiencias reales de emprendedores exitosos.',
    },
    {
      icon: '🔒',
      title: 'Sin Esquemas Piramidales',
      description: 'Transparencia total. No hay esquemas de multi-nivel ni estructura jerárquica de ganancias.',
    },
    {
      icon: '💯',
      title: 'Sin Falsas Promesas',
      description: 'No garantizamos dinero rápido. Garantizamos conocimiento aplicable y comunidad real.',
    },
    {
      icon: '⚙️',
      title: 'Enfoque Práctico',
      description: 'Cada concepto viene con casos de estudio, plantillas y herramientas que puedes usar hoy.',
    },
    {
      icon: '🤝',
      title: 'Comunidad Activa',
      description: 'Conecta con otros emprendedores, comparte experiencias y crece junto a mentores reales.',
    },
    {
      icon: '📈',
      title: 'Escalabilidad',
      description: 'Aprende a construir sistemas y procesos que crecen con tu negocio sin depender solo de ti.',
    },
  ];

  return (
    <section id="about" className="section-container relative overflow-hidden">
      <div className="max-w-section mx-auto">
        <SectionTitle
          title="¿Quién es Norvex?"
          subtitle="Un ecosistema educativo para emprendedores que quieren construir negocios reales y facturar de verdad."
        />

        {/* Main Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="glass p-8 md:p-12 rounded-2xl mb-16 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-full blur-3xl" />

          <div className="relative z-10">
            <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-6">
              Norvex no es un MLM, no es una estafa, no es una promesa vacía. Somos una comunidad educativa enfocada en enseñar a emprendedores, micro-empresarios y dueños de startups cómo construir negocios escalables, sistemas organizados y procesos que generan ingresos reales.
            </p>

            <p className="text-lg md:text-xl text-white/80 leading-relaxed">
              Creemos que el mejor camino hacia el éxito no es través de esquemas rápidos, sino del conocimiento real, la mentoría sincera y la comunidad de apoyo. Nuestro objetivo es empoderarte con las herramientas, el conocimiento y la red que necesitas para convertir tu idea en un negocio facturable.
            </p>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="glass p-6 rounded-xl h-full group-hover:border-purple-400/30 transition-all duration-300">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:gradient-text transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-white/70 text-lg mb-6">
            ¿Quieres ser parte de una comunidad que construye negocios reales?
          </p>
          <Button variant="primary" size="lg">
            Explorar nuestros programas →
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
