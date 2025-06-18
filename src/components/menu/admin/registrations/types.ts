export interface Registration {
    event_id: number;
    player1_name: string;
    player2_name: string | null;
  }
  
  export interface Stats {
    zero: number;
    atLeast1: number;
    atLeast2: number;
    atLeast3: number;
  }
  