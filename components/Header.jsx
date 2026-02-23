'use client'

import Link from 'next/link'

export default function Header() {
    return (
        <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-10 py-5 bg-white/80 backdrop-blur shadow-sm">

            <Link href="/" className="text-2xl font-bold">
                Solana<span className="text-orange-500">care</span>
            </Link>

            <div className="flex gap-4 items-center">
                <Link
                    href="/hiring"
                    className="border px-4 py-1.5 rounded-full hover:bg-black hover:text-white transition"
                >
                    We’re hiring
                </Link>

                <button className="border px-4 py-1.5 rounded-full hover:bg-neutral-100">
                    EN
                </button>
            </div>
        </header>
    )
}