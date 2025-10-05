import Navigation from "@/components/landing/Navigation";
import Hero from "@/components/landing/Hero";
import ProblemStatement from "@/components/landing/ProblemStatement";
import HowItWorks from "@/components/landing/HowItWorks";
import ExampleStories from "@/components/landing/ExampleStories";
// import Features from '@/components/landing/Features';
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <ProblemStatement />
      <HowItWorks />
      <ExampleStories />
      {/* <Features /> */}
      <CTASection />
      <Footer />
    </div>
  );
}
