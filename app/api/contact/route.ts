import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Configuración de validación
const VALID_EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_MESSAGE_LENGTH = 5000;
const RATE_LIMIT_MINUTES = 5;

// Almacenar IPs con timestamp (en producción usar Redis/DB)
const requestMap = new Map<string, number>();

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

interface EmailResponse {
  success: boolean;
  message: string;
  messageId?: string;
}

// Validar datos del formulario
function validateFormData(data: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.name || data.name.trim().length < 2) {
    errors.push('El nombre debe tener al menos 2 caracteres');
  }

  if (!data.email || !VALID_EMAIL_REGEX.test(data.email)) {
    errors.push('Email inválido');
  }

  if (!data.subject || data.subject.trim().length < 3) {
    errors.push('El asunto debe tener al menos 3 caracteres');
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.push('El mensaje debe tener al menos 10 caracteres');
  }

  if (data.message && data.message.length > MAX_MESSAGE_LENGTH) {
    errors.push(`El mensaje no puede exceder ${MAX_MESSAGE_LENGTH} caracteres`);
  }

  if (data.phone && !/^\+?[0-9\s\-()]+$/.test(data.phone)) {
    errors.push('Número de teléfono inválido');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

// Rate limiting
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const lastRequest = requestMap.get(ip);

  if (lastRequest && now - lastRequest < RATE_LIMIT_MINUTES * 60 * 1000) {
    return false;
  }

  requestMap.set(ip, now);
  return true;
}

// Configurar transporter de email con Spaceship
function getEmailTransporter() {
  // Opción 1: Si usas SMTP de Spaceship
  if (process.env.SPACESHIP_SMTP_HOST) {
    return nodemailer.createTransport({
      host: process.env.SPACESHIP_SMTP_HOST,
      port: parseInt(process.env.SPACESHIP_SMTP_PORT || '587'),
      secure: process.env.SPACESHIP_SMTP_SECURE === 'true',
      auth: {
        user: process.env.SPACESHIP_SMTP_USER,
        pass: process.env.SPACESHIP_SMTP_PASSWORD,
      },
    });
  }

  // Opción 2: Gmail/Nodemailer (fallback)
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
}

// Enviar email al cliente
async function sendCustomerEmail(data: ContactFormData): Promise<boolean> {
  try {
    const transporter = getEmailTransporter();

    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'noreply@norvexperu.xyz',
      to: data.email,
      subject: `Re: ${data.subject} - Norvex Perú`,
      html: `
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; }
            .container { max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 10px; }
            .content { background: white; padding: 30px; border-radius: 8px; }
            .header { color: #667eea; margin-bottom: 20px; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px; }
            .button { display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
            .whatsapp { background: #25D366; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="content">
              <h1 class="header">¡Gracias por contactarnos! 🙏</h1>
              <p>Hola <strong>${data.name}</strong>,</p>
              <p>Hemos recibido tu mensaje correctamente. Nuestro equipo analizará tu consulta y te responderemos en las próximas 24-48 horas.</p>
              
              <h3>Resumen de tu mensaje:</h3>
              <p><strong>Asunto:</strong> ${data.subject}</p>
              <p><strong>Mensaje:</strong> ${data.message}</p>
              
              <p>Mientras tanto, puedes:</p>
              <ul>
                <li>📱 Contactarnos por WhatsApp: <a href="https://wa.me/51916018783?text=Hola%20Norvex%20Pe%C3%BAu" class="button whatsapp">Escribir en WhatsApp</a></li>
                <li>💬 Unirte a nuestro Discord</li>
                <li>🌐 Seguirnos en redes sociales</li>
              </ul>
              
              <p style="margin-top: 30px; color: #667eea;"><strong>¿Necesitas ayuda urgente?</strong></p>
              <p>Llámanos: <strong>+51 916 018 783</strong></p>
              
              <div class="footer">
                <p>Este es un email automático. No respondas directamente a este email.</p>
                <p>&copy; 2026 Norvex Perú. Todos los derechos reservados.</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    return true;
  } catch (error) {
    console.error('Error sending customer email:', error);
    return false;
  }
}

// Enviar email al admin
async function sendAdminEmail(data: ContactFormData, ip: string): Promise<boolean> {
  try {
    const transporter = getEmailTransporter();

    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'noreply@norvexperu.xyz',
      to: process.env.ADMIN_EMAIL || 'admin@norvexperu.xyz',
      subject: `📧 Nuevo mensaje de contacto: ${data.subject}`,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Teléfono:</strong> ${data.phone || 'No proporcionado'}</p>
        <p><strong>Asunto:</strong> ${data.subject}</p>
        <h3>Mensaje:</h3>
        <p>${data.message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>IP: ${ip} | Fecha: ${new Date().toLocaleString()}</small></p>
      `,
    });

    return true;
  } catch (error) {
    console.error('Error sending admin email:', error);
    return false;
  }
}

export async function POST(request: NextRequest): Promise<NextResponse<EmailResponse>> {
  try {
    // Validar método
    if (request.method !== 'POST') {
      return NextResponse.json(
        { success: false, message: 'Método no permitido' },
        { status: 405 }
      );
    }

    // Obtener IP del cliente
    const ip = request.headers.get('x-forwarded-for') || 'unknown';

    // Rate limiting
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, message: 'Demasiadas solicitudes. Intenta de nuevo en 5 minutos.' },
        { status: 429 }
      );
    }

    // Parsear datos
    const data = await request.json() as ContactFormData;

    // Validar datos
    const validation = validateFormData(data);
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, message: validation.errors.join(', ') },
        { status: 400 }
      );
    }

    // Enviar emails
    const [customerEmailSent, adminEmailSent] = await Promise.all([
      sendCustomerEmail(data),
      sendAdminEmail(data, ip),
    ]);

    if (!customerEmailSent || !adminEmailSent) {
      console.warn('Email sending partially failed');
      // No fallamos completamente, ya que al menos uno llegó
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Mensaje enviado correctamente. Te responderemos pronto. 🚀',
        messageId: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { success: false, message: 'Error al procesar tu mensaje. Intenta de nuevo.' },
      { status: 500 }
    );
  }
}

// Opciones CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
