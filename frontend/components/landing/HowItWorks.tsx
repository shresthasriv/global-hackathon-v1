"use client";

import { Card } from "@/components/ui/card";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const floatingElementsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate floating memory elements
      if (floatingElementsRef.current) {
        const memories =
          floatingElementsRef.current.querySelectorAll(".memory-bubble");
        gsap.to(memories, {
          y: -30,
          duration: 3,
          stagger: 0.5,
          ease: "power1.inOut",
          yoyo: true,
          repeat: -1,
        });
      }

      // Animate connecting line growth
      if (lineRef.current && sectionRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0, transformOrigin: "top" },
          {
            scaleY: 1,
            duration: 1.5,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              end: "bottom 40%",
              scrub: 1,
            },
          }
        );
      }

      // Step 1: Slide and scale with rotation
      if (step1Ref.current) {
        gsap.fromTo(
          step1Ref.current,
          { x: -100, opacity: 0, scale: 0.8, rotateY: -15 },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            rotateY: 0,
            duration: 1,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: step1Ref.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Step 2: Bounce in from right with special effect
      if (step2Ref.current) {
        gsap.fromTo(
          step2Ref.current,
          { x: 100, opacity: 0, scale: 0.5, rotateY: 15 },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            rotateY: 0,
            duration: 1.2,
            ease: "elastic.out(1, 0.5)",
            scrollTrigger: {
              trigger: step2Ref.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Add pulsing conversation bubbles
        const bubbles = step2Ref.current.querySelectorAll(".chat-bubble");
        gsap.to(bubbles, {
          scale: 1.1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power1.inOut",
          yoyo: true,
          repeat: -1,
          scrollTrigger: {
            trigger: step2Ref.current,
            start: "top 60%",
          },
        });
      }

      // Step 3: Magical transformation effect
      if (step3Ref.current) {
        gsap.fromTo(
          step3Ref.current,
          { y: 100, opacity: 0, scale: 0.7, rotateX: 20 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotateX: 0,
            duration: 1.3,
            ease: "power3.out",
            scrollTrigger: {
              trigger: step3Ref.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Sparkle effect for the blog transformation
        const sparkles = step3Ref.current.querySelectorAll(".sparkle");
        gsap.to(sparkles, {
          scale: 1.5,
          opacity: 0,
          duration: 1.5,
          stagger: 0.1,
          ease: "power2.out",
          repeat: -1,
          repeatDelay: 2,
          scrollTrigger: {
            trigger: step3Ref.current,
            start: "top 60%",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const steps = [
    {
      number: "1",
      title: "Set up in 30 seconds",
      description:
        "Add your grandparent's name and you're ready to go. No complicated forms or sign-ups needed.",
      color: "from-[#E8B4A0] to-[#d9a391]",
    },
    {
      number: "2",
      title: "Have a natural conversation",
      description:
        "Our AI gently guides the conversation with thoughtful questions. Speak or type—whatever feels comfortable.",
      color: "from-[#A8B89F] to-[#96a58d]",
    },
    {
      number: "3",
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
      className="py-24 bg-white relative overflow-hidden"
      style={{ perspective: "1000px" }}
    >
      {/* Animated floating memory elements */}
      <div
        ref={floatingElementsRef}
        className="absolute inset-0 opacity-10 pointer-events-none"
      >
        <div className="memory-bubble absolute top-20 left-10 w-16 h-16 rounded-full bg-[#E8B4A0]" />
        <div className="memory-bubble absolute top-40 right-20 w-20 h-20 rounded-full bg-[#A8B89F]" />
        <div className="memory-bubble absolute bottom-32 left-1/4 w-12 h-12 rounded-full bg-[#D4AF37]" />
        <div className="memory-bubble absolute top-1/2 right-1/4 w-24 h-24 rounded-full bg-[#8B7355]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-5xl lg:text-6xl font-serif font-bold text-[#3E2723]">
            Simple as 1-2-3
          </h2>
          <p className="text-xl text-[#5D5D5D] max-w-2xl mx-auto">
            Start preserving precious memories in less time than it takes to
            make coffee
          </p>
        </div>

        {/* Timeline with Steps */}
        <div ref={timelineRef} className="relative max-w-5xl mx-auto">
          {/* Connecting Animated Line */}
          <div
            ref={lineRef}
            className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#E8B4A0] via-[#A8B89F] to-[#D4AF37] -translate-x-1/2"
            style={{ height: "85%" }}
          />

          {/* Step 1 */}
          <div ref={step1Ref} className="relative mb-32">
            <div className="lg:grid lg:grid-cols-2 gap-12 items-center">
              <Card className="p-8 bg-gradient-to-br from-white to-[#FFF8F0] border-2 border-[#E8B4A0] shadow-2xl hover:shadow-3xl transition-shadow duration-500 relative overflow-hidden group">
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#E8B4A0] rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity" />

                <div className="relative z-10 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#E8B4A0] to-[#d9a391] flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                    1
                  </div>
                  <h3 className="text-3xl font-serif font-bold text-[#3E2723]">
                    {steps[0].title}
                  </h3>
                  <p className="text-lg text-[#5D5D5D] leading-relaxed">
                    {steps[0].description}
                  </p>
                </div>
              </Card>

              <div className="hidden lg:flex justify-center items-center">
                <div className="text-9xl opacity-20 font-serif text-[#E8B4A0]">
                  👤
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div ref={step2Ref} className="relative mb-32">
            <div className="lg:grid lg:grid-cols-2 gap-12 items-center">
              <div className="hidden lg:flex justify-center items-center relative">
                <div className="text-9xl opacity-20 font-serif text-[#A8B89F]">
                  💬
                </div>
                {/* Animated chat bubbles */}
                <div className="chat-bubble absolute top-10 left-20 w-12 h-12 bg-[#A8B89F] rounded-full opacity-30" />
                <div className="chat-bubble absolute bottom-10 right-20 w-16 h-16 bg-[#8B7355] rounded-full opacity-20" />
              </div>

              <Card className="p-8 bg-gradient-to-br from-white to-[#F5F5F0] border-2 border-[#A8B89F] shadow-2xl hover:shadow-3xl transition-shadow duration-500 relative overflow-hidden group">
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#A8B89F] rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity" />

                <div className="relative z-10 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#A8B89F] to-[#96a58d] flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                    2
                  </div>
                  <h3 className="text-3xl font-serif font-bold text-[#3E2723]">
                    {steps[1].title}
                  </h3>
                  <p className="text-lg text-[#5D5D5D] leading-relaxed">
                    {steps[1].description}
                  </p>
                </div>
              </Card>
            </div>
          </div>

          {/* Step 3 */}
          <div ref={step3Ref} className="relative">
            <div className="lg:grid lg:grid-cols-2 gap-12 items-center">
              <Card className="p-8 bg-gradient-to-br from-white to-[#FFFEF8] border-2 border-[#D4AF37] shadow-2xl hover:shadow-3xl transition-shadow duration-500 relative overflow-hidden group">
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#D4AF37] rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity" />

                {/* Sparkle elements */}
                <div className="sparkle absolute top-4 right-4 w-3 h-3 bg-[#D4AF37] rounded-full" />
                <div className="sparkle absolute top-8 right-12 w-2 h-2 bg-[#E8B4A0] rounded-full" />
                <div className="sparkle absolute top-6 right-20 w-2.5 h-2.5 bg-[#A8B89F] rounded-full" />

                <div className="relative z-10 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#c29e2f] flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                    3
                  </div>
                  <h3 className="text-3xl font-serif font-bold text-[#3E2723]">
                    {steps[2].title}
                  </h3>
                  <p className="text-lg text-[#5D5D5D] leading-relaxed">
                    {steps[2].description}
                  </p>
                </div>
              </Card>

              <div className="hidden lg:flex justify-center items-center relative">
                <div className="text-9xl opacity-20 font-serif text-[#D4AF37]">
                  📖
                </div>
                <div className="sparkle absolute top-0 left-0 w-4 h-4 bg-[#D4AF37] rounded-full" />
                <div className="sparkle absolute bottom-0 right-0 w-3 h-3 bg-[#E8B4A0] rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <p className="text-2xl font-serif text-[#3E2723] italic">
            That&apos;s it. Really. ✨
          </p>
        </div>
      </div>

      {/* Fade Transition to Next Section */}
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-white/0 via-white/20 via-[#FFF8F0]/60 to-[#8B7355]/10 pointer-events-none" />
    </section>
  );
}
