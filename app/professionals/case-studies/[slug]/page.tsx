"use client";

import ProNavbar from "../../../../components/ProNavbar";
import ProFooter from "../../../../components/ProFooter";
import { motion, AnimatePresence } from "framer-motion";
import { caseStudies } from "../data";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function IndividualCaseStudyPage({ params }: { params: { slug: string } }) {
    const { slug } = params;
    const study = caseStudies.find(s => s.slug === slug);

    // Q&A accordion state
    const [openIndex, setOpenIndex] = useState<number>(0);

    if (!study) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-[#fbfaf9]">
                <h1 className="text-3xl font-bold text-[#3a4454]">Case Study Not Found</h1>
            </main>
        );
    }

    const toggleAccordion = (index: number) => {
        setOpenIndex(prev => prev === index ? -1 : index);
    };

    return (
        <main className="min-h-screen bg-[#fbfaf9] font-sans selection:bg-[#f88863] selection:text-white pb-32">
            <ProNavbar />

            {/* HERO QUOTE */}
            <section className="pt-40 pb-16 px-6 max-w-[1000px] mx-auto text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-5xl lg:text-[54px] font-extrabold text-[#3a4454] tracking-tight leading-tight mb-4"
                >
                    {study.heroTextStart && <span>{study.heroTextStart} </span>}
                    {study.heroHighlight ? (
                        <span className="text-[#6bc4bb] underline decoration-4 underline-offset-8 bg-[#e9f5f3] px-1">{study.heroHighlight}</span>
                    ) : (
                        <span className="text-[#6bc4bb] underline decoration-4 underline-offset-8">thanks to Salonacare.</span>
                    )}
                    {study.heroTextEnd && <span> {study.heroTextEnd}</span>}
                    {!study.heroTextStart && !study.heroHighlight && !study.heroTextEnd && (
                        <>
                            {study.heroQuote.replace(study.salonName, "").trim()}{" "}
                            <span className="text-[#6bc4bb] underline decoration-4 underline-offset-8">thanks to Salonacare.</span>
                        </>
                    )}
                </motion.h1>
            </section>

            {/* DETAILS AND IMAGE SPLIT */}
            <section className="max-w-[1200px] mx-auto px-6 mb-24 flex flex-col md:flex-row gap-16 items-start">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-full md:w-1/2"
                >
                    <div className="flex justify-between items-start mb-8 border-b border-neutral-200 pb-6">
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight text-[#3a4454]">{study.salonName}</h2>
                            <p className="text-[#6bc4bb] font-medium text-sm tracking-wide mt-1">{study.category}</p>
                        </div>
                        <span className="text-[#4b6dcb] text-xs font-bold tracking-wider uppercase border border-[#d6e3ff] bg-[#f0f5ff] px-3 py-1 rounded-full whitespace-nowrap">
                            {study.badge}
                        </span>
                    </div>

                    <p className="text-neutral-500 font-medium leading-relaxed mb-10 text-[17px]">
                        {study.introText}
                    </p>

                    <div className="flex items-center gap-4">
                        <img src={study.profilePic} alt={study.name} className="w-16 h-16 rounded-full object-cover shadow-md" />
                        <div>
                            <p className="font-bold text-[#3a4454] text-lg">{study.name}</p>
                            <p className="text-[#f88863] text-sm font-bold">Owner of {study.salonName}</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="w-full md:w-1/2"
                >
                    <div className="rounded-[2.5rem] overflow-hidden shadow-2xl relative aspect-[4/3] w-full">
                        <img src={study.image} alt={study.salonName} className="w-full h-full object-cover" />
                    </div>
                </motion.div>
            </section>

            {/* STATS STRIP */}
            <section className="max-w-[1200px] mx-auto px-6 mb-32 border-t border-neutral-200 pt-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                        <p className="text-[#3a4454] font-bold mb-2">Joined Salonacare</p>
                        <p className="text-7xl font-extrabold text-[#e2a893]">{study.stats.joined}</p>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
                        <p className="text-[#3a4454] font-bold mb-2">Staff members</p>
                        <p className="text-7xl font-extrabold text-[#e2a893]">{study.stats.employees}</p>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
                        <p className="text-[#3a4454] font-bold mb-2">Years of experience</p>
                        <p className="text-7xl font-extrabold text-[#e2a893]">{study.stats.experience}</p>
                    </motion.div>
                </div>
            </section>

            {/* MID QUOTE BLOCK */}
            <section className="max-w-[1200px] mx-auto px-6 mb-32">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="bg-[#f2ecdf]/50 rounded-[3rem] py-20 px-8 text-center relative max-w-[1000px] mx-auto"
                >
                    <div className="absolute top-10 left-10 text-[120px] text-[#6bc4bb] opacity-20 font-serif font-black leading-none">”</div>
                    <div className="relative z-10 max-w-3xl mx-auto">
                        <p className="text-3xl md:text-4xl lg:text-[42px] font-extrabold text-[#3a4454] leading-tight mb-8">
                            With Salonacare, things have become much easier: We <span className="underline decoration-[#7cbfa2] decoration-4 underline-offset-8">no longer have to</span> worry about the administrative burden.
                        </p>
                        <p className="font-bold text-[#3a4454] text-[15px]">{study.name}</p>
                        <p className="font-medium text-neutral-500 text-sm">Owner of {study.salonName}</p>
                    </div>
                </motion.div>
            </section>

            {/* Q&A ACCORDION SECTION */}
            <section className="max-w-[1000px] mx-auto px-6 mb-24 relative">
                <div className="absolute top-0 -left-6 md:-left-20 text-[180px] text-[#e0efec] font-black leading-none z-0 tracking-tighter opacity-70 hidden md:block select-none pointer-events-none">
                    Q&A
                </div>

                <div className="relative z-10 bg-white/60 backdrop-blur-xl rounded-3xl p-6 md:p-12 border border-neutral-100 shadow-[0_20px_40px_rgba(0,0,0,0.02)]">
                    {study.qna.map((item, idx) => (
                        <div key={idx} className="border-b border-neutral-200 last:border-b-0">
                            <button
                                onClick={() => toggleAccordion(idx)}
                                className="w-full flex items-center justify-between py-6 text-left group"
                            >
                                <h3 className="text-[#3a4454] font-bold text-lg md:text-xl pr-8 group-hover:text-[#f88863] transition-colors">{item.q}</h3>
                                <motion.div
                                    animate={{ rotate: openIndex === idx ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="text-neutral-400 shrink-0"
                                >
                                    <ChevronDown size={20} />
                                </motion.div>
                            </button>
                            <AnimatePresence>
                                {openIndex === idx && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <p className="pb-8 text-neutral-500 text-[17px] leading-relaxed max-w-3xl font-medium">
                                            {item.a}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="bg-white py-24 px-6 text-center border-t border-neutral-100">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-3xl font-extrabold text-[#3a4454] mb-4">Ready to reach the next level?</h2>
                    <p className="text-neutral-500 font-medium mb-8">Join thousands of professionals saving time and growing their business with Salonacare.</p>
                    <a href="/professionals/book-demo" className="inline-block bg-[#f88863] hover:bg-[#e67551] text-white font-extrabold py-4 px-10 rounded-xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1 text-sm tracking-wider uppercase">
                        Book Your Free Demo
                    </a>
                </div>
            </section>

            <ProFooter />
        </main>
    );
}
