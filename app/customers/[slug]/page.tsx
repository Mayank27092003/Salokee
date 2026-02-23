"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { salons } from "../../../data/salons";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { Star, MapPin, Heart, Phone, Instagram, Facebook } from "lucide-react";

export default function SalonDetailsPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [salon, setSalon] = useState<any>(null);

  useEffect(() => {
    if (slug) {
      setSalon(salons.find((s) => s.slug === slug) || salons[0]);
    }
  }, [slug]);

  const [selectedServices, setSelectedServices] = useState<any[]>([]);

  const toggleService = (service: any) => {
    if (selectedServices.find(s => s.id === service.id)) {
      setSelectedServices(selectedServices.filter(s => s.id !== service.id));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const handleContinue = () => {
    const serviceIds = selectedServices.map(s => s.id).join(',');
    router.push(`/customers/${slug}/book${serviceIds ? `?services=${serviceIds}` : ''}`);
  };

  if (!salon) return null;

  return (
    <main className="min-h-screen bg-neutral-50 pb-0">
      <Navbar />

      {/* Header info */}
      <div className="bg-orange-50/50 pb-4 pt-6 px-4 lg:px-8 border-b border-orange-100">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-neutral-800 mb-2">{salon.name}</h1>
            <p className="text-neutral-600 flex items-center gap-1.5 font-medium">
              <MapPin size={16} className="text-orange-500" />
              {salon.address}
            </p>
            <div className="flex items-center gap-2 mt-3">
              <div className="flex text-orange-500">
                <Star size={16} className="fill-orange-500" />
                <Star size={16} className="fill-orange-500" />
                <Star size={16} className="fill-orange-500" />
                <Star size={16} className="fill-orange-500" />
                <Star size={16} className="fill-orange-500" />
              </div>
              <span className="font-bold text-neutral-700">{salon.rating}</span>
              <span className="text-neutral-500 text-sm hover:text-orange-500 cursor-pointer underline decoration-dotted underline-offset-4">
                ({salon.reviews} reviews)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Banner Area */}
      <div className="max-w-5xl mx-auto mt-6 px-4 lg:px-0 relative">
        <div className="relative rounded-2xl overflow-hidden shadow-lg h-[60vh] min-h-[400px]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${salon.image})` }}
          />
          <button className="absolute top-4 right-4 bg-white/90 p-2.5 rounded-full shadow hover:bg-white transition-colors text-neutral-600 hover:text-red-500">
            <Heart size={20} />
          </button>
        </div>

        {/* 3 smaller thumbnails */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="aspect-[4/3] sm:aspect-video rounded-xl overflow-hidden shadow-sm">
            <img src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=400" className="w-full h-full object-cover" alt="Salon detail 1" />
          </div>
          <div className="aspect-[4/3] sm:aspect-video rounded-xl overflow-hidden shadow-sm">
            <img src="https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=400" className="w-full h-full object-cover" alt="Salon detail 2" />
          </div>
          <div className="aspect-[4/3] sm:aspect-video rounded-xl overflow-hidden shadow-sm">
            <img src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=400" className="w-full h-full object-cover" alt="Salon detail 3" />
          </div>
        </div>
      </div>

      {/* Important Info */}
      <div className="max-w-5xl mx-auto mt-12 px-4 lg:px-0">
        <h3 className="text-xl font-bold text-neutral-800 mb-4">Important Information</h3>
        <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm">
          <ul className="space-y-3 text-neutral-700 font-medium">
            <li className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">♿</div> For disabled persons: Access available</li>
            <li className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">🅿️</div> Public parking available: Paid parking nearby</li>
          </ul>
        </div>
      </div>

      {/* Services List */}
      <div className="max-w-5xl mx-auto mt-12 px-4 lg:px-0 flex flex-col md:flex-row gap-8">
        {/* Tabs Sidebar */}
        <div className="w-full md:w-1/4">
          <h3 className="text-xl font-bold text-neutral-800 mb-4">Services</h3>
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden hidden md:block">
            <div className="p-4 border-l-4 border-orange-500 font-bold text-orange-500 bg-orange-50 cursor-pointer">All services</div>
            <div className="p-4 border-l-4 border-transparent font-medium text-neutral-600 hover:bg-neutral-50 cursor-pointer">Facial treatments</div>
            <div className="p-4 border-l-4 border-transparent font-medium text-neutral-600 hover:bg-neutral-50 cursor-pointer">Body treatments</div>
            <div className="p-4 border-l-4 border-transparent font-medium text-neutral-600 hover:bg-neutral-50 cursor-pointer">Massage</div>
          </div>
        </div>

        {/* Services List */}
        <div className="w-full md:w-3/4">
          <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden">
            {/* Category Row */}
            <div className="bg-neutral-50 px-6 py-4 border-b border-neutral-200">
              <h4 className="font-bold text-lg text-neutral-800">Popular Services</h4>
            </div>

            {salon.services.map((service: any) => {
              const isSelected = selectedServices.find(s => s.id === service.id);
              return (
                <div key={service.id} className="p-4 sm:p-6 border-b border-neutral-100 flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:bg-neutral-50 transition-colors">
                  <div>
                    <h5 className="font-bold text-neutral-800 text-lg mb-1">{service.name}</h5>
                    <p className="text-neutral-500 text-sm">{service.duration} min</p>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                    <span className="font-bold text-lg text-neutral-700">€{service.price}</span>
                    <button
                      onClick={() => toggleService(service)}
                      className={`px-6 py-2 rounded-xl font-bold transition-all ${isSelected
                        ? 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
                        : 'bg-orange-500 text-white hover:bg-orange-600 shadow-sm'
                        }`}
                    >
                      {isSelected ? 'Remove' : 'Select'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Description & Info */}
      <div className="max-w-5xl mx-auto mt-12 px-4 lg:px-0 grid grid-cols-1 md:grid-cols-2 gap-12 pb-16">
        <div>
          <h3 className="text-xl font-bold text-neutral-800 mb-4">Description</h3>
          <p className="text-neutral-600 leading-relaxed bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm">
            Proposes a moment of relaxation and softness. A warm, spacious place in a serene and soothing atmosphere.<br /><br />
            Facial treatments, hand beauty, as well as relaxation therapies to recharge your batteries in complete peace.
          </p>

          <h3 className="text-xl font-bold text-neutral-800 mt-10 mb-4">Opening Hours</h3>
          <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm space-y-3 text-neutral-600">
            <div className="flex justify-between border-b border-neutral-100 pb-3"><span className="font-medium">Monday</span><span>Closed</span></div>
            <div className="flex justify-between border-b border-neutral-100 py-3"><span className="font-medium">Tuesday - Friday</span><span>09:00 - 19:00</span></div>
            <div className="flex justify-between border-b border-neutral-100 py-3"><span className="font-medium">Saturday</span><span>09:00 - 17:00</span></div>
            <div className="flex justify-between pt-3"><span className="font-medium">Sunday</span><span>Closed</span></div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-neutral-800 mb-4">Information</h3>
          <div className="h-64 rounded-2xl bg-neutral-200 shadow-inner overflow-hidden mb-6 relative border border-neutral-200">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-80"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800')" }}
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-xl text-orange-500">
              <MapPin size={28} />
            </div>
          </div>

          <h3 className="text-xl font-bold text-neutral-800 mb-4">Contact</h3>
          <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm space-y-4 text-neutral-600">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                <MapPin className="text-orange-500" size={20} />
              </div>
              <span className="mt-2 font-medium">{salon.address}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                <Phone className="text-orange-500" size={20} />
              </div>
              <span className="font-medium">+352 123 456 789</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-orange-100 transition-colors cursor-pointer flex items-center justify-center shrink-0">
                <Facebook className="text-neutral-600 hover:text-orange-500" size={20} />
              </div>
              <span className="underline decoration-dotted font-medium cursor-pointer">Open Facebook</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-orange-100 transition-colors cursor-pointer flex items-center justify-center shrink-0">
                <Instagram className="text-neutral-600 hover:text-orange-500" size={20} />
              </div>
              <span className="underline decoration-dotted font-medium cursor-pointer">Open Instagram</span>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Floating Selected Services Bar (Bottom Sticky) */}
      {selectedServices.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 z-50 pointer-events-none flex justify-center">
          <div className="pointer-events-auto w-full max-w-2xl bg-white/95 backdrop-blur-md shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.15)] rounded-2xl p-4 lg:p-5 border border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in slide-in-from-bottom-10 fade-in duration-300">
            <div className="flex flex-col">
              <h3 className="font-bold text-lg text-neutral-800">{selectedServices.length} service(s) selected</h3>
              <p className="text-neutral-500 font-medium tracking-tight text-sm">
                Total: <span className="text-neutral-800 font-bold">€{selectedServices.reduce((acc, curr) => acc + curr.price, 0)}</span> • {selectedServices.reduce((acc, curr) => acc + curr.duration, 0)} min
              </p>
            </div>
            <button
              onClick={handleContinue}
              className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 px-10 rounded-xl shadow-md transition-all hover:shadow-lg whitespace-nowrap active:scale-[0.98]"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </main>
  );
}