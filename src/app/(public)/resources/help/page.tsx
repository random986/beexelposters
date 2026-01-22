'use client'

import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Book, HelpCircle, FileText, Video, MessageCircle } from 'lucide-react'
import Link from 'next/link'

export default function HelpPage() {
    const helpCategories = [
        {
            icon: Book,
            title: 'Getting Started',
            desc: 'Learn the basics of creating posters',
            articles: [
                'How to create your first poster',
                'Understanding AI prompts',
                'Choosing the right template',
                'Payment via M-PESA guide'
            ]
        },
        {
            icon: FileText,
            title: 'Design Guidelines',
            desc: 'Tips for better poster designs',
            articles: [
                'Writing effective prompts',
                'Color theory for posters',
                'Typography best practices',
                'Print vs Digital formats'
            ]
        },
        {
            icon: Video,
            title: 'Video Tutorials',
            desc: 'Step-by-step video guides',
            articles: [
                'Complete walkthrough',
                'Advanced customization',
                'Exporting for print',
                'Social media optimization'
            ]
        },
        {
            icon: MessageCircle,
            title: 'Troubleshooting',
            desc: 'Common issues and solutions',
            articles: [
                'Payment not processing',
                'Download issues',
                'Quality concerns',
                'Refund policy'
            ]
        }
    ]

    return (
        <div className="min-h-screen bg-white">
            <Header lightBackground />

            <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-[#FAFAF8] to-white">
                <div className="container mx-auto max-w-4xl text-center">
                    <h1 className="text-6xl md:text-7xl font-clash-display font-medium text-[#1A1A1A] mb-6 leading-tight">
                        How can we help?
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto leading-relaxed mb-10">
                        Find answers, guides, and resources to make the most of Beexel Posters
                    </p>

                    <div className="max-w-2xl mx-auto">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search for help..."
                                className="w-full px-6 py-5 rounded-full border-2 border-gray-200 focus:border-[#1A1A1A] focus:ring-4 focus:ring-[#1A1A1A]/10 outline-none text-lg"
                            />
                            <HelpCircle className="absolute right-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 px-6">
                <div className="container mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {helpCategories.map((category, idx) => (
                            <div
                                key={idx}
                                className="bg-white rounded-[32px] border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 group"
                            >
                                <div className="w-14 h-14 bg-[#F5F5F2] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <category.icon className="w-7 h-7 text-[#1A1A1A]" />
                                </div>
                                <h3 className="text-2xl font-clash-display font-medium text-[#1A1A1A] mb-3">
                                    {category.title}
                                </h3>
                                <p className="text-gray-500 mb-6">{category.desc}</p>
                                <ul className="space-y-3">
                                    {category.articles.map((article, i) => (
                                        <li key={i}>
                                            <a href="#" className="text-sm text-gray-600 hover:text-[#1A1A1A] transition-colors flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
                                                {article}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 px-6 bg-[#FAFAF8]">
                <div className="container mx-auto max-w-4xl text-center">
                    <h2 className="text-4xl md:text-5xl font-clash-display font-medium text-[#1A1A1A] mb-10">
                        Still need help?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Link href="/contact">
                            <div className="bg-white rounded-[24px] p-8 hover:shadow-lg transition-all cursor-pointer border border-gray-100">
                                <h3 className="font-medium text-[#1A1A1A] mb-2">Contact Us</h3>
                                <p className="text-sm text-gray-600">Get in touch with our support team</p>
                            </div>
                        </Link>
                        <Link href="/resources/faq">
                            <div className="bg-white rounded-[24px] p-8 hover:shadow-lg transition-all cursor-pointer border border-gray-100">
                                <h3 className="font-medium text-[#1A1A1A] mb-2">FAQ</h3>
                                <p className="text-sm text-gray-600">Browse frequently asked questions</p>
                            </div>
                        </Link>
                        <Link href="/render">
                            <div className="bg-white rounded-[24px] p-8 hover:shadow-lg transition-all cursor-pointer border border-gray-100">
                                <h3 className="font-medium text-[#1A1A1A] mb-2">Try It Now</h3>
                                <p className="text-sm text-gray-600">Start creating your poster</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}
