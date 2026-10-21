import type {
  AttendanceRecord,
  SchoolClass,
  Student,
} from "../../shared/academic/types";
export const DEMO_DATE = "2026-10-21";
export const teacher = {
  name: "Marina Oliveira",
  role: "Professora · perfil fictício",
};
export const classes: SchoolClass[] = [
  {
    id: "c1",
    name: "1º ano · Turma Girassol",
    grade_level: "1º ano",
    shift: "Manhã",
    school_year: 2026,
    active: true,
  },
  {
    id: "c2",
    name: "2º ano · Turma Semente",
    grade_level: "2º ano",
    shift: "Manhã",
    school_year: 2026,
    active: true,
  },
  {
    id: "c3",
    name: "3º ano · Turma Horizonte",
    grade_level: "3º ano",
    shift: "Tarde",
    school_year: 2026,
    active: true,
  },
];
export type DemoStudent = Student & { classId: string; color: string };
const first = [
  "Alice",
  "Arthur",
  "Beatriz",
  "Bento",
  "Clara",
  "Davi",
  "Elisa",
  "Enzo",
  "Flora",
  "Gabriel",
  "Helena",
  "Heitor",
  "Isabela",
  "João",
  "Laura",
  "Lucas",
  "Maitê",
  "Miguel",
  "Nina",
  "Noah",
];
const last = ["Almeida", "Barbosa", "Costa"];
export const students: DemoStudent[] = classes.flatMap((c, ci) =>
  Array.from({ length: [18, 16, 20][ci] }, (_, i) => ({
    id: `s${ci}-${i}`,
    full_name: `${first[i]} ${last[ci]}`,
    birth_date: `${2019 - ci}-05-${String((i % 20) + 1).padStart(2, "0")}`,
    active: true,
    classId: c.id,
    color: ["sage", "peach", "lavender", "yellow"][i % 4],
  })),
);
export type Scores = { activity: string; exam: string };
export type DemoActivity = {
  id: string;
  title: string;
  subject: string;
  classId: string;
  date: string;
  description: string;
  status: "Planejada" | "Concluída";
  term: number;
};
export type GradeBook = Record<string, Scores>;
export type AttendanceBook = Record<string, AttendanceRecord["status"]>;
export const gradeKey = (id: string, term: number) => `${id}:${term}`;
export const attendanceKey = (id: string, date: string) => `${id}:${date}`;
export function makeGrades(): GradeBook {
  return Object.fromEntries(
    students.flatMap((s, i) =>
      [1, 2, 3, 4].map((term) => [
        gradeKey(s.id, term),
        {
          activity: String(7 + ((i + term) % 7) * 0.5),
          exam: String(6 + ((i * 2 + term) % 9) * 0.5),
        },
      ]),
    ),
  );
}
export function makeAttendance(): AttendanceBook {
  return Object.fromEntries(
    students.map((s, i) => [
      attendanceKey(s.id, DEMO_DATE),
      i % 13 === 0 ? "absent" : i % 19 === 0 ? "justified" : "present",
    ]),
  );
}
export const initialActivities: DemoActivity[] = [
  {
    id: "a1",
    title: "Histórias que a gente inventa",
    subject: "Língua Portuguesa",
    classId: "c1",
    date: "2026-10-21",
    description:
      "Leitura compartilhada e criação de uma história coletiva com a turma.",
    status: "Planejada",
    term: 4,
  },
  {
    id: "a2",
    title: "Números ao nosso redor",
    subject: "Matemática",
    classId: "c2",
    date: "2026-10-21",
    description:
      "Identificar e representar quantidades em situações do cotidiano.",
    status: "Planejada",
    term: 4,
  },
  {
    id: "a3",
    title: "O pequeno jardim da turma",
    subject: "Ciências",
    classId: "c3",
    date: "2026-10-22",
    description: "Observar as partes de uma planta e registrar as descobertas.",
    status: "Planejada",
    term: 4,
  },
  {
    id: "a4",
    title: "Cores e formas da natureza",
    subject: "Arte",
    classId: "c1",
    date: "2026-10-19",
    description:
      "Composição com formas e cores inspiradas em elementos naturais.",
    status: "Concluída",
    term: 4,
  },
  {
    id: "a5",
    title: "Leitura e imaginação",
    subject: "Língua Portuguesa",
    classId: "c1",
    date: "2026-08-14",
    description: "Registro ilustrativo de leitura do terceiro bimestre.",
    status: "Concluída",
    term: 3,
  },
];
export const initials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");
export const dateLabel = (date: string) =>
  new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    timeZone: "UTC",
  }).format(new Date(date + "T12:00:00Z"));
