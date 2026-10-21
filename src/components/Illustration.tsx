import { useId } from "react";
// Arte vetorial original da proposta: não representa os espaços reais da escola.
export function Illustration({
  kind = "world",
  className = "",
}: {
  kind?: string;
  className?: string;
}) {
  const id = useId();
  return (
    <svg
      className={`illustration ${className}`}
      viewBox="0 0 640 560"
      role="img"
      aria-labelledby={id}
    >
      <title id={id}>
        {kind === "world"
          ? "Ilustração conceitual: um livro aberto se transforma em um caminho de descobertas"
          : kind === "plant"
            ? "Ilustração conceitual de uma planta crescendo"
            : kind === "boat"
              ? "Ilustração conceitual de um barco de papel"
              : "Ilustração conceitual de histórias que saem de um livro"}
      </title>
      {kind === "world" ? (
        <>
          <path
            d="M90 308C27 189 138 63 277 67c150-106 344 13 316 174 80 145-71 247-210 231C233 539 88 458 90 308Z"
            fill="#e4eadb"
          />
          <circle className="art-sun" cx="481" cy="121" r="48" fill="#edc36a" />
          <path d="M457 121h48m-24-24v48" stroke="#f7dc94" strokeWidth="2" />
          <g className="art-cloud" fill="#fffdf5">
            <path d="M102 156c-3-19 18-28 30-16 5-30 49-28 50 1 24-9 41 18 22 30h-95c-15-1-18-12-7-15Z" />
            <path d="M366 67c-1-16 17-21 25-11 10-22 38-17 40 6 23-7 29 18 12 24h-76c-10-2-10-15-1-19Z" />
          </g>
          <path
            d="M70 399 307 349l263 49-24 65-231 48L78 460Z"
            fill="#275448"
          />
          <path d="m72 390 237 54 257-53-20 55-235 53L80 448Z" fill="#f6e8c9" />
          <path
            d="m90 412 220 53 236-48m-450 10 214 51 232-48"
            stroke="#cdbb94"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M74 384c95-29 171-34 238 15 58-44 157-55 253-14l-24 49c-74-28-155-11-229 19-77-26-153-43-234-23Z"
            fill="#fff9e9"
          />
          <path d="M312 399v54" stroke="#c7b890" strokeWidth="3" />
          <path
            d="M156 386c69-57 191-11 192-83 2-48-82-25-52-88"
            stroke="#e6b464"
            strokeWidth="36"
            fill="none"
          />
          <path
            d="M156 386c69-57 191-11 192-83 2-48-82-25-52-88"
            stroke="#fff5da"
            strokeWidth="2"
            strokeDasharray="6 11"
            fill="none"
          />
          <g className="art-door">
            <path d="M233 278V174a63 63 0 0 1 126 0v104Z" fill="#bf7356" />
            <path d="M245 278V179a51 51 0 0 1 102 0v99Z" fill="#e0a27a" />
            <path d="M267 278v-88a29 29 0 0 1 58 0v88Z" fill="#245344" />
            <path d="M296 162v116" stroke="#1a4036" strokeWidth="3" />
            <circle cx="306" cy="225" r="3" fill="#f1cd7a" />
            <path d="M221 279h151v12H221Z" fill="#b16147" />
          </g>
          <g className="art-plant">
            <path
              d="M448 367V234m0 58-32-32m32 61 38-34"
              stroke="#315848"
              strokeWidth="5"
              fill="none"
            />
            <path
              d="M447 264c-46 0-67-37-55-58 36-2 57 27 55 58Z"
              fill="#8aab83"
            />
            <path
              d="M449 298c46 1 76-35 65-60-41-3-64 30-65 60Z"
              fill="#557b60"
            />
            <path
              d="M448 239c-31-21-25-63 1-73 22 24 23 51-1 73Z"
              fill="#6f9570"
            />
            <path
              d="M448 340c-38 0-56-25-49-45 31 0 48 19 49 45Z"
              fill="#557b60"
            />
            <path d="M423 360h51l-9 36h-34Z" fill="#d39173" />
          </g>
          <g fill="#e7b75f">
            <path d="m152 282 12 27 27 12-27 12-12 27-12-27-27-12 27-12Z" />
            <path d="m391 139 5 12 13 5-13 6-5 12-5-12-12-6 12-5Z" />
          </g>
          <path d="m191 188 17-11 17 11-17 11Z" fill="#cb826c" />
          <path d="m208 177 5-22 12 33" fill="#e3b29a" />
          <path
            d="M355 366c18-30 45-36 68-28-19 29-42 33-68 28Z"
            fill="#aec2a0"
          />
          <path
            d="M98 265c-10-9-20-8-27 0m27 0c8-12 18-13 28-7"
            stroke="#375c4b"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
        </>
      ) : kind === "plant" ? (
        <>
          <circle cx="320" cy="280" r="202" fill="#e4eadb" />
          <circle cx="440" cy="138" r="39" fill="#edc36a" />
          <path
            d="M312 387V184m0 99-68-58m68 105 81-71"
            fill="none"
            stroke="#315848"
            strokeWidth="9"
          />
          <path
            d="M312 263c-81-5-103-68-81-100 61 3 89 47 81 100Z"
            fill="#89aa82"
          />
          <path
            d="M314 312c91-3 128-66 106-111-76 0-113 57-106 111Z"
            fill="#557b60"
          />
          <path
            d="M313 207c-51-35-40-101 1-124 39 42 42 88-1 124Z"
            fill="#a4bb8f"
          />
          <path d="M251 375h127l-24 94h-81Z" fill="#c78165" />
          <path d="M244 374h140v23H244Z" fill="#d89d80" />
          <path d="M161 420h62m190 0h61" stroke="#9cb28d" strokeWidth="3" />
        </>
      ) : kind === "boat" ? (
        <>
          <circle cx="320" cy="280" r="202" fill="#f3e3b6" />
          <circle cx="446" cy="157" r="34" fill="#e9ba5f" />
          <path d="m153 310 153-168 182 168Z" fill="#fffdf4" />
          <path d="m306 142 19 168H153Z" fill="#e9d7b1" />
          <path d="m153 310 107 87h128l100-87-161 37Z" fill="#c78065" />
          <path d="m153 310 174 37-67 50Z" fill="#dfaa87" />
          <path
            d="M132 418c36-29 60 28 95 0s60 28 95 0 60 28 95 0 60 28 95 0m-348 39c36-29 60 28 95 0s60 28 95 0 60 28 95 0"
            fill="none"
            stroke="#789d91"
            strokeWidth="9"
            strokeLinecap="round"
          />
        </>
      ) : (
        <>
          <circle cx="320" cy="280" r="202" fill="#efdfdb" />
          <path d="m118 323 199 49 203-49v85l-204 50-198-50Z" fill="#315848" />
          <path
            d="M119 303c74-28 136-15 198 32 60-47 129-60 202-32v91c-69-26-135-13-202 28-62-41-128-54-198-28Z"
            fill="#fff9e9"
          />
          <path
            d="M317 335v87m-158-78 108 27m-108-8 108 27m103-19 110-27m-110 46 110-27"
            stroke="#d2c5a5"
            strokeWidth="3"
          />
          <path
            className="art-cloud"
            d="M267 260c-63-45-36-97 0-76 43-61 100-33 76 11 66 10 48 75-19 67Z"
            fill="#e4b465"
          />
          <path
            d="m334 137 17-38 17 38 38 17-38 17-17 38-17-38-38-17Z"
            fill="#bd755e"
          />
          <path
            d="m210 144 9-22 9 22 22 9-22 9-9 22-9-22-22-9Z"
            fill="#739079"
          />
        </>
      )}
    </svg>
  );
}
