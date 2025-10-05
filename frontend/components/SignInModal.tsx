"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, ArrowRight } from "lucide-react";
import {
  createOrUpdateUser,
  getUserFromStorage,
  checkUserHasBlogs,
} from "@/lib/api/client";

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function SignInModal({
  isOpen,
  onClose,
  onSuccess,
}: SignInModalProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({ name: "", email: "" });
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Please enter your name");
      return;
    }

    if (!formData.email.trim()) {
      alert("Please enter your email");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      // Create or update user
      await createOrUpdateUser({
        name: formData.name,
        email: formData.email,
      });

      // Check if user has existing blogs
      const hasBlogs = await checkUserHasBlogs(formData.email);

      // Close modal and trigger success callback
      onClose();
      onSuccess?.();

      if (hasBlogs) {
        // User has previous blogs, show them
        router.push("/blogs");
      } else {
        // New user, continue to step 2
        router.push("/onboarding/step-2");
      }
    } catch (error) {
      console.error("Error signing in:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6 pointer-events-none">
        <div
          className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-scale-in pointer-events-auto relative"
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

          {/* Header */}
          <div className="mb-6">
            <h2 className="text-3xl font-serif font-bold text-[#3E2723] mb-2">
              Sign In to Continue
            </h2>
            <p className="text-[#5D5D5D]">
              Start preserving your family&apos;s precious memories
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="name" className="text-[#3E2723] font-medium">
                Your Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="mt-1.5 border-[#E5D5C3] focus:border-[#8B7355] focus:ring-[#8B7355]"
                disabled={loading}
                autoComplete="name"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-[#3E2723] font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="mt-1.5 border-[#E5D5C3] focus:border-[#8B7355] focus:ring-[#8B7355]"
                disabled={loading}
                autoComplete="email"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#8B7355] to-[#A0826D] hover:from-[#7A6348] hover:to-[#8B7355] text-white text-lg py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              {loading ? "Signing In..." : "Sign In"}
              {!loading && <ArrowRight className="ml-2 h-5 w-5" />}
            </Button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-[#8B7355] mt-6">
            By signing in, you agree to preserve beautiful memories
          </p>
        </div>
      </div>
    </>
  );
}
