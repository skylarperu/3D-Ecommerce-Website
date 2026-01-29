'use client';

import { motion } from 'framer-motion';

export default function GlassCard({ icon: Icon, title, description, href, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
      viewport={{ once: true }}
      className="group relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300" />

      <div className="glass p-8 rounded-2xl relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Content */}
        <div className="relative z-10">
          {Icon && (
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center mb-4"
            >
              <Icon className="w-8 h-8 text-white" />
            </motion.div>
          )}

          <h3 className="text-xl font-bold mb-3 text-white group-hover:gradient-text transition-all duration-300">
            {title}
          </h3>

          <p className="text-white/70 text-sm leading-relaxed mb-6">
            {description}
          </p>

          {href && (
            <motion.a
              whileHover={{ x: 5 }}
              href={href}
              className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium text-sm transition-colors duration-300"
            >
              Ver más
              <motion.span
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
