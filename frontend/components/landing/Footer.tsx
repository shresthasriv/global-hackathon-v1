"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function Footer() {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <footer className="relative bg-gradient-to-b from-[#3E2723] to-[#2d1f1a] text-white overflow-hidden">
      {/* Decorative Top Wave */}
      <div className="absolute top-0 left-0 right-0 transform -translate-y-full">
        <svg className="w-full h-16 md:h-24" viewBox="0 0 1200 120">
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill="#3E2723"
          />
        </svg>
      </div>

      {/* Soothing Gradient Overlay - Darker version of the 90% section */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#3E2723] via-[#2d1f1a] to-[#1a0f0c]" />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#4a342a]/30 via-transparent to-[#5d4a3e]/20" />
      </div>

      {/* Floating Memory Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#D4AF37] rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-20 right-20 w-40 h-40 bg-[#E8B4A0] rounded-full blur-3xl animate-float"
          style={{ animationDelay: "3s" }}
        />
      </div>

      <div
        ref={elementRef}
        className="container mx-auto px-6 py-16 md:py-20 relative z-10"
      >
        {/* Emotional Closing Message */}
        <div
          className={`text-center mb-16 max-w-3xl mx-auto memory-fade-up ${
            isVisible ? "visible" : ""
          }`}
        >
          <div className="inline-block mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-[#D4AF37] rounded-full blur-2xl opacity-20" />
              {/* <span className="relative text-6xl md:text-7xl block">🕰️</span> */}
            </div>
          </div>

          <h3 className="text-2xl font-serif font-bold text-white mb-4">
            Evermore
          </h3>
          <p className="text-lg text-white/70 leading-relaxed italic font-serif">
            &quot;In every old person there is a young person wondering what
            happened.&quot;
          </p>
          <p className="text-sm text-white/50 mt-2">— Terry Pratchett</p>
        </div>

        {/* Main Footer Content */}
        <div
          className={`grid md:grid-cols-4 gap-12 mb-12 memory-reveal ${
            isVisible ? "visible" : ""
          }`}
          style={{ transitionDelay: "0.2s" }}
        >
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center space-x-3">
              {/* <span className="text-4xl">🕰️</span> */}
              {/* <span className="text-2xl font-serif font-bold text-[#FFF8F0]">
                Evermore
              </span> */}
            </div>
            <p className="text-white/70 leading-relaxed max-w-md">
              We believe every family story deserves to be preserved. Through
              the gentle power of conversation and AI, we&apos;re helping
              families capture what matters most—before it&apos;s too late.
            </p>
            <div className="flex items-center gap-3 text-sm text-white/60">
              <span className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-[#D4AF37]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Free Forever
              </span>
              <span className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-[#D4AF37]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Private & Secure
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-bold text-lg mb-4 text-[#FFF8F0]">
              Explore
            </h4>
            <ul className="space-y-3">
              {[
                { label: "How It Works", href: "#how-it-works" },
                { label: "Example Stories", href: "#stories" },
                { label: "Features", href: "#features" },
                { label: "Start Now", href: "#" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-[#D4AF37] transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-[#D4AF37] group-hover:w-4 transition-all duration-300" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-serif font-bold text-lg mb-4 text-[#FFF8F0]">
              Connect
            </h4>
            <ul className="space-y-3 mb-6">
              {[
                { label: "About Us", href: "#about" },
                { label: "Privacy Policy", href: "#privacy" },
                { label: "Terms of Service", href: "#terms" },
                { label: "Contact", href: "#contact" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-[#D4AF37] transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-[#D4AF37] group-hover:w-4 transition-all duration-300" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D4AF37] transition-all duration-300 group"
                aria-label="Twitter"
              >
                <svg
                  className="w-5 h-5 text-white/70 group-hover:text-white transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D4AF37] transition-all duration-300 group"
                aria-label="Facebook"
              >
                <svg
                  className="w-5 h-5 text-white/70 group-hover:text-white transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D4AF37] transition-all duration-300 group"
                aria-label="Instagram"
              >
                <svg
                  className="w-5 h-5 text-white/70 group-hover:text-white transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <rect
                    x="2"
                    y="2"
                    width="20"
                    height="20"
                    rx="5"
                    ry="5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <circle cx="17.5" cy="6.5" r="1.5" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Decorative Line */}
        <div
          className={`relative memory-fade-up ${isVisible ? "visible" : ""}`}
          style={{ transitionDelay: "0.4s" }}
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/50 text-sm text-center md:text-left">
              © 2025 Evermore. Made with{" "}
              <span className="text-[#E8B4A0] inline-block animate-pulse">
                ❤️
              </span>{" "}
              for families everywhere.
            </p>

            <div className="flex items-center gap-4 text-sm text-white/50">
              <span>Preserving memories, one story at a time</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
