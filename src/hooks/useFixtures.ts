import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Fixture } from "@/types/betting";

interface SportMonksFixture {
  id: number;
  name: string;
  starting_at: string;
  result_info: string | null;
  has_odds: boolean;
  participants?: Array<{
    id: number;
    name: string;
    short_code: string;
    image_path: string;
    meta: { location: "home" | "away"; winner: boolean | null; position: number };
  }>;
  league?: { id: number; name: string; image_path: string };
  state?: { name: string; short_name: string };
  odds?: Array<{
    id: number;
    fixture_id: number;
    label: string;
    value: string;
    probability: string;
    winning: boolean;
  }>;
}

function mapFixture(f: SportMonksFixture): Fixture {
  return {
    id: f.id,
    name: f.name,
    starting_at: f.starting_at,
    result_info: f.result_info,
    has_odds: f.has_odds,
    participants: f.participants || [],
    odds: (f.odds || []).map((o) => ({
      id: o.id,
      fixture_id: o.fixture_id,
      label: o.label,
      value: o.value,
      probability: o.probability,
      winning: o.winning,
    })),
    league: f.league,
    state: f.state,
  };
}

export function useFixtures(roundId?: string) {
  return useQuery({
    queryKey: ["fixtures", roundId],
    queryFn: async (): Promise<Fixture[]> => {
      const params = new URLSearchParams();
      if (roundId) {
        params.set("round_id", roundId);
        params.set("filters", "markets:1;bookmakers:2");
      } else {
        params.set("endpoint", "fixtures");
        params.set("include", "participants;league;state");
      }

      const { data, error } = await supabase.functions.invoke("sportmonks", {
        body: null,
        headers: {},
      });

      // For now, if edge function fails, we return empty
      if (error) {
        console.error("SportMonks fetch error:", error);
        return [];
      }

      if (roundId && data?.data?.fixtures) {
        return data.data.fixtures.map(mapFixture);
      }

      if (data?.data && Array.isArray(data.data)) {
        return data.data.map(mapFixture);
      }

      return [];
    },
    staleTime: 60_000,
    retry: 1,
  });
}

export function useFixtureDetail(fixtureId: number) {
  return useQuery({
    queryKey: ["fixture", fixtureId],
    queryFn: async (): Promise<Fixture | null> => {
      const { data, error } = await supabase.functions.invoke("sportmonks", {
        body: null,
        headers: {},
      });

      if (error || !data?.data) return null;
      return mapFixture(data.data);
    },
    enabled: fixtureId > 0,
  });
}
