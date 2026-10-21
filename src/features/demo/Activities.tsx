import { useState } from "react";
import { useLocation } from "react-router-dom";
import { ArrowRight, ArrowUpRight, BookOpen, Check, Plus } from "lucide-react";
import { Modal } from "../../components/Modal";
import { useDemo } from "./context";
import { classes, dateLabel, DEMO_DATE, type DemoActivity } from "./data";
import { ClassSelect, PageHeading, TermSelect } from "./ui";

export default function Activities() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const { activities, setActivities, setNotice } = useDemo();
  const [classId, setClassId] = useState("all"),
    [term, setTerm] = useState(4),
    [status, setStatus] = useState("all"),
    [newOpen, setNewOpen] = useState(params.get("nova") === "1"),
    [selected, setSelected] = useState<DemoActivity | null>(
      () => activities.find((a) => a.id === params.get("atividade")) ?? null,
    );
  const filtered = activities.filter(
    (a) =>
      (classId === "all" || a.classId === classId) &&
      a.term === term &&
      (status === "all" || a.status === status),
  );
  return (
    <>
      <PageHeading
        title="Ideias que viram descobertas."
        description="Planeje, organize e acompanhe as atividades da turma."
      >
        <button className="button" onClick={() => setNewOpen(true)}>
          <Plus size={17} />
          Nova atividade
        </button>
      </PageHeading>
      <div className="filter-bar">
        <ClassSelect all value={classId} onChange={setClassId} />
        <TermSelect value={term} onChange={setTerm} />
        <label className="filter-field">
          <span>Situação</span>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="all">Todas as atividades</option>
            <option>Planejada</option>
            <option>Concluída</option>
          </select>
        </label>
      </div>
      <div className="activity-list">
        {filtered.map((a) => (
          <article className="activity-card" key={a.id}>
            <span
              className={`activity-icon ${a.subject === "Ciências" ? "sage" : a.subject === "Matemática" ? "yellow" : "peach"}`}
            >
              <BookOpen size={24} />
            </span>
            <div>
              <div className="activity-meta">
                <span>{classes.find((c) => c.id === a.classId)?.name}</span>
                <span>{dateLabel(a.date)}</span>
              </div>
              <h2>
                <button onClick={() => setSelected(a)}>{a.title}</button>
              </h2>
              <p>{a.description}</p>
              <span className="subject-tag">{a.subject}</span>
            </div>
            <div className="activity-side">
              <span
                className={`status-pill ${a.status === "Planejada" ? "attention" : ""}`}
              >
                {a.status}
              </span>
              <button className="text-link" onClick={() => setSelected(a)}>
                Ver atividade <ArrowUpRight size={16} />
              </button>
            </div>
          </article>
        ))}
        {!filtered.length && (
          <div className="white-panel empty-state">
            <BookOpen size={30} />
            <h2>Um espaço para novas ideias.</h2>
            <p>
              Nenhuma atividade com esses filtros. Experimente outro período ou
              crie uma atividade.
            </p>
            <button className="button" onClick={() => setNewOpen(true)}>
              Planejar uma atividade <Plus size={16} />
            </button>
          </div>
        )}
      </div>
      {newOpen && (
        <ActivityForm
          onClose={() => setNewOpen(false)}
          onCreated={(a) => {
            setActivities([...activities, a]);
            setNewOpen(false);
            setTerm(a.term);
            setClassId("all");
            setStatus("all");
            setNotice("Atividade criada nesta sessão de demonstração.");
          }}
        />
      )}
      {selected && (
        <Modal title="Detalhes da atividade" onClose={() => setSelected(null)}>
          <span className="subject-tag">{selected.subject}</span>
          <h3 className="activity-modal-title">{selected.title}</h3>
          <p>{selected.description}</p>
          <dl className="activity-details">
            <dt>Turma</dt>
            <dd>{classes.find((c) => c.id === selected.classId)?.name}</dd>
            <dt>Data</dt>
            <dd>{selected.date.split("-").reverse().join("/")}</dd>
            <dt>Período</dt>
            <dd>{selected.term}º bimestre</dd>
            <dt>Situação</dt>
            <dd>{selected.status}</dd>
          </dl>
          <div className="modal-actions">
            <button
              className="button"
              onClick={() => {
                const next = {
                  ...selected,
                  status:
                    selected.status === "Planejada" ? "Concluída" : "Planejada",
                } as DemoActivity;
                setActivities(
                  activities.map((a) => (a.id === next.id ? next : a)),
                );
                setSelected(next);
                setNotice("Situação atualizada nesta sessão.");
              }}
            >
              {selected.status === "Planejada"
                ? "Marcar como concluída"
                : "Voltar para planejada"}
              <Check size={17} />
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}

function ActivityForm({
  onClose,
  onCreated,
}: {
  onClose: () => void;
  onCreated: (a: DemoActivity) => void;
}) {
  const [classId, setClassId] = useState("c1"),
    [term, setTerm] = useState(4);
  return (
    <Modal title="Uma nova descoberta" onClose={onClose}>
      <form
        className="activity-form"
        onSubmit={(e) => {
          e.preventDefault();
          const form = new FormData(e.currentTarget);
          onCreated({
            id: crypto.randomUUID(),
            title: String(form.get("title")).trim(),
            description: String(form.get("description")).trim(),
            subject: String(form.get("subject")),
            date: String(form.get("date")),
            classId,
            term,
            status: "Planejada",
          });
        }}
      >
        <label>
          Título da atividade
          <input
            name="title"
            required
            maxLength={100}
            pattern=".*\S.*"
            placeholder="O que vamos descobrir?"
          />
        </label>
        <div className="form-columns">
          <ClassSelect value={classId} onChange={setClassId} />
          <TermSelect value={term} onChange={setTerm} />
        </div>
        <div className="form-columns">
          <label>
            Componente
            <select name="subject">
              <option>Língua Portuguesa</option>
              <option>Matemática</option>
              <option>Ciências</option>
              <option>História</option>
              <option>Geografia</option>
              <option>Arte</option>
            </select>
          </label>
          <label>
            Data
            <input
              name="date"
              type="date"
              required
              min="2026-01-01"
              max="2026-12-31"
              defaultValue={DEMO_DATE}
            />
          </label>
        </div>
        <label>
          Descrição
          <textarea
            name="description"
            required
            maxLength={600}
            rows={4}
            placeholder="Conte um pouco sobre a proposta da atividade."
          />
        </label>
        <p className="data-caption">
          O planejamento fica somente nesta sessão demonstrativa.
        </p>
        <div className="modal-actions">
          <button className="secondary-button" type="button" onClick={onClose}>
            Cancelar
          </button>
          <button className="button" type="submit">
            Criar atividade <ArrowRight size={17} />
          </button>
        </div>
      </form>
    </Modal>
  );
}
