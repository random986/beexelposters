'use client'

import { Zap, LayoutTemplate, Share2, Printer, Sparkles, Palette } from 'lucide-react'

export function WhyChoose() {
    return (
        <section className="py-24 px-6 bg-white">
            <div className="container mx-auto max-w-7xl">

                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-5xl md:text-6xl font-clash-display font-medium text-[#1A1A1A] mb-4">
                        Why professionals choose Beexel Posters
                    </h2>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                        Every detail designed to save you time while maintaining the highest quality standards
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Left Column - 2 Cards Stacked */}
                    <div className="flex flex-col gap-6">
                        {/* Lightning Fast - With dramatic styling */}
                        <div className="bg-gradient-to-br from-[#1A1A1A] to-[#3A3A3A] rounded-3xl p-8 min-h-[280px] relative overflow-hidden group">
                            <div className="absolute inset-0 z-0 opacity-20">
                                <img
                                    src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2000&auto=format&fit=crop"
                                    alt="Speed"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            </div>
                            <div className="relative z-10 flex flex-col justify-between h-full">
                                <Zap className="w-12 h-12 text-yellow-400 mb-4" />
                                <div>
                                    <h3 className="text-3xl font-medium text-white mb-3">Lightning Fast</h3>
                                    <p className="text-white/70 text-base">Under 30 seconds</p>
                                </div>
                            </div>
                        </div>

                        {/* AI-Powered - Clean white card */}
                        <div className="bg-white rounded-3xl p-8 min-h-[280px] flex flex-col justify-between shadow-md hover:shadow-xl transition-all border border-gray-100">
                            <Sparkles className="w-12 h-12 text-purple-500 mb-4" />
                            <div>
                                <h3 className="text-3xl font-medium text-[#1A1A1A] mb-3">AI-Powered</h3>
                                <p className="text-gray-500 text-base">Smart design suggestions</p>
                            </div>
                        </div>
                    </div>

                    {/* Center Column - Large Feature Card */}
                    <div className="bg-[#F5F5F2] rounded-3xl p-10 relative overflow-hidden group shadow-lg">
                        <div className="absolute inset-0 z-0">
                            <img
                                src="https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=2000&auto=format&fit=crop"
                                alt="Multi-Format"
                                className="w-full h-full object-cover opacity-30 transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <div>
                                <Share2 className="w-16 h-16 text-[#1A1A1A] mb-6" />
                                <h3 className="text-5xl font-medium text-[#1A1A1A] mb-6 leading-tight">Multi-Format</h3>
                                <p className="text-gray-600 text-lg mb-8">Perfect for print, web, and social media</p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {['Print', 'Web', 'Social'].map((format) => (
                                    <span key={format} className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-[#1A1A1A] border border-gray-200">
                                        {format}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - 3 Compact Cards */}
                    <div className="flex flex-col gap-6">
                        {/* Industry-Specific */}
                        <div className="bg-white rounded-3xl p-6 min-h-[180px] flex flex-col justify-between shadow-md hover:shadow-lg transition-all border border-gray-100">
                            <LayoutTemplate className="w-10 h-10 text-blue-500 mb-3" />
                            <div>
                                <h3 className="text-2xl font-medium text-[#1A1A1A] mb-2">Industry-Specific</h3>
                                <p className="text-gray-500 text-sm">Tailored templates</p>
                            </div>
                        </div>

                        {/* Print-Ready */}
                        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-6 min-h-[180px] flex flex-col justify-between">
                            <Printer className="w-10 h-10 text-blue-600 mb-3" />
                            <div>
                                <h3 className="text-2xl font-medium text-[#1A1A1A] mb-2">Print-Ready</h3>
                                <p className="text-gray-600 text-sm">High-resolution exports</p>
                            </div>
                        </div>

                        {/* Brand Consistent */}
                        <div className="bg-[#1A1A1A] rounded-3xl p-6 min-h-[180px] flex flex-col justify-between text-white">
                            <Palette className="w-10 h-10 text-white mb-3" />
                            <div>
                                <h3 className="text-2xl font-medium mb-2">Brand Consistent</h3>
                                <p className="text-white/70 text-sm">Your visual identity</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
