import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"float" | "settle" | "exit">("float");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("settle"), 1800);
    const t2 = setTimeout(() => setPhase("exit"), 2800);
    const t3 = setTimeout(onComplete, 3400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "exit" ? (
        <motion.div
          exit={{ opacity: 0, filter: "blur(20px)" }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
        >
          {/* Ambient glow */}
          <div className="absolute w-64 h-64 bg-primary/20 rounded-full blur-[100px] animate-pulse-glow" />
          <div className="absolute w-48 h-48 bg-accent/15 rounded-full blur-[80px] animate-pulse-glow" style={{ animationDelay: "1s" }} />

          {/* Floating particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary/50 rounded-full"
              initial={{
                x: (Math.random() - 0.5) * 300,
                y: (Math.random() - 0.5) * 300,
                opacity: 0,
              }}
              animate={phase === "float" ? {
                x: [(Math.random() - 0.5) * 200, (Math.random() - 0.5) * 200],
                y: [(Math.random() - 0.5) * 200, (Math.random() - 0.5) * 200],
                opacity: [0, 1, 0.5],
              } : { x: 0, y: 0, opacity: 0 }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: i * 0.2 }}
            />
          ))}

          {/* Logo */}
          <motion.div
            initial={{ y: -40, opacity: 0, scale: 0.8 }}
            animate={phase === "float"
              ? { y: [-20, 20, -10], opacity: 1, scale: [0.9, 1.05, 0.95], rotateZ: [-2, 2, -1] }
              : { y: 0, opacity: 1, scale: 1, rotateZ: 0 }
            }
            transition={phase === "float"
              ? { duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }
              : { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
            }
            className="relative"
          >
            <h1 className="text-6xl font-heading font-bold text-gradient-primary tracking-tight">
              ebet
            </h1>
            <motion.div
              className="absolute -inset-4 bg-primary/10 rounded-2xl blur-xl -z-10"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default SplashScreen;
