const validMeals = ["lunch", "snack"] as const;
export type coupons_meal = (typeof validMeals)[number];

const validTypes = ["default", "bought"] as const;
export type coupons_type = (typeof validTypes)[number];

const validStatuses = ["active", "redeemed"] as const; // Update based on your schema
export type coupons_status = (typeof validStatuses)[number];

export function isValidMeal(meal: unknown): meal is coupons_meal {
  return typeof meal === "string" && validMeals.includes(meal as coupons_meal);
}

export function isValidCouponType(type: unknown): type is coupons_type {
  return typeof type === "string" && validTypes.includes(type as coupons_type);
}

export function isValidCouponStatus(status: unknown): status is coupons_status {
  return (
    typeof status === "string" &&
    validStatuses.includes(status as coupons_status)
  );
}

export const shirtTypeLabels: Record<string, string> = {
  ROUND_HALF: "Round neck, Half Sleeves",
  ROUND_SLEEVELESS: "Round neck, Sleeveless",
  COLLAR_HALF: "Collared, Half Sleeves",
};

export type shirts_size = "XS" | "S" | "M" | "L" | "XL" | "XXL";

export type RawShirtInput = {
  size?: string;
  name?: string;
  type?: string;
};

export type shirts_type = "ROUND_HALF" | "ROUND_SLEEVELESS" | "COLLAR_HALF";

export const validSizes = ["XS", "S", "M", "L", "XL", "XXL"] as const;
export type ValidSize = (typeof validSizes)[number];

export function isValidShirtSize(size: unknown): size is ValidSize {
  return typeof size === "string" && validSizes.includes(size as ValidSize);
}
