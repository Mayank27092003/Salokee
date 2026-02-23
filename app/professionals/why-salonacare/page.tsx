"use client";

import ProNavbar from "../../../components/ProNavbar";
import ProFooter from "../../../components/ProFooter";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useRouter } from "next/navigation";

const teamPhotos = [
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600",
    "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=600",
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=600",
    "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=600",
    "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=600",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600",
    "https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=600",
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=600",
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600",
    "https://images.unsplash.com/photo-1515169067868-5387ec356754?q=80&w=600",
    "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?q=80&w=600",
    "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=600"
];

export default function WhySalonacarePage() {
    const router = useRouter();
    const { scrollYProgress } = useScroll();
    const timelineRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress: timelineProgress } = useScroll({
        target: timelineRef,
        offset: ["start center", "end center"]
    });

    const timelineHeight = useTransform(timelineProgress, [0, 1], ["0%", "100%"]);

    return (
        <main className="min-h-screen bg-[#fbfaf9] font-sans selection:bg-[#f88863] selection:text-white">
            <ProNavbar />

            {/* HERO SECTION */}
            <section className="relative h-[60vh] lg:h-[70vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2000"
                        alt="Payment Terminal"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
                </div>
                <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-6"
                    >
                        Why Salonacare?
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg md:text-xl text-white/90 font-medium max-w-2xl mx-auto leading-relaxed"
                    >
                        We are building Europe's leading management software for hair and beauty professionals. Join our journey to digitize the industry.
                    </motion.p>
                </div>
            </section>

            {/* TIMELINE SECTION */}
            <section className="py-32 px-6 relative bg-white" ref={timelineRef}>
                <div className="max-w-[1000px] mx-auto relative pb-20">
                    {/* Animated vertical line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-neutral-100 -translate-x-1/2 hidden md:block" />
                    <motion.div
                        className="absolute left-1/2 top-0 w-[2px] bg-[#6bc4bb] -translate-x-1/2 hidden md:block origin-top"
                        style={{ height: timelineHeight }}
                    />

                    <div className="space-y-32 relative z-10">
                        {/* Timeline Item 1 */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-12 w-full">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8 }}
                                className="w-full md:w-[45%] md:text-right"
                            >
                                <div className="bg-white p-8 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.06)] border border-neutral-100">
                                    <div className="text-[#f88863] text-5xl font-extrabold mb-4">1</div>
                                    <h3 className="text-2xl font-bold text-neutral-800 mb-3">The Beginning</h3>
                                    <p className="text-neutral-500 leading-relaxed font-medium">It started with a simple vision: freeing salon owners from administrative headaches so they can focus on their craft and their clients.</p>
                                </div>
                            </motion.div>
                            {/* Center Dot */}
                            <div className="w-4 h-4 rounded-full bg-[#6bc4bb] shadow-[0_0_0_8px_rgba(107,196,187,0.2)] hidden md:block z-10" />
                            <div className="w-full md:w-[45%] opacity-0 md:opacity-100" /> {/* Spacer */}
                        </div>

                        {/* Timeline Item 2 */}
                        <div className="flex flex-col md:flex-row-reverse items-center justify-between gap-12 w-full">
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8 }}
                                className="w-full md:w-[45%] md:text-left"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800"
                                    className="rounded-3xl shadow-xl w-full h-auto object-cover border-[6px] border-white"
                                    alt="Team collaboration"
                                />
                            </motion.div>
                            {/* Center Dot */}
                            <div className="w-4 h-4 rounded-full bg-[#f88863] shadow-[0_0_0_8px_rgba(248,136,99,0.2)] hidden md:block z-10" />
                            <div className="w-full md:w-[45%] md:text-right bg-white p-8 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.06)] border border-neutral-100 md:opacity-100 opacity-0 order-last md:order-none hidden sm:block">
                                <h3 className="text-2xl font-bold text-neutral-800 mb-3">Rapid Expansion</h3>
                                <p className="text-neutral-500 leading-relaxed font-medium">As more salons discovered our platform, our team grew. We expanded across borders, bringing local expertise to every market we serve.</p>
                            </div>
                        </div>

                        {/* Timeline Item 3 */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-12 w-full">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8 }}
                                className="w-full md:w-[45%] md:text-right"
                            >
                                <div className="bg-white p-8 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.06)] border border-neutral-100">
                                    <h3 className="text-2xl font-bold text-neutral-800 mb-3">Continuous Innovation</h3>
                                    <p className="text-neutral-500 leading-relaxed font-medium">We release updates every week, listening closely to user feedback to build the exact tools the industry demands today.</p>
                                </div>
                            </motion.div>
                            {/* Center Dot */}
                            <div className="w-4 h-4 rounded-full bg-[#6bc4bb] shadow-[0_0_0_8px_rgba(107,196,187,0.2)] hidden md:block z-10" />
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8 }}
                                className="w-full md:w-[45%]"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800"
                                    className="rounded-3xl shadow-xl w-full h-auto object-cover border-[6px] border-white"
                                    alt="Coding and development"
                                />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* STATS STRIP */}
            <section className="py-20 bg-[#fbfaf9] border-y border-neutral-200">
                <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        <div className="text-5xl lg:text-7xl font-light text-[#6bc4bb] mb-4">220+</div>
                        <div className="text-lg font-bold text-neutral-800 tracking-wide">TEAM MEMBERS</div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-center"
                    >
                        <div className="text-5xl lg:text-7xl font-light text-[#6bc4bb] mb-4">6</div>
                        <div className="text-lg font-bold text-neutral-800 tracking-wide">COUNTRIES</div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-center"
                    >
                        <div className="text-5xl lg:text-7xl font-light text-[#6bc4bb] mb-4">8</div>
                        <div className="text-lg font-bold text-neutral-800 tracking-wide">OFFICES IN EUROPE</div>
                    </motion.div>
                </div>
            </section>

            {/* VALUES SECTION (Typographic overlay) */}
            <section className="py-32 px-6 bg-white overflow-hidden">
                <div className="max-w-[1200px] mx-auto space-y-32">

                    {/* Value 1 */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="relative flex flex-col md:flex-row items-center md:items-start group"
                    >
                        <h2 className="text-[70px] md:text-[120px] lg:text-[160px] font-black leading-none text-transparent tracking-tighter w-full md:w-auto z-0 select-none transition-colors duration-500 group-hover:text-[#e0eceb]" style={{ WebkitTextStroke: '2px #c1dfdb' }}>
                            AMBITION
                        </h2>
                        <div className="md:absolute right-0 top-1/2 md:-translate-y-1/2 w-full md:w-[400px] bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl z-10 border border-neutral-100 md:opacity-0 md:translate-x-10 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                            <h3 className="text-2xl font-bold text-neutral-800 mb-3">Dream big.</h3>
                            <p className="text-neutral-500 font-medium leading-relaxed">We aim to be the absolute best. We set goals that seem impossible and work backward to achieve them. Complacency is our enemy.</p>
                        </div>
                    </motion.div>

                    {/* Value 2 */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="relative flex flex-col md:flex-row items-center md:items-start justify-end group"
                    >
                        <h2 className="text-[50px] md:text-[90px] lg:text-[130px] font-black leading-none text-transparent tracking-tighter w-full md:w-auto z-0 select-none text-right transition-colors duration-500 group-hover:text-[#ffe4dc]" style={{ WebkitTextStroke: '2px #f88863' }}>
                            A-TEAM & WORKPLACE
                        </h2>
                        <div className="md:absolute left-0 top-1/2 md:-translate-y-1/2 w-full md:w-[400px] bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl z-10 border border-neutral-100 md:opacity-0 md:-translate-x-10 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 mt-6 md:mt-0">
                            <h3 className="text-2xl font-bold text-neutral-800 mb-3">Winning together.</h3>
                            <p className="text-neutral-500 font-medium leading-relaxed">We hire only the best and give them the trust and resources they need to excel. Our environment is demanding but deeply supportive.</p>
                        </div>
                    </motion.div>

                    {/* Value 3 */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="relative flex flex-col md:flex-row items-center md:items-start group"
                    >
                        <h2 className="text-[60px] md:text-[100px] lg:text-[140px] font-black leading-none text-transparent tracking-tighter w-full md:w-auto z-0 select-none transition-colors duration-500 group-hover:text-[#e0eceb]" style={{ WebkitTextStroke: '2px #c1dfdb' }}>
                            HUMBLE & CURIOUS
                        </h2>
                        <div className="md:absolute right-0 top-1/2 md:-translate-y-1/2 w-full md:w-[400px] bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl z-10 border border-neutral-100 md:opacity-0 md:translate-x-10 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 mt-6 md:mt-0">
                            <h3 className="text-2xl font-bold text-neutral-800 mb-3">Always learning.</h3>
                            <p className="text-neutral-500 font-medium leading-relaxed">No ego. We seek the truth, even if it proves us wrong. We ask questions, listen intimately to our users, and iterate constantly.</p>
                        </div>
                    </motion.div>

                    {/* Value 4 */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="relative flex flex-col md:flex-row items-center md:items-start justify-end group"
                    >
                        <h2 className="text-[70px] md:text-[120px] lg:text-[160px] font-black leading-none text-transparent tracking-tighter w-full md:w-auto z-0 select-none text-right transition-colors duration-500 group-hover:text-[#ffe4dc]" style={{ WebkitTextStroke: '2px #f88863' }}>
                            RESILIENT
                        </h2>
                        <div className="md:absolute left-0 top-1/2 md:-translate-y-1/2 w-full md:w-[400px] bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl z-10 border border-neutral-100 md:opacity-0 md:-translate-x-10 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 mt-6 md:mt-0">
                            <h3 className="text-2xl font-bold text-neutral-800 mb-3">Never give up.</h3>
                            <p className="text-neutral-500 font-medium leading-relaxed">The path to greatness is littered with obstacles. We view challenges as opportunities to grow stronger and prove our dedication.</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* PHOTO GRID ASSEMBLE */}
            <section className="py-24 px-4 lg:px-6 bg-[#fbfaf9] overflow-hidden">
                <div className="max-w-[1400px] mx-auto text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-extrabold text-[#3a4454] tracking-tight">Life at Salonacare</h2>
                </div>

                <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4 max-w-[1400px] mx-auto">
                    {teamPhotos.map((src, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, margin: "100px" }}
                            transition={{ duration: 0.6, delay: (i % 4) * 0.1 }}
                            className="break-inside-avoid relative group rounded-2xl overflow-hidden shadow-sm"
                        >
                            <img
                                src={src}
                                alt="Team event"
                                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out grayscale-[20%] group-hover:grayscale-0"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* GET STARTED BANNER */}
            <section className="py-32 relative overflow-hidden bg-center bg-cover" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2000')" }}>
                <div className="absolute inset-0 bg-neutral-900/80 backdrop-blur-sm" />
                <div className="max-w-4xl mx-auto text-center relative z-10 px-6">
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="text-[40px] md:text-[50px] font-extrabold text-white mb-6 tracking-tight leading-[1.1]"
                    >
                        Let's <span className="text-[#6bc4bb]">get you started</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg md:text-xl text-white/90 font-medium max-w-2xl mx-auto leading-relaxed mb-8"
                    >
                        Switching systems shouldn't be a hassle, let us handle it. Whether you're moving over to Salonacare from a pen & paper calendar, an outdated POS system, or any other software, our team is here to guide you through every step of the way. Simple and stress-free!
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <button
                            onClick={() => router.push("/professionals/book-demo")}
                            className="bg-[#f88863] hover:bg-[#e67551] text-white font-extrabold py-5 px-12 rounded-[16px] shadow-[0_15px_30px_rgba(248,136,99,0.3)] hover:-translate-y-1 transition-all duration-300 text-[18px] tracking-wide"
                        >
                            BOOK A DEMO
                        </button>
                    </motion.div>
                </div>
            </section>

            <ProFooter />
        </main>
    );
}
