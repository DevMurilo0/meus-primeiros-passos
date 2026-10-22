import { Link } from "react-router-dom";
import { school } from "../config/school";

/**
 * Logotipo disponibilizado pelo responsável do projeto.
 * A identificação está dentro da própria imagem; o link fornece o nome acessível.
 */
export function Brand({ portal = false }: { portal?: boolean }) {
  return (
    <Link
      className={`brand ${portal ? "brand-portal" : ""}`}
      to="/"
      aria-label={`${school.name} — página inicial`}
    >
      <img
        className="brand-logo"
        src="/assets/brand/logo-mpp.png"
        alt=""
        width={130}
        height={107}
        decoding="async"
      />
    </Link>
  );
}
