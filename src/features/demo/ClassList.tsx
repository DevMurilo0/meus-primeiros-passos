import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, ArrowRight, GraduationCap, Users } from "lucide-react";
import { Illustration } from "../../components/Illustration";
import { classes, students, type DemoStudent } from "./data";
import { PageHeading, StudentTable, StudentModal } from "./ui";

export default function ClassList() {
  const { pathname } = useLocation();
  const id = pathname.split("/")[3];
  const selected = classes.find((c) => c.id === id);
  const [student, setStudent] = useState<DemoStudent | null>(null);
  return (
    <>
      <PageHeading
        title={selected ? selected.name : "Minhas turmas"}
        description={
          selected
            ? "Um espaço para acompanhar cada descoberta."
            : "Três turmas, muitas histórias para acompanhar."
        }
      />
      {selected ? (
        <>
          <Link to="/portal/turmas" className="text-link back-link">
            <ArrowLeft size={16} />
            Todas as turmas
          </Link>
          <section className="class-detail-banner">
            <GraduationCap size={42} />
            <div>
              <h2>{selected.grade_level} · Ensino Fundamental</h2>
              <p>
                {selected.shift} · Ano letivo 2026 ·{" "}
                {students.filter((s) => s.classId === selected.id).length}{" "}
                alunos fictícios
              </p>
            </div>
            <Link className="button" to={`/portal/notas?turma=${selected.id}`}>
              Abrir registros <ArrowRight size={17} />
            </Link>
          </section>
          <StudentTable
            rows={students.filter((s) => s.classId === selected.id)}
            onSelect={setStudent}
          />
        </>
      ) : (
        <div className="class-cards">
          {classes.map((c, i) => (
            <article className="class-card" key={c.id}>
              <div
                className={`class-card-art ${["sage", "peach", "lavender"][i]}`}
              >
                <Illustration kind={["plant", "book", "boat"][i]} />
                <span className="class-shift">{c.shift}</span>
              </div>
              <div className="class-card-body">
                <span className="subtle-label">Ensino Fundamental · 2026</span>
                <h2>{c.name}</h2>
                <p>
                  <Users size={16} />
                  {
                    students.filter((s) => s.classId === c.id).length
                  } alunos <span className="status-pill">Em andamento</span>
                </p>
                <Link to={`/portal/turmas/${c.id}`} className="class-card-link">
                  Acompanhar turma <ArrowRight size={18} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
      {student && (
        <StudentModal student={student} onClose={() => setStudent(null)} />
      )}
      <p className="data-caption">
        Turmas, nomes e registros criados exclusivamente para esta demonstração.
      </p>
    </>
  );
}
