import { useRef } from 'react';

export function Flower({ className = '' }: { className?: string }) {
  return <svg className={className} data-parallax={className.includes("story") ? "0.1" : undefined} viewBox="0 0 120 120" fill="none" aria-hidden="true"><path d="M60 30C38-9 2 25 30 49C-12 50-2 96 36 84C19 124 65 137 73 95C100 126 129 91 95 70C139 58 116 17 83 41C88-1 42-9 60 30Z" fill="currentColor"/><circle cx="62" cy="64" r="17" fill="var(--paper)"/><path d="M53 65q9 12 18 0" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round"/><circle cx="55" cy="59" r="2" fill="var(--ink)"/><circle cx="68" cy="59" r="2" fill="var(--ink)"/></svg>;
}
export function Trail({ className = '' }: { className?: string }) {
  return <svg className={className} viewBox="0 0 600 250" fill="none" aria-hidden="true"><path d="M-10 160C85 10 185 250 280 130S390-10 465 90s50 130 140 25" stroke="currentColor" strokeWidth="5" strokeDasharray="2 14" strokeLinecap="round"/><path d="m573 101 28 14-13 29" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
export function PlaySticker() {
  const ref = useRef<HTMLButtonElement>(null);
  return <button ref={ref} className="play-sticker" aria-label="Girar flor da imaginação" onClick={() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    ref.current?.getAnimations().forEach(a => a.cancel());
    ref.current?.animate([{ transform: 'rotate(-12deg) scale(1)' }, { transform: 'rotate(200deg) scale(1.2)', offset: .65 }, { transform: 'rotate(348deg) scale(1)' }], { duration: 850, easing: 'cubic-bezier(.22,1,.36,1)' });
  }}><Flower/><span>solte a<br/>imaginação!</span></button>;
}
