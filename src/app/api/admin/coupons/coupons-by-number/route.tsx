import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import prisma from "@/lib/prisma/prisma";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const encoder = new TextEncoder();
    const { payload } = await jwtVerify(token, encoder.encode(JWT_SECRET));

    if (payload.role !== "admin") {
      return NextResponse.json(
        {
          message:
            "You are not authorised to use this feature. Request the event organisers to add you as an admin. If you have been added as an admin, logout and login again.",
        },
        { status: 403 }
      );
    }

    const { phone } = await req.json();

    if (!phone || !/^\d{10}$/.test(phone)) {
      return NextResponse.json(
        { message: "Invalid phone number format." },
        { status: 400 }
      );
    }

    const user = await prisma.users.findFirst({
      where: { phone },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json({ coupons: [] });
    }

    const coupons = await prisma.coupons.findMany({
      where: { user_id: user.id },
      select: {
        coupon_code: true,
        type: true,
        meal: true,
        status: true,
        assigned_at: true,
        redeemed_at: true,
      },
    });

    return NextResponse.json({ coupons });
  } catch (err: unknown) {
    const error = err instanceof Error ? err : new Error("Unknown error");
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
