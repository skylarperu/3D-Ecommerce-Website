# 🚀 INICIO RÁPIDO - SPACESHIP HOSTING

> Tu sitio **Norvex Perú** está 100% preparado para Spaceship Hosting

---

## ⚡ 3 PASOS PARA DEPLOY

### PASO 1: Crear Cuenta en Spaceship (1 min)
```
1. Ve a https://www.spaceship.com/
2. Crea una cuenta
3. Confirma tu correo electrónico
```

### PASO 2: Crear la App (2 min)
```
1. Entra al panel: https://panel.spaceship.com/
2. Ve a: Applications → Create New App
3. Completa:
   - Nombre: "norvex-peru"
   - Framework: Next.js
   - Node Version: 18.x LTS
4. Haz clic en "Create"
```

### PASO 3: Hacer Deploy (5 min)
**Opción A - Via Git (Más fácil):**
```bash
# Spaceship te dará un git URL como:
# git@spaceship.com:user/norvex-peru.git

# En tu terminal local:
cd /ruta/del/proyecto
git remote add spaceship [tu-spaceship-git-url]
git push spaceship main

# ¡Listo! Se deployará automáticamente
```

**Opción B - Via File Manager:**
```
1. En panel de Spaceship → File Manager
2. Sube la carpeta .next/ (después de npm run build)
3. Sube package.json y package-lock.json
4. Reinicia la app desde el panel
```

---

## ✅ Después del Deploy

Spaceship se encargará automáticamente de:
- ✅ Compilar el proyecto
- ✅ Instalar dependencias
- ✅ Generar SSL/HTTPS
- ✅ Iniciar la app
- ✅ Monitorear la app

**Tu sitio estará en vivo en ~5-10 minutos**

---

## 🌐 Conectar Dominio

### Opción 1: Dominio que compres en Spaceship
```
1. Panel → Domains → Buy Domain
2. Busca y compra "norvexperu.xyz"
3. Se asocia automáticamente
```

### Opción 2: Dominio que ya tengas
```
1. Panel → Domains → Connect Domain
2. Apunta los nameservers de Spaceship en tu registrador
3. Espera 24-48 horas para propagación DNS
```

---

## 📝 Archivos de Referencia

He creado estos archivos para ti:

| Archivo | Descripción |
|---------|------------|
| **SPACESHIP_README.md** | Guía rápida (leer primero) |
| **SPACESHIP_DEPLOYMENT.md** | Guía detallada paso a paso |
| **DEPLOYMENT_CHECKLIST.md** | Checklist completo |
| **deploy-spaceship.sh** | Script de deployment |
| **ecosystem.config.js** | Config PM2 (automática) |
| **next.config.js** | Optimizado para Spaceship |

---

## 🔍 Verificar que Funcione

Una vez deployado:

```bash
# Abre en navegador:
https://norvexperu.xyz

# Verifica:
✅ Página carga en menos de 3 segundos
✅ Navbar se ve bien
✅ Hero animations funcionan
✅ Features cards se muestran
✅ Mobile responsive
✅ Botones hacen click
```

---

## 🆘 Si Algo Sale Mal

### Sitio no carga
1. Ve a panel → Applications → Logs
2. Lee los errores
3. Haz clic en "Restart" 

### Error de Node.js
1. Verifica que Node 18.x esté configurado
2. Reinicia la app

### Problema con el código
1. Revisa los logs
2. Si es error de código, haz:
   ```bash
   npm run build  # Localmente
   git push spaceship main  # Vuelve a hacer deploy
   ```

---

## 📊 Información del Sitio

```
🏢 Proyecto:           Norvex Perú
🌐 URL:                https://norvexperu.xyz
💻 Framework:          Next.js 14.0.3
⚙️  Runtime:           Node.js 18+
📦 Build Size:         ~135 kB
🎨 Design:             Minimalista (Inspirado mined.world)
🔐 SSL:                Automático (Gratuito)
```

---

## 💡 Pro Tips

1. **Actualizar el sitio después**:
   ```bash
   # Cambios locales + commit
   git push spaceship main
   # Automáticamente se redeploya
   ```

2. **Ver logs en vivo**:
   ```bash
   # Spaceship → Applications → [tu-app] → Logs
   ```

3. **Reiniciar sin cambios**:
   ```bash
   # Spaceship → Applications → [tu-app] → Restart
   ```

4. **Variables de entorno** (si necesitas):
   ```bash
   # Spaceship → Applications → [tu-app] → Environment
   ```

---

## 🎯 Timeline Esperado

| Paso | Duración |
|------|----------|
| Crear cuenta Spaceship | 2 min |
| Crear app en Spaceship | 3 min |
| Hacer git push | 1 min |
| Spaceship compila | 2-3 min |
| App inicia | 1-2 min |
| Verificar en navegador | 1 min |
| **TOTAL** | **~10 minutos** |

---

## ✨ ¡Listo!

Tu sitio está 100% preparado. Solo:

1. Crea cuenta en Spaceship
2. Crea la app
3. Haz `git push spaceship main`
4. ¡Espera 5-10 minutos!
5. ¡Visita tu sitio en vivo! 🚀

---

## 📞 Soporte

- **Spaceship Docs**: https://support.spaceship.com/
- **Next.js Docs**: https://nextjs.org/docs
- **Este README**: Puedes guardarlo para referencia

---

**¡Tu sitio Norvex Perú estará en vivo muy pronto! 🎉**

Última actualización: Enero 27, 2026
