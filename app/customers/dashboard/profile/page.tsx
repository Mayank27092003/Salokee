"use client";

import { User } from "lucide-react";

export default function ProfilePage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-neutral-800 tracking-tight">Profile Settings</h1>
                <p className="text-neutral-500 mt-1">Manage your account details and notification preferences.</p>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-neutral-100 overflow-hidden">
                <div className="p-8 border-b border-neutral-100 flex flex-col sm:flex-row items-center gap-6">
                    <div className="w-24 h-24 bg-peach/10 rounded-full flex items-center justify-center text-peach hover:bg-peach/20 transition-colors cursor-pointer relative overflow-hidden group">
                        <User size={40} />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                            Change
                        </div>
                    </div>
                    <div className="text-center sm:text-left">
                        <h2 className="text-xl font-bold text-neutral-800">Sarah Jenkins</h2>
                        <p className="text-neutral-500 mt-0.5">sarah.j@example.com</p>
                        <p className="text-sm text-neutral-400 mt-1">Joined October 2023</p>
                    </div>
                </div>

                <div className="p-8 space-y-8">
                    {/* Section 1 */}
                    <section>
                        <h3 className="text-lg font-bold text-neutral-800 mb-4">Personal Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-neutral-700">First Name</label>
                                <input
                                    type="text"
                                    defaultValue="Sarah"
                                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-peach/50 focus:border-peach transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-neutral-700">Last Name</label>
                                <input
                                    type="text"
                                    defaultValue="Jenkins"
                                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-peach/50 focus:border-peach transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-neutral-700">Email Address</label>
                                <input
                                    type="email"
                                    defaultValue="sarah.j@example.com"
                                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-peach/50 focus:border-peach transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-neutral-700">Phone Number</label>
                                <input
                                    type="tel"
                                    defaultValue="+1 234 567 890"
                                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-peach/50 focus:border-peach transition-all"
                                />
                            </div>
                        </div>
                    </section>

                    <hr className="border-neutral-100" />

                    {/* Section 2 */}
                    <section>
                        <h3 className="text-lg font-bold text-neutral-800 mb-4">Notifications</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                                <div>
                                    <h4 className="font-semibold text-neutral-800">Email Reminders</h4>
                                    <p className="text-sm text-neutral-500 mt-0.5">Receive an email 24 hours before your appointment.</p>
                                </div>
                                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-peach">
                                    <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition" />
                                </button>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                                <div>
                                    <h4 className="font-semibold text-neutral-800">SMS Notifications</h4>
                                    <p className="text-sm text-neutral-500 mt-0.5">Get text alerts for instant booking confirmations.</p>
                                </div>
                                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-neutral-200">
                                    <span className="translate-x-1 inline-block h-4 w-4 transform rounded-full bg-white transition" />
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* Actions */}
                    <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4">
                        <button className="px-6 py-3 bg-white border border-neutral-200 text-neutral-700 rounded-xl font-bold hover:bg-neutral-50 transition-colors">
                            Cancel
                        </button>
                        <button className="px-6 py-3 bg-peach text-white rounded-xl font-bold hover:bg-peach-light transition-colors shadow-sm">
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>

            {/* Danger Zone */}
            <div className="mt-8 border border-red-100 rounded-2xl p-6 bg-red-50/50">
                <h3 className="text-lg font-bold text-red-800 mb-2">Danger Zone</h3>
                <p className="text-sm text-red-600 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                <button className="px-4 py-2 border border-red-200 text-red-600 rounded-lg text-sm font-bold bg-white hover:bg-red-50 transition-colors">
                    Delete Account
                </button>
            </div>
        </div>
    );
}
