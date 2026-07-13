import { motion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const SPRING = {
  mass: 0.1,
  damping: 10,
  stiffness: 131,
};

export function SpringMouseFollow() {
  const [enabled, setEnabled] = useState(false);
  const xSpring = useSpring(0, SPRING);
  const ySpring = useSpring(0, SPRING);
  const opacitySpring = useSpring(0, SPRING);
  const scaleSpring = useSpring(0, SPRING);

  useEffect(() => {
    const prefersFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!prefersFinePointer) return;

    setEnabled(true);

    const onMove = (e: PointerEvent) => {
      xSpring.set(e.clientX);
      ySpring.set(e.clientY);
      // Ensure cursor is visible when moving
      if (opacitySpring.get() === 0) {
        opacitySpring.set(1);
        scaleSpring.set(1);
      }
    };
    const onEnter = () => {
      opacitySpring.set(1);
      scaleSpring.set(1);
    };
    const onLeave = () => {
      opacitySpring.set(0);
      scaleSpring.set(0);
    };

    window.addEventListener("pointermove", onMove);
    document.documentElement.addEventListener("pointerenter", onEnter);
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerenter", onEnter);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [xSpring, ySpring, opacitySpring, scaleSpring]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[60] size-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/70 shadow-[0_0_24px_color-mix(in_oklab,var(--primary)_60%,transparent)] mix-blend-screen"
      style={{
        x: xSpring,
        y: ySpring,
        opacity: opacitySpring,
        scale: scaleSpring,
      }}
    />
  );
}
