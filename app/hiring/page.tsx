"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function HiringPage() {
    return (
        <main className="min-h-screen bg-neutral-50 flex flex-col">
            <Navbar />

            {/* HERO SECTION */}
            <section className="bg-white py-24 border-b border-neutral-200 text-center px-4">
                <div className="max-w-3xl mx-auto">
                    <span className="text-orange-500 font-bold uppercase tracking-widest text-sm mb-4 block">Careers</span>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-neutral-900 mb-6 drop-shadow-sm">
                        Join the <span className="text-orange-500">Salonacare</span> family
                    </h1>
                    <p className="text-lg md:text-xl text-neutral-600 leading-relaxed max-w-2xl mx-auto">
                        We are fundamentally changing how beauty professionals manage and grow their businesses. Come shape the future of the wellness industry with us.
                    </p>
                </div>
            </section>

            {/* OPEN POSITIONS */}
            <section className="py-20 flex-1 px-4">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold text-neutral-900 mb-8">Open Positions</h2>

                    <div className="space-y-4">
                        {[
                            { title: "Senior Frontend Engineer", dept: "Engineering", loc: "Luxembourg / Remote", type: "Full-time" },
                            { title: "B2B Sales Representative", dept: "Sales", loc: "Switzerland", type: "Full-time" },
                            { title: "Customer Success Manager", dept: "Support", loc: "Belgium", type: "Full-time" },
                            { title: "Product Designer", dept: "Design", loc: "Remote", type: "Full-time" },
                        ].map((job, i) => (
                            <div key={i} className="bg-white border border-neutral-200 rounded-xl p-6 sm:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-orange-500 hover:shadow-lg transition-all cursor-pointer group">
                                <div>
                                    <h3 className="text-xl font-bold text-neutral-800 mb-2 group-hover:text-orange-500 transition-colors">{job.title}</h3>
                                    <div className="flex flex-wrap gap-3 text-sm text-neutral-500 font-medium">
                                        <span className="bg-neutral-100 px-3 py-1 rounded-full">{job.dept}</span>
                                        <span className="bg-neutral-100 px-3 py-1 rounded-full">{job.loc}</span>
                                        <span className="bg-neutral-100 px-3 py-1 rounded-full">{job.type}</span>
                                    </div>
                                </div>
                                <button className="bg-neutral-900 text-white font-bold py-2.5 px-6 rounded-lg group-hover:bg-orange-500 transition-colors whitespace-nowrap self-start md:self-auto">
                                    Apply Now
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 bg-orange-50 rounded-2xl p-8 border border-orange-100 text-center">
                        <h3 className="text-xl font-bold text-neutral-800 mb-3">Don't see a fit?</h3>
                        <p className="text-neutral-600 mb-6 max-w-lg mx-auto">
                            We're always looking for talented people to join our team. Send us an open application and we'll reach out if something opens up.
                        </p>
                        <button className="bg-white border-2 border-orange-500 text-orange-500 font-bold py-3 px-8 rounded-xl hover:bg-orange-500 hover:text-white transition-colors">
                            Send Open Application
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}