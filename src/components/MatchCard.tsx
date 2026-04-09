import { motion } from "framer-motion";
import { Fixture } from "@/types/betting";
import { useBetSlip } from "@/context/BetSlipContext";
import { Calendar, MapPin } from "lucide-react";

interface MatchCardProps {
  fixture: Fixture;
}

const MatchCard = ({ fixture }: MatchCardProps) => {
  const { addSelection, removeSelection, isSelected } = useBetSlip();
  const home = fixture.participants.find((p) => p.meta.location === "home");
  const away = fixture.participants.find((p) => p.meta.location === "away");
  const isLive = fixture.state?.short_name === "LIVE";
  const isFinished = fixture.state?.short_name === "FT";

  const handleOddClick = (odd: { label: string; value: string }) => {
    if (isFinished) return;
    if (isSelected(fixture.id, odd.label)) {
      removeSelection(fixture.id);
    } else {
      addSelection({
        fixtureId: fixture.id,
        fixtureName: fixture.name,
        label: odd.label,
        odds: parseFloat(odd.value),
        homeTeam: home?.name || "",
        awayTeam: away?.name || "",
      });
    }
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-4 hover:border-primary/30 transition-all duration-300 group"
    >
      {/* League & Status */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {fixture.league && (
            <img src={fixture.league.image_path} alt={fixture.league.name} className="w-4 h-4" />
          )}
          <span className="text-xs text-muted-foreground font-body">{fixture.league?.name}</span>
        </div>
        {isLive && (
          <span className="text-xs font-heading font-semibold text-accent flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-glow" />
            LIVE
          </span>
        )}
        {isFinished && (
          <span className="text-xs font-heading text-muted-foreground">FT</span>
        )}
        {!isLive && !isFinished && (
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formatDate(fixture.starting_at)}
          </span>
        )}
      </div>

      {/* Teams */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3 flex-1">
          <img src={home?.image_path} alt={home?.name} className="w-8 h-8" />
          <span className="font-heading font-semibold text-sm truncate">{home?.name}</span>
        </div>
        <span className="text-xs text-muted-foreground font-heading mx-2">VS</span>
        <div className="flex items-center gap-3 flex-1 justify-end">
          <span className="font-heading font-semibold text-sm truncate text-right">{away?.name}</span>
          <img src={away?.image_path} alt={away?.name} className="w-8 h-8" />
        </div>
      </div>

      {/* Odds */}
      <div className="grid grid-cols-3 gap-2">
        {fixture.odds.map((odd) => {
          const selected = isSelected(fixture.id, odd.label);
          return (
            <button
              key={odd.id}
              onClick={() => handleOddClick(odd)}
              disabled={isFinished}
              className={`
                relative py-2.5 px-2 rounded-lg text-center transition-all duration-200 font-heading
                ${isFinished ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:border-primary/50"}
                ${selected
                  ? "bg-primary/20 border border-primary glow-primary"
                  : "bg-secondary/50 border border-glass-border hover:bg-secondary"
                }
              `}
            >
              <div className="text-[10px] text-muted-foreground mb-0.5">
                {odd.label === "Home" ? "1" : odd.label === "Draw" ? "X" : "2"}
              </div>
              <div className={`text-sm font-bold ${selected ? "text-primary" : "text-foreground"}`}>
                {odd.value}
              </div>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default MatchCard;
