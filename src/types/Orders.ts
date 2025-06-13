export type Registration = {
  id: number;
  event_id: number;
  player1_id: number;
  player2_id: number | null;
  events: {
    name: string;
  };
  users_registrations_player1_idTousers: {
    id: number;
    name: string;
  };
  users_registrations_player2_idTousers: {
    id: number;
    name: string;
  } | null;
};

export type Coupon = {
  coupon_code: number;
  user_id: number;
  meal: string;
  type: "default" | "bought";
  status: "active" | "redeemed";
  redeemed_at: Date | null;
  assigned_at: Date | null
};

export type Sponsorship = {
  id: number;
  user_id: number;
  amount: number;
};

export type Shirt = {
  id: number;
  name: string;
  size: string;
  type: string;
};

export type OrdersResponse = {
  registrations: Registration[] | null;
  activeCoupons: Coupon[] | null;
  redeemedCoupons: Coupon[] | null;
  sponsorships: Sponsorship[] | null;
  shirts: Shirt[] | null;
};
