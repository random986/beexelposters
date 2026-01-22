'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const testimonials = [
    {
        id: 1,
        name: 'Savannah Nguyen',
        role: 'Sales Manager',
        location: 'Central African Republic',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop',
        review: 'Beexel Posters transformed how we handle our event marketing. What used to take days of back-and-forth with designers now takes minutes. The quality is indistinguishable from top-tier agency work.'
    },
    {
        id: 2,
        name: 'Esther Howard',
        role: 'Work Assistant',
        location: 'Aland Islands',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop',
        review: 'The ability to simply type what I need and get a print-ready poster is mind-blowing. It captures our brand aesthetic perfectly every single time, saving us thousands in design costs.'
    },
    {
        id: 3,
        name: 'Darlene Robertson',
        role: 'Creative Director',
        location: 'Saint Barthelemy',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop',
        review: 'As a creative director, I use this for rapid ideation. It helps me visualize concepts for clients instantly. The high-res export is a game changer for our pitch decks and presentations.'
    },
    {
        id: 4,
        name: 'Cameron Williamson',
        role: 'Small Business Owner',
        location: 'Canada',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop',
        review: "I don't have a design budget, but Beexel Posters makes me look like I do. My social media engagement has doubled since I started using these professional-grade posters for my campaigns."
    },
    {
        id: 5,
        name: 'Brooklyn Simmons',
        role: 'Tech Startup Founder',
        location: 'USA',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000&auto=format&fit=crop',
        review: 'Efficiency is key for us. The automated layout adjustments save us so much time. It\'s like having a senior designer on staff, available 24/7 without the overhead costs.'
    },
    {
        id: 6,
        name: 'Leslie Alexander',
        role: 'Tech Support',
        location: 'UK',
        image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1000&auto=format&fit=crop',
        review: 'The visual elements are incredibly rich. I love how I can tweak the colors and layouts to match different event vibes. Absolutely essential tool for my promotional workflow.'
    }
]

export function Testimonials() {
    const [activeIndex, setActiveIndex] = useState(0)
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    const activeTestimonial = testimonials[activeIndex]

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 300
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            })
        }
    }

    return (
        <section className="relative py-24 px-6 md:px-12 flex justify-center overflow-hidden">
            {/* Background Image - Blurred & Darkened */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2600&auto=format&fit=crop"
                    alt="Office Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[4px]"></div>
            </div>

            {/* Glass Container */}
            <div className="w-full max-w-[1400px] rounded-[48px] border border-white/20 relative overflow-hidden z-20 shadow-2xl">
                {/* Frosted Glass Background layer */}
                <div className="absolute inset-0 bg-white/10 backdrop-blur-3xl"></div>

                <div className="relative z-10 flex flex-col h-full p-8 md:p-14">

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

                        {/* Left: Testimonial Cards with Arrow Navigation */}
                        <div className="lg:col-span-7 relative">
                            {/* Navigation Arrows */}
                            <div className="absolute -top-4 right-0 flex gap-3 z-10">
                                <button
                                    onClick={() => scroll('left')}
                                    className="p-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all border border-white/20 backdrop-blur-sm"
                                    aria-label="Scroll left"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => scroll('right')}
                                    className="p-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all border border-white/20 backdrop-blur-sm"
                                    aria-label="Scroll right"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>

                            <div
                                ref={scrollContainerRef}
                                className="flex gap-4 md:gap-6 overflow-x-auto pb-4 pt-8 no-scrollbar items-stretch scroll-smooth"
                                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                            >
                                {testimonials.map((item, idx) => (
                                    <div
                                        key={item.id}
                                        onClick={() => setActiveIndex(idx)}
                                        className={`min-w-[260px] md:min-w-[280px] bg-white rounded-[32px] p-6 flex flex-col gap-6 shadow-lg cursor-pointer transition-all duration-300 ${activeIndex === idx
                                            ? 'scale-105 ring-2 ring-white/50'
                                            : 'opacity-80 hover:opacity-100 hover:scale-102'
                                            }`}
                                    >
                                        <div>
                                            <h4 className="font-clash-display font-medium text-lg text-[#1A1A1A] mb-1">
                                                {item.name}
                                            </h4>
                                            <p className="text-xs text-gray-400 font-medium tracking-wide">
                                                {item.location}
                                            </p>
                                        </div>

                                        <div className="relative w-24 h-24 rounded-full overflow-hidden mx-auto bg-gray-100 border-4 border-gray-50 shadow-inner">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>

                                        <div className="flex justify-between items-end mt-auto pt-2">
                                            <span className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider">
                                                {item.role}
                                            </span>
                                            <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${activeIndex === idx
                                                ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                                                : 'border-gray-200 text-[#1A1A1A] group-hover:bg-[#1A1A1A] group-hover:text-white'
                                                }`}>
                                                <ArrowRight className="w-3.5 h-3.5" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right: Dynamic Text Content */}
                        <div className="lg:col-span-5 text-white pl-4">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeIndex}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <span className="block text-xs font-bold uppercase tracking-widest text-white/50 mb-4">
                                        Succeed Together
                                    </span>
                                    <h2 className="text-4xl md:text-5xl font-clash-display font-medium leading-tight mb-8 text-white drop-shadow-sm">
                                        What <span className="text-cyan-300">{activeTestimonial.name}</span> had to say
                                    </h2>

                                    <div className="relative mb-8">
                                        <Quote className="w-12 h-12 text-white/20 absolute -left-2 -top-2" />
                                        <p className="text-lg md:text-xl text-white/90 leading-relaxed pl-8 font-light italic">
                                            "{activeTestimonial.review}"
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-3 text-sm text-white/60">
                                        <span className="h-px w-8 bg-white/30"></span>
                                        <span className="font-medium">{activeTestimonial.role}</span>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                    </div>

                </div>
            </div>

            <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
        </section>
    )
}
