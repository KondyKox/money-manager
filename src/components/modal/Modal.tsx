import { X } from "lucide-react";
import type { ModalProps } from "../../types/Modal";

const Modal = ({ children, isOpen, onClose }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="absolute top-0 left-0 w-full h-full bg-black/80 flex justify-center items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative overflow-hidden bg-green-600 py-8 px-10 rounded-2xl shadow-md shadow-orange-400 text-white/80 w-2/3 lg:w-1/2 min-h-100"
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
