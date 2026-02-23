"use client";

import ProNavbar from "../../../../components/ProNavbar";
import ProFooter from "../../../../components/ProFooter";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function CrmBlogPage() {
    const router = useRouter();

    return (
        <main className="min-h-screen bg-white font-sans selection:bg-[#f88863] selection:text-white">
            <ProNavbar />

            {/* BLOG HERO */}
            <section className="pt-32 pb-16 px-6 max-w-[900px] mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-wrap justify-center gap-2 mb-6"
                >
                    <span className="text-[#f17ca3] text-sm font-bold tracking-wider uppercase bg-[#fce5ed] px-4 py-1.5 rounded-full">CRM</span>
                    <span className="text-neutral-500 text-sm font-bold tracking-wider uppercase bg-neutral-100 px-4 py-1.5 rounded-full">9.2.2026</span>
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#3a4454] tracking-tight leading-tight mb-8"
                >
                    Unlock the Power of <br /><span className="text-[#f17ca3]">Personal Connection</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-lg md:text-xl text-neutral-500 font-medium max-w-2xl mx-auto leading-relaxed"
                >
                    Why your salon needs a robust CRM to boost retention, loyalty, and revenue through relationship building.
                </motion.p>
            </section>

            {/* BLOG IMAGE */}
            <section className="max-w-[1100px] mx-auto px-6 mb-20">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="w-full aspect-video rounded-3xl overflow-hidden shadow-2xl relative"
                >
                    <img
                        src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1600"
                        alt="Salon client checking out"
                        className="w-full h-full object-cover"
                    />
                </motion.div>
            </section>

            {/* BLOG CONTENT */}
            <section className="max-w-[750px] mx-auto px-6 pb-32">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="prose prose-lg md:prose-xl text-neutral-600 font-sans"
                >
                    <p className="font-medium leading-relaxed mb-8">
                        The beauty industry is fundamentally built on human connections. While technical skill brings a client in the door, it is the personal relationship that keeps them coming back. How do you scale that feeling of individualized attention? Enter the CRM (Customer Relationship Management) system.
                    </p>

                    <h2 className="text-3xl font-bold text-[#3a4454] mt-12 mb-6">Beyond Names and Phone Numbers</h2>
                    <p className="mb-6 leading-relaxed">
                        A modern salon CRM is more than a digital address book. It is a comprehensive diary of your client's journey. From tracking specific hair color formulas and product purchases to remembering anniversaries and beverage preferences.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 mt-8">
                        <div className="bg-white border border-neutral-100 shadow-md p-6 rounded-2xl border-t-4 border-t-[#6bc4bb]">
                            <h4 className="font-bold text-[#3a4454] mb-2 text-lg">Purchase History</h4>
                            <p className="text-base text-neutral-500">Track retail purchases to recommend complementary products on their next visit.</p>
                        </div>
                        <div className="bg-white border border-neutral-100 shadow-md p-6 rounded-2xl border-t-4 border-t-[#f88863]">
                            <h4 className="font-bold text-[#3a4454] mb-2 text-lg">Personal Notes</h4>
                            <p className="text-base text-neutral-500">Record life events and preferences to greet them personally securely.</p>
                        </div>
                    </div>

                    <h2 className="text-3xl font-bold text-[#3a4454] mt-12 mb-6">The 'Rule of 3' in Client Retention</h2>
                    <p className="mb-6 leading-relaxed">
                        Industry statistics show that if you can get a client to visit your salon three times, their likelihood of becoming a lifelong customer jumps exponentially. A CRM allows you to execute targeted follow-ups efficiently:
                    </p>
                    <ul className="space-y-4 mb-10 text-[17px]">
                        <li className="flex items-start"><span className="text-[#f17ca3] font-bold mr-3">1.</span> <strong>First Visit:</strong> Automated "Thank you" SMS with a first-time client survey.</li>
                        <li className="flex items-start"><span className="text-[#f17ca3] font-bold mr-3">2.</span> <strong>Second Visit:</strong> Reminder email highlighting a new service based on their profile.</li>
                        <li className="flex items-start"><span className="text-[#f17ca3] font-bold mr-3">3.</span> <strong>Third Visit:</strong> Automated addition to your loyalty rewards program.</li>
                    </ul>

                    <h2 className="text-3xl font-bold text-[#3a4454] mt-12 mb-6">Seamless Execution with Salonacare</h2>
                    <p className="mb-8 leading-relaxed">
                        Salonacare securely integrates digital forms directly into client files, ensuring you are 100% GDPR compliant while providing a world-class, personalized experience. Your staff approaches every appointment informed, confident, and ready to WOW the client.
                    </p>

                    <button
                        onClick={() => router.push("/professionals/book-demo")}
                        className="bg-[#f88863] hover:bg-[#e67551] text-white font-extrabold py-4 px-8 rounded-xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
                    >
                        Try Salonacare CRM
                    </button>
                </motion.div>
            </section>

            <ProFooter />
        </main>
    );
}
