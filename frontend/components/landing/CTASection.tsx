"use client";

import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function CTASection() {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.3 });

  return (
    <section ref={elementRef} className="py-24 relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#E8B4A0] via-[#FFF8F0] to-[#A8B89F] animate-gradient bg-[length:200%_200%]" />

      {/* Floating Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-2xl animate-float" />
        <div
          className="absolute top-40 right-20 w-40 h-40 bg-[#D4AF37] rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-20 left-1/3 w-48 h-48 bg-white rounded-full blur-3xl animate-float"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Main Headline */}
          <h2
            className={`text-4xl lg:text-6xl font-serif font-bold text-[#3E2723] leading-tight text-balance memory-fade-up ${
              isVisible ? "visible" : ""
            }`}
          >
            Don&apos;t let precious memories fade
          </h2>

          {/* Subheadline */}
          <p
            className={`text-xl lg:text-2xl text-[#5D5D5D] leading-relaxed max-w-2xl mx-auto memory-reveal ${
              isVisible ? "visible" : ""
            }`}
            style={{ transitionDelay: "0.2s" }}
          >
            Start preserving your family&apos;s stories today—it&apos;s free and
            takes just 30 seconds to begin
          </p>

          {/* CTA Button */}
          <div
            className={`pt-8 memory-bloom ${isVisible ? "visible" : ""}`}
            style={{ transitionDelay: "0.4s" }}
          >
            <Button
              size="lg"
              className="bg-[#3E2723] hover:bg-[#2d1f1a] text-white text-xl px-12 py-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 group"
            >
              Start Your First Memory
              <svg
                className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Button>
          </div>

          {/* Trust Signals */}
          <div className="pt-8 space-y-4 animate-fade-in">
            <div className="flex items-center justify-center gap-8 flex-wrap text-[#5D5D5D]">
              <div className="flex items-center gap-2">
                <svg
                  className="w-6 h-6 text-[#A8B89F]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-medium">No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-6 h-6 text-[#A8B89F]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-medium">No installation needed</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-6 h-6 text-[#A8B89F]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-medium">Start immediately</span>
              </div>
            </div>
          </div>

          {/* Emotional Message */}
          <div className="pt-12 max-w-2xl mx-auto">
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 border-2 border-white shadow-lg">
              <p className="text-lg text-[#3E2723] font-serif italic leading-relaxed">
                &quot;The best time to preserve a memory was yesterday. The
                second best time is now.&quot;
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Wave at Bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full h-24"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill="#3E2723"
          />
        </svg>
      </div>
    </section>
  );
}
