'use client';

import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SectionTitle from '../../components/SectionTitle';
import Button from '../../components/Button';

export default function AboutPage() {
  const values = [
    {
      icon: '🎯',
      title: 'Transparencia',
      description: 'No ocultamos nada. Sabes exactamente qué obtendrás y cómo funciona.',
    },
    {
      icon: '💪',
      title: 'Empoderamiento',
      description: 'Te damos herramientas para ser independiente y autosuficiente.',
    },
    {
      icon: '🚀',
      title: 'Escalabilidad',
      description: 'Enfoque en crear sistemas que crecen sin depender solo de ti.',
    },
    {
      icon: '🤝',
      title: 'Comunidad',
      description: 'No estás solo. Conecta, aprende y crece con otros emprendedores.',
    },
  ];

  const timeline = [
    {
      year: '2024',
      title: 'Fundación de Norvex',
      description: 'Se crea el concepto de Norvex como ecosistema educativo.',
    },
    {
      year: '2025',
      title: 'Lanzamiento',
      description: 'Se abre el servidor Discord con primeros 100 miembros.',
    },
    {
      year: '2025',
      title: 'Crecimiento',
      description: 'Alcanzamos 5000+ miembros activos en la comunidad.',
    },
    {
      year: '2026',
      title: 'Expansión',
      description: 'Lanzamos sitio web oficial y nuevos programas educativos.',
    },
  ];

  return (
    <main className="w-full overflow-hidden">
      <Navbar />

      {/* Header */}
      <section className="section-container pt-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.div
            animate={{ opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-section mx-auto relative z-10 text-center mb-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            Nuestra <span className="gradient-text">Historia</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-white/70 max-w-2xl mx-auto"
          >
            Cómo Norvex nació de la frustración de no encontrar educación real para emprendedores.
          </motion.p>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-container">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass p-8 md:p-12 rounded-2xl mb-20"
          >
            <h2 className="text-3xl font-bold text-white mb-6">La Historia detrás de Norvex</h2>

            <div className="space-y-4 text-white/80 leading-relaxed">
              <p>
                En el 2024, después de años viendo cómo emprendedores caían en MLMs, estafas educativas y promesas falsas, decidimos crear algo diferente.
              </p>

              <p>
                Norvex nace de la frustración de no encontrar un lugar donde aprender de verdad. No queremos vender sueños, queremos enseñar sistemas que funcionan en el mundo real.
              </p>

              <p>
                Nuestro enfoque es simple: educación honesta, mentoría de calidad, y una comunidad que te empuja a crecer. Sin esquemas piramidales, sin falsas promesas, solo trabajo duro y resultados reales.
              </p>

              <p>
                Hoy, con más de 5000 miembros activos, Norvex es la comunidad educativa más grande para emprendedores en Perú, y queremos seguir creciendo.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="section-container bg-gradient-primary rounded-3xl my-12 relative overflow-hidden">
        <div className="max-w-section mx-auto">
          <SectionTitle
            title="Nuestros Valores"
            subtitle="Lo que creemos y lo que guía nuestras decisiones"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="glass p-8 rounded-xl"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-white/70">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-container">
        <div className="max-w-4xl mx-auto">
          <SectionTitle
            title="Nuestra Evolución"
            subtitle="Cómo hemos crecido desde la idea hasta hoy"
          />

          <div className="space-y-8">
            {timeline.map((event, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="glass p-8 rounded-xl"
              >
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="flex-shrink-0 w-32">
                    <div className="text-3xl font-bold gradient-text">{event.year}</div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                    <p className="text-white/70">{event.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-container">
        <div className="max-w-4xl mx-auto">
          <SectionTitle
            title="Preguntas sobre Norvex"
            subtitle="Respuestas a las dudas más comunes"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                q: '¿Es Norvex una estafa?',
                a: 'No. Somos una empresa legítima registrada. Puedes verificar nuestro registro y legalidad. Tenemos miles de miembros verificables.',
              },
              {
                q: '¿Dónde está ubicada Norvex?',
                a: 'Norvex Perú está basada en Perú, aunque servimos a emprendedores de toda Latam y el mundo hispanohablante.',
              },
              {
                q: '¿Cuál es el modelo de negocio?',
                a: 'Ofrecemos membresías a programas educativos. Los miembros pagan por acceso a contenido, mentoría y comunidad. Nada más.',
              },
              {
                q: '¿Hay garantía de dinero de vuelta?',
                a: 'Sí, garantía de 7 días. Si no te gusta en la primera semana, devolvemos tu dinero sin preguntas.',
              },
              {
                q: '¿Por qué es tan asequible?',
                a: 'Creemos en democratizar la educación. Queremos que cualquier emprendedor tenga acceso, no solo los ricos.',
              },
              {
                q: '¿Qué hace Norvex diferente?',
                a: 'Transparencia total, mentores reales, comunidad activa, y enfoque en negocios aplicables. No vendemos ilusiones.',
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                viewport={{ once: true }}
                className="glass p-6 rounded-xl"
              >
                <h4 className="text-white font-bold mb-3">{item.q}</h4>
                <p className="text-white/70 text-sm">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-container">
        <div className="max-w-4xl mx-auto glass p-12 rounded-3xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white mb-6"
          >
            ¿Quieres ser parte de esta misión?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-white/70 mb-8 text-lg"
          >
            Únete a nosotros y sé parte de una comunidad que construye negocios reales.
          </motion.p>

          <Button variant="primary" size="lg">
            Unirme a Norvex
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  );
}