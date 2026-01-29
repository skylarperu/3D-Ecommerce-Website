# 🔑 SSH Key Setup para Spaceship - Guía Oficial

**Fecha:** 29 de Enero, 2026  
**Plataforma:** Spaceship.com  
**Tipo:** ECDSA P-521

---

## ✅ ESTADO: Tu Clave SSH ya está Generada

Tu clave SSH ECDSA P-521 ha sido creada exitosamente en:
- **Privada:** `~/.ssh/id_ecdsa` (guardar en lugar seguro)
- **Pública:** `~/.ssh/id_ecdsa.pub` (compartir con Spaceship)

---

## 📋 PASO 1: Copiar tu Clave Pública

Ejecuta este comando para ver tu clave pública:

```bash
cat ~/.ssh/id_ecdsa.pub
```

**Tu clave pública (cópiala completa):**

```
ecdsa-sha2-nistp521 AAAAE2VjZHNhLXNoYTItbmlzdHA1MjEAAAAIbmlzdHA1MjEAAACFBAAIuzya3VlgXnr86I/6yxsD2UpYJVhMz09lVhLKdFlLza41EGqeFmcz0EGLcMPbL3xNDMWR9xNIue9Qu47VSIPm2wDO27P4IhElcc5O5EFaawcTTZNN26zypAVWIetBW/QGiNO0WdDmA/YH2Lzn7w1sdOnDOsWPwt5keaDNjNhnniT5zw== norvex-peru@spaceship
```

---

## 🚀 PASO 2: Agregar Clave a Spaceship

### 2.1 Acceder al Panel
1. Ve a: **https://spaceship.com/es/applications/**
2. Inicia sesión con tu cuenta Spaceship
3. Selecciona tu aplicación **"Norvex Perú"**

### 2.2 Ir a SSH Keys
1. En tu app, ve a: **Settings → SSH Keys** (o **Deploy → SSH Keys**)
2. Haz clic en el botón **"Add SSH Key"** o **"New SSH Key"**

### 2.3 Agregar la Clave
1. En el campo **SSH Key**, pega la clave pública completa de arriba
2. Opcional: Dale un nombre descriptivo como:
   - `"Codespace ECDSA"`
   - `"Dev Machine"`
   - `"Production Deploy Key"`
3. Haz clic en **"Add"** o **"Save"**

---

## 📝 PASO 3: Configurar Git Remote

Una vez agregada la clave en Spaceship, ejecuta:

```bash
# Agregar remoto de Spaceship
git remote add spaceship git@spaceship.com:YOUR-SPACESHIP-USERNAME/norvex-peru.git
```

**⚠️ Importante:** Reemplaza `YOUR-SPACESHIP-USERNAME` con tu usuario de Spaceship

Para verificar tu usuario, ve a:
- Spaceship Panel → Settings → Account
- Busca el campo "Username"

### Ejemplo:
```bash
# Si tu usuario es "juanperez"
git remote add spaceship git@spaceship.com:juanperez/norvex-peru.git
```

---

## 🧪 PASO 4: Probar la Conexión (Opcional)

```bash
# Verificar que SSH funciona
ssh -i ~/.ssh/id_ecdsa -T git@spaceship.com

# Debe responder algo como:
# "Hi YOUR-USERNAME! You've successfully authenticated..."
```

---

## 🚀 PASO 5: Hacer el Primer Deploy

Una vez todo esté configurado:

```bash
# Asegúrate de estar en la rama main
git checkout main

# Verificar que está todo commiteado
git status
# Debe mostrar: "nothing to commit, working tree clean"

# Hacer push a Spaceship
git push spaceship main

# Spaceship empezará a desplegar automáticamente
```

**¡Verás el deployment en el panel de Spaceship en tiempo real!**

---

## 🔐 Información de Seguridad

### Tu Clave Privada (`id_ecdsa`)
- ✅ Guardada en: `~/.ssh/id_ecdsa`
- ✅ Permisos: 600 (solo lectura/escritura para ti)
- ❌ **NUNCA** compartir
- ❌ **NUNCA** commitear al repositorio
- ❌ **NUNCA** exponer en logs

### Tu Clave Pública (`id_ecdsa.pub`)
- ✅ Segura de compartir
- ✅ Necesaria para Spaceship
- ✅ Pueden verla sin problema

---

## 📊 Especificaciones de tu Clave

| Parámetro | Valor |
|-----------|-------|
| **Algoritmo** | ECDSA |
| **Curva** | NIST P-521 |
| **Bits** | 521 |
| **Formato** | OpenSSH |
| **Usuario** | norvex-peru@spaceship |
| **Generada** | 29 de Enero, 2026 |

---

## ✅ Checklist

- [ ] Clave SSH generada
- [ ] Copié clave pública
- [ ] Agregué clave a Spaceship SSH Keys
- [ ] Configuré git remote spaceship
- [ ] Probé la conexión SSH (opcional)
- [ ] Hice git push spaceship main
- [ ] Vi el deployment en Spaceship panel

---

## 🆘 Troubleshooting

### Error: "Permission denied (publickey)"
**Causa:** Clave SSH no agregada a Spaceship
**Solución:** Verifica que pegaste la clave completa en Spaceship

### Error: "Host key verification failed"
**Causa:** Primera vez conectando a spaceship.com
**Solución:** Responde "yes" cuando pregunte si confías en el host

### Error: "Could not resolve hostname"
**Causa:** Problema de red o DNS
**Solución:** Verifica tu conexión a internet

### El deploy no empieza
**Causa:** Clave SSH no configurada o rama main vacía
**Solución:** Verifica git remote y que haya cambios

---

## 📞 Soporte Spaceship

Si tienes problemas con Spaceship:
- 🌐 Docs: https://docs.spaceship.com
- 💬 Email: support@spaceship.com
- 📱 Chat: Desde el panel de Spaceship

---

## 🎯 Próximos Pasos

1. ✅ Agregar clave pública a Spaceship
2. ✅ Configurar git remote
3. ✅ Hacer primer git push
4. ✅ Monitorear deployment
5. ✅ Probar aplicación en producción

---

## 📚 Documentación Relacionada

- [CREDENCIALES_SPACESHIP.md](CREDENCIALES_SPACESHIP.md) - Setup API
- [SPACESHIP_SMTP.md](SPACESHIP_SMTP.md) - Configuración emails
- [SSH_KEY_SPACESHIP.md](SSH_KEY_SPACESHIP.md) - Info clave SSH

---

**¡Tu Norvex Perú estará en vivo en Spaceship en minutos!** 🚀

---

*Generado: 29 de Enero, 2026*  
*Proyecto: Norvex Perú 3D Ecommerce*  
*Versión: 2.4.0*
