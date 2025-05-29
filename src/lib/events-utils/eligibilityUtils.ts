import { EventRule, Gender } from "./eventRules/types";
import { calculateAgeOn } from "./ageUtils";

interface Player {
  id: number;
  gender: Gender;
  dob: Date;
}

//Check if a single player is eligible for the event (singles or doubles)
 
export function isPlayerEligible(player: Player, event: EventRule): boolean {
  if (!event.allowedGenders.includes(player.gender)) return false;

  if (event.minAge) {
    const age = calculateAgeOn(player.dob, event.minAge.onDate);
    if (age < event.minAge.value) return false;
  }

  if (event.maxAge) {
    const age = calculateAgeOn(player.dob, event.maxAge.onDate);
    if (age >= event.maxAge.value) return false;
  }

  return true;
}

//Check if a team of two players is eligible for the event (doubles or mixed doubles)

export function isTeamEligible(p1: Player, p2: Player, event: EventRule): boolean {
  if (event.type === "singles") {
    return false;
  }

  // Check allowed genders order-insensitive
  const teamGenders = [p1.gender, p2.gender].sort();
  const allowed = [...event.allowedGenders].sort();

  // Quick fail if genders do not match
  if (teamGenders.length !== allowed.length) return false;
  for (let i = 0; i < allowed.length; i++) {
    if (teamGenders[i] !== allowed[i]) return false;
  }

  // Check individual eligibility
  if (!isPlayerEligible(p1, event) || !isPlayerEligible(p2, event)) return false;

  // Partner rules
  if (event.partnerRule) {
    const { requireOneFemale, requireOneAboveAge } = event.partnerRule;

    if (requireOneFemale) {
      if (p1.gender !== "female" && p2.gender !== "female") return false;
    }

    if (requireOneAboveAge) {
      const { value, onDate } = requireOneAboveAge;
      const p1Age = calculateAgeOn(p1.dob, onDate);
      const p2Age = calculateAgeOn(p2.dob, onDate);

      if (p1Age < value && p2Age < value) return false;
    }
  }

  return true;
}
