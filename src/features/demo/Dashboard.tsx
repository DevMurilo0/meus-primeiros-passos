import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  ChartNoAxesColumnIncreasing,
  CheckCheck,
  ChevronRight,
  GraduationCap,
  Plus,
  Users,
} from "lucide-react";
import { Illustration } from "../../components/Illustration";
import { useDemo } from "./context";
import { attendanceKey, classes, DEMO_DATE, gradeKey, students } from "./data";
import { average, parseScore } from "../../shared/academic/utils";

export default function Dashboard() {
  const { activities, attendance, grades } = useDemo();
  const present = students.filter(
    (s) => attendance[attendanceKey(s.id, DEMO_DATE)] === "present",
  ).length;
  const avg =
    students
      .map((s) => grades[gradeKey(s.id, 4)])
      .map((g) => average(parseScore(g.activity), parseScore(g.exam))!)
      .reduce((a, b) => a + b, 0) / students.length;
  return (
    <>
      <div className="dashboard-date">
        <CalendarDays size={15} />
        Quarta-feira, 21 de outubro de 2026<span>Agenda ilustrativa</span>
      </div>
      <section className="welcome-panel">
        <div>
          <h1>
            Olá, professora Marina<span>Vamos fazer um bom dia?</span>
          </h1>
          <p>
            Cada descoberta merece um olhar atento.
            <br />
            Sua rotina de hoje começa aqui.
          </p>
          <Link className="button" to="/portal/notas?aba=frequencia">
            Registrar frequência <ArrowRight size={17} />
          </Link>
        </div>
        <Illustration kind="plant" />
      </section>
      <div className="stats-grid">
        {[
          {
            label: "Minhas turmas",
            value: classes.length,
            detail: "Ensino Fundamental",
            icon: GraduationCap,
            color: "sage",
          },
          {
            label: "Alunos acompanhados",
            value: students.length,
            detail: "Nas suas três turmas",
            icon: Users,
            color: "peach",
          },
          {
            label: "Frequência do dia",
            value: `${Math.round((present / students.length) * 100)}%`,
            detail: `${present} de ${students.length} presentes`,
            icon: CheckCheck,
            color: "yellow",
          },
          {
            label: "Média das turmas",
            value: avg.toFixed(1).replace(".", ","),
            detail: "4º bimestre · simulação",
            icon: ChartNoAxesColumnIncreasing,
            color: "lavender",
          },
        ].map((stat) => (
          <article className="stat" key={stat.label}>
            <span className={`stat-icon ${stat.color}`}>
              <stat.icon size={19} />
            </span>
            <span className="stat-label">{stat.label}</span>
            <strong>{stat.value}</strong>
            <small>{stat.detail}</small>
          </article>
        ))}
      </div>
      <div className="dashboard-grid">
        <section className="white-panel">
          <div className="panel-title">
            <h2>Minhas turmas</h2>
            <Link to="/portal/turmas">
              Ver todas <ArrowRight size={15} />
            </Link>
          </div>
          {classes.map((c, i) => (
            <Link
              key={c.id}
              className="class-row"
              to={`/portal/turmas/${c.id}`}
            >
              <span
                className={`class-icon ${["sage", "peach", "lavender"][i]}`}
              >
                <GraduationCap size={23} />
              </span>
              <span>
                <strong>{c.name}</strong>
                <small>
                  {students.filter((s) => s.classId === c.id).length} alunos ·{" "}
                  {c.shift}
                </small>
              </span>
              <ChevronRight size={18} />
            </Link>
          ))}
        </section>
        <section className="white-panel agenda-panel">
          <div className="panel-title">
            <h2>Próximos passos</h2>
            <Link to="/portal/conteudos">
              Ver agenda <ArrowRight size={15} />
            </Link>
          </div>
          {activities
            .filter((a) => a.status === "Planejada")
            .slice(0, 3)
            .map((a) => (
              <Link
                key={a.id}
                to={`/portal/conteudos?atividade=${a.id}`}
                className="agenda-item"
              >
                <span className="date-tile">
                  <strong>{a.date.slice(8)}</strong>
                  <small>OUT</small>
                </span>
                <span>
                  <strong>{a.title}</strong>
                  <small>
                    {classes.find((c) => c.id === a.classId)?.grade_level} ·{" "}
                    {a.subject}
                  </small>
                </span>
                <ChevronRight size={16} />
              </Link>
            ))}
        </section>
      </div>
      <section className="quick-link-panel">
        <span className="class-icon sage">
          <BookOpen size={25} />
        </span>
        <div>
          <h2>Uma boa ideia merece espaço.</h2>
          <p>Organize conteúdos e planeje as próximas descobertas da turma.</p>
        </div>
        <Link className="secondary-button" to="/portal/conteudos?nova=1">
          Planejar uma atividade <Plus size={17} />
        </Link>
      </section>
    </>
  );
}
