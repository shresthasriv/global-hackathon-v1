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

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=3000",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      gsap.set([step1Ref.current, step2Ref.current, step3Ref.current], {
        y: "100vh",
        x: 0,
        opacity: 0,
        scale: 0.8,
      });

      tl.to(step1Ref.current, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power2.out",
      })
        .to(
          step1Ref.current,
          {
            x: "-45%",
            scale: 0.9,
            duration: 1,
            ease: "power2.inOut",
          },
          "+=0.3"
        )
        .to(
          step2Ref.current,
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power2.out",
          },
          "<"
        )
        .to(
          step1Ref.current,
          {
            x: "-90%",
            scale: 0.85,
            duration: 1,
            ease: "power2.inOut",
          },
          "+=0.3"
        )
        .to(
          step2Ref.current,
          {
            x: "45%",
            scale: 0.9,
            duration: 1,
            ease: "power2.inOut",
          },
          "<"
        )
        .to(
          step3Ref.current,
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power2.out",
          },
          "<"
        )
        .to(
          [step1Ref.current, step2Ref.current, step3Ref.current],
          {
            x: (index) => {
              if (index === 0) return "-100%";
              if (index === 1) return "0%";
              return "100%";
            },
            scale: 0.85,
            duration: 1,
            ease: "power2.inOut",
          },
          "+=0.2"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const steps = [
    {
      title: "Set up in 30 seconds",
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
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative h-screen overflow-hidden bg-[#FFF8F0]"
    >
      {/* Subtle Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238B7355' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="absolute top-12 left-0 right-0 z-20 text-center px-6">
        <h2 className="text-5xl lg:text-6xl font-serif font-bold text-[#3E2723]">
          Simple as 1-2-3
        </h2>
        <p className="text-xl text-[#5D5D5D] max-w-2xl mx-auto mt-4">
          Start preserving precious memories in less time than it takes to make
          coffee
        </p>
      </div>

      <div
        ref={containerRef}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div
          ref={step1Ref}
          className="absolute w-[90%] max-w-md"
          style={{ transformOrigin: "center center" }}
        >
          <div className="space-y-4 text-center backdrop-blur-md bg-white/80 p-8 rounded-lg">
            <h3 className="text-3xl font-serif font-bold text-[#3E2723]">
              {steps[0].title}
            </h3>
            <p className="text-lg text-[#5D5D5D] leading-relaxed">
              {steps[0].description}
            </p>
          </div>
        </div>

        <div
          ref={step2Ref}
          className="absolute w-[90%] max-w-md"
          style={{ transformOrigin: "center center" }}
        >
          <div className="space-y-4 text-center backdrop-blur-md bg-white/80 p-8 rounded-lg">
            <h3 className="text-3xl font-serif font-bold text-[#3E2723]">
              {steps[1].title}
            </h3>
            <p className="text-lg text-[#5D5D5D] leading-relaxed">
              {steps[1].description}
            </p>
          </div>
        </div>

        <div
          ref={step3Ref}
          className="absolute w-[90%] max-w-md"
          style={{ transformOrigin: "center center" }}
        >
          <div className="space-y-4 text-center backdrop-blur-md bg-white/80 p-8 rounded-lg">
            <h3 className="text-3xl font-serif font-bold text-[#3E2723]">
              {steps[2].title}
            </h3>
            <p className="text-lg text-[#5D5D5D] leading-relaxed">
              {steps[2].description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
