'use client'

import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'
import Link from 'next/link'

const footerSections = [
  {
    title: 'COMPANY',
    links: [
      { name: 'Support', href: '/support' },
      { name: 'Terms & Conditions', href: '/professionals/terms' },
      { name: 'View detailed guides', href: '/guides' }
    ]
  },
  {
    title: 'LEGAL',
    links: [
      { name: 'Privacy Policy', href: '/professionals/privacy-policy' },
      { name: 'Cookie Policy', href: '/cookie-policy' },
      { name: 'Terms of Use', href: '/professionals/terms' },
      { name: 'Legal Notice', href: '/professionals/legal' }
    ]
  },
  {
    title: 'CONTACT',
    links: [
      { name: 'Contact us', href: '/professionals/contact' },
      { name: 'Find a salon', href: '/customers/search' },
      { name: 'About us', href: '/about-us' }
    ]
  }
]

export default function Footer() {
  return (
    <footer className="bg-[#414A53] text-[#AAB4BE] pt-16 pb-8 text-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="flex flex-col lg:flex-row justify-between lg:items-start gap-12 mb-16">

          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 lg:gap-24 flex-1">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-xs">{section.title}</h4>
                <ul className="space-y-4 font-medium">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="hover:text-white transition-colors">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-start lg:items-end gap-6 justify-center lg:justify-start">
            <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform cursor-pointer">
              <div className="w-8 h-2 bg-white absolute" />
              <div className="w-2 h-8 bg-white absolute" />
            </div>
          </div>

        </div>

        <div className="border-t border-[#4F5963] pt-8 flex flex-col md:flex-row justify-between items-center gap-6">

          <div className="flex items-center space-x-6">
            <p className="font-semibold text-white">Solanacare</p>
            <div className="flex items-center space-x-4">
              <a href="https://facebook.com/solanacare" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Facebook size={18} /></a>
              <a href="https://instagram.com/solanacare" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Instagram size={18} /></a>
              <a href="https://linkedin.com/company/solanacare" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Linkedin size={18} /></a>
              <a href="https://x.com/solanacare" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Twitter size={18} /></a>
            </div>
          </div>

          <p className="text-[#8B98A5] text-xs">© 2025 Solanacare S.A. All rights reserved.</p>

          <button onClick={() => window.location.href = "/professionals"} className="px-4 py-2 border border-[#4F5963] rounded hover:border-[#8B98A5] transition-colors text-xs font-semibold text-white">
            Professionals
          </button>

        </div>

      </div>
    </footer>
  )
}