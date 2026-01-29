#!/bin/bash

# Setup script para configuración inicial del proyecto
# Uso: bash scripts/setup.sh

set -e

echo "🚀 Iniciando setup de Norvex Perú..."

# Paso 1: Instalar dependencias
echo "📦 Instalando dependencias..."
npm install --legacy-peer-deps

# Paso 2: Generar Prisma Client
echo "🔧 Generando Prisma Client..."
npx prisma generate

# Paso 3: Configurar variables de entorno
if [ ! -f .env.local ]; then
    echo "📝 Creando .env.local..."
    cp .env.local.example .env.local
    echo "⚠️  Por favor, edita .env.local con tus configuraciones"
else
    echo "✅ .env.local ya existe"
fi

# Paso 4: Crear base de datos
echo "🗄️  Configurando base de datos..."
npx prisma db push

# Paso 5: Información de próximos pasos
echo ""
echo "✨ Setup completado!"
echo ""
echo "📖 Próximos pasos:"
echo "1. Edita .env.local con tus credenciales (Stripe, Google, SMTP)"
echo "2. Ejecuta: npm run dev"
echo "3. Accede a: http://localhost:3000"
echo ""
echo "📚 Documentación: ADVANCED_SETUP.md"
echo ""
