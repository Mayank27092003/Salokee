
import { CheckCircle, BarChart, Calendar, Smartphone } from 'lucide-react'

const features = [
  { icon: Calendar, label: 'Manage Appointments' },
  { icon: BarChart, label: 'Business Insights' },
  { icon: Smartphone, label: 'Mobile App' },
  { icon: CheckCircle, label: 'Easy Checkout' },
]

export default function ProfessionalSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-h2 text-neutral-800 mb-6">The uncomplicated salon management starts now!</h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed">The appointment planner is the heart of every salon. With Salonacare, your customers can book 24/7 online, receive automated reminders, and you have full control from any device.</p>
          <div className="grid grid-cols-2 gap-4 mb-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3 p-4 bg-beige-light rounded-lg hover:shadow-card transition-all">
                <feature.icon className="text-primary flex-shrink-0" size={24} />
                <span className="font-semibold text-neutral-700 text-sm">{feature.label}</span>
              </div>
            ))}
          </div>
          <button className="btn-primary text-lg px-12">Explore Features</button>
        </div>
        <div className="relative">
          <div className="card p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="space-y-2">
                <div className="h-3 bg-neutral-200 rounded-full w-32"></div>
                <div className="h-2 bg-neutral-100 rounded-full w-24"></div>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary"></div>
            </div>
            <div className="grid grid-cols-4 gap-3 mb-6">
              {[...Array(16)].map((_, i) => (
                <div key={i} className={`aspect-square rounded-lg ${i % 3 === 0 ? 'bg-gradient-to-br from-primary-light to-primary' : i % 5 === 0 ? 'bg-gradient-to-br from-coral to-primary-light' : 'bg-neutral-100'}`}></div>
              ))}
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-beige-light rounded-lg">
                <div className="h-2 bg-neutral-300 rounded-full w-1/3"></div>
                <div className="h-2 bg-primary rounded-full w-16"></div>
              </div>
              <div className="flex items-center justify-between p-3 bg-beige-light rounded-lg">
                <div className="h-2 bg-neutral-300 rounded-full w-1/2"></div>
                <div className="h-2 bg-coral rounded-full w-20"></div>
              </div>
              <div className="flex items-center justify-between p-3 bg-beige-light rounded-lg">
                <div className="h-2 bg-neutral-300 rounded-full w-2/5"></div>
                <div className="h-2 bg-primary-light rounded-full w-12"></div>
              </div>
            </div>
          </div>
          <div className="absolute -top-4 -right-4 bg-coral text-white px-6 py-3 rounded-full shadow-elevated font-bold text-sm">15,000+ Professionals</div>
        </div>
      </div>
    </section>
  )
}