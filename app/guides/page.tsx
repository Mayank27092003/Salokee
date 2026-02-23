"use client";

import { motion } from "framer-motion";
import { BookOpen, Map, Smartphone, CalendarDays, BarChart, Settings, PlayCircle, ArrowRight } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

// Sample data for the guides
const categories = [
    { id: "getting-started", label: "Getting Started" },
    { id: "calendar", label: "Calendar & Bookings" },
    { id: "marketing", label: "Marketing Tools" },
    { id: "payments", label: "Payments & POS" },
];

const guides = [
    {
        title: "Setting up your Salon Profile",
        description: "Learn how to configure your business hours, upload your logo, and add your very first services to your new profile.",
        icon: <Settings size={24} className="text-[#f16335]" />,
        category: "getting-started",
        readTime: "5 min read",
        type: "article"
    },
    {
        title: "Mastering the Smart Agenda",
        description: "A comprehensive video tutorial on how to drag, drop, and resize appointments, as well as managing employee schedules.",
        icon: <CalendarDays size={24} className="text-[#f16335]" />,
        category: "calendar",
        readTime: "12 min watch",
        type: "video"
    },
    {
        title: "Configuring Online Bookings",
        description: "Step-by-step instructions on how to embed the booking widget on your own website or share your direct booking link.",
        icon: <Smartphone size={24} className="text-[#f16335]" />,
        category: "getting-started",
        readTime: "8 min read",
        type: "article"
    },
    {
        title: "Understanding Financial Reports",
        description: "Dive deep into the statistics dashboard. Learn how to export your end-of-day reports and track your top-performing services.",
        icon: <BarChart size={24} className="text-[#f16335]" />,
        category: "payments",
        readTime: "10 min read",
        type: "article"
    },
    {
        title: "Running your first SMS Campaign",
        description: "See how to filter your client database and send a targeted promotional SMS blast to fill up quiet days.",
        icon: <Map size={24} className="text-[#f16335]" />,
        category: "marketing",
        readTime: "6 min read",
        type: "article"
    },
    {
        title: "Managing Multiple Locations",
        description: "Best practices for switching between venues and assigning staff to different locations on specific days.",
        icon: <BookOpen size={24} className="text-[#f16335]" />,
        category: "getting-started",
        readTime: "7 min read",
        type: "article"
    }
];

export default function GuidesPage() {
    return (
        <main className="min-h-screen bg-neutral-50 font-sans flex flex-col selection:bg-[#f16335] selection:text-white">
            <Navbar />

            {/* HERO SECTION */}
            <section className="pt-28 pb-16 px-6 max-w-[1200px] mx-auto text-center relative w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl mx-auto space-y-6"
                >
                    <p className="text-[#f16335] font-bold tracking-wide uppercase text-sm mb-4">Knowledge Base</p>
                    <h1 className="text-[40px] md:text-[56px] font-extrabold text-neutral-900 leading-[1.1] tracking-tight">
                        Master <span className="text-[#f16335]">Salonacare</span>
                    </h1>
                    <p className="text-neutral-500 text-[18px] md:text-[20px] font-medium max-w-2xl mx-auto leading-relaxed">
                        Explore our comprehensive library of guides, video tutorials, and best practices to get the absolute most out of your salon software.
                    </p>
                </motion.div>
            </section>

            <section className="px-6 pb-24 flex-1">
                <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-12">

                    {/* SIDEBAR NAVIGATION */}
                    <div className="lg:w-64 shrink-0">
                        <div className="sticky top-32">
                            <h3 className="font-bold text-neutral-900 mb-6 text-lg tracking-tight">Categories</h3>
                            <ul className="space-y-2">
                                <li>
                                    <button className="w-full text-left px-4 py-2.5 rounded-lg bg-orange-50 text-[#f16335] font-semibold transition-colors">
                                        All Guides
                                    </button>
                                </li>
                                {categories.map(cat => (
                                    <li key={cat.id}>
                                        <button className="w-full text-left px-4 py-2.5 rounded-lg text-neutral-500 hover:text-neutral-900 font-medium hover:bg-neutral-100 transition-colors">
                                            {cat.label}
                                        </button>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-12 bg-white p-6 rounded-2xl border border-neutral-200 text-center shadow-sm">
                                <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4 text-neutral-700">
                                    <PlayCircle size={20} />
                                </div>
                                <h4 className="font-bold text-neutral-900 mb-2">Prefer Video?</h4>
                                <p className="text-sm text-neutral-500 mb-4">Visit our YouTube channel for complete masterclasses and webinars.</p>
                                <a href="https://youtube.com/@solanacare" target="_blank" rel="noreferrer" className="text-[#f16335] font-semibold text-sm hover:underline">
                                    Watch Tutorials →
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* GUIDES GRID */}
                    <div className="flex-1">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {guides.map((guide, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    className="bg-white rounded-[24px] p-8 border border-neutral-200 hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col h-full hover:border-[#f16335]/30 relative overflow-hidden"
                                >
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#f16335] to-[#f88863] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                                    <div className="flex justify-between items-start mb-6">
                                        <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                            {guide.icon}
                                        </div>
                                        <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${guide.type === 'video' ? 'bg-purple-50 text-purple-600' : 'bg-neutral-100 text-neutral-500'}`}>
                                            {guide.type}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-extrabold text-neutral-900 mb-3 leading-tight group-hover:text-[#f16335] transition-colors">{guide.title}</h3>
                                    <p className="text-neutral-500 font-medium leading-relaxed mb-6 flex-1">
                                        {guide.description}
                                    </p>

                                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-neutral-100">
                                        <span className="text-xs font-semibold text-neutral-400">{guide.readTime}</span>
                                        <div className="text-[#f16335] flex items-center gap-1 font-bold text-sm transform group-hover:translate-x-1 transition-transform">
                                            Read More <ArrowRight size={16} />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-12 text-center">
                            <button className="px-6 py-3 bg-white border border-neutral-200 text-neutral-700 font-bold rounded-xl hover:bg-neutral-50 hover:shadow-sm transition-all text-sm">
                                Load More Guides
                            </button>
                        </div>
                    </div>

                </div>
            </section>

            <Footer />
        </main>
    );
}
