"use client";

import ProNavbar from "../../../../components/ProNavbar";
import ProFooter from "../../../../components/ProFooter";
import { motion } from "framer-motion";
import { ChevronRight, Calendar, Calculator, Briefcase, TrendingUp } from "lucide-react";

export default function SalonacarePaymentsPage() {
    return (
        <main className="min-h-screen bg-white font-sans selection:bg-[#8b5cf6] selection:text-white">
            <ProNavbar />

            {/* HERO SECTION */}
            <section className="pt-24 pb-32 px-6 max-w-[1200px] mx-auto text-center relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto"
                >
                    <p className="text-[#8b5cf6] font-bold tracking-wide uppercase text-sm mb-4">Simplify your payments</p>
                    <h1 className="text-[40px] md:text-[54px] font-extrabold text-[#3a4454] leading-[1.1] mb-6 tracking-tight">
                        Payments that are <span className="relative inline-block"><span className="relative z-10">seamless, secure,</span><span className="absolute bottom-1 left-0 w-full h-3 bg-[#e0d4fc] -z-0"></span></span> <br className="hidden md:block" />
                        and built specifically for you.
                    </h1>
                    <p className="text-[#6b7280] text-[18px] md:text-[20px] font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
                        An integrated payment processor designed to secure your cash flow, eliminate manual reconciliation errors, and give your clients a premium checkout experience.
                    </p>
                    <button
                        onClick={() => window.location.href = "/professionals/book-demo"}
                        className="bg-[#f88863] hover:bg-[#e67551] text-white font-extrabold py-4 px-10 rounded-xl shadow-[0_10px_25px_rgba(248,136,99,0.3)] hover:-translate-y-0.5 transition-all duration-300 text-[16px] tracking-wide uppercase"
                    >
                        BOOK YOUR DEMO
                    </button>
                </motion.div>

                {/* HERO IMAGE */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mt-16 relative"
                >
                    {/* Background rectangle */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[120vw] h-[100%] bg-[#f4f6f8] -z-10"></div>

                    <img
                        src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1400"
                        alt="Salonacare Payments Interface"
                        className="w-full max-w-[1000px] mx-auto rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-8 border-white object-cover aspect-[16/10]"
                    />
                </motion.div>
            </section>

            {/* SPACER SECTION */}
            <div className="h-20 bg-[#f4f6f8]"></div>

            {/* FEATURE 1: Banner with Center Card */}
            <section className="py-32 relative px-6">
                <div className="absolute inset-0 bg-gradient-to-r from-[#d9b3eb] to-[#e48398] z-0 opacity-80"></div>
                <div className="max-w-[1000px] mx-auto flex flex-col items-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7 }}
                        className="bg-white rounded-[32px] p-10 md:p-14 shadow-2xl max-w-2xl text-center relative overflow-hidden"
                    >
                        <p className="text-[#8b5cf6] text-sm font-bold uppercase tracking-wider mb-2 relative z-10">Next-Day Payouts</p>
                        <h2 className="text-[32px] md:text-[38px] font-extrabold text-[#3a4454] leading-[1.1] mb-6 tracking-tight relative z-10">
                            Your money, faster
                        </h2>
                        <p className="text-[#6b7280] text-[17px] leading-relaxed font-medium relative z-10">
                            Cash flow is the lifeblood of your business. With Salonacare Payments, funds settled today are deposited directly into your bank account the very next business day without fail.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* FEATURE 2: Text Left - White bg */}
            <section className="py-24 bg-[#f4f6f8] px-6">
                <div className="max-w-[1000px] mx-auto flex flex-col md:flex-row items-center gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7 }}
                        className="flex-1"
                    >
                        <p className="text-[#f472b6] text-sm font-bold uppercase tracking-wider mb-2">Transparent Pricing</p>
                        <h2 className="text-[32px] md:text-[40px] font-extrabold text-[#3a4454] leading-[1.1] mb-6 tracking-tight">
                            No hidden fees, ever
                        </h2>
                        <p className="text-[#6b7280] text-[17px] leading-relaxed font-medium">
                            Forget confusing statements with bizarre interchange rates and monthly minimums. We offer a flat, extremely competitive rate across all card types. Period.
                        </p>
                    </motion.div>
                    <div className="flex-1 hidden md:block"></div>
                </div>
            </section>

            {/* FEATURE 3: Text Right - White bg */}
            <section className="py-24 bg-white px-6">
                <div className="max-w-[1000px] mx-auto flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1 hidden md:block"></div>
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7 }}
                        className="flex-1"
                    >
                        <p className="text-[#4b6dcb] text-sm font-bold uppercase tracking-wider mb-2">Refund Management</p>
                        <h2 className="text-[32px] md:text-[40px] font-extrabold text-[#3a4454] leading-[1.1] mb-6 tracking-tight">
                            Effortless Returns
                        </h2>
                        <p className="text-[#6b7280] text-[17px] leading-relaxed font-medium">
                            Client changed their mind about a retail product? Process a partial or full refund directly from the point of sale in exactly one click. It automatically updates inventory, taxes, and pushes the money back to their card.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* DISCOVER MORE BLOCK */}
            <section className="bg-white border-t border-neutral-100">
                <div className="flex flex-col md:flex-row items-stretch">
                    <div className="flex-1 bg-white flex justify-end py-24 px-6 md:px-12 lg:px-24 border-r border-neutral-100">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.7 }}
                            className="max-w-md w-full"
                        >
                            <p className="text-[#3a4454] text-xl md:text-2xl font-medium mb-2 opacity-80">Simplify your payments</p>
                            <h2 className="text-3xl md:text-[40px] font-extrabold text-[#3a4454] leading-tight mb-6">
                                Discover <br />more <span className="text-[#8b5cf6]">benefits<br />and tools!</span>
                            </h2>
                            <p className="text-neutral-500 font-medium mb-8">
                                Secure your cashflow and give your clients a seamless checkout experience with advanced POS capabilities.
                            </p>
                            <a href="/professionals/features/smart-agenda" className="inline-flex items-center gap-2 text-[#8b5cf6] font-bold hover:gap-3 transition-all uppercase tracking-wide text-sm">
                                View smart agenda <ChevronRight size={16} />
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
