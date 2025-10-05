"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogOut, Menu, X } from "lucide-react";
import SignInModal from "@/components/SignInModal";
import { getUserFromStorage } from "@/lib/api/client";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<{ email: string; name: string } | null>(
    null
  );
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
                      {/* <BookOpen className="mr-2 h-4 w-4" /> */}
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
            <button
              className="md:hidden text-[#3E2723]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu Dropdown - Compact Side Panel */}
          {isMobileMenuOpen && (
            <>
              {/* Backdrop */}
              <div
                className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                onClick={() => setIsMobileMenuOpen(false)}
              />

              {/* Dropdown Panel */}
              <div className="md:hidden absolute right-4 top-16 w-64 bg-[#FFF8F0] border-2 border-[#E5D5C3] rounded-xl shadow-2xl z-50 animate-in slide-in-from-top-2 duration-200">
                <div className="flex flex-col p-4 space-y-3">
                  <a
                    href="#how-it-works"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-[#5D5D5D] hover:text-[#8B7355] hover:bg-[#F5EEE6] transition-colors py-2 px-3 rounded-lg"
                  >
                    How It Works
                  </a>
                  <a
                    href="#stories"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-[#5D5D5D] hover:text-[#8B7355] hover:bg-[#F5EEE6] transition-colors py-2 px-3 rounded-lg"
                  >
                    Stories
                  </a>

                  <div className="border-t border-[#E5D5C3] my-2" />

                  {user ? (
                    <div className="flex flex-col gap-2">
                      <Link
                        href="/blogs"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full border-[#8B7355] text-[#8B7355] hover:bg-[#8B7355] hover:text-white"
                        >
                          My Blogs
                        </Button>
                      </Link>
                      <Button
                        onClick={() => {
                          handleSignOut();
                          setIsMobileMenuOpen(false);
                        }}
                        variant="outline"
                        size="sm"
                        className="w-full border-[#8B7355] text-[#8B7355] hover:bg-[#8B7355] hover:text-white"
                      >
                        <LogOut className="mr-2 h-3 w-3" />
                        Sign Out
                      </Button>
                    </div>
                  ) : (
                    <Button
                      onClick={() => {
                        setShowSignInModal(true);
                        setIsMobileMenuOpen(false);
                      }}
                      size="sm"
                      className="w-full bg-[#8B7355] text-white hover:bg-[#7A6348]"
                    >
                      Sign In
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
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
