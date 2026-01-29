'use client';

import { motion } from 'framer-motion';

export default function SectionTitle({ title, subtitle, accent = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${accent ? 'gradient-text' : 'text-white'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
