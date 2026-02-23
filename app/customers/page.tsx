"use client";

import Navbar from "../../components/Navbar";
import SearchBar from "../../components/SearchBar";
import CategoryGrid from "../../components/CategoryGrid";
import HowItWorks from "../../components/HowItWorks";
import Testimonials from "../../components/Testimonials";
import Footer from "../../components/Footer";

export default function CustomersPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-40 lg:pt-48 lg:pb-56 flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=2000')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-peach/80 to-pink/70 mix-blend-multiply" />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="relative z-10 text-center px-4 w-full flex flex-col items-center max-w-5xl mx-auto -mt-10 lg:-mt-20">
          <h1 className="text-4xl md:text-5xl lg:text-[64px] font-extrabold text-white mb-6 drop-shadow-sm tracking-tight leading-tight">
            Book your beauty & wellness appointments
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-medium mb-12 drop-shadow-sm max-w-3xl mx-auto">
            Discover the best salons, spas, and wellness centers near you. Book instantly, 24/7.
          </p>
        </div>
      </section>

      {/* SEARCH BAR (Hovering over hero) */}
      <div className="relative z-20 -mt-[4.5rem] px-4 w-full">
        <SearchBar />
      </div>

      <CategoryGrid />
      <HowItWorks />
      <Testimonials />

      {/* PRO BANNER SECTION */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-neutral-900">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600948836101-f9ff09c1f608?q=80&w=2000')] bg-cover bg-center opacity-40 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-900 via-neutral-900/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl text-white">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-2xl font-bold">Solanacare <span className="bg-white text-neutral-900 text-sm py-1 px-2 rounded ml-1 tracking-widest uppercase">PRO</span></h3>
            </div>
            <h2 className="text-4xl lg:text-5xl font-extrabold mb-6">The Salon Software for all Hair, Beauty & Wellness Professionals</h2>
            <p className="text-neutral-300 text-xl font-medium mb-8 max-w-xl">
              Take your business to the next level with Solanacare. The software that pays for itself.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => window.location.href = '/professionals'}
                className="bg-peach hover:bg-peach-light text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all"
              >
                Try for free
              </button>
            </div>
          </div>

          <div className="hidden lg:block flex-1">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10 transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200" alt="Software Dashboard" className="absolute inset-0 w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}