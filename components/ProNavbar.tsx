"use client";

import { useState } from "react";
import { ChevronDown, Calendar, Calculator, Briefcase, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function ProNavbar() {
    const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-neutral-100">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-8 flex items-center justify-between h-[72px]">

                {/* Logo */}
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.href = "/professionals"}>
                    <h1 className="text-[28px] font-extrabold tracking-tight">
                        <span className="text-neutral-900">Solana</span>
                        <span className="text-[#f16335]">care</span> {/* Exact Salonkee Orange */}
                    </h1>
                </div>

                {/* Desktop Links */}
                <div className="hidden lg:flex items-center space-x-8 text-[15px] font-medium text-neutral-600">

                    {/* Features Dropdown Trigger */}
                    <div
                        className="relative h-[72px] flex items-center"
                        onMouseEnter={() => setIsFeaturesOpen(true)}
                        onMouseLeave={() => setIsFeaturesOpen(false)}
                    >
                        <button className="flex items-center gap-1 hover:text-[#f16335] transition-colors h-full">
                            Features <ChevronDown size={14} className={`transition-transform ${isFeaturesOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Mega Menu Dropdown */}
                        {isFeaturesOpen && (
                            <div className="absolute top-[72px] left-1/2 -translate-x-1/2 w-[1100px] bg-white border border-neutral-100 shadow-xl rounded-b-3xl p-10 grid grid-cols-3 gap-12 cursor-default">
                                {/* Column 1: Bookings & Payments */}
                                <div className="flex flex-col gap-10">
                                    <div>
                                        <div className="flex items-center gap-3 mb-6">
                                            <Calendar className="text-[#f88863]" size={24} />
                                            <h3 className="font-extrabold text-neutral-800 text-lg">Manage your bookings</h3>
                                        </div>
                                        <div className="space-y-6">
                                            <div>
                                                <Link href="/professionals/features/smart-agenda"><h4 className="font-bold text-[#f88863] text-[15px] mb-1.5 hover:underline cursor-pointer">Smart Agenda</h4></Link>
                                                <p className="text-[13px] text-neutral-500 leading-relaxed font-medium">Personalised Service Duration • Automated Reminders • History Logs • Group Sessions • Caller ID Recognition • Waiting List</p>
                                            </div>
                                            <div>
                                                <Link href="/professionals/features/online-bookings"><h4 className="font-bold text-[#f88863] text-[15px] mb-1.5 hover:underline cursor-pointer">Online bookings</h4></Link>
                                                <p className="text-[13px] text-neutral-500 leading-relaxed font-medium">Customisable Schedule • No-Show Policy • Automated Reminders</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center gap-3 mb-6">
                                            <Calculator className="text-[#8b5cf6]" size={24} />
                                            <h3 className="font-extrabold text-neutral-800 text-lg">Simplify your payments</h3>
                                        </div>
                                        <div className="space-y-6">
                                            <div>
                                                <Link href="/professionals/features/pos-system"><h4 className="font-bold text-[#8b5cf6] text-[15px] mb-1.5 hover:underline cursor-pointer">POS system</h4></Link>
                                                <p className="text-[13px] text-neutral-500 leading-relaxed font-medium">Integrated POS & Payment Terminal • Inventory Management</p>
                                            </div>
                                            <div>
                                                <Link href="/professionals/features/salonacare-payments"><h4 className="font-bold text-[#8b5cf6] text-[15px] mb-1.5 hover:underline cursor-pointer">Salonacare Payments</h4></Link>
                                                <p className="text-[13px] text-neutral-500 leading-relaxed font-medium">Secured Payment Terminal • No-Show Policy • Online Gift Vouchers • Online Subscriptions</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Column 2: Business */}
                                <div>
                                    <div className="flex items-center gap-3 mb-6">
                                        <Briefcase className="text-[#6bc4bb]" size={24} />
                                        <h3 className="font-extrabold text-neutral-800 text-lg">Manage your business</h3>
                                    </div>
                                    <div className="space-y-6">
                                        <div>
                                            <Link href="/professionals/features/customer-management"><h4 className="font-bold text-[#6bc4bb] text-[15px] mb-1.5 hover:underline cursor-pointer">Customer management</h4></Link>
                                            <p className="text-[13px] text-neutral-500 leading-relaxed font-medium">Comprehensive Client Profile • Interactive Client Profile • Forms</p>
                                        </div>
                                        <div>
                                            <Link href="/professionals/features/employee-management"><h4 className="font-bold text-[#6bc4bb] text-[15px] mb-1.5 hover:underline cursor-pointer">Employee management</h4></Link>
                                            <p className="text-[13px] text-neutral-500 leading-relaxed font-medium">Work Schedule Management • Time Tracker • Performance Reports • Employee Access Management</p>
                                        </div>
                                        <div>
                                            <Link href="/professionals/features/finance-and-statistics"><h4 className="font-bold text-[#6bc4bb] text-[15px] mb-1.5 hover:underline cursor-pointer">Finance and statistics</h4></Link>
                                            <p className="text-[13px] text-neutral-500 leading-relaxed font-medium">Instant Accounting Report • Detailed Employee Performance</p>
                                        </div>
                                        <div>
                                            <Link href="/professionals/features/multi-location-support"><h4 className="font-bold text-[#6bc4bb] text-[15px] mb-1.5 hover:underline cursor-pointer">Multi-location support</h4></Link>
                                            <p className="text-[13px] text-neutral-500 leading-relaxed font-medium">Unified Command Center • Centralised Customer Hub • Centralised Inventory • Shared Gift Vouchers & Loyalty Points • Centralized Performance Dashboard</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Column 3: Revenue */}
                                <div>
                                    <div className="flex items-center gap-3 mb-6">
                                        <TrendingUp className="text-[#f472b6]" size={24} />
                                        <h3 className="font-extrabold text-neutral-800 text-lg">Grow your revenue</h3>
                                    </div>
                                    <div className="space-y-6">
                                        <div>
                                            <Link href="/professionals/features/sell-online-24-7"><h4 className="font-bold text-[#f472b6] text-[15px] mb-1.5 hover:underline cursor-pointer">Sell online 24/7</h4></Link>
                                            <p className="text-[13px] text-neutral-500 leading-relaxed font-medium">Online Gift Vouchers • Online Subscriptions • Shopify & WooCommerce Integration</p>
                                        </div>
                                        <div>
                                            <Link href="/professionals/features/grow-your-online-visibility"><h4 className="font-bold text-[#f472b6] text-[15px] mb-1.5 hover:underline cursor-pointer">Grow your online visibility</h4></Link>
                                            <p className="text-[13px] text-neutral-500 leading-relaxed font-medium">Local Spotlight • SEO Optimised Salon Page • Google 'Book Online' Button • Website Builder</p>
                                        </div>
                                        <div>
                                            <Link href="/professionals/features/marketing-tools"><h4 className="font-bold text-[#f472b6] text-[15px] mb-1.5 hover:underline cursor-pointer">Marketing tools</h4></Link>
                                            <p className="text-[13px] text-neutral-500 leading-relaxed font-medium">SMS Campaigns • Gift Vouchers • Promo Codes • Subscriptions • Loyalty Program</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <Link href="/professionals/case-studies" className="hover:text-[#f16335] transition-colors">Case studies</Link>
                    <Link href="/professionals/why-salonacare" className="hover:text-[#f16335] transition-colors">Why Salonacare</Link>
                    <Link href="/professionals/pricing" className="hover:text-[#f16335] transition-colors">Pricing</Link>
                    <Link href="/professionals/blog" className="hover:text-[#f16335] transition-colors">Blog</Link>

                    <button
                        onClick={() => window.location.href = "/professionals/book-demo"}
                        className="bg-[#f16335] hover:bg-[#e05428] text-white font-bold px-6 py-2.5 rounded-lg shadow-sm transition-colors text-sm"
                    >
                        BOOK YOUR DEMO
                    </button>

                    <div className="flex items-center gap-1.5 cursor-pointer pl-6 border-l-[2px] border-neutral-100 hover:text-[#f16335] transition-colors group">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-500 group-hover:text-[#f16335]"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                        <span className="text-[15px] font-bold">EN</span>
                        <ChevronDown size={16} className="text-neutral-500 group-hover:text-[#f16335]" />
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <div className="lg:hidden">
                    <button className="text-neutral-600">☰</button>
                </div>
            </div>
        </nav>
    );
}
