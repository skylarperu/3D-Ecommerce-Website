import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/db/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature") || "";

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error: any) {
    console.log(`⚠️  Webhook signature verification failed.`, error.message);
    return NextResponse.json({ received: false }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as any;

      // Update order status
      if (session.metadata?.orderId) {
        await prisma.order.update({
          where: { id: session.metadata.orderId },
          data: {
            status: "CONFIRMED",
            paymentStatus: "PAID",
            stripePaymentId: session.payment_intent,
          },
        });
      }

      break;
    }
    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object as any;
      console.log(`Payment failed: ${paymentIntent.id}`);
      break;
    }
  }

  return NextResponse.json({ received: true });
}
