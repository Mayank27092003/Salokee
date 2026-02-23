"use client";

import ProNavbar from "../../../../components/ProNavbar";
import ProFooter from "../../../../components/ProFooter";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function EmailVsSmsBlogPage() {
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
                    <span className="text-[#6bc4bb] text-sm font-bold tracking-wider uppercase bg-[#e4f4f2] px-4 py-1.5 rounded-full">Marketing</span>
                    <span className="text-neutral-500 text-sm font-bold tracking-wider uppercase bg-neutral-100 px-4 py-1.5 rounded-full">3.2.2026</span>
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#3a4454] tracking-tight leading-tight mb-8"
                >
                    Email vs. SMS Marketing: <br /><span className="text-[#6bc4bb]">Which Tool Works Best?</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-lg md:text-xl text-neutral-500 font-medium max-w-2xl mx-auto leading-relaxed"
                >
                    See how Salonacare's marketing tools help beauty studios attract and retain clients effectively.
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
                        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600"
                        alt="Marketing Strategy"
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
                        In the beauty industry, keeping your salon chairs filled is just as important as the services you offer. But when it comes to reaching out to your clients, which channel is more effective: Email or SMS?
                    </p>

                    <h2 className="text-3xl font-bold text-[#3a4454] mt-12 mb-6">The Power of SMS</h2>
                    <p className="mb-6 leading-relaxed">
                        SMS marketing boasts an incredible open rate of up to 98%, with most messages read within the first three minutes. This makes it the ultimate tool for time-sensitive promotions, last-minute cancellations, and appointment reminders.
                    </p>
                    <ul className="space-y-4 mb-10 text-[17px]">
                        <li className="flex items-start"><span className="text-[#f88863] font-bold mr-3">✓</span> Instant delivery and immediate attention.</li>
                        <li className="flex items-start"><span className="text-[#f88863] font-bold mr-3">✓</span> Perfect for quick updates and simple promotions.</li>
                        <li className="flex items-start"><span className="text-[#f88863] font-bold mr-3">✓</span> Significantly reduces no-shows through automated reminders.</li>
                    </ul>

                    <h2 className="text-3xl font-bold text-[#3a4454] mt-12 mb-6">The Depth of Email</h2>
                    <p className="mb-6 leading-relaxed">
                        While SMS is fast, email allows for depth. It's the perfect medium for a monthly newsletter, introducing a new staff member, showcasing before-and-after photos, or announcing a comprehensive new service menu.
                    </p>
                    <div className="bg-[#f2efeb] p-8 rounded-2xl mb-10 border-l-4 border-[#6bc4bb]">
                        <p className="font-medium text-[#3a4454] m-0 italic">
                            "Using a combination of both channels creates a cohesive communication strategy. Use email for storytelling and SMS for action."
                        </p>
                    </div>

                    <h2 className="text-3xl font-bold text-[#3a4454] mt-12 mb-6">How Salonacare Integrates Both</h2>
                    <p className="mb-8 leading-relaxed">
                        With Salonacare's built-in marketing suite, you don't have to choose. Our platform allows you to segment your clients effortlessly and send targeted campaigns through their preferred channels. Automate your reminders via SMS while engaging your loyal base with monthly email newsletters.
                    </p>

                    <button
                        onClick={() => router.push("/professionals/book-demo")}
                        className="bg-[#f88863] hover:bg-[#e67551] text-white font-extrabold py-4 px-8 rounded-xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
                    >
                        Explore Marketing Features
                    </button>
                </motion.div>
            </section>

            <ProFooter />
        </main>
    );
}
