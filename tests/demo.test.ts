import { describe, expect, it } from "vitest";
import { average, parseScore } from "../src/shared/academic/utils";
import {
  classes,
  students,
  initialActivities,
  makeGrades,
  gradeKey,
  makeAttendance,
  attendanceKey,
  DEMO_DATE,
} from "../src/features/demo/data";
describe("Registros acadêmicos demonstrativos", () => {
  it("aceita notas em português e mantém registros incompletos sem média", () => {
    expect(parseScore(" 8,5 ")).toBe(8.5);
    expect(parseScore("")).toBeNull();
    expect(average(null, 8)).toBeNull();
    expect(average(7, 10)).toBe(8.5);
  });
  it.each(["-1", "10.5", "Infinity", "NaN", "8abc", "1,2,3"])(
    "rejeita nota inválida: %s",
    (value) => {
      expect(() => parseScore(value)).toThrow("Use notas de 0 a 10.");
    },
  );
  it("possui turmas e alunos coerentes, sem referências órfãs", () => {
    expect(students).toHaveLength(54);
    expect(new Set(students.map((s) => s.id)).size).toBe(students.length);
    students.forEach((s) =>
      expect(classes.some((c) => c.id === s.classId)).toBe(true),
    );
    initialActivities.forEach((a) =>
      expect(classes.some((c) => c.id === a.classId)).toBe(true),
    );
  });
  it("cria notas independentes por período e frequência por data", () => {
    const grades = makeGrades();
    const attendance = makeAttendance();
    students.forEach((s) => {
      for (const term of [1, 2, 3, 4]) {
        const g = grades[gradeKey(s.id, term)];
        expect(parseScore(g.activity)).toBeGreaterThanOrEqual(0);
        expect(parseScore(g.exam)).toBeLessThanOrEqual(10);
      }
      expect(attendance[attendanceKey(s.id, DEMO_DATE)]).toBeDefined();
    });
    const copy = makeGrades();
    copy[gradeKey(students[0].id, 4)].activity = "0";
    expect(makeGrades()[gradeKey(students[0].id, 4)].activity).not.toBe("0");
  });
});
