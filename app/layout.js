import { Inter } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import { Toaster } from 'react-hot-toast'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Norvex Perú - Educación para Emprendedores',
  description: 'Ecosistema educativo para emprendedores que quieren construir negocios reales y escalables. Sin MLM, sin falsas promesas, solo educación y mentoría.',
  keywords: 'emprendimiento, negocios, educación, escalabilidad, marketing, ecommerce, 3D, tienda online',
  authors: [{ name: 'Norvex Perú' }],
  openGraph: {
    title: 'Norvex Perú - Educación para Emprendedores',
    description: 'Construimos negocios reales, no promesas.',
    url: 'https://norvexperu.xyz',
    siteName: 'Norvex Perú',
    locale: 'es_PE',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="es" className="dark">
      <body className={`${inter.className} bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900`}>
        <CartProvider>
          <Navbar />
          {children}
          <Footer />
          <Toaster position="top-right" />
        </CartProvider>
      </body>
    </html>
  )
}
