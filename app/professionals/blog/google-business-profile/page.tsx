"use client";

import ProNavbar from "../../../../components/ProNavbar";
import ProFooter from "../../../../components/ProFooter";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function GBPBlogPage() {
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
                    <span className="text-[#a0ccc7] text-sm font-bold tracking-wider uppercase bg-[#e9f2f0] px-4 py-1.5 rounded-full">Google Business</span>
                    <span className="text-neutral-500 text-sm font-bold tracking-wider uppercase bg-neutral-100 px-4 py-1.5 rounded-full">12.2.2026</span>
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#3a4454] tracking-tight leading-tight mb-8"
                >
                    Google Business Profile Salon: <br /><span className="text-[#a0ccc7]">How to Win More Clients Online</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-lg md:text-xl text-neutral-500 font-medium max-w-2xl mx-auto leading-relaxed"
                >
                    A strong Google Business Profile ensures more bookings and strengthens your online presence organically.
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
                        src="https://images.unsplash.com/photo-1533750349088-cd871a92f312?q=80&w=1600"
                        alt="Local SEO map interface"
                        className="w-full h-full object-cover grayscale-[30%]"
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
                        When someone in your city searches for "best hair salon near me" or "nail studio in [City]", who shows up first? If it's not you, you are leaving thousands of dollars on the table every month. A fully optimized Google Business Profile (GBP) is no longer optional; it's a critical component of local SEO.
                    </p>

                    <h2 className="text-3xl font-bold text-[#3a4454] mt-12 mb-6">Key Takeaways for Your Salon</h2>

                    <div className="space-y-6 mb-10 text-[17px] mt-8 bg-[#fbfaf9] p-8 rounded-2xl border border-neutral-100">
                        <div className="flex">
                            <div className="shrink-0 mt-1 mr-4 w-6 h-6 rounded-full bg-[#f88863] text-white flex items-center justify-center font-bold text-sm">1</div>
                            <p className="font-medium"><strong>Complete Every Section:</strong> Don't just add your name and address. Include hours, attributes (e.g., wheelchair accessible), categories, and services.</p>
                        </div>
                        <div className="flex">
                            <div className="shrink-0 mt-1 mr-4 w-6 h-6 rounded-full bg-[#f88863] text-white flex items-center justify-center font-bold text-sm">2</div>
                            <p className="font-medium"><strong>High-Quality Photos:</strong> Upload interior shots, exterior shots, team photos, and your best work. Profiles with photos see 42% more requests for directions.</p>
                        </div>
                        <div className="flex">
                            <div className="shrink-0 mt-1 mr-4 w-6 h-6 rounded-full bg-[#f88863] text-white flex items-center justify-center font-bold text-sm">3</div>
                            <p className="font-medium"><strong>Reviews Are King:</strong> Encourage satisfied clients to leave a 5-star review locally. Respond to *every* review, both positive and negative.</p>
                        </div>
                    </div>

                    <h2 className="text-3xl font-bold text-[#3a4454] mt-12 mb-6">The Magic of the 'Book Now' Button</h2>
                    <p className="mb-6 leading-relaxed">
                        Visibility is great, but conversion is better. The biggest advantage of an optimized Google Business Profile is the ability to integrate a direct "Reserve" or "Book Now" button right into the search results.
                    </p>
                    <p className="mb-8 leading-relaxed">
                        Instead of reading reviews, navigating to your website, finding the booking page, and selecting a time, the client books instantly from Google Search or Google Maps. This frictionless experience drastically increases your conversion rates.
                    </p>

                    <h2 className="text-3xl font-bold text-[#3a4454] mt-12 mb-6">Automate Your Reputation with Salonacare</h2>
                    <p className="mb-8 leading-relaxed">
                        Salonacare seamlessly integrates with your Google Business Profile. Not only do we provide the direct "Book Now" integration (Reserve with Google), but our automated review campaigns guarantee a steady stream of fresh, 5-star reviews from verified clients after their appointments. Start dominating local search today.
                    </p>

                    <button
                        onClick={() => router.push("/professionals/book-demo")}
                        className="bg-[#f88863] hover:bg-[#e67551] text-white font-extrabold py-4 px-8 rounded-xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
                    >
                        Connect Google with Salonacare
                    </button>
                </motion.div>
            </section>

            <ProFooter />
        </main>
    );
}
