"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogOut, BookOpen } from "lucide-react";
import SignInModal from "@/components/SignInModal";
import { getUserFromStorage } from "@/lib/api/dummy";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [showSignInModal, setShowSignInModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Check if user is signed in
    const currentUser = getUserFromStorage();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("current_user");
    setUser(null);
    window.location.reload();
  };

  const handleSignInSuccess = () => {
    // Refresh user state after successful sign in
    const currentUser = getUserFromStorage();
    if (currentUser) {
      setUser(currentUser);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-md"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              {/* <span className="text-3xl">🕰️</span> */}
              <span className="text-2xl font-serif font-bold text-[#3E2723]">
                Evermore
              </span>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#how-it-works"
                className="text-[#5D5D5D] hover:text-[#8B7355] transition-colors"
              >
                How It Works
              </a>
              <a
                href="#stories"
                className="text-[#5D5D5D] hover:text-[#8B7355] transition-colors"
              >
                Stories
              </a>

              {user ? (
                <div className="flex items-center gap-3">
                  <Link href="/blogs">
                    <Button
                      variant="outline"
                      className="border-[#8B7355] text-[#8B7355] hover:bg-[#8B7355] hover:text-white"
                    >
                      <BookOpen className="mr-2 h-4 w-4" />
                      My Blogs
                    </Button>
                  </Link>
                  <Button
                    onClick={handleSignOut}
                    variant="outline"
                    className="border-[#8B7355] text-[#8B7355] hover:bg-[#8B7355] hover:text-white"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => setShowSignInModal(true)}
                  variant="outline"
                  className="border-[#8B7355] text-[#8B7355] hover:bg-[#8B7355] hover:text-white"
                >
                  Sign In
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-[#3E2723]">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Sign In Modal */}
      <SignInModal
        isOpen={showSignInModal}
        onClose={() => setShowSignInModal(false)}
        onSuccess={handleSignInSuccess}
      />
    </>
  );
}
