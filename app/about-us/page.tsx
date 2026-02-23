"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Users, Globe2, Award, Zap } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function AboutUsPage() {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 100]);
    const y2 = useTransform(scrollY, [0, 500], [0, -100]);

    return (
        <main className="min-h-screen bg-white font-sans flex flex-col selection:bg-[#f16335] selection:text-white overflow-hidden">
            <Navbar />

            {/* HERO SECTION */}
            <section className="pt-32 pb-24 px-6 max-w-[1200px] mx-auto relative w-full flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center max-w-4xl z-10"
                >
                    <p className="text-[#f16335] font-extrabold tracking-widest uppercase text-xs mb-6">Our Story</p>
                    <h1 className="text-[48px] md:text-[72px] font-extrabold text-neutral-900 leading-[1.05] tracking-tight mb-8">
                        Built by professionals,<br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f16335] to-[#f88863]">for professionals.</span>
                    </h1>
                    <p className="text-neutral-500 text-[18px] md:text-[22px] font-medium max-w-2xl mx-auto leading-relaxed mb-12">
                        We believe that managing a salon shouldn't be the hardest part of your day. We're on a mission to bring world-class software to independent beauty businesses worldwide.
                    </p>
                </motion.div>

                {/* DYNAMIC IMAGE GRID */}
                <div className="relative w-full max-w-[1100px] mx-auto h-[400px] md:h-[600px] mt-10">
                    <motion.div style={{ y: y1 }} className="absolute left-0 top-10 w-[30%] h-[70%] rounded-[32px] overflow-hidden shadow-2xl">
                        <div className="absolute inset-0 bg-black/20 z-10" />
                        <img src="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800" className="w-full h-full object-cover" alt="Salon working" />
                    </motion.div>

                    <motion.div className="absolute left-[33%] top-0 w-[40%] h-[100%] rounded-[32px] overflow-hidden shadow-2xl z-20">
                        <div className="absolute inset-0 bg-black/10 z-10" />
                        <img src="https://images.unsplash.com/photo-1521590832167-7bfc17484d20?q=80&w=800" className="w-full h-full object-cover" alt="Team meeting" />
                    </motion.div>

                    <motion.div style={{ y: y2 }} className="absolute right-0 top-20 w-[24%] h-[60%] rounded-[32px] overflow-hidden shadow-2xl">
                        <div className="absolute inset-0 bg-black/20 z-10" />
                        <img src="https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=800" className="w-full h-full object-cover" alt="Happy customer" />
                    </motion.div>
                </div>
            </section>

            {/* STATS SECTION */}
            <section className="py-24 bg-neutral-900 border-t border-b border-neutral-800 relative overflow-hidden">
                <div className="absolute -left-[20%] -top-[50%] w-[50%] h-[200%] bg-gradient-to-r from-[#f16335]/10 to-transparent rotate-12 blur-3xl pointer-events-none" />

                <div className="max-w-[1200px] mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center md:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="flex items-center justify-center md:justify-start gap-3 mb-2 text-[#f16335]">
                                <Globe2 size={24} />
                                <span className="text-3xl font-extrabold text-white">12+</span>
                            </div>
                            <p className="text-neutral-400 font-medium">Countries supported globally</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <div className="flex items-center justify-center md:justify-start gap-3 mb-2 text-[#f16335]">
                                <Users size={24} />
                                <span className="text-3xl font-extrabold text-white">5,000+</span>
                            </div>
                            <p className="text-neutral-400 font-medium">Salons trust Salonacare</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <div className="flex items-center justify-center md:justify-start gap-3 mb-2 text-[#f16335]">
                                <Zap size={24} />
                                <span className="text-3xl font-extrabold text-white">2.5M+</span>
                            </div>
                            <p className="text-neutral-400 font-medium">Appointments booked monthly</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <div className="flex items-center justify-center md:justify-start gap-3 mb-2 text-[#f16335]">
                                <Award size={24} />
                                <span className="text-3xl font-extrabold text-white">99.9%</span>
                            </div>
                            <p className="text-neutral-400 font-medium">Guaranteed server uptime</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* MISSION SECTION */}
            <section className="py-32 px-6 bg-neutral-50 flex-1">
                <div className="max-w-[1000px] mx-auto flex flex-col md:flex-row items-center gap-16">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7 }}
                        className="flex-1"
                    >
                        <h2 className="text-[36px] md:text-[48px] font-extrabold text-neutral-900 leading-[1.1] mb-6 tracking-tight">
                            More time for what <br className="hidden md:block" />
                            matters most.
                        </h2>
                        <div className="w-16 h-1 bg-[#f16335] mb-8 rounded-full" />
                        <p className="text-neutral-500 text-[17px] leading-relaxed font-medium mb-6">
                            The idea for Salonacare was born in a busy hair salon in Luxembourg. We saw stylists spending hours answering phones, calculating commissions on paper, and dealing with no-shows.
                        </p>
                        <p className="text-neutral-500 text-[17px] leading-relaxed font-medium">
                            We realized that beauty professionals are artists, not administrators. Our software is designed to automate the heavy lifting so you can focus entirely on creating beautiful client experiences.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7 }}
                        className="flex-1 relative"
                    >
                        <div className="absolute -inset-4 bg-orange-100 rounded-[32px] transform rotate-3" />
                        <img
                            src="https://images.unsplash.com/photo-1520338801623-6b88fe32bbf2?q=80&w=800"
                            className="relative rounded-[24px] shadow-xl w-full object-cover aspect-[4/5]"
                            alt="Salonacare founder"
                        />
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
