#!/bin/bash

# Script de deploy a Spaceship Hosting
# Uso: bash deploy-spaceship.sh

set -e

echo "🚀 Iniciando deploy a Spaceship Hosting..."

# 1. Verificar que Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado"
    exit 1
fi

echo "✅ Node.js encontrado: $(node --version)"

# 2. Instalar dependencias
echo "📦 Instalando dependencias..."
npm install --production=false

# 3. Ejecutar build
echo "🔨 Compilando proyecto..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Error en el build. Abortando..."
    exit 1
fi

echo "✅ Build completado exitosamente"

# 4. Verificar estructura de carpetas
echo "✅ Verificando estructura del proyecto..."
if [ ! -d ".next" ]; then
    echo "❌ Carpeta .next no encontrada"
    exit 1
fi

# 5. Crear archivo .npmrc para mejor compatibilidad
echo "⚙️ Configurando npm..."
cat > .npmrc << EOF
legacy-peer-deps=true
registry=https://registry.npmjs.org/
EOF

# 6. Información de deploy
echo ""
echo "═══════════════════════════════════════"
echo "✨ INFORMACIÓN DE DEPLOYMENT"
echo "═══════════════════════════════════════"
echo ""
echo "Proyecto: norvex-peru"
echo "Framework: Next.js 14.0.3"
echo "Node.js requerido: >=18.0.0"
echo ""
echo "Archivos listos para subir:"
echo "  ✓ .next/ (compilado)"
echo "  ✓ node_modules/ (dependencias)"
echo "  ✓ app/"
echo "  ✓ components/"
echo "  ✓ public/"
echo "  ✓ package.json"
echo "  ✓ package-lock.json"
echo ""
echo "═══════════════════════════════════════"
echo ""

echo "📝 Pasos siguientes:"
echo ""
echo "1. Sube los archivos a Spaceship usando:"
echo "   - Git push: git push spaceship main"
echo "   - O File Manager en panel de Spaceship"
echo ""
echo "2. En Spaceship, configura:"
echo "   - Framework: Next.js"
echo "   - Node Version: 18.x"
echo "   - Build Command: npm run build"
echo "   - Start Command: npm start"
echo ""
echo "3. El sitio estará disponible en:"
echo "   - https://norvexperu.xyz"
echo ""

echo "✅ ¡Listo para deploy!"
