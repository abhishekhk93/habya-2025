import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import crypto from "crypto";
import { insertIntoPaymentLog } from "./utils/paymentLog";

// You can move this to a shared config file if reused elsewhere
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID!;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET!;
const RAZORPAY_WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET!;

const razorpay = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_KEY_SECRET,
});

// Required to read the raw body
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text(); // needed for signature verification
    const razorpaySignature = req.headers.get("x-razorpay-signature");

    // Verify webhook signature
    const expectedSignature = crypto
      .createHmac("sha256", RAZORPAY_WEBHOOK_SECRET)
      .update(rawBody)
      .digest("hex");

    if (expectedSignature !== razorpaySignature) {
      console.warn("🔐 Webhook signature mismatch.");
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const payload = JSON.parse(rawBody);

    if (payload.event === "payment.captured") {
      const payment = payload.payload.payment.entity;
      const { id: paymentId, order_id: orderId, email, contact } = payment;

      // 🔍 Fetch order to get attached notes (cart + userId)
      const order = await razorpay.orders.fetch(orderId);
      const notes = order.notes || {};

      const userId = Number(notes.userId);
      const parsedCart =
        typeof notes.cart === "string" ? JSON.parse(notes.cart) : [];

      // 🪵 Insert into your lightweight payment log DB
      await insertIntoPaymentLog({
        razorpayOrderId: orderId,
        razorpayPaymentId: paymentId,
        cart: parsedCart,
        userId,
      });

      console.log("✅ Payment captured and logged:", orderId);
      return NextResponse.json({ success: true });
    }

    // Optionally handle other events like payment.failed, etc.
    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("❌ Webhook handler failed:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
