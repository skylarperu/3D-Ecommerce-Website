# Guía de Deployment a Spaceship Hosting

## Requisitos Previos
- Cuenta activa en Spaceship Hosting (https://www.spaceship.com/)
- Node.js v18+ configurado en tu cuenta
- Git instalado localmente

## Pasos de Deployment

### 1. Preparar el Proyecto Localmente
```bash
# Verificar que el build funciona correctamente
npm run build

# Probar que el servidor funciona
npm run start
# Debería estar disponible en http://localhost:3000
```

### 2. Conectar tu Repositorio a Spaceship
a) En el panel de Spaceship Hosting, ve a: **Applications** → **Create New App**

b) Selecciona:
   - **Framework**: Next.js
   - **Node Version**: 18.x o superior
   - **Public Directory**: `.next/standalone`

### 3. Configurar Variables de Entorno (si es necesario)
En el panel de Spaceship, ve a **Environment Variables** y añade:
```
NODE_ENV=production
PORT=3000
```

### 4. Configurar Build y Start Scripts
Spaceship debería detectar automáticamente desde package.json:
- **Build Command**: `npm run build`
- **Start Command**: `npm start`

### 5. Deploy
Tienes dos opciones:

#### Opción A: Git Push Deploy (Recomendado)
```bash
# Agregar remote de Spaceship
git remote add spaceship your-spaceship-git-url

# Push para deploy automático
git push spaceship main
```

#### Opción B: Subir archivos manualmente
1. En el panel de Spaceship, usa **File Manager**
2. Sube los siguientes archivos/carpetas:
   - `app/` 
   - `components/`
   - `public/`
   - `.next/` (después de hacer build)
   - `package.json`
   - `package-lock.json`
   - `next.config.js`
   - `tailwind.config.js`
   - `postcss.config.js`
   - `jsconfig.json`

3. En SSH/Terminal de Spaceship:
```bash
cd /home/username/public_html
npm install
npm run build
npm start
```

### 6. Configurar Dominio
1. En Spaceship Hosting → **Domains**
2. Apunta tu dominio `norvexperu.xyz` al servidor
3. Espera 24-48 horas para propagación DNS

### 7. SSL/HTTPS
Spaceship proporciona SSL automático:
- El certificado se genera automáticamente
- Se renueva cada 90 días

## Troubleshooting

### Error: "Port 3000 already in use"
```bash
# En Spaceship, reinicia la aplicación desde el panel
# O en terminal:
pm2 stop all
npm start
```

### Error: "Cannot find module"
```bash
# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
npm run build
```

### El sitio no carga después del deploy
1. Verifica los logs: **Logs** en el panel de Spaceship
2. Revisa que Node.js versión está configurada (debe ser 18+)
3. Reinicia la aplicación

## Monitoreo Post-Deploy

### Logs
- En Spaceship → **Application** → **Logs**
- Verifica que no haya errores en:
  - Build logs
  - Application logs
  - Error logs

### Performance
- Visita: https://norvexperu.xyz
- Abre DevTools (F12) → Network
- Verifica que los recursos se cargan correctamente
- Velocidad debería ser similar a la local

### Backups
Spaceship realiza backups automáticos, pero es buena práctica:
- Hacer backup de la BD (si la usas)
- Guardar archivos de configuración
- Mantener el repositorio Git actualizado

## Actualizaciones Futuras

Para actualizar el sitio después del deploy inicial:

```bash
# Hacer cambios localmente
# ...cambios al código...

# Build local para verificar
npm run build

# Commit y push
git add .
git commit -m "Descripción de cambios"
git push spaceship main

# Spaceship desplegará automáticamente
```

## Soporte

Si necesitas ayuda:
- **Documentación Spaceship**: https://support.spaceship.com/
- **Next.js Docs**: https://nextjs.org/docs
- **Ver logs en Spaceship**: Panel → Application → Logs

---
**Última actualización**: Enero 2026
**Framework**: Next.js 14.0.3
**Runtime**: Node.js 18+
