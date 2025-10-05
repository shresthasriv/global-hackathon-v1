"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Sparkles } from "lucide-react";
import { 
  createOrUpdateUser, 
  getUserFromStorage, 
  checkUserHasBlogs 
} from "@/lib/api/client";

export default function OnboardingStep1() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    // Check if user is already authenticated
    const user = getUserFromStorage();
    if (user) {
      // User exists, check if they have blogs
      checkUserHasBlogs(user.email).then((hasBlogs) => {
        if (hasBlogs) {
          // Redirect to blogs page
          router.push("/blogs");
        } else {
          // Continue to step 2
          router.push("/onboarding/step-2");
        }
      });
    } else {
      setCheckingAuth(false);
    }
  }, [router]);

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
      
      if (hasBlogs) {
        // User has previous blogs, show them
        router.push("/blogs");
      } else {
        // New user, continue to step 2
        router.push("/onboarding/step-2");
      }
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#FFF8F0] flex items-center justify-center">
        <div className="animate-pulse text-[#8B7355] text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F0] via-[#FFF8F0] to-[#F5EEE6] flex items-center justify-center p-6">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#E8B4A0] rounded-full mix-blend-multiply filter blur-3xl animate-float" />
        <div
          className="absolute bottom-20 right-20 w-72 h-72 bg-[#A8B89F] rounded-full mix-blend-multiply filter blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="w-full max-w-lg relative z-10">
        {/* Header */}
        <div className="text-center mb-8 animate-slide-up">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#8B7355] to-[#D4AF37] mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-serif font-bold text-[#3E2723] mb-2">
            Welcome!
          </h1>
          <p className="text-lg text-[#5D5D5D]">
            Let's start by getting to know you
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-[#E5D5C3] animate-scale-in">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">
                Your Name <span className="text-[#E8B4A0]">*</span>
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">
                Your Email <span className="text-[#E8B4A0]">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
              <p className="text-xs text-[#8B7355]/70">
                We'll use this to save your progress and send you story updates
              </p>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 text-lg font-medium bg-gradient-to-r from-[#8B7355] to-[#A0826D] hover:from-[#7A6348] hover:to-[#8B7355] transition-all shadow-lg"
            >
              {loading ? (
                "Setting up..."
              ) : (
                <>
                  Continue
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </form>

          {/* Privacy Note */}
          <div className="mt-6 text-center">
            <p className="text-xs text-[#8B7355]/60">
              Your information is secure and will never be shared
            </p>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center gap-2 mt-6">
          <div className="w-8 h-2 rounded-full bg-[#8B7355]" />
          <div className="w-8 h-2 rounded-full bg-[#E5D5C3]" />
          <div className="w-8 h-2 rounded-full bg-[#E5D5C3]" />
        </div>
      </div>
    </div>
  );
}
