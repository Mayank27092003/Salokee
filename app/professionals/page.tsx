"use client";

import ProNavbar from "../../components/ProNavbar";
import ProFooter from "../../components/ProFooter";
import { useRouter } from "next/navigation";
import { PlayCircle, ShieldCheck, ChevronRight, ChevronLeft, ArrowDownCircle, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";

const commonDesc = "Stay in control of everything—from client details to staff schedules. Track performance, manage access rights, and stay on top of your finances. Real-time insights help you make smart decisions. Everything stays organized, whether you have one or multiple salons!";

const featuresData = [
    {
        id: "bookings",
        tabTitle: "MANAGE YOUR BOOKINGS",
        heading: "MANAGE YOUR BOOKINGS",
        desc: commonDesc,
        img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800"
    },
    {
        id: "business",
        tabTitle: "MANAGE YOUR BUSINESS",
        heading: "MANAGE YOUR BUSINESS",
        desc: commonDesc,
        img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800"
    },
    {
        id: "revenue",
        tabTitle: "GROW YOUR REVENUE",
        heading: "GROW YOUR REVENUE",
        desc: commonDesc,
        img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800"
    },
    {
        id: "payments",
        tabTitle: "SIMPLIFY YOUR PAYMENTS",
        heading: "SIMPLIFY YOUR PAYMENTS",
        desc: commonDesc,
        img: "https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=800"
    }
];

export default function ProfessionalsPage() {
    const router = useRouter();
    const [activeTabIdx, setActiveTabIdx] = useState(0);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

    // For drag container
    const constraintsRef = useRef(null);

    const handleBookDemo = () => {
        router.push("/professionals/book-demo");
    };

    const nextTab = () => {
        setActiveTabIdx((prev) => (prev + 1) % featuresData.length);
    };

    const prevTab = () => {
        setActiveTabIdx((prev) => (prev === 0 ? featuresData.length - 1 : prev - 1));
    };

    const activeFeature = featuresData[activeTabIdx];

    return (
        <main className="min-h-screen font-sans bg-[#fbfaf9] relative selection:bg-[#f88863] selection:text-white overflow-hidden">
            {/* Elegant light grey/brown gradient header background */}
            <div className="absolute top-0 inset-x-0 h-[1000px] bg-gradient-to-b from-[#f2efeb] via-[#f7f5f3] to-[#fbfaf9] -z-20 pointer-events-none"></div>

            <ProNavbar />

            {/* HERO SECTION */}
            <section className="relative pt-16 pb-32 lg:pt-28 lg:pb-40 px-6 lg:px-12 max-w-[1400px] mx-auto overflow-visible">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 relative">

                    {/* Floating Context Images for Hero (Behind content) */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 0.9, y: [-15, 10, -15], rotate: [-2, 2, -2] }}
                        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -top-10 left-1/3 lg:left-[45%] z-0 hidden lg:block pointer-events-none"
                    >
                        {/* Mock Card Reader Element */}
                        <div className="w-[180px] h-[300px] bg-white rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.1)] border-4 border-[#e9e5e0] rotate-[15deg] flex flex-col items-center pt-8 overflow-hidden relative">
                            <div className="w-full h-10 bg-neutral-800 -rotate-2 scale-110 shadow-sm mt-4"></div>
                            <div className="absolute bottom-6 w-3/4 h-2 bg-[#f2efeb] rounded-full"></div>
                        </div>
                    </motion.div>

                    <motion.img
                        src="https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=400"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.95, y: [-10, 15, -10], rotate: [0, -5, 0] }}
                        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute top-10 -right-10 lg:-right-20 w-[240px] h-[240px] object-cover rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.15)] z-0 hidden lg:block border-[8px] border-white pointer-events-none"
                        style={{ objectPosition: "top" }}
                        alt="Coffee"
                        draggable="false"
                    />

                    <motion.img
                        src="https://images.unsplash.com/photo-1621607512214-68297480165e?q=80&w=400"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.85, y: [-8, 20, -8], rotate: [-10, -5, -10] }}
                        transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                        className="absolute -bottom-24 left-10 lg:left-[40%] w-[220px] h-[340px] object-cover rounded-3xl shadow-[0_25px_50px_rgba(0,0,0,0.15)] z-20 hidden md:block border-[10px] border-white filter grayscale-[20%] pointer-events-none"
                        alt="Clippers"
                        draggable="false"
                    />

                    <div className="flex-1 lg:pr-4 w-full z-10 text-center lg:text-left relative">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="text-[44px] lg:text-[68px] font-extrabold text-[#3a4454] leading-[1.1] tracking-tight mb-6"
                        >
                            Your #1 ally for <br className="hidden lg:block" />
                            <span className="text-[#3a4454]">salon management:</span> <br className="hidden lg:block" />
                            <span className="font-medium text-[#7a8494] text-[36px] lg:text-[52px]">everything you need,</span> <br className="hidden lg:block" />
                            <span className="font-medium text-[#7a8494] text-[36px] lg:text-[52px]">all in one place</span>
                        </motion.h1>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start mt-8"
                        >
                            <button
                                onClick={handleBookDemo}
                                className="bg-[#f88863] hover:bg-[#e67551] text-white font-bold py-4 px-10 rounded-xl shadow-[0_10px_25px_rgba(248,136,99,0.3)] hover:-translate-y-0.5 transition-all duration-300 text-[18px] tracking-wide"
                            >
                                DISCOVER FOR FREE
                            </button>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.8 }}
                            className="flex justify-center lg:justify-start mt-16 text-[#9a9fa8]"
                        >
                            <ArrowDownCircle size={40} strokeWidth={1.5} className="animate-bounce" />
                        </motion.div>
                    </div>

                    <div className="flex-1 relative w-full lg:max-w-[750px] z-10 mt-12 lg:mt-0 flex justify-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 30 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative w-full max-w-[700px] px-4 sm:px-0"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200"
                                alt="Dashboard interface"
                                className="w-full h-auto object-contain rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] border-[12px] border-white backdrop-blur-sm pointer-events-none"
                                draggable="false"
                            />

                        </motion.div>
                    </div>
                </div>
            </section>

            {/* VIDEO SECTION - Moved up here! */}
            <section className="py-24 px-6 relative bg-white">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="max-w-[1000px] mx-auto text-center relative z-10"
                >
                    <h2 className="text-[32px] md:text-[44px] font-extrabold text-[#3a4454] mb-4 tracking-tight">See Salonacare in action</h2>
                    <p className="text-[#6b7280] mb-16 text-[17px] font-medium max-w-lg mx-auto">Discover how our software transforms your daily operations in less than 2 minutes.</p>

                    {!isVideoPlaying ? (
                        <div
                            className="relative aspect-video rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] cursor-pointer group bg-neutral-900 border-8 border-white"
                            onClick={() => setIsVideoPlaying(true)}
                        >
                            <img
                                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1200"
                                className="w-full h-full object-cover opacity-70 group-hover:scale-105 group-hover:opacity-50 transition-all duration-700 pointer-events-none"
                                alt="Video thumbnail"
                                draggable="false"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-[100px] h-[100px] bg-white rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(248,136,99,0.3)] group-hover:scale-110 transition-transform cursor-pointer relative">
                                    <div className="absolute inset-0 border-[4px] border-white/40 rounded-full animate-ping"></div>
                                    <PlayCircle size={52} className="text-[#f88863] ml-1.5" />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="relative aspect-video rounded-[32px] overflow-hidden shadow-2xl bg-black border-8 border-white">
                            <iframe
                                width="100%"
                                height="100%"
                                src="https://www.youtube.com/embed/RWr8XeBUxTU?autoplay=1"
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="absolute inset-0"
                            ></iframe>
                        </div>
                    )}
                </motion.div>
            </section>

            {/* THE INTERACTIVE FEATURES SLIDER SECTION */}
            <section className="py-24 bg-[#fbfaf9] px-6 overflow-hidden relative border-t border-[#f0eee9]">
                <div className="max-w-[1240px] mx-auto relative z-10">

                    {/* Draggable Tab Line */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative mb-12 flex items-center justify-center group"
                        ref={constraintsRef}
                    >
                        <div className="w-full overflow-hidden border-b-2 border-[#f0eee9]">
                            <motion.div
                                drag="x"
                                dragConstraints={constraintsRef}
                                dragElastic={0.2}
                                className="flex justify-between w-full min-w-max md:min-w-0 pb-4 px-4 md:px-0 cursor-grab active:cursor-grabbing gap-8 md:gap-0"
                            >
                                {featuresData.map((tab, idx) => (
                                    <div
                                        key={tab.id}
                                        onClick={() => setActiveTabIdx(idx)}
                                        className={`whitespace-nowrap cursor-pointer transition-all relative select-none flex-1 text-center flex items-center justify-center gap-2 ${activeTabIdx === idx ? 'text-[#6bc4bb]' : 'text-[#8b919e] hover:text-[#5a6270]'
                                            }`}
                                    >
                                        <div className={`text-[13px] md:text-[15px] uppercase tracking-wider transition-all ${activeTabIdx === idx ? 'font-black' : 'font-bold'}`}>
                                            {tab.tabTitle}
                                        </div>
                                        {/* Glowing Active Bottom Line */}
                                        {activeTabIdx === idx && (
                                            <motion.div
                                                layoutId="activeTabUnderline"
                                                className="absolute -bottom-[18px] left-0 right-0 h-[3px] bg-[#6bc4bb]"
                                            />
                                        )}
                                    </div>
                                ))}
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Feature Image & Text Content - Side by Side layout */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeFeature.id}
                            initial={{ opacity: 0, scale: 0.98, x: 20 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.98, x: -20 }}
                            transition={{ duration: 0.4, ease: "backOut" }}
                            className="bg-white rounded-[40px] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.06)] overflow-hidden border border-[#f0eee9]"
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            onDragEnd={(e, { offset, velocity }) => {
                                const swipe = Math.abs(offset.x) * velocity.x;
                                if (swipe < -100) nextTab();
                                else if (swipe > 100) prevTab();
                            }}
                        >
                            <div className="flex flex-col md:flex-row items-stretch cursor-grab active:cursor-grabbing">
                                <div className="flex-1 p-10 lg:p-16 xl:p-20 flex flex-col justify-center relative bg-white z-10">
                                    <h2 className="text-[32px] lg:text-[44px] font-extrabold text-[#3a4454] mb-6 tracking-tight leading-[1.15]">{activeFeature.heading}</h2>
                                    <p className="text-[17px] text-[#5a6270] leading-relaxed mb-10 font-medium">
                                        {activeFeature.desc}
                                    </p>
                                    <button
                                        onClick={handleBookDemo}
                                        className="text-[#6bc4bb] font-extrabold text-[17px] hover:text-[#509c95] transition-colors flex items-center gap-2 self-start group tracking-wide"
                                    >
                                        Discover this feature <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform" />
                                    </button>
                                </div>
                                <div className="flex-1 min-h-[400px] md:min-h-[500px] bg-[#f2efeb] flex items-center justify-center p-8 lg:p-12 relative overflow-hidden">
                                    <img
                                        src={activeFeature.img}
                                        className="w-full h-auto object-contain max-h-full rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.15)] relative z-10 pointer-events-none"
                                        alt={activeFeature.heading}
                                        draggable="false"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                </div>
            </section>

            {/* PERFORMANCE METRICS (KPIs) - EXACT MATCH IMAGE 3 */}
            <section className="py-24 px-6 relative bg-[#f1f2f3]">
                <div className="max-w-[1100px] mx-auto relative z-10 flex flex-col lg:flex-row items-center gap-16 lg:gap-20">

                    {/* Left Side: Context Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="flex-1 w-full text-center lg:text-left pt-10"
                    >
                        <h2 className="text-[32px] md:text-[42px] font-medium text-[#4a5568] leading-[1.2] mb-6 tracking-tight">
                            The solution <br /> to <span className="bg-[#e0eceb] px-2 font-bold relative after:absolute after:bottom-1 after:left-0 after:right-0 after:h-[6px] after:bg-[#c1dfdb] after:-z-10 z-0">save time &</span><br /> <span className="bg-[#e0eceb] px-2 font-bold relative after:absolute after:bottom-1 after:left-0 after:right-0 after:h-[6px] after:bg-[#c1dfdb] after:-z-10 z-0">money</span>
                        </h2>
                        <p className="text-[16px] text-[#6b7280] leading-relaxed max-w-[350px] mx-auto lg:mx-0">
                            Our comprehensive software and booking platform will help you grow your business while saving you time and money.
                        </p>
                    </motion.div>

                    {/* Right Side: 4 KPI Cards */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="flex-[1.5] grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 w-full"
                    >

                        {/* KPI Card 1: Rebooking */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="bg-white rounded-[100px] p-2 pr-8 shadow-[0_10px_30px_rgba(0,0,0,0.06)] flex items-center gap-6 relative"
                        >
                            <div className="w-[85px] h-[85px] rounded-full bg-gradient-to-br from-[#f29f76] via-[#ee775e] to-[#e85548] flex items-center justify-center shadow-md border-[5px] border-white shrink-0 z-10 -ml-5">
                                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"></path><path d="m19 9-5 5-4-4-3 3"></path></svg>
                            </div>
                            <div className="py-2">
                                <div className="text-[36px] font-medium text-[#374151] leading-none mb-1">17 %</div>
                                <div className="text-[13px] font-medium text-[#6b7280] tracking-wide">faster rebooking rates</div>
                            </div>
                        </motion.div>

                        {/* KPI Card 2: Cost reduction */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="bg-white rounded-[100px] p-2 pr-8 shadow-[0_10px_30px_rgba(0,0,0,0.06)] flex items-center gap-6 relative"
                        >
                            <div className="w-[85px] h-[85px] rounded-full bg-gradient-to-br from-[#f29f76] via-[#ee775e] to-[#e85548] flex items-center justify-center shadow-md border-[5px] border-white shrink-0 z-10 -ml-5">
                                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path><path d="M12 18V6"></path></svg>
                            </div>
                            <div className="py-2">
                                <div className="text-[36px] font-medium text-[#374151] leading-none mb-1">30 %</div>
                                <div className="text-[13px] font-medium text-[#6b7280] tracking-wide">Cost reduction</div>
                            </div>
                        </motion.div>

                        {/* KPI Card 3: No-shows */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="bg-white rounded-[100px] p-2 pr-8 shadow-[0_10px_30px_rgba(0,0,0,0.06)] flex items-center gap-6 relative"
                        >
                            <div className="w-[85px] h-[85px] rounded-full bg-gradient-to-br from-[#f29f76] via-[#ee775e] to-[#e85548] flex items-center justify-center shadow-md border-[5px] border-white shrink-0 z-10 -ml-5">
                                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                            </div>
                            <div className="py-2">
                                <div className="text-[36px] font-medium text-[#374151] leading-none mb-1">70 %</div>
                                <div className="text-[13px] font-medium text-[#6b7280] tracking-wide">No-shows reduction</div>
                            </div>
                        </motion.div>

                        {/* KPI Card 4: Hours saved */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="bg-white rounded-[100px] p-2 pr-8 shadow-[0_10px_30px_rgba(0,0,0,0.06)] flex items-center gap-6 relative"
                        >
                            <div className="w-[85px] h-[85px] rounded-full bg-gradient-to-br from-[#f29f76] via-[#ee775e] to-[#e85548] flex items-center justify-center shadow-md border-[5px] border-white shrink-0 z-10 -ml-5">
                                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                            </div>
                            <div className="py-2">
                                <div className="text-[36px] font-medium text-[#374151] leading-none mb-1">8-12 hrs</div>
                                <div className="text-[13px] font-medium text-[#6b7280] tracking-wide">Less admin work/week</div>
                            </div>
                        </motion.div>

                    </motion.div>
                </div>
            </section>

            {/* TRUSTED BY PROFESSIONALS */}
            <section className="py-32 bg-[#fbfaf9] px-6 relative overflow-hidden">
                <div className="max-w-[1200px] mx-auto flex flex-col-reverse md:flex-row items-center gap-16 lg:gap-24 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="flex-1 w-full relative"
                    >
                        <div className="absolute -inset-4 bg-white rounded-[40px] shadow-xl inset-shadow rotate-3 -z-10 hidden md:block border border-[#f0eee9]"></div>
                        <img
                            src="https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?q=80&w=800"
                            className="rounded-[32px] shadow-2xl w-full border-[8px] border-white object-cover grayscale-[10%] pointer-events-none"
                            alt="Happy professionals in salon"
                            draggable="false"
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="flex-1"
                    >
                        <h2 className="text-[36px] md:text-[46px] font-extrabold text-[#3a4454] mb-6 leading-[1.1] tracking-tight">
                            Trusted by more than <br />
                            <span className="text-[#509c95]">15,000 beauty professionals</span>
                        </h2>
                        <p className="text-[17px] text-[#6b7280] mb-10 leading-relaxed font-medium">
                            Our all-in-one software handles everything from online bookings to financing. Join the fastest-growing community of hair and beauty experts. Salonacare is built specifically for the needs of salons, barbershops, and spas.
                        </p>
                        <button
                            onClick={handleBookDemo}
                            className="bg-white border-2 border-[#f0eee9] text-[#3a4454] font-extrabold py-4 px-10 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-[#f88863] hover:text-[#f88863] transition-all text-lg tracking-wide"
                        >
                            Read their stories
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* START TODAY CTA (Gradient Banner) */}
            <section className="py-32 relative overflow-hidden px-6 bg-[#f2efeb]">
                <div className="max-w-[1000px] mx-auto text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex-1"
                    >
                        <h2 className="text-[40px] md:text-[50px] font-extrabold text-[#3a4454] mb-5 tracking-tight leading-[1.1]">Let's get you started</h2>
                        <p className="text-[18px] text-[#5a6270] leading-relaxed font-medium max-w-lg">
                            Ready to upgrade your salon's management? Book a free, no-obligation demo with one of our experts and see exactly how Salonacare can work for your unique business. No commitment required.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="shrink-0 w-full md:w-auto mt-8 md:mt-0"
                    >
                        <button
                            onClick={handleBookDemo}
                            className="bg-[#f88863] hover:bg-[#e67551] text-white font-extrabold py-5 px-12 rounded-[16px] shadow-[0_15px_30px_rgba(248,136,99,0.3)] hover:-translate-y-1 transition-all duration-300 text-[18px] w-full tracking-wide"
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