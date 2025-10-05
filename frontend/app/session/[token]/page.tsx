"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
// import { Button } from "@/components/ui/button";
import { Mic, Keyboard, Sparkles } from "lucide-react";
import { getMemorySpace } from "@/lib/api/client";

export default function SessionPage() {
  const router = useRouter();
  const params = useParams();
  const [memorySpace, setMemorySpace] = useState<{
    id: string;
    grandparent_name: string;
    relation: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  const token = params.token as string;

  useEffect(() => {
    const loadMemorySpace = async () => {
      try {
        const space = await getMemorySpace(token);
        if (space) {
          setMemorySpace(space);
        } else {
          alert("Memory space not found");
          router.push("/");
        }
      } catch (error) {
        console.error("Error loading memory space:", error);
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    loadMemorySpace();
  }, [token, router]);

  const handleModeSelection = (mode: "voice" | "text") => {
    router.push(`/session/${token}/conversation?mode=${mode}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFF8F0] flex items-center justify-center">
        <div className="animate-pulse text-[#8B7355] text-xl">Loading...</div>
      </div>
    );
  }

  if (!memorySpace) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F0] via-[#FFF8F0] to-[#F5EEE6] flex items-center justify-center p-6">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#E8B4A0] rounded-full mix-blend-multiply filter blur-3xl animate-float" />
        <div
          className="absolute bottom-20 right-20 w-72 h-72 bg-[#A8B89F] rounded-full mix-blend-multiply filter blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="w-full max-w-2xl relative z-10">
        {/* Greeting Header */}
        <div className="text-center mb-8 animate-slide-up">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#8B7355] to-[#D4AF37] mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-serif font-bold text-[#3E2723] mb-3">
            👋 Hello, {memorySpace.grandparent_name.split(" ")[0]}!
          </h1>
          <p className="text-xl text-[#5D5D5D] max-w-xl mx-auto">
            I&apos;m here to help you share your wonderful life stories.
          </p>
        </div>

        {/* How It Works Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 lg:p-10 border-2 border-[#E5D5C3] animate-scale-in mb-8">
          <h2 className="text-2xl font-serif font-bold text-[#3E2723] mb-6 text-center">
            How this works:
          </h2>

          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#8B7355] to-[#A0826D] flex items-center justify-center text-white font-bold">
                1
              </div>
              <p className="text-[#3E2723] pt-1">I&apos;ll ask you questions</p>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#8B7355] to-[#A0826D] flex items-center justify-center text-white font-bold">
                2
              </div>
              <p className="text-[#3E2723] pt-1">You share memories</p>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#8B7355] to-[#A0826D] flex items-center justify-center text-white font-bold">
                3
              </div>
              <p className="text-[#3E2723] pt-1">Talk naturally - no rush</p>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#8B7355] to-[#A0826D] flex items-center justify-center text-white font-bold">
                4
              </div>
              <p className="text-[#3E2723] pt-1">
                We'll create a beautiful story together
              </p>
            </div>
          </div>

          {/* Mode Selection */}
          <div className="border-t-2 border-[#E5D5C3] pt-8">
            <h3 className="text-xl font-serif font-bold text-[#3E2723] mb-6 text-center">
              How would you like to respond?
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Voice Mode */}
              <button
                onClick={() => handleModeSelection("voice")}
                className="group relative bg-gradient-to-br from-[#8B7355] to-[#A0826D] rounded-xl p-6 text-white hover:shadow-xl transition-all transform hover:scale-105"
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <Mic className="w-8 h-8" />
                  </div>
                  <span className="text-2xl font-serif font-bold">
                    I&apos;ll speak
                  </span>
                </div>
                <div className="absolute inset-0 rounded-xl ring-4 ring-transparent group-hover:ring-[#D4AF37]/50 transition-all" />
              </button>

              {/* Text Mode */}
              <button
                onClick={() => handleModeSelection("text")}
                className="group relative bg-gradient-to-br from-[#A8B89F] to-[#8B9B82] rounded-xl p-6 text-white hover:shadow-xl transition-all transform hover:scale-105"
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <Keyboard className="w-8 h-8" />
                  </div>
                  <span className="text-2xl font-serif font-bold">
                    I&apos;ll type
                  </span>
                </div>
                <div className="absolute inset-0 rounded-xl ring-4 ring-transparent group-hover:ring-[#A8B89F]/50 transition-all" />
              </button>
            </div>

            <p className="text-center text-sm text-[#8B7355] mt-4">
              (You can switch anytime)
            </p>
          </div>
        </div>

        {/* Decorative Footer */}
        <div className="text-center text-[#8B7355]/70 text-sm animate-fade-in">
          <p>Take your time and enjoy sharing your precious memories</p>
        </div>
      </div>
    </div>
  );
}
