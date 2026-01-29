import { NextResponse } from 'next/server';
import { z } from 'zod';
import nodemailer from 'nodemailer';

// Validación del email
const contactSchema = z.object({
  name: z.string().min(3, 'El nombre debe tener mínimo 3 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(9, 'Teléfono inválido'),
  subject: z.string().min(5, 'El asunto debe tener mínimo 5 caracteres'),
  message: z.string().min(10, 'El mensaje debe tener mínimo 10 caracteres'),
  company: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

// Configurar transporte de email - Soporta Gmail y Spaceship SMTP
const getTransporter = () => {
  // Prioridad: Spaceship SMTP > Gmail
  if (
    process.env.SPACESHIP_SMTP_HOST &&
    process.env.SPACESHIP_SMTP_USER &&
    process.env.SPACESHIP_SMTP_PASSWORD
  ) {
    console.log('📧 Usando Spaceship SMTP');
    return nodemailer.createTransport({
      host: process.env.SPACESHIP_SMTP_HOST,
      port: parseInt(process.env.SPACESHIP_SMTP_PORT || '587'),
      secure: process.env.SPACESHIP_SMTP_SECURE === 'true', // false para TLS
      auth: {
        user: process.env.SPACESHIP_SMTP_USER,
        pass: process.env.SPACESHIP_SMTP_PASSWORD,
      },
    });
  }

  // Fallback a Gmail
  console.log('📧 Usando Gmail SMTP');
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_EMAIL || '',
      pass: process.env.GMAIL_APP_PASSWORD || '',
    },
  });
};

const transporter = getTransporter();

// Verificar conexión al iniciar
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Error configurando email:', error);
  } else if (success) {
    console.log('✅ Servicio de email listo');
  }
});

// Template HTML profesional
function generateEmailTemplate(data: ContactFormData): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f8f9fa; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
          .content { background: white; padding: 30px; border-radius: 0 0 10px 10px; }
          .field { margin: 20px 0; }
          .label { font-weight: bold; color: #333; }
          .value { color: #666; margin-top: 5px; padding: 10px; background: #f8f9fa; border-left: 4px solid #667eea; }
          .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #999; font-size: 12px; }
          .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📧 Nuevo Mensaje de Contacto</h1>
            <p>Enviado desde Norvex Perú</p>
          </div>
          
          <div class="content">
            <div class="field">
              <div class="label">👤 Nombre</div>
              <div class="value">${escapeHtml(data.name)}</div>
            </div>
            
            <div class="field">
              <div class="label">📧 Email</div>
              <div class="value"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></div>
            </div>
            
            <div class="field">
              <div class="label">📱 Teléfono</div>
              <div class="value"><a href="tel:${data.phone}">${escapeHtml(data.phone)}</a></div>
            </div>
            
            ${data.company ? `
            <div class="field">
              <div class="label">🏢 Empresa</div>
              <div class="value">${escapeHtml(data.company)}</div>
            </div>
            ` : ''}
            
            <div class="field">
              <div class="label">📌 Asunto</div>
              <div class="value">${escapeHtml(data.subject)}</div>
            </div>
            
            <div class="field">
              <div class="label">💬 Mensaje</div>
              <div class="value" style="white-space: pre-wrap;">${escapeHtml(data.message)}</div>
            </div>
            
            <div class="footer">
              <p>Este mensaje fue enviado desde el formulario de contacto de Norvex Perú</p>
              <p>© 2026 Norvex Perú - norvexperu.xyz</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
}

// Función para escapar HTML
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Generar respuesta automática al cliente
function generateAutoReplyTemplate(name: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f8f9fa; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
          .content { background: white; padding: 30px; border-radius: 0 0 10px 10px; }
          .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #999; font-size: 12px; }
          .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ Hemos Recibido tu Mensaje</h1>
          </div>
          
          <div class="content">
            <p>Hola ${escapeHtml(name)},</p>
            
            <p>¡Gracias por ponerte en contacto con Norvex Perú! 🚀</p>
            
            <p>Hemos recibido tu mensaje correctamente. Nuestro equipo está reviviéndolo y te responderemos lo antes posible.</p>
            
            <p>Si es urgente, también puedes contactarnos por WhatsApp:</p>
            
            <a href="https://wa.me/51916018783?text=Hola%20Norvex%20Perú%20🚀" class="button">💬 Contáctanos por WhatsApp</a>
            
            <p style="margin-top: 30px; color: #666;">Saludos,<br><strong>El equipo de Norvex Perú</strong></p>
            
            <div class="footer">
              <p>© 2026 Norvex Perú - Educación para Emprendedores</p>
              <p>norvexperu.xyz</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
}

export async function POST(request: Request) {
  try {
    // Parsear el cuerpo
    const body = await request.json();

    // Validar los datos
    const validatedData = contactSchema.parse(body);

    // Enviar email al admin
    await transporter.sendMail({
      from: process.env.GMAIL_EMAIL,
      to: process.env.CONTACT_EMAIL || process.env.GMAIL_EMAIL || 'admin@norvexperu.xyz',
      subject: `[CONTACTO] ${validatedData.subject} - ${validatedData.name}`,
      html: generateEmailTemplate(validatedData),
      replyTo: validatedData.email,
      // Campos adicionales para mejor seguimiento
      headers: {
        'X-Priority': '3',
        'X-Mailer': 'Norvex Contact Form',
      },
    });

    // Enviar respuesta automática al cliente
    await transporter.sendMail({
      from: process.env.GMAIL_EMAIL,
      to: validatedData.email,
      subject: '✅ Hemos recibido tu mensaje - Norvex Perú',
      html: generateAutoReplyTemplate(validatedData.name),
    });

    // Respuesta exitosa
    return NextResponse.json(
      {
        success: true,
        message: '✅ Email enviado correctamente. Te responderemos pronto.',
        data: {
          name: validatedData.name,
          email: validatedData.email,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    // Manejo de errores de validación
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Datos inválidos',
          details: error.errors.map((e) => ({
            field: e.path.join('.'),
            message: e.message,
          })),
        },
        { status: 400 }
      );
    }

    // Manejo de otros errores
    console.error('Error enviando email:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Error al enviar el email. Por favor intenta de nuevo.',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
