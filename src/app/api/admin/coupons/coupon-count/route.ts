import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { countCoupons } from "./utils/couponUtils";
import { CouponSummaryResponse } from "./utils/types";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET(req: NextRequest) {
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
            "You are not authorised to use this feature. Request the event organisers to add you as an admin. If you have been added as an admin, logout and login again",
        },
        { status: 403 }
      );
    }

    const response: CouponSummaryResponse = {
      lunchDefaultActive: await countCoupons("lunch", "default", "active"),
      lunchBoughtActive: await countCoupons("lunch", "bought", "active"),
      lunchDefaultRedeemed: await countCoupons("lunch", "default", "redeemed"),
      lunchBoughtRedeemed: await countCoupons("lunch", "bought", "redeemed"),
      snackDefaultActive: await countCoupons("snack", "default", "active"),
      snackBoughtActive: await countCoupons("snack", "bought", "active"),
      snackDefaultRedeemed: await countCoupons("snack", "default", "redeemed"),
      snackBoughtRedeemed: await countCoupons("snack", "bought", "redeemed"),
    };

    return NextResponse.json(response);
  } catch (err: unknown) {
    const error = err instanceof Error ? err : new Error("Unknown error");
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
