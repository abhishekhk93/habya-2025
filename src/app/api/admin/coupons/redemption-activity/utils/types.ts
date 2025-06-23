export type MealType = "lunch" | "snack";
export type CouponType = "default" | "bought";

export interface GroupedCouponSummary {
  meal: MealType;
  type: CouponType;
  _count: number;
}

export interface RedeemedTimeSlotSummarySimple {
    label: string;
    redeemed: number;
  }
  
