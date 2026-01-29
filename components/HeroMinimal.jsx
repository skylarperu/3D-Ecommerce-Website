'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function HeroMinimal() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen w-full overflow-hidden pt-32 px-4 md:px-8 lg:px-16 flex items-center justify-center">
      {/* Animated background with subtle gradients */}
      <div className="absolute inset-0 z-0">
        {/* Grid background */}
        <div className="absolute inset-0 bg-black">
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `
                linear-gradient(0deg, transparent 24%, rgba(255,255,255,.05) 25%, rgba(255,255,255,.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,.05) 75%, rgba(255,255,255,.05) 76%, transparent 77%, transparent),
                linear-gradient(90deg, transparent 24%, rgba(255,255,255,.05) 25%, rgba(255,255,255,.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,.05) 75%, rgba(255,255,255,.05) 76%, transparent 77%, transparent)
              `,
              backgroundSize: '50px 50px',
            }}
          />
        </div>

        {/* Animated gradient orbs */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-900/20 to-blue-900/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, delay: 2 }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-l from-purple-900/20 to-pink-900/20 rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-5xl mx-auto text-center"
      >
        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <motion.span
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="inline-block text-cyan-400 font-semibold text-sm tracking-widest uppercase"
          >
            ✨ Bienvenido a Norvex
          </motion.span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight"
        >
          <span className="text-white">Construimos</span>
          <br />
          <motion.span
            className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%'],
            }}
            transition={{ duration: 5, repeat: Infinity }}
            style={{
              backgroundSize: '200% 200%',
            }}
          >
            Negocios Reales
          </motion.span>
        </motion.h1>

        {/* Subtitle text */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed font-light"
        >
          Una plataforma educativa para emprendedores que quieren transformar sus ideas en negocios digitales exitosos.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col md:flex-row gap-6 justify-center mb-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 text-black font-bold text-lg bg-gradient-to-r from-cyan-400 to-blue-400 rounded-xl hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 tracking-wide"
          >
            Comenzar Gratis
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 text-white font-bold text-lg border-2 border-white/30 rounded-xl hover:border-white/60 hover:bg-white/5 transition-all duration-300 tracking-wide"
          >
            Ver Demo
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col md:flex-row gap-12 justify-center text-center"
        >
          {[
            { number: '50K+', label: 'Miembros activos' },
            { number: '100+', label: 'Cursos premium' },
            { number: '95%', label: 'Satisfacción' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: idx * 0.2 }}
            >
              <div className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                {stat.number}
              </div>
              <p className="text-white/50 text-sm mt-2 tracking-wide">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="text-white/30 text-center">
          <p className="text-xs tracking-widest uppercase mb-3">Scroll</p>
          <div className="w-6 h-10 border border-white/30 rounded-full flex justify-center p-2 mx-auto">
            <motion.div
              animate={{ y: [0, 3, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-2 bg-white/30 rounded-full"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
