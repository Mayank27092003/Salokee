"use client";

import { Search, MapPin, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
    'Hairdressers',
    'Barbershops',
    'Facial care',
    'Body treatment',
    'Hair removal',
    'Nail salon and pedicure',
    'Massage and spa',
    'Well being and other therapies',
    'Tattoo and piercing'
];

const locations = [
    'Luxembourg',
    'Geneva',
    'Zurich',
    'Brussels',
    'Berlin',
    'Vienna'
];

export default function SearchBar() {
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("");

    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [isLocationOpen, setIsLocationOpen] = useState(false);

    const categoryRef = useRef<HTMLDivElement>(null);
    const locationRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
                setIsCategoryOpen(false);
            }
            if (locationRef.current && !locationRef.current.contains(event.target as Node)) {
                setIsLocationOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (selectedCategory) params.append("category", selectedCategory);
        if (selectedLocation) params.append("location", selectedLocation);

        router.push(`/customers/search?${params.toString()}`);
    };

    return (
        <div className="max-w-5xl mx-auto bg-white/60 backdrop-blur-2xl rounded-full shadow-[0_15px_40px_rgba(255,182,193,0.25)] p-2 border border-pink/30 relative z-40 transition-all duration-300 hover:bg-white/70 hover:shadow-[0_15px_40px_rgba(255,182,193,0.35)]">
            <div className="flex flex-col lg:flex-row gap-1">

                {/* Category Dropdown */}
                <div className="flex-[3] relative" ref={categoryRef}>
                    <div
                        onClick={() => { setIsCategoryOpen(!isCategoryOpen); setIsLocationOpen(false); }}
                        className="w-full h-full min-h-[60px] px-6 flex items-center bg-transparent hover:bg-pink/5 rounded-full cursor-pointer transition-colors border border-transparent hover:border-pink/20"
                    >
                        <Search className={`mr-3 transition-colors ${isCategoryOpen || selectedCategory ? 'text-peach' : 'text-pink/60'}`} size={20} />
                        <span className={`flex-1 truncate text-[15px] font-medium ${selectedCategory ? 'text-neutral-800' : 'text-neutral-500'}`}>
                            {selectedCategory || "Search services, salons, stylists..."}
                        </span>
                        <ChevronDown className={`text-pink/60 transition-transform duration-300 ${isCategoryOpen ? 'rotate-180' : ''}`} size={16} />
                    </div>

                    <AnimatePresence>
                        {isCategoryOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 15, scale: 0.95 }}
                                transition={{ duration: 0.25, type: 'spring', bounce: 0.3 }}
                                className="absolute top-full left-0 right-[-10px] lg:right-0 mt-4 bg-white/80 backdrop-blur-2xl border border-pink/20 shadow-[0_20px_50px_rgba(255,182,193,0.3)] rounded-3xl overflow-hidden z-50 py-3 max-h-72 overflow-y-auto custom-scrollbar"
                            >
                                <button
                                    onClick={() => { setSelectedCategory(""); setIsCategoryOpen(false); }}
                                    className="w-full text-left px-6 py-3.5 hover:bg-pink/10 transition-colors text-sm text-neutral-500"
                                >
                                    Any Service
                                </button>
                                {categories.map(c => (
                                    <button
                                        key={c}
                                        onClick={() => { setSelectedCategory(c); setIsCategoryOpen(false); }}
                                        className={`w-full text-left px-6 py-3.5 hover:bg-pink/10 transition-colors text-[15px] font-medium ${selectedCategory === c ? 'text-peach bg-gradient-to-r from-pink/10 to-transparent' : 'text-neutral-700'}`}
                                    >
                                        {c}
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Location Dropdown */}
                <div className="flex-[2] relative" ref={locationRef}>
                    {/* Divider line for large screens */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-8 bg-pink/20 hidden lg:block" />

                    <div
                        onClick={() => { setIsLocationOpen(!isLocationOpen); setIsCategoryOpen(false); }}
                        className="w-full h-full min-h-[60px] px-6 lg:pl-8 flex items-center bg-transparent hover:bg-pink/5 rounded-full cursor-pointer transition-colors border border-transparent hover:border-pink/20"
                    >
                        <MapPin className={`mr-3 transition-colors ${isLocationOpen || selectedLocation ? 'text-peach' : 'text-pink/60'}`} size={20} />
                        <span className={`flex-1 truncate text-[15px] font-medium ${selectedLocation ? 'text-neutral-800' : 'text-neutral-500'}`}>
                            {selectedLocation || "Where?"}
                        </span>
                        <ChevronDown className={`text-pink/60 transition-transform duration-300 ${isLocationOpen ? 'rotate-180' : ''}`} size={16} />
                    </div>

                    <AnimatePresence>
                        {isLocationOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 15, scale: 0.95 }}
                                transition={{ duration: 0.25, type: 'spring', bounce: 0.3 }}
                                className="absolute top-full left-[-10px] lg:left-0 right-0 mt-4 bg-white/80 backdrop-blur-2xl border border-pink/20 shadow-[0_20px_50px_rgba(255,182,193,0.3)] rounded-3xl overflow-hidden z-50 py-3 max-h-72 overflow-y-auto custom-scrollbar"
                            >
                                <button
                                    onClick={() => { setSelectedLocation(""); setIsLocationOpen(false); }}
                                    className="w-full text-left px-6 py-3.5 hover:bg-pink/10 transition-colors text-sm text-neutral-500"
                                >
                                    Anywhere
                                </button>
                                {locations.map(l => (
                                    <button
                                        key={l}
                                        onClick={() => { setSelectedLocation(l); setIsLocationOpen(false); }}
                                        className={`w-full text-left px-6 py-3.5 hover:bg-pink/10 transition-colors text-[15px] font-medium ${selectedLocation === l ? 'text-peach bg-gradient-to-r from-pink/10 to-transparent' : 'text-neutral-700'}`}
                                    >
                                        {l}
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="flex-none flex items-center justify-center pl-1 lg:pl-2">
                    <button
                        onClick={handleSearch}
                        className="w-full lg:w-32 h-full min-h-[60px] bg-gradient-to-r from-peach to-pink hover:opacity-90 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-pink/40 transition-all text-[15px] active:scale-95"
                    >
                        Search
                    </button>
                </div>

            </div>
        </div>
    );
}