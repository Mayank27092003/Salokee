"use client";

import { Heart, MapPin, Star } from "lucide-react";
import Link from "next/link";

export default function FavoritesPage() {
    const favorites = [
        {
            id: 1,
            name: "Elegance Hair Studio",
            type: "Hair Salon",
            rating: 4.8,
            reviews: 124,
            address: "123 Beauty Lane, City Center",
            image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80",
        },
        {
            id: 2,
            name: "Glow Spa & Wellness",
            type: "Massage & Spa",
            rating: 4.9,
            reviews: 89,
            address: "45 Relaxation Blvd, Uptown",
            image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80",
        },
        {
            id: 3,
            name: "Nail Bar Express",
            type: "Nail Salon",
            rating: 4.6,
            reviews: 210,
            address: "78 Polish Avenue, Downtown",
            image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80",
        }
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-neutral-800 tracking-tight">Favorites</h1>
                <p className="text-neutral-500 mt-1">Salons and professionals you've saved.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favorites.map((salon) => (
                    <div key={salon.id} className="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden group hover:shadow-md transition-all">
                        <div className="relative aspect-[4/3] w-full overflow-hidden">
                            <img
                                src={salon.image}
                                alt={salon.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <button className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-peach hover:scale-110 transition-transform shadow-md">
                                <Heart size={20} className="fill-peach" />
                            </button>
                        </div>

                        <div className="p-5">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-lg font-bold text-neutral-800 line-clamp-1">{salon.name}</h3>
                                <div className="flex items-center gap-1 bg-neutral-50 px-2 py-1 rounded-lg">
                                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                                    <span className="text-sm font-bold text-neutral-700">{salon.rating}</span>
                                </div>
                            </div>

                            <p className="text-neutral-500 text-sm mb-3">
                                {salon.type} • {salon.reviews} reviews
                            </p>

                            <div className="flex items-center gap-1.5 text-neutral-500 text-sm mb-5 line-clamp-1">
                                <MapPin size={16} className="flex-shrink-0" />
                                {salon.address}
                            </div>

                            <button className="w-full py-2.5 bg-neutral-900 border border-neutral-900 text-white rounded-xl font-bold text-sm hover:bg-neutral-800 transition-colors">
                                Book Again
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
