// lib/utils/getBoughtCouponsFromCart.ts

import { CartItem } from "@/store/slices/cartSlice";

export function getBoughtCouponsFromCart(
  cartItems: CartItem[],
  userId: number
) {
  // Filter food type coupons
  const foodCoupons = cartItems.filter((item) => item.type === "food");

  const assignedAt = new Date();

  // Generate lunch and snack coupons per quantity for each food coupon
  const boughtCoupons = foodCoupons.flatMap((item) => {
    const quantity = item.quantity || 0;

    const coupons = [];
    for (let i = 0; i < quantity; i++) {
      coupons.push(
        {
          user_id: userId,
          meal: "lunch",
          type: "bought",
          status: "active",
          assigned_at: assignedAt,
        },
        {
          user_id: userId,
          meal: "snack",
          type: "bought",
          status: "active",
          assigned_at: assignedAt,
        }
      );
    }
    return coupons;
  });

  return boughtCoupons;
}
