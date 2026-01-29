# 📧 Guía: Configurar Sistema de Contacto y Emails

**Última actualización:** 29 de Enero, 2026  
**Versión:** 2.2.0

---

## ✨ Nuevas Características

### 1. **API de Contacto** (`/api/contact/send-email`)
- ✅ Valida datos con Zod
- ✅ Envía email al admin
- ✅ Envía respuesta automática al usuario
- ✅ Templates HTML profesionales
- ✅ Manejo de errores robusto

### 2. **Página de Contacto Mejorada** (`/contact`)
- ✅ Formulario avanzado con validación en tiempo real
- ✅ Botón WhatsApp directo
- ✅ 3 métodos de contacto
- ✅ Animaciones fluidas
- ✅ Sección FAQ

### 3. **WhatsApp Integrado**
- ✅ Botón que abre chat directo
- ✅ Número: +51 916 018 783
- ✅ Mensaje personalizado automático

---

## 🚀 SETUP - Paso a Paso

### Paso 1: Configurar Gmail

#### 1.1 Habilitar 2FA
1. Ve a: https://myaccount.google.com/security
2. Busca "Verificación en dos pasos"
3. Sigue los pasos para habilitarlo

#### 1.2 Generar Contraseña de App
1. Ve a: https://myaccount.google.com/apppasswords
2. Selecciona:
   - Aplicación: **Mail**
   - Dispositivo: **Windows Computer** (o tu SO)
3. Google te dará una contraseña de 16 caracteres
4. **Cópiala (sin espacios)**

#### 1.3 Actualizar .env.local
```bash
GMAIL_EMAIL="tu-email@gmail.com"
GMAIL_APP_PASSWORD="xxxxxxxxxxxxxxxx"  # 16 caracteres sin espacios
CONTACT_EMAIL="admin@norvexperu.xyz"
EMAIL_FROM="noreply@norvexperu.xyz"
```

### Paso 2: Configurar WhatsApp (ya incluido)
```
NEXT_PUBLIC_WHATSAPP_NUMBER="51916018783"
```

Esto es automático. El botón abre WhatsApp Web directamente.

### Paso 3: Probar

#### Test 1: Verificar compilación
```bash
npm run build
# Debe compilar sin errores
```

#### Test 2: Probar en desarrollo
```bash
npm run dev
```

Luego:
1. Ve a: http://localhost:3000/contact
2. Rellena el formulario
3. Haz clic en "Enviar Mensaje"

#### Test 3: Verificar WhatsApp
1. Haz clic en "💬 WhatsApp Directo"
2. Debe abrirse WhatsApp Web

---

## 📊 Estructura de la API

### Endpoint
```
POST /api/contact/send-email
```

### Payload esperado
```json
{
  "name": "Juan Pérez",
  "email": "juan@email.com",
  "phone": "+51 910 123 456",
  "company": "Mi Empresa", // opcional
  "subject": "Consulta sobre programas",
  "message": "Hola, me interesa..."
}
```

### Respuesta exitosa (200)
```json
{
  "success": true,
  "message": "✅ Email enviado correctamente. Te responderemos pronto.",
  "data": {
    "name": "Juan Pérez",
    "email": "juan@email.com"
  }
}
```

### Respuesta con error (400/500)
```json
{
  "success": false,
  "error": "Datos inválidos",
  "details": [
    {
      "field": "email",
      "message": "Email inválido"
    }
  ]
}
```

---

## 📧 Validaciones

| Campo | Validación |
|-------|-----------|
| **name** | Mínimo 3 caracteres |
| **email** | Formato de email válido |
| **phone** | Mínimo 9 caracteres |
| **subject** | Mínimo 5 caracteres |
| **message** | Mínimo 10 caracteres |
| **company** | Opcional |

---

## 🎨 Emails Generados

### 1. Email al Admin
- ✅ Formato HTML profesional
- ✅ Información completa del contacto
- ✅ Botón para responder directo
- ✅ Estilos modernos con gradientes

### 2. Respuesta Automática al Cliente
- ✅ Agradecimiento personalizado
- ✅ Referencia de problema
- ✅ Botón WhatsApp para urgencias
- ✅ Firma profesional

---

## 🔧 Integración en Formularios

Si quieres usar la API desde otro componente:

```typescript
// Ejemplo: Custom form
const handleSubmit = async (formData) => {
  const response = await fetch('/api/contact/send-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  
  const result = await response.json();
  
  if (result.success) {
    toast.success('✅ Email enviado');
  } else {
    toast.error(result.error);
  }
};
```

---

## 🚨 Troubleshooting

### Error: "Username and Password not accepted"
**Causa:** Contraseña incorrecta o 2FA no habilitado
**Solución:**
1. Verifica que 2FA esté activado
2. Regenera la contraseña de app
3. Verifica que sea de 16 caracteres (sin espacios)

### Error: "Failed to fetch"
**Causa:** API no respondiendo
**Solución:**
1. Verifica que GMAIL_EMAIL y GMAIL_APP_PASSWORD estén configurados
2. Reinicia el servidor: `npm run dev`

### Los emails no llegan
**Causa:** Puede ser spam o error en CONTACT_EMAIL
**Solución:**
1. Revisa carpeta Spam
2. Verifica el email en CONTACT_EMAIL
3. Comprueba que el email esté configurado correctamente

### WhatsApp no abre
**Causa:** No hay app instalada o número inválido
**Solución:**
1. Verifica que WhatsApp esté instalado
2. Asegúrate que es un navegador de escritorio
3. En mobile, abrirá la app automáticamente

---

## 📱 WhatsApp Integration

### Características
- ✅ URL con número telefónico
- ✅ Mensaje predefinido automático
- ✅ Abre en nueva pestaña
- ✅ Funciona en desktop y mobile

### Personalizar mensaje
En `/app/contact/page.tsx`:
```typescript
const WHATSAPP_MESSAGE = 'Tu mensaje personalizado aquí';
```

---

## 🔒 Seguridad

### Implementado
- ✅ Validación con Zod
- ✅ Escape de HTML (previene XSS)
- ✅ Variables de entorno seguros
- ✅ Headers de seguridad
- ✅ Manejo de errores seguro

### Pendiente (opcional)
- Rate limiting
- reCAPTCHA
- Autenticación

---

## 📈 Monitoreo

### Logs en servidor
```bash
# Los errores se loguean aquí
app/api/contact/send-email/route.ts
```

### Logs en cliente
```
// Toast notifications muestran resultado
// Check browser console para detalles técnicos
```

---

## 🎯 Próximos Pasos

1. ✅ Configurar Gmail
2. ✅ Probar en desarrollo
3. ✅ Desplegar a producción
4. ⭐ (Opcional) Agregar reCAPTCHA
5. ⭐ (Opcional) Agregar rate limiting

---

## 📞 Contacto

- 📧 Email: admin@norvexperu.xyz
- 💬 WhatsApp: +51 916 018 783
- 🌐 Website: norvexperu.xyz

---

**¡Sistema de contacto 100% funcional y listo para producción!** 🚀

---

*Generado: 29 de Enero, 2026*  
*Proyecto: Norvex Perú 3D Ecommerce*  
*Versión: 2.2.0*
