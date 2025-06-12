export type EligibleEvent = {
    id: number;
    name: string;
    isRegistered: boolean;
    type: "singles" | "doubles" | "mixed_doubles";
    eligible: boolean;
  };