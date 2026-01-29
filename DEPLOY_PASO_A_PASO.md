# 🚀 GUÍA DEFINITIVA - DEPLOY A SPACESHIP HOSTING

## 📋 ÍNDICE
1. [Preparación (5 min)](#preparación)
2. [Crear App en Spaceship (3 min)](#crear-app)
3. [Deploy (2 opciones)](#deploy)
4. [Verificación](#verificación)
5. [Troubleshooting](#troubleshooting)

---

## <a id="preparación"></a>1️⃣ PREPARACIÓN (5 min)

### Verificar que tu proyecto está listo:

```bash
# Navega a la carpeta del proyecto
cd /ruta/de/tu/proyecto

# Verifica que los archivos estén listos
ls -la package.json next.config.js ecosystem.config.js

# Output esperado:
# -rw-r--r-- 1 user user  520 Jan 27 10:00 package.json
# -rw-r--r-- 1 user user  420 Jan 27 10:01 next.config.js
# -rw-r--r-- 1 user user  380 Jan 27 10:02 ecosystem.config.js
```

### Hacer un build local para verificar:

```bash
# Limpiar build anterior (opcional)
rm -rf .next node_modules

# Instalar dependencias
npm install

# Compilar el proyecto
npm run build

# Output esperado:
# ✓ Compiled successfully
# ✓ Collecting page data
# ✓ Generating static pages (8/8)
```

Si todo funciona, está listo. ✅

---

## <a id="crear-app"></a>2️⃣ CREAR APP EN SPACESHIP (3 min)

### Paso 1: Crear cuenta
```
1. Ve a https://www.spaceship.com/
2. Haz clic en "Sign Up"
3. Llena el formulario
4. Verifica tu correo
```

### Paso 2: Acceder al Panel
```
1. Ve a https://panel.spaceship.com/
2. Entra con tu usuario/contraseña
3. Deberías ver el dashboard
```

### Paso 3: Crear la App
```
En el dashboard:
1. Busca "Applications" o "Apps"
2. Haz clic en "Create New App" (botón azul)
3. En el formulario:
   
   Application Name: norvex-peru
   Framework: Next.js
   Node Version: 18.18 LTS (o superior)
   
4. Haz clic en "Create Application"

Spaceship te mostrará un Git URL como:
   git@spaceship.com:tuusuario/norvex-peru.git
   (o similar según tu usuario)
```

---

## <a id="deploy"></a>3️⃣ DEPLOY (2 OPCIONES)

### 🟢 OPCIÓN 1: Deploy via Git (RECOMENDADO)

#### Paso 1: Agregar remote de Spaceship
```bash
cd /ruta/de/tu/proyecto

# Reemplaza con tu URL de Spaceship
git remote add spaceship git@spaceship.com:tuusuario/norvex-peru.git

# Verifica que se agregó correctamente
git remote -v
```

#### Paso 2: Hacer push
```bash
# Hacer commit de los cambios (si tienes cambios pendientes)
git add .
git commit -m "Deploy a Spaceship Hosting - Norvex Peru"

# Hacer push a Spaceship
git push spaceship main

# Output esperado:
# Enumerating objects: 150, done.
# Counting objects: 100% (150/150), done.
# Delta compression using 3 threads
# ...
# To spaceship.com:user/norvex-peru.git
#    main -> main
```

#### Paso 3: Esperar y verificar
```bash
# En el panel de Spaceship, verás:
# - Status: "Deploying"  → "Building" → "Starting" → "Running"
# 
# Espera 5-10 minutos. El sitio estará en:
# https://norvexperu.xyz (o el dominio que configures)
```

---

### 🔵 OPCIÓN 2: Upload Manual (Sin Git)

#### Paso 1: Compilar localmente
```bash
cd /ruta/de/tu/proyecto
npm run build

# Se genera la carpeta .next/
```

#### Paso 2: En panel de Spaceship
```
1. Ve a Applications → [tu-app] → Files
2. Sube los archivos/carpetas:
   ├── .next/               (IMPORTANTE)
   ├── node_modules/        (IMPORTANTE)
   ├── app/
   ├── components/
   ├── public/
   ├── package.json         (IMPORTANTE)
   ├── package-lock.json    (IMPORTANTE)
   ├── next.config.js       (IMPORTANTE)
   ├── tailwind.config.js
   ├── postcss.config.js
   └── jsconfig.json
```

#### Paso 3: Iniciar la app
```
1. En panel → Applications → [tu-app]
2. Haz clic en "Start" o "Restart"
3. Espera a que el status cambie a "Running"
```

---

## <a id="verificación"></a>4️⃣ VERIFICACIÓN

### Verificar que el deploy fue exitoso

```bash
# Opción 1: Visita en navegador
https://norvexperu.xyz

# Opción 2: Desde terminal (si tienes curl instalado)
curl -I https://norvexperu.xyz

# Output esperado:
# HTTP/2 200 
# content-type: text/html
# ...
```

### Checklist de Verificación
- [ ] El sitio carga en el navegador
- [ ] Navbar se ve bien
- [ ] Hero section se ve correcto
- [ ] Features cards están visibles
- [ ] Footer aparece
- [ ] Prueba en móvil (responsive)
- [ ] No hay errores en console (F12)
- [ ] URL es HTTPS (candadito verde)

---

## <a id="troubleshooting"></a>5️⃣ TROUBLESHOOTING

### ❌ "Sitio no carga" o "Error 500"

```bash
# Paso 1: Ver los logs
1. Panel → Applications → [tu-app] → Logs
2. Lee los mensajes de error

# Paso 2: Reiniciar
1. Panel → Applications → [tu-app] → Restart

# Paso 3: Verificar Node.js
1. Panel → Applications → [tu-app] → Settings
2. Asegúrate que Node.js sea 18.x o superior
```

### ❌ "Cannot find module X"

```bash
# En la terminal de Spaceship SSH (si tienes acceso):
cd /tu/app/directory
rm -rf node_modules package-lock.json
npm install
npm run build
npm start
```

### ❌ "Port already in use"

```bash
# Reinicia desde el panel:
1. Applications → [tu-app] → Restart

# O detén y reinicia:
2. Applications → [tu-app] → Stop
3. Espera 10 segundos
4. Applications → [tu-app] → Start
```

### ❌ "Build error"

```bash
# Verifica en logs que módulos faltan
# Luego, localmente:
npm install
npm run build  # Para verificar

# Si da error, arréglalo localmente
# Luego haz push de nuevo:
git add .
git commit -m "Fix build"
git push spaceship main
```

---

## 🎯 CONFIGURACIONES IMPORTANTES

### Conectar Dominio (paso siguiente)

Después del deploy, conecta tu dominio:

**Si compras dominio en Spaceship:**
```
1. Panel → Domains → Buy Domain
2. Busca "norvexperu.xyz"
3. Compra y se conecta automáticamente
```

**Si ya tienes el dominio:**
```
1. Panel → Domains → Connect Domain
2. Copia los nameservers de Spaceship:
   ns1.spaceship.com
   ns2.spaceship.com
   ns3.spaceship.com

3. En tu registrador (donde compraste el dominio):
   - Ve a DNS/Nameservers
   - Reemplaza con los de Spaceship
   - Guarda cambios

4. Espera 24-48 horas para propagación
```

### Variables de Entorno (opcional)

Si necesitas variables de entorno:
```
1. Panel → Applications → [tu-app] → Environment
2. Agrega tus variables:
   NODE_ENV=production
   (otras si las necesitas)
3. Haz clic en Save
```

---

## 📊 INFORMACIÓN DEL PROYECTO

```
Proyecto:          Norvex Perú
URL esperada:      https://norvexperu.xyz
Framework:         Next.js 14.0.3
Node.js requerido: ≥18.0.0
Build Time:        ~2-3 minutos
Tamaño Final:      ~135 kB (First Load JS)
```

---

## 🔄 ACTUALIZACIONES FUTURAS

Después del deploy inicial, para actualizar:

```bash
# Haz cambios locales
# ... edita archivos ...

# Commit
git add .
git commit -m "Tu mensaje de cambio"

# Push a Spaceship (redeploy automático)
git push spaceship main

# Spaceship automáticamente:
# 1. Descarga cambios
# 2. Instala dependencias
# 3. Compila
# 4. Reinicia la app
```

---

## 📞 SOPORTE Y RECURSOS

```
📖 Documentación Spaceship:
   https://support.spaceship.com/

📖 Documentación Next.js:
   https://nextjs.org/docs

💬 Chat de Spaceship:
   En el panel, hay un chat de soporte

❓ Preguntas frecuentes:
   Ver SPACESHIP_DEPLOYMENT.md
   Ver SPACESHIP_README.md
```

---

## ✅ RESUMEN RÁPIDO

| Paso | Comando/Acción | Tiempo |
|------|---|---|
| 1. Preparar proyecto | `npm install && npm run build` | 3-5 min |
| 2. Crear cuenta Spaceship | Ir a spaceship.com | 2 min |
| 3. Crear app | En panel de Spaceship | 3 min |
| 4. Agregar remote Git | `git remote add spaceship ...` | 1 min |
| 5. Deploy | `git push spaceship main` | 1 min |
| 6. Esperar | Spaceship compila | 5-10 min |
| 7. Verificar | Visitar en navegador | 1 min |
| **TOTAL** | | **~20 min** |

---

## 🎉 ¡LISTO!

Tu sitio **Norvex Perú** estará en vivo en Spaceship Hosting.

```
✅ Sitio compilado y listo
✅ Configuración optimizada
✅ Documentación completa
✅ Scripts de deployment
✅ Instrucciones paso a paso

🚀 ¡SOLO FALTA DEPLOYAR!
```

---

**Creado**: Enero 27, 2026  
**Última actualización**: Configuración Spaceship  
**Status**: 🟢 LISTO PARA PRODUCCIÓN
