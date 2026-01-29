'use client';

import { motion } from 'framer-motion';
import SectionTitle from './SectionTitle';
import Button from './Button';

export default function CommunitySection() {
  const discordFeatures = [
    { emoji: '🎯', text: 'Canales organizados por tema y nivel' },
    { emoji: '👥', text: '5000+ emprendedores activos' },
    { emoji: '🎓', text: 'Mentores verificados y expertos' },
    { emoji: '📊', text: 'Sesiones en vivo 3-4 veces por semana' },
    { emoji: '🔧', text: 'Recursos y herramientas exclusivas' },
    { emoji: '🏆', text: 'Challenges y proyectos colaborativos' },
  ];

  const roles = [
    { name: 'Aprendiz', color: 'from-blue-600 to-blue-400' },
    { name: 'Constructor', color: 'from-purple-600 to-pink-400' },
    { name: 'Mentor', color: 'from-emerald-600 to-cyan-400' },
    { name: 'Fundador', color: 'from-orange-600 to-pink-400' },
  ];

  return (
    <section id="community" className="section-container relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-section mx-auto relative z-10">
        <SectionTitle
          title="Comunidad Discord"
          subtitle="El corazón del ecosistema Norvex. Donde conectas, aprendes y creces con otros emprendedores."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Side - Features */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {discordFeatures.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="glass p-4 rounded-xl flex items-center gap-4 group hover:border-purple-400/30 transition-all duration-300"
              >
                <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
                  {feature.emoji}
                </span>
                <span className="text-white/80 text-lg font-medium">
                  {feature.text}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Right Side - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass p-8 rounded-2xl"
          >
            <h3 className="text-2xl font-bold text-white mb-8 text-center">
              Roles en la Comunidad
            </h3>
            <div className="space-y-4">
              {roles.map((role, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 5 }}
                  className={`p-4 rounded-lg bg-gradient-to-r ${role.color} opacity-10 border border-white/20 hover:border-white/40 cursor-pointer transition-all duration-300`}
                >
                  <p className="text-white font-semibold">{role.name}</p>
                </motion.div>
              ))}
            </div>
            <p className="text-white/60 text-sm mt-8 text-center">
              Cada rol tiene acceso a diferentes recursos y responsabilidades. Crece progresivamente en la comunidad.
            </p>
          </motion.div>
        </div>

        {/* Large CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="glass p-12 rounded-2xl text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-600/20 to-cyan-600/20 opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              ¿Listo para entrar a la comunidad?
            </h3>
            <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
              Únete a más de 5000 emprendedores que están construyendo negocios reales. Acceso inmediato a Discord, contenido exclusivo y mentoría en vivo.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg">
                💬 Acceder al Discord
              </Button>
              <Button variant="secondary" size="lg">
                Saber más
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
