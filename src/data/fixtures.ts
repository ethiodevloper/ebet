import { Fixture } from "@/types/betting";

export const MOCK_FIXTURES: Fixture[] = [
  {
    id: 19427195,
    name: "Chelsea vs Manchester City",
    starting_at: "2026-04-12 15:30:00",
    result_info: null,
    has_odds: true,
    league: { id: 8, name: "Premier League", image_path: "https://cdn.sportmonks.com/images/soccer/leagues/8/8.png" },
    state: { name: "Not Started", short_name: "NS" },
    participants: [
      { id: 18, name: "Chelsea", short_code: "CHE", image_path: "https://cdn.sportmonks.com/images/soccer/teams/18/18.png", meta: { location: "home", winner: null, position: 6 } },
      { id: 9, name: "Manchester City", short_code: "MCI", image_path: "https://cdn.sportmonks.com/images/soccer/teams/9/9.png", meta: { location: "away", winner: null, position: 2 } },
    ],
    odds: [
      { id: 1, fixture_id: 19427195, label: "Home", value: "2.50", probability: "40.01%", winning: false },
      { id: 2, fixture_id: 19427195, label: "Draw", value: "3.40", probability: "24.60%", winning: false },
      { id: 3, fixture_id: 19427195, label: "Away", value: "2.80", probability: "35.39%", winning: false },
    ],
  },
  {
    id: 19427175,
    name: "Arsenal vs Everton",
    starting_at: "2026-03-14 17:30:00",
    result_info: "Arsenal won after full-time.",
    has_odds: true,
    league: { id: 8, name: "Premier League", image_path: "https://cdn.sportmonks.com/images/soccer/leagues/8/8.png" },
    state: { name: "Finished", short_name: "FT" },
    participants: [
      { id: 19, name: "Arsenal", short_code: "ARS", image_path: "https://cdn.sportmonks.com/images/soccer/teams/19/19.png", meta: { location: "home", winner: true, position: 1 } },
      { id: 13, name: "Everton", short_code: "EVE", image_path: "https://cdn.sportmonks.com/images/soccer/teams/13/13.png", meta: { location: "away", winner: false, position: 8 } },
    ],
    odds: [
      { id: 4, fixture_id: 19427175, label: "Home", value: "1.38", probability: "72.46%", winning: true },
      { id: 5, fixture_id: 19427175, label: "Draw", value: "4.75", probability: "21.05%", winning: false },
      { id: 6, fixture_id: 19427175, label: "Away", value: "8.00", probability: "12.50%", winning: false },
    ],
  },
  {
    id: 19427184,
    name: "West Ham United vs Manchester City",
    starting_at: "2026-03-14 20:00:00",
    result_info: "Game ended in draw.",
    has_odds: true,
    league: { id: 8, name: "Premier League", image_path: "https://cdn.sportmonks.com/images/soccer/leagues/8/8.png" },
    state: { name: "Finished", short_name: "FT" },
    participants: [
      { id: 1, name: "West Ham United", short_code: "WHU", image_path: "https://cdn.sportmonks.com/images/soccer/teams/1/1.png", meta: { location: "home", winner: false, position: 18 } },
      { id: 9, name: "Manchester City", short_code: "MCI", image_path: "https://cdn.sportmonks.com/images/soccer/teams/9/9.png", meta: { location: "away", winner: false, position: 2 } },
    ],
    odds: [
      { id: 7, fixture_id: 19427184, label: "Home", value: "4.75", probability: "21.05%", winning: false },
      { id: 8, fixture_id: 19427184, label: "Draw", value: "4.20", probability: "23.81%", winning: true },
      { id: 9, fixture_id: 19427184, label: "Away", value: "1.65", probability: "60.61%", winning: false },
    ],
  },
  {
    id: 19427180,
    name: "Liverpool vs Tottenham Hotspur",
    starting_at: "2026-03-15 16:30:00",
    result_info: "Game ended in draw.",
    has_odds: true,
    league: { id: 8, name: "Premier League", image_path: "https://cdn.sportmonks.com/images/soccer/leagues/8/8.png" },
    state: { name: "Finished", short_name: "FT" },
    participants: [
      { id: 2, name: "Liverpool", short_code: "LIV", image_path: "https://cdn.sportmonks.com/images/soccer/teams/2/2.png", meta: { location: "home", winner: false, position: 3 } },
      { id: 6, name: "Tottenham Hotspur", short_code: "TOT", image_path: "https://cdn.sportmonks.com/images/soccer/teams/6/6.png", meta: { location: "away", winner: false, position: 5 } },
    ],
    odds: [
      { id: 10, fixture_id: 19427180, label: "Home", value: "1.33", probability: "75.19%", winning: false },
      { id: 11, fixture_id: 19427180, label: "Draw", value: "5.00", probability: "20.00%", winning: true },
      { id: 12, fixture_id: 19427180, label: "Away", value: "8.50", probability: "11.76%", winning: false },
    ],
  },
  {
    id: 19427176,
    name: "Brentford vs Wolverhampton Wanderers",
    starting_at: "2026-03-16 20:00:00",
    result_info: "Game ended in draw.",
    has_odds: true,
    league: { id: 8, name: "Premier League", image_path: "https://cdn.sportmonks.com/images/soccer/leagues/8/8.png" },
    state: { name: "Finished", short_name: "FT" },
    participants: [
      { id: 236, name: "Brentford", short_code: "BRE", image_path: "https://cdn.sportmonks.com/images/soccer/teams/12/236.png", meta: { location: "home", winner: false, position: 7 } },
      { id: 29, name: "Wolverhampton Wanderers", short_code: "WOL", image_path: "https://cdn.sportmonks.com/images/soccer/teams/29/29.png", meta: { location: "away", winner: false, position: 20 } },
    ],
    odds: [
      { id: 13, fixture_id: 19427176, label: "Home", value: "1.55", probability: "64.52%", winning: false },
      { id: 14, fixture_id: 19427176, label: "Draw", value: "4.20", probability: "23.81%", winning: true },
      { id: 15, fixture_id: 19427176, label: "Away", value: "5.50", probability: "18.18%", winning: false },
    ],
  },
  {
    id: 19427183,
    name: "Sunderland vs Brighton & Hove Albion",
    starting_at: "2026-03-14 15:00:00",
    result_info: "Brighton & Hove Albion won after full-time.",
    has_odds: true,
    league: { id: 8, name: "Premier League", image_path: "https://cdn.sportmonks.com/images/soccer/leagues/8/8.png" },
    state: { name: "Finished", short_name: "FT" },
    participants: [
      { id: 3, name: "Sunderland", short_code: "SUN", image_path: "https://cdn.sportmonks.com/images/soccer/teams/3/3.png", meta: { location: "home", winner: false, position: 11 } },
      { id: 78, name: "Brighton & Hove Albion", short_code: "BHA", image_path: "https://cdn.sportmonks.com/images/soccer/teams/14/78.png", meta: { location: "away", winner: true, position: 14 } },
    ],
    odds: [
      { id: 16, fixture_id: 19427183, label: "Home", value: "3.60", probability: "27.78%", winning: false },
      { id: 17, fixture_id: 19427183, label: "Draw", value: "3.60", probability: "27.78%", winning: false },
      { id: 18, fixture_id: 19427183, label: "Away", value: "2.00", probability: "50.00%", winning: true },
    ],
  },
];
