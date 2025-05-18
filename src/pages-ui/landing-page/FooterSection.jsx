import React from 'react';
import Icons from "@/components/ui/Icon";

export default function Footer() {
    const socialLinks = [
        { label: "Facebook", href: "#", icon: "akar-icons:facebook-fill" },
        { label: "Twitter", href: "#", icon: "akar-icons:twitter-fill" },
        { label: "Instagram", href: "#", icon: "akar-icons:instagram-fill" },
        { label: "LinkedIn", href: "#", icon: "akar-icons:linkedin-box-fill" },
      ];
    return (
        <footer className="bg-gray-900 text-white pt-12 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {/* about medintell info */}
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <svg className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                            </svg>
                            <span className="ml-2 text-xl font-bold"> MedIntell HealthCare </span>
                        </div>
                        <p className="text-gray-400 w-[80%]">
                            Providing compassionate and expert healthcare services to improve your well-being.
                        </p>
                        <div className="flex space-x-4 justify-start">
                            {socialLinks.map((item, idx) => (
                                <a key={idx} href={item.href} className="text-gray-400 hover:text-white transition" aria-label={item.label}>
                                    <Icons icon={item.icon} className="h-6 w-6" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick links */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Quick Links</h3>
                        <ul className="space-y-2">
                            {['Home', 'About Us', 'Our Doctors', 'Departments', 'Contact'].map((text, i) => (
                                <li key={i}>
                                    <a href="#" className="text-gray-400 hover:text-white transition">{text}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* our medical services */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Medical Services</h3>
                        <ul className="space-y-2">
                            {[
                                'General Medicine',
                                'Pediatrics',
                                'Cardiology',
                                'Orthopedics',
                                'Emergency Care',
                            ].map((service, i) => (
                                <li key={i}>
                                    <a href="#" className="text-gray-400 hover:text-white transition">{service}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* contact section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Contact Us</h3>
                        <address className="not-italic text-gray-400">
                            <p>456 Medical Plaza</p>
                            <p>New York, NY 10001</p>
                            <p className="mt-2">
                                Email:{' '}
                                <a href="mailto:contact@healthcareplus.com" className="hover:text-white transition">
                                    contact@Medintell.com
                                </a>
                            </p>
                            <p>
                                Phone:{' '}
                                <a href="tel:+12125551234" className="hover:text-white transition">
                                    +1 (212) 555-1234
                                </a>
                            </p>
                        </address>
                    </div>
                </div>

                {/* overlay footer bottom */}
                <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-500 text-sm mb-4 md:mb-0">© 2025 HealthCare Plus. All rights reserved.</p>
                    <div className="flex space-x-6">
                        {['Privacy Policy', 'Terms of Service', 'Patient Rights'].map((text, i) => (
                            <a key={i} href="#" className="text-gray-500 hover:text-white text-sm transition">
                                {text}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
