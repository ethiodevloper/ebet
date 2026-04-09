import { useState } from "react";
import { motion } from "framer-motion";
import { Home, Trophy, Gamepad2, Wallet, User } from "lucide-react";

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: "home", icon: Home, label: "Home" },
  { id: "matches", icon: Trophy, label: "Matches" },
  { id: "games", icon: Gamepad2, label: "Games" },
  { id: "wallet", icon: Wallet, label: "Wallet" },
  { id: "profile", icon: User, label: "Profile" },
];

const BottomNav = ({ activeTab, onTabChange }: BottomNavProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 glass backdrop-blur-2xl border-t border-glass-border">
      <div className="flex items-center justify-around max-w-lg mx-auto py-2">
        {tabs.map((tab) => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="relative flex flex-col items-center gap-0.5 px-3 py-1 transition-colors"
            >
              {active && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -top-2 w-8 h-0.5 bg-primary rounded-full glow-primary"
                />
              )}
              <tab.icon className={`w-5 h-5 transition-colors ${active ? "text-primary" : "text-muted-foreground"}`} />
              <span className={`text-[10px] font-heading ${active ? "text-primary" : "text-muted-foreground"}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
