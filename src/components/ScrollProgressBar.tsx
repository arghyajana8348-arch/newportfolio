import { motion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function ScrollProgressBar() {
  const [isVisible, setIsVisible] = useState(false);
  const scaleX = useSpring(0, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) {
        scaleX.set(0);
        setIsVisible(false);
        return;
      }
      const progress = window.scrollY / scrollHeight;
      scaleX.set(progress);
      setIsVisible(window.scrollY > 5);
    };

    // Calculate immediately on mount
    handleScroll();

    // Listen to scroll and resize events
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    // Watch for DOM layout changes
    const observer = new MutationObserver(handleScroll);
    observer.observe(document.body, { childList: true, subtree: true });

    // Fallback timers to ensure correct measurement
    const timer1 = setTimeout(handleScroll, 500);
    const timer2 = setTimeout(handleScroll, 2000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      observer.disconnect();
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [scaleX]);

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#7ce7e5] via-[#6dd3ff] to-[#8b82ff] origin-left z-[70] shadow-[0_0_12px_rgba(109,211,255,0.7)] pointer-events-none transition-opacity duration-300"
      style={{ 
        scaleX,
        opacity: isVisible ? 1 : 0 
      }}
    />
  );
}
