# 📋 COMANDOS LISTOS PARA COPIAR

Copia y pega estos comandos según tu situación.

---

## 🔧 PREPARACIÓN LOCAL

### Instalar dependencias
```bash
npm install
```

### Compilar el proyecto
```bash
npm run build
```

### Probar localmente
```bash
npm start
# Abre http://localhost:3000
```

### Limpiar y reinstalar (si algo falla)
```bash
rm -rf node_modules package-lock.json .next
npm install
npm run build
```

---

## 🚀 DEPLOYMENT VIA GIT

### 1. Agregar remote de Spaceship
```bash
# REEMPLAZA: git@spaceship.com:tuusuario/norvex-peru.git
# CON: El URL que te da Spaceship en el panel

git remote add spaceship git@spaceship.com:tuusuario/norvex-peru.git
```

### 2. Verificar que se agregó
```bash
git remote -v
```
**Debería mostrar:**
```
spaceship	git@spaceship.com:tuusuario/norvex-peru.git (fetch)
spaceship	git@spaceship.com:tuusuario/norvex-peru.git (push)
```

### 3. Hacer commit (si hay cambios)
```bash
git add .
git commit -m "Preparación para Spaceship Hosting"
```

### 4. Hacer push (¡DEPLOYMENT!)
```bash
git push spaceship main
```

**Espera 5-10 minutos. El sitio se compilará y estará en vivo.**

---

## 📁 VERIFICACIÓN DE ARCHIVOS

### Ver si los archivos de config existen
```bash
ls -la package.json next.config.js ecosystem.config.js
```

**Debería mostrar 3 archivos.**

### Ver si existe la carpeta .next (después de build)
```bash
ls -la .next/
```

### Ver si existen las guías de deployment
```bash
ls -la SPACESHIP*.md DEPLOY*.md
```

---

## 📊 INFORMACIÓN DE LA APP

### Ver versión de Node
```bash
node --version
```
**Debería ser 18.x o superior**

### Ver versión de npm
```bash
npm --version
```

### Ver dependencias principales
```bash
npm list next react framer-motion
```

---

## 🔄 ACTUALIZACIÓN DESPUÉS DEL DEPLOY

### Después de hacer cambios locales:
```bash
# Commit los cambios
git add .
git commit -m "Descripción de los cambios"

# Push a Spaceship (se redeploya automáticamente)
git push spaceship main

# Espera 2-3 minutos
```

---

## 🐛 TROUBLESHOOTING (si algo falla)

### Build fail local - Ver el error
```bash
npm run build 2>&1 | tail -50
```

### Limpiar caché y reintentar
```bash
rm -rf .next node_modules
npm install --legacy-peer-deps
npm run build
```

### Ver logs de Node
```bash
npm start | head -50
```

### Probar conexión a Git
```bash
git remote -v
ssh -T git@spaceship.com
```

---

## 📝 SCRIPTS DISPONIBLES

### Estos ya están en package.json:
```bash
# Desarrollo
npm run dev

# Compilación producción
npm run build

# Iniciar servidor
npm start

# Linting (verificar código)
npm run lint
```

---

## 🎯 FLUJO COMPLETO (COPIAR Y PEGAR)

### OPCIÓN A: Primero verificar localmente
```bash
# 1. Preparar
npm install
npm run build
npm start
# Visita http://localhost:3000 para verificar

# 2. Parar (Ctrl+C)
# Presiona Ctrl+C para parar el servidor

# 3. Hacer commit
git add .
git commit -m "Deploy a Spaceship - Norvex Peru"

# 4. Agregar remote (una sola vez)
git remote add spaceship git@spaceship.com:tuusuario/norvex-peru.git

# 5. Push (¡DEPLOYMENT!)
git push spaceship main
```

### OPCIÓN B: Sin verificación local
```bash
# 1. Commit
git add .
git commit -m "Deploy a Spaceship"

# 2. Agregar remote (una sola vez)
git remote add spaceship git@spaceship.com:tuusuario/norvex-peru.git

# 3. Push (¡DEPLOYMENT!)
git push spaceship main
```

---

## 🔐 VARIABLES DE ENTORNO (si las necesitas)

### Crear archivo .env.local
```bash
cat > .env.local << EOF
NODE_ENV=production
PORT=3000
EOF
```

### Ver variables
```bash
cat .env.local
```

**Nota:** Spaceship también permite configurar variables en el panel.

---

## 📦 INSTALACIÓN DE DEPENDENCIAS ESPECÍFICAS (si necesitas agregar)

### Agregar Framer Motion (ya está)
```bash
npm install framer-motion
```

### Agregar Tailwind (ya está)
```bash
npm install -D tailwindcss postcss autoprefixer
```

### Ver todas las dependencias
```bash
npm list
```

---

## 🔍 VERIFICACIONES IMPORTANTES

### Antes de hacer push, verifica:
```bash
# 1. El build funciona
npm run build

# 2. Node.js es 18+
node --version

# 3. Git remote está correcto
git remote -v

# 4. No hay cambios sin commit
git status

# 5. Estás en rama main
git branch
```

---

## 💾 RESPALDO DE CAMBIOS

### Si algo sale mal, puedes revertir:
```bash
# Ver historial
git log --oneline -10

# Revertir al commit anterior
git reset --hard HEAD~1

# O ir a un commit específico
git reset --hard [commit-hash]
```

---

## 📤 SI USAS FILE MANAGER (Sin Git)

### Después de compilar localmente:
```bash
# 1. Compilar
npm run build

# 2. Las carpetas a subir vía File Manager son:
# - .next/                  (IMPORTANTE)
# - node_modules/           (IMPORTANTE)
# - app/
# - components/
# - public/

# 3. Los archivos a subir:
# - package.json            (IMPORTANTE)
# - package-lock.json       (IMPORTANTE)
# - next.config.js          (IMPORTANTE)
# - tailwind.config.js
# - postcss.config.js
# - jsconfig.json
```

---

## ✅ CHECKLIST FINAL

```bash
# Ejecuta estos comandos antes de hacer push:

echo "✓ Verificando Node.js..."
node --version

echo "✓ Verificando npm..."
npm --version

echo "✓ Compilando..."
npm run build

echo "✓ Verificando remote..."
git remote -v

echo "✓ Estado de git..."
git status

echo "✓ Si todo dice OK, estás listo para:"
echo "git push spaceship main"
```

---

## 🎉 ¡LISTO!

Copia el comando que corresponda a tu situación:

**Si esto es tu primer deploy:**
```bash
git remote add spaceship git@spaceship.com:tuusuario/norvex-peru.git
git push spaceship main
```

**Si ya hiciste commit y solo falta push:**
```bash
git push spaceship main
```

**Si es una actualización (después del primer deploy):**
```bash
git add .
git commit -m "Cambios"
git push spaceship main
```

---

**¡Espera 5-10 minutos y visita https://norvexperu.xyz!** 🚀
