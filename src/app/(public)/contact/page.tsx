'use client'

import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CallToAction } from '@/components/home/CallToAction'
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from 'lucide-react'

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-white">
            <Header lightBackground />

            <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-[#FAFAF8] to-white">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h1 className="text-6xl md:text-7xl font-clash-display font-medium text-[#1A1A1A] mb-6 leading-tight">
                                Let's Talk
                            </h1>
                            <p className="text-xl text-gray-600 leading-relaxed mb-8">
                                Have questions about creating posters or need help? Our team is here to support your creative journey.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0">
                                        <Mail className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-[#1A1A1A] mb-1 text-lg">Email Us</h3>
                                        <p className="text-gray-600">support@beexelposters.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center shrink-0">
                                        <Phone className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-[#1A1A1A] mb-1 text-lg">Call Us</h3>
                                        <p className="text-gray-600">+254 700 000 000</p>
                                        <p className="text-sm text-gray-500">Mon-Fri, 9AM - 6PM EAT</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center shrink-0">
                                        <MapPin className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-[#1A1A1A] mb-1 text-lg">Visit Us</h3>
                                        <p className="text-gray-600">Nairobi, Kenya</p>
                                        <p className="text-sm text-gray-500">Serving all of Kenya</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-[40px] p-10 border-2 border-gray-100 shadow-xl">
                            <h2 className="text-3xl font-clash-display font-medium text-[#1A1A1A] mb-8">
                                Send a Message
                            </h2>

                            <form className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-[#1A1A1A] focus:ring-4 focus:ring-[#1A1A1A]/10 outline-none transition-all"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                    <input
                                        type="email"
                                        className="w-full px-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-[#1A1A1A] focus:ring-4 focus:ring-[#1A1A1A]/10 outline-none transition-all"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                    <textarea
                                        rows={5}
                                        className="w-full px-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-[#1A1A1A] focus:ring-4 focus:ring-[#1A1A1A]/10 outline-none transition-all resize-none"
                                        placeholder="How can we help you?"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full px-8 py-5 bg-[#1A1A1A] text-white rounded-full font-bold text-sm tracking-widest uppercase hover:bg-black transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                                >
                                    <Send className="w-4 h-4" />
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 px-6 bg-gradient-to-br from-green-50 to-emerald-50">
                <div className="container mx-auto max-w-4xl">
                    <div className="bg-white rounded-[40px] p-12 shadow-xl text-center">
                        <div className="w-20 h-20 bg-green-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                            <MessageCircle className="w-10 h-10 text-green-600" />
                        </div>
                        <h3 className="text-3xl font-clash-display font-medium text-[#1A1A1A] mb-4">
                            Payment via M-PESA
                        </h3>
                        <p className="text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto">
                            We use <strong className="text-green-600">Intasend</strong> for secure M-PESA payments. All transactions are encrypted and protected. Pay instantly and start creating your posters right away.
                        </p>
                    </div>
                </div>
            </section>


            <CallToAction />
            <Footer />

        </div>
    )
}
