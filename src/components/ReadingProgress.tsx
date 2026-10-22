import { useEffect, useRef } from 'react';

/** Indicador de leitura sem rerender durante o scroll. */
export function ReadingProgress() {
  const track = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = total <= 0 ? 1 : Math.max(0, Math.min(1, window.scrollY / total));
      if (track.current) track.current.style.transform = `scaleX(${progress})`;
    };
    const schedule = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      cancelAnimationFrame(raf);
    };
  }, []);
  return <div className="reading-progress" aria-hidden="true"><span ref={track}/></div>;
}
