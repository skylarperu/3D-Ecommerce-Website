# 🚀 Guía: Integración Spaceship SMTP + API

**Fecha:** 29 de Enero, 2026  
**Versión:** 2.3.0  
**Hospedaje:** Spaceship.com

---

## ✨ ¿Por qué Spaceship?

✅ **Ventajas:**
- SMTP nativo para email (no depende de Gmail)
- Ideal para hosting en Spaceship
- Sin límites de volumen como Gmail
- Soporte técnico incluido
- Sin 2FA complications
- Mejor para producción

---

## 📖 Paso 1: Obtener Credenciales SMTP

### 1.1 Acceder al Panel de Spaceship
1. Ve a: https://spaceship.com/es/
2. Inicia sesión con tu cuenta
3. Ve a: **Applications → API Manager**

### 1.2 Crear Clave API
1. Haz clic en **"Create New Key"** (o el equivalente)
2. Dale un nombre: `email-smtp` o `norvex-contact`
3. Genera la clave
4. **Copia las credenciales SMTP** que aparecen

### 1.3 Qué recibirás
```
SMTP Host: smtp.spaceship.com
SMTP Port: 587
SMTP Secure: false (usa TLS)
SMTP User: tu-email@spaceship.com
SMTP Password: your-api-key-here
```

---

## 🔧 Paso 2: Configurar en tu Proyecto

### 2.1 Actualizar .env.local
```bash
# ===== SPACESHIP SMTP =====
SPACESHIP_SMTP_HOST="smtp.spaceship.com"
SPACESHIP_SMTP_PORT="587"
SPACESHIP_SMTP_SECURE="false"
SPACESHIP_SMTP_USER="your-spaceship-email@spaceship.com"
SPACESHIP_SMTP_PASSWORD="your-api-key-aqui"

# ===== EMAIL DEFAULT =====
CONTACT_EMAIL="admin@norvexperu.xyz"
EMAIL_FROM="noreply@norvexperu.xyz"
```

### 2.2 Notas Importantes
- ✅ `SPACESHIP_SMTP_SECURE` debe ser `"false"` (usa TLS en puerto 587)
- ✅ Si configuró Spaceship, Gmail se usa como **fallback** automático
- ✅ No necesitas Gmail si usas Spaceship

---

## 🧪 Paso 3: Probar la Integración

### 3.1 Test Local
```bash
# Iniciar servidor
npm run dev

# Ir a http://localhost:3000/contact

# Rellenar y enviar formulario

# Revisar logs en consola:
# Debe mostrar: "📧 Usando Spaceship SMTP" o "📧 Usando Gmail SMTP"
```

### 3.2 Verificar Email
1. Revisa tu inbox (en el email configurado en CONTACT_EMAIL)
2. Busca email de prueba
3. Verifica que llegó correctamente

---

## 📧 Qué ocurre cuando envían email

### Flujo Automático

```
Usuario rellenau formulario
    ↓
Valida datos (Zod)
    ↓
Envía email al admin (CONTACT_EMAIL)
    ↓
Envía respuesta automática al usuario
    ↓
Usuario recibe confirmación
```

### Emails Generados

**1. Email al Admin**
- De: Spaceship SMTP
- Para: admin@norvexperu.xyz
- Contiene: Datos completos del contacto
- HTML profesional con estilos

**2. Respuesta Automática**
- De: Spaceship SMTP
- Para: Email del usuario
- Contiene: Agradecimiento + botón WhatsApp
- HTML profesional

---

## 🔐 Seguridad

✅ **Implementado:**
- Variables en .env (nunca en código)
- Validación Zod en servidor
- Escape de HTML (XSS prevention)
- Manejo seguro de errores
- No expone credenciales en logs

⭐ **Pendiente (opcional):**
- Rate limiting
- reCAPTCHA
- IP whitelist

---

## 🌐 Desplegar en Spaceship Hosting

### Paso 1: Subir Código
```bash
git push spaceship main
```

### Paso 2: Configurar Variables
1. Ve a Spaceship panel
2. Selecciona tu app
3. Environment → Variables
4. Agrega las variables SPACESHIP_SMTP_*
5. Redeploy

### Paso 3: Probar en Producción
1. Ve a https://tu-dominio.com/contact
2. Envía un formulario de prueba
3. Verifica que llega el email

---

## 📊 Monitoreo

### Logs del Servidor
```bash
# Verificar que está usando Spaceship
# En logs deberá mostrar:
"📧 Usando Spaceship SMTP"
"✅ Servicio de email listo"
```

### Errores Comunes

| Error | Causa | Solución |
|-------|-------|----------|
| `EAUTH` | Credenciales inválidas | Verifica usuario/password |
| `ECONNREFUSED` | Host incorrecto | Verifica `smtp.spaceship.com` |
| `TIMEOUT` | Red/firewall | Verifica puerto 587 |
| `Email no llega` | Email blocked/spam | Revisa spam folder |

---

## 🔄 Migración desde Gmail a Spaceship

Si ya tenías Gmail configurado:

```javascript
// Antes (solo Gmail)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: GMAIL_EMAIL, pass: GMAIL_APP_PASSWORD }
});

// Después (Spaceship + fallback Gmail)
const getTransporter = () => {
  if (SPACESHIP_SMTP_HOST) {
    return nodemailer.createTransport({
      host: SPACESHIP_SMTP_HOST,
      port: 587,
      secure: false,
      auth: { user: SPACESHIP_SMTP_USER, pass: SPACESHIP_SMTP_PASSWORD }
    });
  }
  // Fallback a Gmail
  return nodemailer.createTransport({...gmail config...});
};
```

---

## 💡 Pro Tips

1. **Alias de Email:**
   - Spaceship te permite múltiples alias
   - Puedes recibir desde `soporte@`, `contacto@`, etc.

2. **Automatización:**
   - Los emails se envían automáticamente
   - Sin intervención manual

3. **Escalabilidad:**
   - Spaceship soporta millones de emails
   - No hay límites como en Gmail

4. **Integración Completa:**
   - SMTP, API, Dashboard
   - Todo integrado en Spaceship

---

## 📞 Soporte

- 📧 **Email:** admin@norvexperu.xyz
- 💬 **WhatsApp:** +51 916 018 783
- 🌐 **Spaceship Docs:** https://docs.spaceship.com

---

## ✅ Checklist de Setup

- [ ] Crear clave API en Spaceship
- [ ] Copiar credenciales SMTP
- [ ] Actualizar .env.local
- [ ] Probar en desarrollo
- [ ] Verificar emails
- [ ] Desplegar a Spaceship
- [ ] Probar en producción
- [ ] Monitorear logs

---

**¡Sistema de emails Spaceship configurado y listo!** 🚀

---

*Generado: 29 de Enero, 2026*  
*Proyecto: Norvex Perú 3D Ecommerce*  
*Versión: 2.3.0*
