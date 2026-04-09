import { motion, AnimatePresence } from "framer-motion";
import { useBetSlip } from "@/context/BetSlipContext";
import { X, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import { useState } from "react";

const BetSlip = () => {
  const { state, removeSelection, clearSlip, setStake, totalOdds, potentialPayout } = useBetSlip();
  const [isExpanded, setIsExpanded] = useState(true);
  const count = state.selections.length;

  if (count === 0) return null;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-14 left-0 right-0 z-50 max-w-lg mx-auto"
    >
      <div className="glass backdrop-blur-2xl border-t border-x border-glass-border rounded-t-2xl shadow-2xl">
        {/* Header */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between p-4 pb-2"
        >
          <div className="flex items-center gap-2">
            <span className="font-heading font-bold text-sm">Bet Slip</span>
            <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">
              {count}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-accent font-heading font-semibold">
              {totalOdds.toFixed(2)}x
            </span>
            {isExpanded ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronUp className="w-4 h-4 text-muted-foreground" />}
          </div>
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              {/* Selections */}
              <div className="px-4 max-h-48 overflow-y-auto space-y-2">
                {state.selections.map((sel) => (
                  <div key={sel.fixtureId} className="flex items-center justify-between bg-secondary/50 rounded-lg p-2.5">
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-muted-foreground truncate">{sel.homeTeam} vs {sel.awayTeam}</div>
                      <div className="text-sm font-heading font-semibold flex items-center gap-2">
                        <span>{sel.label === "Home" ? "1" : sel.label === "Draw" ? "X" : "2"}</span>
                        <span className="text-primary">{sel.odds.toFixed(2)}</span>
                      </div>
                    </div>
                    <button onClick={() => removeSelection(sel.fixtureId)} className="p-1 text-muted-foreground hover:text-destructive transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Stake & Payout */}
              <div className="p-4 space-y-3">
                <div className="neon-line" />
                <div className="flex items-center gap-2">
                  <label className="text-xs text-muted-foreground font-body">Stake (ETB)</label>
                  <input
                    type="number"
                    value={state.stake}
                    onChange={(e) => setStake(Math.max(0, Number(e.target.value)))}
                    className="flex-1 bg-secondary/50 border border-glass-border rounded-lg px-3 py-2 text-sm font-heading text-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground font-body">Potential Payout</span>
                  <span className="font-heading font-bold text-accent">{potentialPayout.toFixed(2)} ETB</span>
                </div>

                <div className="flex gap-2">
                  <button onClick={clearSlip} className="flex items-center gap-1 px-3 py-2 text-xs text-muted-foreground hover:text-destructive border border-glass-border rounded-lg transition-colors">
                    <Trash2 className="w-3 h-3" /> Clear
                  </button>
                  <button className="flex-1 bg-gradient-to-r from-primary to-accent text-primary-foreground font-heading font-bold py-2.5 rounded-lg hover:opacity-90 transition-opacity glow-primary">
                    Place Bet
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default BetSlip;
