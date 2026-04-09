import { motion } from "framer-motion";
import { Gamepad2, Dice1, Target, Zap, Crown, Sparkles } from "lucide-react";

const games = [
  { id: 1, name: "Spin & Win", icon: Target, color: "from-primary to-blue-600" },
  { id: 2, name: "Lucky Dice", icon: Dice1, color: "from-accent to-emerald-600" },
  { id: 3, name: "Crash", icon: Zap, color: "from-yellow-500 to-orange-600" },
  { id: 4, name: "Mines", icon: Crown, color: "from-purple-500 to-pink-600" },
  { id: 5, name: "Plinko", icon: Sparkles, color: "from-red-500 to-rose-600" },
  { id: 6, name: "Jackpot", icon: Gamepad2, color: "from-cyan-500 to-teal-600" },
];

const GamesGrid = () => {
  return (
    <div className="grid grid-cols-2 gap-3">
      {games.map((game, i) => (
        <motion.div
          key={game.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.05 }}
          className="glass-card p-5 flex flex-col items-center gap-3 cursor-pointer hover:border-primary/30 transition-all duration-300 group"
        >
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${game.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
            <game.icon className="w-6 h-6 text-foreground" />
          </div>
          <span className="font-heading font-semibold text-sm">{game.name}</span>
          <span className="text-[10px] text-muted-foreground">Coming Soon</span>
        </motion.div>
      ))}
    </div>
  );
};

export default GamesGrid;
