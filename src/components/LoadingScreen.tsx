import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onComplete?: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 1500;
    let animId: number;

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (pct < 100) {
        animId = requestAnimationFrame(updateProgress);
      } else {
        const timer = setTimeout(() => {
          if (onComplete) onComplete();
        }, 250);
        return () => clearTimeout(timer);
      }
    };

    animId = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(animId);
  }, [onComplete]);

  return (
    <motion.div
      key="loading-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center gap-6"
      style={{ backgroundColor: "#07090f" }}
    >
      <div className="flex flex-col items-center gap-4">
        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-xs font-mono text-muted-foreground tracking-[0.3em] uppercase flex items-center gap-1.5"
        >
          <span className="text-primary font-bold">~</span>arghya
          <span className="font-bold" style={{ color: "#8b82ff" }}>
            .dev
          </span>
        </motion.div>

        {/* Loading Bar */}
        <div
          className="w-[180px] h-[2px] rounded-full overflow-hidden relative"
          style={{ background: "rgba(255,255,255,0.05)" }}
        >
          <motion.div
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.05 }}
            className="absolute inset-y-0 left-0 rounded-full"
            style={{ background: "linear-gradient(to right, #6dd3ff, #8b82ff)" }}
          />
        </div>

        {/* Counter */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-[11px] font-mono tracking-widest font-semibold"
          style={{ color: "#6dd3ff" }}
        >
          {progress}%
        </motion.span>
      </div>
    </motion.div>
  );
}
