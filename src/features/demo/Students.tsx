import { useState } from "react";
import { Search, X } from "lucide-react";
import { students, type DemoStudent } from "./data";
import { PageHeading, ClassSelect, StudentTable, StudentModal } from "./ui";

export default function Students() {
  const [search, setSearch] = useState(""),
    [classId, setClassId] = useState("all"),
    [student, setStudent] = useState<DemoStudent | null>(null);
  const rows = students.filter(
    (s) =>
      (classId === "all" || s.classId === classId) &&
      s.full_name
        .toLocaleLowerCase("pt-BR")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(
          search
            .toLocaleLowerCase("pt-BR")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, ""),
        ),
  );
  return (
    <>
      <PageHeading
        title="Cada aluno, uma história."
        description="Conheça e acompanhe os alunos das suas turmas."
      />
      <div className="filter-bar">
        <label className="search-field">
          <Search size={18} />
          <input
            placeholder="Pesquisar aluno pelo nome"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Pesquisar aluno pelo nome"
          />
          {search && (
            <button
              className="icon-btn"
              onClick={() => setSearch("")}
              aria-label="Limpar pesquisa"
            >
              <X size={16} />
            </button>
          )}
        </label>
        <ClassSelect all value={classId} onChange={setClassId} />
      </div>
      <StudentTable rows={rows} onSelect={setStudent} />
      <p className="data-caption">
        {rows.length} de {students.length} alunos fictícios.
      </p>
      {student && (
        <StudentModal student={student} onClose={() => setStudent(null)} />
      )}
    </>
  );
}
