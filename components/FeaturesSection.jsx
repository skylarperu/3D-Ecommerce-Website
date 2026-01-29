'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function FeaturesSection() {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const features = [
    {
      number: '01',
      title: 'Educación Premium',
      description: 'Acceso ilimitado a cursos de expertos internacionales en marketing digital, negocios y tecnología.',
      icon: '📚',
    },
    {
      number: '02',
      title: 'Comunidad Global',
      description: 'Conecta con miles de emprendedores, inversionistas y mentores de élite alrededor del mundo.',
      icon: '🌍',
    },
    {
      number: '03',
      title: 'Herramientas Profesionales',
      description: 'Suite completa de software, plantillas y recursos para automatizar tu negocio.',
      icon: '⚙️',
    },
    {
      number: '04',
      title: 'Mentoría 1 a 1',
      description: 'Acceso a mentores expertos que te guiarán paso a paso en tu camino al éxito.',
      icon: '👥',
    },
    {
      number: '05',
      title: 'Certificaciones',
      description: 'Obtén credenciales reconocidas internacionalmente que impulsen tu carrera.',
      icon: '🏆',
    },
    {
      number: '06',
      title: 'Soporte 24/7',
      description: 'Equipo dedicado disponible siempre para resolver tus dudas y necesidades.',
      icon: '💬',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative w-full overflow-hidden px-4 md:px-8 lg:px-16 py-32">
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-black">
        <div className="absolute inset-0 opacity-20">
          <div
            style={{
              backgroundImage: `
                linear-gradient(0deg, transparent 24%, rgba(255,255,255,.05) 25%, rgba(255,255,255,.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,.05) 75%, rgba(255,255,255,.05) 76%, transparent 77%, transparent),
                linear-gradient(90deg, transparent 24%, rgba(255,255,255,.05) 25%, rgba(255,255,255,.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,.05) 75%, rgba(255,255,255,.05) 76%, transparent 77%, transparent)
              `,
              backgroundSize: '80px 80px',
            }}
            className="w-full h-full"
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <motion.span
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="inline-block text-cyan-400 font-semibold text-sm tracking-widest uppercase mb-6"
          >
            ✨ Lo que ofrecemos
          </motion.span>
          <h2 className="text-6xl md:text-7xl font-black mb-6 text-white">
            Todo lo que necesitas
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto font-light">
            Una plataforma completa diseñada para acelerar tu crecimiento como emprendedor digital
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              whileHover={{ y: -8 }}
              className="relative group h-full cursor-pointer"
            >
              {/* Card */}
              <div className="relative w-full h-full bg-gradient-to-br from-white/5 to-white/2 border border-white/10 rounded-3xl p-8 backdrop-blur-xl hover:border-white/20 transition-all duration-300 overflow-hidden">
                {/* Gradient overlay on hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredIdx === idx ? 0.05 : 0 }}
                  className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-500 transition-opacity duration-300"
                />

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col">
                  {/* Number */}
                  <motion.div
                    className="text-4xl md:text-5xl font-black text-white/20 mb-6 tracking-wider"
                    animate={{
                      y: hoveredIdx === idx ? -5 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {feature.number}
                  </motion.div>

                  {/* Icon */}
                  <motion.div
                    animate={{
                      scale: hoveredIdx === idx ? 1.2 : 1,
                      rotate: hoveredIdx === idx ? 5 : 0,
                    }}
                    transition={{ duration: 0.4 }}
                    className="text-5xl mb-6"
                  >
                    {feature.icon}
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-4 leading-tight">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/60 flex-1 leading-relaxed font-light">
                    {feature.description}
                  </p>

                  {/* Link arrow */}
                  <motion.div
                    animate={{
                      x: hoveredIdx === idx ? 5 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 text-cyan-400 font-semibold text-sm tracking-wide"
                  >
                    Descubre más →
                  </motion.div>
                </div>

                {/* Border glow on hover */}
                <motion.div
                  animate={{
                    opacity: hoveredIdx === idx ? 1 : 0,
                  }}
                  className="absolute inset-0 rounded-3xl pointer-events-none"
                  style={{
                    boxShadow: hoveredIdx === idx ? '0 0 40px rgba(34, 211, 238, 0.2) inset' : 'none',
                  }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-24 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-4 text-black font-bold text-lg bg-gradient-to-r from-cyan-400 to-blue-400 rounded-xl hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 tracking-wide"
          >
            Ver todos los beneficios
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
