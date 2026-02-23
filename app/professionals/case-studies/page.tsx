"use client";

import { useState, useEffect } from "react";
import ProNavbar from "../../../components/ProNavbar";
import ProFooter from "../../../components/ProFooter";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { caseStudies, CaseStudy } from "./data";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CaseStudiesPage() {
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // Auto-slide logic
    useEffect(() => {
        if (isHovered) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % caseStudies.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [isHovered]);

    const handleNext = () => setCurrentIndex((prev) => (prev + 1) % caseStudies.length);
    const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + caseStudies.length) % caseStudies.length);

    // Tabs logic
    type CategoryTab = "Hairdresser & Barbershops" | "Beauty & Wellness";
    const [activeTab, setActiveTab] = useState<CategoryTab>("Hairdresser & Barbershops");

    const filteredStudies = caseStudies.filter(study => study.category === activeTab);
    const currentHeroStudy = caseStudies[currentIndex];

    return (
        <main className="min-h-screen bg-[#fbfaf9] font-sans selection:bg-[#f88863] selection:text-white pb-32">
            <ProNavbar />

            {/* HERO CAROUSEL SECTION */}
            <section className="pt-32 pb-24 px-4 overflow-hidden relative">
                <div className="text-center max-w-3xl mx-auto mb-16 relative z-20">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#3a4454] tracking-tight mb-6"
                    >
                        They <span className="text-[#6bc4bb] underline decoration-4 underline-offset-8">trust and love</span> working with us
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-lg text-neutral-600 font-bold max-w-2xl mx-auto mb-3"
                    >
                        What our community is saying:
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-[17px] text-neutral-500 font-medium max-w-2xl mx-auto mb-10"
                    >
                        Discover the testimonials of professionals who have chosen Salonacare to simplify their daily lives and allow them to focus on what's most important - their customers.
                    </motion.p>
                    <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        onClick={() => router.push("/professionals/book-demo")}
                        className="bg-[#f88863] hover:bg-[#e67551] text-white font-extrabold text-sm tracking-wider py-4 px-10 rounded-xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
                    >
                        DISCOVER FOR FREE
                    </motion.button>
                </div>

                {/* The Carousel */}
                <div
                    className="max-w-[1200px] mx-auto relative h-[500px] md:h-[600px] z-10"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Abstract background gradient bar */}
                    <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-40 md:h-64 bg-gradient-to-r from-[#f0a68d] via-[#f88863] to-[#f17ca3] z-0" />

                    <div className="absolute inset-0 flex items-center justify-center z-10 px-8 md:px-20">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                className="w-full flex flex-col md:flex-row items-center gap-0 md:-gap-8" // Negative gap to overlap slightly
                            >
                                {/* Quote Box */}
                                <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl p-8 md:p-12 w-full md:w-[50%] z-20 relative transform translate-y-10 md:translate-y-0 md:translate-x-12">
                                    <div className="absolute top-4 right-8 text-6xl text-[#6bc4bb] opacity-20 font-serif font-black leading-none">”</div>
                                    <h3 className="text-xl md:text-2xl font-bold text-[#3a4454] leading-snug mb-8 relative z-10 pr-4">
                                        "{currentHeroStudy.heroQuote}"
                                    </h3>
                                    <div className="flex items-center gap-4 mb-8">
                                        <img src={currentHeroStudy.profilePic} alt={currentHeroStudy.name} className="w-12 h-12 rounded-full object-cover border-2 border-neutral-100" />
                                        <div>
                                            <p className="font-bold text-[#3a4454] text-sm">{currentHeroStudy.name}</p>
                                            <p className="text-neutral-500 text-xs font-medium">Owner of {currentHeroStudy.salonName}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => router.push(`/professionals/case-studies/${currentHeroStudy.slug}`)}
                                        className="text-[#f88863] font-bold text-sm tracking-widest uppercase hover:underline decoration-2 underline-offset-4 flex items-center gap-2"
                                    >
                                        LEARN MORE <ArrowRight size={16} />
                                    </button>
                                </div>

                                {/* Image Box */}
                                <div className="w-full md:w-[60%] h-[300px] md:h-[450px] rounded-2xl md:rounded-3xl shadow-xl overflow-hidden z-10 hidden md:block border-8 border-white">
                                    <img
                                        src={currentHeroStudy.image}
                                        alt={currentHeroStudy.salonName}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation controls */}
                    <button
                        onClick={handlePrev}
                        className="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-neutral-600 hover:text-[#f88863] transition-colors z-30"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={handleNext}
                        className="absolute right-0 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-neutral-600 hover:text-[#f88863] transition-colors z-30"
                    >
                        <ChevronRight size={24} />
                    </button>

                    {/* Pagination dots */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2 z-30">
                        {caseStudies.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentIndex(i)}
                                className={`w-2 h-2 rounded-full transition-all ${i === currentIndex ? "bg-[#3a4454] w-4" : "bg-neutral-300 hover:bg-neutral-400"}`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* TABBED GRID SECTION */}
            <section className="py-24 bg-[#f2ecdf]/30 relative rounded-t-[4rem]">
                <div className="max-w-[1200px] mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-[#3a4454] tracking-tight mb-4">
                        What Salonacare has <span className="text-[#6bc4bb] underline decoration-4 underline-offset-8">changed for them</span>
                    </h2>
                    <p className="text-neutral-500 font-medium mb-16 max-w-xl mx-auto">
                        Discover real-world testimonials from salons who've been transformed by Salonacare's support team and platform.
                    </p>

                    {/* Tabs Navigation */}
                    <div className="flex justify-center border-b border-neutral-200 mb-12 max-w-[800px] mx-auto">
                        <button
                            onClick={() => setActiveTab("Hairdresser & Barbershops")}
                            className={`flex-1 py-4 text-sm font-bold tracking-widest uppercase transition-all ${activeTab === "Hairdresser & Barbershops"
                                ? "text-[#f88863] border-b-2 border-[#f88863]"
                                : "text-neutral-500 hover:text-neutral-800"
                                }`}
                        >
                            Hairdresser & Barbershops
                        </button>
                        <button
                            onClick={() => setActiveTab("Beauty & Wellness")}
                            className={`flex-1 py-4 text-sm font-bold tracking-widest uppercase transition-all ${activeTab === "Beauty & Wellness"
                                ? "text-[#f88863] border-b-2 border-[#f88863]"
                                : "text-neutral-500 hover:text-neutral-800"
                                }`}
                        >
                            Beauty & Wellness
                        </button>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
                        <AnimatePresence mode="popLayout">
                            {filteredStudies.map((study, idx) => (
                                <motion.div
                                    key={study.slug}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                                    className="bg-white rounded-2xl border border-neutral-100 shadow-[0_10px_20px_rgba(0,0,0,0.03)] overflow-hidden flex flex-col hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all transform hover:-translate-y-1 block"
                                >
                                    <Link href={`/professionals/case-studies/${study.slug}`} className="flex flex-col h-full w-full">
                                        <div className="h-[200px] w-full overflow-hidden shrink-0">
                                            <img src={study.image} alt={study.salonName} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                                        </div>
                                        <div className="p-6 flex-1 flex flex-col">
                                            <h3 className="font-bold text-[#3a4454] leading-tight mb-1">{study.name}</h3>
                                            <p className="font-bold text-[#f88863] text-sm mb-4">{study.salonName}</p>
                                            <p className="text-neutral-500 text-sm font-medium leading-relaxed mb-6 flex-1 line-clamp-4">
                                                "{study.shortQuote}"
                                            </p>
                                            <div className="mt-auto">
                                                <span className="text-[#f88863] font-bold text-[11px] tracking-widest uppercase hover:underline decoration-2 underline-offset-4 flex items-center gap-1">
                                                    LEARN MORE <ArrowRight size={14} />
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                </div>
            </section>

        </main>
    );
}
