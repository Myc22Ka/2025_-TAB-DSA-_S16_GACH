import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import DefaultLayout from '@/layouts/DefaultLayout';
import Section from '@/layouts/Section';

function ContactPage() {
    return (
        <DefaultLayout>
            <Section>
                <div className="w-full px-6 md:px-12 lg:px-24 text-center mb-16">
                    <h1 className="text-5xl font-kanchenjunga font-bold text-gray-900 dark:text-white mb-6">Contact Us!</h1>
                    <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">Have you any questions? Just ask us!</p>
                </div>
            </Section>

            <Section>
                <div className="max-w-4xl mx-auto grid gap-8 sm:grid-cols-2 px-6 md:px-12 lg:px-24">
                    <div className="flex items-start space-x-4">
                        <MapPin className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Address</h2>
                            <p className="text-gray-700 dark:text-gray-300">
                                ul. Przykładowa 123
                                <br />
                                00-000 Miasto
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start space-x-4">
                        <Phone className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Phone</h2>
                            <p className="text-gray-700 dark:text-gray-300">+48 123 456 789</p>
                        </div>
                    </div>

                    <div className="flex items-start space-x-4">
                        <Mail className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Email</h2>
                            <p className="text-gray-700 dark:text-gray-300">kontakt@aquapark.pl</p>
                        </div>
                    </div>

                    <div className="flex items-start space-x-4">
                        <Clock className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Opening hours</h2>
                            <p className="text-gray-700 dark:text-gray-300">Pon - Nd: 08:00 - 22:00</p>
                        </div>
                    </div>
                </div>
            </Section>
        </DefaultLayout>
    );
}

export default ContactPage;
