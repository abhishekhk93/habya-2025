import { EventRule, Gender } from "./eventRules/types";
import { calculateAgeOn } from "./ageUtils";
import { User } from "@/store/slices/userSlice";

//Check if a single player is eligible for the event (singles or doubles)

/*
isPlayerEligible returns null if player is eligible, which is semantically incorrect. 
It is done to display correct messages.
TO-DO: Fix it with meaningful return value.
*/

export function isPlayerEligible(
  player: User,
  event: EventRule
): string | null {
  if (!event.allowedGenders.includes(player.gender.toLowerCase() as Gender)) {
    return `${player.name} is not eligible: ${player.gender} not allowed for this event.`;
  }

  if (event.minAge) {
    const age = calculateAgeOn(player.dob, event.minAge.onDate);
    const formattedDate = new Date(event.minAge.onDate).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    if (age < event.minAge.value) {
      return `${player.name} is not eligible: must be at least ${event.minAge.value} years old as on ${formattedDate}.`;
    }
  }

  if (event.maxAge) {
    const age = calculateAgeOn(player.dob, event.maxAge.onDate);
    const formattedDate = new Date(event.maxAge.onDate).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    if (age >= event.maxAge.value) {
      return `${player.name} is not eligible: must be younger than ${event.maxAge.value} years on ${formattedDate}.`;
    }
  }

  return null;
}

//Check if a team of two players is eligible for the event (doubles or mixed doubles)

/*
isTeamEligible returns null if team is eligible, which is semantically incorrect. 
It is done to display correct messages.
TO-DO: Fix it with meaningful return value.
*/

export function isTeamEligible(
  p1: User,
  p2: User,
  event: EventRule
): string | null {
  if (event.type === "singles") {
    return "This event is not for teams.";
  }

  if(Number(p1.id) === Number(p2.id)){
    return `Come on! You can not partner with yourself! Enter a correct profile ID`;
  }

  const teamGenders = [p1.gender, p2.gender].map((g) => g.toLowerCase()).sort();
  const allowed = [...event.allowedGenders].sort();

  if (
    teamGenders.length !== allowed.length ||
    teamGenders.some((g, i) => g !== allowed[i])
  ) {
    return `Team gender combination does not match allowed genders for this event`;
  }

  const p1Eligibility = isPlayerEligible(p1, event);
  const p2Eligibility = isPlayerEligible(p2, event);

  if (p1Eligibility)
    return `${p1Eligibility}`;
  if (p2Eligibility)
    return `${p2Eligibility}`;

  if (event.partnerRule) {
    const { requireOneFemale, requireOneAboveAge } = event.partnerRule;

    if (requireOneFemale && p1.gender !== "female" && p2.gender !== "female") {
      return "At least one player must be female.";
    }

    if (requireOneAboveAge) {
      const { value, onDate } = requireOneAboveAge;
      const p1Age = calculateAgeOn(p1.dob, onDate);
      const p2Age = calculateAgeOn(p2.dob, onDate);

      if (p1Age < value && p2Age < value) {
        const formattedDate = new Date(onDate).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });
        return `At least one player must be above ${value} years as on ${formattedDate}.`;
      }
    }
  }

  return null;
}
