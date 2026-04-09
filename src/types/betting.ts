export interface Team {
  id: number;
  name: string;
  short_code: string;
  image_path: string;
  meta: {
    location: "home" | "away";
    winner: boolean | null;
    position: number;
  };
}

export interface Odd {
  id: number;
  fixture_id: number;
  label: string;
  value: string;
  probability: string;
  winning: boolean;
}

export interface Fixture {
  id: number;
  name: string;
  starting_at: string;
  result_info: string | null;
  has_odds: boolean;
  participants: Team[];
  odds: Odd[];
  league?: {
    id: number;
    name: string;
    image_path: string;
  };
  state?: {
    name: string;
    short_name: string;
  };
}

export interface BetSelection {
  fixtureId: number;
  fixtureName: string;
  label: string;
  odds: number;
  homeTeam: string;
  awayTeam: string;
}

export interface BetSlipState {
  selections: BetSelection[];
  stake: number;
}
