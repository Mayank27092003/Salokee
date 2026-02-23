"use client";

import ProNavbar from "../../../components/ProNavbar";
import ProFooter from "../../../components/ProFooter";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const comparisonFeatures = [
    { name: "Digital Agenda", start: true, pro: true, business: true, enterprise: true },
    { name: "Online Booking", start: true, pro: true, business: true, enterprise: true },
    { name: "Smart SMS Reminders", start: true, pro: true, business: true, enterprise: true },
    { name: "Client Database", start: true, pro: true, business: true, enterprise: true },
    { name: "Web Presence", start: true, pro: true, business: true, enterprise: true },
    { name: "Marketing Tools", start: false, pro: true, business: true, enterprise: true },
    { name: "Advanced Reporting", start: false, pro: false, business: true, enterprise: true },
    { name: "Multi-Location Support", start: false, pro: false, business: false, enterprise: true },
];

export default function PricingPage() {
    return (
        <main className="min-h-screen bg-[#fbfaf9] font-sans selection:bg-[#f88863] selection:text-white pb-32">
            <ProNavbar />

            {/* HERO & PRICING CARDS */}
            <section className="pt-24 pb-20 px-4 bg-gradient-to-b from-[#f2efeb] to-[#fbfaf9] text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#3a4454] tracking-tight mb-6"
                >
                    3 options, <span className="text-[#6bc4bb] underline decoration-4 underline-offset-8">1 unbeatable service!</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-lg text-neutral-500 font-medium max-w-2xl mx-auto mb-16"
                >
                    Testing period of 1 month free - Cancel anytime.
                </motion.p>

                <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-end relative z-10">
                    {/* START PACKAGE */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        whileHover={{ y: -5 }}
                        className="bg-white rounded-[2rem] border border-neutral-100 shadow-[0_20px_40px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col h-full"
                    >
                        <div className="bg-[#f0a68d] text-white py-4 font-bold tracking-wider rounded-t-[2rem]">START PACKAGE</div>
                        <div className="p-10 flex-1 flex flex-col">
                            <ul className="space-y-4 mb-10 text-left text-neutral-600 font-medium text-sm">
                                <li className="flex gap-3"><Check size={18} className="text-[#6bc4bb] shrink-0" /> Smart Agenda</li>
                                <li className="flex gap-3"><Check size={18} className="text-[#6bc4bb] shrink-0" /> Client Database</li>
                                <li className="flex gap-3"><Check size={18} className="text-[#6bc4bb] shrink-0" /> Online Booking</li>
                                <li className="flex gap-3"><Check size={18} className="text-[#6bc4bb] shrink-0" /> Unlimited SMS reminders</li>
                                <li className="flex gap-3"><Check size={18} className="text-[#6bc4bb] shrink-0" /> Mobile app</li>
                            </ul>
                            <div className="mt-auto">
                                <button className="w-full bg-white border-2 border-[#f88863] text-[#f88863] font-extrabold py-3.5 rounded-xl hover:bg-[#f88863] hover:text-white transition-colors">GET STARTED</button>
                            </div>
                        </div>
                    </motion.div>

                    {/* PRO PACKAGE - HIGHLIGHTED */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        whileHover={{ y: -5 }}
                        className="bg-white rounded-[2rem] border-2 border-[#6bc4bb] shadow-[0_30px_60px_rgba(107,196,187,0.15)] overflow-hidden flex flex-col scale-100 md:scale-105 relative z-10"
                    >
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-white px-4 py-1 rounded-b-lg text-xs font-bold text-[#6bc4bb] shadow-sm tracking-wider uppercase">Most Popular</div>
                        <div className="bg-[#6bc4bb] text-white py-5 font-bold tracking-wider rounded-t-[2rem] text-lg mt-4">PRO PACKAGE*</div>
                        <div className="bg-[#e4f4f2] text-[#4a9b93] py-2 text-xs font-semibold">Start Package features +</div>
                        <div className="p-10 flex-1 flex flex-col">
                            <ul className="space-y-4 mb-10 text-left text-neutral-600 font-medium text-sm">
                                <li className="flex gap-3"><Check size={18} className="text-[#6bc4bb] shrink-0" /> Loyalty module</li>
                                <li className="flex gap-3"><Check size={18} className="text-[#6bc4bb] shrink-0" /> Point of Sale (POS)</li>
                                <li className="flex gap-3"><Check size={18} className="text-[#6bc4bb] shrink-0" /> SMS marketing campaigns</li>
                                <li className="flex gap-3"><Check size={18} className="text-[#6bc4bb] shrink-0" /> Automated Google/Trustpilot reviews</li>
                                <li className="flex gap-3"><Check size={18} className="text-[#6bc4bb] shrink-0" /> Gift vouchers</li>
                                <li className="flex gap-3"><Check size={18} className="text-[#6bc4bb] shrink-0" /> Waitlist booking</li>
                            </ul>
                            <div className="mt-auto">
                                <button className="w-full bg-[#f88863] hover:bg-[#e67551] text-white shadow-[0_10px_20px_rgba(248,136,99,0.3)] hover:shadow-[0_15px_30px_rgba(248,136,99,0.4)] font-extrabold py-3.5 rounded-xl transition-all hover:-translate-y-0.5">GET STARTED</button>
                            </div>
                        </div>
                    </motion.div>

                    {/* BUSINESS PACKAGE */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        whileHover={{ y: -5 }}
                        className="bg-white rounded-[2rem] border border-neutral-100 shadow-[0_20px_40px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col h-full"
                    >
                        <div className="bg-[#6b7280] text-white py-4 font-bold tracking-wider rounded-t-[2rem]">BUSINESS PACKAGE**</div>
                        <div className="bg-[#f3f4f6] text-[#4b5563] py-2 text-xs font-semibold">Pro Package features +</div>
                        <div className="p-10 flex-1 flex flex-col">
                            <ul className="space-y-4 mb-10 text-left text-neutral-600 font-medium text-sm">
                                <li className="flex gap-3"><Check size={18} className="text-[#6bc4bb] shrink-0" /> Advanced inventory tracking</li>
                                <li className="flex gap-3"><Check size={18} className="text-[#6bc4bb] shrink-0" /> Advanced statistics</li>
                                <li className="flex gap-3"><Check size={18} className="text-[#6bc4bb] shrink-0" /> API access</li>
                                <li className="flex gap-3"><Check size={18} className="text-[#6bc4bb] shrink-0" /> Multi-location analytics</li>
                                <li className="flex gap-3"><Check size={18} className="text-[#6bc4bb] shrink-0" /> Custom user roles</li>
                                <li className="flex gap-3"><Check size={18} className="text-[#6bc4bb] shrink-0" /> Employee access management</li>
                            </ul>
                            <div className="mt-auto">
                                <button className="w-full bg-white border-2 border-[#f88863] text-[#f88863] font-extrabold py-3.5 rounded-xl hover:bg-[#f88863] hover:text-white transition-colors">GET STARTED</button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* SALONACARE PAYMENTS SECION */}
            <section className="py-20 px-6">
                <div className="max-w-[500px] mx-auto text-center">
                    <h2 className="text-3xl font-extrabold text-[#3a4454] mb-3">Salonacare <span className="text-[#6bc4bb] underline decoration-4 underline-offset-4">Payments</span></h2>
                    <p className="text-sm font-medium text-neutral-500 mb-10">Add-on to any Salonacare package</p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-[2rem] border border-neutral-100 shadow-xl overflow-hidden"
                    >
                        <div className="bg-[#f17ca3] text-white py-4 font-bold tracking-wider rounded-t-[2rem]">SALONACARE PAYMENTS</div>
                        <div className="p-10 text-left">
                            <ul className="space-y-4 mb-10 text-neutral-600 font-medium text-sm mx-auto max-w-[280px]">
                                <li className="flex gap-3"><Check size={18} className="text-[#6bc4bb] shrink-0" /> Payment Terminal</li>
                                <li className="flex gap-3"><Check size={18} className="text-[#6bc4bb] shrink-0" /> No shows / late cancel protection</li>
                                <li className="flex gap-3"><Check size={18} className="text-[#6bc4bb] shrink-0" /> Online pre-payments</li>
                                <li className="flex gap-3"><Check size={18} className="text-[#6bc4bb] shrink-0" /> Secure online links</li>
                                <li className="flex gap-3"><Check size={18} className="text-[#6bc4bb] shrink-0" /> Unified reporting</li>
                            </ul>
                            <button className="w-full bg-[#f88863] hover:bg-[#e67551] text-white font-extrabold py-3.5 rounded-xl transition-colors shadow-md hover:shadow-lg">GET STARTED</button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ADDITIONAL FEATURES SECTION */}
            <section className="py-20 px-6 bg-[#f7f9f9]">
                <div className="max-w-[1000px] mx-auto text-center">
                    <h2 className="text-3xl font-extrabold text-[#3a4454] mb-3">Additional <span className="text-[#6bc4bb] underline decoration-4 underline-offset-4">standout features</span></h2>
                    <p className="text-sm font-medium text-neutral-500 mb-10">Add-ons to any Premium package</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[800px] mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-[2rem] border border-neutral-100 shadow-xl overflow-hidden flex flex-col"
                        >
                            <div className="bg-[#f0a68d] text-white py-4 font-bold tracking-wider rounded-t-[2rem] text-sm md:text-base">PHYSICAL CARD READERS</div>
                            <div className="p-8 text-left flex-1 flex flex-col">
                                <ul className="space-y-4 mb-10 text-neutral-600 font-medium text-[13px] md:text-sm flex-1">
                                    <li className="flex gap-3"><Check size={18} className="text-[#f0a68d] shrink-0" /> Accept cards instantly</li>
                                    <li className="flex gap-3"><Check size={18} className="text-[#f0a68d] shrink-0" /> Highly competitive rates</li>
                                    <li className="flex gap-3"><Check size={18} className="text-[#f0a68d] shrink-0" /> Next-day payouts</li>
                                </ul>
                                <button className="w-full bg-white border-2 border-[#f88863] text-[#f88863] font-extrabold py-3 rounded-xl hover:bg-[#f88863] hover:text-white transition-colors">GET STARTED</button>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-[2rem] border border-neutral-100 shadow-xl overflow-hidden flex flex-col"
                        >
                            <div className="bg-[#a0ccc7] text-white py-4 font-bold tracking-wider rounded-t-[2rem] text-sm md:text-base">WEBSITE BUILDER</div>
                            <div className="p-8 text-left flex-1 flex flex-col">
                                <ul className="space-y-4 mb-10 text-neutral-600 font-medium text-[13px] md:text-sm flex-1">
                                    <li className="flex gap-3"><Check size={18} className="text-[#a0ccc7] shrink-0" /> Mobile adapted design</li>
                                    <li className="flex gap-3"><Check size={18} className="text-[#a0ccc7] shrink-0" /> Includes your custom domain name</li>
                                    <li className="flex gap-3"><Check size={18} className="text-[#a0ccc7] shrink-0" /> Fully synced with Salonacare booking</li>
                                </ul>
                                <button className="w-full bg-[#f88863] hover:bg-[#e67551] text-white font-extrabold py-3.5 rounded-xl transition-colors shadow-md">GET STARTED</button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* FEATURE COMPARISON TABLE */}
            <section className="py-24 px-6 max-w-[1200px] mx-auto overflow-x-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-[#3a4454] inline-flex flex-col relative">
                        <span>Feature <span className="text-[#6bc4bb] italic font-serif opacity-80 decoration-0">Comparison</span></span>
                    </h2>
                </div>

                <div className="min-w-[800px] bg-white rounded-2xl shadow-lg border border-neutral-100 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr>
                                <th className="p-4 bg-[#f8f9fa] border-b border-neutral-200"></th>
                                <th className="p-4 text-center text-xs font-bold text-white bg-[#f0a68d] border-b border-white w-32 tracking-wide uppercase rounded-tl-lg">START<br />PACKAGE</th>
                                <th className="p-4 text-center text-xs font-bold text-white bg-[#6bc4bb] border-b border-white w-32 tracking-wide uppercase">PRO<br />PACKAGE</th>
                                <th className="p-4 text-center text-xs font-bold text-white bg-[#f17ca3] border-b border-white w-32 tracking-wide uppercase">SALONACARE<br />PAYMENTS</th>
                                <th className="p-4 text-center text-xs font-bold text-white bg-[#6b7280] border-b border-white w-32 tracking-wide uppercase">BUSINESS<br />PACKAGE</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm font-medium text-neutral-600">
                            <tr>
                                <td colSpan={5} className="bg-[#e9ecef] p-3 text-xs font-bold tracking-wider text-[#495057] uppercase border-y border-white">⭐ BOOKINGS & AGENDA</td>
                            </tr>
                            {comparisonFeatures.map((f, i) => (
                                <motion.tr
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors"
                                >
                                    <td className="p-4 font-semibold text-neutral-700">{f.name}</td>
                                    <td className="p-4 text-center border-l border-neutral-100/50">{f.start ? <Check size={20} className="text-[#f0a68d] mx-auto" /> : <X size={18} className="text-neutral-300 mx-auto" />}</td>
                                    <td className="p-4 text-center border-l border-neutral-100/50">{f.pro ? <Check size={20} className="text-[#6bc4bb] mx-auto" /> : <X size={18} className="text-neutral-300 mx-auto" />}</td>
                                    <td className="p-4 text-center border-l border-neutral-100/50">{f.business ? <Check size={20} className="text-[#f17ca3] mx-auto" /> : <span className="text-neutral-300">—</span>}</td>
                                    <td className="p-4 text-center border-l border-neutral-100/50">{f.enterprise ? <Check size={20} className="text-[#6b7280] mx-auto" /> : <span className="text-neutral-300">—</span>}</td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    );
}
