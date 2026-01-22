'use client'

import { ArrowRight, Sparkles, LayoutTemplate, Palette, Download } from 'lucide-react'

export function HowItWorks() {
    return (
        <section className="py-24 px-6 bg-[#FAFAF8]">
            <div className="container mx-auto max-w-7xl">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">

                    {/* Left Column - Text & Steps 1-2 */}
                    <div className="lg:col-span-7 flex flex-col gap-12">

                        {/* Header Text */}
                        <div className="max-w-2xl">
                            <h2 className="text-5xl md:text-7xl font-clash-display font-medium text-[#1A1A1A] mb-6 leading-[1.1]">
                                Create stunning posters in minutes.
                            </h2>
                            <p className="text-lg text-gray-500 leading-relaxed max-w-lg">
                                Streamline your design process with AI-powered tools. Whether you need a flyer for a gig or a corporate banner, we've got you covered.
                            </p>
                        </div>

                        {/* Small Cards Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Step 1 Card */}
                            <div className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 hover:shadow-md transition-shadow h-[280px] flex flex-col justify-between group cursor-pointer">
                                <div className="flex justify-between items-start">
                                    <span className="px-3 py-1 rounded-full border border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wide">
                                        Step 01
                                    </span>
                                </div>

                                <div className="flex -space-x-3 my-auto">
                                    {[1, 2, 3].map((_, i) => (
                                        <div key={i} className="w-12 h-12 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-gray-400">
                                            <LayoutTemplate className="w-5 h-5" />
                                        </div>
                                    ))}
                                </div>

                                <div className="flex items-end justify-between">
                                    <div>
                                        <h3 className="text-xl font-clash-display font-medium text-[#1A1A1A] mb-1">
                                            Choose Template
                                        </h3>
                                        <p className="text-sm text-gray-400">Select from curated styles</p>
                                    </div>
                                    <button className="w-10 h-10 rounded-full bg-[#F5F5F2] flex items-center justify-center text-[#1A1A1A] group-hover:bg-black group-hover:text-white transition-colors">
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Step 2 Card */}
                            <div className="relative overflow-hidden bg-[#1A1A1A] p-6 rounded-[32px] shadow-sm h-[280px] flex flex-col justify-between group cursor-pointer text-white">
                                {/* Background Image Overlay */}
                                <div className="absolute inset-0 opacity-40">
                                    <img
                                        src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1000&auto=format&fit=crop"
                                        alt="Editing"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

                                <div className="relative z-10 flex justify-between items-start">
                                    <span className="px-3 py-1 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-xs font-semibold text-white/80 uppercase tracking-wide">
                                        Step 02
                                    </span>
                                </div>

                                <div className="relative z-10 flex items-end justify-between">
                                    <div>
                                        <h3 className="text-xl font-clash-display font-medium text-white mb-1">
                                            Customize
                                        </h3>
                                        <p className="text-sm text-white/60">Add your text & brand</p>
                                    </div>
                                    <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors">
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Right Column - Large Step 3 Card */}
                    <div className="lg:col-span-5 h-full">
                        <div className="relative h-[600px] lg:h-full bg-[#9B9B98] rounded-[40px] overflow-hidden flex flex-col justify-end group cursor-pointer">
                            <img
                                src="https://images.unsplash.com/photo-1558655146-d09347e0b7a8?q=80&w=1000&auto=format&fit=crop"
                                alt="Final Result"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>

                            {/* Floating Label */}
                            <div className="absolute top-8 right-8">
                                <span className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-black shadow-lg">
                                    <Download className="w-5 h-5" />
                                </span>
                            </div>

                            <div className="relative z-10 p-10 bg-gradient-to-t from-black/60 to-transparent">
                                <span className="inline-block px-3 py-1 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-xs font-semibold text-white/90 uppercase tracking-wide mb-4">
                                    Step 03
                                </span>
                                <h3 className="text-3xl font-clash-display font-medium text-white mb-2">
                                    Export & Share
                                </h3>
                                <p className="text-lg text-white/80 max-w-xs">
                                    Get production-ready files instantly.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
