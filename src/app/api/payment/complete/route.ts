import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import prisma from "@/lib/prisma/prisma";
import { CartItem } from "@/store/slices/cartSlice";
import { getDefaultCouponsDataFromRegistrations } from "./utils/getDefaultCoupons";
import { getBoughtCouponsFromCart } from "./utils/getBoughtCoupons";
import { coupons_meal, coupons_status, coupons_type, isValidShirtSize } from "./utils/typechecks";
import { shirts_size } from "@prisma/client";

export async function POST(req: NextRequest) {
  const JWT_SECRET = process.env.JWT_SECRET!;
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized: No token" },
        { status: 401 }
      );
    }

    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(JWT_SECRET)
    );
    const userId = parseInt(payload.id as string);

    const body = await req.json();
    const cartItems: CartItem[] = body.items;

    // Group items by type
    const registrations = cartItems.filter(
      (item) => item.type === "registration"
    );
    const shirts = cartItems.filter((item) => item.type === "shirt");
    const sponsorships = cartItems.filter((item) => item.type === "sponsor");

    // Prepare data for batch insert
    const registrationData = registrations.map((item) => ({
      event_id: parseInt(item.id),
      player1_id: userId,
      player2_id: item.partner ? parseInt(item.partner.id) : null,
    }));

    const defaultCoupons = await getDefaultCouponsDataFromRegistrations(
      registrationData
    );
    const boughtCoupons = getBoughtCouponsFromCart(cartItems, userId);
    const allCoupons = [...defaultCoupons, ...boughtCoupons] as {
      user_id: number;
      meal: coupons_meal;
      type: coupons_type;
      status: coupons_status;
    }[];
    const shirtData = shirts.flatMap(
      (item) =>
        item.shirtData?.map((shirt: any) => {
          const data: { user_id: number; size?: shirts_size; name?: string } = {
            user_id: userId,
          };

          if (isValidShirtSize(shirt.size)) {
            data.size = shirt.size;
          }
          if (shirt.name) {
            data.name = shirt.name;
          }
          return data;
        }) || []
    );

    const sponsorshipData = sponsorships.map((item) => ({
      user_id: userId,
      amount: item.price,
    }));

    // Wrap in single transaction
    await prisma.$transaction([
      ...(registrationData.length > 0
        ? [prisma.registrations.createMany({ data: registrationData })]
        : []),
      ...(shirtData.length > 0
        ? [prisma.shirts.createMany({ data: shirtData })]
        : []),
      ...(sponsorshipData.length > 0
        ? [prisma.sponsorship.createMany({ data: sponsorshipData })]
        : []),
      ...(allCoupons.length > 0
        ? [prisma.coupons.createMany({ data: allCoupons })]
        : []),
    ]);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: "DB insert failed" },
      { status: 500 }
    );
  }
}
