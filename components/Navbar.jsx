'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Inicio', href: '/' },
    { name: 'Productos', href: '/products' },
    { name: 'Sobre Nosotros', href: '#about' },
    { name: 'Servicios', href: '#services' },
    { name: 'Contacto', href: '/contact' },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/30 backdrop-blur-2xl border-b border-white/5 shadow-2xl'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <motion.div
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="relative cursor-pointer group"
          >
            <motion.span
              className="text-2xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent tracking-wider"
              animate={{ opacity: [1, 0.8, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              NORVEX
            </motion.span>
          </motion.div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item, idx) => (
            <motion.div
              key={idx}
              onMouseEnter={() => setActiveNavItem(idx)}
              onMouseLeave={() => setActiveNavItem(null)}
            >
              <motion.a
                href={item.href}
                className="relative px-4 py-2 text-white/70 font-medium text-sm tracking-wide group hover:text-white transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
              >
                {/* Underline animation */}
                <motion.span
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400"
                  initial={{ scaleX: 0 }}
                  animate={{
                    scaleX: activeNavItem === idx ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  style={{ originX: 0 }}
                />
                {item.name}
              </motion.a>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden lg:flex gap-3 items-center">
          <Link href="/cart">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 text-white/70 hover:text-white font-semibold text-sm transition-colors"
            >
              🛒 Carrito
            </motion.button>
          </Link>
          <Link href="/admin">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 text-white/70 hover:text-white font-semibold text-sm transition-colors"
            >
              📊 Admin
            </motion.button>
          </Link>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 text-white font-semibold text-sm border border-white/20 rounded-lg hover:border-white/40 hover:bg-white/5 transition-all duration-300"
          >
            Acceso
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 text-black font-bold text-sm bg-gradient-to-r from-cyan-400 to-blue-400 rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
          >
            Comenzar
          </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden flex flex-col gap-1.5 relative z-10"
        >
          <motion.span
            animate={{
              rotate: mobileMenuOpen ? 45 : 0,
              y: mobileMenuOpen ? 8 : 0,
            }}
            className="h-0.5 w-6 bg-white rounded-full"
          />
          <motion.span
            animate={{
              opacity: mobileMenuOpen ? 0 : 1,
            }}
            className="h-0.5 w-6 bg-white rounded-full"
          />
          <motion.span
            animate={{
              rotate: mobileMenuOpen ? -45 : 0,
              y: mobileMenuOpen ? -8 : 0,
            }}
            className="h-0.5 w-6 bg-white rounded-full"
          />
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: mobileMenuOpen ? 1 : 0,
          height: mobileMenuOpen ? 'auto' : 0,
        }}
        transition={{ duration: 0.3 }}
        className="lg:hidden overflow-hidden bg-black/50 backdrop-blur-xl border-t border-white/5"
      >
        <div className="flex flex-col gap-2 px-4 py-6">
          {navItems.map((item, idx) => (
            <motion.a
              key={idx}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="text-white/70 hover:text-white font-medium py-3 transition-colors duration-300"
            >
              {item.name}
            </motion.a>
          ))}
          <div className="flex flex-col gap-3 pt-4 border-t border-white/10 mt-4">
            <button className="w-full px-6 py-2 text-white font-semibold text-sm border border-white/20 rounded-lg hover:border-white/40">
              Acceso
            </button>
            <button className="w-full px-6 py-2 text-black font-bold text-sm bg-gradient-to-r from-cyan-400 to-blue-400 rounded-lg">
              Comenzar
            </button>
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
}
