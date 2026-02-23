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
      <header className="w-full z-50 flex justify-between items-center px-4 md:px-6 lg:px-12 py-4 md:py-5 bg-white/80 backdrop-blur-xl border-b border-neutral-200/50 shrink-0 sticky top-0">
        <h1
          onClick={() => router.push("/")}
          className="text-2xl md:text-3xl font-extrabold cursor-pointer tracking-tight text-neutral-900 flex items-center gap-1 hover:opacity-80 transition-opacity"
        >
          Solana<span className="text-orange-500">care</span>
        </h1>

        <div className="flex gap-4 items-center">
          <button
            onClick={() => router.push("/hiring")}
            className="hidden sm:block px-5 py-2.5 rounded-full border border-neutral-200 text-neutral-700 text-sm font-semibold hover:bg-neutral-100 hover:border-neutral-300 transition-all shadow-sm bg-white"
          >
            We're hiring
          </button>

          <div className="relative" ref={langMenuRef}>
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="border border-neutral-200 px-4 py-2.5 rounded-full flex items-center gap-2.5 hover:bg-neutral-100 text-sm font-semibold transition-all shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20"
            >
              <img src={`https://flagcdn.com/${activeLang.countryCode}.svg`} alt={activeLang.name} className="w-4 h-auto rounded-sm object-cover shadow-[0_0_2px_rgba(0,0,0,0.2)]" />
              {activeLang.code}
              <span className={`text-xs transition-transform duration-300 ${langOpen ? 'rotate-180' : ''}`}>▾</span>
            </button>

            {langOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-3 bg-white/90 backdrop-blur-xl shadow-2xl rounded-2xl overflow-hidden text-sm w-48 z-50 border border-neutral-200/60"
              >
                <div className="p-1.5">
                  {languages.map((l) => (
                    <div
                      key={l.code}
                      onClick={() => {
                        setActiveLang(l);
                        setLangOpen(false);
                      }}
                      className={`px-4 py-2.5 rounded-xl cursor-pointer flex items-center gap-3 transition-all ${activeLang.code === l.code ? 'bg-orange-50/80 text-orange-700' : 'hover:bg-neutral-100 text-neutral-700'}`}
                    >
                      <img src={`https://flagcdn.com/${l.countryCode}.svg`} alt={l.name} className="w-5 h-auto rounded-sm object-cover shadow-[0_0_2px_rgba(0,0,0,0.2)]" />
                      <span className="font-semibold">{l.name}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
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

          <div className="absolute inset-0 p-8 lg:p-14 flex flex-col justify-end z-10">
            <div className={`transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${activeCard === "customers" ? 'translate-y-0' : 'translate-y-24 group-hover:translate-y-0'}`}>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight drop-shadow-md">For Customers</h2>
              <p className="text-white/90 text-lg lg:text-xl mb-10 font-medium max-w-md drop-shadow-sm">Find and book the best Hair & Beauty salons in your area.</p>

              <div className={`grid grid-cols-2 gap-2 transition-opacity duration-500 delay-150 relative ${activeCard === "customers" ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                {countries.map((c) => (
                  <button
                    key={c.code}
                    onClick={(e) => { e.stopPropagation(); handleSelect("customers"); }}
                    className="bg-white/10 backdrop-blur-xl hover:bg-white/20 text-white border border-white/20 hover:border-white/40 shadow-xl rounded-xl py-2 px-3 flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl text-left overflow-hidden relative group/btn"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-[100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                    <img src={`https://flagcdn.com/${c.countryCode}.svg`} alt={c.name} className="w-5 h-auto rounded-[2px] object-cover shadow-[0_1px_4px_rgba(0,0,0,0.3)] relative z-10" />
                    <div className="flex flex-col relative z-10">
                      <span className="text-[10px] text-white/70 font-bold uppercase tracking-wider">{c.code}</span>
                      <span className="font-bold text-sm leading-tight truncate">{c.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
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

          <div className="absolute inset-0 p-8 lg:p-14 flex flex-col justify-end z-10">
            <div className={`transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${activeCard === "professionals" ? 'translate-y-0' : 'translate-y-24 group-hover:translate-y-0'}`}>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight drop-shadow-md">For Professionals</h2>
              <p className="text-white/90 text-lg lg:text-xl mb-10 font-medium max-w-md drop-shadow-sm">The Salon Software for all Hair & Beauty Professionals.</p>

              <div className={`grid grid-cols-2 gap-2 transition-opacity duration-500 delay-150 relative ${activeCard === "professionals" ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                {countries.map((c) => (
                  <button
                    key={c.code}
                    onClick={(e) => { e.stopPropagation(); handleSelect("professionals"); }}
                    className="bg-white/10 backdrop-blur-xl hover:bg-white/20 text-white border border-white/20 hover:border-white/40 shadow-xl rounded-xl py-2 px-3 flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl text-left overflow-hidden relative group/btn"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-[100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                    <img src={`https://flagcdn.com/${c.countryCode}.svg`} alt={c.name} className="w-5 h-auto rounded-[2px] object-cover shadow-[0_1px_4px_rgba(0,0,0,0.3)] relative z-10" />
                    <div className="flex flex-col relative z-10">
                      <span className="text-[10px] text-white/70 font-bold uppercase tracking-wider">{c.code}</span>
                      <span className="font-bold text-sm leading-tight truncate">{c.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
