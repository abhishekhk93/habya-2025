import { Gender } from "@/lib/events-utils/eventRules";

export interface PartnerResponse {
    id: string;
    name: string;
    dob: Date;
    gender: Gender;
    phone: string;
    registrations: number[];
  }

  // /app/register/utils/fetchPartner.ts

  export async function fetchPartnerDetails(partnerId: string): Promise<PartnerResponse | null> {
    try {
    const res = await fetch(`/api/user/partner-details/${partnerId}`);

    if (!res.ok) {
      console.error(`Error fetching partner details: ${res.statusText}`);
      return null;
    }

    const data = await res.json();
    return data || null;
  } catch (error) {
    console.error("Failed to fetch partner details:", error);
    return null;
  }
}

  