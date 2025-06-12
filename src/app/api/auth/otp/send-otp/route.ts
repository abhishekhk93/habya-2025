// app/api/send-otp/route.ts
import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

export async function POST(req: NextRequest) {
  const { phone } = await req.json();

  try {
    const verification = await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID!)
      .verifications.create({
        to: `+91${phone}`,
        channel: "sms",
      });

    return NextResponse.json({ success: true, sid: verification.sid });
  } catch (err: unknown) {
    const error = err instanceof Error ? err : new Error("Unknown error");

    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
