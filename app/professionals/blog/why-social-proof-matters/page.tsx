"use client";

import ProNavbar from "../../../../components/ProNavbar";
import ProFooter from "../../../../components/ProFooter";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function SocialProofBlogPage() {
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
                    <span className="text-[#f17ca3] text-sm font-bold tracking-wider uppercase bg-[#fce5ed] px-4 py-1.5 rounded-full">Client Reviews</span>
                    <span className="text-neutral-500 text-sm font-bold tracking-wider uppercase bg-neutral-100 px-4 py-1.5 rounded-full">15.2.2026</span>
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#3a4454] tracking-tight leading-tight mb-8"
                >
                    Why Social Proof Matters: <br /><span className="text-[#f17ca3]">Turning Trust into Bookings</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-lg md:text-xl text-neutral-500 font-medium max-w-2xl mx-auto leading-relaxed"
                >
                    Boost bookings with Social Proof. Learn how GDPR-compliant client photos and reviews can elevate your brand.
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
                        src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1600"
                        alt="Online client reviews on screen"
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
                        We live in an age where trust is established before a client ever walks through your doors. They research you, look at your Instagram, and read your online reviews. This collective endorsement from other people is known as "Social Proof", and it's the strongest marketing tool in your arsenal.
                    </p>

                    <h2 className="text-3xl font-bold text-[#3a4454] mt-12 mb-6">The Power of Reviews</h2>
                    <p className="mb-6 leading-relaxed">
                        Data shows that nearly 90% of consumers read reviews before visiting a local business. When potential clients see that dozens of others have had fantastic experiences at your salon, their hesitation disappears. A robust collection of positive reviews acts as an automated sales engine, converting curious onlookers into paying clients.
                    </p>

                    <h2 className="text-3xl font-bold text-[#3a4454] mt-12 mb-6">Show, Don't Just Tell</h2>
                    <p className="mb-6 leading-relaxed">
                        Reviews are excellent, but visual proof is even better. Before-and-after photos of your actual work validate your team's skills instantly. However, managing client consent for these photos can be an administrative nightmare.
                    </p>

                    <div className="bg-[#e4f4f2] p-8 rounded-2xl mb-10 border border-[#c1dfdb]">
                        <h4 className="font-bold text-[#4a9b93] text-xl mb-3">The GDPR Challenge Solved</h4>
                        <p className="mb-0 text-[#4a9b93] text-base leading-relaxed">
                            Handling client data and media safely is critical. Getting explicit consent to post photos online is no longer a verbal agreement; it must be documented to comply with GDPR regulations.
                        </p>
                    </div>

                    <h2 className="text-3xl font-bold text-[#3a4454] mt-12 mb-6">Automating Trust with Salonacare</h2>
                    <p className="mb-8 leading-relaxed">
                        Salonacare simplifies the entire process. Our digital forms allow clients to give explicit, GDPR-compliant consent for their photos to be used in marketing, directly during their appointment. Furthermore, our automated post-appointment emails gently nudge happy clients to leave reviews across the platforms that matter most.
                    </p>

                    <button
                        onClick={() => router.push("/professionals/book-demo")}
                        className="bg-[#f88863] hover:bg-[#e67551] text-white font-extrabold py-4 px-8 rounded-xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
                    >
                        Start Building Trust with Salonacare
                    </button>
                </motion.div>
            </section>

            <ProFooter />
        </main>
    );
}
