import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { LogOut } from "lucide-react";

const ProfileTab = () => {
  const { user, signOut } = useAuth();
  const initials = (user?.user_metadata?.display_name || user?.email || "U")
    .split(" ")
    .map((w: string) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
      <div className="glass-card p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent mx-auto mb-3 flex items-center justify-center">
          <span className="font-heading font-bold text-xl text-primary-foreground">{initials}</span>
        </div>
        <h2 className="font-heading font-bold">{user?.user_metadata?.display_name || "User"}</h2>
        <p className="text-xs text-muted-foreground">{user?.email || user?.phone || ""}</p>
      </div>
      {["My Bets", "Settings", "Help & Support", "Responsible Gaming"].map((item) => (
        <button key={item} className="glass-card p-4 w-full text-left text-sm font-heading hover:border-primary/30 transition-colors">
          {item}
        </button>
      ))}
      <button
        onClick={signOut}
        className="glass-card p-4 w-full text-left text-sm font-heading hover:border-destructive/30 transition-colors text-destructive flex items-center gap-2"
      >
        <LogOut className="w-4 h-4" /> Log Out
      </button>
    </motion.div>
  );
};

export default ProfileTab;
