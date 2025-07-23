"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Headtext from "./head-text";

interface Category {
  id: string;
  name: string;
}

const HomeCategoryGrid: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/category`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.data || []);
        setLoading(false);
      });
  }, []);

  return (
    <section className="relative py-16 px-2  bg-gradient-to-b from-black via-black to-green-950 overflow-hidden">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, #888888 1px, transparent 1px), linear-gradient(to bottom, #888888 1px, transparent 1px)",
          backgroundSize: "200px 200px",
        }}
      />
      <div className="max-w-6xl mx-auto relative z-10 ">
        <div className="mb-10 text-center">
          <Headtext text="Explore Categories" className="mb-2" />
          <p className="text-zinc-300 text-base max-w-2xl mx-auto my-6">
            Find courses by category and start your trading journey with
            MonarkFX.
          </p>
        </div>
        {loading ? (
          <div className="text-zinc-300 text-center">Loading...</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.id}`}
                className="group block rounded-xl bg-black border border-zinc-800 shadow-sm hover:shadow-lg p-5 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="w-12 h-12 rounded-full bg-green-900 flex items-center justify-center mb-3 text-green-600 text-xl font-bold shadow-sm">
                    {cat.name.charAt(0)}
                  </div>
                  <span className="text-base font-semibold text-zinc-300 group-hover:text-green-600 transition-colors text-center">
                    {cat.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default HomeCategoryGrid;
