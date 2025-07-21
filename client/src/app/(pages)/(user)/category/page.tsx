"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

interface Category {
  id: string;
  name: string;
}

export default function CategoryListPage() {
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
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-green-950 py-16 px-4 relative">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, #22c55e15 1px, transparent 1px), linear-gradient(to bottom, #22c55e15 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="max-w-5xl mx-auto relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-10 text-white text-center tracking-tight">
          <span className="bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
            Browse Categories
          </span>
        </h1>
        {loading ? (
          <div className="text-zinc-300 text-center">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.id}`}
                className="block bg-gradient-to-br from-zinc-900/80 to-black/80 border border-green-700 rounded-2xl p-10 text-white hover:border-green-400 hover:bg-green-950 transition-all shadow-xl group"
              >
                <div className="text-2xl font-semibold group-hover:text-green-400 transition-colors mb-2 text-center">
                  {cat.name}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
