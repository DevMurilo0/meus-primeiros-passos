import { useEffect, useRef, useState } from "react";
import { Link, NavLink, Route, Routes, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Bell,
  BookOpen,
  Check,
  ChevronDown,
  ChevronRight,
  ClipboardCheck,
  Flower2,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Menu,
  RotateCcw,
  Users,
  X,
} from "lucide-react";
import { Brand } from "../components/Brand";
import { Illustration } from "../components/Illustration";
import { Modal } from "../components/Modal";
import { school } from "../config/school";
import { DemoProvider, useDemo } from "../features/demo/context";
import { teacher } from "../features/demo/data";
import Dashboard from "../features/demo/Dashboard";
import ClassList from "../features/demo/ClassList";
import Students from "../features/demo/Students";
import Records from "../features/demo/Records";
import Activities from "../features/demo/Activities";
import "../styles/portal.css";
const navigation = [
  { to: "/portal/painel", label: "Visão geral", icon: LayoutDashboard },
  { to: "/portal/turmas", label: "Minhas turmas", icon: GraduationCap },
  { to: "/portal/alunos", label: "Alunos", icon: Users },
  { to: "/portal/notas", label: "Notas e frequência", icon: ClipboardCheck },
  { to: "/portal/conteudos", label: "Conteúdos e atividades", icon: BookOpen },
];
export default function Portal() {
  return (
    <DemoProvider>
      <Routes>
        <Route index element={<PortalEntry />} />
        <Route path="*" element={<PortalShell />} />
      </Routes>
    </DemoProvider>
  );
}
function PortalEntry() {
  return (
    <main id="main" className="portal-entry">
      <div className="entry-art">
        <Brand />
        <div>
          <h2>
            Mais tempo para
            <br />
            <em>o que importa.</em>
          </h2>
          <p>
            Um olhar atento a cada aluno.
            <br />
            Um novo jeito de acompanhar cada passo.
          </p>
          <Illustration />
        </div>
        <span>Uma proposta para a {school.name}</span>
      </div>
      <div className="entry-content">
        <Link className="text-link" to="/">
          <ArrowLeft size={17} />
          Voltar ao site
        </Link>
        <div className="entry-form">
          <span className="portal-symbol">
            <BookOpen size={30} />
          </span>
          <h1>Portal do Professor</h1>
          <p>Seu espaço para organizar a rotina e acompanhar a aprendizagem.</p>
          <div className="entry-demo">
            <span className="demo-label">
              <span />
              Ambiente de demonstração
            </span>
            <h3>Conheça as possibilidades.</h3>
            <p>
              Explore turmas, registros e atividades com dados inteiramente
              fictícios. Sem cadastro e sem senha.
            </p>
            <Link className="button" to="/portal/painel">
              Entrar na demonstração <ArrowRight size={19} />
            </Link>
          </div>
          <p className="entry-footnote">
            Esta é uma proposta independente de experiência digital. Não há
            acesso a registros reais ou autenticação de usuários.
          </p>
        </div>
        <span className="entry-school">{school.name}</span>
      </div>
    </main>
  );
}

function PortalShell() {
  const [mobile, setMobile] = useState(false),
    [notifications, setNotifications] = useState(false),
    [profile, setProfile] = useState(false),
    [resetOpen, setResetOpen] = useState(false);
  const { notice, setNotice, reset, activities } = useDemo();
  const sidebarRef = useRef<HTMLElement>(null);
  const [compact, setCompact] = useState(
    () => window.matchMedia("(max-width:760px)").matches,
  );
  useEffect(() => {
    const query = window.matchMedia("(max-width:760px)");
    const update = () => setCompact(query.matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (!mobile || !compact) return;
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    sidebarRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
    const handle = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobile(false);
        return;
      }
      if (event.key !== "Tab") return;
      const controls = sidebarRef.current?.querySelectorAll<HTMLElement>(
        "a,button:not([disabled])",
      );
      if (!controls?.length) return;
      const first = controls[0],
        last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      }
      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handle);
    return () => {
      document.removeEventListener("keydown", handle);
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, [mobile, compact]);
  const { pathname } = useLocation();
  useEffect(() => {
    if (!notice) return;
    const id = window.setTimeout(() => setNotice(""), 5000);
    return () => clearTimeout(id);
  }, [notice, setNotice]);
  const title =
    navigation.find((n) => pathname.startsWith(n.to))?.label ||
    "Portal do Professor";
  return (
    <div className="portal-app">
      <div className="portal-demo-bar">
        <span className="demo-label">
          <span />
          Ambiente de demonstração
        </span>
        <span>Dados fictícios · alterações ficam apenas nesta sessão</span>
        <Link to="/">
          Conhecer o site <ArrowUpRight size={13} />
        </Link>
      </div>
      <div className="portal-frame">
        {mobile && (
          <button
            className="sidebar-backdrop"
            aria-label="Fechar navegação"
            onClick={() => setMobile(false)}
          />
        )}
        <aside
          ref={sidebarRef}
          inert={compact && !mobile}
          className={`sidebar ${mobile ? "sidebar-open" : ""}`}
        >
          <div className="sidebar-brand">
            <Brand portal />
            <button
              className="icon-btn sidebar-close"
              aria-label="Fechar navegação"
              onClick={() => setMobile(false)}
            >
              <X />
            </button>
          </div>
          <p className="sidebar-title">PORTAL DO PROFESSOR</p>
          <nav aria-label="Navegação do portal">
            {navigation.map((n) => (
              <NavLink key={n.to} to={n.to} onClick={() => setMobile(false)}>
                <n.icon size={19} />
                {n.label}
              </NavLink>
            ))}
          </nav>
          <div className="sidebar-help">
            <Flower2 size={27} />
            <h3>
              Cada registro,
              <br />
              um olhar de cuidado.
            </h3>
            <p>Experimente os recursos e descubra o potencial do portal.</p>
          </div>
          <div className="sidebar-bottom">
            <button onClick={() => setResetOpen(true)}>
              <RotateCcw size={17} />
              Reiniciar demonstração
            </button>
            <Link to="/portal">
              <LogOut size={17} />
              Sair da demonstração
            </Link>
          </div>
        </aside>
        <div className="portal-main-column" inert={compact && mobile}>
          <header className="portal-header">
            <div className="breadcrumb">
              <button
                className="icon-btn sidebar-toggle"
                aria-label="Abrir navegação"
                aria-expanded={mobile}
                onClick={() => setMobile(true)}
              >
                <Menu />
              </button>
              <span>Portal do Professor</span>
              <ChevronRight size={14} />
              <strong>{title}</strong>
            </div>
            <div className="portal-header-actions">
              <span className="school-year">
                Ano letivo <b>2026</b>
              </span>
              <div className="notification-wrap">
                <button
                  className="icon-btn notification-button"
                  aria-label="Notificações da demonstração"
                  aria-expanded={notifications}
                  onClick={() => setNotifications(!notifications)}
                >
                  <Bell size={19} />
                  <i />
                </button>
                {notifications && (
                  <div className="notifications">
                    <h3>Sua rotina em dia</h3>
                    <p>
                      {
                        activities.filter((a) => a.status === "Planejada")
                          .length
                      }{" "}
                      atividades planejadas.
                    </p>
                    <Link
                      onClick={() => setNotifications(false)}
                      to="/portal/conteudos"
                    >
                      Ver atividades <ArrowRight size={15} />
                    </Link>
                    <small>Informações ilustrativas.</small>
                  </div>
                )}
              </div>
              <button
                className="teacher-button"
                onClick={() => setProfile(true)}
                aria-label="Ver perfil fictício da professora"
              >
                <span className="avatar teacher-avatar">MO</span>
                <span>
                  <b>Marina Oliveira</b>
                  <small>Professora</small>
                </span>
                <ChevronDown size={15} />
              </button>
            </div>
          </header>
          <main id="main" className="portal-content">
            <Routes>
              <Route path="painel" element={<Dashboard />} />
              <Route path="turmas" element={<ClassList />} />
              <Route path="turmas/:id" element={<ClassList />} />
              <Route path="alunos" element={<Students />} />
              <Route path="notas" element={<Records />} />
              <Route path="conteudos" element={<Activities />} />
              <Route
                path="*"
                element={
                  <div className="empty-state">
                    <h1>Página não encontrada</h1>
                    <Link to="/portal/painel">Voltar à visão geral</Link>
                  </div>
                }
              />
            </Routes>
          </main>
          <footer className="portal-footer">
            <span>{school.name}</span>
            <span>Ambiente de demonstração · todos os dados são fictícios</span>
          </footer>
        </div>
      </div>
      {notice && (
        <div className="toast" role="status">
          <Check size={18} />
          {notice}
          <button aria-label="Fechar mensagem" onClick={() => setNotice("")}>
            <X size={16} />
          </button>
        </div>
      )}
      {profile && (
        <Modal title="Perfil demonstrativo" onClose={() => setProfile(false)}>
          <div className="profile-detail">
            <span className="avatar teacher-avatar">MO</span>
            <h3>{teacher.name}</h3>
            <p>{teacher.role}</p>
            <p>
              Este perfil é fictício. O acesso de professores e as permissões
              serão configurados em uma futura implantação.
            </p>
          </div>
        </Modal>
      )}
      {resetOpen && (
        <Modal
          title="Reiniciar a demonstração?"
          onClose={() => setResetOpen(false)}
        >
          <p>
            As notas, chamadas e atividades desta sessão voltarão aos exemplos
            iniciais.
          </p>
          <div className="modal-actions">
            <button
              className="secondary-button"
              onClick={() => setResetOpen(false)}
            >
              Cancelar
            </button>
            <button
              className="button"
              onClick={() => {
                reset();
                setResetOpen(false);
              }}
            >
              Reiniciar demonstração
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
