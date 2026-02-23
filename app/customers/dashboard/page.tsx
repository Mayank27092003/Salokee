"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, MapPin, Star, History } from "lucide-react";

export default function DashboardOverviewPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-neutral-800 tracking-tight">Welcome back, Sarah! 👋</h1>
                <p className="text-neutral-500 mt-2 text-base md:text-lg">Here is an overview of your beauty & wellness schedule.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-neutral-100 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                        <Calendar size={24} />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-neutral-500">Upcoming</p>
                        <p className="text-2xl font-bold text-neutral-800">2 appts</p>
                    </div>
                </div>
                <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-neutral-100 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-peach/10 flex items-center justify-center text-peach">
                        <Star size={24} />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-neutral-500">Favorites</p>
                        <p className="text-2xl font-bold text-neutral-800">5 salons</p>
                    </div>
                </div>
                <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-neutral-100 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-500">
                        <History size={24} />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-neutral-500">Completed</p>
                        <p className="text-2xl font-bold text-neutral-800">12 appts</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-neutral-100 overflow-hidden">
                <div className="border-b border-neutral-100 p-4 md:p-6 flex items-center justify-between">
                    <h2 className="text-lg md:text-xl font-bold text-neutral-800">Your Next Appointment</h2>
                    <Link href="/customers/dashboard/bookings" className="text-sm font-semibold text-peach hover:text-peach-light transition-colors">
                        View all
                    </Link>
                </div>
                <div className="p-4 md:p-6 flex flex-col md:flex-row gap-6 items-center">
                    <div className="w-full md:w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0 relative">
                        <img
                            src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80"
                            alt="Salon"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex-1 w-full relative">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                                    Confirmed
                                </span>
                                <h3 className="text-xl font-bold text-neutral-800 mb-1">Elegance Hair Studio</h3>
                                <p className="text-neutral-500 flex items-center gap-1.5 text-sm">
                                    <MapPin size={16} /> 123 Beauty Lane, City Center
                                </p>
                            </div>
                            <div className="bg-neutral-50 rounded-xl p-4 text-center min-w-[140px]">
                                <p className="text-sm font-semibold text-neutral-500 uppercase tracking-wider">Tomorrow</p>
                                <p className="text-2xl font-extrabold text-neutral-800">10:00 AM</p>
                            </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-neutral-100 flex flex-wrap gap-3">
                            <button className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl font-semibold text-sm transition-colors">
                                Reschedule
                            </button>
                            <button className="px-5 py-2.5 bg-white border border-neutral-200 hover:bg-neutral-50 text-neutral-700 rounded-xl font-semibold text-sm transition-colors">
                                Get Directions
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
