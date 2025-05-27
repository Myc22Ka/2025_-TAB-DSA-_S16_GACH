import React from 'react';
import { Separator } from '@/components/ui/separator';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-amber-600 text-white py-10">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Logo & description */}
                <div>
                    <h2 className="text-2xl font-bold mb-2">AquaPark</h2>
                    <p className="text-sm">
                        Dive into a world of water fun and relaxation. Our aquapark is the perfect destination for the whole family – with thrilling slides,
                        swimming pools, a relaxing spa zone, and exciting attractions waiting for you every day!
                    </p>
                </div>

                {/* Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Navigation</h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <a href="/contact" className="hover:underline">
                                About us
                            </a>
                        </li>
                        <li>
                            <a href="/attractions" className="hover:underline">
                                Services
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">
                                Contact
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">
                                Policy
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Contact & Social */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Contact</h3>
                    <p className="text-sm mb-2">ul. Przykładowa 1, 00-000 Miasto</p>
                    <p className="text-sm mb-4">kontakt@twojafirma.pl</p>
                    <div className="flex space-x-4">
                        <a href="#" aria-label="Facebook" className="hover:text-gray-300">
                            <Facebook size={20} />
                        </a>
                        <a href="#" aria-label="Instagram" className="hover:text-gray-300">
                            <Instagram size={20} />
                        </a>
                        <a href="#" aria-label="Twitter" className="hover:text-gray-300">
                            <Twitter size={20} />
                        </a>
                    </div>
                </div>
            </div>

            <Separator className="my-6 bg-white/30" />

            <div className="text-center text-sm text-white/80">&copy; {new Date().getFullYear()} AquaPark. All rights reserved.</div>
        </footer>
    );
};

export default Footer;
