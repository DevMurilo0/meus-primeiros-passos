import { useEffect, useRef, type ReactNode } from 'react';

export function SiteMotion({ children, paused = false }: { children: ReactNode; paused?: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = root.current!;
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    let cleanup = () => {};
    const setup = () => {
      cleanup();
      if (preference.matches || paused) return;
      const animations = new Set<Animation>();
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          const isPhoto = entry.target.getAttribute('data-reveal') === 'photo';
          const a = entry.target.animate(isPhoto ? [
            { clipPath: 'inset(0 0 100% 0)', translate: '0 75px' },
            { clipPath: 'inset(0 0 0% 0)', translate: '0 0' },
          ] : [
            { opacity: .25, transform: 'translateY(80px) rotate(2deg)' },
            { opacity: 1, transform: 'translateY(0) rotate(0)' },
          ], { duration: isPhoto ? 1000 : 800, easing: 'cubic-bezier(.16,1,.3,1)' });
          animations.add(a);
          a.onfinish = () => animations.delete(a);
        });
      }, { threshold: .12 });
      container.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
      const layers = [...container.querySelectorAll<HTMLElement>('[data-parallax]')];
      let frame = 0;
      const update = () => {
        frame = 0;
        layers.forEach(el => {
          const rect = el.getBoundingClientRect();
          if (rect.bottom < -100 || rect.top > innerHeight + 100) return;
          const shift = Math.max(-55, Math.min(55, (innerHeight / 2 - rect.top - rect.height / 2) * Number(el.dataset.parallax)));
          el.style.translate = `0 ${shift}px`;
        });
      };
      const scroll = () => { if (!frame) frame = requestAnimationFrame(update); };
      window.addEventListener('scroll', scroll, { passive: true });
      update();
      const magnets = [...container.querySelectorAll<HTMLElement>('[data-magnetic]')];
      const fine = matchMedia('(hover: hover) and (pointer: fine)');
      const move = (event: PointerEvent) => {
        if (!fine.matches) return;
        const el = event.currentTarget as HTMLElement, rect = el.getBoundingClientRect();
        el.style.translate = `${(event.clientX - rect.left - rect.width / 2) * .12}px ${(event.clientY - rect.top - rect.height / 2) * .18}px`;
      };
      const leave = (event: PointerEvent) => { (event.currentTarget as HTMLElement).style.translate = ''; };
      magnets.forEach(el => { el.addEventListener('pointermove', move); el.addEventListener('pointerleave', leave); });
      cleanup = () => {
        observer.disconnect(); animations.forEach(a => a.cancel()); cancelAnimationFrame(frame);
        window.removeEventListener('scroll', scroll);
        layers.forEach(el => { el.style.translate = ''; });
        magnets.forEach(el => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave); el.style.translate = ''; });
      };
    };
    setup(); preference.addEventListener('change', setup);
    return () => { cleanup(); preference.removeEventListener('change', setup); };
  }, [paused]);
  return <div ref={root} className={paused ? 'motion-paused' : undefined}>{children}</div>;
}
