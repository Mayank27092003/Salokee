"use client";

import { useRouter } from "next/navigation";
import { Star, MapPin, Calendar } from "lucide-react";

type Props = {
    salon: any;
};

export default function SearchSalonCard({ salon }: Props) {
    const router = useRouter();

    return (
        <div
            onClick={() => router.push(`/customers/${salon.slug}`)}
            className="flex flex-col sm:flex-row bg-white rounded-2xl shadow hover:shadow-lg transition-shadow cursor-pointer border border-neutral-100 overflow-hidden"
        >
            <div className="w-full sm:w-[35%] h-56 sm:h-auto shrink-0 relative">
                <img
                    src={salon.image}
                    alt={salon.name}
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold text-xl text-neutral-800 hover:text-orange-500 transition-colors">{salon.name}</h3>
                        <div className="bg-orange-50 text-orange-700 font-bold px-2 py-1 rounded-md text-sm flex items-center gap-1">
                            <Star size={14} className="fill-orange-500 text-orange-500" />
                            {salon.rating}
                        </div>
                    </div>

                    <p className="text-sm text-neutral-500 flex items-center gap-1 mb-4">
                        <MapPin size={14} /> {salon.address}
                    </p>

                    <div className="space-y-2 mb-4">
                        {salon.services.slice(0, 2).map((s: any) => (
                            <div key={s.id} className="flex justify-between text-sm py-1 border-b border-neutral-50">
                                <span className="text-neutral-700">{s.name}</span>
                                <span className="font-semibold text-neutral-900">€{s.price}</span>
                            </div>
                        ))}
                        {salon.services.length > 2 && (
                            <div className="text-xs text-neutral-500 font-medium pt-1">
                                + {salon.services.length - 2} more services
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex items-center justify-between mt-auto pt-2">
                    <div className="text-sm font-medium text-green-700 flex items-center gap-1.5 bg-green-50 px-3 py-1.5 rounded-lg border border-green-100">
                        <Calendar size={14} />
                        Next: {salon.nextAvailable}
                    </div>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/customers/${salon.slug}`);
                        }}
                        className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-xl transition-colors shadow-sm"
                    >
                        View salon
                    </button>
                </div>
            </div>
        </div>
    );
}
