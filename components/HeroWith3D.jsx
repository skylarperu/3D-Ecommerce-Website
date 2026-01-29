'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function HeroWith3D() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden pt-24 px-4 md:px-8 lg:px-16 flex items-center justify-center">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        {/* Top gradient orb */}
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-purple-900 via-purple-700 to-transparent rounded-full blur-3xl opacity-30"
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        {/* Right gradient orb */}
        <motion.div
          className="absolute top-1/2 right-0 w-96 h-96 bg-gradient-to-l from-cyan-900 via-blue-800 to-transparent rounded-full blur-3xl opacity-20"
          animate={{
            x: [0, -50, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        />

        {/* Bottom left orb */}
        <motion.div
          className="absolute bottom-0 left-1/3 w-96 h-96 bg-gradient-to-t from-pink-900 via-purple-800 to-transparent rounded-full blur-3xl opacity-25"
          animate={{
            x: [0, -30, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, delay: 2 }}
        />
      </div>

      {/* 3D Grid background */}
      <div className="absolute inset-0 z-0 opacity-10">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(168,85,247,0.5)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* 3D floating card with cursor tracking */}
      {mounted && (
        <motion.div
          className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
          style={{
            perspective: '1000px',
          }}
        >
          <motion.div
            style={{
              rotateX: (mousePos.y - window.innerHeight / 2) * 0.02,
              rotateY: (mousePos.x - window.innerWidth / 2) * 0.02,
              transformStyle: 'preserve-3d',
            }}
            className="w-80 h-80 md:w-96 md:h-96"
          >
            {/* 3D cube effect with gradient */}
            <div className="relative w-full h-full">
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-cyan-500/20 border-2 border-purple-400/30 rounded-3xl backdrop-blur-xl"
                animate={{
                  boxShadow: [
                    '0 0 30px rgba(168,85,247,0.3)',
                    '0 0 60px rgba(168,85,247,0.5)',
                    '0 0 30px rgba(168,85,247,0.3)',
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />

              {/* Inner content */}
              <div className="absolute inset-4 bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-slate-950/80 rounded-2xl flex flex-col items-center justify-center p-8 border border-white/10">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="text-6xl mb-4"
                >
                  🚀
                </motion.div>
                <h3 className="text-2xl font-bold text-white text-center mb-2">
                  Construye tu futuro
                </h3>
                <p className="text-white/60 text-center text-sm">
                  Con tecnología y educación avanzada
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-20 max-w-4xl mx-auto text-center"
      >
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-black mb-6 leading-tight"
        >
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            Construimos Negocios
          </span>
          <br />
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            No Promesas
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          Únete a una comunidad global de emprendedores que están revolucionando la educación y los negocios online. Con Norvex, tienes acceso a herramientas, mentorías y recursos de clase mundial.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
            className="relative px-8 py-4 text-white font-bold rounded-xl overflow-hidden group text-lg"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 opacity-100 group-hover:opacity-90 transition-opacity duration-300" />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 opacity-0 group-hover:opacity-100 blur transition-opacity duration-300" />
            <span className="relative">Comenzar ahora 🚀</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 text-white font-bold rounded-xl border-2 border-gradient-to-r from-purple-400 to-cyan-400 backdrop-blur-xl hover:bg-white/10 transition-all duration-300 text-lg"
          >
            Ver planes
          </motion.button>
        </motion.div>

        {/* Floating badges */}
        <motion.div
          variants={itemVariants}
          className="mt-16 flex flex-wrap gap-4 justify-center"
        >
          {[
            { icon: '✨', text: 'Educación Premium' },
            { icon: '🌍', text: 'Comunidad Global' },
            { icon: '📈', text: 'Resultados Reales' },
          ].map((badge, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -4 }}
              className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white/80 font-semibold flex items-center gap-2"
            >
              <span>{badge.icon}</span>
              {badge.text}
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
        <div className="text-white/50 text-center">
          <div className="w-6 h-10 border border-white/30 rounded-full flex justify-center p-2 mx-auto">
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-2 bg-white/50 rounded-full"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
