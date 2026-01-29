import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Sembrando base de datos...');

  // Limpiar datos anteriores
  await prisma.review.deleteMany();
  await prisma.wishlistItem.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.order.deleteMany();
  await prisma.address.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  // Crear usuario admin
  const adminPassword = await hash('admin123456', 10);
  const admin = await prisma.user.create({
    data: {
      email: 'admin@norvex.pe',
      name: 'Admin',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  console.log('✅ Admin creado:', admin.email);

  // Crear usuario normal
  const userPassword = await hash('user123456', 10);
  const user = await prisma.user.create({
    data: {
      email: 'user@example.com',
      name: 'Juan Pérez',
      password: userPassword,
      role: 'USER',
    },
  });

  console.log('✅ Usuario creado:', user.email);

  // Crear productos
  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: 'Curso de Emprendimiento',
        slug: 'curso-emprendimiento',
        description: 'Aprende a construir un negocio escalable desde cero',
        price: 97.99,
        stock: 100,
        category: 'courses',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=500&fit=crop',
        tags: ['emprendimiento', 'negocios', 'educación'],
        seoTitle: 'Curso de Emprendimiento - Norvex',
        seoDesc: 'Aprende a construir negocios reales y escalables',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Plantilla de Business Plan',
        slug: 'plantilla-business-plan',
        description: 'Plantilla profesional para tu plan de negocios',
        price: 29.99,
        stock: 200,
        category: 'templates',
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=500&fit=crop',
        tags: ['plantilla', 'negocios'],
      },
    }),
    prisma.product.create({
      data: {
        name: 'Masterclass - Marketing Digital',
        slug: 'masterclass-marketing',
        description: 'Estrategias avanzadas de marketing digital 2024',
        price: 149.99,
        stock: 50,
        category: 'courses',
        image: 'https://images.unsplash.com/photo-1533750849409-4f8019a79fe3?w=500&h=500&fit=crop',
        tags: ['marketing', 'digital', 'publicidad'],
      },
    }),
  ]);

  console.log('✅ Productos creados:', products.length);

  // Crear orden de ejemplo
  const order = await prisma.order.create({
    data: {
      userId: user.id,
      orderNumber: `ORD-${Date.now()}`,
      status: 'DELIVERED',
      paymentStatus: 'PAID',
      subtotal: 97.99,
      tax: 7.84,
      shipping: 10.0,
      total: 115.83,
      items: {
        create: [
          {
            productId: products[0].id,
            quantity: 1,
            price: 97.99,
          },
        ],
      },
    },
  });

  console.log('✅ Orden creada:', order.orderNumber);

  // Crear reseña
  await prisma.review.create({
    data: {
      productId: products[0].id,
      userId: user.id,
      rating: 5,
      title: 'Excelente curso',
      comment: 'El contenido es muy práctico y aplicable. Recomendado 100%',
    },
  });

  console.log('✅ Reseña creada');

  console.log('');
  console.log('🎉 Datos de prueba generados exitosamente!');
  console.log('');
  console.log('Credenciales de prueba:');
  console.log('Admin: admin@norvex.pe / admin123456');
  console.log('User: user@example.com / user123456');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
