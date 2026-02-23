
export default function Hero() {
  const countries = [
    { name: 'Luxembourg', flag: '🇱🇺' },
    { name: 'Belgium', flag: '🇧🇪' },
    { name: 'Switzerland', flag: '🇨🇭' },
    { name: 'Netherlands', flag: '🇳🇱' },
    { name: 'Deutschland', flag: '🇩🇪' },
    { name: 'Österreich', flag: '🇦🇹' },
  ]

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-8 py-8 lg:py-12">
      <div className="grid lg:grid-cols-5 gap-4 lg:gap-6">
        <div className="lg:col-span-3 bg-beige rounded-3xl lg:rounded-4xl overflow-hidden relative min-h-[500px] lg:min-h-[600px]">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&q=80)', backgroundBlendMode: 'multiply', backgroundColor: 'rgba(232, 222, 213, 0.6)' }} />
          <div className="relative z-10 p-8 lg:p-12 h-full flex flex-col justify-between">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-lg">For Customers</h2>
              <p className="text-lg lg:text-xl text-white drop-shadow-md max-w-md">Find and book the best Hair & Beauty salons in your area.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
              {countries.map((country) => (
                <button key={country.name} className="flex flex-col items-center space-y-2 p-4 bg-white/90 backdrop-blur-sm rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 group">
                  <span className="text-4xl group-hover:scale-110 transition-transform">{country.flag}</span>
                  <span className="text-sm font-semibold text-neutral-800">{country.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 bg-neutral-300 rounded-3xl lg:rounded-4xl overflow-hidden relative min-h-[500px] lg:min-h-[600px]">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=800&q=80)', backgroundBlendMode: 'multiply', backgroundColor: 'rgba(211, 211, 211, 0.7)' }} />
          <div className="relative z-10 p-8 lg:p-12 h-full flex flex-col">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-lg">For Professionals</h2>
              <p className="text-lg lg:text-xl text-white drop-shadow-md">The Salon Software for all Hair & Beauty Professionals.</p>
            </div>
            <div className="mt-auto">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-elevated">
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="aspect-square bg-gradient-to-br from-primary-light to-primary rounded-lg"></div>
                  ))}
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-neutral-200 rounded-full w-3/4"></div>
                  <div className="h-3 bg-neutral-200 rounded-full w-1/2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}