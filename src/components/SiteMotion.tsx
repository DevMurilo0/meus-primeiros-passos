import { useEffect, type ReactNode } from "react";
export function SiteMotion({ children }: { children: ReactNode }) {
  useEffect(() => {
    const elements = document.querySelectorAll("[data-reveal]");
    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.12 },
    );
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top > window.innerHeight) {
        el.classList.add("will-reveal");
        observer.observe(el);
      }
    });
    return () => observer.disconnect();
  }, []);
  return <>{children}</>;
}
