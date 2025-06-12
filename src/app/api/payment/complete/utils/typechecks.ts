const validMeals = ["lunch", "snack"] as const;
export type coupons_meal = (typeof validMeals)[number];

const validTypes = ["default", "bought"] as const;
export type coupons_type = (typeof validTypes)[number];

const validStatuses = ["active", "redeemed"] as const; // Update based on your schema
export type coupons_status = (typeof validStatuses)[number];

export function isValidMeal(meal: any): meal is coupons_meal {
  return validMeals.includes(meal);
}

export function isValidCouponType(type: any): type is coupons_type {
  return validTypes.includes(type);
}

export function isValidCouponStatus(status: any): status is coupons_status {
  return validStatuses.includes(status);
}

export const shirtTypeLabels: Record<string, string> = {
  ROUND_HALF: "Round neck, Half Sleeves",
  ROUND_SLEEVELESS: "Round neck, Sleeveless",
  COLLAR_HALF: "Collared, Half Sleeves",
};


export type shirts_size = "XS" | "S" | "M" | "L" | "XL" | "XXL";

export type shirts_type = "ROUND_HALF" | "ROUND_SLEEVELESS" | "COLLAR_HALF";

export const validSizes = ["XS", "S", "M", "L", "XL", "XXL"] as const;
export type ValidSize = (typeof validSizes)[number];

export function isValidShirtSize(size: any): size is ValidSize {
  return validSizes.includes(size);
}
