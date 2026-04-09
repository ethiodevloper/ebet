import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Search, Bell, Trophy, TrendingUp, Flame } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import SplashScreen from "@/components/SplashScreen";
import BottomNav from "@/components/BottomNav";
import MatchCard from "@/components/MatchCard";
import BetSlip from "@/components/BetSlip";
import GamesGrid from "@/components/GamesGrid";
import WalletView from "@/components/WalletView";
import ProfileTab from "@/components/ProfileTab";
import { BetSlipProvider } from "@/context/BetSlipContext";
import { MOCK_FIXTURES } from "@/data/fixtures";

const AppContent = () => {
  const [activeTab, setActiveTab] = useState("home");

  const upcomingFixtures = MOCK_FIXTURES.filter((f) => !f.result_info);
  const recentFixtures = MOCK_FIXTURES.filter((f) => f.result_info);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-30 glass backdrop-blur-2xl border-b border-glass-border">
        <div className="max-w-lg mx-auto flex items-center justify-between p-4">
          <h1 className="text-xl font-heading font-bold text-gradient-primary">ebet</h1>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-lg hover:bg-secondary/50 transition-colors">
              <Search className="w-5 h-5 text-muted-foreground" />
            </button>
            <button className="p-2 rounded-lg hover:bg-secondary/50 transition-colors relative">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 pt-4">
        {activeTab === "home" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            {/* Hero Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-5 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/15 to-accent/10" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-2">
                  <Flame className="w-4 h-4 text-accent" />
                  <span className="text-xs font-heading font-semibold text-accent">HOT MATCH</span>
                </div>
                <h2 className="font-heading font-bold text-lg mb-1">Chelsea vs Manchester City</h2>
                <p className="text-xs text-muted-foreground font-body">Premier League • Apr 12, 15:30</p>
                <button className="mt-3 bg-gradient-to-r from-primary to-accent text-primary-foreground font-heading font-semibold text-xs px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
                  Bet Now →
                </button>
              </div>
            </motion.div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "Live", value: "3", icon: TrendingUp, color: "text-accent" },
                { label: "Today", value: "12", icon: Trophy, color: "text-primary" },
                { label: "My Bets", value: "2", icon: Flame, color: "text-orange-400" },
              ].map((stat) => (
                <div key={stat.label} className="glass-card p-3 text-center">
                  <stat.icon className={`w-4 h-4 mx-auto mb-1 ${stat.color}`} />
                  <div className="font-heading font-bold text-lg">{stat.value}</div>
                  <div className="text-[10px] text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Upcoming */}
            <div>
              <h3 className="font-heading font-semibold text-sm mb-3 flex items-center gap-2">
                <span className="w-1 h-4 bg-primary rounded-full" />
                Upcoming Matches
              </h3>
              <div className="space-y-3">
                {upcomingFixtures.map((f) => <MatchCard key={f.id} fixture={f} />)}
              </div>
            </div>

            {/* Recent Results */}
            <div>
              <h3 className="font-heading font-semibold text-sm mb-3 flex items-center gap-2">
                <span className="w-1 h-4 bg-accent rounded-full" />
                Recent Results
              </h3>
              <div className="space-y-3">
                {recentFixtures.slice(0, 3).map((f) => <MatchCard key={f.id} fixture={f} />)}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "matches" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
            <h2 className="font-heading font-bold text-lg mb-1">All Matches</h2>
            <p className="text-xs text-muted-foreground mb-4">Premier League • Round 30-34</p>
            {MOCK_FIXTURES.map((f) => <MatchCard key={f.id} fixture={f} />)}
          </motion.div>
        )}

        {activeTab === "games" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="font-heading font-bold text-lg mb-1">Mini Games</h2>
            <p className="text-xs text-muted-foreground mb-4">Instant wins & more</p>
            <GamesGrid />
          </motion.div>
        )}

        {activeTab === "wallet" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="font-heading font-bold text-lg mb-4">Wallet</h2>
            <WalletView />
          </motion.div>
        )}

        {activeTab === "profile" && (
          <ProfileTab />
        )}
      </main>

      <BetSlip />
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <BetSlipProvider>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      <AppContent />
    </BetSlipProvider>
  );
};

export default Index;
