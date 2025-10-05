"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Copy, Mic, Sparkles, Check, Lightbulb } from "lucide-react";
import { getMemorySpace } from "@/lib/api/client";

function Step3Content() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [memorySpace, setMemorySpace] = useState<{
    id: string;
    grandparent_name: string;
    relation: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  const spaceId = searchParams.get("space_id");

  useEffect(() => {
    if (!spaceId) {
      router.push("/onboarding/step-1");
      return;
    }

    // Load memory space from backend
    const loadSpace = async () => {
      try {
        const space = await getMemorySpace(spaceId);
        if (space) {
          setMemorySpace(space);
        } else {
          router.push("/onboarding/step-1");
        }
      } catch (error) {
        console.error("Error loading memory space:", error);
        router.push("/onboarding/step-1");
      } finally {
        setLoading(false);
      }
    };

    loadSpace();
  }, [spaceId, router]);

  const handleStartRecording = () => {
    if (memorySpace && spaceId) {
      // Use memory_space_id instead of access_token
      router.push(`/session/${spaceId}`);
    }
  };

  const handleCopyLink = async () => {
    if (memorySpace && spaceId) {
      // Use memory_space_id in the URL
      const link = `${window.location.origin}/session/${spaceId}`;
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading || !memorySpace) {
    return (
      <div className="min-h-screen bg-[#FFF8F0] flex items-center justify-center">
        <div className="animate-pulse text-[#8B7355] text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F0] via-[#FFF8F0] to-[#F5EEE6] flex items-center justify-center p-6">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-80 h-80 bg-[#D4AF37] rounded-full mix-blend-multiply filter blur-3xl animate-float" />
        <div
          className="absolute bottom-20 right-20 w-72 h-72 bg-[#A8B89F] rounded-full mix-blend-multiply filter blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="w-full max-w-2xl relative z-10">
        {/* Success Header */}
        <div className="text-center mb-8 animate-slide-up">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#8B7355] mb-6 animate-scale-in shadow-lg">
            <Sparkles className="w-10 h-10 text-white animate-pulse" />
          </div>
          <h1 className="text-4xl lg:text-6xl font-serif font-bold text-[#3E2723] mb-3">
            ✨ {memorySpace.grandparent_name}&apos;s
          </h1>
          <h2 className="text-3xl lg:text-5xl font-serif font-bold text-[#3E2723] mb-4">
            Memory Space is ready!
          </h2>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 lg:p-10 border-2 border-[#E5D5C3] animate-scale-in mb-6">
          <h3 className="text-2xl font-serif font-bold text-[#3E2723] mb-6 text-center">
            Two ways to get started:
          </h3>

          <div className="space-y-6">
            {/* Option 1: Start Recording */}
            <div className="bg-gradient-to-br from-[#FFF8F0] to-[#F5EEE6] rounded-xl p-6 border-2 border-[#E5D5C3] hover:border-[#8B7355] transition-all hover:shadow-lg group">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#8B7355] to-[#A0826D] flex items-center justify-center text-white font-bold text-xl">
                  1
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-serif font-bold text-[#3E2723] mb-2">
                    Hand device to {memorySpace.grandparent_name.split(" ")[0]}{" "}
                    now
                  </h4>
                  <p className="text-[#5D5D5D] mb-4">
                    Start capturing memories right away
                  </p>
                  <Button
                    onClick={handleStartRecording}
                    className="bg-gradient-to-r from-[#8B7355] to-[#A0826D] hover:from-[#7A6348] hover:to-[#8B7355] text-white shadow-md group-hover:shadow-lg transition-all"
                  >
                    <Mic className="mr-2 h-5 w-5" />
                    Start Recording
                  </Button>
                </div>
              </div>
            </div>

            {/* Option 2: Copy Link */}
            <div className="bg-gradient-to-br from-[#FFF8F0] to-[#F5EEE6] rounded-xl p-6 border-2 border-[#E5D5C3] hover:border-[#A8B89F] transition-all hover:shadow-lg group">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#A8B89F] to-[#8B9B82] flex items-center justify-center text-white font-bold text-xl">
                  2
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-serif font-bold text-[#3E2723] mb-2">
                    Bookmark this page and return anytime
                  </h4>
                  <p className="text-[#5D5D5D] mb-4">
                    Share this link or save it for later
                  </p>
                  <Button
                    onClick={handleCopyLink}
                    variant="outline"
                    className="border-2 border-[#A8B89F] text-[#3E2723] hover:bg-[#A8B89F]/10 group-hover:shadow-md transition-all"
                  >
                    {copied ? (
                      <>
                        <Check className="mr-2 h-5 w-5" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="mr-2 h-5 w-5" />
                        Copy Link
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tip Card */}
        <div className="bg-gradient-to-r from-[#E8B4A0]/20 to-[#A8B89F]/20 rounded-xl p-6 border-2 border-[#E8B4A0]/30 animate-fade-in backdrop-blur-sm">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-6 h-6 text-[#D4AF37] flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-[#3E2723] mb-1">💡 Tip</h4>
              <p className="text-[#5D5D5D]">
                Find a quiet, comfy spot. This works best as a relaxed
                conversation where stories can flow naturally.
              </p>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          <div className="w-8 h-2 rounded-full bg-[#A8B89F]" />
          <div className="w-8 h-2 rounded-full bg-[#A8B89F]" />
          <div className="w-8 h-2 rounded-full bg-[#8B7355]" />
        </div>
      </div>
    </div>
  );
}

export default function OnboardingStep3() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FFF8F0] flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <Step3Content />
    </Suspense>
  );
}
