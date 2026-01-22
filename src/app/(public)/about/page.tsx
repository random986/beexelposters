'use client'

import { useRef } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CallToAction } from '@/components/home/CallToAction'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Clock, TrendingUp, Users, Zap, CheckCircle2, ArrowRight, ChevronRight, PlayCircle } from 'lucide-react'

export default function AboutPage() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    // Parallax effects
    const y1 = useTransform(scrollYProgress, [0, 1], [0, 200])
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -200])
    const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])

    return (
        <div ref={containerRef} className="min-h-screen bg-white text-[#1A1A1A]">
            <Header lightBackground />

            {/* Hero Section */}
            <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden px-6">
                <motion.div
                    style={{ opacity }}
                    className="text-center z-10"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex items-center justify-center gap-4 mb-6"
                    >
                        <span className="h-[2px] w-12 bg-gray-200"></span>
                        <span className="text-sm font-medium tracking-[0.2em] text-gray-500">EST. 2026 • NAIROBI, KE</span>
                        <span className="h-[2px] w-12 bg-gray-200"></span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-7xl md:text-[120px] font-clash-display font-medium leading-[0.9] tracking-tight mb-8"
                    >
                        BEEXEL<br />POSTERS
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto leading-relaxed"
                    >
                        Redefining creative velocity for the social media age.
                    </motion.p>
                </motion.div>

                {/* Abstract Background Element */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-gray-50 to-gray-100 rounded-full blur-3xl -z-10 opacity-60"></div>
            </section>

            {/* The Problem & Solution - Sticky Scroll or Large Cards */}
            <section className="py-32 px-6">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
                        <motion.div
                            style={{ y: y1 }}
                            className="md:sticky md:top-32"
                        >
                            <h2 className="text-sm font-bold tracking-widest text-gray-400 mb-4 uppercase">The Problem</h2>
                            <h3 className="text-4xl md:text-5xl font-clash-display font-medium leading-tight mb-8">
                                Traditional design is <span className="text-gray-400 decoration-2 underline decoration-gray-200/50 underline-offset-8">too slow</span> for the speed of social media.
                            </h3>
                            <p className="text-lg text-gray-600 leading-relaxed max-w-md">
                                In an era where attention spans are measured in milliseconds and content lifespan is hours, spending days on a single creative asset is a losing strategy. Brands need volume, consistency, and speed to stay relevant.
                            </p>
                        </motion.div>

                        <motion.div
                            style={{ y: y2 }}
                            className="pt-20 md:pt-40"
                        >
                            <div className="bg-[#1A1A1A] text-white p-12 rounded-[40px] shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-8 opacity-10">
                                    <Zap className="w-64 h-64" />
                                </div>
                                <h2 className="text-sm font-bold tracking-widest text-white/60 mb-4 uppercase">The Beexel Solution</h2>
                                <h3 className="text-4xl md:text-5xl font-clash-display font-medium leading-tight mb-8">
                                    Creativity at the <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">speed of thought.</span>
                                </h3>
                                <p className="text-lg text-white/80 leading-relaxed mb-8">
                                    We built an engine that turns ideas into professional posters in seconds, not days. This isn't just a tool; it's a competitive advantage that allows you to post 3x, 5x, or 10x more content without breaking the bank.
                                </p>
                                <div className="flex items-center gap-4 text-sm font-medium text-white/60">
                                    <div className="flex -space-x-3">
                                        <div className="w-10 h-10 rounded-full bg-white/20 border-2 border-[#1A1A1A]"></div>
                                        <div className="w-10 h-10 rounded-full bg-white/20 border-2 border-[#1A1A1A]"></div>
                                        <div className="w-10 h-10 rounded-full bg-white/20 border-2 border-[#1A1A1A]"></div>
                                    </div>
                                    <span>Trusted by social savvy brands</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Redesigned "We Speak Social Media" Section - Scandinavian Layout */}
            <section className="py-32 bg-white relative overflow-hidden">
                <div className="container mx-auto max-w-7xl px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

                        {/* Left Column - Text Content (Span 5) */}
                        <div className="lg:col-span-5 flex flex-col gap-10">
                            <div>
                                <h4 className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-4">#1 Social Media Tool</h4>
                                <h2 className="text-5xl md:text-7xl font-clash-display font-medium text-[#1A1A1A] leading-[1.1] mb-6">
                                    WE SPEAK<br />
                                    SOCIAL MEDIA.
                                </h2>
                                <p className="text-gray-500 text-lg leading-relaxed mb-8">
                                    Founded by social media managers who were tired of waiting on designers. We know that in 2026, volume is a strategy.
                                </p>

                                <div className="flex items-center gap-8">
                                    <button className="px-8 py-4 bg-[#1A1A1A] text-white rounded-full font-bold hover:bg-black hover:scale-105 transition-all shadow-lg">
                                        Get started
                                    </button>

                                    <div className="flex items-center gap-4">
                                        <div className="flex -space-x-3">
                                            {[1, 2, 3, 4].map((i) => (
                                                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                                                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                                                </div>
                                            ))}
                                        </div>
                                        <div>
                                            <div className="font-bold text-[#1A1A1A]">120k</div>
                                            <div className="text-xs text-gray-500">Happy Customers</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Visuals & Features (Span 7) */}
                        <div className="lg:col-span-7 relative">
                            {/* Main Composition */}
                            <div className="flex flex-col md:flex-row gap-8 items-center">

                                {/* Image Container */}
                                <div className="relative w-full md:w-3/5">
                                    <div className="rounded-[40px] overflow-hidden h-[500px] shadow-2xl relative">
                                        <img
                                            src="https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?q=80&w=1000&auto=format&fit=crop"
                                            alt="Scandinavian Interior"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Floating Overlapping Image */}
                                    <div className="absolute -top-10 -right-10 w-48 h-32 rounded-[24px] overflow-hidden shadow-xl border-4 border-white hidden md:block">
                                        <img
                                            src="https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?q=80&w=400&auto=format&fit=crop"
                                            alt="Detail"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    <div className="absolute bottom-8 left-8 bg-black/40 backdrop-blur-md text-white p-4 rounded-2xl flex items-center gap-3">
                                        <div className="bg-white p-2 rounded-full">
                                            <PlayCircle className="w-6 h-6 text-[#1A1A1A]" />
                                        </div>
                                        <div>
                                            <div className="font-medium text-sm">See how it works</div>
                                            <div className="text-xs text-white/80">2 min video</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Feature List (Right Side of Image) */}
                                <div className="w-full md:w-2/5 flex flex-col gap-6">
                                    {[
                                        {
                                            title: "Consistency Wins",
                                            desc: "Algorithms reward consistency. Maintain a daily posting schedule with zero friction.",
                                            date: "Engagement"
                                        },
                                        {
                                            title: "Instant Content",
                                            desc: "Generate a relevant poster in 30 seconds and ride the wave while it's hot.",
                                            date: "Speed"
                                        },
                                        {
                                            title: "Democratized Design",
                                            desc: "High-end agency power in the hands of every business owner.",
                                            date: "Agency Quality"
                                        }
                                    ].map((feature, idx) => (
                                        <div key={idx} className="group cursor-pointer">
                                            <div className="flex items-center justify-between mb-2">
                                                <h3 className="text-lg font-bold text-[#1A1A1A] group-hover:text-blue-600 transition-colors">{feature.title}</h3>
                                                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="flex -space-x-2">
                                                    <div className="w-6 h-6 rounded-full bg-gray-100 border border-white"></div>
                                                    <div className="w-6 h-6 rounded-full bg-gray-100 border border-white"></div>
                                                </div>
                                                <span className="text-xs text-gray-400  uppercase tracking-wider">{feature.date}</span>
                                            </div>
                                            <p className="text-sm text-gray-500 leading-relaxed border-b border-gray-100 pb-4 group-hover:border-blue-100 transition-colors">
                                                {feature.desc}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats / Proof */}
            <section className="py-32 px-6 bg-white border-t border-gray-100">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center md:text-left">
                        <div>
                            <div className="text-5xl md:text-6xl font-clash-display font-semibold mb-2">30s</div>
                            <div className="text-sm font-medium tracking-widest text-gray-500 uppercase">Avg. Creation Time</div>
                        </div>
                        <div>
                            <div className="text-5xl md:text-6xl font-clash-display font-semibold mb-2">10x</div>
                            <div className="text-sm font-medium tracking-widest text-gray-500 uppercase">Cheaper than Agencies</div>
                        </div>
                        <div>
                            <div className="text-5xl md:text-6xl font-clash-display font-semibold mb-2">24/7</div>
                            <div className="text-sm font-medium tracking-widest text-gray-500 uppercase">Availability</div>
                        </div>
                        <div>
                            <div className="text-5xl md:text-6xl font-clash-display font-semibold mb-2">100%</div>
                            <div className="text-sm font-medium tracking-widest text-gray-500 uppercase">Kenyan Owned</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Manifesto */}
            <section className="py-40 px-6 bg-[#1A1A1A] text-white text-center">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-clash-display font-medium mb-12">Our Philosophy</h2>
                    <div className="space-y-6 text-xl md:text-3xl text-white/80 font-light leading-relaxed">
                        <p>"Design should not be a bottleneck."</p>
                        <p>"Creativity should be accessible to all."</p>
                        <p>"Speed is the new quality."</p>
                    </div>
                    <div className="mt-20">
                        <div className="w-px h-24 bg-gradient-to-b from-white to-transparent mx-auto"></div>
                    </div>
                </div>
            </section>

            {/* Global CTA Section */}
            <CallToAction />

            <Footer />
        </div>
    )
}
