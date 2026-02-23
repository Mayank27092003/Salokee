"use client";

import ProNavbar from "../../../../components/ProNavbar";
import ProFooter from "../../../../components/ProFooter";
import { motion } from "framer-motion";
import { ChevronRight, Calendar, Calculator, Briefcase, TrendingUp, ShoppingBag, Gift, CreditCard } from "lucide-react";

export default function SellOnlinePage() {
    return (
        <main className="min-h-screen bg-white font-sans selection:bg-[#f472b6] selection:text-white">
            <ProNavbar />

            {/* HERO SECTION */}
            <section className="pt-24 pb-16 px-6 max-w-[1200px] mx-auto text-center relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto"
                >
                    <p className="text-[#f472b6] font-bold tracking-wide uppercase text-sm mb-4">A full range of sales channels</p>
                    <h1 className="text-[40px] md:text-[54px] font-extrabold text-[#3a4454] leading-[1.1] mb-6 tracking-tight">
                        Keep earning <br />
                        <span className="relative inline-block"><span className="relative z-10">while you sleep</span><span className="absolute bottom-1 left-0 w-full h-3 bg-[#fce7f3] -z-0"></span></span>
                    </h1>
                    <p className="text-[#6b7280] text-[18px] md:text-[20px] font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
                        Increase your turnover and the visibility of your salon, spa or barbershop, and generate more online sales effortlessly.
                    </p>
                    <button
                        onClick={() => window.location.href = "/professionals/book-demo"}
                        className="bg-[#f88863] hover:bg-[#e67551] text-white font-extrabold py-4 px-10 rounded-xl shadow-[0_10px_25px_rgba(248,136,99,0.3)] hover:-translate-y-0.5 transition-all duration-300 text-[16px] tracking-wide uppercase"
                    >
                        BOOK YOUR DEMO
                    </button>
                </motion.div>
            </section>

            {/* THREE CARDS & BACKGROUND BANNER */}
            <section className="relative pt-16 mt-8 mb-32">
                {/* Background horizontal banner */}
                <div className="absolute bottom-0 w-full h-[60%] bg-gradient-to-r from-[#eb9b8f] via-[#ef8280] to-[#e47683] z-0 opacity-90"></div>

                <div className="max-w-[1100px] mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12">

                        {/* Card 1 */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="bg-white rounded-[32px] p-8 shadow-[0_20px_40px_rgba(0,0,0,0.08)] border-8 border-white text-center flex flex-col items-center gap-6"
                        >
                            <div className="w-full bg-[#e0efec] text-[#519f97] font-bold py-3 rounded-xl uppercase tracking-wider text-sm">Subscriptions</div>
                            <CreditCard size={60} className="text-[#f47ba0] mb-2" strokeWidth={1} />
                            <div className="w-full h-24 bg-neutral-100 rounded-xl mt-auto"></div>
                        </motion.div>

                        {/* Card 2 */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-white rounded-[32px] p-8 shadow-[0_20px_40px_rgba(0,0,0,0.08)] border-8 border-white text-center flex flex-col items-center gap-6 mt-0 md:-mt-8"
                        >
                            <div className="w-full bg-[#fce7f3] text-[#f472b6] font-bold py-3 rounded-xl uppercase tracking-wider text-sm">E-Shop</div>
                            <ShoppingBag size={60} className="text-[#f47ba0] mb-2" strokeWidth={1} />
                            <div className="flex gap-2 justify-center w-full mt-auto">
                                <div className="h-10 w-24 bg-[#93c5fd] rounded-lg"></div>
                                <div className="h-10 w-24 bg-[#c4b5fd] rounded-lg"></div>
                            </div>
                        </motion.div>

                        {/* Card 3 */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="bg-white rounded-[32px] p-8 shadow-[0_20px_40px_rgba(0,0,0,0.08)] border-8 border-white text-center flex flex-col items-center gap-6"
                        >
                            <div className="w-full bg-[#e0efec] text-[#519f97] font-bold py-3 rounded-xl uppercase tracking-wider text-sm">Gift Vouchers</div>
                            <Gift size={60} className="text-[#f88863] mb-2" strokeWidth={1} />
                            <div className="text-3xl font-extrabold text-[#3a4454] mt-auto">50 €</div>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* FEATURE 2: Center text with card */}
            <section className="py-24 bg-white px-6">
                <div className="max-w-[700px] mx-auto flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7 }}
                        className="bg-white rounded-[32px] p-10 md:p-14 shadow-xl border border-neutral-100"
                    >
                        <p className="text-[#f88863] text-sm font-bold uppercase tracking-wider mb-2">Online Gift Vouchers</p>
                        <h2 className="text-[32px] md:text-[38px] font-extrabold text-[#3a4454] leading-[1.1] mb-6 tracking-tight">
                            Spread joy, <br />boost sales
                        </h2>
                        <p className="text-[#6b7280] text-[17px] leading-relaxed font-medium">
                            Allow your customers to buy vouchers directly from their sofa, for themselves or to offer to family/friends. You'll engage both existing customers and win new clients through word-of-mouth.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* FEATURE 3: Banner with Left Card */}
            <section className="py-32 relative px-6 mt-16">
                <div className="absolute inset-0 bg-gradient-to-r from-[#dca484] to-[#f47ba0] z-0 opacity-90"></div>
                <div className="max-w-[1000px] mx-auto relative z-10 flex justify-start">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7 }}
                        className="bg-white rounded-[32px] p-10 md:p-14 shadow-2xl max-w-xl text-left"
                    >
                        <p className="text-[#f472b6] text-sm font-bold uppercase tracking-wider mb-2">Online Subscriptions</p>
                        <h2 className="text-[32px] md:text-[38px] font-extrabold text-[#3a4454] leading-[1.1] mb-6 tracking-tight">
                            Foster loyalty, <br />fuel revenue
                        </h2>
                        <p className="text-[#6b7280] text-[17px] leading-relaxed font-medium">
                            Set up auto-renewing subscriptions directly linked to loyalty programs. It becomes impossible for a member to skip a month, seamlessly driving retention and regular income into your business.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* FEATURE 4: Center text - White bg */}
            <section className="py-24 bg-white px-6">
                <div className="max-w-[800px] mx-auto text-center border border-[#e0eff0] rounded-[40px] p-12 md:p-16 shadow-[0_10px_30px_rgba(0,0,0,0.02)] object-cover bg-white">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7 }}
                    >
                        <p className="text-[#4b6dcb] text-sm font-bold uppercase tracking-wider mb-2">Shopify & WooCommerce Integration</p>
                        <h2 className="text-[32px] md:text-[40px] font-extrabold text-[#3a4454] leading-[1.1] mb-6 tracking-tight">
                            Integrate your e-shop with Salonacare
                        </h2>
                        <p className="text-[#6b7280] text-[17px] leading-relaxed font-medium mb-8">
                            We've pre-built native integrations for the biggest platforms.
                        </p>
                        <div className="flex flex-col md:flex-row gap-6 justify-center max-w-xl mx-auto items-center">
                            <div className="bg-neutral-50 px-8 py-4 rounded-xl border border-neutral-100 flex items-center justify-center font-bold text-[#95bf47] text-xl shadow-sm w-full">Shopify</div>
                            <div className="bg-neutral-50 px-8 py-4 rounded-xl border border-neutral-100 flex items-center justify-center font-bold text-[#7b519d] text-xl shadow-sm w-full">WooCommerce</div>
                        </div>
                        <p className="text-[#6b7280] text-[15px] leading-relaxed font-medium mt-8 max-w-xl mx-auto">
                            If your pos reads a sale online, your inventory is updated locally simultaneously. Fully synced inventory across multiple locations. No more out-of-stock items, just streamlined online retail!
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
                            <p className="text-[#3a4454] text-xl md:text-2xl font-medium mb-2 opacity-80">Grow your revenue</p>
                            <h2 className="text-3xl md:text-[40px] font-extrabold text-[#3a4454] leading-tight mb-6">
                                Discover <br />more <span className="text-[#519f97]">benefits<br />and tools!</span>
                            </h2>
                            <p className="text-neutral-500 font-medium mb-8">
                                Give your salon the digital presence it deserves and make sure customers choose you.
                            </p>
                            <a href="/professionals/features/grow-your-online-visibility" className="inline-flex items-center gap-2 text-[#519f97] font-bold hover:gap-3 transition-all uppercase tracking-wide text-sm">
                                View online visibility <ChevronRight size={16} />
                            </a>
                        </motion.div>
                    </div>
                    <div className="flex-1 bg-[#f4f6f8] flex flex-col justify-center gap-6 py-24 px-6 md:px-12 lg:px-24">
                        <motion.a
                            href="/professionals/features/marketing-tools"
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow group flex items-start gap-4"
                        >
                            <Briefcase className="text-[#6bc4bb] mt-1 shrink-0" size={24} />
                            <div>
                                <h4 className="font-bold text-[#3a4454] mb-1 group-hover:text-[#6bc4bb] transition-colors">Marketing tools</h4>
                                <p className="text-sm text-neutral-500 font-medium">Capture their attention with beautiful SMS marketing and retain them with powerful loyalty systems.</p>
                            </div>
                        </motion.a>
                        <motion.a
                            href="/professionals/features/pos-system"
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow group flex items-start gap-4"
                        >
                            <Calculator className="text-[#8b5cf6] mt-1 shrink-0" size={24} />
                            <div>
                                <h4 className="font-bold text-[#3a4454] mb-1 group-hover:text-[#8b5cf6] transition-colors">POS System</h4>
                                <p className="text-sm text-neutral-500 font-medium">Make checkout seamless when buying products and services in-store natively.</p>
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
