"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current || !containerRef.current) return;

      // Check if mobile or tablet
      const isMobile = window.innerWidth < 1024; // Changed to 1024 (lg breakpoint)

      if (isMobile) {
        // On mobile/tablet, just show all cards stacked - no animation needed
        gsap.set([step1Ref.current, step2Ref.current, step3Ref.current], {
          opacity: 1,
        });
      } else {
        // Desktop animation - cards appear in their final positions
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=1500",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        });

        // Set initial state - cards in final positions but invisible
        gsap.set([step1Ref.current, step2Ref.current, step3Ref.current], {
          opacity: 0,
        });

        // Animate: just fade in one by one
        tl.to(step1Ref.current, {
          opacity: 1,
          duration: 1,
          ease: "power2.out",
        })
          .to(
            step2Ref.current,
            {
              opacity: 1,
              duration: 1,
              ease: "power2.out",
            },
            "+=0.3"
          )
          .to(
            step3Ref.current,
            {
              opacity: 1,
              duration: 1,
              ease: "power2.out",
            },
            "+=0.3"
          );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const steps = [
    {
      title: "Set up in seconds",
      description:
        "Add your grandparent's name and you're ready to go. No complicated forms or sign-ups needed.",
      color: "from-[#E8B4A0] to-[#d9a391]",
    },
    {
      title: "Have a natural conversation",
      description:
        "Our AI gently guides the conversation with thoughtful questions. Speak or type—whatever feels comfortable.",
      color: "from-[#A8B89F] to-[#96a58d]",
    },
    {
      title: "Get a beautiful blog post",
      description:
        "In seconds, the conversation transforms into a professionally written story ready to share with family.",
      color: "from-[#D4AF37] to-[#c29e2f]",
    },
  ];

  return (
    <>
      {/* Mobile/Tablet: Compact Static Section */}
      <section
        id="how-it-works"
        className="lg:hidden bg-[#FFF8F0] py-12 sm:py-16"
      >
        {/* Subtle Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238B7355' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="container mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#3E2723]">
              Simple as 1-2-3
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-[#5D5D5D] max-w-2xl mx-auto mt-2">
              Start preserving precious memories in less time than it takes to
              make coffee
            </p>
          </div>

          {/* Steps */}
          <div className="flex flex-col gap-5 max-w-xl mx-auto">
            {steps.map((step, index) => (
              <div
                key={index}
                className="bg-white/50 backdrop-blur-sm  rounded-xl p-5 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  {/* <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#8B7355] to-[#D4AF37] flex items-center justify-center text-white font-bold text-sm sm:text-base">
                    {index + 1}
                  </div> */}
                  <div className="flex-1 space-y-1.5">
                    <h3 className="text-lg sm:text-xl font-serif font-bold text-[#3E2723]">
                      {step.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[#5D5D5D] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Desktop: Animated Section with Scroll Trigger */}
      <section
        ref={sectionRef}
        id="how-it-works-desktop"
        className="hidden lg:block relative h-screen overflow-hidden bg-[#FFF8F0]"
      >
        {/* Subtle Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238B7355' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="absolute top-24 left-0 right-0 z-20 text-center px-6">
          <h2 className="text-5xl xl:text-6xl font-serif font-bold text-[#3E2723]">
            Simple as 1-2-3
          </h2>
          <p className="text-xl text-[#5D5D5D] max-w-2xl mx-auto mt-3">
            Start preserving precious memories in less time than it takes to
            make coffee
          </p>
        </div>

        <div
          ref={containerRef}
          className="absolute inset-0 flex items-center justify-center"
        >
          {/* Animated cards */}
          <div
            ref={step1Ref}
            className="absolute w-[55%] max-w-md left-[15%]"
            style={{ transformOrigin: "center center" }}
          >
            <div className="space-y-3 xl:space-y-4 text-center backdrop-blur-md p-6 xl:p-8 rounded-lg">
              <h3 className="text-2xl xl:text-3xl font-serif font-bold text-[#3E2723]">
                {steps[0].title}
              </h3>
              <p className="text-base xl:text-lg text-[#5D5D5D] leading-relaxed">
                {steps[0].description}
              </p>
            </div>
          </div>

          <div
            ref={step2Ref}
            className="absolute w-[55%] max-w-md left-1/2 -translate-x-1/2"
            style={{ transformOrigin: "center center" }}
          >
            <div className="space-y-3 xl:space-y-4 text-center backdrop-blur-md p-6 xl:p-8 rounded-lg">
              <h3 className="text-2xl xl:text-3xl font-serif font-bold text-[#3E2723]">
                {steps[1].title}
              </h3>
              <p className="text-base xl:text-lg text-[#5D5D5D] leading-relaxed">
                {steps[1].description}
              </p>
            </div>
          </div>

          <div
            ref={step3Ref}
            className="absolute w-[55%] max-w-md right-[15%]"
            style={{ transformOrigin: "center center" }}
          >
            <div className="space-y-3 xl:space-y-4 text-center backdrop-blur-md p-6 xl:p-8 rounded-lg">
              <h3 className="text-2xl xl:text-3xl font-serif font-bold text-[#3E2723]">
                {steps[2].title}
              </h3>
              <p className="text-base xl:text-lg text-[#5D5D5D] leading-relaxed">
                {steps[2].description}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
