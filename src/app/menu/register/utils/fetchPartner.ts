import { Gender } from "@/lib/events-utils/eventRules";

export interface PartnerResponse {
    id: string;
    name: string;
    dob: Date;
    gender: Gender;
    phone: string;
    role: string;
    registrations: number[];
  }

  // /app/register/utils/fetchPartner.ts

  export async function fetchPartnerDetails(partnerId: string): Promise<PartnerResponse | null> {
    try {
    const res = await fetch(`/api/user/partner-details/${partnerId}`);

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return data || null;
  } catch (error) {
    console.log("Error: ", error);
    return null;
  }
}

  