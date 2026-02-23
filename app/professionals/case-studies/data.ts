export type QnA = {
    q: string;
    a: string;
};

export type CaseStudy = {
    slug: string;
    name: string;
    salonName: string;
    category: "Hairdresser & Barbershops" | "Beauty & Wellness";
    shortQuote: string; // Used in the grid card
    heroQuote: string; // Fallback string
    heroTextStart?: string;
    heroHighlight?: string;
    heroTextEnd?: string;
    introText: string;
    logo?: string; // Optional logo, if needed
    image: string; // Hero/card image
    profilePic: string; // Owner thumbnail
    badge: string; // e.g., "BUSINESS + PAYMENTS"
    stats: {
        joined: string;
        employees: string;
        experience: string;
    };
    midQuote: string;
    qna: QnA[];
};

export const caseStudies: CaseStudy[] = [
    // Hairdresser & Barbershops
    {
        slug: "christel-delessert-junn-coiffure",
        name: "Christel Delessert",
        salonName: "JUNN Coiffure",
        category: "Hairdresser & Barbershops",
        badge: "BUSINESS + PAYMENTS",
        shortQuote: "40 to 50% of our appointments are now booked online thanks to Salonacare.",
        heroQuote: "40 to 50% of our appointments are now booked online thanks to Salonacare.",
        heroTextStart: "",
        heroHighlight: "40 to 50% of our appointments are now booked online",
        heroTextEnd: "thanks to Salonacare.",
        introText: "JUNN stands out as a symbol of effortless excellence, celebrating the art of hairdressing, cherishing hair, and building a community of passionate individuals who share values of craftsmanship, expertise, and well-being. We share a common dream: to offer a space where excellence is at the heart of everything.",
        image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1200",
        profilePic: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200",
        stats: { joined: "'23", employees: "15", experience: "2" },
        midQuote: "At Christmas, we sold around $6,000 in gift cards. Clients love this option for last-minute gifts.",
        qna: [
            { q: "You started in 2023 with the opening of JUNN. Did you join Salonacare from the very beginning?", a: "Yes. My life partner who had been my personal hairdresser for over 15 years, had already used Salonacare in her previous salon. For her, it was an obvious choice. Seeing the benefits she experienced and the system's simplicity, we decided to go with Salonacare from day one." },
            { q: "What percentage of your appointments are booked online?", a: "Currently, about 40 to 50% of our bookings come through the online portal, which frees up our receptionist significantly." },
            { q: "How did your team react to Salonacare?", a: "They loved it immediately. The digital agenda is synced to their phones so they can always check their schedule." },
            { q: "And what about your clients?", a: "Clients appreciate not having to call during working hours. They book on Sunday evenings or late at night. They love the automated SMS reminders." },
            { q: "What advice would you give to a salon still hesitating to join Salonacare?", a: "Don't hesitate. The time saved on administrative tasks and the reduction in no-shows will pay for the software many times over." }
        ]
    },
    {
        slug: "dennis-machts-group",
        name: "Dennis Machts",
        salonName: "D. Machts Group",
        category: "Hairdresser & Barbershops",
        badge: "ENTERPRISE",
        shortQuote: "Salonacare is fast, intuitive, and modern; perfectly aligned with how D. Machts Group operates.",
        heroQuote: "Salonacare is the backbone of our multi-location operation, connecting everything seamlessly.",
        heroTextStart: "Salonacare is",
        heroHighlight: "the backbone of our multi-location operation",
        heroTextEnd: "connecting everything seamlessly.",
        introText: "With multiple prestigious locations across the city, the D. Machts Group sets the standard for contemporary hairdressing and exceptional client experiences at scale.",
        image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1200",
        profilePic: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200",
        stats: { joined: "'21", employees: "85", experience: "18" },
        midQuote: "The multi-location analytics gave us insights into our business we never thought possible.",
        qna: [
            { q: "What were the main challenges managing multiple locations before Salonacare?", a: "Data was disconnected. We couldn't easily see if a client visited multiple branches, and consolidating financial reports took days." },
            { q: "How has the inventory management module helped?", a: "We can now transfer stock between branches instantly, and low-stock alerts mean we never run out of our best-selling retail products." },
            { q: "Would you recommend the Enterprise package?", a: "Without a doubt. The custom roles let us restrict access based on staff level, which is crucial when you have over 80 employees." }
        ]
    },
    {
        slug: "danielle-ploeger-haar-studio",
        name: "Danielle Ploeger",
        salonName: "Haar studio 70",
        category: "Hairdresser & Barbershops",
        badge: "PRO PACKAGE",
        shortQuote: "30% More Bookings in Just 4 Months thanks to Salonacare",
        heroQuote: "We increased our bookings by 30% simply by turning on the Google Reserve integration.",
        introText: "A vibrant, fast-paced salon focusing on cutting-edge color techniques and modern styling in a friendly neighborhood setting.",
        image: "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?q=80&w=1200",
        profilePic: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=200",
        stats: { joined: "'22", employees: "6", experience: "12" },
        midQuote: "The Google integration acts like an invisible receptionist that works 24/7.",
        qna: [
            { q: "What was the decisive reason for switching to Salonacare?", a: "The marketing tools. We needed a way to send targeted SMS campaigns to fill quiet Tuesday mornings." },
            { q: "How effective have the SMS campaigns been?", a: "Incredible. We send a blast on Monday afternoon, and by Tuesday morning, those empty slots are booked." },
            { q: "What is your staff's favorite feature?", a: "The waitlist feature. If there's a cancellation, the system automatically messages the next person in line. It's magic." }
        ]
    },
    {
        slug: "salome-castella-scissor-hair",
        name: "Salome Castella-Wyden",
        salonName: "Scissor Hair GmbH",
        category: "Hairdresser & Barbershops",
        badge: "BUSINESS",
        shortQuote: "With Salonacare, Scissor Hair Salon found a solution that works for both their team and clients.",
        heroQuote: "Managing our team's schedule used to be a headache. Now, it's completely effortless.",
        introText: "Scissor Hair is known for its bubbly atmosphere and expert team of stylists handling everything from classic cuts to extreme color transformations.",
        image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=1200",
        profilePic: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=200",
        stats: { joined: "'20", employees: "12", experience: "9" },
        midQuote: "We save at least 10 hours a week on scheduling and admin tasks alone.",
        qna: [
            { q: "How did you manage schedules previously?", a: "A massive paper book and a lot of white-out. It was messy and prone to errors." },
            { q: "Did the team adapt easily to the tablet-based POS?", a: "Within a day. The interface is so intuitive that even our oldest stylists, who were afraid of technology, mastered it instantly." },
            { q: "How do you feel supported by Salonacare?", a: "The customer service is phenomenal. The live chat feature means we get answers to our questions within minutes." }
        ]
    },

    // Beauty & Wellness
    {
        slug: "susan-sauer-praxis",
        name: "Susan Sauer",
        salonName: "Praxis Sauer",
        category: "Beauty & Wellness",
        badge: "BUSINESS",
        shortQuote: "Thanks to Salonacare, we were able to reduce our no-shows from around 10 per month to just 1-2.",
        heroQuote: "Thanks to Salonacare, we were able to reduce our no-shows from around 10 per month to just 1-2 no-shows.",
        heroTextStart: "Thanks to Salonacare, we were able to",
        heroHighlight: "reduce our no-shows from around 10 per month to just 1-2 no-shows.",
        heroTextEnd: "",
        introText: "Our practice focuses on osteopathy, medical aesthetics, cosmetics & longevity. Here, holistic health meets modern beauty and vitality concepts. Welcome to the practice for health and aesthetics—your place for physical well-being.",
        image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=1200",
        profilePic: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200",
        stats: { joined: "'23", employees: "5", experience: "8" },
        midQuote: "With Salonacare, things have become much easier: We no longer have to make follow-up calls or manually enter changes.",
        qna: [
            { q: "How was the transition to Salonacare?", a: "We already had another online calendar, but it lacked many features. Salonacare has made things much easier. We no longer have to make follow-up calls or manually enter changes. The system is very intuitive." },
            { q: "Do you have fewer no-shows thanks to Salonacare?", a: "Absolutely. We reduced our no-shows dramatically thanks to automated SMS and email reminders." },
            { q: "Which features do you particularly like?", a: "The detailed client files. Because our work involves medical aesthetics, keeping secure, detailed treatment notes and signed consent forms on the iPad is an absolute game-changer." },
            { q: "How was the Salonacare onboarding?", a: "Very smooth. The team imported all our existing client data, so we hit the ground running on day one." },
            { q: "What do your customers say?", a: "They appreciate the professionalism. Receiving a secure link to fill out their intake forms online before they even arrive makes us look very modern." }
        ]
    },
    {
        slug: "elena-rossi-spa",
        name: "Elena Rossi",
        salonName: "Bliss Spa Retreat",
        category: "Beauty & Wellness",
        badge: "PRO PACKAGE",
        shortQuote: "Managing our 8 treatment rooms is finally stress-free.",
        heroQuote: "Salonacare's resource management finally made sense of our complex room and equipment schedules.",
        introText: "A luxury day spa offering massages, facials, and hydrotherapy. We believe in providing an oasis of calm, which starts with a seamless booking experience.",
        image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1200",
        profilePic: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200",
        stats: { joined: "'21", employees: "14", experience: "6" },
        midQuote: "Double-booking a massage room used to happen weekly. Since Salonacare, it hasn't happened once.",
        qna: [
            { q: "Why was scheduling difficult before?", a: "We don't just schedule staff; we schedule specific rooms and machinery (like the laser hair removal device). If a person was free but the machine wasn't, we'd have a disaster." },
            { q: "How did Salonacare solve this?", a: "The resource management feature. Services automatically block out the required staff member AND the required room/device simultaneously." },
            { q: "Do you use the online shop?", a: "Yes, we sell our proprietary skincare line through the Salonacare web presence module, which opens up an entirely new revenue stream." }
        ]
    },
    {
        slug: "maria-gonzalez-serenity",
        name: "Maria Gonzalez",
        salonName: "Serenity Massage Therapy",
        category: "Beauty & Wellness",
        badge: "START PACKAGE",
        shortQuote: "As a solopreneur, Salonacare gave me my weekends back.",
        heroQuote: "I used to spend my entire Sunday returning voicemails and texts to book clients for the week. Now I just rest.",
        introText: "A highly specialized sports and deep tissue massage therapy clinic built entirely on personal connection and trust.",
        image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=1200",
        profilePic: "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=200",
        stats: { joined: "'24", employees: "1", experience: "10" },
        midQuote: "It handles my agenda, my payments, and my reminders for less than what I charge for a single massage.",
        qna: [
            { q: "Why upgrading from a paper book to software?", a: "I was losing clients because I couldn't respond to booking requests fast enough while I was in session with someone else." },
            { q: "How did online booking change your business?", a: "It literally works while I sleep. I wake up, and I have three new appointments booked and paid for via the Salonacare Payments integration." },
            { q: "Do you take prepayment?", a: "Yes, 100% prepayment for first-time clients, which Salonacare handles beautifully. It eliminated my no-show problem entirely." }
        ]
    },
    {
        slug: "chloe-dubois-nailbar",
        name: "Chloe Dubois",
        salonName: "The Nail Bar Boutique",
        category: "Beauty & Wellness",
        badge: "PRO PACKAGE",
        shortQuote: "Our loyalty program now runs on autopilot, keeping clients coming back.",
        heroQuote: "Clients obsess over racking up points in our digital loyalty program. It's increased our retention by 25%.",
        introText: "An upscale nail salon focused on intricate nail art, premium products, and a chic, social atmosphere.",
        image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=1200", // Used nail context
        profilePic: "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?q=80&w=200",
        stats: { joined: "'22", employees: "8", experience: "4" },
        midQuote: "No more stamping paper cards that clients always lose. The digital loyalty points keep everyone engaged.",
        qna: [
            { q: "How do you utilize the loyalty module?", a: "Clients earn points for every dollar spent and bonus points for referring a friend. They can redeem points for upgrades, like a free paraffin wax treatment." },
            { q: "Has the POS system improved your checkout flow?", a: "Immensely. It takes seconds. We tap their stored card on file using Salonacare Payments, add a tip directly on the screen, and they're out the door." },
            { q: "Would you recommend Salonacare?", a: "1000%. It is the backbone of The Nail Bar Boutique." }
        ]
    },
    {
        slug: "coiffeur-le-figaro",
        name: "Bünyamin Altun",
        salonName: "Coiffeur Le Figaro",
        category: "Hairdresser & Barbershops",
        badge: "BUSINESS + PAYMENTS",
        shortQuote: "Since we started using Salonacare, we have much better insight into our clients.",
        heroQuote: "Since we started using Salonacare, we have much better insight into our clients, their preferences, and what was done during their last visit.",
        heroTextStart: "Since we started using Salonacare, we have much",
        heroHighlight: "better insight into our clients, their preferences,",
        heroTextEnd: "and what was done during their last visit.",
        introText: "Right in the middle of Bochum's pedestrian zone, you'll find our top salon, COIFFEUR LE FIGARO. Our modern salon not only offers a central location but also plenty of space to relax and feel good.",
        image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1200",
        profilePic: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200",
        stats: { joined: "'23", employees: "9", experience: "15" },
        midQuote: "What I particularly like about Salonacare is that you have a direct contact person.",
        qna: [
            { q: "How did you previously manage your cash register and appointment bookings?", a: "Previously, we had separate systems for the cash register and appointment scheduling - unfortunately, the two systems were not connected." },
            { q: "What advantages have you noticed since using Salonacare?", a: "Everything is seamlessly connected, making the checkout process extremely fast." }
        ]
    }
];
