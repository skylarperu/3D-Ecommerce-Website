'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'Twitter', href: '#', icon: '𝕏' },
    { name: 'Discord', href: '#', icon: '💬' },
    { name: 'LinkedIn', href: '#', icon: '💼' },
    { name: 'Instagram', href: '#', icon: '📸' },
  ];

  const footerLinks = [
    { name: 'Sobre nosotros', href: '#about' },
    { name: 'Términos de servicio', href: '#' },
    { name: 'Política de privacidad', href: '#' },
    { name: 'Contacto', href: '#' },
  ];

  return (
    <footer className="bg-slate-950/50 border-t border-white/10 backdrop-blur-xl">
      <div className="section-container">
        <div className="max-w-section mx-auto">
          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 pb-12 border-b border-white/10">
            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold gradient-text mb-3">NORVEX</h3>
              <p className="text-white/60 text-sm">
                Educación estratégica para emprendedores que quieren facturar de verdad.
              </p>
            </motion.div>

            {/* Links Column 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold text-white mb-4">Empresa</h4>
              <ul className="space-y-2">
                {[
                  { name: 'Sobre nosotros', href: '#about' },
                  { name: 'Programas', href: '#programs' },
                  { name: 'Comunidad', href: '#community' },
                ].map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-white/60 hover:text-purple-400 transition-colors duration-300 text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Links Column 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2">
                {[
                  { name: 'Privacidad', href: '#' },
                  { name: 'Términos', href: '#' },
                  { name: 'Disclaimer', href: '#' },
                ].map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-white/60 hover:text-purple-400 transition-colors duration-300 text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold text-white mb-4">Síguenos</h4>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-10 h-10 rounded-lg bg-purple-600/20 hover:bg-purple-600/40 flex items-center justify-center text-white/70 hover:text-purple-400 transition-all duration-300 border border-white/10"
                    title={social.name}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Bottom Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center justify-between gap-4 py-8"
          >
            <p className="text-white/50 text-sm">
              © {currentYear} Norvex Perú. Todos los derechos reservados.
            </p>
            <p className="text-white/50 text-sm">
              Dominio: <span className="text-purple-400 font-semibold">norvexperu.xyz</span>
            </p>
          </motion.div>

          {/* Disclaimer */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-8 pt-8 border-t border-white/10"
          >
            <div className="glass p-6 rounded-xl text-center">
              <p className="text-white/70 text-xs md:text-sm leading-relaxed">
                <span className="font-semibold text-purple-400">Disclaimer:</span> Norvex es un ecosistema educativo legítimo enfocado en enseñanza de negocios. No somos un esquema piramidal, no realizamos promesas falsas de ganancias y no ofrecemos oportunidades de inversión. Toda la educación y mentoría se basa en principios reales y aplicables.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
