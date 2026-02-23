"use client";

import { Facebook, Instagram, Linkedin, MapPin, Youtube } from "lucide-react";
import Link from "next/link";

export default function ProFooter() {
    return (
        <footer className="bg-white border-t border-neutral-200 pt-16 pb-8">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">

                    {/* Brand & Socials Column */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-2 mb-6 cursor-pointer" onClick={() => window.location.href = "/professionals"}>
                            <h1 className="text-2xl font-extrabold tracking-tight">
                                <span className="text-neutral-900">Solana</span>
                                <span className="text-[#f16335]">care</span>
                            </h1>
                        </div>
                        <p className="text-sm text-neutral-500 mb-6 leading-relaxed">
                            Professional salon management software created by beauty professionals throughout Europe.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://facebook.com/solanacare" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center rounded-full bg-neutral-100 text-neutral-600 hover:bg-[#f16335] hover:text-white transition-colors"><Facebook size={16} /></a>
                            <a href="https://instagram.com/solanacare" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center rounded-full bg-neutral-100 text-neutral-600 hover:bg-[#f16335] hover:text-white transition-colors"><Instagram size={16} /></a>
                            <a href="https://youtube.com/@solanacare" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center rounded-full bg-neutral-100 text-neutral-600 hover:bg-[#f16335] hover:text-white transition-colors"><Youtube size={16} /></a>
                            <a href="https://linkedin.com/company/solanacare" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center rounded-full bg-neutral-100 text-neutral-600 hover:bg-[#f16335] hover:text-white transition-colors"><Linkedin size={16} /></a>
                        </div>
                    </div>

                    {/* Features Column 1 */}
                    <div>
                        <h4 className="font-bold text-neutral-900 mb-4 text-[15px]">Features</h4>
                        <ul className="space-y-3">
                            <li><span className="text-[13px] font-bold text-neutral-800 mb-1 block">Manage your bookings</span></li>
                            <li><a href="/professionals/features/smart-agenda" className="text-[13px] text-neutral-500 hover:text-[#f88863]">Smart Agenda</a></li>
                            <li><a href="/professionals/features/online-bookings" className="text-[13px] text-neutral-500 hover:text-[#f88863] mb-4 block">Online bookings</a></li>

                            <li><span className="text-[13px] font-bold text-neutral-800 mb-1 block">Simplify your payments</span></li>
                            <li><a href="/professionals/features/pos-system" className="text-[13px] text-neutral-500 hover:text-[#8b5cf6]">POS system</a></li>
                            <li><a href="/professionals/features/salonacare-payments" className="text-[13px] text-neutral-500 hover:text-[#8b5cf6]">Salonacare Payments</a></li>
                        </ul>
                    </div>

                    {/* Features Column 2 */}
                    <div>
                        <h4 className="font-bold text-neutral-900 mb-4 text-[15px] opacity-0 hidden lg:block">Features 2</h4>
                        <ul className="space-y-3">
                            <li><span className="text-[13px] font-bold text-neutral-800 mb-1 block">Manage your business</span></li>
                            <li><a href="/professionals/features/customer-management" className="text-[13px] text-neutral-500 hover:text-[#6bc4bb]">Customer management</a></li>
                            <li><a href="/professionals/features/employee-management" className="text-[13px] text-neutral-500 hover:text-[#6bc4bb]">Employee management</a></li>
                            <li><a href="/professionals/features/finance-and-statistics" className="text-[13px] text-neutral-500 hover:text-[#6bc4bb]">Finance and statistics</a></li>
                            <li><a href="/professionals/features/multi-location-support" className="text-[13px] text-neutral-500 hover:text-[#6bc4bb] mb-4 block">Multi-location support</a></li>

                            <li><span className="text-[13px] font-bold text-neutral-800 mb-1 block">Grow your revenue</span></li>
                            <li><a href="/professionals/features/sell-online-24-7" className="text-[13px] text-neutral-500 hover:text-[#f472b6]">Sell online 24/7</a></li>
                            <li><a href="/professionals/features/grow-your-online-visibility" className="text-[13px] text-neutral-500 hover:text-[#f472b6]">Grow your online visibility</a></li>
                            <li><a href="/professionals/features/marketing-tools" className="text-[13px] text-neutral-500 hover:text-[#f472b6]">Marketing tools</a></li>
                        </ul>
                    </div>

                    {/* Find Us Column */}
                    <div>
                        <h4 className="font-bold text-neutral-900 mb-4 text-[15px]">Find Us</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2">
                                <MapPin size={16} className="text-neutral-400 mt-0.5 shrink-0" />
                                <span className="text-[13px] text-neutral-500">123 Wellness Ave, Suite 400<br />Luxembourg City, 1010</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <MapPin size={16} className="text-neutral-400 mt-0.5 shrink-0" />
                                <span className="text-[13px] text-neutral-500">45 Beauty Boulevard<br />Geneva, 1204</span>
                            </li>
                        </ul>
                    </div>

                    {/* About Us Column */}
                    <div>
                        <h4 className="font-bold text-neutral-900 mb-4 text-[15px]">About Us</h4>
                        <ul className="space-y-3">
                            <li><Link href="/professionals/hiring" className="text-[13px] text-neutral-500 hover:text-[#f16335]">Careers</Link></li>
                            <li><Link href="/professionals/contact" className="text-[13px] text-neutral-500 hover:text-[#f16335]">Contact</Link></li>
                            <li><Link href="/professionals/privacy-policy" className="text-[13px] text-neutral-500 hover:text-[#f16335]">Privacy Policy</Link></li>
                            <li><Link href="/professionals/terms" className="text-[13px] text-neutral-500 hover:text-[#f16335]">Terms of Service</Link></li>
                            <li><Link href="/professionals/legal" className="text-[13px] text-neutral-500 hover:text-[#f16335]">Legal Notice</Link></li>
                        </ul>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-neutral-100 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-neutral-400">© 2026 Salonacare S.A. All rights reserved.</p>
                    <div className="flex items-center gap-4 text-xs text-neutral-400 bg-neutral-900 text-white px-4 py-2 rounded-lg cursor-pointer">
                        🌍 English ▼
                    </div>
                </div>
            </div>
        </footer>
    );
}
