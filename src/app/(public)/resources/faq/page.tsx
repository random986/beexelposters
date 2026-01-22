'use client'

import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(0)

    const faqs = [
        {
            category: 'Getting Started',
            questions: [
                {
                    q: 'How does Beexel Posters work?',
                    a: 'Simply describe what you want, pay via M-PESA through Intasend, and our AI generates a professional poster in under 30 seconds.'
                },
                {
                    q: 'Do I need design experience?',
                    a: 'Not at all! Just tell us what you want and we create it for you.'
                },
                {
                    q: 'How long does it take?',
                    a: 'Most posters are generated in under 30 seconds.'
                }
            ]
        },
        {
            category: 'Payment',
            questions: [
                {
                    q: 'What payment methods do you accept?',
                    a: 'We accept M-PESA payments through Intasend for instant, secure transactions.'
                },
                {
                    q: 'Is my payment secure?',
                    a: 'Yes! Intasend provides enterprise-grade security. We never store your M-PESA PIN.'
                },
                {
                    q: 'Can I get a refund?',
                    a: 'Contact us within 24 hours if you\'re not satisfied and we\'ll review your request.'
                }
            ]
        },
        {
            category: 'Creating Posters',
            questions: [
                {
                    q: 'What types of posters can I create?',
                    a: 'Events, businesses, education, healthcare, marketing campaigns, concerts, and more.'
                },
                {
                    q: 'Can I customize the design?',
                    a: 'Yes! Specify colors, styles, and content in your prompt for personalized results.'
                },
                {
                    q: 'What formats are available?',
                    a: 'High-resolution PNG and JPG suitable for print, web, and social media.'
                }
            ]
        }
    ]

    return (
        <div className="min-h-screen bg-white">
            <Header lightBackground />

            <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-[#FAFAF8] to-white">
                <div className="container mx-auto max-w-4xl text-center">
                    <div className="w-20 h-20 bg-blue-100 rounded-3xl flex items-center justify-center mx-auto mb-8">
                        <HelpCircle className="w-10 h-10 text-blue-600" />
                    </div>
                    <h1 className="text-6xl md:text-7xl font-clash-display font-medium text-[#1A1A1A] mb-6 leading-tight">
                        Got Questions?
                    </h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                        Quick answers to common questions about Beexel Posters
                    </p>
                </div>
            </section>

            <section className="py-20 px-6">
                <div className="container mx-auto max-w-4xl">
                    {faqs.map((section, sectionIdx) => (
                        <div key={sectionIdx} className="mb-16">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-1 bg-[#1A1A1A] rounded-full"></div>
                                <h2 className="text-3xl font-clash-display font-medium text-[#1A1A1A]">
                                    {section.category}
                                </h2>
                            </div>
                            <div className="space-y-4">
                                {section.questions.map((faq, faqIdx) => {
                                    const globalIndex = sectionIdx * 100 + faqIdx
                                    const isOpen = openIndex === globalIndex

                                    return (
                                        <div
                                            key={faqIdx}
                                            className="bg-white border-2 border-gray-100 rounded-[28px] overflow-hidden hover:shadow-lg transition-all"
                                        >
                                            <button
                                                onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                                                className="w-full px-8 py-6 flex items-center justify-between text-left"
                                            >
                                                <span className="font-medium text-lg text-[#1A1A1A] pr-4">
                                                    {faq.q}
                                                </span>
                                                <ChevronDown
                                                    className={`w-6 h-6 text-gray-400 transition-transform shrink-0 ${isOpen ? 'rotate-180' : ''
                                                        }`}
                                                />
                                            </button>
                                            {isOpen && (
                                                <div className="px-8 pb-6 text-gray-600 leading-relaxed text-lg">
                                                    {faq.a}
                                                </div>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="py-20 px-6 bg-[#FAFAF8]">
                <div className="container mx-auto max-w-4xl text-center">
                    <h2 className="text-4xl md:text-5xl font-clash-display font-medium text-[#1A1A1A] mb-6">
                        Still have questions?
                    </h2>
                    <p className="text-lg text-gray-500 mb-8">
                        Our team is here to help
                    </p>
                    <Link href="/contact">
                        <button className="px-10 py-5 bg-[#1A1A1A] text-white rounded-full font-bold text-sm tracking-widest uppercase hover:bg-black transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1">
                            Contact Support
                        </button>
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    )
}
