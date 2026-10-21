// Funções puras reaproveitadas da base Escola Peralta; sem serviços remotos.
export function average(activity: number | null, exam: number | null) {
  return activity === null || exam === null ? null : (activity + exam) / 2;
}
export function parseScore(value: string): number | null {
  const normalized = value.trim().replace(",", ".");
  if (!normalized) return null;
  if (!/^\d+(\.\d+)?$/.test(normalized))
    throw new Error("Use notas de 0 a 10.");
  const score = Number(normalized);
  if (!Number.isFinite(score) || score < 0 || score > 10)
    throw new Error("Use notas de 0 a 10.");
  return score;
}
export const callNumber = (index: number) => String(index + 1).padStart(2, "0");
