export type CouponMeal = "lunch" | "snack";
export type CouponType = "default" | "bought";
export type CouponStatus = "active" | "redeemed";

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