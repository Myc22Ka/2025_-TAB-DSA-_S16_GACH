import React from 'react';
import { Separator } from '@/components/ui/separator';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-amber-600 text-white py-10">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Logo & description */}
                <div>
                    <h2 className="text-2xl font-bold mb-2">TwojaFirma</h2>
                    <p className="text-sm">Profesjonalne rozwiązania dla Twojego biznesu. Działamy z pasją i zaangażowaniem.</p>
                </div>

                {/* Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Nawigacja</h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <a href="#" className="hover:underline">
                                O nas
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">
                                Usługi
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">
                                Kontakt
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">
                                Polityka prywatności
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Contact & Social */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Kontakt</h3>
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

            <div className="text-center text-sm text-white/80">&copy; {new Date().getFullYear()} TwojaFirma. Wszelkie prawa zastrzeżone.</div>
        </footer>
    );
};

export default Footer;
