import {
  isPlayerEligible,
  isTeamEligible,
} from "../events-utils/eligibilityUtils";
import { EventRule } from "../events-utils/eventRules";
import { User } from "@/store/slices/userSlice";
import { CartItem } from "@/store/slices/cartSlice";

export function validateTeamEligibility(
  user: User,
  partner: User,
  partnerRegistrations: number[],
  event: EventRule,
  cartItems: CartItem[]
): string | null {
  const partnerEligibility = isPlayerEligible(partner, event);
  if (partnerEligibility) {
    return partnerEligibility;
  }

  const teamEligibility = isTeamEligible(user, partner, event);
  if (teamEligibility) {
    return teamEligibility;
  }

  const totalPartnerEvents = new Set([
    ...partnerRegistrations,
    ...cartItems
      .filter((item) => item.partner?.id === partner.id)
      .map((item) => Number(item.id)),
  ]).size;

  if (totalPartnerEvents >= 3) {
    return `${partner.name} has already registered for 3 events.`;
  }

  return null;
}
