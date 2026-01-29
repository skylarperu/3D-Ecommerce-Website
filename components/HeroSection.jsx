'use client';

import { motion } from 'framer-motion';
import Button from './Button';

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        {/* Gradient Orbs */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-20 left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/2 right-1/4 w-64 h-64 bg-pink-600/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-section px-4 md:px-8 lg:px-16 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="inline-block">
            <div className="glass px-6 py-3 rounded-full text-sm font-semibold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                ✨ Bienvenido al ecosistema educativo
              </span>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold leading-tight">
            <span className="block text-white mb-4">Construimos negocios</span>
            <span className="gradient-text">reales, no promesas.</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed"
          >
            Educación estratégica para emprendedores que quieren facturar de verdad. Sin esquemas piramidales, sin falsas promesas, solo negocios reales.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col md:flex-row gap-4 justify-center pt-8"
          >
            <Button variant="primary" size="lg" className="md:w-auto">
              🚀 Unirme al ecosistema
            </Button>
            <Button variant="secondary" size="lg" className="md:w-auto">
              📚 Ver programas
            </Button>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-4 pt-12 text-center"
          >
            <div className="glass p-4 rounded-xl">
              <div className="text-3xl font-bold gradient-text">5K+</div>
              <div className="text-white/60 text-sm mt-1">Emprendedores</div>
            </div>
            <div className="glass p-4 rounded-xl">
              <div className="text-3xl font-bold gradient-text-alt">100%</div>
              <div className="text-white/60 text-sm mt-1">Legítimo</div>
            </div>
            <div className="glass p-4 rounded-xl">
              <div className="text-3xl font-bold gradient-text">24/7</div>
              <div className="text-white/60 text-sm mt-1">Soporte</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="flex flex-col items-center gap-2">
          <p className="text-white/50 text-sm">Desplázate para explorar</p>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-2 bg-purple-400 rounded-full"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
