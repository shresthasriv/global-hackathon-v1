"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  loading = false,
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-fade-in"
        onClick={loading ? undefined : onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6 pointer-events-none">
        <div
          className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-scale-in pointer-events-auto relative border-2 border-[#E5D5C3]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-[#8B7355] hover:text-[#3E2723] transition-colors"
            disabled={loading}
          >
            <X className="w-6 h-6" />
          </button>

          {/* Icon */}
          {/* <div className="mb-6 flex justify-center"> */}
            {/* <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#F4C430] flex items-center justify-center shadow-lg"> */}
              {/* <BookOpen className="w-8 h-8 text-white" /> */}
            {/* </div> */}
          {/* </div> */}

          {/* Header */}
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-serif font-bold text-[#3E2723] mb-3">
              {title}
            </h2>
            <p className="text-[#5D5D5D] leading-relaxed">{message}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={onClose}
              disabled={loading}
              variant="outline"
              className="flex-1 border-2 border-[#E5D5C3] text-[#8B7355] hover:bg-[#FFF8F0] hover:border-[#8B7355] py-6 text-base font-medium"
            >
              {cancelText}
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-[#D4AF37] to-[#F4C430] hover:from-[#C4A137] hover:to-[#E4B420] text-[#3E2723] py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {loading ? "Processing..." : confirmText}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
