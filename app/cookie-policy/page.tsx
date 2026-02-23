"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function CookiePolicyPage() {
    return (
        <main className="min-h-screen bg-white font-sans flex flex-col selection:bg-[#f16335] selection:text-white">
            <Navbar />

            <section className="pt-32 pb-24 px-6 flex-1">
                <div className="max-w-[800px] mx-auto">
                    <div className="mb-12">
                        <p className="text-[#f16335] font-bold tracking-widest uppercase text-xs mb-4">Legal Document</p>
                        <h1 className="text-[40px] md:text-[56px] font-extrabold text-neutral-900 leading-[1.1] tracking-tight mb-6">
                            Cookie Policy
                        </h1>
                        <p className="text-neutral-500 font-medium">Last updated: February 23, 2026</p>
                    </div>

                    <div className="prose prose-lg prose-neutral max-w-none prose-headings:font-bold prose-headings:text-neutral-900 prose-a:text-[#f16335] hover:prose-a:text-[#e67551]">
                        <p className="text-neutral-600 leading-relaxed font-medium mb-8">
                            This Cookie Policy explains how Salonacare ("we", "us", and "our") uses cookies and similar technologies to recognize you when you visit our website at salonacare.com. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
                        </p>

                        <h2 className="text-2xl mt-12 mb-4">What are cookies?</h2>
                        <p className="text-neutral-600 leading-relaxed mb-6 gap-4">
                            Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
                        </p>
                        <p className="text-neutral-600 leading-relaxed mb-8">
                            Cookies set by the website owner (in this case, Salonacare) are called "first-party cookies". Cookies set by parties other than the website owner are called "third-party cookies". Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., like advertising, interactive content, and analytics).
                        </p>

                        <h2 className="text-2xl mt-12 mb-4">Why do we use cookies?</h2>
                        <p className="text-neutral-600 leading-relaxed mb-6">
                            We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our Website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our Online Properties. Third parties serve cookies through our Website for advertising, analytics, and other purposes.
                        </p>

                        <h3 className="text-xl mt-8 mb-4">Essential Website Cookies</h3>
                        <p className="text-neutral-600 leading-relaxed mb-6">
                            These cookies are strictly necessary to provide you with services available through our Website and to use some of its features, such as access to secure areas like your professional dashboard.
                        </p>

                        <h3 className="text-xl mt-8 mb-4">Performance and Functionality Cookies</h3>
                        <p className="text-neutral-600 leading-relaxed mb-6">
                            These cookies are used to enhance the performance and functionality of our Website but are non-essential to their use. However, without these cookies, certain functionality (like videos) may become unavailable.
                        </p>

                        <h3 className="text-xl mt-8 mb-4">Analytics and Customization Cookies</h3>
                        <p className="text-neutral-600 leading-relaxed mb-8">
                            These cookies collect information that is used either in aggregate form to help us understand how our Website is being used or how effective our marketing campaigns are, or to help us customize our Website for you.
                        </p>

                        <h2 className="text-2xl mt-12 mb-4">How can I control cookies?</h2>
                        <p className="text-neutral-600 leading-relaxed mb-6">
                            You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in the Cookie Consent Manager. The Cookie Consent Manager allows you to select which categories of cookies you accept or reject. Essential cookies cannot be rejected as they are strictly necessary to provide you with services.
                        </p>
                        <p className="text-neutral-600 leading-relaxed mb-8">
                            In addition, most advertising networks offer you a way to opt out of targeted advertising. If you would like to find out more information, please visit <a href="http://www.aboutads.info/choices/" target="_blank" rel="noreferrer">http://www.aboutads.info/choices/</a>.
                        </p>

                        <h2 className="text-2xl mt-12 mb-4">How often will you update this Cookie Policy?</h2>
                        <p className="text-neutral-600 leading-relaxed mb-8">
                            We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore revisit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
                        </p>

                        <h2 className="text-2xl mt-12 mb-4">Where can I get further information?</h2>
                        <p className="text-neutral-600 leading-relaxed mb-16">
                            If you have any questions about our use of cookies or other technologies, please email us at <a href="mailto:privacy@salonacare.com">privacy@salonacare.com</a>.
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
