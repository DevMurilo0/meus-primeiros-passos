import { Component, lazy, Suspense, useEffect, type ReactNode } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { school } from "../config/school";
const Home = lazy(() => import("../pages/Home"));
const Portal = lazy(() => import("../pages/Portal"));
class ErrorBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? (
      <main className="standalone" id="main">
        <h1>Vamos tentar mais uma vez?</h1>
        <p>Não foi possível abrir esta tela.</p>
        <button className="button" onClick={() => window.location.reload()}>
          Recarregar
        </button>
        <a href="/">Voltar ao site</a>
      </main>
    ) : (
      this.props.children
    );
  }
}
export default function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    document.title = `${pathname.startsWith("/portal") ? "Portal do Professor · " : ""}${school.name}`;
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <ErrorBoundary>
      <a href="#main" className="skip-link">
        Pular para o conteúdo
      </a>
      <Suspense
        fallback={
          <div className="page-loading" role="status">
            <span className="loading-mark" />
            Abrindo novos caminhos…
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portal/*" element={<Portal />} />
          <Route
            path="*"
            element={
              <main className="standalone" id="main">
                <h1>Este caminho ainda não existe.</h1>
                <Link className="button" to="/">
                  Voltar ao início
                </Link>
              </main>
            }
          />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}
