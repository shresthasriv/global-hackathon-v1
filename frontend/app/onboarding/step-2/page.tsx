"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ArrowRight, Heart } from "lucide-react";
import {
  createMemorySpace,
  uploadPhoto,
  getUserFromStorage,
} from "@/lib/api/client";

export default function OnboardingStep2() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  // Commented out for now - photo upload not implemented
  // const [photoFile, setPhotoFile] = useState<File | null>(null);
  // const [photoPreview, setPhotoPreview] = useState<string>("");
  const [formData, setFormData] = useState({
    grandparent_name: "",
    relation: "grandchild",
  });

  useEffect(() => {
    // Check if user is authenticated
    const user = getUserFromStorage();
    if (!user) {
      // No user found, redirect to step 1
      router.push("/onboarding/step-1");
    } else {
      setCheckingAuth(false);
    }
  }, [router]);

  // Commented out for now - photo upload not implemented
  // const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     setPhotoFile(file);
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setPhotoPreview(reader.result as string);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.grandparent_name.trim()) {
      alert("Please enter a name");
      return;
    }

    const user = getUserFromStorage();
    if (!user) {
      alert("User not found. Please start over.");
      router.push("/onboarding/step-1");
      return;
    }

    setLoading(true);

    try {
      // Upload photo if provided (not implemented yet)
      const photoUrl = undefined;
      // if (photoFile) {
      //   photoUrl = await uploadPhoto(photoFile);
      // }

      // Create memory space
      const result = await createMemorySpace({
        creator_email: user.email,
        grandparent_name: formData.grandparent_name,
        relation: formData.relation,
        photo_url: photoUrl,
      });

      // Navigate to step 3 (handoff)
      router.push(`/onboarding/step-3?space_id=${result.memory_space_id}`);
    } catch (error) {
      console.error("Error creating memory space:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (checkingAuth) {
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
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#E8B4A0] rounded-full mix-blend-multiply filter blur-3xl animate-float" />
        <div
          className="absolute bottom-20 right-20 w-72 h-72 bg-[#A8B89F] rounded-full mix-blend-multiply filter blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="w-full max-w-lg relative z-10">
        {/* Header */}
        <div className="text-center mb-8 animate-slide-up">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#E8B4A0] to-[#8B7355] mb-4">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-serif font-bold text-[#3E2723] mb-2">
            Who are we remembering?
          </h1>
          <p className="text-lg text-[#5D5D5D]">
            Tell us about the person whose stories you&apos;d like to preserve
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-[#E5D5C3] animate-scale-in">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Grandparent Name */}
            <div className="space-y-2">
              <Label htmlFor="grandparent_name">
                Their Name <span className="text-[#E8B4A0]">*</span>
              </Label>
              <Input
                id="grandparent_name"
                type="text"
                placeholder='e.g., "Grandma Rose"'
                value={formData.grandparent_name}
                onChange={(e) =>
                  setFormData({ ...formData, grandparent_name: e.target.value })
                }
                required
              />
            </div>

            {/* Relationship */}
            <div className="space-y-2">
              <Label htmlFor="relation">
                Your relationship to them{" "}
                <span className="text-[#E8B4A0]">*</span>
              </Label>
              <Select
                id="relation"
                value={formData.relation}
                onChange={(e) =>
                  setFormData({ ...formData, relation: e.target.value })
                }
                required
              >
                <option value="grandchild">Grandchild</option>
                <option value="child">Child</option>
                <option value="niece_nephew">Niece/Nephew</option>
                <option value="friend">Friend</option>
                <option value="caregiver">Caregiver</option>
                <option value="other">Other</option>
              </Select>
            </div>

            {/* Photo Upload */}
            {/* <div className="space-y-2">
              <Label htmlFor="photo">
                Upload a photo{" "}
                <span className="text-[#8B7355]/60 text-xs">(Optional)</span>
              </Label>

              <div className="relative">
                <input
                  id="photo"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
                <label
                  htmlFor="photo"
                  className="flex items-center justify-center h-32 w-full rounded-lg border-2 border-dashed border-[#E5D5C3] bg-[#FFF8F0] cursor-pointer hover:bg-[#F5EEE6] transition-colors"
                >
                  {photoPreview ? (
                    <div className="relative w-full h-full">
                      <img
                        src={photoPreview}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <Upload className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Upload className="w-8 h-8 text-[#8B7355] mx-auto mb-2" />
                      <p className="text-sm text-[#8B7355]">Click to upload</p>
                    </div>
                  )}
                </label>
              </div>
            </div> */}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 text-lg font-medium bg-gradient-to-r from-[#8B7355] to-[#A0826D] hover:from-[#7A6348] hover:to-[#8B7355] transition-all shadow-lg"
            >
              {loading ? (
                "Creating Memory Space..."
              ) : (
                <>
                  Continue
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </form>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center gap-2 mt-6">
          <div className="w-8 h-2 rounded-full bg-[#A8B89F]" />
          <div className="w-8 h-2 rounded-full bg-[#8B7355]" />
          <div className="w-8 h-2 rounded-full bg-[#E5D5C3]" />
        </div>
      </div>
    </div>
  );
}
