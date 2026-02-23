"use client";

import ProNavbar from "../../../../components/ProNavbar";
import ProFooter from "../../../../components/ProFooter";
import { motion } from "framer-motion";
import { ChevronRight, Calendar, Calculator, Briefcase, TrendingUp, Search, Instagram, Facebook } from "lucide-react";

export default function GrowVisibilityPage() {
    return (
        <main className="min-h-screen bg-white font-sans selection:bg-[#f472b6] selection:text-white">
            <ProNavbar />

            {/* HERO SECTION */}
            <section className="pt-24 pb-16 px-6 max-w-[1200px] mx-auto text-center relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto"
                >
                    <p className="text-[#f472b6] font-bold tracking-wide uppercase text-sm mb-4">Grow your revenue</p>
                    <h1 className="text-[40px] md:text-[54px] font-extrabold text-[#3a4454] leading-[1.1] mb-6 tracking-tight">
                        Get found, <br />
                        <span className="relative inline-block"><span className="relative z-10">get booked</span><span className="absolute bottom-1 left-0 w-full h-3 bg-[#fce7f3] -z-0"></span></span>
                    </h1>
                    <p className="text-[#6b7280] text-[18px] md:text-[20px] font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
                        Convert casual scrollers into paying clients. Maximize your digital footprint across every major platform where your potential customers are looking for you.
                    </p>
                    <button
                        onClick={() => window.location.href = "/professionals/book-demo"}
                        className="bg-[#f88863] hover:bg-[#e67551] text-white font-extrabold py-4 px-10 rounded-xl shadow-[0_10px_25px_rgba(248,136,99,0.3)] hover:-translate-y-0.5 transition-all duration-300 text-[16px] tracking-wide uppercase"
                    >
                        BOOK YOUR DEMO
                    </button>
                </motion.div>
            </section>

            {/* THREE CARDS & BACKGROUND BANNER */}
            <section className="relative pt-16 mt-8 mb-32">
                {/* Background horizontal banner */}
                <div className="absolute bottom-0 w-full h-[60%] bg-gradient-to-r from-[#dca484] to-[#f47ba0] z-0 opacity-90"></div>

                <div className="max-w-[1100px] mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12">

                        {/* Card 1 */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="bg-white rounded-[32px] p-8 shadow-[0_20px_40px_rgba(0,0,0,0.08)] border-8 border-white text-center flex flex-col items-center gap-6"
                        >
                            <div className="w-full bg-[#f4f6f8] text-[#3a4454] font-bold py-3 rounded-xl uppercase tracking-wider text-sm flex items-center justify-center gap-2"><Search size={16} /> Google</div>
                            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg border border-neutral-100 mb-2">
                                <span className="text-3xl font-extrabold text-[#4285F4]">G</span>
                            </div>
                            <p className="text-sm text-neutral-500 font-medium">Capture search traffic directly into your agenda.</p>
                        </motion.div>

                        {/* Card 2 */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-white rounded-[32px] p-8 shadow-[0_20px_40px_rgba(0,0,0,0.08)] border-8 border-white text-center flex flex-col items-center gap-6 mt-0 md:-mt-8"
                        >
                            <div className="w-full bg-[#fce7f3] text-[#f472b6] font-bold py-3 rounded-xl uppercase tracking-wider text-sm flex items-center justify-center gap-2"><Instagram size={16} /> Instagram</div>
                            <div className="w-20 h-20 bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] rounded-full flex items-center justify-center shadow-lg border border-white mb-2 text-white">
                                <Instagram size={40} />
                            </div>
                            <p className="text-sm text-neutral-500 font-medium">Turn profile views into immediate confirmed bookings.</p>
                        </motion.div>

                        {/* Card 3 */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="bg-white rounded-[32px] p-8 shadow-[0_20px_40px_rgba(0,0,0,0.08)] border-8 border-white text-center flex flex-col items-center gap-6"
                        >
                            <div className="w-full bg-[#e3f2fd] text-[#1877F2] font-bold py-3 rounded-xl uppercase tracking-wider text-sm flex items-center justify-center gap-2"><Facebook size={16} /> Facebook</div>
                            <div className="w-20 h-20 bg-[#1877F2] rounded-full flex items-center justify-center shadow-lg border border-white mb-2 text-white">
                                <Facebook size={40} className="fill-current" />
                            </div>
                            <p className="text-sm text-neutral-500 font-medium">Add a dedicated "Book Now" action to your page.</p>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* FEATURE 2: Center text with card */}
            <section className="py-24 bg-white px-6">
                <div className="max-w-[700px] mx-auto flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7 }}
                        className="bg-white rounded-[32px] p-10 md:p-14 shadow-xl border border-neutral-100"
                    >
                        <p className="text-[#f88863] text-sm font-bold uppercase tracking-wider mb-2">Dedicated Landing Page</p>
                        <h2 className="text-[32px] md:text-[38px] font-extrabold text-[#3a4454] leading-[1.1] mb-6 tracking-tight">
                            Your SEO Optimized <br />Booking Profile
                        </h2>
                        <p className="text-[#6b7280] text-[17px] leading-relaxed font-medium">
                            Don't have a website? No problem. We provide every salon with a beautiful, mobile-friendly landing page optimized for local SEO. Showcase your services, team, and reviews all in one place.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* FEATURE 3: Banner with Left Card */}
            <section className="py-32 relative px-6 mt-16">
                <div className="absolute inset-0 bg-gradient-to-r from-[#dca484] to-[#f47ba0] z-0 opacity-90"></div>
                <div className="max-w-[1000px] mx-auto relative z-10 flex justify-start">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7 }}
                        className="bg-white rounded-[32px] p-10 md:p-14 shadow-2xl max-w-xl text-left"
                    >
                        <p className="text-[#f472b6] text-sm font-bold uppercase tracking-wider mb-2">Automated Reviews</p>
                        <h2 className="text-[32px] md:text-[38px] font-extrabold text-[#3a4454] leading-[1.1] mb-6 tracking-tight">
                            Skyrocket your Google ranking
                        </h2>
                        <p className="text-[#6b7280] text-[17px] leading-relaxed font-medium">
                            Automatically send friendly SMS requests for reviews after a completed appointment. We push those 5-star ratings directly to your Google My Business profile, boosting your local search ranking instantly.
                        </p>
                    </motion.div>
                </div>
            </section>


            {/* DISCOVER MORE BLOCK */}
            <section className="bg-white border-t border-neutral-100 mt-20">
                <div className="flex flex-col md:flex-row items-stretch">
                    <div className="flex-1 bg-white flex justify-end py-24 px-6 md:px-12 lg:px-24 border-r border-[#f4f6f8]">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.7 }}
                            className="max-w-md w-full"
                        >
                            <p className="text-[#3a4454] text-xl md:text-2xl font-medium mb-2 opacity-80">Grow your revenue</p>
                            <h2 className="text-3xl md:text-[40px] font-extrabold text-[#3a4454] leading-tight mb-6">
                                Discover <br />more <span className="text-[#f472b6]">benefits<br />and tools!</span>
                            </h2>
                            <p className="text-neutral-500 font-medium mb-8">
                                Give your salon the digital presence it deserves and make sure customers choose you.
                            </p>
                            <a href="/professionals/features/marketing-tools" className="inline-flex items-center gap-2 text-[#f472b6] font-bold hover:gap-3 transition-all uppercase tracking-wide text-sm">
                                View marketing tools <ChevronRight size={16} />
                            </a>
                        </motion.div>
                    </div>
                    <div className="flex-1 bg-[#f4f6f8] flex flex-col justify-center gap-6 py-24 px-6 md:px-12 lg:px-24">
                        <motion.a
                            href="/professionals/features/sell-online-24-7"
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow group flex items-start gap-4"
                        >
                            <TrendingUp className="text-[#f472b6] mt-1 shrink-0" size={24} />
                            <div>
                                <h4 className="font-bold text-[#3a4454] mb-1 group-hover:text-[#f472b6] transition-colors">Sell online 24/7</h4>
                                <p className="text-sm text-neutral-500 font-medium">Integrate Shopify and WooCommerce directly, and let customers buy vouchers anywhere.</p>
                            </div>
                        </motion.a>
                        <motion.a
                            href="/professionals/features/pos-system"
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow group flex items-start gap-4"
                        >
                            <Calculator className="text-[#8b5cf6] mt-1 shrink-0" size={24} />
                            <div>
                                <h4 className="font-bold text-[#3a4454] mb-1 group-hover:text-[#8b5cf6] transition-colors">POS System</h4>
                                <p className="text-sm text-neutral-500 font-medium">Make checkout seamless when buying products and services in-store natively.</p>
                            </div>
                        </motion.a>
                    </div>
                </div>
            </section>

            {/* BOTTOM GET STARTED CTA */}
            <section className="py-32 relative overflow-hidden bg-gradient-to-br from-[#ffffff] via-[#e6e9ed] to-[#d0d5dc]">
                <div className="max-w-[800px] mx-auto text-center px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-[40px] md:text-[48px] font-extrabold text-[#3a4454] mb-6 tracking-tight leading-[1.1]">Let's get you started</h2>
                        <p className="text-[17px] text-[#5a6270] leading-relaxed font-medium mb-10">
                            Book a free, no-obligation demo with one of our experts and see exactly how Salonacare can work for your unique business. No commitment required.
                        </p>
                        <button
                            onClick={() => window.location.href = "/professionals/book-demo"}
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
