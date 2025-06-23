export interface CouponSummaryResponse {
  lunchDefaultActive: number;
  lunchBoughtActive: number;
  lunchDefaultRedeemed: number;
  lunchBoughtRedeemed: number;
  snackDefaultActive: number;
  snackBoughtActive: number;
  snackDefaultRedeemed: number;
  snackBoughtRedeemed: number;
}

export type MealType = "lunch" | "snack";
export type CouponType = "default" | "bought";

export interface RedeemedTimeSlotSummarySimple {
  label: string;
  redeemed: number;
}
