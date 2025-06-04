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
  if (!isPlayerEligible(partner, event)) {
    return "Partner is not eligible individually for the event.";
  }

  if (!isTeamEligible(user, partner, event)) {
    return "You and your partner are not eligible as a team.";
  }

  const totalPartnerEvents = new Set([
    ...partnerRegistrations,
    ...cartItems
      .filter((item) => item.partner?.id === partner.id)
      .map((item) => Number(item.id)),
  ]).size;

  if (totalPartnerEvents >= 3) {
    return "Partner is already registered for 3 events.";
  }

  return null;
}
