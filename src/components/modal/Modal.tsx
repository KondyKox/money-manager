import { X } from "lucide-react";
import type { ModalProps } from "../../types/Modal";
import { useEffect } from "react";

const Modal = ({ children, isOpen, onClose }: ModalProps) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 p-2"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative overflow-y-auto bg-purple-600 py-8 px-10 rounded-2xl shadow-md shadow-orange-400 text-white/80 h-full md:h-auto md:w-2/3 lg:w-1/2 md:min-h-1/2"
      >
        {children}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 hover:bg-red-500 rounded-full p-2 transition-colors duration-200 cursor-pointer"
        >
          <X />
        </button>
      </div>
    </div>
  );
};

export default Modal;
