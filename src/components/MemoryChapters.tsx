import { useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Instagram, Sparkles } from 'lucide-react';
import { SchoolPhoto } from './SchoolPhoto';
import { Flower } from './PlayfulArt';

/**
 * Álbum de dois acontecimentos documentados no inventário de fotografias.
 * Sem depoimentos inventados ou dados de matrículas.
 */
const chapters = [
  {
    id: 'corrida',
    number: '01',
    label: 'Corrida do Dia dos Pais',
    short: 'Passos juntos',
    title: 'Tem caminho que fica mais bonito quando a gente corre junto.',
    text: 'Na Corrida do Dia dos Pais, crianças e famílias dividiram sorrisos, movimento e momentos para guardar.',
    photo: 'corrida-em-familia',
    photoAlt: 'Criança e adulto correndo em um caminho arborizado na Corrida do Dia dos Pais.',
    inset: 'abraco-em-familia',
    insetAlt: 'Pai e filha abraçados em encontro da comunidade escolar.',
    source: 'https://www.instagram.com/p/DcHT8nZCUxI/',
    credit: 'Registro da Corrida do Dia dos Pais',
  },
  {
    id: 'semana',
    number: '02',
    label: 'Semana Maluca',
    short: 'Ideias sem limite',
    title: 'Quando a imaginação chega, a rotina vira uma festa de cores.',
    text: 'Cabelos criativos, mochilas diferentes e muita imaginação: a Semana Maluca ganhou seus próprios registros.',
    photo: 'semana-maluca-sorrisos',
    photoAlt: 'Colagem publicada pela escola com crianças e cabelos criativos na Semana Maluca.',
    inset: 'semana-maluca-criacoes',
    insetAlt: 'Colagem de criações coloridas durante a Semana Maluca.',
    source: 'https://www.instagram.com/p/DeeZjW_IN4A/',
    credit: 'Registro da Semana Maluca',
  },
] as const;

export function MemoryChapters() {
  const [index, setIndex] = useState(0);
  const chapter = chapters[index];
  const move = (direction: number) => {
    setIndex(current => (current + direction + chapters.length) % chapters.length);
  };

  return <section id="capitulos" className="memory-section" aria-labelledby="memory-heading">
    <div className="wrap">
      <header className="memory-intro" data-reveal>
        <div className="memory-intro-copy">
          <span className="memory-eyebrow"><Sparkles size={18}/> UM ÁLBUM DE VERDADE</span>
          <h2 id="memory-heading">A infância não cabe<br/><em>numa fotografia.</em></h2>
        </div>
        <p>Mas cada imagem guarda uma história. Folheie dois capítulos que já fazem parte das memórias da escola.</p>
      </header>
      <div className={`memory-spread memory-spread-${chapter.id}`}>
        <div className="memory-media">
          <div className="memory-photo-stage" key={chapter.id}>
            <span className="memory-filmholes memory-filmholes-top" aria-hidden="true"/>
            <figure className="memory-photo-primary" data-photo-motion="bloom">
              <SchoolPhoto id={chapter.photo} alt={chapter.photoAlt}/>
            </figure>
            <figure className="memory-photo-secondary" data-photo-motion="swing">
              <SchoolPhoto id={chapter.inset} alt={chapter.insetAlt}/>
            </figure>
            <span className="memory-photo-ribbon" aria-hidden="true">{chapter.short}</span>
            <span className="memory-filmholes memory-filmholes-bottom" aria-hidden="true"/>
          </div>
          <div className="memory-brand-stamp" aria-hidden="true">
            <img src="/assets/brand/logo-mpp.png" alt="" width={130} height={107} loading="lazy" decoding="async"/>
          </div>
          <Flower className="memory-doodle" />
        </div>
        <div className="memory-story" aria-live="polite" aria-atomic="true" key={chapter.id}>
          <span className="memory-page-index">CAPÍTULO <strong>{chapter.number}</strong> / 02</span>
          <span className="memory-event-label">{chapter.label}</span>
          <h3>{chapter.title}</h3>
          <p>{chapter.text}</p>
          <a className="memory-post-link" href={chapter.source} target="_blank" rel="noopener noreferrer">
            <Instagram size={20}/> Ver publicação original <ArrowUpRight size={19}/>
          </a>
          <span className="memory-caption">{chapter.credit} · Fotografias do perfil da escola</span>
        </div>
      </div>
      <div className="memory-navigation">
        <div className="memory-navigation-label">FOLHEIE O ÁLBUM <span aria-hidden="true">↗</span></div>
        <div className="memory-chapter-tabs" role="group" aria-label="Escolher capítulo do álbum">
          {chapters.map((item, chapterIndex) => <button
            key={item.id} type="button" className={`memory-chapter-tab ${index === chapterIndex ? 'is-active' : ''}`}
            aria-pressed={index === chapterIndex} onClick={() => setIndex(chapterIndex)}
          ><span>{item.number}</span> {item.label}</button>)}
        </div>
        <div className="memory-arrows">
          <button type="button" aria-label="Capítulo anterior" onClick={() => move(-1)}><ArrowLeft size={22}/></button>
          <button type="button" aria-label="Próximo capítulo" onClick={() => move(1)}><ArrowRight size={22}/></button>
        </div>
      </div>
    </div>
  </section>;
}
