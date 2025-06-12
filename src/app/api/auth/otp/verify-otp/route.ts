// app/api/verify-otp/route.ts
import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

export async function POST(req: NextRequest) {
  const { phone, otp } = await req.json();

  try {
    const verificationCheck = await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID!)
      .verificationChecks.create({
        to: `+91${phone}`,
        code: otp,
      });

    if (verificationCheck.status === "approved") {
      // you can generate JWT here
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, message: "Invalid OTP" });
    }
  } catch (err: unknown) {
    const error = err instanceof Error ? err : new Error("Unknown error");

    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
