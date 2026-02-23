"use client";

import ProNavbar from "../../../../components/ProNavbar";
import ProFooter from "../../../../components/ProFooter";
import { motion } from "framer-motion";
import { ChevronRight, Calendar, Calculator, Briefcase, TrendingUp } from "lucide-react";

export default function EmployeeManagementPage() {
    return (
        <main className="min-h-screen bg-white font-sans selection:bg-[#6bc4bb] selection:text-white">
            <ProNavbar />

            {/* HERO SECTION */}
            <section className="pt-24 pb-16 px-6 max-w-[1200px] mx-auto text-center relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto"
                >
                    <p className="text-[#6bc4bb] font-bold tracking-wide uppercase text-sm mb-4">Manage your business</p>
                    <h1 className="text-[40px] md:text-[54px] font-extrabold text-[#3a4454] leading-[1.1] mb-6 tracking-tight">
                        Lead with ease, <br />
                        <span className="relative inline-block"><span className="relative z-10">manage with confidence</span><span className="absolute bottom-1 left-0 w-full h-3 bg-[#e0efec] -z-0"></span></span>
                    </h1>
                    <p className="text-[#6b7280] text-[18px] md:text-[20px] font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
                        A complete software solution that makes it incredibly easy to arrange, track, and manage all your team members individually or in bulk.
                    </p>
                    <button
                        onClick={() => window.location.href = "/professionals/book-demo"}
                        className="bg-[#f88863] hover:bg-[#e67551] text-white font-extrabold py-4 px-10 rounded-xl shadow-[0_10px_25px_rgba(248,136,99,0.3)] hover:-translate-y-0.5 transition-all duration-300 text-[16px] tracking-wide uppercase"
                    >
                        BOOK YOUR DEMO
                    </button>
                </motion.div>
            </section>

            {/* OVERLAPPING HERO IMAGE & CARD SECTION */}
            <section className="relative px-6 mb-32 pt-16 mt-8">
                {/* Background horizontal banner */}
                <div className="absolute top-1/2 -translate-y-1/2 inset-x-0 h-[250px] bg-gradient-to-r from-[#dca484] to-[#f47ba0] z-0 opacity-90"></div>

                <div className="max-w-[1100px] mx-auto relative z-10 flex flex-col md:flex-row items-center justify-center">

                    {/* The overlapping card */}
                    <motion.div
                        initial={{ opacity: 0, x: -40, y: 20 }}
                        animate={{ opacity: 1, x: 0, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="bg-white rounded-[32px] p-8 md:p-12 shadow-2xl max-w-md relative z-20 md:-mr-16 md:mt-16 mb-8 md:mb-0 border border-neutral-50"
                    >
                        <p className="text-[#f88863] text-sm font-bold uppercase tracking-wider mb-2">Work Schedule Management</p>
                        <h2 className="text-[28px] md:text-[34px] font-extrabold text-[#3a4454] leading-[1.15] mb-4 tracking-tight">
                            Work breaks, leave & schedules organised in one place
                        </h2>
                        <p className="text-[#6b7280] text-[16px] leading-relaxed font-medium">
                            Play around with schedules... set up recurring shifts, modify rotas temporarily, insert holidays effortlessly. We do the math.
                        </p>
                    </motion.div>

                    {/* The image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-full max-w-[800px] rounded-3xl overflow-hidden shadow-2xl border-8 border-white bg-white relative z-10"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200"
                            alt="Employee Management Dashboard"
                            className="w-full h-auto object-cover aspect-video"
                        />
                    </motion.div>

                </div>
            </section>

            {/* FEATURE 2: Center text - White bg */}
            <section className="py-24 bg-white px-6">
                <div className="max-w-[800px] mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7 }}
                    >
                        <p className="text-[#6bc4bb] text-sm font-bold uppercase tracking-wider mb-2">Time Tracker</p>
                        <h2 className="text-[32px] md:text-[40px] font-extrabold text-[#3a4454] leading-[1.1] mb-6 tracking-tight">
                            All your team's work - tracked and documented
                        </h2>
                        <p className="text-[#6b7280] text-[17px] leading-relaxed font-medium">
                            Keep a detailed log of exact employee start times, break times, and clock-out moments. No more guessing games, just reliable objective records linked directly to your payroll export.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* FEATURE 3: Text Left - Gray background */}
            <section className="py-32 bg-[#f4f6f8] px-6">
                <div className="max-w-[1000px] mx-auto flex flex-col md:flex-row items-center gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7 }}
                        className="flex-1"
                    >
                        <p className="text-[#f88863] text-sm font-bold uppercase tracking-wider mb-2">Performance Reports</p>
                        <h2 className="text-[32px] md:text-[40px] font-extrabold text-[#3a4454] leading-[1.1] mb-6 tracking-tight">
                            All things performance-related: revenue, tips & more
                        </h2>
                        <p className="text-[#6b7280] text-[17px] leading-relaxed font-medium">
                            Track the growth and success of your staff on a daily or monthly basis. From product-to-service ratio metrics to direct tip allocation, stay deeply informed about everything that drives value in your salon.
                        </p>
                    </motion.div>
                    <div className="flex-1 hidden md:block"></div>
                </div>
            </section>

            {/* FEATURE 4: Center text - White bg */}
            <section className="py-32 bg-white px-6">
                <div className="max-w-[800px] mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7 }}
                    >
                        <p className="text-[#4b6dcb] text-sm font-bold uppercase tracking-wider mb-2">Employee Access Management</p>
                        <h2 className="text-[32px] md:text-[40px] font-extrabold text-[#3a4454] leading-[1.1] mb-6 tracking-tight">
                            Different employees <br />different access levels
                        </h2>
                        <p className="text-[#6b7280] text-[17px] leading-relaxed font-medium">
                            You dictate who sees what. Set robust permissions on an individual employee level. Disable visibility of financial stats for juniors, or grant complete operational autonomy to your designated managers.
                        </p>
                    </motion.div>
                </div>
            </section>


            {/* DISCOVER MORE BLOCK */}
            <section className="bg-white">
                <div className="flex flex-col md:flex-row items-stretch">
                    <div className="flex-1 bg-white flex justify-end py-24 px-6 md:px-12 lg:px-24 border-t border-r border-[#f4f6f8]">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.7 }}
                            className="max-w-md w-full"
                        >
                            <p className="text-[#3a4454] text-xl md:text-2xl font-medium mb-2 opacity-80">Manage your business</p>
                            <h2 className="text-3xl md:text-[40px] font-extrabold text-[#3a4454] leading-tight mb-6">
                                Discover <br />more <span className="text-[#6bc4bb]">benefits<br />and tools!</span>
                            </h2>
                            <p className="text-neutral-500 font-medium mb-8">
                                We know exactly what you need to manage your business effectively, because our software was built with you, for you.
                            </p>
                            <a href="/professionals/features/multi-location-support" className="inline-flex items-center gap-2 text-[#6bc4bb] font-bold hover:gap-3 transition-all uppercase tracking-wide text-sm">
                                View multi-location support <ChevronRight size={16} />
                            </a>
                        </motion.div>
                    </div>
                    <div className="flex-1 bg-[#f4f6f8] flex flex-col justify-center gap-6 py-24 px-6 md:px-12 lg:px-24">
                        <motion.a
                            href="/professionals/features/customer-management"
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow group flex items-start gap-4"
                        >
                            <Briefcase className="text-[#6bc4bb] mt-1 shrink-0" size={24} />
                            <div>
                                <h4 className="font-bold text-[#3a4454] mb-1 group-hover:text-[#6bc4bb] transition-colors">Customer management</h4>
                                <p className="text-sm text-neutral-500 font-medium">Keep track of client preferences, notes, and past appointments all in one profile.</p>
                            </div>
                        </motion.a>
                        <motion.a
                            href="/professionals/features/finance-and-statistics"
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow group flex items-start gap-4"
                        >
                            <TrendingUp className="text-[#f472b6] mt-1 shrink-0" size={24} />
                            <div>
                                <h4 className="font-bold text-[#3a4454] mb-1 group-hover:text-[#f472b6] transition-colors">Finance and statistics</h4>
                                <p className="text-sm text-neutral-500 font-medium">Know exactly how your business is performing with dynamic KPI dashboards.</p>
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
