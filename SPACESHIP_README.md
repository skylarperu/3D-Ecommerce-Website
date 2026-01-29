# 🚀 DEPLOYMENT A SPACESHIP HOSTING - GUÍA RÁPIDA

## Estado del Proyecto
- ✅ Proyecto compilado y optimizado
- ✅ Estructura preparada para Spaceship
- ✅ Archivos de configuración listos

## Información del Sitio
```
Proyecto: Norvex Perú
URL: https://norvexperu.xyz
Framework: Next.js 14.0.3
Node.js: 18.x o superior
Tamaño Build: ~132 kB (First Load JS)
```

## 3 PASOS PARA DEPLOYAR

### PASO 1: Crear Aplicación en Spaceship
1. Accede a https://panel.spaceship.com/
2. Ve a **Applications** → **Create New App**
3. Selecciona:
   - **Name**: `norvex-peru`
   - **Framework**: Next.js
   - **Node Version**: 18.x LTS
   - **Public Directory**: `.next`

### PASO 2: Conectar tu Repositorio Git
```bash
# En tu terminal local
cd /tu/ruta/del/proyecto

# Agregar remote de Spaceship
git remote add spaceship [tu-spaceship-git-url]

# Hacer push para deploy automático
git push spaceship main
```

**O** Subir manualmente via File Manager del panel.

### PASO 3: Configurar el Dominio
1. En Spaceship → **Domains**
2. Apunta `norvexperu.xyz` al servidor
3. Habilitar SSL (automático)
4. ¡Listo! El sitio estará en vivo en ~5 minutos

---

## VERIFICACIÓN DEL SITIO

Una vez deployado, verifica que:
- [ ] El sitio carga en https://norvexperu.xyz
- [ ] Navbar visible y responsive
- [ ] Hero section con animaciones
- [ ] Features cards cargan correctamente
- [ ] Botones funcionan
- [ ] Mobile menu funciona

## COMANDOS ÚTILES

### Compilar localmente antes de deploy
```bash
npm run build
npm run start  # Probar localmente
```

### Ver logs en Spaceship
```bash
# En el panel: Applications → [tu-app] → Logs
# O via SSH si tienes acceso terminal
tail -f logs/error.log
```

### Reiniciar aplicación
```bash
# En panel de Spaceship:
# Applications → [tu-app] → Restart
```

---

## ESTRUCTURA DE ARCHIVOS DEPLOYADOS

```
public_html/
├── .next/                 (Compilado automáticamente)
├── node_modules/          (Dependencias)
├── components/
├── app/
├── public/
├── package.json
├── package-lock.json
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
└── jsconfig.json
```

---

## VARIABLES DE ENTORNO (OPCIONAL)

Si necesitas variables de entorno, en Spaceship:
1. **Applications** → [tu-app] → **Environment**
2. Agregar:
   ```
   NODE_ENV=production
   PORT=3000
   ```

---

## SOPORTE Y TROUBLESHOOTING

### El sitio no carga
- Verifica los logs en Spaceship
- Asegúrate que Node 18+ esté configurado
- Reinicia la aplicación

### Errores de módulos
```bash
# En terminal de Spaceship:
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Performance lento
- Verifica que esté en modo production
- Limpia caché del navegador (Ctrl+Shift+Del)
- Revisa los logs de la aplicación

---

## PRÓXIMOS PASOS

1. ✅ Configurar dominio DNS
2. ✅ Habilitar SSL/HTTPS
3. ✅ Monitorear logs iniciales
4. ⏳ (Opcional) Configurar analytics
5. ⏳ (Opcional) Agregar backend si es necesario

---

## CONTACTO SPACESHIP

- **Panel**: https://panel.spaceship.com/
- **Soporte**: https://support.spaceship.com/
- **Docs**: https://spaceship.com/help/

---

**Fecha**: Enero 2026  
**Última actualización**: Configuración optimizada para Spaceship  
**Status**: ✅ Listo para deploy
