import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(request: Request) {
  try {
    const { amount, cartItems, userId } = await request.json();

    if (!amount || typeof amount !== "number") {
      return NextResponse.json(
        { error: "Amount is required and must be a number" },
        { status: 400 }
      );
    }

    // Initialize Razorpay instance with your keys from env
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    const options = {
      amount, // amount in paise (e.g. 50000 paise = ₹500)
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
      payment_capture: 1,
      notes: {
        userId: String(userId),
        cart: JSON.stringify(cartItems),
      },
    };

    // Create order on Razorpay
    const order = await razorpay.orders.create(options);

    return NextResponse.json(order);
  } catch (error) {
    console.error("Order creation failed:", error);
    return NextResponse.json(
      { error: "Order creation failed" },
      { status: 500 }
    );
  }
}
