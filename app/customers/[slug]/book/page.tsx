"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { salons } from "../../../../data/salons";
import Navbar from "../../../../components/Navbar";
import { Trash2, Pencil } from "lucide-react";

function BookingContent() {
    const { slug } = useParams();
    const searchParams = useSearchParams();
    const router = useRouter();
    const [salon, setSalon] = useState<any>(null);
    const [step, setStep] = useState(1);

    // Employee states
    const [selectedEmployee, setSelectedEmployee] = useState("any");

    // DateTime states
    const [selectedDate, setSelectedDate] = useState("24");
    const [selectedTime, setSelectedTime] = useState("");

    const [selectedServices, setSelectedServices] = useState<any[]>([]);

    useEffect(() => {
        if (slug) {
            const currentSalon = salons.find((s) => s.slug === slug) || salons[0];
            setSalon(currentSalon);

            const serviceIds = searchParams.get('services')?.split(',') || [];
            if (serviceIds.length > 0 && currentSalon.services) {
                const services = currentSalon.services.filter((s: any) => serviceIds.includes(s.id.toString()));
                setSelectedServices(services);
            }
        }
    }, [slug, searchParams]);

    if (!salon) return null;

    const employees = [
        { id: "any", name: "Sonja", role: "First available", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150" },
        { id: "e1", name: "Sarah", role: "Senior Stylist", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150" },
        { id: "e2", name: "Michael", role: "Color Specialist", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150" },
    ];

    const dates = [
        { day: 'Mo', date: '2' }, { day: 'Tu', date: '3' }, { day: 'We', date: '4' }, { day: 'Th', date: '5' }, { day: 'Fr', date: '6' }, { day: 'Sa', date: '7' }, { day: 'Su', date: '8' },
        { day: 'Mo', date: '9' }, { day: 'Tu', date: '10' }, { day: 'We', date: '11' }, { day: 'Th', date: '12' }, { day: 'Fr', date: '13' }, { day: 'Sa', date: '14' }, { day: 'Su', date: '15' },
        { day: 'Mo', date: '16' }, { day: 'Tu', date: '17' }, { day: 'We', date: '18' }, { day: 'Th', date: '19' }, { day: 'Fr', date: '20' }, { day: 'Sa', date: '21' }, { day: 'Su', date: '22' },
        { day: 'Mo', date: '23' }, { day: 'Tu', date: '24' }, { day: 'We', date: '25' }, { day: 'Th', date: '26' }, { day: 'Fr', date: '27' }, { day: 'Sa', date: '28' }, { day: 'Su', date: '1' }
    ];
    // A mock representation of the calendar grid
    const times = ["11:00", "11:15", "11:30", "11:45", "15:45", "16:00", "16:15", "16:30", "16:45", "17:00"];

    const totalPrice = selectedServices.reduce((acc, curr) => acc + curr.price, 0);

    return (
        <main className="min-h-screen bg-[#FDFBF9] flex flex-col pb-24">
            <Navbar />

            {/* Header like Salonkee */}
            <div className="bg-[#E78C6A] text-white px-6 py-4 flex items-center shadow-sm">
                <button onClick={() => router.back()} className="mr-4 hover:bg-white/20 p-2 rounded-full transition-colors">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                <h1 className="text-xl font-bold">{salon.name}</h1>
            </div>

            <div className="max-w-6xl mx-auto w-full flex-1 px-4 py-8 lg:py-12">
                {step === 1 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
                        {/* Left Column: Your appointment */}
                        <div>
                            <h2 className="text-2xl font-bold text-[#3B4D56] mb-6">Your appointment</h2>
                            <div className="space-y-4">
                                {selectedServices.length > 0 ? selectedServices.map((service, index) => (
                                    <div key={index} className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-neutral-100 relative">
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="font-bold text-[#3B4D56] text-lg pr-4">{service.name}</h3>
                                            <span className="font-bold text-[#3B4D56] whitespace-nowrap">{service.price}CHF</span>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <div className="relative">
                                                <div className="w-12 h-12 rounded-full overflow-hidden bg-neutral-100">
                                                    <img src={employees[0].image} className="w-full h-full object-cover" alt="Employee" />
                                                </div>
                                                <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full shadow-sm border border-neutral-100 cursor-pointer hover:bg-neutral-50">
                                                    <Pencil size={12} className="text-neutral-500" />
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-[#3B4D56] text-sm font-medium">{employees[0].name}</p>
                                                <p className="text-neutral-500 text-sm">{service.duration} minutes</p>
                                            </div>
                                        </div>

                                        <button className="absolute bottom-6 right-6 flex items-center gap-1.5 text-[#E78C6A] hover:text-red-600 font-medium text-sm transition-colors">
                                            <Trash2 size={16} />
                                            Remove
                                        </button>
                                    </div>
                                )) : (
                                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100 text-center text-neutral-500">
                                        No services selected.
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Column: Select a date and time */}
                        <div>
                            <h2 className="text-2xl font-bold text-[#3B4D56] mb-6">Select a date and time</h2>

                            <div className="bg-white p-6 lg:p-8 rounded-2xl shadow-[0_2px_15px_rgba(0,0,0,0.04)] border border-neutral-100">
                                <div className="flex justify-between items-center mb-8">
                                    <button className="p-2 text-neutral-400 hover:text-neutral-700 transition-colors">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18L9 12L15 6" /></svg>
                                    </button>
                                    <h3 className="font-bold text-[#3B4D56] text-lg">Febuary 2026</h3>
                                    <button className="p-2 text-neutral-400 hover:text-neutral-700 transition-colors">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18L15 12L9 6" /></svg>
                                    </button>
                                </div>

                                <div className="grid grid-cols-7 gap-y-4 gap-x-2 mb-6">
                                    <span className="text-xs font-medium text-neutral-400 text-center">Mo</span>
                                    <span className="text-xs font-medium text-neutral-400 text-center">Tu</span>
                                    <span className="text-xs font-medium text-neutral-400 text-center">We</span>
                                    <span className="text-xs font-medium text-neutral-400 text-center">Th</span>
                                    <span className="text-xs font-medium text-neutral-400 text-center">Fr</span>
                                    <span className="text-xs font-medium text-neutral-400 text-center">Sa</span>
                                    <span className="text-xs font-medium text-neutral-400 text-center">Su</span>
                                    {dates.map((d, i) => (
                                        <div key={i} className="flex flex-col items-center">
                                            <button
                                                onClick={() => setSelectedDate(d.date)}
                                                className={`w-10 h-10 rounded-[4px] flex items-center justify-center font-semibold text-sm transition-all
                                                    ${selectedDate === d.date
                                                        ? 'bg-[#156E4A] text-white shadow-md'
                                                        : 'text-[#3B4D56] hover:bg-[#E9EDE9]'}`}
                                            >
                                                {d.date}
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                {selectedDate && (
                                    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3 pt-6 border-t border-neutral-100">
                                        {times.map((time, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setSelectedTime(time)}
                                                className={`py-2 rounded-lg text-sm font-semibold transition-all
                                                    ${selectedTime === time
                                                        ? 'bg-[#156E4A] text-white shadow-md'
                                                        : 'bg-[#CBE4D3] text-[#156E4A] hover:bg-[#B3D9C0]'}`}
                                            >
                                                {time}
                                            </button>
                                        ))}
                                    </div>
                                )}

                                <div className="mt-8">
                                    <button className="text-[#E78C6A] hover:text-[#d36b47] font-medium text-sm flex items-center gap-1 transition-colors">
                                        Click here to join the waiting list
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18L15 12L9 6" /></svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="animate-in fade-in zoom-in duration-500 max-w-md mx-auto bg-white p-8 sm:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-neutral-100 mt-8">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-[#3B4D56] mb-3">Welcome back</h2>
                            <p className="text-neutral-500 font-medium">Log in to confirm your appointment at {salon.name}.</p>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-bold text-[#3B4D56] mb-1.5">Email address</label>
                                <input type="email" placeholder="name@example.com" className="w-full px-5 py-3.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#E78C6A]/20 focus:border-[#E78C6A] transition-all bg-neutral-50 focus:bg-white font-medium" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-[#3B4D56] mb-1.5">Password</label>
                                <input type="password" placeholder="••••••••" className="w-full px-5 py-3.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#E78C6A]/20 focus:border-[#E78C6A] transition-all bg-neutral-50 focus:bg-white font-medium" />
                            </div>
                            <button className="w-full bg-[#E78C6A] hover:bg-[#d87c5a] text-white font-bold py-4 px-4 rounded-xl shadow-[0_4px_14px_0_rgba(231,140,106,0.39)] transition-all mt-6 hover:shadow-[0_6px_20px_rgba(231,140,106,0.23)] hover:-translate-y-0.5 text-lg">
                                Log in & confirm
                            </button>
                            <div className="text-center mt-6 pt-6 border-t border-neutral-100">
                                <button className="text-[#3B4D56] font-medium hover:text-[#E78C6A] text-sm transition-colors">Don't have an account? <span className="font-bold underline decoration-2 underline-offset-4">Sign up</span></button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Bottom sticky bar (only visible on step 1) */}
            {step === 1 && (
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 p-4 lg:p-5 shadow-[0_-10px_40px_-5px_rgba(0,0,0,0.05)] z-50">
                    <div className="max-w-6xl mx-auto flex items-center justify-between">
                        <div className="font-bold text-[#3B4D56] text-xl lg:text-2xl">
                            {totalPrice} CHF
                        </div>
                        <button
                            onClick={() => {
                                if (selectedDate && selectedTime) {
                                    window.scrollTo(0, 0);
                                    setStep(2);
                                }
                            }}
                            disabled={!selectedDate || !selectedTime}
                            className={`font-bold py-3.5 px-12 rounded-xl transition-all text-lg ${selectedDate && selectedTime
                                ? 'bg-[#E78C6A] hover:bg-[#d87c5a] text-white shadow-md active:scale-95'
                                : 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                                }`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
}

export default function BookingPageWrapper() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#FDFBF9] flex items-center justify-center font-bold text-[#E78C6A]">Loading booking...</div>}>
            <BookingContent />
        </Suspense>
    );
}