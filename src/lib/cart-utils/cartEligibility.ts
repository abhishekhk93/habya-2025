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

  const eventId = Number(event.id);

  // Partner DB registrations
  const dbRegisteredEventIds = new Set(partnerRegistrations);

  if (dbRegisteredEventIds.has(eventId)) {
    return `Sorry, ${partner.name} is already booked for this event. You'll have to crash another party!`;
  }

  const cartEventIds = new Set(
    cartItems
      .filter((item) => item.partner?.id === partner.id)
      .map((item) => Number(item.id))
  );

  const totalUniqueEvents = new Set([...dbRegisteredEventIds, ...cartEventIds]);

  if (totalUniqueEvents.size >= 3) {
    const dbCount = dbRegisteredEventIds.size;
    const cartCount = cartEventIds.size;
    if (dbCount >= 3) {
      return `${partner.name} has already registered for 3 events.`;
    } else {
      return `${partner.name} has already registered for ${dbCount} events and has ${cartCount} in your cart. Adding this will exceed the 3-event limit for your partner.`;
    }
  }

  return null;
}
