'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const testimonials = [
    { name: 'Gina Barzilotti', salon: 'Haargalerij', location: 'Luxembourg', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80', quote: 'Salonacare has transformed how we manage our salon. The booking system is intuitive and our clients love the convenience of 24/7 online scheduling.', rating: 5 },
    { name: 'Marco Visentin', salon: 'Beauty Studio Pro', location: 'Switzerland', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80', quote: 'The software pays for itself. We have reduced no-shows by 70% with automated reminders and saved countless hours on administration.', rating: 5 },
    { name: 'Amelie Cosmetics', salon: 'Amelie Beauty Bar', location: 'Belgium', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80', quote: 'Our revenue has increased significantly since using Salonacare. The insights and analytics help us make better business decisions.', rating: 5 },
    { name: 'Sarah Jenkins', salon: 'Glow Spa & Wellness', location: 'Germany', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80', quote: 'Switching to Salonacare was the best decision for my business. The multi-location support is perfect for our expanding brand.', rating: 5 },
    { name: 'Lucas Rossi', salon: 'Rossi Barbershop', location: 'Italy', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80', quote: 'My barbers love the tipping feature at checkout, and the online presence has brought in a huge amount of new local clients.', rating: 5 },
    { name: 'Emma Blanc', salon: 'Lumière Aesthetics', location: 'France', image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&q=80', quote: 'The marketing tools are unparalleled. Within a month, we launched a campaign that filled up our slow Tuesdays effortlessly.', rating: 5 },
]

export default function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [cardsToShow, setCardsToShow] = useState(3)

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) setCardsToShow(1)
            else if (window.innerWidth < 1024) setCardsToShow(2)
            else setCardsToShow(3)
        }
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const maxIndex = Math.max(0, testimonials.length - cardsToShow)

    const next = () => setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))
    const prev = () => setCurrentIndex((prev) => Math.max(prev - 1, 0))

    return (
        <section id="testimonials" className="bg-neutral-100 py-16 lg:py-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl lg:text-4xl font-extrabold text-neutral-800 mb-4 tracking-tight">Why salon owners trust us</h2>
                    <p className="text-lg text-neutral-600 max-w-2xl mx-auto">Hear from professionals who have transformed their business with Salonacare</p>
                </motion.div>

                <div className="relative">
                    <div className="overflow-hidden pb-8 px-2 -mx-2">
                        <motion.div
                            className="flex pb-8 pt-4"
                            animate={{ x: `-${currentIndex * (100 / cardsToShow)}%` }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        >
                            {testimonials.map((testimonial, index) => (
                                <motion.div
                                    key={index}
                                    className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-4"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <div className="bg-white rounded-[2rem] shadow-sm hover:shadow-xl p-8 lg:p-10 h-full flex flex-col transition-all duration-300 border border-neutral-100/50 hover:border-peach/20 hover:-translate-y-1">
                                        <div className="flex items-center gap-5 mb-8">
                                            <div className="w-20 h-20 rounded-full bg-cover bg-center shadow-md flex-shrink-0 ring-4 ring-neutral-50" style={{ backgroundImage: `url(${testimonial.image})` }} />
                                            <div>
                                                <p className="font-bold text-neutral-800 text-lg leading-tight mb-1">{testimonial.name}</p>
                                                <p className="text-sm text-neutral-500 font-medium">{testimonial.salon} • <span className="text-peach">{testimonial.location}</span></p>
                                            </div>
                                        </div>
                                        <div className="flex mb-6 gap-1">
                                            {[...Array(testimonial.rating)].map((_, i) => (
                                                <Star key={i} className="text-peach fill-peach" size={18} />
                                            ))}
                                        </div>
                                        <p className="text-neutral-600 text-[17px] leading-relaxed italic flex-grow relative z-10">"{testimonial.quote}"</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    <div className="flex items-center justify-center mt-8 space-x-6">
                        <button
                            onClick={prev}
                            disabled={currentIndex === 0}
                            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${currentIndex === 0 ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed' : 'bg-white shadow-lg text-neutral-700 hover:text-peach hover:scale-105'}`}
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <div className="flex space-x-2">
                            {[...Array(maxIndex + 1)].map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`h-2 rounded-full transition-all ${currentIndex === index ? 'bg-peach w-8' : 'bg-neutral-300 w-2 hover:bg-neutral-400'}`}
                                />
                            ))}
                        </div>
                        <button
                            onClick={next}
                            disabled={currentIndex === maxIndex}
                            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${currentIndex === maxIndex ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed' : 'bg-white shadow-lg text-neutral-700 hover:text-peach hover:scale-105'}`}
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}