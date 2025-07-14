import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import prisma from "@/lib/prisma/prisma";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const encoder = new TextEncoder();
    const { payload } = await jwtVerify(token, encoder.encode(JWT_SECRET));

    if (payload.role !== "admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const { code, meal } = await req.json();

    if (!/^\d{4}$/.test(code) || !["lunch", "snack"].includes(meal)) {
      return NextResponse.json({ message: "Invalid input" }, { status: 400 });
    }

    const couponCodeInt = parseInt(code);

    if (isNaN(couponCodeInt)) {
      return NextResponse.json(
        { message: "Invalid coupon code." },
        { status: 400 }
      );
    }

    const now = new Date();

    // 1. Try to find in main coupons table
    const coupon = await prisma.coupons.findFirst({
      where: {
        coupon_code: couponCodeInt,
        status: "active",
      },
    });

    if (coupon) {
      const updated = await prisma.coupons.update({
        where: { coupon_code: couponCodeInt },
        data: {
          status: "redeemed",
          redeemed_at: now,
        },
      });

      return NextResponse.json(updated);
    }

    // 2. Try in offline_coupons table
    const offlineCoupon = await prisma.offline_coupons.findFirst({
      where: {
        coupon_code: couponCodeInt,
        status: "active",
      },
    });

    if (offlineCoupon) {
      const updated = await prisma.offline_coupons.update({
        where: { coupon_code: couponCodeInt },
        data: {
          status: "redeemed",
          redeemed_at: now,
        },
      });

      return NextResponse.json({
        user: "GUEST",
        coupon: updated.coupon_code,
        type: "Bought at the counter",
        assigned: now,
        redeemed: now,
      });
    }

    return NextResponse.json(
      { message: "Coupon not found or already redeemed." },
      { status: 404 }
    );
  } catch (err: unknown) {
    const error = err instanceof Error ? err : new Error("Unknown error");
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
