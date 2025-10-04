"use client";

import { useEffect, useRef, useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function ProblemStatement() {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { elementRef: textRef, isVisible: textVisible } = useScrollAnimation({
    threshold: 0.2,
  });
  const { elementRef: timelineRef, isVisible: timelineVisible } =
    useScrollAnimation({ threshold: 0.3 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const end = 90;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-[#FFF8F0] to-[#F5EEE6] relative overflow-hidden"
    >
      {/* Subtle Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238B7355' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          {/* Main Statistic */}
          <div className="animate-scale-in">
            <div className="inline-block">
              <div className="relative">
                {/* Decorative circle background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#E8B4A0] to-[#D4AF37] rounded-full blur-2xl opacity-20 scale-150" />

                <div className="relative bg-white rounded-3xl p-12 shadow-2xl border-4 border-[#8B7355]/20">
                  <div className="text-8xl lg:text-9xl font-serif font-bold text-[#8B7355] mb-4">
                    {count}%
                  </div>
                  <div className="text-2xl lg:text-3xl text-[#3E2723] font-serif leading-relaxed">
                    of family stories are lost
                    <br />
                    <span className="text-[#5D5D5D]">
                      within two generations
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Supporting Text */}
          <div
            ref={textRef}
            className={`max-w-2xl mx-auto space-y-6 memory-fade-up ${
              textVisible ? "visible" : ""
            }`}
          >
            <p className="text-xl lg:text-2xl text-[#5D5D5D] leading-relaxed">
              Every day, precious memories fade away. The story of how grandma
              met grandpa. The family recipe passed down through generations.
              The wisdom earned from a lifetime of experiences.
            </p>

            <p className="text-lg lg:text-xl text-[#5D5D5D] leading-relaxed">
              These aren&apos;t just stories—they&apos;re your family&apos;s
              legacy. And they&apos;re disappearing.
            </p>
          </div>

          {/* Visual Element - Timeline */}
          <div ref={timelineRef} className="pt-8">
            <div className="flex items-center justify-center gap-4 flex-wrap">
              {/* Generation 1 */}
              <div
                className={`flex flex-col items-center gap-2 memory-gather-left ${
                  timelineVisible ? "visible" : ""
                }`}
                style={{ transitionDelay: "0.1s" }}
              >
                <div className="w-20 h-20 rounded-full bg-[#8B7355] flex items-center justify-center text-3xl shadow-lg">
                  👴🏻
                </div>
                <span className="text-sm text-[#5D5D5D] font-medium">
                  Generation 1
                </span>
              </div>

              <div
                className={`flex items-center gap-2 memory-reveal ${
                  timelineVisible ? "visible" : ""
                }`}
                style={{ transitionDelay: "0.2s" }}
              >
                <div className="w-12 h-1 bg-gradient-to-r from-[#8B7355] to-[#5D5D5D]" />
                <ArrowRight className="w-6 h-6 text-[#5D5D5D]" />
              </div>

              {/* Generation 2 */}
              <div
                className={`flex flex-col items-center gap-2 opacity-70 memory-reveal ${
                  timelineVisible ? "visible" : ""
                }`}
                style={{ transitionDelay: "0.3s" }}
              >
                <div className="w-20 h-20 rounded-full bg-[#A8B89F] flex items-center justify-center text-3xl shadow-lg">
                  👨🏻
                </div>
                <span className="text-sm text-[#5D5D5D] font-medium">
                  Generation 2
                </span>
              </div>

              <div
                className={`flex items-center gap-2 memory-reveal ${
                  timelineVisible ? "visible" : ""
                }`}
                style={{ transitionDelay: "0.4s" }}
              >
                <div className="w-12 h-1 bg-gradient-to-r from-[#A8B89F] to-[#9E9E8E]" />
                <ArrowRight className="w-6 h-6 text-[#9E9E8E]" />
              </div>

              {/* Generation 3 */}
              <div
                className={`flex flex-col items-center gap-2 opacity-30 memory-reveal ${
                  timelineVisible ? "visible" : ""
                }`}
                style={{ transitionDelay: "0.5s" }}
              >
                <div className="w-20 h-20 rounded-full bg-[#E5D5C3] flex items-center justify-center text-3xl shadow-lg">
                  👧🏻
                </div>
                <span className="text-sm text-[#5D5D5D] font-medium">
                  Generation 3
                </span>
              </div>

              <div
                className={`flex items-center gap-2 memory-reveal ${
                  timelineVisible ? "visible" : ""
                }`}
                style={{ transitionDelay: "0.6s" }}
              >
                <div className="w-12 h-1 bg-gradient-to-r from-[#E5D5C3] to-transparent" />
                <span className="text-2xl opacity-20">❓</span>
              </div>
            </div>

            <p className="text-sm text-[#9E9E8E] mt-6 italic">
              Stories fade with each passing generation
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M14 5l7 7m0 0l-7 7m7-7H3"
      />
    </svg>
  );
}
