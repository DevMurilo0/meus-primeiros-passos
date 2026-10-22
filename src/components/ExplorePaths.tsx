import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, BookOpen, Camera, GraduationCap, Sparkles } from 'lucide-react';
import { SchoolPhoto } from './SchoolPhoto';
import { Flower } from './PlayfulArt';

const paths = [
  {
    name: 'Conhecer a escola',
    eyebrow: '01 · Nossa escola',
    title: 'Tudo começa com acolhimento.',
    description: 'Conheça a proposta, as descobertas e o jeito como a escola apresenta sua história.',
    photo: 'abraco-em-familia',
    alt: 'Família abraçada em um momento da comunidade escolar.',
    to: '#escola',
    action: 'Conhecer a escola',
    icon: BookOpen
  },
  {
    name: 'Ver momentos reais',
    eyebrow: '02 · Nosso álbum',
    title: 'Memórias que merecem ser vistas.',
    description: 'Uma coleção de encontros e atividades reais compartilhadas pela instituição.',
    photo: 'semana-maluca-sorrisos',
    alt: 'Fotografias coloridas da Semana Maluca, publicadas pela escola.',
    to: '#momentos',
    action: 'Abrir o álbum',
    icon: Camera
  },
  {
    name: 'Explorar o portal',
    eyebrow: '03 · Nossa proposta',
    title: 'Um olhar atento a cada passo.',
    description: 'Navegue pela demonstração do Portal do Professor com informações inteiramente fictícias.',
    photo: 'comunidade-reunida',
    alt: 'Comunidade da Escola Meus Primeiros Passos reunida em um evento.',
    to: '/portal',
    action: 'Experimentar o portal',
    icon: GraduationCap
  }
] as const;

export function ExplorePaths() {
  const [selected, setSelected] = useState(0);
  const active = paths[selected];
  return <section className="explore-section" aria-labelledby="explore-title">
    <div className="wrap explore-layout">
      <div className="explore-intro" data-reveal>
        <span className="explore-kicker"><Sparkles size={18}/> Um convite para descobrir</span>
        <h2 id="explore-title">Qual vai ser<br/><em>seu próximo passo?</em></h2>
        <p>Escolha por onde começar. Cada caminho revela um pouquinho mais dessa história.</p>
        <div className="explore-options" role="group" aria-label="Escolher caminho para explorar">
          {paths.map((path,index) => <button key={path.name} type="button" aria-pressed={selected === index} className={selected === index ? 'explore-option selected' : 'explore-option'} onClick={() => setSelected(index)}>
            <path.icon size={20}/><span>{path.name}</span><ArrowUpRight size={18}/>
          </button>)}
        </div>
      </div>
      <div className="explore-card" data-reveal="photo">
        <div className="explore-art"><Flower className="explore-flower"/></div>
        <figure key={active.photo} className="explore-frame"><SchoolPhoto id={active.photo} alt={active.alt}/></figure>
        <div className="explore-card-content" key={active.title}>
          <span className="explore-card-eyebrow">{active.eyebrow}</span>
          <h3>{active.title}</h3>
          <p>{active.description}</p>
          {active.to.startsWith('#')
            ? <a href={active.to} className="explore-card-link">{active.action}<ArrowUpRight size={20}/></a>
            : <Link to={active.to} className="explore-card-link">{active.action}<ArrowUpRight size={20}/></Link>}
        </div>
      </div>
    </div>
  </section>;
}
