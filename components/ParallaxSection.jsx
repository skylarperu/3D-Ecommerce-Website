'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function ParallaxSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.2]);

  const features = [
    {
      number: '01',
      title: 'Acceso Ilimitado',
      description: 'A todo nuestro contenido premium, cursos y recursos exclusivos',
      icon: '🔓',
    },
    {
      number: '02',
      title: 'Comunidad Exclusiva',
      description: 'Conecta con emprendedores, inversionistas y mentores de elite',
      icon: '🌟',
    },
    {
      number: '03',
      title: 'Herramientas Avanzadas',
      description: 'Software y plataformas profesionales incluidas en tu membresía',
      icon: '⚡',
    },
    {
      number: '04',
      title: 'Mentoría Personalizada',
      description: 'Acceso a expertos que te guiarán en tu camino al éxito',
      icon: '🎯',
    },
  ];

  return (
    <section ref={ref} className="relative min-h-screen w-full overflow-hidden py-20 px-4 md:px-8 lg:px-16">
      {/* Background with parallax */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900" />
        
        {/* Animated orbs */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, -100, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, delay: 2 }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 max-w-7xl mx-auto"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-black mb-4">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              ¿Por qué Norvex?
            </span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Nosotros construimos negocios reales, no vendemos humo. Aquí está la prueba.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ x: 10 }}
              className="relative group"
            >
              {/* Background card */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-cyan-600/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content card */}
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-purple-400/50 transition-all duration-300">
                {/* Number badge */}
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: idx * 0.2 }}
                  className="text-6xl font-black bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4"
                >
                  {feature.number}
                </motion.div>

                {/* Icon */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity }}
                  className="text-5xl mb-4 inline-block"
                >
                  {feature.icon}
                </motion.div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-3">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-white/70 leading-relaxed">
                  {feature.description}
                </p>

                {/* Link arrow */}
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mt-4 text-cyan-400 font-semibold"
                >
                  Descubre más →
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section with 3D effect */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 relative"
        >
          <div className="relative bg-gradient-to-r from-purple-900/30 via-slate-900/30 to-cyan-900/30 backdrop-blur-xl border border-white/10 rounded-3xl p-12 md:p-16 overflow-hidden group">
            {/* Animated border */}
            <motion.div
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                backgroundImage: 'linear-gradient(45deg, transparent, rgba(168,85,247,0.3), transparent)',
                backgroundSize: '200% 200%',
              }}
            />

            {/* Content */}
            <div className="relative">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex-1">
                  <h3 className="text-4xl font-bold text-white mb-4">
                    Comienza tu transformación hoy
                  </h3>
                  <p className="text-white/70 text-lg mb-6">
                    Miles de emprendedores ya están construyendo sus imperios con Norvex. ¿Será el próximo?
                  </p>
                  <div className="flex flex-col md:flex-row gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-3 bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
                    >
                      Unirme Ahora
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-3 border-2 border-purple-400 text-white font-bold rounded-lg hover:bg-purple-400/10 transition-all duration-300"
                    >
                      Ver demostración
                    </motion.button>
                  </div>
                </div>

                {/* Animated stats */}
                <div className="flex-1 grid grid-cols-2 gap-6">
                  {[
                    { value: '50K+', label: 'Miembros activos' },
                    { value: '100+', label: 'Cursos disponibles' },
                    { value: '95%', label: 'Satisfacción' },
                    { value: '24/7', label: 'Soporte' },
                  ].map((stat, idx) => (
                    <motion.div
                      key={idx}
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 3, repeat: Infinity, delay: idx * 0.2 }}
                      className="text-center"
                    >
                      <div className="text-3xl font-black bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                        {stat.value}
                      </div>
                      <p className="text-white/60 text-sm mt-2">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
