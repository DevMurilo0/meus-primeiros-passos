import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";
export function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current!;
    const active = document.activeElement as HTMLElement | null;
    dialog.showModal();
    return () => {
      dialog.close();
      active?.focus();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className="modal"
      aria-labelledby="dialog-title"
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
    >
      <div className="modal-header">
        <h2 id="dialog-title">{title}</h2>
        <button
          className="icon-btn"
          aria-label="Fechar janela"
          onClick={onClose}
        >
          <X size={21} />
        </button>
      </div>
      {children}
    </dialog>
  );
}
