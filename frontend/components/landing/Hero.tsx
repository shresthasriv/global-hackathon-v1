"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { User, LogOut, ArrowRight } from "lucide-react";
import SignInModal from "@/components/SignInModal";
import { getUserFromStorage } from "@/lib/api/client";

export default function Hero() {
  const [user, setUser] = useState<any>(null);
  const [showSignInModal, setShowSignInModal] = useState(false);

  useEffect(() => {
    // Check if user is already signed in
    const currentUser = getUserFromStorage();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("current_user");
    setUser(null);
    window.location.reload();
  };

  const handleSignInSuccess = () => {
    // Refresh user state after successful sign in
    const currentUser = getUserFromStorage();
    if (currentUser) {
      setUser(currentUser);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#FFF8F0] via-[#FFF8F0] to-[#F5EEE6]">
      {/* Animated Background Patterns */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#E8B4A0] rounded-full mix-blend-multiply filter blur-3xl animate-float" />
        <div
          className="absolute top-40 right-20 w-72 h-72 bg-[#A8B89F] rounded-full mix-blend-multiply filter blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-20 left-1/3 w-80 h-80 bg-[#D4AF37] rounded-full mix-blend-multiply filter blur-3xl animate-float"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Hero Image */}
          <div className="order-2 lg:order-1 animate-scale-in">
            <div className="relative">
              {/* Decorative Frame */}
              <div className="absolute -inset-4 bg-gradient-to-br from-[#8B7355] to-[#D4AF37] rounded-2xl opacity-20 blur-xl" />

              {/* Image Container with Scrapbook Effect */}
              <div className="relative bg-white p-4 rounded-2xl shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="aspect-[4/5] rounded-xl overflow-hidden bg-gradient-to-br from-[#E8B4A0] to-[#A8B89F] flex items-center justify-center">
                  {/* Hero Image */}
                  <img
                    src="/grandpa_grandson.png"
                    alt="Grandparent and grandchild sharing memories"
                    className="w-full h-full object-cover rounded-xl shadow-lg"
                  />
                </div>

                {/* Polaroid-style caption */}
                <div className="mt-4 text-center">
                  <p className="text-[#5D5D5D] font-serif italic">
                    "Every story matters"
                  </p>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 text-[#D4AF37] opacity-50">
                <svg viewBox="0 0 100 100" fill="currentColor">
                  <path d="M50 15 L61 40 L88 40 L67 57 L77 82 L50 65 L23 82 L33 57 L12 40 L39 40 Z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Right: Hero Content */}
          <div className="order-1 lg:order-2 space-y-8 animate-slide-up">
            {/* Main Headline */}
            <h1 className="text-5xl lg:text-7xl font-serif font-bold text-[#3E2723] leading-tight text-balance">
              <span
                className="inline-block opacity-0"
                style={{
                  animation: "fadeInUp 0.6s ease-out 0.1s forwards",
                }}
              >
                Every
              </span>{" "}
              <span
                className="inline-block opacity-0"
                style={{
                  animation: "fadeInUp 0.6s ease-out 0.3s forwards",
                }}
              >
                Family
              </span>{" "}
              <span
                className="inline-block opacity-0"
                style={{
                  animation: "fadeInUp 0.6s ease-out 0.5s forwards",
                }}
              >
                Has
              </span>{" "}
              <span
                className="inline-block opacity-0"
                style={{
                  animation: "fadeInUp 0.6s ease-out 0.7s forwards",
                }}
              >
                Stories
              </span>{" "}
              <span
                className="inline-block opacity-0"
                style={{
                  animation: "fadeInUp 0.6s ease-out 0.9s forwards",
                }}
              >
                Worth
              </span>{" "}
              <span
                className="text-[#8B7355] relative inline-block opacity-0"
                style={{
                  animation: "fadeInUp 0.6s ease-out 1.1s forwards",
                }}
              >
                Keeping
                <svg
                  className="absolute -bottom-2 left-0 w-full opacity-0"
                  height="12"
                  viewBox="0 0 300 12"
                  fill="none"
                  style={{
                    animation: "fadeIn 0.8s ease-out 1.7s forwards",
                  }}
                >
                  <path
                    d="M2 10C50 5 100 2 150 3C200 4 250 7 298 10"
                    stroke="#D4AF37"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray="300"
                    strokeDashoffset="300"
                    style={{
                      animation: "drawSmile 1.2s ease-out 1.7s forwards",
                    }}
                  />
                </svg>
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl lg:text-2xl text-[#5D5D5D] leading-relaxed max-w-2xl">
              Preserve your loved ones' memories in beautiful stories that last
              forever. Simple conversations, timeless legacies.
            </p>

            {/* CTA Buttons */}
            <div className="space-y-6 pt-4">
              {user ? (
                // Signed in state
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-white border-2 border-[#E5D5C3] rounded-xl">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8B7355] to-[#D4AF37] flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-[#3E2723]">
                        {user.name}
                      </p>
                      <p className="text-sm text-[#8B7355]">{user.email}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleSignOut}
                      className="text-[#8B7355] hover:text-[#3E2723]"
                    >
                      <LogOut className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/blogs" className="flex-1">
                      <Button
                        size="lg"
                        className="w-full bg-gradient-to-r from-[#8B7355] to-[#A0826D] hover:from-[#7A6348] hover:to-[#8B7355] text-white text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                      >
                        {/* <BookOpen className="mr-2 h-5 w-5" /> */}
                        My Memory Blogs
                      </Button>
                    </Link>
                    <Link href="/onboarding/step-2" className="flex-1">
                      <Button
                        size="lg"
                        variant="outline"
                        className="w-full border-2 border-[#E8B4A0] text-[#E8B4A0] hover:bg-[#E8B4A0] hover:text-white text-lg px-8 py-6 rounded-xl transition-all duration-300"
                      >
                        Capture New Memory
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                // Not signed in state
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      size="lg"
                      onClick={() => setShowSignInModal(true)}
                      className="bg-[#E8B4A0] hover:bg-[#d9a391] text-white text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      Start Preserving Memories
                      {/* <BookOpen className="ml-2 h-5 w-5" /> */}
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-[#8B7355] text-[#8B7355] hover:bg-[#8B7355] hover:text-white text-lg px-8 py-6 rounded-xl transition-all duration-300"
                    >
                      Watch Demo
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Trust Signals */}
            {/* <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-2 text-[#5D5D5D]">
                <svg
                  className="w-5 h-5 text-[#A8B89F]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm">No signup needed</span>
              </div>
              <div className="flex items-center gap-2 text-[#5D5D5D]">
                <svg
                  className="w-5 h-5 text-[#A8B89F]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm">Start in 30 seconds</span>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-[#8B7355] rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-[#8B7355] rounded-full animate-pulse" />
        </div>
      </div> */}

      {/* Fade Transition to Next Section */}
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-[#FFF8F0]/0 via-[#FFF8F0]/40 via-[#F5EEE6]/70 to-[#F5EEE6] pointer-events-none" />

      {/* Sign In Modal */}
      <SignInModal
        isOpen={showSignInModal}
        onClose={() => setShowSignInModal(false)}
        onSuccess={handleSignInSuccess}
      />
    </section>
  );
}
