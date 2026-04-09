import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SPORTMONKS_BASE = "https://api.sportmonks.com/v3/football";

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const SPORTMONKS_API_TOKEN = Deno.env.get("SPORTMONKS_API_TOKEN");
    if (!SPORTMONKS_API_TOKEN) {
      return new Response(
        JSON.stringify({ error: "SPORTMONKS_API_TOKEN not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const url = new URL(req.url);
    const endpoint = url.searchParams.get("endpoint") || "fixtures";
    const include = url.searchParams.get("include") || "participants;league;state";
    const filters = url.searchParams.get("filters") || "";
    const roundId = url.searchParams.get("round_id") || "";
    const fixtureId = url.searchParams.get("fixture_id") || "";

    let apiUrl: string;

    if (fixtureId) {
      apiUrl = `${SPORTMONKS_BASE}/fixtures/${fixtureId}?api_token=${SPORTMONKS_API_TOKEN}&include=${include}`;
    } else if (roundId) {
      apiUrl = `${SPORTMONKS_BASE}/rounds/${roundId}?api_token=${SPORTMONKS_API_TOKEN}&include=fixtures.odds.market;fixtures.odds.bookmaker;fixtures.participants;league.country`;
      if (filters) {
        apiUrl += `&filters=${filters}`;
      }
    } else if (endpoint === "fixtures") {
      // Default: get current round fixtures for Premier League
      apiUrl = `${SPORTMONKS_BASE}/fixtures?api_token=${SPORTMONKS_API_TOKEN}&include=${include}&filters=fixtureLeagues:8`;
    } else if (endpoint === "leagues") {
      apiUrl = `${SPORTMONKS_BASE}/leagues?api_token=${SPORTMONKS_API_TOKEN}&include=${include}`;
    } else {
      apiUrl = `${SPORTMONKS_BASE}/${endpoint}?api_token=${SPORTMONKS_API_TOKEN}&include=${include}`;
    }

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: `SportMonks API error [${response.status}]`, details: data }),
        { status: response.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
