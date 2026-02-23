import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Link from "next/link";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />

            <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
                {/* Sidebar */}
                <aside className="w-full md:w-64 flex-shrink-0">
                    <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-4 sticky top-28">
                        <div className="mb-6 px-4">
                            <h2 className="text-lg font-bold text-neutral-800">My Account</h2>
                            <p className="text-sm text-neutral-500">Manage your profile</p>
                        </div>

                        <nav className="space-y-1">
                            <Link
                                href="/customers/dashboard"
                                className="flex items-center gap-3 px-4 py-3 text-neutral-600 hover:text-peach hover:bg-peach/5 rounded-xl transition-colors font-medium"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                </svg>
                                Overview
                            </Link>
                            <Link
                                href="/customers/dashboard/bookings"
                                className="flex items-center gap-3 px-4 py-3 text-neutral-600 hover:text-peach hover:bg-peach/5 rounded-xl transition-colors font-medium"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                My Bookings
                            </Link>
                            <Link
                                href="/customers/dashboard/favorites"
                                className="flex items-center gap-3 px-4 py-3 text-neutral-600 hover:text-peach hover:bg-peach/5 rounded-xl transition-colors font-medium"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                                Favorites
                            </Link>
                            <Link
                                href="/customers/dashboard/profile"
                                className="flex items-center gap-3 px-4 py-3 text-neutral-600 hover:text-peach hover:bg-peach/5 rounded-xl transition-colors font-medium"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                Profile Settings
                            </Link>
                        </nav>

                        <div className="mt-8 pt-6 border-t border-neutral-100">
                            <button className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors font-medium">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                Log Out
                            </button>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 w-full">
                    {children}
                </main>
            </div>

            <Footer />
        </div>
    );
}
