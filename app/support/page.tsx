"use client";

import { motion } from "framer-motion";
import { Search, Mail, PhoneCall, HelpCircle, FileText, ChevronDown } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useState } from "react";

const faqs = [
    {
        question: "How do I create a new salon profile?",
        answer: "To create a salon profile, click on the 'Professionals' button on the homepage, select 'Book a Demo' or sign up directly. Follow the onboarding steps to enter your location, services, and working hours.",
        category: "getting-started"
    },
    {
        question: "Is there a free trial for professionals?",
        answer: "Yes! We offer a 14-day free demo to explore our smart agenda, POS system, and marketing tools before committing to a plan.",
        category: "billing"
    },
    {
        question: "Can I manage multiple locations from one account?",
        answer: "Absolutely. Salonacare's multi-location support allows you to easily switch between your different venues and view unified performance statistics.",
        category: "features"
    },
    {
        question: "How do customers book an appointment?",
        answer: "Customers can simply search for salons by location or name, view available services and time slots, and confirm their booking instantly without making a phone call.",
        category: "getting-started"
    },
    {
        question: "Are automatic reminders sent to customers?",
        answer: "Yes, you can configure automatic SMS and email reminders to significantly reduce no-shows. These are sent based on your preferred timeframe before the appointment.",
        category: "features"
    },
];

export default function SupportPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const filteredFaqs = faqs.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <main className="min-h-screen bg-neutral-50 font-sans flex flex-col selection:bg-[#f16335] selection:text-white">
            <Navbar />

            {/* HERO SECTION */}
            <section className="pt-28 pb-20 px-6 max-w-[1200px] mx-auto text-center relative w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl mx-auto space-y-6"
                >
                    <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-sm">
                        <HelpCircle className="text-[#f16335]" size={32} />
                    </div>
                    <h1 className="text-[40px] md:text-[56px] font-extrabold text-neutral-900 leading-[1.1] tracking-tight">
                        How can we <span className="text-[#f16335]">help you?</span>
                    </h1>
                    <p className="text-neutral-500 text-[18px] md:text-[20px] font-medium max-w-2xl mx-auto leading-relaxed">
                        Find answers to frequently asked questions, read our detailed guides, or get in touch with our support team.
                    </p>

                    <div className="relative max-w-xl mx-auto mt-10">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="text-neutral-400" size={20} />
                        </div>
                        <input
                            type="text"
                            className="w-full pl-12 pr-4 py-4 rounded-xl border border-neutral-200 bg-white shadow-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#f16335]/20 focus:border-[#f16335] transition-all"
                            placeholder="Search for articles, guides passing..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </motion.div>
            </section>

            {/* CONTACT CARDS */}
            <section className="py-12 bg-white px-6 border-y border-neutral-100">
                <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="p-8 rounded-[24px] bg-neutral-50 border border-neutral-100 hover:shadow-lg transition-shadow text-center flex flex-col items-center group cursor-pointer"
                    >
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform text-neutral-700 group-hover:text-[#f16335]">
                            <Mail size={20} />
                        </div>
                        <h3 className="font-bold text-neutral-900 mb-2">Email Support</h3>
                        <p className="text-sm text-neutral-500 mb-4">Drop us an email anytime and we'll get back within 24 hours.</p>
                        <span className="text-[#f16335] font-semibold text-sm">support@salonacare.com</span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="p-8 rounded-[24px] bg-neutral-50 border border-neutral-100 hover:shadow-lg transition-shadow text-center flex flex-col items-center group cursor-pointer"
                    >
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform text-neutral-700 group-hover:text-[#f16335]">
                            <PhoneCall size={20} />
                        </div>
                        <h3 className="font-bold text-neutral-900 mb-2">Call Us</h3>
                        <p className="text-sm text-neutral-500 mb-4">Our lines are open Mon-Fri, from 9:00 AM to 6:00 PM.</p>
                        <span className="text-[#f16335] font-semibold text-sm">+41 22 555 1234</span>
                    </motion.div>

                    <motion.div
                        onClick={() => window.location.href = "/guides"}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="p-8 rounded-[24px] bg-orange-50 border border-orange-100 hover:shadow-lg transition-shadow text-center flex flex-col items-center group cursor-pointer"
                    >
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform text-orange-600 group-hover:text-[#f16335]">
                            <FileText size={20} />
                        </div>
                        <h3 className="font-bold text-orange-900 mb-2">Read Guides</h3>
                        <p className="text-sm text-orange-700/80 mb-4">Browse our comprehensive list of step-by-step tutorials.</p>
                        <span className="text-orange-600 font-semibold text-sm">View Database →</span>
                    </motion.div>
                </div>
            </section>

            {/* FAQ SECTION */}
            <section className="py-24 px-6 bg-neutral-50 flex-1">
                <div className="max-w-[800px] mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-[32px] font-extrabold text-neutral-900 mb-4">Frequently Asked Questions</h2>
                        <p className="text-neutral-500">Can't find the answer you're looking for? Check out our guides or reach out to support.</p>
                    </div>

                    <div className="space-y-4">
                        {filteredFaqs.length > 0 ? (
                            filteredFaqs.map((faq, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.05 }}
                                    className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm"
                                >
                                    <button
                                        onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                        className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none"
                                    >
                                        <span className={`font-semibold text-[16px] transition-colors ${openFaq === index ? "text-[#f16335]" : "text-neutral-900"}`}>{faq.question}</span>
                                        <ChevronDown className={`shrink-0 text-neutral-400 transition-transform duration-300 ${openFaq === index ? "rotate-180" : ""}`} size={20} />
                                    </button>

                                    <motion.div
                                        initial={false}
                                        animate={{ height: openFaq === index ? "auto" : 0, opacity: openFaq === index ? 1 : 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-6 pb-6 pt-2 text-neutral-500 leading-relaxed border-t border-neutral-100 mx-6 mt-2">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-neutral-400 text-lg">No results found for "{searchQuery}".</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
