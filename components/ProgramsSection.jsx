'use client';

import { motion } from 'framer-motion';
import SectionTitle from './SectionTitle';
import GlassCard from './GlassCard';

// Simple Icon Components
const BookIcon = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M4 4h16v16H4z"/></svg>;
const RocketIcon = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2c-1.66 1.66-2 3.5-2 5.5s.34 3.84 2 5.5c1.66-1.66 2-3.5 2-5.5s-.34-3.84-2-5.5zm6 15h-12v2h12z"/></svg>;
const ChartIcon = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M5 9h3v10H5zm5-4h3v14h-3zm5-2h3v16h-3z"/></svg>;
const UsersIcon = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>;

export default function ProgramsSection() {
  const programs = [
    {
      icon: BookIcon,
      title: 'Fundamentos de Negocio',
      description: 'Aprende los pilares básicos: idea, propuesta de valor, modelo de ingresos y plan de acción. Ideal para principiantes y emprendedores sin experiencia.',
      href: '#',
    },
    {
      icon: ChartIcon,
      title: 'Escalabilidad y Sistemas',
      description: 'Domina cómo documentar, automatizar y escalar tus procesos. Construye un negocio que no dependa solo de ti.',
      href: '#',
    },
    {
      icon: RocketIcon,
      title: 'Marketing y Automatización',
      description: 'Estrategias de venta, posicionamiento digital y automación de marketing. Atrae clientes sin depender de redes sociales virales.',
      href: '#',
    },
    {
      icon: UsersIcon,
      title: 'Mentoría y Comunidad',
      description: 'Acceso a mentores reales, sesiones 1:1, feedback en vivo y una comunidad activa que te empuja a crecer.',
      href: '#',
    },
    {
      icon: BookIcon,
      title: 'Productización',
      description: 'Convierte tu servicio en un producto escalable. Desde SaaS hasta productos digitales y físicos.',
      href: '#',
    },
    {
      icon: ChartIcon,
      title: 'Financiero y Rentabilidad',
      description: 'Entiende números, márgenes, cash flow y cómo tomar decisiones basadas en datos reales del negocio.',
      href: '#',
    },
  ];

  return (
    <section id="programs" className="section-container relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-section mx-auto relative z-10">
        <SectionTitle
          title="Nuestros Programas"
          subtitle="Educación modular diseñada para que elijas lo que necesitas y creces a tu ritmo."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, idx) => (
            <GlassCard
              key={idx}
              icon={program.icon}
              title={program.title}
              description={program.description}
              href={program.href}
              delay={idx * 0.05}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center glass p-8 rounded-2xl"
        >
          <h3 className="text-2xl font-bold text-white mb-3">
            Todos los programas incluyen:
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-white/70 text-sm">
            <div>📚 Contenido Premium</div>
            <div>💬 Comunidad Discord</div>
            <div>🎥 Sesiones en Vivo</div>
            <div>📁 Plantillas y Tools</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
