import { useState, type ReactNode } from "react";
import { ArrowUpRight, Search } from "lucide-react";
import { Modal } from "../../components/Modal";
import { useDemo } from "./context";
import { classes, gradeKey, initials, type DemoStudent } from "./data";
import { average, parseScore } from "../../shared/academic/utils";
export function PageHeading({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <div className="page-heading">
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {children}
    </div>
  );
}

export function Avatar({ student }: { student: DemoStudent }) {
  return (
    <span className={`avatar ${student.color}`} aria-hidden="true">
      {initials(student.full_name)}
    </span>
  );
}

export function ClassSelect({
  value,
  onChange,
  all = false,
}: {
  value: string;
  onChange: (value: string) => void;
  all?: boolean;
}) {
  return (
    <label className="filter-field">
      <span>Turma</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {all && <option value="all">Todas as turmas</option>}
        {classes.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>
    </label>
  );
}

export function TermSelect({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="filter-field">
      <span>Período</span>
      <select value={value} onChange={(e) => onChange(Number(e.target.value))}>
        {[1, 2, 3, 4].map((t) => (
          <option key={t} value={t}>
            {t}º bimestre
          </option>
        ))}
      </select>
    </label>
  );
}

export function StudentTable({
  rows,
  onSelect,
}: {
  rows: DemoStudent[];
  onSelect: (s: DemoStudent) => void;
}) {
  return (
    <div className="white-panel table-panel">
      <div className="panel-title">
        <h2>Alunos da turma</h2>
        <span>{rows.length} alunos</span>
      </div>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th scope="col">Aluno</th>
              <th scope="col">Turma</th>
              <th scope="col">Situação</th>
              <th scope="col">
                <span className="sr-only">Detalhes</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((s) => (
              <tr key={s.id}>
                <td>
                  <button className="student-name" onClick={() => onSelect(s)}>
                    <Avatar student={s} />
                    <strong>{s.full_name}</strong>
                  </button>
                </td>
                <td>{classes.find((c) => c.id === s.classId)?.name}</td>
                <td>
                  <span className="status-pill">Ativo</span>
                </td>
                <td>
                  <button
                    className="icon-btn"
                    aria-label={`Ver ${s.full_name}`}
                    onClick={() => onSelect(s)}
                  >
                    <ArrowUpRight size={17} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!rows.length && (
        <div className="empty-state">
          <Search size={28} />
          <h3>Nenhum aluno encontrado</h3>
          <p>Tente outro nome ou selecione uma turma diferente.</p>
        </div>
      )}
    </div>
  );
}

export function StudentModal({
  student,
  onClose,
}: {
  student: DemoStudent;
  onClose: () => void;
}) {
  const { grades, attendance } = useDemo();
  const [term, setTerm] = useState(4);
  const grade = grades[gradeKey(student.id, term)];
  const score = average(parseScore(grade.activity), parseScore(grade.exam));
  const records = Object.entries(attendance).filter(([key]) =>
    key.startsWith(`${student.id}:`),
  );
  return (
    <Modal title="Acompanhamento do aluno" onClose={onClose}>
      <div className="student-modal-title">
        <Avatar student={student} />
        <div>
          <h3>{student.full_name}</h3>
          <p>{classes.find((c) => c.id === student.classId)?.name}</p>
        </div>
      </div>
      <TermSelect value={term} onChange={setTerm} />
      <div className="student-summary">
        <div>
          <span>Atividade</span>
          <strong>{grade.activity.replace(".", ",") || "—"}</strong>
        </div>
        <div>
          <span>Avaliação</span>
          <strong>{grade.exam.replace(".", ",") || "—"}</strong>
        </div>
        <div>
          <span>Média</span>
          <strong>{score?.toFixed(1).replace(".", ",") ?? "—"}</strong>
        </div>
      </div>
      <h3>Frequência registrada na sessão</h3>
      <p>
        {records.filter(([, v]) => v === "present").length} presenças ·{" "}
        {records.filter(([, v]) => v === "absent").length} faltas ·{" "}
        {records.filter(([, v]) => v === "justified").length} justificativas
      </p>
      <p className="data-caption">
        Perfil e avaliações fictícios. Nenhum dado real de estudante.
      </p>
    </Modal>
  );
}
