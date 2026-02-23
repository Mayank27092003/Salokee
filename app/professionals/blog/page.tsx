"use client";

import ProNavbar from "../../../components/ProNavbar";
import ProFooter from "../../../components/ProFooter";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const blogPosts = [
    {
        title: "Email vs. SMS Marketing: Which Tool Works Best for Advertising Your Beauty Salon?",
        date: "3.2.2026",
        desc: "Email or SMS? See how Salonacare's marketing tools help beauty studios attract and retain clients. Read blog now.",
        tags: ["E-Mail", "SMS Marketing", "Advertising"],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800",
        slug: "email-vs-sms-marketing"
    },
    {
        title: "SMS Appointment Reminders: Reduce No-Shows by 70%",
        date: "5.2.2026",
        desc: "Empty chairs? Learn how automated SMS reminders cut no-shows, fill seats, and secure revenue.",
        tags: ["SMS reminders"],
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800",
        slug: "sms-appointment-reminders"
    },
    {
        title: "Unlock the Power of Personal Connection: Why Your Salon Needs a CRM",
        date: "9.2.2026",
        desc: "Discover how CRM & the 'Rule of 3' boost retention. Grow your salon with Salonacare.",
        tags: ["CRM software", "customer relationship management", "client files", "digital forms", "purchase history", "personal client notes", "birthday messages"],
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800",
        slug: "unlock-power-personal-connection"
    },
    {
        title: "Google Business Profile Salon: How to Win More Clients Online",
        date: "12.2.2026",
        desc: "A strong Google Business Profile for your salon ensures more bookings & strengthens your online presence with Salonacare.",
        tags: ["Google Business Profile", "Google Book Now Button"],
        image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?q=80&w=800",
        slug: "google-business-profile"
    },
    {
        title: "Why Social Proof Matters for Your Salon: Turning Trust into Bookings",
        date: "15.2.2026",
        desc: "Boost bookings with Social Proof ✅ GDPR-compliant client photos & reviews ► Learn more now",
        tags: ["GDPR", "Client Reviews", "Online Client Forms", "Booking Page", "Website Builder"],
        image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=800",
        slug: "why-social-proof-matters"
    }
];

export default function BlogPage() {
    const router = useRouter();

    return (
        <main className="min-h-screen bg-[#fbfaf9] font-sans selection:bg-[#f88863] selection:text-white">
            <ProNavbar />

            {/* HERO SECTION */}
            <section className="relative h-[400px] lg:h-[500px] w-full flex items-center justify-start overflow-hidden xl:px-8">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1621607512214-68297480165e?q=80&w=2000"
                        alt="Barber working"
                        className="w-full h-full object-cover"
                        style={{ objectPosition: 'center 30%' }}
                    />
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                {/* Max width container for alignment matching the site */}
                <div className="max-w-[1400px] w-full mx-auto px-6 relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl lg:text-7xl font-extrabold text-white tracking-tight drop-shadow-lg"
                    >
                        Blog
                    </motion.h1>
                </div>
            </section>

            {/* BLOG GRID */}
            <section className="py-24 px-6 relative z-20 -mt-20">
                <div className="max-w-[1400px] mx-auto columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                    {blogPosts.map((post, i) => (
                        <motion.article
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "100px" }}
                            transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
                            onClick={() => router.push(`/professionals/blog/${post.slug}`)}
                            className="bg-white rounded-[2rem] border border-neutral-100 shadow-[0_20px_40px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col hover:shadow-[0_25px_50px_rgba(0,0,0,0.08)] transition-all duration-300 transform hover:-translate-y-1 break-inside-avoid cursor-pointer"
                        >
                            <div className="relative h-[240px] w-full overflow-hidden">
                                <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                            </div>
                            <div className="p-8 flex-1 flex flex-col">
                                <h2 className="text-[22px] font-extrabold text-[#3a4454] leading-snug mb-2 min-h-[66px] hover:text-[#f88863] transition-colors cursor-pointer">
                                    <span className="underline decoration-[#e0eceb] decoration-4 underline-offset-4 line-clamp-3">{post.title}</span>
                                </h2>
                                <p className="text-[#a0aab8] text-sm font-medium mb-4">{post.date}</p>
                                <p className="text-neutral-500 font-medium leading-relaxed mb-8 flex-1">
                                    {post.desc}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-8">
                                    {post.tags.map((tag, idx) => (
                                        <span key={idx} className="border border-neutral-200 text-neutral-500 text-[11px] font-medium tracking-wide rounded-full px-3 py-1 bg-white hover:border-[#6bc4bb] hover:text-[#6bc4bb] transition-colors cursor-pointer">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </section>

            <ProFooter />
        </main>
    );
}
