import prisma from "@/lib/prisma/prisma";
import { CouponMeal, CouponStatus, CouponType } from "./types";

export async function countCoupons(
  meal: CouponMeal,
  type: CouponType,
  status: CouponStatus
): Promise<number> {
  return prisma.coupons.count({
    where: {
      meal,
      type,
      status,
    },
  });
}