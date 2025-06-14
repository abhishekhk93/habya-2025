import prisma from "@/lib/prisma/prisma";

export async function insertIntoPaymentLog({
  razorpayOrderId,
  razorpayPaymentId,
  cart,
  userId,
  email,
  contact,
  status,
  source,
}: {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  cart: any[];
  userId: string;
  email?: string;
  contact?: string;
  status: "captured" | "failed" | "manual";
  source: "webhook" | "manual";
}) {
  return await prisma.paymentLog.create({
    data: {
      razorpayOrderId,
      razorpayPaymentId,
      cart,
      userId,
      email,
      contact,
      status,
      source,
    },
  });
}
