"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import {
  useScrollAnimation,
  useStaggeredAnimation,
} from "@/hooks/useScrollAnimation";

export default function ExampleStories() {
  const [activeStory, setActiveStory] = useState(0);
  const { elementRef: headerRef, isVisible: headerVisible } =
    useScrollAnimation();
  const { elementRef: storyRef, isVisible: storyVisible } = useScrollAnimation({
    threshold: 0.2,
  });
  const { elementRef: galleryRef, visibleItems: visibleCards } =
    useStaggeredAnimation(3, 150);
  const activeStoryCardRef = useRef<HTMLDivElement>(null);

  // Page flip animation when changing stories
  useEffect(() => {
    if (activeStoryCardRef.current) {
      gsap.fromTo(
        activeStoryCardRef.current,
        { rotateY: 90, opacity: 0, scale: 0.9 },
        {
          rotateY: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: "back.out(1.7)",
        }
      );
    }
  }, [activeStory]);

  const stories = [
    {
      title: "The White Farmhouse",
      excerpt:
        "I grew up in a small farming town in Iowa. Our white farmhouse had a wraparound porch where we'd sit on summer evenings, watching the cornfields sway in the breeze. The smell of fresh-baked bread would drift through the screen door...",
      author: "Grandma Rose",
      age: 87,
      theme: "Childhood Memories",
      color: "from-[#E8B4A0] to-[#d9a391]",
      icon: "🏡",
    },
    {
      title: "Dancing Through the War",
      excerpt:
        "It was 1944 at the USO dance. I was nervous, standing by the punch bowl in my best dress. Then I saw him—tall, handsome in his uniform, with the kindest smile. He asked me to dance, and I haven't stopped dancing with him since...",
      author: "Grandma Margaret",
      age: 95,
      theme: "Love Story",
      color: "from-[#A8B89F] to-[#96a58d]",
      icon: "💕",
    },
    {
      title: "The Corner Store Legacy",
      excerpt:
        "My father opened that corner store in 1952 with nothing but determination and a handshake loan. Every morning at 5 AM, we'd unlock those doors. The neighborhood kids would come for penny candy, and I'd teach them about honesty and hard work...",
      author: "Grandpa Joe",
      age: 89,
      theme: "Career & Purpose",
      color: "from-[#D4AF37] to-[#c29e2f]",
      icon: "🏪",
    },
  ];

  return (
    <section
      id="stories"
      className="py-24 bg-gradient-to-br from-[#8B7355]/10 via-[#FFF8F0] to-[#A8B89F]/10 relative overflow-hidden"
    >
      {/* Decorative SVG Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="story-pattern"
              x="0"
              y="0"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="50" cy="50" r="2" fill="#8B7355" />
              <circle cx="25" cy="75" r="1.5" fill="#A8B89F" />
              <circle cx="75" cy="25" r="1.5" fill="#D4AF37" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#story-pattern)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`text-center mb-20 space-y-4 memory-fade-up ${
            headerVisible ? "visible" : ""
          }`}
        >
          <h2 className="text-5xl lg:text-6xl font-serif font-bold text-[#3E2723]">
            Stories Worth Preserving
          </h2>
          <p className="text-xl text-[#5D5D5D] max-w-2xl mx-auto">
            Real conversations transformed into timeless memories
          </p>
        </div>

        {/* Story Selector Tabs */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {stories.map((story, index) => (
            <button
              key={index}
              onClick={() => setActiveStory(index)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeStory === index
                  ? "bg-[#8B7355] text-white shadow-lg scale-105"
                  : "bg-white text-[#5D5D5D] hover:bg-[#F5EEE6] border border-[#E5D5C3]"
              }`}
            >
              <span className="mr-2">{story.icon}</span>
              {story.theme}
            </button>
          ))}
        </div>

        {/* Featured Story */}
        <div
          ref={storyRef}
          className={`max-w-4xl mx-auto mb-16 memory-bloom ${
            storyVisible ? "visible" : ""
          }`}
          style={{ perspective: "1500px" }}
        >
          <Card
            ref={activeStoryCardRef}
            className="bg-white border-4 border-[#8B7355]/20 shadow-2xl overflow-hidden hover:shadow-3xl transition-shadow duration-500"
          >
            {/* Story Header with Gradient */}
            <div
              className={`bg-gradient-to-r ${stories[activeStory].color} p-8 text-white`}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="text-6xl mb-4">
                    {stories[activeStory].icon}
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-serif font-bold">
                    {stories[activeStory].title}
                  </h3>
                  <p className="text-white/90">{stories[activeStory].theme}</p>
                </div>
                <div className="text-right">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                    <span className="text-sm font-medium">
                      {stories[activeStory].age} years young
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Story Content */}
            <div className="p-8 lg:p-12 space-y-6">
              {/* Opening Quote */}
              <div className="flex items-start gap-4">
                <svg
                  className="w-12 h-12 text-[#D4AF37] flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-xl lg:text-2xl text-[#3E2723] leading-relaxed font-serif italic">
                  {stories[activeStory].excerpt}
                </p>
              </div>

              {/* Attribution */}
              <div className="flex items-center justify-between pt-6 border-t-2 border-[#E5D5C3]">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#8B7355] to-[#D4AF37] flex items-center justify-center text-2xl shadow-lg">
                    👵🏻
                  </div>
                  <div>
                    <div className="font-serif font-bold text-lg text-[#3E2723]">
                      {stories[activeStory].author}
                    </div>
                    <div className="text-sm text-[#5D5D5D]">
                      Captured December 2024
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="border-2 border-[#8B7355] text-[#8B7355] hover:bg-[#8B7355] hover:text-white"
                >
                  Read Full Story →
                </Button>
              </div>
            </div>

            {/* Decorative Corner Elements */}
            <div className="absolute top-0 right-0 w-24 h-24 opacity-10 pointer-events-none">
              <svg
                viewBox="0 0 100 100"
                fill="currentColor"
                className="text-white"
              >
                <circle cx="80" cy="20" r="15" />
                <circle cx="65" cy="35" r="10" />
              </svg>
            </div>
          </Card>
        </div>

        {/* Story Gallery Grid */}
        <div
          ref={galleryRef}
          className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {stories.map((story, index) => (
            <Card
              key={index}
              onClick={() => setActiveStory(index)}
              className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 memory-float-in ${
                visibleCards.has(index) ? "visible" : ""
              } ${
                activeStory === index
                  ? "ring-4 ring-[#8B7355] shadow-2xl"
                  : "bg-white border border-[#E5D5C3]"
              }`}
            >
              <div className={`h-2 bg-gradient-to-r ${story.color}`} />
              <div className="p-6 space-y-4">
                <div className="text-4xl">{story.icon}</div>
                <h4 className="font-serif font-bold text-xl text-[#3E2723]">
                  {story.title}
                </h4>
                <p className="text-sm text-[#5D5D5D] line-clamp-3">
                  {story.excerpt}
                </p>
                <div className="flex items-center justify-between pt-2 text-sm">
                  <span className="text-[#8B7355] font-medium">
                    {story.author}
                  </span>
                  <span className="text-[#9E9E8E]">{story.age}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Additional Value Props */}
      <div className="mt-12 md:mt-20 max-w-4xl mx-auto flex flex-col md:flex-row justify-center items-center gap-12 md:gap-20 lg:gap-40 px-6">
        <div
          className="space-y-2 animate-fade-in text-center"
          style={{ animationDelay: "0.8s" }}
        >
          <div className="text-3xl md:text-4xl font-serif font-bold text-[#8B7355]">
            30s
          </div>
          <div className="text-sm md:text-base text-[#5D5D5D]">
            To get started
          </div>
        </div>
        <div
          className="space-y-2 animate-fade-in text-center"
          style={{ animationDelay: "1s" }}
        >
          <div className="text-3xl md:text-4xl font-serif font-bold text-[#8B7355]">
            ∞
          </div>
          <div className="text-sm md:text-base text-[#5D5D5D]">
            Memories preserved
          </div>
        </div>
      </div>

      {/* Fade Transition to Next Section */}
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-[#A8B89F]/0 via-[#FFF8F0]/30 via-[#FEFEFE]/70 to-white pointer-events-none" />
    </section>
  );
}
