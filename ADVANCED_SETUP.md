# 🚀 Norvex Perú - E-Commerce Avanzado 3D

**Versión 2.0** - Plataforma de e-commerce educativa con 3D interactivo, autenticación, pagos y dashboard admin.

## 📋 Contenido

- [Features](#features)
- [Stack Tecnológico](#stack-tecnológico)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [API Endpoints](#api-endpoints)
- [Componentes Principales](#componentes-principales)
- [Deployment](#deployment)

## ✨ Features

### 🛍️ E-Commerce
- ✅ Catálogo de productos dinámico
- ✅ Carrito de compras con Context API
- ✅ Checkout multistep
- ✅ Integración Stripe
- ✅ Órdenes y seguimiento
- ✅ Wishlist
- ✅ Reseñas de productos

### 🔐 Autenticación
- ✅ NextAuth.js con Google OAuth
- ✅ Registro/Login
- ✅ Contraseñas hasheadas (bcrypt)
- ✅ Sesiones seguras

### 📊 Dashboard Admin
- ✅ Estadísticas en tiempo real
- ✅ Gestión de productos
- ✅ Gestión de órdenes
- ✅ Análisis de ventas

### 🎨 3D & Animaciones
- ✅ Three.js para visualización 3D
- ✅ Modelos 3D interactivos
- ✅ Animaciones con Framer Motion
- ✅ Glassmorphism design

### 📧 Notificaciones
- ✅ Confirmación de órdenes por email
- ✅ Notificaciones de envío
- ✅ Toast notifications en tiempo real

### 🔍 SEO
- ✅ Metadatos dinámicos
- ✅ Schema markup
- ✅ Sitemap
- ✅ Open Graph

## 🛠️ Stack Tecnológico

| Categoría | Tecnología |
|-----------|------------|
| **Frontend** | Next.js 14, React 18, TypeScript |
| **Estilos** | TailwindCSS, Framer Motion |
| **3D** | Three.js |
| **Backend** | Next.js API Routes |
| **DB** | PostgreSQL, Prisma ORM |
| **Auth** | NextAuth.js |
| **Pagos** | Stripe |
| **Email** | Nodemailer |
| **Forms** | React Hook Form, Zod |
| **UI** | React Icons, React Hot Toast |

## 📦 Instalación

```bash
# Clonar repositorio
git clone https://github.com/muhammadanas-x/3D-Ecommerce-Website.git
cd 3D-Ecommerce-Website

# Instalar dependencias
npm install --legacy-peer-deps

# Configurar variables de entorno
cp .env.local.example .env.local
# Editar .env.local con tus credenciales

# Configurar base de datos
npx prisma db push

# Ejecutar en desarrollo
npm run dev
```

## 🔧 Configuración

### 1. Base de Datos (PostgreSQL)

```bash
# Crear usuario y base de datos
createuser norvex
createdb norvex_db

# Actualizar .env.local
DATABASE_URL="postgresql://norvex:password@localhost:5432/norvex_db"
```

### 2. Autenticación (NextAuth)

```bash
# Generar secret
openssl rand -base64 32

# Agregarlo a .env.local
NEXTAUTH_SECRET="tu_secret_aqui"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. Pagos (Stripe)

```bash
# Obtener keys de https://dashboard.stripe.com
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

### 4. Email (Nodemailer)

```bash
# Configurar SMTP
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="tu-email@gmail.com"
SMTP_PASSWORD="tu-app-password"
EMAIL_FROM="noreply@norvex.pe"
```

## 📁 Estructura del Proyecto

```
.
├── app/
│   ├── api/                  # API Routes
│   │   ├── auth/             # Autenticación
│   │   ├── products/         # Productos
│   │   ├── orders/           # Órdenes
│   │   ├── admin/            # Admin
│   │   └── webhooks/         # Webhooks Stripe
│   ├── admin/                # Página admin
│   ├── products/             # Catálogo
│   ├── cart/                 # Carrito
│   ├── checkout/             # Checkout
│   ├── contact/              # Contacto
│   └── layout.js             # Layout principal
├── components/
│   ├── 3d/                   # Componentes 3D
│   │   └── Model3D.tsx
│   ├── admin/                # Componentes admin
│   │   ├── AdminDashboard.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ShoppingCart.tsx
│   │   ├── CheckoutForm.tsx
│   │   └── ProductReviews.tsx
│   └── ...otros componentes
├── context/
│   └── CartContext.tsx       # Context del carrito
├── lib/
│   ├── auth/                 # Configuración auth
│   ├── db/                   # Prisma client
│   └── utils/                # Utilidades (email, stripe)
├── prisma/
│   └── schema.prisma         # Schema BD
└── public/                   # Assets estáticos
```

## 🔌 API Endpoints

### Productos
```
GET    /api/products              # Obtener todos
POST   /api/products              # Crear producto
GET    /api/products/[id]         # Obtener uno
PUT    /api/products/[id]         # Actualizar
DELETE /api/products/[id]         # Eliminar
```

### Órdenes
```
GET    /api/orders                # Obtener órdenes del usuario
POST   /api/orders                # Crear orden
```

### Admin
```
GET    /api/admin/dashboard       # Estadísticas
```

### Webhooks
```
POST   /api/webhooks/stripe       # Webhooks de Stripe
```

## 🎨 Componentes Principales

### Model3D
Visualizador 3D interactivo con Three.js

```tsx
import { Model3D } from '@/components/3d/Model3D';

<Model3D autoRotate={true} />
```

### ProductCard
Tarjeta de producto con acción de carrito

```tsx
import { ProductCard } from '@/components/admin/ProductCard';

<ProductCard
  id="1"
  name="Producto"
  price={99.99}
  image="/img.jpg"
  description="Desc"
  inStock={true}
/>
```

### ShoppingCart
Carrito interactivo

```tsx
import { ShoppingCart } from '@/components/admin/ShoppingCart';

<ShoppingCart />
```

### CheckoutForm
Formulario de pago multistep

```tsx
import { CheckoutForm } from '@/components/admin/CheckoutForm';

<CheckoutForm />
```

### AdminDashboard
Panel de administración

```tsx
import { AdminDashboard } from '@/components/admin/AdminDashboard';

<AdminDashboard />
```

## 🔐 Autenticación

### Usar sesión del usuario

```tsx
import { useSession } from 'next-auth/react';

export default function Component() {
  const { data: session } = useSession();
  
  return <p>{session?.user?.email}</p>;
}
```

### Proteger rutas

```tsx
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth';

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== 'ADMIN') {
    return <div>Acceso denegado</div>;
  }
  
  return <div>Panel Admin</div>;
}
```

## 🛒 Usar el Carrito

```tsx
import { useCart } from '@/context/CartContext';

export default function Component() {
  const { items, total, addItem, removeItem } = useCart();
  
  return (
    <button onClick={() => addItem({
      id: '1',
      name: 'Producto',
      price: 99.99,
      quantity: 1,
      image: '/img.jpg'
    })}>
      Agregar al carrito
    </button>
  );
}
```

## 📨 Enviar Email

```typescript
import { sendOrderConfirmation } from '@/lib/utils/email';

await sendOrderConfirmation('user@example.com', 'ORD-12345');
```

## 💳 Procesar Pagos

```typescript
import { createCheckoutSession } from '@/lib/utils/stripe';

const session = await createCheckoutSession([
  { id: '1', name: 'Producto', price: 99.99, quantity: 1 }
]);

// Redirigir a: session.url
```

## 🚀 Deployment

### Vercel (Recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Con variables de entorno
vercel env add DATABASE_URL
vercel env add NEXTAUTH_SECRET
# ...
```

### Docker

```bash
# Build
docker build -t norvex .

# Run
docker run -p 3000:3000 -e DATABASE_URL=... norvex
```

### PM2 (Spaceship)

```bash
npm run build
pm2 start ecosystem.config.js
```

## 📊 Monitorización

### Logs
```bash
pm2 logs

# O revisar archivo de logs
tail -f logs/error.log
```

### Métricas
El dashboard admin muestra en tiempo real:
- Total de órdenes
- Ingresos totales
- Total de usuarios
- Órdenes recientes

## 🐛 Troubleshooting

### Error de conexión BD
```bash
# Verificar conexión PostgreSQL
psql $DATABASE_URL -c "SELECT 1"

# Reiniciar conexión
npx prisma db push --skip-generate
```

### Error de Stripe
```bash
# Verificar webhook secret
echo $STRIPE_WEBHOOK_SECRET

# Probar con CLI de Stripe
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

### Error de NextAuth
```bash
# Regenerar secret
openssl rand -base64 32

# Limpiar sesiones
npx prisma db push --skip-generate
```

## 📚 Recursos

- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [NextAuth.js](https://next-auth.js.org)
- [Stripe Docs](https://stripe.com/docs)
- [Three.js](https://threejs.org/docs)
- [Framer Motion](https://www.framer.com/motion)

## 🤝 Contribuir

```bash
git checkout -b feature/nueva-feature
git commit -am "Agregar feature"
git push origin feature/nueva-feature
```

## 📄 Licencia

MIT © 2024 Norvex Perú

## 👥 Autor

**Muhammad Anas** - [@muhammadanas-x](https://github.com/muhammadanas-x)

---

**¿Preguntas?** Abre un issue en GitHub o contáctanos en support@norvex.pe
