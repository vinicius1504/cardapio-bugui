"use client";
import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function ModalProduto({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
        <button onClick={onClose} className="absolute top-3 right-4 text-gray-500 hover:text-red-600 text-xl font-bold">
          ×
        </button>
        {children}
      </div>
    </div>
  );
}
