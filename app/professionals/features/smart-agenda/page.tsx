"use client";

import ProNavbar from "../../../../components/ProNavbar";
import ProFooter from "../../../../components/ProFooter";
import { motion } from "framer-motion";
import { ChevronRight, Calendar, Calculator, Briefcase, TrendingUp } from "lucide-react";

export default function SmartAgendaPage() {
    return (
        <main className="min-h-screen bg-white font-sans selection:bg-[#f88863] selection:text-white">
            <ProNavbar />

            {/* HERO SECTION */}
            <section className="pt-24 pb-32 px-6 max-w-[1200px] mx-auto text-center relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl mx-auto"
                >
                    <p className="text-[#f88863] font-bold tracking-wide uppercase text-sm mb-4">Manage your bookings</p>
                    <h1 className="text-[42px] md:text-[56px] font-extrabold text-[#3a4454] leading-[1.1] mb-6 tracking-tight">
                        Your new <br className="hidden md:block" />
                        favorite <span className="relative inline-block"><span className="relative z-10">calendar</span><span className="absolute bottom-1 left-0 w-full h-3 bg-[#cce8e5] -z-0"></span></span>
                    </h1>
                    <p className="text-[#6b7280] text-[18px] md:text-[20px] font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
                        A complete management tool that will simplify your daily life and that of your team.
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
                        src="https://images.unsplash.com/photo-1506784365847-bbad939e9335?q=80&w=1400"
                        alt="Smart Agenda Calendar Interface"
                        className="w-full max-w-[1000px] mx-auto rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-8 border-white object-cover aspect-[16/10]"
                    />
                </motion.div>
            </section>

            {/* SPACER SECTION */}
            <div className="h-20 bg-[#f4f6f8]"></div>

            {/* FEATURE 1: Text Right */}
            <section className="py-24 bg-[#f4f6f8] px-6">
                <div className="max-w-[1000px] mx-auto flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1 hidden md:block"></div>
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7 }}
                        className="flex-1"
                    >
                        <p className="text-[#f88863] text-sm font-bold uppercase tracking-wider mb-2">Customisable Schedule</p>
                        <h2 className="text-[32px] md:text-[40px] font-extrabold text-[#3a4454] leading-[1.1] mb-6 tracking-tight">
                            The agenda that adapts exactly to your team
                        </h2>
                        <p className="text-[#6b7280] text-[17px] leading-relaxed font-medium">
                            Every team is different. Personalise the calendar to your way of working, choose the views you like best and change them according to your needs. Simple and effective.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* FEATURE 2: Text Left - White bg */}
            <section className="py-24 bg-white px-6">
                <div className="max-w-[1000px] mx-auto flex flex-col md:flex-row items-center gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7 }}
                        className="flex-1"
                    >
                        <p className="text-[#6bc4bb] text-sm font-bold uppercase tracking-wider mb-2">Personalised Service Duration</p>
                        <h2 className="text-[32px] md:text-[40px] font-extrabold text-[#3a4454] leading-[1.1] mb-6 tracking-tight">
                            Duration based on employee or client profile
                        </h2>
                        <p className="text-[#6b7280] text-[17px] leading-relaxed font-medium">
                            The time spent on each service is no longer the same for everyone! Personalise it according to each team member or according to your clients. Gain time and avoid unpleasant surprises.
                        </p>
                    </motion.div>
                    <div className="flex-1 hidden md:block"></div>
                </div>
            </section>

            {/* FEATURE 3: Banner with Center Card */}
            <section className="py-32 relative px-6">
                <div className="absolute inset-0 bg-gradient-to-r from-[#f7aa7f] via-[#f37c68] to-[#e85b6a] z-0"></div>
                <div className="max-w-[1000px] mx-auto relative z-10 flex justify-center">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7 }}
                        className="bg-white rounded-[32px] p-10 md:p-14 shadow-2xl max-w-2xl text-center relative overflow-hidden"
                    >
                        <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#e0eff0] rounded-full opacity-50"></div>
                        <p className="text-[#6bc4bb] text-sm font-bold uppercase tracking-wider mb-3 relative z-10">Automated Reminders</p>
                        <h2 className="text-[32px] md:text-[40px] font-extrabold text-[#3a4454] leading-[1.1] mb-6 tracking-tight relative z-10">
                            Drastically reduce <br />your no-shows
                        </h2>
                        <p className="text-[#6b7280] text-[17px] leading-relaxed font-medium relative z-10">
                            Send automatic confirmation and reminder SMS to your clients. Reduce no-shows and last-minute cancellations. It’s a game changer!
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* FEATURE 4: Text Left - White bg */}
            <section className="py-24 bg-white px-6">
                <div className="max-w-[1000px] mx-auto flex flex-col md:flex-row items-center gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7 }}
                        className="flex-1"
                    >
                        <p className="text-[#4b6dcb] text-sm font-bold uppercase tracking-wider mb-2">History Logs</p>
                        <h2 className="text-[32px] md:text-[40px] font-extrabold text-[#3a4454] leading-[1.1] mb-6 tracking-tight">
                            Keep track of everything, always
                        </h2>
                        <p className="text-[#6b7280] text-[17px] leading-relaxed font-medium">
                            Access the entire history of an appointment to understand what happened. Keep track of modifications, cancellations and see who made what change and when.
                        </p>
                    </motion.div>
                    <div className="flex-1 hidden md:block"></div>
                </div>
            </section>

            {/* FEATURE 5: Banner with Left Card */}
            <section className="py-32 relative px-6">
                <div className="absolute inset-0 bg-gradient-to-r from-[#f7ae84] to-[#ea6275] z-0 opacity-90"></div>
                <div className="max-w-[1000px] mx-auto relative z-10 flex justify-start">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7 }}
                        className="bg-white rounded-[32px] p-10 md:p-14 shadow-2xl max-w-xl text-left"
                    >
                        <p className="text-[#6bc4bb] text-sm font-bold uppercase tracking-wider mb-3">Group Sessions</p>
                        <h2 className="text-[32px] md:text-[36px] font-extrabold text-[#3a4454] leading-[1.1] mb-6 tracking-tight">
                            Bring your clients together in a single appointment
                        </h2>
                        <p className="text-[#6b7280] text-[17px] leading-relaxed font-medium">
                            Whether it’s a yoga class or a training session, easily organise group appointments. Define the number of participants, maximum capacity and manage everything smoothly.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* FEATURE 6: Text Right - White bg */}
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
                        <p className="text-[#f88863] text-sm font-bold uppercase tracking-wider mb-2">Caller ID Recognition</p>
                        <h2 className="text-[32px] md:text-[40px] font-extrabold text-[#3a4454] leading-[1.1] mb-6 tracking-tight">
                            Know who is calling you before answering
                        </h2>
                        <p className="text-[#6b7280] text-[17px] leading-relaxed font-medium">
                            When your phone rings, instantly see the name of the client calling you. Provide a personalised welcome and easily find their client file without having to ask for their details.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* FEATURE 7: Banner with Center/Left Card */}
            <section className="py-32 relative px-6">
                <div className="absolute inset-0 bg-gradient-to-r from-[#eb6577] via-[#f28670] to-[#f6a87e] z-0 opacity-90"></div>
                <div className="max-w-[1000px] mx-auto relative z-10 flex justify-center">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7 }}
                        className="bg-white rounded-[32px] p-10 md:p-14 shadow-2xl max-w-xl text-left"
                    >
                        <p className="text-[#f88863] text-sm font-bold uppercase tracking-wider mb-3">Waiting List</p>
                        <h2 className="text-[32px] md:text-[36px] font-extrabold text-[#3a4454] leading-[1.1] mb-6 tracking-tight">
                            Don’t miss any more appointments
                        </h2>
                        <p className="text-[#6b7280] text-[17px] leading-relaxed font-medium">
                            A cancellation? Rather than leaving an empty slot, easily add clients to your waiting list. You will be alerted as soon as a slot becomes available to replace them.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* DISCOVER MORE BLOCK */}
            <section className="bg-white">
                <div className="flex flex-col md:flex-row items-stretch">
                    <div className="flex-1 bg-white flex justify-end py-24 px-6 md:px-12 lg:px-24 border-r border-neutral-100">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.7 }}
                            className="max-w-md w-full"
                        >
                            <p className="text-[#3a4454] text-xl md:text-2xl font-medium mb-2 opacity-80">Manage your business</p>
                            <h2 className="text-3xl md:text-[40px] font-extrabold text-[#3a4454] leading-tight mb-6">
                                Discover <br />more <span className="text-[#519f97]">benefits<br />and tools!</span>
                            </h2>
                            <p className="text-neutral-500 font-medium mb-8">
                                We know exactly what you need to manage your business effectively, because our software was built with you, for you.
                            </p>
                            <a href="/professionals/features/employee-management" className="inline-flex items-center gap-2 text-[#519f97] font-bold hover:gap-3 transition-all uppercase tracking-wide text-sm">
                                View employee management <ChevronRight size={16} />
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
