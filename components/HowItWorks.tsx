"use client";

import { Calendar, CreditCard, Users } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import LoginModal from './LoginModal'

const steps = [
    {
        number: 1,
        title: 'Create an account',
        description: 'Sign up in seconds and get access to the thousands of salons and beauty professionals.',
        image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80',
        icon: Users,
        buttonText: 'Create an account',
        actionType: 'login'
    },
    {
        number: 2,
        title: 'Book your desired date and time',
        description: 'Browse services, check availability, and book appointments 24/7 from any device.',
        image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&q=80',
        icon: Calendar,
        buttonText: 'Find your next appointment now',
        actionType: 'search'
    },
    {
        number: 3,
        title: 'Pay conveniently online',
        description: 'Secure payments, instant confirmations, and automated reminders for your appointments.',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
        icon: CreditCard,
        buttonText: 'Book now',
        actionType: 'search'
    },
]

export default function HowItWorks() {
    const router = useRouter();
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    const handleAction = (actionType: string) => {
        if (actionType === 'login') {
            setIsLoginModalOpen(true);
        } else if (actionType === 'search') {
            router.push('/customers/search');
        }
    }

    return (
        <>
            <section id="how-it-works" className="bg-neutral-50 py-16 lg:py-24">
                <div className="max-w-6xl mx-auto px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl lg:text-4xl font-extrabold text-neutral-800 mb-4 tracking-tight">How does it work?</h2>
                        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">Book your salon appointment in three simple steps</p>
                    </motion.div>

                    <div className="space-y-32">
                        {steps.map((step, index) => (
                            <div key={step.number} className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 lg:gap-24`}>
                                <motion.div
                                    initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.6 }}
                                    className="flex-1 w-full"
                                >
                                    <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl group">
                                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url(${step.image})` }} />
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: index % 2 === 0 ? 40 : -40 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    className="flex-1 w-full"
                                >
                                    <div className="flex items-center space-x-6 mb-6">
                                        <div className="w-14 h-14 rounded-full bg-peach flex items-center justify-center text-white text-2xl font-bold shadow-md">{step.number}</div>
                                        <div className="w-12 h-12 rounded-full bg-peach-light/30 flex items-center justify-center hidden sm:flex">
                                            <step.icon className="text-peach" size={24} />
                                        </div>
                                    </div>
                                    <h3 className="text-2xl lg:text-3xl font-bold text-neutral-800 mb-4">{step.title}</h3>
                                    <p className="text-lg text-neutral-600 leading-relaxed mb-8">{step.description}</p>

                                    <button
                                        onClick={() => handleAction(step.actionType)}
                                        className="bg-peach hover:bg-peach-light text-white font-bold py-3 px-8 rounded-lg shadow-sm transition-colors"
                                    >
                                        {step.buttonText}
                                    </button>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
            />
        </>
    )
}