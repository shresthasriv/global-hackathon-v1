"use client";

import { Card } from "@/components/ui/card";
import { useStaggeredAnimation } from "@/hooks/useScrollAnimation";

export default function HowItWorks() {
  const { elementRef: stepsRef, visibleItems } = useStaggeredAnimation(3, 200);

  const steps = [
    {
      number: "1",
      icon: "👤",
      title: "Set up in 30 seconds",
      description:
        "Add your grandparent's name and you're ready to go. No complicated forms or sign-ups needed.",
      color: "from-[#E8B4A0] to-[#d9a391]",
    },
    {
      number: "2",
      icon: "💬",
      title: "Have a natural conversation",
      description:
        "Our AI gently guides the conversation with thoughtful questions. Speak or type—whatever feels comfortable.",
      color: "from-[#A8B89F] to-[#96a58d]",
    },
    {
      number: "3",
      icon: "📖",
      title: "Get a beautiful blog post",
      description:
        "In seconds, the conversation transforms into a professionally written story ready to share with family.",
      color: "from-[#D4AF37] to-[#c29e2f]",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-24 bg-white relative overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#F5EEE6] to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-5xl lg:text-6xl font-serif font-bold text-[#3E2723] animate-slide-up">
            Simple as a conversation
          </h2>
          <p className="text-xl text-[#5D5D5D] max-w-2xl mx-auto animate-fade-in">
            No technical skills required. Just genuine connection.
          </p>
        </div>

        {/* Steps */}
        <div
          ref={stepsRef}
          className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`relative memory-float-in ${
                visibleItems.has(index) ? "visible" : ""
              }`}
            >
              {/* Connecting Line (hidden on mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-24 -right-4 w-8 h-1 bg-gradient-to-r from-[#8B7355] to-transparent z-0" />
              )}

              <Card className="relative p-8 h-full bg-white border-2 border-[#E5D5C3] hover:border-[#8B7355] transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group">
                {/* Step Number Badge */}
                <div
                  className={`absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  {step.number}
                </div>

                {/* Icon */}
                <div className="mb-6 flex justify-center">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#FFF8F0] to-[#F5EEE6] flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-300 shadow-md">
                    {step.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4 text-center">
                  <h3 className="text-2xl font-serif font-bold text-[#3E2723]">
                    {step.title}
                  </h3>
                  <p className="text-[#5D5D5D] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Decorative corner */}
                <div className="absolute bottom-4 right-4 w-8 h-8 opacity-10">
                  <svg
                    viewBox="0 0 100 100"
                    fill="currentColor"
                    className="text-[#8B7355]"
                  >
                    <path d="M50 15 L61 40 L88 40 L67 57 L77 82 L50 65 L23 82 L33 57 L12 40 L39 40 Z" />
                  </svg>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Visual Process Flow */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-[#FFF8F0] to-[#F5EEE6] rounded-3xl p-8 lg:p-12 border-2 border-[#E5D5C3] shadow-lg">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              {/* Input */}
              <div className="text-center space-y-4">
                <div className="text-4xl mb-2">🎤</div>
                <div className="font-serif font-bold text-[#3E2723]">
                  Your Voice
                </div>
                <div className="text-sm text-[#5D5D5D]">
                  Natural conversation
                </div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center">
                <svg
                  className="w-16 h-16 text-[#8B7355] hidden md:block animate-pulse"
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
                <svg
                  className="w-16 h-16 text-[#8B7355] md:hidden animate-bounce"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </div>

              {/* AI Magic */}
              <div className="text-center space-y-4">
                <div className="text-4xl mb-2">✨</div>
                <div className="font-serif font-bold text-[#3E2723]">
                  AI Magic
                </div>
                <div className="text-sm text-[#5D5D5D]">Smart processing</div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center md:col-start-2">
                <svg
                  className="w-16 h-16 text-[#8B7355] hidden md:block animate-pulse"
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
                <svg
                  className="w-16 h-16 text-[#8B7355] md:hidden animate-bounce"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </div>

              {/* Output */}
              <div className="text-center space-y-4 md:col-start-3">
                <div className="text-4xl mb-2">📚</div>
                <div className="font-serif font-bold text-[#3E2723]">
                  Beautiful Story
                </div>
                <div className="text-sm text-[#5D5D5D]">Ready to share</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fade Transition to Next Section */}
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-white/0 via-white/20 via-[#FFF8F0]/60 to-[#8B7355]/10 pointer-events-none" />
    </section>
  );
}
