"use client";

import { useState } from "react";
import { Filter, Calendar as CalendarIcon, MapPin } from "lucide-react";

export default function BookingsPage() {
    const [activeTab, setActiveTab] = useState("upcoming");

    const bookings = [
        {
            id: 1,
            salonName: "Elegance Hair Studio",
            service: "Women's Haircut & Blowdry",
            date: "Tomorrow, 10:00 AM",
            price: "€65.00",
            status: "upcoming",
            image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80"
        },
        {
            id: 2,
            salonName: "Glow Spa & Wellness",
            service: "Deep Tissue Massage (60 min)",
            date: "Oct 12, 2023, 2:30 PM",
            price: "€85.00",
            status: "completed",
            image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&q=80"
        },
        {
            id: 3,
            salonName: "Nail Bar Express",
            service: "Gel Manicure",
            date: "Sep 28, 2023, 5:00 PM",
            price: "€35.00",
            status: "completed",
            image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&q=80"
        }
    ];

    const filteredBookings = bookings.filter(b => b.status === activeTab);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h1 className="text-2xl font-bold text-neutral-800 tracking-tight">My Bookings</h1>
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-xl text-sm font-semibold text-neutral-600 hover:bg-neutral-50 transition-colors">
                    <Filter size={16} /> Filter
                </button>
            </div>

            <div className="flex space-x-1 border-b border-neutral-200 pb-px">
                {['upcoming', 'completed', 'cancelled'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2.5 text-sm font-medium capitalize tracking-wide transition-colors ${activeTab === tab
                                ? 'text-peach border-b-2 border-peach'
                                : 'text-neutral-500 hover:text-neutral-800'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="space-y-4">
                {filteredBookings.length > 0 ? (
                    filteredBookings.map((booking) => (
                        <div key={booking.id} className="bg-white p-5 rounded-2xl shadow-sm border border-neutral-100 flex flex-col sm:flex-row gap-5 hover:shadow-md transition-shadow">
                            <div className="w-full sm:w-28 h-28 rounded-xl overflow-hidden flex-shrink-0">
                                <img src={booking.image} alt={booking.salonName} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start gap-4">
                                    <div>
                                        <h3 className="text-lg font-bold text-neutral-800 truncate">{booking.salonName}</h3>
                                        <p className="text-neutral-500 text-sm mt-0.5">{booking.service}</p>
                                    </div>
                                    <span className="font-bold text-neutral-800 whitespace-nowrap">{booking.price}</span>
                                </div>

                                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
                                    <div className="flex items-center gap-1.5 text-neutral-600 bg-neutral-50 px-3 py-1.5 rounded-lg">
                                        <CalendarIcon size={14} />
                                        <span className="font-medium">{booking.date}</span>
                                    </div>
                                    {activeTab === 'upcoming' ? (
                                        <div className="flex gap-2 ml-auto w-full sm:w-auto mt-2 sm:mt-0">
                                            <button className="flex-1 sm:flex-none px-4 py-2 bg-neutral-900 text-white rounded-lg font-semibold text-xs hover:bg-neutral-800 transition-colors">
                                                Reschedule
                                            </button>
                                            <button className="flex-1 sm:flex-none px-4 py-2 bg-white border border-neutral-200 text-neutral-700 rounded-lg font-semibold text-xs hover:bg-neutral-50 transition-colors">
                                                Cancel
                                            </button>
                                        </div>
                                    ) : (
                                        <button className="ml-auto w-full sm:w-auto mt-2 sm:mt-0 px-4 py-2 bg-peach text-white rounded-lg font-semibold text-xs hover:bg-peach-light transition-colors">
                                            Book Again
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="bg-white rounded-2xl border border-neutral-100 p-12 text-center">
                        <div className="w-16 h-16 bg-neutral-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CalendarIcon size={24} className="text-neutral-400" />
                        </div>
                        <h3 className="text-lg font-bold text-neutral-800 mb-2">No {activeTab} bookings</h3>
                        <p className="text-neutral-500 max-w-sm mx-auto">
                            You don't have any {activeTab} appointments right now. Ready for a new look?
                        </p>
                        {activeTab !== 'upcoming' && (
                            <button className="mt-6 px-6 py-2.5 bg-peach text-white rounded-xl font-bold hover:bg-peach-light transition-colors">
                                Find a Salon
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
