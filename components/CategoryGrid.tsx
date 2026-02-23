"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const categories = [
    { name: 'Hairdressers', image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80' },
    { name: 'Barbershops', image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&q=80' },
    { name: 'Facial care', image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80' },
    { name: 'Body treatment', image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80' },
    { name: 'Hair removal', image: 'https://images.unsplash.com/photo-1590439471364-192aa70c0b53?w=600&q=80' },
    { name: 'Nail salon and pedicure', image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80' },
    { name: 'Massage and spa', image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&q=80' },
    { name: 'Well being and other therapies', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80' },
    { name: 'Tattoo and piercing', image: 'https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?w=600&q=80' },
]

export default function CategoryGrid() {
    const router = useRouter();

    const handleCategoryClick = (categoryName: string) => {
        router.push(`/customers/search?category=${encodeURIComponent(categoryName)}`);
    }

    return (
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
            >
                <h2 className="text-3xl lg:text-4xl font-extrabold text-neutral-800 mb-4 tracking-tight">Browse by category</h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {categories.map((category, index) => (
                    <motion.button
                        key={category.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => handleCategoryClick(category.name)}
                        className="group relative overflow-hidden rounded-xl aspect-[16/9] md:aspect-[4/3] w-full"
                    >
                        <div
                            className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-out"
                            style={{ backgroundImage: `url(${category.image})` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="relative h-full flex items-end p-5 lg:p-6 text-left">
                            <h3 className="text-xl lg:text-2xl font-bold text-white tracking-wide translate-y-2 group-hover:translate-y-0 transition-transform duration-300">{category.name}</h3>
                        </div>
                    </motion.button>
                ))}
            </div>
        </section>
    )
}