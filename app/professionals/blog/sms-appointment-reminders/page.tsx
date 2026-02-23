"use client";

import ProNavbar from "../../../../components/ProNavbar";
import ProFooter from "../../../../components/ProFooter";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function SmsRemindersBlogPage() {
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
                    <span className="text-[#6bc4bb] text-sm font-bold tracking-wider uppercase bg-[#e4f4f2] px-4 py-1.5 rounded-full">SMS Reminders</span>
                    <span className="text-neutral-500 text-sm font-bold tracking-wider uppercase bg-neutral-100 px-4 py-1.5 rounded-full">5.2.2026</span>
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#3a4454] tracking-tight leading-tight mb-8"
                >
                    SMS Appointment Reminders: <br /><span className="text-[#6bc4bb]">Reduce No-Shows by 70%</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-lg md:text-xl text-neutral-500 font-medium max-w-2xl mx-auto leading-relaxed"
                >
                    Empty chairs cost you money. Learn how automated SMS reminders cut down no-shows and secure revenues.
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
                        src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1600"
                        alt="Reading SMS on a smartphone"
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
                        Every salon owner knows the sinking feeling of a "no-show". Not only does it leave a gap in your schedule, but it also translates directly into lost revenue. But what if a simple text message could solve this problem?
                    </p>

                    <h2 className="text-3xl font-bold text-[#3a4454] mt-12 mb-6">The Hidden Cost of No-Shows</h2>
                    <p className="mb-6 leading-relaxed">
                        It's not just the immediate service cost that's lost. It's the wasted time of your staff, the overhead that's still ticking, and the denial of that time slot to another paying client. Let's do the math: two missed appointments a week can easily add up to thousands of dollars lost annually.
                    </p>

                    <div className="bg-[#fcf3f0] p-8 rounded-2xl mb-10 border-l-4 border-[#f88863]">
                        <h4 className="font-bold text-[#f88863] text-xl mb-3">Why SMS wins for reminders:</h4>
                        <ul className="space-y-3 mb-0 text-base">
                            <li className="flex items-center"><strong className="mr-2">Speed:</strong> SMS messages are typically read within 3 minutes of receiving them.</li>
                            <li className="flex items-center"><strong className="mr-2">Open Rates:</strong> With open rates hovering around 98%, your message is virtually guaranteed to be seen.</li>
                            <li className="flex items-center"><strong className="mr-2">Convenience:</strong> Clients can easily click a link or reply to confirm right from their notification screen.</li>
                        </ul>
                    </div>

                    <h2 className="text-3xl font-bold text-[#3a4454] mt-12 mb-6">How Automation Saves You Time</h2>
                    <p className="mb-6 leading-relaxed">
                        Manually calling every client the day before is exhausting and inefficient. Automating this process means your front desk can focus on what matters most: the client experience inside the salon.
                    </p>
                    <p className="mb-8 leading-relaxed">
                        With Salonacare's intuitive system, you set the rules once. "Send an SMS 24 hours before the appointment." It's that simple. We handle the heavy lifting while you watch your no-show rate plummet by up to 70%.
                    </p>

                    <button
                        onClick={() => router.push("/professionals/book-demo")}
                        className="bg-[#f88863] hover:bg-[#e67551] text-white font-extrabold py-4 px-8 rounded-xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
                    >
                        Learn How SMS Works with Salonacare
                    </button>
                </motion.div>
            </section>

            <ProFooter />
        </main>
    );
}
