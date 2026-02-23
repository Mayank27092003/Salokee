'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, ChevronDown, Globe } from 'lucide-react'
import LoginModal from './LoginModal'

type Country = { name: string; code: string; flag: string };
const countries: Country[] = [
  { name: "Luxembourg", code: "LU", flag: "🇱🇺" },
  { name: "Belgium", code: "BE", flag: "🇧🇪" },
  { name: "Switzerland", code: "CH", flag: "🇨🇭" },
  { name: "Netherlands", code: "NL", flag: "🇳🇱" },
  { name: "Germany", code: "DE", flag: "🇩🇪" },
  { name: "Austria", code: "AT", flag: "🇦🇹" },
];

const languages = [
  { code: "EN", name: "English", flag: "🇬🇧" },
  { code: "FR", name: "Français", flag: "🇫🇷" },
  { code: "DE", name: "Deutsch", flag: "🇩🇪" },
  { code: "NL", name: "Nederlands", flag: "🇳🇱" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [activeCountry, setActiveCountry] = useState(countries[0])
  const [countryOpen, setCountryOpen] = useState(false)
  const [activeLang, setActiveLang] = useState(languages[0])
  const [langOpen, setLangOpen] = useState(false)

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm md:h-20 flex items-center">
        <div className="max-w-[1400px] w-full mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 w-full">
            <Link href="/" className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">
                <span className="text-neutral-800">Solana</span>
                <span className="text-peach">care</span>
              </h1>
            </Link>

            <div className="hidden lg:flex items-center space-x-6">

              {/* Hiring Button */}
              <Link href="/hiring" className="px-4 py-2 border border-neutral-200 hover:border-peach hover:text-peach text-neutral-600 rounded-full text-sm font-semibold transition-colors bg-white shadow-sm">
                We're hiring
              </Link>

              {/* Pro Link */}
              <Link href="/professionals" className="text-neutral-600 hover:text-peach transition-colors text-sm font-semibold flex items-center gap-2">
                <span className="w-5 h-5 rounded-md bg-peach flex items-center justify-center text-[11px] text-white font-bold shadow-sm">P</span>
                Are you a Pro?
              </Link>

              {/* Country Dropdown */}
              <div className="relative">
                <button
                  onClick={() => { setCountryOpen(!countryOpen); setLangOpen(false); }}
                  className="flex items-center space-x-2 text-neutral-600 hover:text-peach transition-colors text-sm font-semibold"
                >
                  <span className="text-lg">{activeCountry.flag}</span>
                  <span>{activeCountry.name}</span>
                  <ChevronDown size={16} />
                </button>
                {countryOpen && (
                  <div className="absolute right-0 mt-3 w-48 bg-white border border-neutral-100 shadow-xl rounded-xl overflow-hidden z-50">
                    {countries.map((c) => (
                      <button
                        key={c.code}
                        onClick={() => { setActiveCountry(c); setCountryOpen(false); }}
                        className="w-full text-left px-4 py-3 hover:bg-neutral-50 text-neutral-700 text-sm flex items-center gap-3 transition-colors"
                      >
                        <span className="text-lg">{c.flag}</span>
                        <span className="font-medium">{c.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Language Dropdown */}
              <div className="relative">
                <button
                  onClick={() => { setLangOpen(!langOpen); setCountryOpen(false); }}
                  className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center hover:border-peach hover:text-peach text-neutral-600 transition-colors shadow-sm bg-white font-semibold text-sm gap-0.5"
                >
                  {activeLang.code} <ChevronDown size={14} />
                </button>
                {langOpen && (
                  <div className="absolute right-0 mt-3 w-40 bg-white border border-neutral-100 shadow-xl rounded-xl overflow-hidden z-50">
                    {languages.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => { setActiveLang(l); setLangOpen(false); }}
                        className="w-full text-left px-4 py-3 hover:bg-neutral-50 text-neutral-700 text-sm flex items-center gap-3 transition-colors"
                      >
                        <span className="font-medium">{l.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Login Button */}
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="text-neutral-600 hover:text-peach transition-colors text-sm font-semibold"
              >
                Log in or sign up
              </button>
            </div>

            <button className="lg:hidden p-2 text-neutral-700 hover:text-peach transition-colors" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-neutral-200">
              <div className="flex flex-col space-y-4">
                <Link href="/hiring" className="text-neutral-600 hover:text-peach transition-colors text-sm font-semibold">We're hiring</Link>
                <Link href="/professionals" className="text-neutral-600 hover:text-peach transition-colors text-sm font-semibold">Are you a Pro?</Link>
                <div className="border-t border-neutral-200 pt-4 flex flex-col space-y-4">
                  <button
                    onClick={() => { setIsMobileMenuOpen(false); setIsLoginModalOpen(true); }}
                    className="text-neutral-600 hover:text-peach transition-colors text-sm font-semibold text-left"
                  >
                    Log in or sign up
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  )
}