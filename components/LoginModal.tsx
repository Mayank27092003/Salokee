"use client";

import { X } from "lucide-react";

type LoginModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <div
                className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between p-4 border-b border-neutral-100">
                    <div className="w-8" /> {/* Spacer for centering */}
                    <h2 className="text-lg font-bold text-neutral-800">Log in or sign up</h2>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-neutral-100 text-neutral-500 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 md:p-8 space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">Email</label>
                        <input
                            type="email"
                            className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-peach focus:border-peach transition-all"
                        />
                    </div>

                    <button className="w-full bg-peach hover:bg-peach-light text-white font-bold py-3.5 rounded-xl transition-colors">
                        Continue
                    </button>

                    <div className="relative flex items-center py-2">
                        <div className="flex-grow border-t border-neutral-200" />
                        <span className="flex-shrink-0 mx-4 text-neutral-400 text-sm">or</span>
                        <div className="flex-grow border-t border-neutral-200" />
                    </div>

                    <div className="space-y-3">
                        <button className="w-full bg-white border border-neutral-200 hover:bg-neutral-50 text-neutral-700 font-medium py-3 rounded-xl flex items-center justify-center gap-3 transition-colors">
                            <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" alt="Facebook" className="w-5 h-5" />
                            Continue with Facebook
                        </button>
                        <button className="w-full bg-white border border-neutral-200 hover:bg-neutral-50 text-neutral-700 font-medium py-3 rounded-xl flex items-center justify-center gap-3 transition-colors">
                            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                            Continue with Google
                        </button>
                        <button className="w-full bg-white border border-neutral-200 hover:bg-neutral-50 text-neutral-700 font-medium py-3 rounded-xl flex items-center justify-center gap-3 transition-colors">
                            <img src="https://www.svgrepo.com/show/511330/apple-173.svg" alt="Apple" className="w-5 h-5" />
                            Continue with Apple
                        </button>
                    </div>

                    <div className="text-center mt-6 text-xs text-neutral-400">
                        This site is protected by reCAPTCHA. (<a href="/professionals/privacy-policy" className="underline hover:text-neutral-700">Privacy</a>, <a href="/professionals/terms" className="underline hover:text-neutral-700">Terms of use</a>)
                    </div>
                </div>
            </div>
        </div>
    );
}
