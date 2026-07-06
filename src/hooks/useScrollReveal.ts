import { useEffect } from "react";

/**
 * Scroll-reveal hook — ported from aushman/src/hooks/useScrollReveal.js
 *
 * Watches every element with the `.reveal` class in the document and adds
 * `.in-view` when it enters the viewport, triggering the CSS transition
 * defined in styles.css.  Each element is unobserved after it reveals
 * (one-shot, no re-hiding on scroll-out).
 *
 * @param threshold  Fraction of the element that must be visible (0 – 1).  Default 0.12
 * @param rootMargin IntersectionObserver rootMargin.  Default "0px 0px -40px 0px"
 *                   (fires 40 px before the element reaches the bottom of the viewport)
 */
export function useScrollReveal(
  threshold = 0.12,
  rootMargin = "0px 0px -40px 0px"
) {
  useEffect(() => {
    const targets =
      document.querySelectorAll<HTMLElement>(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);   // one-shot
          }
        });
      },
      { threshold, rootMargin }
    );

    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [threshold, rootMargin]);
}
