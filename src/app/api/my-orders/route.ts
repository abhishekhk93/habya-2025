// app/api/fetch-orders/route.ts
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import prisma from "@/lib/prisma/prisma";
import type { Coupon, Sponsorship } from "@/types/Orders";

const JWT_SECRET = process.env.JWT_SECRET!;
const encoder = new TextEncoder();

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized: No token" },
        { status: 401 }
      );
    }

    const { payload } = await jwtVerify(token, encoder.encode(JWT_SECRET));
    const userId = parseInt(payload.id as string);
    const userName = String(payload.name);

    const registrations = await prisma.registrations.findMany({
      where: {
        OR: [{ player1_id: userId }, { player2_id: userId }],
      },
      include: {
        events: {
          select: {
            name: true,
          },
        },
        users_registrations_player1_idTousers: {
          select: {
            id: true,
            name: true,
          },
        },
        users_registrations_player2_idTousers: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    const coupons: Coupon[] = await prisma.coupons.findMany({
      where: { user_id: userId },
      orderBy: { redeemed_at: "asc" },
    });

    function sortByMealGroup(coupons: Coupon[]) {
      return coupons.sort((a, b) => {
        // Group lunch before snack
        if (a.meal === b.meal) return 0;
        return a.meal === "lunch" ? -1 : 1;
      });
    }

    const activeCoupons = sortByMealGroup(
      coupons.filter((coupon) => coupon.status === "active")
    );

    const redeemedCoupons = sortByMealGroup(
      coupons.filter((coupon) => coupon.status === "redeemed")
    );

    const sponsorships: Sponsorship[] = await prisma.sponsorship.findMany({
      where: { user_id: userId },
    });

    const shirts = await prisma.shirts.findMany({
      where: { user_id: userId },
      select: {
        id: true,
        name: true,
        size: true,
      },
    });

    return NextResponse.json({
      registrations,
      activeCoupons,
      redeemedCoupons,
      sponsorships,
      shirts,
      userName,
    });
  } catch (error) {
    console.error("❌ Error in fetch-orders:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
