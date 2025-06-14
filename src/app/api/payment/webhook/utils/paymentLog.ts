// /api/payment/webhook/utils/paymentLog.ts

import prisma from "@/lib/prisma/prisma";
interface PaymentLogInput {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  cart: any;
  userId: number;
}

export async function insertIntoPaymentLog({
  razorpayOrderId,
  razorpayPaymentId,
  cart,
  userId,
}: PaymentLogInput) {
  try {
    await prisma.payment_log.create({
      data: {
        razorpay_order_id: razorpayOrderId,
        razorpay_payment_id: razorpayPaymentId,
        cart,
        user_id: userId,
      },
    });
  } catch (err) {
    console.error("❌ Failed to insert into payment_log:", err);
    throw err;
  }
}
