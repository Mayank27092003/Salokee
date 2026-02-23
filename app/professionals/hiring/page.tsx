"use client";
import ProNavbar from "../../../components/ProNavbar";
import ProFooter from "../../../components/ProFooter";

export default function HiringPage() {
    return (
        <main className="min-h-screen bg-neutral-50 flex flex-col">
            <ProNavbar />
            <div className="flex-1 flex items-center justify-center p-12">
                <div className="bg-white p-12 rounded-2xl shadow-sm text-center max-w-lg w-full hover:shadow-md transition-shadow">
                    <h1 className="text-3xl font-extrabold text-neutral-900 mb-4">Careers</h1>
                    <p className="text-neutral-500 leading-relaxed">Join the Salonacare family! This page is currently under development. Coming soon!</p>
                </div>
            </div>
            <ProFooter />
        </main>
    );
}
