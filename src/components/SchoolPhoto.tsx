import type { CSSProperties } from 'react';

export function SchoolPhoto({ id, alt, priority = false, className = '', style, contain = false }: {
  id: string; alt: string; priority?: boolean; className?: string; style?: CSSProperties; contain?: boolean;
}) {
  return <img className={`school-photo ${className} ${contain ? 'photo-contain' : ''}`} src={`/assets/school/${id}.webp`} srcSet={`/assets/school/${id}-600.webp 600w, /assets/school/${id}.webp 1200w`} sizes="(max-width: 600px) 90vw, (max-width: 900px) 55vw, 600px" alt={alt} width={1200} height={1200} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} decoding="async" style={style} />;
}
