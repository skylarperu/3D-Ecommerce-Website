'use client';

import { motion } from 'framer-motion';
import SectionTitle from './SectionTitle';
import Button from './Button';

export default function CTASection() {
  const testimonials = [
    {
      quote: 'Norvex me dio la estructura que faltaba en mi negocio. En 6 meses pasé de tener ideas vagas a tener un sistema real facturable.',
      author: 'María Rodríguez',
      role: 'Consultora de Marketing',
    },
    {
      quote: 'No es un MLM, es lo opuesto. Educación real, mentores que saben de verdad, y una comunidad que te empuja a mejorar.',
      author: 'Juan Carlos Mendez',
      role: 'Emprendedor Tech',
    },
    {
      quote: 'Finalmente entendí cómo escalar sin trabajar 24/7. Los sistemas y procesos que aprendí son invaluables.',
      author: 'Sofia Gomez',
      role: 'Propietaria Micro-Empresa',
    },
  ];

  const stats = [
    { number: '5K+', label: 'Miembros activos' },
    { number: '200+', label: 'Horas de contenido' },
    { number: '90%', label: 'Tasa de satisfacción' },
    { number: '24/7', label: 'Comunidad activa' },
  ];

  return (
    <section className="section-container relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-section mx-auto relative z-10">
        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="glass p-6 rounded-xl text-center"
            >
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                {stat.number}
              </div>
              <div className="text-white/60 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials */}
        <SectionTitle
          title="Lo que dicen nuestros miembros"
          subtitle="Historias reales de emprendedores que están construyendo negocios con Norvex."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="glass p-8 rounded-xl relative"
            >
              <div className="absolute top-4 left-4 text-4xl opacity-20">"</div>

              <p className="text-white/80 mb-6 relative z-10 italic">
                {testimonial.quote}
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400" />
                <div>
                  <p className="text-white font-semibold text-sm">{testimonial.author}</p>
                  <p className="text-white/50 text-xs">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Why Choose Norvex */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="glass p-12 rounded-2xl mb-16"
        >
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Por qué elegir <span className="gradient-text">Norvex</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { icon: '✅', title: 'Transparencia Total', desc: 'No hay secretos, no hay esquemas ocultos. Todo es claro desde el principio.' },
              { icon: '🚀', title: 'Resultados Reales', desc: 'Miembros que han escalado sus negocios 10x, 100x. Historias verificables.' },
              { icon: '🎓', title: 'Contenido Actualizado', desc: 'El mercado cambia, nosotros nos actualizamos. Educación contemporánea.' },
              { icon: '🤝', title: 'Mentoría Real', desc: 'Mentores que todavía están en el ring. No predicadores teóricos.' },
              { icon: '💰', title: 'Precio Justo', desc: 'Inversión accesible que se justifica en semanas, no años.' },
              { icon: '🌍', title: 'Comunidad Global', desc: 'Conexiones con emprendedores de Perú, Latam y el mundo.' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                viewport={{ once: true }}
                className="flex gap-4"
              >
                <div className="text-4xl flex-shrink-0">{item.icon}</div>
                <div>
                  <h4 className="text-white font-bold mb-2">{item.title}</h4>
                  <p className="text-white/70 text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            ¿Listo para construir <br />
            <span className="gradient-text">tu negocio real?</span>
          </h2>

          <p className="text-xl text-white/70 max-w-2xl mx-auto mb-10">
            No es magia, no son atajos. Es educación, sistema y acción. Únete a Norvex ahora.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg">
              🚀 Empezar ahora
            </Button>
            <Button variant="secondary" size="lg">
              Ver planes de membresía
            </Button>
          </div>

          <p className="text-white/50 text-sm mt-8">
            ⏰ Primeros 50 miembros: 50% de descuento permanente
          </p>
        </motion.div>
      </div>
    </section>
  );
}
