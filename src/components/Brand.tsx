import { Link } from "react-router-dom";
import { school } from "../config/school";
export function Mark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 54 54"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M8 43V29a12 12 0 0 1 24 0v14M22 43V19a12 12 0 0 1 24 0v24"
        stroke="currentColor"
        strokeWidth="5"
      />
      <path d="M8 43h38" stroke="currentColor" strokeWidth="5" />
    </svg>
  );
}
export function Brand({ portal = false }: { portal?: boolean }) {
  return (
    <Link
      className={`brand ${portal ? "brand-portal" : ""}`}
      to="/"
      aria-label={`${school.name} — página inicial`}
    >
      <Mark />
      <span>
        Escola Meus
        <br />
        Primeiros Passos
      </span>
    </Link>
  );
}
