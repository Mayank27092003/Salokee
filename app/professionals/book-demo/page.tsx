"use client";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function BookDemoPage() {
    return (
        <main className="min-h-screen bg-neutral-50 flex flex-col">
            {/* Pro Navbar Variant */}
            <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b border-neutral-100">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-20">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.href = "/"}>
                        <h1 className="text-2xl lg:text-3xl font-bold">
                            <span className="text-neutral-800">Solana</span>
                            <span className="text-orange-500">care</span>
                        </h1>
                    </div>
                    <div className="hidden lg:flex items-center space-x-8 text-neutral-600 font-semibold text-sm">
                        <Link href="/professionals" className="hover:text-orange-500 cursor-pointer">Features</Link>
                        <Link href="/professionals/case-studies" className="hover:text-orange-500 cursor-pointer">Case studies</Link>
                        <Link href="/professionals/why-salonacare" className="hover:text-orange-500 cursor-pointer">Why Salonacare</Link>
                        <Link href="/professionals/pricing" className="hover:text-orange-500 cursor-pointer">Pricing</Link>
                        <Link href="/professionals/blog" className="hover:text-orange-500 cursor-pointer">Blog</Link>
                    </div>
                    <div>
                        <button className="bg-orange-500 text-white font-bold px-6 py-2.5 rounded-lg shadow-sm hover:bg-orange-600 transition-colors uppercase text-sm">
                            Book your demo
                        </button>
                    </div>
                </div>
            </nav>

            <div className="flex-1 flex flex-col lg:flex-row">
                {/* Left Side: Image */}
                <div className="hidden lg:block lg:w-5/12 relative bg-neutral-900 border-r border-neutral-100">
                    <img
                        src="https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?q=80&w=2000"
                        alt="Aesthetic salon"
                        className="absolute inset-0 w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    <div className="absolute bottom-12 left-12 right-12 text-white z-10">
                        <h2 className="text-3xl font-bold mb-4 leading-tight">Join 15,000+ happy salons</h2>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3"><CheckCircle2 className="text-orange-500" /> Zero setup fees</li>
                            <li className="flex items-center gap-3"><CheckCircle2 className="text-orange-500" /> Personalized onboarding</li>
                            <li className="flex items-center gap-3"><CheckCircle2 className="text-orange-500" /> Support 7 days a week</li>
                        </ul>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="flex-1 py-12 px-6 lg:px-24 bg-white overflow-y-auto">
                    <div className="max-w-xl mx-auto lg:mx-0">
                        <h1 className="text-3xl lg:text-4xl font-extrabold text-neutral-900 mb-4">
                            Book your <span className="text-orange-500">free,</span><br />
                            personalized demo!
                        </h1>
                        <p className="text-neutral-600 mb-8 leading-relaxed">
                            If you are a salon owner please fill out the form below. A member of our local team will contact you as soon as possible to explain how Salonacare can meet the specific needs of your salon.
                        </p>

                        <p className="text-sm italic text-neutral-500 mb-8 border-l-4 border-neutral-200 pl-4">
                            If you wish to book an appointment with your hairdresser, beautician, etc. please visit <a href="/" className="text-orange-500 hover:underline">salonacare.com</a>.
                        </p>

                        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                            <div>
                                <label className="block text-sm font-semibold text-neutral-700 mb-1">Salon Name <span className="text-red-500">*</span></label>
                                <input type="text" className="w-full bg-neutral-100 border border-transparent rounded-lg px-4 py-3 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all" />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-neutral-700 mb-1">Salon owner <span className="text-red-500">*</span></label>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <input type="text" className="w-full bg-neutral-100 border border-transparent rounded-lg px-4 py-3 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all" />
                                        <p className="text-xs text-neutral-500 mt-1">First Name</p>
                                    </div>
                                    <div>
                                        <input type="text" className="w-full bg-neutral-100 border border-transparent rounded-lg px-4 py-3 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all" />
                                        <p className="text-xs text-neutral-500 mt-1">Last Name</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-neutral-700 mb-1">Email <span className="text-red-500">*</span></label>
                                <input type="email" className="w-full bg-neutral-100 border border-transparent rounded-lg px-4 py-3 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all" />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-neutral-700 mb-1">Phone number <span className="text-red-500">*</span></label>
                                <div className="flex gap-4">
                                    <div className="w-1/3">
                                        <select className="w-full bg-neutral-100 border border-transparent rounded-lg px-4 py-3 focus:bg-white focus:border-orange-500 outline-none transition-all appearance-none">
                                            <option>-Select-</option>
                                            <option>+352</option>
                                            <option>+32</option>
                                            <option>+41</option>
                                        </select>
                                        <p className="text-xs text-neutral-500 mt-1">Code</p>
                                    </div>
                                    <div className="w-2/3">
                                        <input type="tel" className="w-full bg-neutral-100 border border-transparent rounded-lg px-4 py-3 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all" />
                                        <p className="text-xs text-neutral-500 mt-1">Number</p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-neutral-700 mb-1">Zip code <span className="text-red-500">*</span></label>
                                    <input type="text" className="w-full bg-neutral-100 border border-transparent rounded-lg px-4 py-3 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-neutral-700 mb-1">Country <span className="text-red-500">*</span></label>
                                    <select className="w-full bg-neutral-100 border border-transparent rounded-lg px-4 py-3 focus:bg-white focus:border-orange-500 outline-none transition-all appearance-none">
                                        <option>-Select-</option>
                                        <option>Luxembourg</option>
                                        <option>Belgium</option>
                                        <option>Switzerland</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-neutral-700 mb-3">Number of employees <span className="text-red-500">*</span></label>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 cursor-pointer text-sm">
                                        <input type="radio" name="employees" className="accent-orange-500 w-4 h-4 cursor-pointer" /> 0-1
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer text-sm">
                                        <input type="radio" name="employees" className="accent-orange-500 w-4 h-4 cursor-pointer" /> 2-4
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer text-sm">
                                        <input type="radio" name="employees" className="accent-orange-500 w-4 h-4 cursor-pointer" /> 5-7
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer text-sm">
                                        <input type="radio" name="employees" className="accent-orange-500 w-4 h-4 cursor-pointer" /> 8+
                                    </label>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-neutral-700 mb-1">Where did you hear about Salonacare?</label>
                                <select className="w-full bg-neutral-100 border border-transparent rounded-lg px-4 py-3 focus:bg-white focus:border-orange-500 outline-none transition-all appearance-none">
                                    <option>-Select-</option>
                                    <option>Facebook</option>
                                    <option>Instagram</option>
                                    <option>Recommendation</option>
                                    <option>Google</option>
                                </select>
                            </div>

                            <p className="text-xs text-neutral-500 leading-relaxed">
                                By submitting this form, you agree to be contacted by Salonacare regarding our solutions. You may receive information about our services and can unsubscribe at any time.
                            </p>

                            <button className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-3 px-8 rounded-lg shadow-sm transition-colors uppercase text-sm">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
