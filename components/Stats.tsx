
import { TrendingUp, DollarSign, Clock } from 'lucide-react'

const stats = [
    { icon: TrendingUp, value: '17%', label: 'Faster bookings' },
    { icon: DollarSign, value: '30%', label: 'Lower costs' },
    { icon: Clock, value: '8-12h', label: 'Time saved weekly' },
]

export default function Stats() {
    return (
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
            <div className="text-center mb-16">
                <h2 className="text-h2 text-neutral-800 mb-4">Save time & money</h2>
                <p className="text-lg text-neutral-600 max-w-2xl mx-auto">Join thousands of professionals who trust Salonacare</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                {stats.map((stat, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <div className="w-48 h-48 rounded-full bg-gradient-to-br from-coral to-primary flex flex-col items-center justify-center mb-6 shadow-elevated hover:scale-105 transition-transform duration-300">
                            <stat.icon className="text-white mb-3" size={40} strokeWidth={2.5} />
                            <div className="text-5xl font-bold text-white mb-1">{stat.value}</div>
                        </div>
                        <p className="text-lg font-semibold text-neutral-700 text-center">{stat.label}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}