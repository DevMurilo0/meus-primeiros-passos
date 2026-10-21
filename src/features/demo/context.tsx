import { createContext, useContext, useState, type ReactNode } from "react";
import {
  initialActivities,
  makeAttendance,
  makeGrades,
  type AttendanceBook,
  type DemoActivity,
  type GradeBook,
} from "./data";
function useDemoState() {
  const [grades, setGrades] = useState<GradeBook>(makeGrades);
  const [attendance, setAttendance] = useState<AttendanceBook>(makeAttendance);
  const [activities, setActivities] = useState<DemoActivity[]>(() =>
    initialActivities.map((a) => ({ ...a })),
  );
  const [notice, setNotice] = useState("");
  const [revision, setRevision] = useState(0);
  function reset() {
    setGrades(makeGrades());
    setAttendance(makeAttendance());
    setActivities(initialActivities.map((a) => ({ ...a })));
    setRevision((value) => value + 1);
    setNotice("A demonstração voltou aos dados iniciais.");
  }
  return {
    grades,
    setGrades,
    attendance,
    setAttendance,
    activities,
    setActivities,
    notice,
    revision,
    setNotice,
    reset,
  };
}
const DemoContext = createContext<ReturnType<typeof useDemoState> | null>(null);
export function DemoProvider({ children }: { children: ReactNode }) {
  const state = useDemoState();
  return <DemoContext.Provider value={state}>{children}</DemoContext.Provider>;
}
export function useDemo() {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error("Demonstração indisponível");
  return ctx;
}
