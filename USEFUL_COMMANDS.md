#!/bin/bash
# Comandos útiles para desarrollar Norvex Perú v2.0

# ====================
# INSTALACIÓN Y SETUP
# ====================

# 1. Instalar todas las dependencias
npm install --legacy-peer-deps

# 2. Configurar variables de entorno
cp .env.local.example .env.local
# Luego editar .env.local con tus credenciales

# 3. Generar Prisma Client
npx prisma generate

# 4. Sincronizar base de datos
npx prisma db push

# 5. Generar datos de prueba
npm run db:seed

# ====================
# DESARROLLO
# ====================

# Iniciar servidor de desarrollo
npm run dev

# Ver base de datos en GUI
npm run db:studio

# Hacer rebuild de Prisma
npx prisma generate

# ====================
# PRODUCCIÓN
# ====================

# Build
npm run build

# Start producción
npm start

# O con PM2
pm2 start ecosystem.config.js
pm2 logs
pm2 stop all

# ====================
# BASE DE DATOS
# ====================

# Ver estado BD
npx prisma db execute

# Resetear BD (¡Cuidado!)
npx prisma db push --force-reset

# Generar nueva migración
npx prisma migrate dev --name nombre_migracion

# Ver migraciones
npx prisma migrate status

# Rollback última migración
npx prisma migrate resolve --rolled-back nombre_migracion

# ====================
# STRIPE
# ====================

# Escuchar webhooks localmente
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Obtener test keys
# https://dashboard.stripe.com/test/keys

# ====================
# DOCKER
# ====================

# Build imagen
docker build -t norvex:latest .

# Run contenedor
docker run -p 3000:3000 \
  -e DATABASE_URL="postgresql://..." \
  -e STRIPE_SECRET_KEY="sk_test_..." \
  norvex:latest

# ====================
# TESTING Y DEBUG
# ====================

# Ver logs
pm2 logs

# Monitoreo
pm2 monit

# Restart servidor
pm2 restart all

# ====================
# DEPLOYMENT (Vercel)
# ====================

# Login
vercel login

# Deploy
vercel

# Deploy a producción
vercel --prod

# Ver variables de entorno
vercel env ls

# Agregar variable
vercel env add DATABASE_URL

# ====================
# GIT Y VERSIONADO
# ====================

# Ver cambios
git status

# Agregar cambios
git add .

# Commit
git commit -m "feat: agregar nueva feature"

# Push
git push origin main

# Ver commits
git log --oneline

# ====================
# ANALYTICS Y MONITOREO
# ====================

# Ver uso de CPU/Memory
top

# Ver procesos Node.js
ps aux | grep node

# Ver puertos en uso
netstat -tulpn | grep LISTEN

# Ver logs en tiempo real
tail -f logs/error.log

# ====================
# LIMPIEZA Y MANTENIMIENTO
# ====================

# Limpiar node_modules
rm -rf node_modules
npm install --legacy-peer-deps

# Limpiar caché npm
npm cache clean --force

# Limpiar build
rm -rf .next

# Auditar seguridad
npm audit

# Auditar y arreglar
npm audit fix

# ====================
# ÚTILES PARA DESARROLLO
# ====================

# Abrir en navegador
open http://localhost:3000

# Prueba rápida de API
curl http://localhost:3000/api/products

# Ver variables de entorno
env | grep NEXT_PUBLIC

# Buscar en archivos
grep -r "TODO" ./src

# ====================
# ONE-LINERS ÚTILES
# ====================

# Setup completo en una línea
npm install --legacy-peer-deps && npx prisma generate && npx prisma db push && npm run db:seed && npm run dev

# Kill todo en puerto 3000
lsof -ti:3000 | xargs kill -9

# Backup base de datos
pg_dump $DATABASE_URL > backup.sql

# Restaurar backup
psql $DATABASE_URL < backup.sql

# ====================
# CHECKLIST PRE-DEPLOY
# ====================

# [ ] npm run build - Sin errores?
# [ ] npx prisma db push - BD actualizada?
# [ ] npm audit - Sin vulnerabilidades?
# [ ] npm run db:seed - Datos de prueba OK?
# [ ] .env.local - Variables correctas?
# [ ] Stripe keys - Correctas y válidas?
# [ ] Email SMTP - Funciona?
# [ ] Google OAuth - Configurado?
# [ ] NEXTAUTH_SECRET - Generado?
# [ ] Sitemap y robots - Actualizados?

# ====================
# NOTAS IMPORTANTES
# ====================

# 1. Siempre usar --legacy-peer-deps al instalar
# 2. Verificar DATABASE_URL antes de hacer push
# 3. No commitear .env.local (está en .gitignore)
# 4. Backup BD antes de migrations
# 5. Usar PM2 para producción, no npm start
# 6. Monitorear logs regularmente
# 7. Actualizar dependencias mensualmente
# 8. Hacer tests antes de deploy
