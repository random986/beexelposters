'use client'

import Link from 'next/link'
import { ArrowRight, CheckCircle2, Zap, ShieldCheck } from 'lucide-react'

export function CallToAction() {
    return (
        <section className="py-24 px-4 md:px-6 bg-white">
            <div className="container mx-auto max-w-[95%]">
                <div className="relative bg-[#F4F4F2] rounded-[48px] overflow-hidden min-h-[500px] flex items-center">

                    {/* Background Image with Fade */}
                    <div className="absolute inset-0 z-0">
                        <img
                            src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2000&auto=format&fit=crop"
                            alt="Background"
                            className="w-full h-full object-cover opacity-60 grayscale mix-blend-multiply"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#F4F4F2] via-[#F4F4F2]/95 to-transparent"></div>
                    </div>

                    <div className="relative z-10 p-12 md:p-24 max-w-4xl">
                        <h2 className="font-clash-display text-5xl md:text-7xl font-medium text-[#1A1A1A] mb-8 tracking-tight leading-[1.1]">
                            Let's Build Your Vision Together
                        </h2>
                        <p className="font-poppins text-xl text-[#6B6B68] mb-12 leading-relaxed max-w-2xl">
                            From concept to creation, our AI is ready to design posters that inspire.
                            Unlock the power of professional design at a fraction of the cost.
                        </p>

                        {/* Added 'Meat' - Features List */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center shrink-0">
                                    <Zap className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-[#1A1A1A] mb-1">AI-Powered Precision</h4>
                                    <p className="text-sm text-[#6B6B68]">Smart layouts that adapt to your brand identity instantly.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center shrink-0">
                                    <CheckCircle2 className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-[#1A1A1A] mb-1">Business Ready</h4>
                                    <p className="text-sm text-[#6B6B68]">High-resolution exports suitable for both digital and print.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center shrink-0">
                                    <ShieldCheck className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-[#1A1A1A] mb-1">Secure & Private</h4>
                                    <p className="text-sm text-[#6B6B68]">Your brand assets and designs are protected and private.</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center">
                            <Link href="/render">
                                <button className="px-10 py-5 bg-[#1A1A1A] text-white rounded-full font-bold text-sm tracking-widest uppercase hover:bg-black transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center gap-3">
                                    Start Your Project
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </Link>

                            <div className="flex items-center gap-3 text-base font-medium text-[#6B6B68]">
                                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
                                Instant Access • Cancel Anytime
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
