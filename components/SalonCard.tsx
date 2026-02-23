"use client";

import { useRouter } from "next/navigation";

type Props = {
    salon: any;
};

export default function SalonCard({ salon }: Props) {
    const router = useRouter();

    return (
        <div
            onClick={() => router.push(`/customers/${salon.slug}`)}
            className="bg-white rounded-2xl shadow hover:shadow-xl transition cursor-pointer overflow-hidden"
        >
            <img
                src={salon.image}
                alt={salon.name}
                className="h-48 w-full object-cover"
            />

            <div className="p-4">
                <h3 className="font-semibold text-lg">{salon.name}</h3>
                <p className="text-sm text-gray-500">{salon.city}</p>
                <p className="text-sm mt-1">⭐ {salon.rating}</p>

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/customers/${salon.slug}`);
                    }}
                    className="mt-3 bg-orange-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-orange-600"
                >
                    Book
                </button>
            </div>
        </div>
    );
}