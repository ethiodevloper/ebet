import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownLeft, Clock } from "lucide-react";

const transactions = [
  { id: 1, type: "deposit", amount: 500, date: "Apr 8, 2026", status: "completed" },
  { id: 2, type: "bet", amount: -100, date: "Apr 7, 2026", status: "completed" },
  { id: 3, type: "win", amount: 350, date: "Apr 7, 2026", status: "completed" },
  { id: 4, type: "withdraw", amount: -200, date: "Apr 6, 2026", status: "pending" },
];

const WalletView = () => {
  return (
    <div className="space-y-6">
      {/* Balance Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/5" />
        <div className="relative">
          <p className="text-xs text-muted-foreground font-body mb-1">Your Balance</p>
          <h2 className="text-4xl font-heading font-bold text-gradient-primary">1,550.00</h2>
          <p className="text-sm text-muted-foreground font-body mt-1">ETB</p>
        </div>
        <div className="relative flex gap-3 mt-5">
          <button className="flex-1 bg-gradient-to-r from-primary to-accent text-primary-foreground font-heading font-semibold py-2.5 rounded-lg text-sm hover:opacity-90 transition-opacity">
            Deposit
          </button>
          <button className="flex-1 border border-glass-border text-foreground font-heading font-semibold py-2.5 rounded-lg text-sm hover:bg-secondary/50 transition-colors">
            Withdraw
          </button>
        </div>
      </motion.div>

      {/* Transactions */}
      <div>
        <h3 className="font-heading font-semibold text-sm mb-3">Recent Transactions</h3>
        <div className="space-y-2">
          {transactions.map((tx, i) => (
            <motion.div
              key={tx.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card p-3 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${tx.amount > 0 ? "bg-accent/20" : "bg-destructive/20"}`}>
                  {tx.amount > 0 ? (
                    <ArrowDownLeft className="w-4 h-4 text-accent" />
                  ) : (
                    <ArrowUpRight className="w-4 h-4 text-destructive" />
                  )}
                </div>
                <div>
                  <span className="text-sm font-heading font-semibold capitalize">{tx.type}</span>
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    {tx.status === "pending" && <Clock className="w-2.5 h-2.5" />}
                    {tx.date}
                  </div>
                </div>
              </div>
              <span className={`font-heading font-bold text-sm ${tx.amount > 0 ? "text-accent" : "text-destructive"}`}>
                {tx.amount > 0 ? "+" : ""}{tx.amount} ETB
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WalletView;
