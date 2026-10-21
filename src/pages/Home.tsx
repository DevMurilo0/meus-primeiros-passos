import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  ArrowDown,
  Menu,
  X,
  Plus,
  Minus,
  Instagram,
  Sprout,
} from "lucide-react";
import { Brand, Mark } from "../components/Brand";
import { Illustration } from "../components/Illustration";
import { SiteMotion } from "../components/SiteMotion";
import { school, discoveries, questions } from "../config/school";
import "../styles/home.css";
export default function Home() {
  const [menu, setMenu] = useState(false),
    [discovery, setDiscovery] = useState(0),
    [question, setQuestion] = useState<number | null>(0);
  const selected = discoveries[discovery];
  return (
    <SiteMotion>
      <div className="site">
        <header className="site-header wrap">
          <Brand />
          <nav className="desktop-nav" aria-label="Navegação principal">
            <a href="#escola">Nossa escola</a>
            <a href="#descobertas">Aprender e descobrir</a>
            <a href="#contato">Vamos conversar</a>
          </nav>
          <Link className="portal-link" to="/portal">
            Portal do Professor <ArrowUpRight size={17} />
          </Link>
          <button
            className="icon-btn menu-toggle"
            aria-label={menu ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menu}
            aria-controls="mobile-nav"
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X /> : <Menu />}
          </button>
        </header>
        {menu && (
          <nav
            id="mobile-nav"
            className="mobile-nav"
            aria-label="Navegação mobile"
          >
            {[
              ["Nossa escola", "#escola"],
              ["Aprender e descobrir", "#descobertas"],
              ["Vamos conversar", "#contato"],
            ].map(([label, url]) => (
              <a href={url} key={url} onClick={() => setMenu(false)}>
                {label}
                <ArrowUpRight />
              </a>
            ))}
            <Link to="/portal">
              Portal do Professor <ArrowUpRight />
            </Link>
          </nav>
        )}
        <main id="main">
          <section className="hero wrap">
            <div className="hero-copy">
              <h1>
                <span>Pequenos passos.</span>
                <span className="hero-line">
                  Grandes <em>descobertas.</em>
                </span>
              </h1>
              <p className="hero-description">
                Um começo cheio de afeto.
                <br />
                Um mundo inteiro para descobrir.
              </p>
              <div className="hero-actions">
                <a className="button" href="#escola">
                  Conheça a escola <ArrowRight size={19} />
                </a>
                <a
                  className="text-link"
                  href={school.instagram}
                  target="_blank"
                  rel="noreferrer"
                >
                  Vamos conversar <ArrowUpRight size={18} />
                </a>
              </div>
              <div className="hero-location">
                <span className="location-dot" />
                Educação Infantil ao 5º ano
                <span className="location-divider">/</span>Gravatá, PE
              </div>
            </div>
            <div className="hero-art">
              <div className="art-handnote">
                O futuro começa
                <br />
                <span>com um primeiro passo.</span>
                <svg viewBox="0 0 100 55" aria-hidden="true">
                  <path
                    d="M5 5Q40 3 65 43m-20-5 23 8-1-22"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
              <Illustration />
              <span className="art-caption">
                Um mundo de possibilidades · ilustração conceitual
              </span>
            </div>
            <a className="scroll-note" href="#escola">
              <span>Há muito para descobrir</span>
              <ArrowDown size={17} />
            </a>
          </section>
          <section id="escola" className="story-section">
            <div className="wrap story-grid">
              <div data-reveal>
                <span className="story-flower" aria-hidden="true">
                  <Sprout strokeWidth={1} size={58} />
                </span>
                <h2>
                  O carinho de hoje.
                  <br />
                  <em>Os caminhos de amanhã.</em>
                </h2>
              </div>
              <div className="story-copy" data-reveal>
                <p className="large-copy">Aprender com amor e propósito.</p>
                <p>
                  Na Escola Meus Primeiros Passos, a infância é o ponto de
                  partida de uma história de aprendizagem e memórias.
                </p>
                <p>
                  Da Educação Infantil ao 5º ano, um convite para conhecer de
                  perto cada novo começo.
                </p>
                <a
                  className="text-link light-link"
                  href={school.instagram}
                  target="_blank"
                  rel="noreferrer"
                >
                  Conheça nosso perfil <ArrowUpRight size={18} />
                </a>
              </div>
            </div>
            <div className="story-bottom wrap" data-reveal>
              <span>Escola Meus Primeiros Passos</span>
              <span>Aprender. Crescer. Descobrir.</span>
            </div>
          </section>
          <section id="descobertas" className="discover-section wrap">
            <div className="section-intro" data-reveal>
              <h2>
                Aprender é<br />
                <em>abrir possibilidades.</em>
              </h2>
              <p>
                Uma pergunta, uma história, um encontro.
                <br />
                Pequenas experiências podem abrir grandes caminhos.
              </p>
            </div>
            <div className="discovery-layout">
              <div className={`discovery-art ${selected.color}`}>
                <div key={selected.id} className="art-change">
                  <Illustration kind={selected.art} />
                </div>
                <span className="art-caption">
                  Ilustração conceitual · {selected.title.toLowerCase()}
                </span>
              </div>
              <div
                className="discovery-index"
                aria-label="Explore as possibilidades"
              >
                {discoveries.map((item, i) => (
                  <div
                    key={item.id}
                    className={`discovery-item ${discovery === i ? "selected" : ""}`}
                    data-reveal
                  >
                    <button
                      aria-expanded={discovery === i}
                      aria-controls={`discovery-${i}`}
                      onClick={() => setDiscovery(i)}
                    >
                      <span>{item.title}</span>
                      <ArrowUpRight size={28} />
                    </button>
                    {discovery === i && (
                      <div id={`discovery-${i}`} className="discovery-text">
                        <h3>{item.subtitle}</h3>
                        <p>{item.text}</p>
                      </div>
                    )}
                  </div>
                ))}
                <p className="concept-note">
                  Um olhar conceitual sobre aprender e crescer.
                </p>
              </div>
            </div>
          </section>
          <section className="stages-section">
            <div className="wrap stages-grid">
              <div className="stage-intro" data-reveal>
                <h2>
                  Cada fase,
                  <br />
                  <em>um novo passo.</em>
                </h2>
                <p>
                  O início de uma jornada que merece ser conhecida de perto.
                </p>
                <a
                  className="text-link"
                  href={school.instagram}
                  target="_blank"
                  rel="noreferrer"
                >
                  Converse sobre as turmas <ArrowUpRight size={18} />
                </a>
              </div>
              <article className="stage infant" data-reveal>
                <span className="stage-symbol" aria-hidden="true">
                  <svg viewBox="0 0 100 100">
                    <path
                      d="M20 80V45a30 30 0 0 1 60 0v35"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="14"
                    />
                    <path
                      d="M40 80V49a10 10 0 0 1 20 0v31"
                      fill="currentColor"
                    />
                  </svg>
                </span>
                <h3>
                  Educação
                  <br />
                  Infantil
                </h3>
                <p>
                  As primeiras descobertas.
                  <br />O começo de tantas histórias.
                </p>
              </article>
              <article className="stage fundamental" data-reveal>
                <span className="stage-symbol" aria-hidden="true">
                  <svg viewBox="0 0 100 100">
                    <path
                      d="M15 80V57h23V35h23V13h24v67Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
                <h3>
                  Ensino
                  <br />
                  Fundamental
                </h3>
                <p>
                  Do 1º ao 5º ano.
                  <br />
                  Novos horizontes a cada passo.
                </p>
              </article>
            </div>
          </section>
          <section className="community-section wrap">
            <div className="community-paper" data-reveal>
              <div className="paper-art">
                <Illustration kind="boat" />
              </div>
              <div className="paper-copy">
                <h2>
                  Memórias que
                  <br />
                  <em>a gente leva junto.</em>
                </h2>
                <p>
                  Há momentos que merecem ser compartilhados. No perfil da
                  escola, acompanhe registros e histórias da comunidade escolar.
                </p>
                <a
                  className="button"
                  href={school.instagram}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Instagram size={18} />
                  Acompanhe no Instagram <ArrowUpRight size={18} />
                </a>
              </div>
            </div>
          </section>
          <section className="faq-section wrap">
            <h2 data-reveal>
              Antes do
              <br />
              <em>primeiro passo.</em>
            </h2>
            <div className="faq-list">
              {questions.map((q, i) => (
                <article
                  key={q.question}
                  className={question === i ? "faq-open" : ""}
                  data-reveal
                >
                  <h3>
                    <button
                      aria-expanded={question === i}
                      aria-controls={`faq-${i}`}
                      onClick={() => setQuestion(question === i ? null : i)}
                    >
                      {q.question}
                      {question === i ? (
                        <Minus size={21} />
                      ) : (
                        <Plus size={21} />
                      )}
                    </button>
                  </h3>
                  {question === i && <p id={`faq-${i}`}>{q.answer}</p>}
                </article>
              ))}
            </div>
          </section>
          <section id="contato" className="contact-section">
            <div className="wrap contact-layout" data-reveal>
              <Mark className="contact-mark" />
              <div>
                <h2>
                  Vamos dar o<br />
                  <em>próximo passo?</em>
                </h2>
                <p>
                  Conheça a Escola Meus Primeiros Passos.
                  <br />
                  Uma boa conversa pode ser o começo.
                </p>
              </div>
              <a
                className="button contact-button"
                href={school.instagram}
                target="_blank"
                rel="noreferrer"
              >
                Converse com a escola <ArrowUpRight size={20} />
              </a>
            </div>
          </section>
        </main>
        <footer className="site-footer wrap">
          <div className="footer-top">
            <Brand />
            <p>
              Aprender com amor e propósito.
              <br />
              <span>{school.location}</span>
            </p>
            <nav aria-label="Links do rodapé">
              <a href="#escola">Nossa escola</a>
              <a href={school.instagram} target="_blank" rel="noreferrer">
                Instagram <ArrowUpRight size={14} />
              </a>
              <Link to="/portal">
                Portal do Professor <ArrowUpRight size={14} />
              </Link>
            </nav>
          </div>
          <div className="footer-bottom">
            <span>{school.proposal}</span>
            <span>Identidade visual conceitual · sem vínculo oficial</span>
            <a href="#main">
              Voltar ao início <ArrowUpRight size={14} />
            </a>
          </div>
        </footer>
      </div>
    </SiteMotion>
  );
}
