'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function ImageGallery() {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const images = [
    {
      id: 1,
      title: 'Educación Online',
      icon: '📚',
      gradient: 'from-purple-600 to-pink-600',
      description: 'Aprende de los mejores',
    },
    {
      id: 2,
      title: 'Comunidad Global',
      icon: '🌍',
      gradient: 'from-blue-600 to-cyan-600',
      description: 'Conecta con emprendedores',
    },
    {
      id: 3,
      title: 'Herramientas Premium',
      icon: '⚙️',
      gradient: 'from-pink-600 to-red-600',
      description: 'Recursos de clase mundial',
    },
    {
      id: 4,
      title: 'Mentoría 1 a 1',
      icon: '👥',
      gradient: 'from-green-600 to-emerald-600',
      description: 'Guía personalizada',
    },
    {
      id: 5,
      title: 'Certificación',
      icon: '🏆',
      gradient: 'from-yellow-600 to-orange-600',
      description: 'Credibilidad comprobada',
    },
    {
      id: 6,
      title: 'Soporte 24/7',
      icon: '🤝',
      gradient: 'from-indigo-600 to-purple-600',
      description: 'Siempre aquí para ti',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden px-4 md:px-8 lg:px-16 py-20">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/50 to-slate-900" />
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-900/30 rounded-full blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-black mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Lo que Ofrecemos
            </span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Acceso a todo lo que necesitas para construir un negocio exitoso en línea
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {images.map((img, idx) => (
            <motion.div
              key={img.id}
              variants={itemVariants}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="relative group cursor-pointer h-64 md:h-72"
            >
              {/* Card container */}
              <motion.div
                animate={{
                  y: hoveredIdx === idx ? -8 : 0,
                }}
                className="relative w-full h-full rounded-2xl overflow-hidden"
              >
                {/* Gradient background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${img.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}
                />

                {/* Glass effect background */}
                <div className="absolute inset-0 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl" />

                {/* Content */}
                <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
                  {/* Icon */}
                  <motion.div
                    animate={{
                      scale: hoveredIdx === idx ? 1.2 : 1,
                      rotate: hoveredIdx === idx ? 360 : 0,
                    }}
                    transition={{ duration: 0.6 }}
                    className="text-6xl mb-4"
                  >
                    {img.icon}
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-300">
                    {img.title}
                  </h3>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: hoveredIdx === idx ? 1 : 0,
                      y: hoveredIdx === idx ? 0 : 10,
                    }}
                    transition={{ duration: 0.3 }}
                    className="text-white/70 text-sm"
                  >
                    {img.description}
                  </motion.p>
                </div>

                {/* Hover glow effect */}
                <motion.div
                  animate={{
                    opacity: hoveredIdx === idx ? 1 : 0,
                  }}
                  className={`absolute inset-0 bg-gradient-to-br ${img.gradient} opacity-0 blur-xl -z-10 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl`}
                />
              </motion.div>

              {/* Border animation on hover */}
              <motion.div
                animate={{
                  opacity: hoveredIdx === idx ? 1 : 0,
                  boxShadow: hoveredIdx === idx ? '0 0 30px rgba(168,85,247,0.4)' : '0 0 0px rgba(168,85,247,0)',
                }}
                className="absolute inset-0 rounded-2xl pointer-events-none transition-all duration-300"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <p className="text-white/60 mb-6">
            ¿Listo para comenzar tu transformación?
          </p>
          <motion.button
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
            className="relative px-8 py-4 text-white font-bold rounded-xl overflow-hidden group text-lg inline-block"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500" />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 opacity-0 group-hover:opacity-100 blur transition-opacity duration-300" />
            <span className="relative">Explorar planes</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
