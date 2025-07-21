"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

// MonarkFX-relevant testimonial data
const testimonials = [
  {
    name: "Aisha Kumar",
    role: "Working Professional",
    content:
      "MonarkFX’s online classes made complex trading strategies easy to understand. I now trade confidently in stocks and forex.",
    rating: 5,
  },
  {
    name: "Vikram Singh",
    role: "Beginner Investor",
    content:
      "The mentorship and real-time market analysis helped me grow my portfolio. Highly recommend for anyone new to trading!",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Student",
    content:
      "The structured curriculum and live sessions gave me a solid foundation in crypto and stock trading. Thank you, MonarkFX!",
    rating: 4.5,
  },
  {
    name: "Rajesh Patel",
    role: "Full-time Trader",
    content:
      "I’ve taken many courses, but MonarkFX stands out for its practical approach and expert guidance.",
    rating: 5,
  },
  {
    name: "Ananya Gupta",
    role: "Day Trader",
    content:
      "The risk management techniques and strategy development frameworks are game-changers. My trading is more consistent now.",
    rating: 5,
  },
  {
    name: "Rahul Mehta",
    role: "Entrepreneur",
    content:
      "Joining MonarkFX was the best decision for my financial future. The online classes fit my busy schedule perfectly.",
    rating: 5,
  },
  {
    name: "Neha D.",
    role: "Aspiring Trader",
    content:
      "From zero to confident trader! The support and community at MonarkFX are amazing.",
    rating: 5,
  },
  {
    name: "Vikas T.",
    role: "Part-time Investor",
    content:
      "The live classes and mentorship helped me understand market trends and make smarter investments.",
    rating: 4.5,
  },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

function renderStars(rating: number) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(
        <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
      );
    } else if (rating >= i - 0.5) {
      stars.push(
        <span key={i} className="relative w-5 h-5 inline-block">
          <Star
            className="w-5 h-5 text-yellow-400 fill-yellow-400 absolute left-0 top-0"
            style={{ clipPath: "inset(0 50% 0 0)" }}
          />
          <Star className="w-5 h-5 text-zinc-700 absolute left-0 top-0" />
        </span>
      );
    } else {
      stars.push(<Star key={i} className="w-5 h-5 text-zinc-700" />);
    }
  }
  return <div className="flex items-center gap-1 mt-2 mb-2">{stars}</div>;
}

function getSlidesPerView() {
  if (typeof window === "undefined") return 1;
  if (window.innerWidth >= 1024) return 3;
  if (window.innerWidth >= 640) return 2;
  return 1;
}

export default function TestimonialCarousel() {
  // Always render 1 on server, update on client
  const [slidesPerView, setSlidesPerView] = React.useState(1);
  const [current, setCurrent] = useState(0);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    function handleResize() {
      setSlidesPerView(getSlidesPerView());
    }
    setSlidesPerView(getSlidesPerView());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalSlides = Math.ceil(testimonials.length / slidesPerView);

  const goPrev = () =>
    setCurrent((prev) => (prev - 1 + totalSlides) % totalSlides);
  const goNext = () => setCurrent((prev) => (prev + 1) % totalSlides);

  // Only calculate visible after mounted (client)
  let visible: typeof testimonials = [];
  if (mounted) {
    const start = current * slidesPerView;
    const end = start + slidesPerView;
    visible = testimonials.slice(start, end);
    while (visible.length < slidesPerView) {
      visible.push(testimonials[visible.length % testimonials.length]);
    }
  } else {
    visible = testimonials.slice(0, 1);
  }

  return (
    <div className="w-full bg-black py-12 px-2 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight uppercase">
            What Our Customers Say
          </h2>
          <div className="flex gap-2">
            <button
              aria-label="Previous"
              onClick={goPrev}
              className="p-2 rounded-full bg-zinc-900 border border-green-700 shadow hover:bg-green-700 transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-green-400" />
            </button>
            <button
              aria-label="Next"
              onClick={goNext}
              className="p-2 rounded-full bg-zinc-900 border border-green-700 shadow hover:bg-green-700 transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-green-400" />
            </button>
          </div>
        </div>
        <div className={`grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`}>
          {visible.map((t, i) => (
            <div
              key={t.name + i}
              className="bg-zinc-900 rounded-2xl shadow-md p-8 flex flex-col h-full border border-zinc-800 hover:border-green-500 transition-colors duration-200"
            >
              <div className="flex items-center gap-4 mb-2">
                <div className="w-14 h-14 rounded-full bg-green-600 flex items-center justify-center text-2xl font-bold text-white">
                  {getInitials(t.name)}
                </div>
                <div>
                  <div className="font-bold text-white text-lg">{t.name}</div>
                  <div className="text-zinc-300 text-sm">{t.role}</div>
                  <div className="flex items-center gap-1 mt-1">
                    <svg
                      className="w-4 h-4 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-green-400 text-sm font-medium">
                      Verified customer
                    </span>
                  </div>
                </div>
              </div>
              {renderStars(t.rating)}
              <div className="text-zinc-200 text-base mt-2 italic">
                “{t.content}”
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
