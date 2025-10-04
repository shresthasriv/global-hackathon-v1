"use client";

import { Card } from "@/components/ui/card";
import {
  useStaggeredAnimation,
  useScrollAnimation,
} from "@/hooks/useScrollAnimation";

export default function Features() {
  const { elementRef: headerRef, isVisible: headerVisible } =
    useScrollAnimation();
  const { elementRef: featuresRef, visibleItems } = useStaggeredAnimation(
    6,
    100
  );

  const features = [
    {
      icon: "🎤",
      title: "Voice First",
      description:
        "Speak naturally or type—whatever feels comfortable. Our voice recognition works seamlessly for elderly users.",
      gradient: "from-[#E8B4A0] to-[#d9a391]",
    },
    {
      icon: "🧠",
      title: "Smart AI Questions",
      description:
        "Natural follow-ups that feel like chatting with a caring grandchild. The AI remembers and references past stories.",
      gradient: "from-[#A8B89F] to-[#96a58d]",
    },
    {
      icon: "✨",
      title: "Instant Beautiful Posts",
      description:
        "Professional formatting in seconds. Multiple style options from warm narratives to interview formats.",
      gradient: "from-[#D4AF37] to-[#c29e2f]",
    },
    {
      icon: "👴",
      title: "Elderly Friendly",
      description:
        "Large text, high contrast, simple UI. Designed specifically for seniors with accessibility in mind.",
      gradient: "from-[#8B7355] to-[#6d5b45]",
    },
    {
      icon: "📱",
      title: "Works Anywhere",
      description:
        "Phone, tablet, or computer. No app download needed. Start capturing memories from any device.",
      gradient: "from-[#E8B4A0] to-[#d9a391]",
    },
    {
      icon: "🔒",
      title: "Private & Secure",
      description:
        "Your stories stay yours. Share with family on your terms. We never sell or share your data.",
      gradient: "from-[#A8B89F] to-[#96a58d]",
    },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FFF8F0]/30 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`text-center mb-20 space-y-4 memory-fade-up ${
            headerVisible ? "visible" : ""
          }`}
        >
          <h2 className="text-5xl lg:text-6xl font-serif font-bold text-[#3E2723]">
            Built with love and care
          </h2>
          <p className="text-xl text-[#5D5D5D] max-w-2xl mx-auto">
            Every detail designed to make preserving memories effortless
          </p>
        </div>

        {/* Features Grid */}
        <div
          ref={featuresRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {features.map((feature, index) => (
            <Card
              key={index}
              className={`group p-8 bg-white border-2 border-[#E5D5C3] hover:border-[#8B7355] transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 relative overflow-hidden memory-reveal ${
                visibleItems.has(index) ? "visible" : ""
              }`}
            >
              {/* Gradient Background on Hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
              />

              <div className="relative z-10 space-y-4">
                {/* Icon */}
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#FFF8F0] to-[#F5EEE6] flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-300 shadow-md">
                  {feature.icon}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-serif font-bold text-[#3E2723] group-hover:text-[#8B7355] transition-colors">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-[#5D5D5D] leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Decorative Element */}
              <div className="absolute bottom-4 right-4 w-12 h-12 opacity-5 group-hover:opacity-10 transition-opacity">
                <svg
                  viewBox="0 0 100 100"
                  fill="currentColor"
                  className="text-[#8B7355]"
                >
                  <circle cx="50" cy="50" r="40" />
                </svg>
              </div>
            </Card>
          ))}
        </div>

        {/* Additional Value Props */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div
              className="space-y-2 animate-fade-in"
              style={{ animationDelay: "0.6s" }}
            >
              <div className="text-4xl font-serif font-bold text-[#8B7355]">
                Free
              </div>
              <div className="text-[#5D5D5D]">Forever and always</div>
            </div>
            <div
              className="space-y-2 animate-fade-in"
              style={{ animationDelay: "0.8s" }}
            >
              <div className="text-4xl font-serif font-bold text-[#8B7355]">
                30s
              </div>
              <div className="text-[#5D5D5D]">To get started</div>
            </div>
            <div
              className="space-y-2 animate-fade-in"
              style={{ animationDelay: "1s" }}
            >
              <div className="text-4xl font-serif font-bold text-[#8B7355]">
                ∞
              </div>
              <div className="text-[#5D5D5D]">Memories preserved</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
