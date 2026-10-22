import { useEffect, useRef, type ReactNode } from 'react';

/**
 * Um só orquestrador para as entradas institucionais.
 * As fotos têm movimentos diferentes por capítulo; nenhuma é escondida antes do JS.
 * Pausar/reduzir movimento sempre deixa todas as fotos totalmente visíveis.
 */
type PhotoVariant = 'bloom' | 'rise' | 'swing' | 'cascade' | 'lift';

const photoFrames: Record<PhotoVariant, { x: number; y: number; rotation: number; scale: number; duration: number }> = {
  bloom:   { x: -66, y: 68, rotation: -7, scale: .93, duration: 1150 },
  rise:    { x: 0, y: 90, rotation: 2, scale: .97, duration: 950 },
  swing:   { x: 74, y: 54, rotation: 7, scale: .95, duration: 1100 },
  cascade: { x: 0, y: 82, rotation: -5, scale: .96, duration: 890 },
  lift:    { x: 32, y: 80, rotation: 3, scale: .96, duration: 980 }
};

export function SiteMotion({ children, paused = false }: { children: ReactNode; paused?: boolean }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = root.current;
    if (!container) return;
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    let cleanup = () => {};

    const setup = () => {
      cleanup();
      if (preference.matches || paused) return;

      const animations = new Set<Animation>();
      const animate = (el: Element, keyframes: Keyframe[], options: KeyframeAnimationOptions) => {
        const animation = el.animate(keyframes, { fill: 'both', ...options });
        animations.add(animation);
        animation.addEventListener('finish', () => {
          animation.cancel(); // O último frame coincide com o CSS natural.
          animations.delete(animation);
        }, { once: true });
      };

      const observer = new IntersectionObserver(entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(entry.target);
          const el = entry.target as HTMLElement;

          if (el.hasAttribute('data-photo-motion')) {
            if (el.dataset.photoSeen === 'true') continue;
            el.dataset.photoSeen = 'true';

            const rawVariant = el.dataset.photoMotion || 'rise';
            const variant: PhotoVariant = Object.prototype.hasOwnProperty.call(photoFrames, rawVariant)
              ? rawVariant as PhotoVariant : 'rise';
            const { x, y, rotation, scale, duration } = photoFrames[variant];
            const order = Math.max(0, Math.min(5, Number(el.dataset.photoOrder || 0)));
            const delay = variant === 'cascade' ? order * 90 : 0;
            const easing = 'cubic-bezier(.16,1,.3,1)';

            animate(el, [
              { opacity: .14, transform: `translate3d(${x}px,${y}px,0) rotate(${rotation}deg) scale(${scale})` },
              { opacity: 1, transform: 'translate3d(0,0,0) rotate(0deg) scale(1)' }
            ], { duration, delay, easing });

            const img = el.querySelector('.school-photo');
            if (img) animate(img, [
              { clipPath: 'inset(0 0 24% 0 round 18px)', transform: 'scale(1.14) translate3d(0,20px,0)', filter: 'blur(3px)', opacity: .6 },
              { clipPath: 'inset(0 0 0 0 round 0px)', transform: 'scale(1) translate3d(0,0,0)', filter: 'blur(0px)', opacity: 1 }
            ], { duration: duration + 160, delay: delay + 75, easing });

            const caption = el.querySelector('.photo-label, .discovery-photo-label, .print-caption, figcaption');
            if (caption) animate(caption, [
              { opacity: 0, transform: 'translate3d(0,21px,0) rotate(-3deg)' },
              { opacity: 1, transform: 'translate3d(0,0,0) rotate(0deg)' }
            ], { duration: 650, delay: delay + 300, easing });
          } else if (!el.dataset.revealSeen) {
            el.dataset.revealSeen = 'true';
            animate(el, [
              { opacity: .25, transform: 'translateY(78px) rotate(2deg)' },
              { opacity: 1, transform: 'translateY(0) rotate(0)' }
            ], { duration: 800, easing: 'cubic-bezier(.16,1,.3,1)' });
          }
        }
      }, { threshold: .12, rootMargin: '0px 0px -25px 0px' });

      const observeNode = (node: Element) => {
        if (!node.matches('[data-reveal], [data-photo-motion]')) return;
        if (node.hasAttribute('data-photo-motion') ? node.dataset.photoSeen !== 'true' : node.dataset.revealSeen !== 'true') {
          observer.observe(node);
        }
      };
      container.querySelectorAll('[data-reveal], [data-photo-motion]').forEach(observeNode);

      // Fotos inseridas após um filtro da galeria também recebem entrada.
      const changes = new MutationObserver(records => {
        for (const record of records) {
          for (const node of record.addedNodes) {
            if (!(node instanceof Element)) continue;
            observeNode(node);
            node.querySelectorAll('[data-reveal], [data-photo-motion]').forEach(observeNode);
          }
        }
      });
      changes.observe(container, { childList: true, subtree: true });

      const layers = [...container.querySelectorAll<HTMLElement>('[data-parallax]')];
      let frame = 0;
      const update = () => {
        frame = 0;
        for (const el of layers) {
          const rect = el.getBoundingClientRect();
          if (rect.bottom < -100 || rect.top > innerHeight + 100) continue;
          const shift = Math.max(-55, Math.min(55, (innerHeight / 2 - rect.top - rect.height / 2) * Number(el.dataset.parallax)));
          el.style.translate = `0 ${shift}px`;
        }
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
        observer.disconnect();
        changes.disconnect();
        animations.forEach(animation => animation.cancel());
        cancelAnimationFrame(frame);
        window.removeEventListener('scroll', scroll);
        layers.forEach(el => { el.style.translate = ''; });
        magnets.forEach(el => {
          el.removeEventListener('pointermove', move);
          el.removeEventListener('pointerleave', leave);
          el.style.translate = '';
        });
      };
    };

    setup();
    preference.addEventListener('change', setup);
    return () => { cleanup(); preference.removeEventListener('change', setup); };
  }, [paused]);

  return <div ref={root} className={paused ? 'motion-paused' : undefined}>{children}</div>;
}
