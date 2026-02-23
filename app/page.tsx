"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

type Country = {
  name: string;
  code: string;
  countryCode: string;
};

const countries: Country[] = [
  { name: "Luxembourg", code: "LU", countryCode: "lu" },
  { name: "Belgium", code: "BE", countryCode: "be" },
  { name: "Switzerland", code: "CH", countryCode: "ch" },
  { name: "Netherlands", code: "NL", countryCode: "nl" },
];

const languages = [
  { code: "EN", name: "English", countryCode: "gb" },
  { code: "FR", name: "Français", countryCode: "fr" },
  { code: "DE", name: "Deutsch", countryCode: "de" },
  { code: "NL", name: "Nederlands", countryCode: "nl" },
];

export default function Home() {
  const router = useRouter();
  const [langOpen, setLangOpen] = useState(false);
  const [activeLang, setActiveLang] = useState(languages[0]);
  const [activeCard, setActiveCard] = useState<"customers" | "professionals" | null>(null);
  const langMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleSelect = (type: "customers" | "professionals") => {
    setTimeout(() => router.push(`/${type}`), 200);
  };

  return (
    <main className="min-h-screen bg-neutral-50 relative flex flex-col font-sans">
      {/* HEADER */}
      <header className="w-full z-50 flex justify-between items-center px-6 lg:px-12 py-5 bg-white border-b border-neutral-100 shrink-0 sticky top-0 h-20">
        <h1
          onClick={() => router.push("/")}
          className="text-2xl md:text-3xl font-extrabold cursor-pointer tracking-tight text-neutral-900 flex items-center gap-1"
        >
          Solana<span className="text-orange-500">care</span>
        </h1>

        <div className="flex gap-4 items-center">
          <button
            onClick={() => router.push("/hiring")}
            className="hidden lg:block px-5 py-2.5 rounded-full border border-neutral-200 text-neutral-700 text-sm font-semibold hover:bg-neutral-100 hover:border-neutral-300 transition-all bg-white"
          >
            We're hiring
          </button>

          <div className="hidden lg:relative" ref={langMenuRef}>
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="border border-neutral-200 px-4 py-2.5 rounded-full flex items-center gap-2.5 hover:bg-neutral-100 text-sm font-semibold transition-all bg-white"
            >
              <img src={`https://flagcdn.com/${activeLang.countryCode}.svg`} alt={activeLang.name} className="w-4 h-auto rounded-sm" />
              {activeLang.code}
            </button>
          </div>

          <button className="p-2 text-neutral-700">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </header>

      {/* HERO GRID */}
      <section className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 p-4 lg:p-8 min-h-0 bg-neutral-50 mb-20 lg:mb-0">
        {/* CUSTOMER CARD */}
        <motion.div
          onClick={() => setActiveCard(activeCard === "customers" ? null : "customers")}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative rounded-[2.5rem] overflow-hidden bg-neutral-900 group cursor-pointer h-full shadow-lg hover:shadow-2xl transition-all duration-500"
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] ease-out group-hover:scale-[1.05]"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=2000')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/40 to-black/20 transition-opacity duration-500 group-hover:opacity-90" />

          <div className="absolute inset-0 p-8 lg:p-14 flex flex-col items-center justify-center text-center z-10">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-6 tracking-tight drop-shadow-lg">For Customers</h2>
            <p className="text-white/90 text-lg lg:text-xl mb-12 font-medium max-w-sm drop-shadow-md">Find and book the best Hair & Beauty salons in your area.</p>

            <button
              onClick={(e) => { e.stopPropagation(); handleSelect("customers"); }}
              className="px-10 py-4 border-2 border-white text-white rounded-2xl font-bold text-xl hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm"
            >
              Find & Book
            </button>
          </div>
        </motion.div>

        {/* PROFESSIONAL CARD */}
        <motion.div
          onClick={() => setActiveCard(activeCard === "professionals" ? null : "professionals")}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="relative rounded-[2.5rem] overflow-hidden bg-neutral-900 group cursor-pointer h-full shadow-lg hover:shadow-2xl transition-all duration-500"
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] ease-out group-hover:scale-[1.05]"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2000')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/40 to-black/20 transition-opacity duration-500 group-hover:opacity-90" />

          <div className="absolute inset-0 p-8 lg:p-14 flex flex-col items-center justify-center text-center z-10">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-6 tracking-tight drop-shadow-lg">For Professionals</h2>
            <p className="text-white/90 text-lg lg:text-xl mb-12 font-medium max-w-sm drop-shadow-md">The Salon Software for all Hair & Beauty Professionals.</p>

            <button
              onClick={(e) => { e.stopPropagation(); handleSelect("professionals"); }}
              className="px-10 py-4 border-2 border-white text-white rounded-2xl font-bold text-xl hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm"
            >
              Explore the application
            </button>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
