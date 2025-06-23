export type Gender = "male" | "female";

export type EventType = "singles" | "doubles" | "mixed_doubles";

export interface AgeLimit {
  value: number;
  onDate: Date;
}

export interface PartnerRule {
  requireOneFemale?: boolean;
  requireOneAboveAge?: AgeLimit;
}

export interface EventRule {
  id: number;
  name: string; 
  type: EventType;
  allowedGenders: Gender[];
  minAge?: AgeLimit;
  maxAge?: AgeLimit;
  partnerRule?: PartnerRule;
  price: number;
  entryLimit: number,
}
