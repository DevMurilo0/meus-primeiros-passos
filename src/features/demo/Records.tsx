import { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  ChartNoAxesColumnIncreasing,
  Check,
  CheckCheck,
  ClipboardCheck,
} from "lucide-react";
import { useDemo } from "./context";
import {
  attendanceKey,
  classes,
  DEMO_DATE,
  gradeKey,
  students,
  type Scores,
} from "./data";
import { average, callNumber, parseScore } from "../../shared/academic/utils";
import type { AttendanceRecord } from "../../shared/academic/types";
import { Avatar, ClassSelect, PageHeading, TermSelect } from "./ui";

export default function Records() {
  const { revision } = useDemo();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const [classId, setClassId] = useState(
      classes.some((c) => c.id === params.get("turma"))
        ? params.get("turma")!
        : "c1",
    ),
    [term, setTerm] = useState(4),
    [tab, setTab] = useState(
      params.get("aba") === "frequencia" ? "frequencia" : "notas",
    );
  return (
    <>
      <PageHeading
        title="Cada passo conta."
        description="Notas e frequência, com atenção a cada aluno."
      />
      <div className="filter-bar">
        <ClassSelect value={classId} onChange={setClassId} />
        {tab === "notas" && <TermSelect value={term} onChange={setTerm} />}
        <span className="filter-hint">
          Ensino Fundamental · registros ilustrativos
        </span>
      </div>
      <div className="record-tabs" role="tablist" aria-label="Tipo de registro">
        <button
          id="tab-notas"
          role="tab"
          aria-selected={tab === "notas"}
          aria-controls="record-panel"
          onClick={() => setTab("notas")}
        >
          <ChartNoAxesColumnIncreasing size={18} />
          Notas
        </button>
        <button
          id="tab-frequencia"
          role="tab"
          aria-selected={tab === "frequencia"}
          aria-controls="record-panel"
          onClick={() => setTab("frequencia")}
        >
          <ClipboardCheck size={18} />
          Frequência
        </button>
      </div>
      <section id="record-panel" role="tabpanel" aria-labelledby={`tab-${tab}`}>
        {tab === "notas" ? (
          <Grades
            key={`${revision}-${classId}-${term}`}
            classId={classId}
            term={term}
          />
        ) : (
          <Attendance key={`${revision}-${classId}`} classId={classId} />
        )}
      </section>
    </>
  );
}

function Grades({ classId, term }: { classId: string; term: number }) {
  const { grades, setGrades, setNotice } = useDemo();
  const rows = students.filter((s) => s.classId === classId);
  const [draft, setDraft] = useState<Record<string, Scores>>(() =>
      Object.fromEntries(
        rows.map((s) => [s.id, { ...grades[gradeKey(s.id, term)] }]),
      ),
    ),
    [dirty, setDirty] = useState(false),
    [error, setError] = useState("");
  const scores = rows.map((s) => {
    try {
      return average(
        parseScore(draft[s.id].activity),
        parseScore(draft[s.id].exam),
      );
    } catch {
      return null;
    }
  });
  function save() {
    try {
      const next = { ...grades };
      rows.forEach((s) => {
        const g = draft[s.id];
        next[gradeKey(s.id, term)] = {
          activity: parseScore(g.activity)?.toString() ?? "",
          exam: parseScore(g.exam)?.toString() ?? "",
        };
      });
      setGrades(next);
      setDirty(false);
      setError("");
      setNotice("Notas salvas nesta sessão de demonstração.");
    } catch (e) {
      setError((e as Error).message);
    }
  }
  return (
    <div className="white-panel table-panel">
      <div className="panel-title">
        <div>
          <h2>Registros de aprendizagem</h2>
          <p>{term}º bimestre · notas de 0 a 10</p>
        </div>
        <span className="status-pill neutral">{rows.length} alunos</span>
      </div>
      <p className="table-swipe-hint">Deslize para ver avaliação, média e registro <span aria-hidden="true">→</span></p>
      <div className="table-scroll" role="region" aria-label="Tabela de notas com rolagem horizontal" tabIndex={0}>
        <table className="grades-table">
          <thead>
            <tr>
              <th scope="col">Aluno</th>
              <th scope="col">Atividade</th>
              <th scope="col">Avaliação</th>
              <th scope="col">Média</th>
              <th scope="col">Registro</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((s, i) => (
              <tr key={s.id}>
                <td>
                  <div className="student-name">
                    <span className="call-number">{callNumber(i)}</span>
                    <Avatar student={s} />
                    <strong>{s.full_name}</strong>
                  </div>
                </td>
                {(["activity", "exam"] as const).map((field, fi) => (
                  <td key={field}>
                    <input
                      className="score-input"
                      inputMode="decimal"
                      aria-label={`${fi ? "Avaliação" : "Atividade"} de ${s.full_name}`}
                      value={draft[s.id][field]}
                      onChange={(e) => {
                        setDraft({
                          ...draft,
                          [s.id]: { ...draft[s.id], [field]: e.target.value },
                        });
                        setDirty(true);
                      }}
                    />
                  </td>
                ))}
                <td>
                  <strong className="grade-average">
                    {scores[i]?.toFixed(1).replace(".", ",") ?? "—"}
                  </strong>
                </td>
                <td>
                  <span
                    className={`status-pill ${scores[i] === null ? "neutral" : scores[i]! < 7 ? "attention" : ""}`}
                  >
                    {scores[i] === null
                      ? "Incompleto"
                      : scores[i]! < 7
                        ? "Acompanhar"
                        : "Registrado"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      <div className="save-bar">
        <p>
          {dirty
            ? "Há alterações nesta turma. Salve antes de trocar os filtros."
            : "Registros ilustrativos · média simples entre atividade e avaliação."}
        </p>
        <button className="button" disabled={!dirty} onClick={save}>
          <Check size={17} />
          Salvar nesta sessão
        </button>
      </div>
    </div>
  );
}

function Attendance({ classId }: { classId: string }) {
  const { attendance, setAttendance, setNotice } = useDemo();
  const [date, setDate] = useState(DEMO_DATE),
    [draft, setDraft] = useState<Record<string, AttendanceRecord["status"]>>(
      {},
    );
  const rows = students.filter((s) => s.classId === classId);
  const status = (id: string) =>
    draft[id] ?? attendance[attendanceKey(id, date)];
  const labels = {
    present: "Presente",
    absent: "Falta",
    justified: "Justificada",
  };
  const count = rows.filter((s) => status(s.id) === "present").length;
  return (
    <div className="white-panel table-panel">
      <div className="panel-title">
        <div>
          <h2>Um olhar para quem está aqui.</h2>
          <p>
            {count} presentes · {rows.length - count} outros ou sem registro
          </p>
        </div>
        <label className="filter-field">
          <span>Data da chamada</span>
          <input
            type="date"
            min="2026-01-01"
            max={DEMO_DATE}
            value={date}
            onChange={(e) => {
              if (e.target.value) {
                setDate(e.target.value);
                setDraft({});
              }
            }}
          />
        </label>
      </div>
      <div className="attendance-toolbar">
        <span>{rows.length} alunos · chamada demonstrativa</span>
        <button
          className="text-link"
          onClick={() =>
            setDraft(Object.fromEntries(rows.map((s) => [s.id, "present"])))
          }
        >
          <CheckCheck size={16} />
          Todos presentes
        </button>
      </div>
      <div className="attendance-list">
        {rows.map((s, i) => (
          <div className="attendance-row" key={s.id}>
            <div className="student-name">
              <span className="call-number">{callNumber(i)}</span>
              <Avatar student={s} />
              <strong>{s.full_name}</strong>
            </div>
            <fieldset>
              <legend className="sr-only">Frequência de {s.full_name}</legend>
              {(Object.keys(labels) as AttendanceRecord["status"][]).map(
                (v) => (
                  <label
                    className={
                      status(s.id) === v
                        ? `attendance-choice selected ${v}`
                        : "attendance-choice"
                    }
                    key={v}
                  >
                    <input
                      type="radio"
                      name={`presence-${s.id}`}
                      checked={status(s.id) === v}
                      onChange={() => setDraft({ ...draft, [s.id]: v })}
                    />
                    {labels[v]}
                  </label>
                ),
              )}
            </fieldset>
          </div>
        ))}
      </div>
      <div className="save-bar">
        <p>
          Chamada de {date.split("-").reverse().join("/")} · dados fictícios.
        </p>
        <button
          className="button"
          disabled={!Object.keys(draft).length}
          onClick={() => {
            if (rows.some((s) => !status(s.id))) {
              setNotice(
                "Marque a frequência de todos os alunos antes de salvar.",
              );
              return;
            }
            setAttendance({
              ...attendance,
              ...Object.fromEntries(
                rows.map((s) => [attendanceKey(s.id, date), status(s.id)]),
              ),
            });
            setDraft({});
            setNotice("Frequência salva nesta sessão de demonstração.");
          }}
        >
          <Check size={17} />
          Salvar nesta sessão
        </button>
      </div>
    </div>
  );
}
