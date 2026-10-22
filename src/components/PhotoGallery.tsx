import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Plus, X } from 'lucide-react';
import { schoolPhotos } from '../config/school';
import { SchoolPhoto } from './SchoolPhoto';

export function PhotoGallery() {
  const [active, setActive] = useState<number | null>(null);
  const [filter, setFilter] = useState('Todos os momentos');
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const isOpen = active !== null;
  useEffect(() => {
    if (!isOpen) return;
    const element = dialog.current!;
    const previousOverflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = 'hidden';
    return () => { element.close(); document.body.style.overflow = previousOverflow; opener.current?.focus(); };
  }, [isOpen]);
  const photo = active === null ? null : schoolPhotos[active];
  // A navegação do lightbox segue o filtro selecionado, sem saltar para outro evento.
  const visibleIndexes = schoolPhotos.flatMap((item, index) =>
    filter === 'Todos os momentos' || item.event === filter ? [index] : []
  );
  const move = (step: number) => setActive(current => {
    if (current === null || visibleIndexes.length === 0) return current;
    const position = visibleIndexes.indexOf(current);
    return visibleIndexes[(position + step + visibleIndexes.length) % visibleIndexes.length] ?? current;
  });
  return <>
    <div className="gallery-filters" aria-label="Filtrar fotografias">{['Todos os momentos', 'Semana Maluca', 'Corrida do Dia dos Pais'].map(label => <button key={label} aria-pressed={filter === label} onClick={() => setFilter(label)}>{label}</button>)}</div>
    <div className="photo-wall">{schoolPhotos.map((photo, index) => (filter === 'Todos os momentos' || photo.event === filter) && <button className={`photo-print print-${index}`} key={photo.id} data-reveal="photo" onClick={e => { opener.current = e.currentTarget; setActive(index); }} aria-label={`Ampliar: ${photo.title}`}><SchoolPhoto id={photo.id} alt={photo.alt} contain={photo.event === 'Semana Maluca'}/><span className="print-caption">{photo.title}<Plus size={22}/></span></button>)}</div>
    <p className="photo-credit">Registros do perfil oficial da escola. <a href="https://www.instagram.com/escola_meus_primeiros_passos/" target="_blank" rel="noreferrer">Conheça as publicações <ArrowUpRight size={16}/></a></p>
    {photo && <dialog ref={dialog} className="photo-dialog" aria-labelledby="photo-title" onCancel={() => setActive(null)} onClick={e => { if (e.target === dialog.current) setActive(null); }} onKeyDown={e => { if (e.key === 'ArrowRight') { e.preventDefault(); move(1); } if (e.key === 'ArrowLeft') { e.preventDefault(); move(-1); } }}>
      <div className="photo-dialog-top"><span>Memórias da nossa escola · {active === null ? 0 : visibleIndexes.indexOf(active) + 1} / {visibleIndexes.length}</span><button className="icon-btn" aria-label="Fechar fotografia" onClick={() => setActive(null)} autoFocus><X/></button></div>
      <img key={photo.id} className="expanded-photo" src={`/assets/school/${photo.id}.webp`} alt={photo.alt} width={photo.width} height={photo.height}/>
      <div className="photo-dialog-bottom"><button className="icon-btn" aria-label="Fotografia anterior" onClick={() => move(-1)}><ArrowLeft/></button><div aria-live="polite"><h2 id="photo-title">{photo.title}</h2><a href={photo.source} target="_blank" rel="noreferrer">{photo.event} · Ver publicação <ArrowUpRight size={14}/></a></div><button className="icon-btn" aria-label="Próxima fotografia" onClick={() => move(1)}><ArrowRight/></button></div>
    </dialog>}
  </>;
}
