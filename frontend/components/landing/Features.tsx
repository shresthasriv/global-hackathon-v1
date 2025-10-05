"use client";

export default function Features() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FFF8F0]/30 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        {/* <div
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
        </div> */}

        {/* Features Grid */}
        {/* <div
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
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
              />

              <div className="relative z-10 space-y-4">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#FFF8F0] to-[#F5EEE6] flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-300 shadow-md">
                  {feature.icon}
                </div>

                <h3 className="text-2xl font-serif font-bold text-[#3E2723] group-hover:text-[#8B7355] transition-colors">
                  {feature.title}
                </h3>

                <p className="text-[#5D5D5D] leading-relaxed">
                  {feature.description}
                </p>
              </div>

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
        </div> */}
      </div>

      {/* Fade Transition to Next Section with Animated Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-200 bg-gradient-to-b from-white/0 via-white/20 via-[#FFF8F0]/60 to-[#E8B4A0]/40 pointer-events-none animate-gradient bg-[length:200%_200%]" />
    </section>
  );
}
