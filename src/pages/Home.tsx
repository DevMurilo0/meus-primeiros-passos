import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowDown, Menu, X, Plus, Minus, Pause, Play, Instagram, MapPin, Navigation2, MoveUpRight, Heart } from 'lucide-react';
import { Brand } from '../components/Brand';
import { SiteMotion } from '../components/SiteMotion';
import { SchoolPhoto } from '../components/SchoolPhoto';
import { PhotoGallery } from '../components/PhotoGallery';
import { ExplorePaths } from '../components/ExplorePaths';
import { MemoryChapters } from '../components/MemoryChapters';
import { ReadingProgress } from '../components/ReadingProgress';
import { SchoolMap } from '../components/SchoolMap';
import { Flower, PlaySticker, Trail } from '../components/PlayfulArt';
import { school, schoolEditorial, questions } from '../config/school';
import '../styles/home.css';

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [discovery, setDiscovery] = useState(0);
  const [question, setQuestion] = useState<number | null>(0);
  const [paused, setPaused] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const selected = schoolEditorial.discoveries[discovery];
  return <SiteMotion paused={paused}><div className="site"><ReadingProgress/>
    <header className="site-header wrap">
      <Brand/>
      <nav className="desktop-nav" aria-label="Navegação principal"><a href="#escola">Nossa escola</a><a href="#descobertas">Descobertas</a><a href="#momentos">Nossos momentos</a><a href="#localizacao">Onde estamos</a></nav>
      <Link className="portal-link" to="/portal">Portal do Professor <ArrowUpRight size={17}/></Link>
      <button ref={menuButton} className="icon-btn menu-toggle" aria-label={menu ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menu} aria-controls="mobile-nav" onClick={() => setMenu(!menu)}>{menu ? <X/> : <Menu/>}</button>
    </header>
    {menu && <nav id="mobile-nav" className="mobile-nav" aria-label="Navegação mobile" onKeyDown={e => { if (e.key === 'Escape') { setMenu(false); menuButton.current?.focus(); } }}>
      {[["Nossa escola", "#escola"], ["Descobertas", "#descobertas"], ["Nossos momentos", "#momentos"], ["Onde estamos", "#localizacao"], ["Vamos conversar", "#contato"]].map(([label,url]) => <a key={url} href={url} onClick={() => setMenu(false)}>{label}<ArrowUpRight/></a>)}<Link to="/portal">Portal do Professor <ArrowUpRight/></Link>
    </nav>}
    <main id="main">
      <section className="hero wrap">
        <div className="hero-copy">
          <h1><span className="hero-small">Pequenos passos.</span><span className="hero-word">Grandes</span><span className="hero-word hero-last">descobertas<span className="title-dot">.</span></span></h1>
          <p className="hero-description">A infância tem pressa de descobrir.<br/>Aqui, cada passo vira uma história.</p>
          <div className="hero-actions"><a className="button" href="#escola" data-magnetic>Conheça a escola <ArrowUpRight size={21}/></a><a className="text-link" href={school.instagram} target="_blank" rel="noreferrer">Vamos conversar <ArrowUpRight size={18}/></a></div>
          <p className="hero-location">{school.stages[0]} ao 5º ano <span>·</span> {school.location}</p>
        </div>
        <div className="hero-scene">
          <div className="hero-sun" aria-hidden="true"/>
          <figure className="hero-main-photo"><SchoolPhoto id="corrida-em-familia" alt="Criança e adulto em movimento na Corrida do Dia dos Pais da escola." priority/><figcaption>Corrida do Dia dos Pais <ArrowUpRight size={18}/></figcaption></figure>
          <figure className="hero-small-photo"><SchoolPhoto id="semana-maluca-amizade" alt="Duas crianças com cabelos criativos na Semana Maluca da escola." priority/><figcaption>Imaginar sem tamanho.</figcaption></figure>
          <PlaySticker/>
          <Trail className="hero-trail"/>
          <span className="hero-photo-note">Registros reais da nossa comunidade</span>
        </div>
        <div className="hero-bottom"><a href="#escola" className="scroll-note"><span className="scroll-circle"><ArrowDown size={20}/></span>O próximo passo é descobrir</a><button className="motion-control" aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? <Play size={15}/> : <Pause size={15}/>} {paused ? 'Retomar movimento' : 'Pausar movimento'}</button></div>
      </section>
      <div className="word-ribbon"><div className="ribbon-track" aria-hidden="true">{[0,1,2,3].map(i => <span key={i}>aprender <Flower/> brincar <Flower/> imaginar <Flower/> crescer <Flower/></span>)}</div><span className="sr-only">Aprender, brincar, imaginar, crescer.</span></div>
      <section id="escola" className="story-section">
        <div className="wrap story-grid">
          <div className="story-visual" data-photo-motion="bloom"><SchoolPhoto id="abraco-em-familia" alt="Pai e filha abraçados durante um evento da comunidade escolar."/><span className="photo-label">Afeto que acompanha.</span><Flower className="story-flower"/></div>
          <div className="story-copy"><h2 data-reveal>Amor no começo.<br/><em>Mundo pela frente.</em></h2><p className="large-copy" data-reveal>{school.positioning}</p><p data-reveal>{schoolEditorial.about}</p><p data-reveal>{schoolEditorial.intro}</p><a className="text-link" href={school.instagram} target="_blank" rel="noreferrer">Conheça nossa escola <ArrowUpRight size={20}/></a></div>
        </div>
        <Trail className="story-trail"/>
      </section>
      <section id="descobertas" className="discover-section">
        <div className="wrap"><div className="section-intro"><h2 data-reveal>É assim que<br/><em>a gente descobre.</em></h2><p data-reveal>Tem cor. Tem movimento. Tem imaginação.<br/>E histórias da escola para contar.</p></div>
          <div className="discovery-layout"><div className={`discovery-picture discovery-${discovery}`} data-photo-motion="rise"><div key={selected.photo} className="discovery-image"><SchoolPhoto id={selected.photo} alt={selected.alt}/></div><span className="discovery-photo-label">{discovery === 1 ? 'Capa da publicação · Infantil I' : discovery === 2 ? 'Corrida do Dia dos Pais' : 'Semana Maluca · recorte do registro oficial'}</span><Flower className="discovery-flower"/></div>
            <div className="discovery-index">{schoolEditorial.discoveries.map((item,i) => <div key={item.title} className={`discovery-item ${i === discovery ? 'selected' : ''}`}><h3><button aria-expanded={i === discovery} aria-controls={i === discovery ? `discovery-${i}` : undefined} onClick={() => setDiscovery(i)}>{item.title}<ArrowUpRight/></button></h3>{i === discovery && <div className="discovery-text" id={`discovery-${i}`}><h4>{item.subtitle}</h4><p>{item.text}</p><a href={item.source} target="_blank" rel="noreferrer">Ver registro da escola <ArrowUpRight size={17}/></a></div>}</div>)}</div>
          </div>
        </div>
      </section>
      <section className="stages-section"><div className="wrap"><h2 data-reveal>Crescer tem<br/><em>tantos caminhos.</em></h2><div className="stages-grid"><article className="stage infant" data-reveal><div className="stage-arch" aria-hidden="true"><span/><span/><span/></div><div><h3>{school.stages[0]}</h3><p>As primeiras descobertas.<br/>O começo de tantas histórias.</p><a href={school.instagram} target="_blank" rel="noreferrer">Converse sobre as turmas <ArrowUpRight size={20}/></a></div></article><article className="stage fundamental" data-reveal><div className="step-shape" aria-hidden="true"><span/><span/><span/></div><div><h3>Ensino Fundamental</h3><p>Do 1º ao 5º ano.<br/>Novos horizontes a cada passo.</p><a href={school.instagram} target="_blank" rel="noreferrer">Conheça essa etapa <ArrowUpRight size={20}/></a></div></article></div></div></section>
      <MemoryChapters/>
      <section id="momentos" className="gallery-section"><div className="wrap"><div className="gallery-heading"><h2 data-reveal>A infância<br/><em>acontece aqui.</em></h2><div><Flower className="gallery-flower"/><p>Um álbum de ideias, encontros<br/>e momentos para guardar.</p></div></div><PhotoGallery/></div></section>
      <section className="community-section"><div className="wrap community-layout"><div className="community-copy"><h2 data-reveal>Juntos é<br/><em>mais bonito.</em></h2><p data-reveal>{schoolEditorial.community}</p><a className="button" href="https://www.instagram.com/p/DcHT8nZCUxI/" target="_blank" rel="noreferrer"><Instagram size={19}/> Veja esse encontro <ArrowUpRight size={19}/></a></div><figure className="community-photo" data-photo-motion="swing"><SchoolPhoto id="comunidade-reunida" alt="Famílias reunidas para a Corrida do Dia dos Pais da Escola Meus Primeiros Passos."/><figcaption>Um registro da nossa comunidade.</figcaption></figure><Trail className="community-trail"/></div></section>
      <ExplorePaths/>
      <section className="faq-section wrap"><h2 data-reveal>Antes do<br/><em>primeiro passo.</em></h2><div className="faq-list">{questions.map((q,i) => <article key={q.question} className={question === i ? 'faq-open' : ''}><h3><button aria-expanded={question === i} aria-controls={question === i ? `faq-${i}` : undefined} onClick={() => setQuestion(question === i ? null : i)}>{q.question}{question === i ? <Minus size={21}/> : <Plus size={21}/>}</button></h3>{question === i && <p id={`faq-${i}`}>{q.answer}</p>}</article>)}</div></section>
      <section id="contato" className="contact-section"><div className="wrap contact-layout"><Flower className="contact-flower"/><h2 data-reveal>O próximo passo<br/><em>começa com um oi.</em></h2><div className="contact-bottom"><p>Vamos conhecer essa história de perto?<br/>Converse com a escola pelo Instagram.</p><a className="button contact-button" data-magnetic href={school.instagram} target="_blank" rel="noreferrer">Diga oi para a escola <ArrowUpRight size={24}/></a></div><Trail className="contact-trail"/></div></section>
    </main>
    <footer className="site-footer">
      <div className="footer-visit-band">
        <section id="localizacao" className="footer-visit wrap" aria-labelledby="visit-heading">
          <div className="footer-visit-info">
            <span className="footer-eyebrow"><MapPin size={18}/> Nosso cantinho em Gravatá</span>
            <h2 id="visit-heading">A próxima descoberta<br/><em>fica logo ali.</em></h2>
            <p>Um lugar para aprender, brincar e criar histórias. Veja onde fica a Escola Meus Primeiros Passos.</p>
            <address>{school.address}</address>
            <a className="map-route" href={school.mapsUrl} target="_blank" rel="noopener noreferrer">Ver localização no Google Maps <Navigation2 size={18}/></a>
            <small className="address-source">Endereço de diretórios públicos; confirme com a escola antes da visita.</small>
            <div className="footer-visit-sticker" aria-hidden="true"><Heart size={26}/><span>Vem conhecer!</span></div>
          </div>
          <SchoolMap/>
          <Flower className="footer-map-flower"/>
        </section>
      </div>
      <div className="footer-ribbon" aria-hidden="true"><div className="footer-ribbon-track">
        {[0,1,2,3].map(i=><span key={i}>imaginar <b>✳</b> aprender <b>✳</b> crescer <b>✳</b> descobrir <b>✳</b></span>)}
      </div></div>
      <div className="footer-core">
        <div className="wrap">
          <div className="footer-intro-line"><span>COM CARINHO, DE GRAVATÁ PARA O MUNDO</span><Flower className="footer-intro-flower"/></div>
          <p className="footer-statement">Todo grande sonho<br/><em>começa com um passo.</em></p>
          <div className="footer-main-grid">
            <div className="footer-identity">
              <div className="footer-logo-panel"><Brand/></div>
              <p>{school.positioning}<br/>Uma história de descobertas que começa aqui.</p>
              <div className="footer-education"><span>Educação Infantil</span><span>Ensino Fundamental · 1º ao 5º ano</span></div>
            </div>
            <nav className="footer-links" aria-label="Links do rodapé">
              <h2>Explore</h2>
              <a href="#escola">Nossa escola <ArrowUpRight size={18}/></a>
              <a href="#descobertas">Descobertas <ArrowUpRight size={18}/></a>
              <a href="#momentos">Nossos momentos <ArrowUpRight size={18}/></a>
              <a href="#localizacao">Onde estamos <ArrowUpRight size={18}/></a>
              <Link to="/portal">Portal do Professor <ArrowUpRight size={18}/></Link>
            </nav>
            <div className="footer-connect">
              <h2>Vamos conversar?</h2>
              <p>Acompanhe os momentos da escola e converse com a equipe pelo Instagram.</p>
              <a className="footer-social-link" href={school.instagram} target="_blank" rel="noopener noreferrer">
                <span className="footer-social-icon"><Instagram size={22}/></span>
                <span>Nos acompanhe no Instagram<small>@escola_meus_primeiros_passos</small></span>
                <ArrowUpRight size={22}/>
              </a>
              <a className="footer-directions" href={school.mapsUrl} target="_blank" rel="noopener noreferrer"><MapPin size={18}/> Como chegar <ArrowUpRight size={18}/></a>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom-band"><div className="wrap footer-bottom">
        <span>Escola Meus Primeiros Passos <b aria-hidden="true">✳</b> {school.location}</span>
        <a className="developer-credit" href="https://murilogabriel.com.br" target="_blank" rel="noopener noreferrer">
          <span className="developer-credit-copy">Desenvolvido por <strong>Murilo Gabriel</strong><small>murilogabriel.com.br</small></span><MoveUpRight size={18}/>
        </a>
      </div></div>
    </footer>
  </div></SiteMotion>;
}
