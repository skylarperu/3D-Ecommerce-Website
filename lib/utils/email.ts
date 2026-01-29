import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_PORT === "465",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || "noreply@norvex.pe",
      to,
      subject,
      html,
    });
    console.log("Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

export async function sendOrderConfirmation(email: string, orderNumber: string) {
  return sendEmail({
    to: email,
    subject: `Order Confirmation - ${orderNumber}`,
    html: `
      <h1>Thank you for your order!</h1>
      <p>Your order number is: <strong>${orderNumber}</strong></p>
      <p>You will receive a shipping confirmation email once your order is dispatched.</p>
    `,
  });
}

export async function sendOrderShipped(email: string, orderNumber: string, trackingNumber: string) {
  return sendEmail({
    to: email,
    subject: `Your order ${orderNumber} has been shipped!`,
    html: `
      <h1>Your order has been shipped!</h1>
      <p>Order: <strong>${orderNumber}</strong></p>
      <p>Tracking Number: <strong>${trackingNumber}</strong></p>
      <p>Track your package at your local carrier's website.</p>
    `,
  });
}
