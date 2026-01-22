'use client'

import Link from 'next/link'
import { SelectedProjects } from '@/components/home/SelectedProjects'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { HowItWorks } from '@/components/home/HowItWorks'
import { Testimonials } from '@/components/home/Testimonials'
import { WhyChoose } from '@/components/home/WhyChoose'
import { CallToAction } from '@/components/home/CallToAction'
import {
  Sparkles,
  ArrowRight,
  Zap,
  Palette,
  Clock,
  CheckCircle,
  GraduationCap,
  Building2,
  Utensils,
  Heart,
  TrendingUp,
  Music,
  Share2,
  LayoutTemplate,
  Printer
} from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#f0f4f8] text-[#2C2C2C]">
      <Header />

      {/* Hero Section - Light Blue (#9bc2d1) with Corporate Background */}
      <section className="relative pt-24 pb-96 px-6 overflow-hidden font-clash-display">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&h=1080&fit=crop"
            alt="Happy corporate team"
            className="w-full h-full object-cover"
          />
          {/* Light Blue Overlay - #9bc2d1 shade */}

        </div>

        {/* Content */}
        {/* Content */}
        <div className="container mx-auto max-w-5xl relative z-20">
          <div className="text-center pt-10 pb-40">
            <h1
              className="font-clash-display text-4xl md:text-6xl lg:text-7xl font-extralight leading-[1.1] text-white tracking-tight drop-shadow-lg"
              style={{ fontFamily: "'Clash Display', sans-serif" }}
            >
              Create professional<br />
              posters with AI
            </h1>
          </div>
        </div>
      </section>

      {/* Glassmorphic Feature Cards Section */}
      <div className="w-[98%] max-w-[1920px] mx-auto relative z-30 -mt-80">
        <div className="bg-white/70 backdrop-blur-3xl border-2 border-white/60 rounded-[32px] p-8 md:p-14 min-h-[850px] flex flex-col justify-center shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Left Main Column - Spans 2 cols wide */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Top Text Area */}
              <div className="bg-transparent p-8">
                <span className="text-sm font-semibold tracking-widest uppercase text-gray-500 mb-4 block">AI-Powered Design</span>
                <h2 className="text-6xl md:text-7xl font-medium leading-[0.9] text-[#1A1A1A] mb-6 tracking-tight">
                  Intelligent<br />Creativity
                </h2>
                <p className="text-gray-600 max-w-md text-base leading-relaxed">
                  Transform simple text prompts into stunning, professional-grade posters within seconds. Our AI understands context, composition, and brand identity.
                </p>
              </div>

              {/* Bottom Wide Card */}
              <div className="bg-[#E8E8E5] rounded-3xl p-8 h-[450px] relative overflow-hidden group shadow-lg">
                <div className="absolute inset-0 z-0">
                  <img
                    src="https://images.unsplash.com/photo-1557838923-2985c318be48?q=80&w=2000&auto=format&fit=crop"
                    alt="Poster Creation"
                    className="w-full h-full object-cover opacity-50 transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/40 to-transparent"></div>
                </div>

                <div className="relative z-10 h-full flex flex-col justify-center">
                  <h3 className="text-4xl font-medium text-[#1A1A1A] mb-8 max-w-sm leading-tight">Perfect for Every<br />Occasion</h3>

                  {/* Industry Pills */}
                  <div className="flex flex-wrap gap-3 max-w-md">
                    {[
                      { name: 'Events', icon: Music },
                      { name: 'Business', icon: TrendingUp },
                      { name: 'Marketing', icon: Sparkles },
                      { name: 'Social Media', icon: Heart },
                      { name: 'Education', icon: GraduationCap }
                    ].map((item, idx) => (
                      <div key={idx} className="bg-white/90 backdrop-blur-sm px-5 py-3 rounded-full flex items-center gap-2 shadow-sm border border-white/50 animate-in fade-in zoom-in duration-500 hover:scale-105 transition-transform cursor-default" style={{ animationDelay: `${idx * 100}ms` }}>
                        <item.icon className="w-4 h-4 text-[#1A1A1A]" />
                        <span className="text-base font-medium text-[#1A1A1A]">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Spans 1 col */}
            <div className="flex flex-col gap-6 h-full">

              {/* Top Two Small Cards Grid */}
              <div className="grid grid-cols-2 gap-4 h-full">
                {/* Card 1 */}
                <div className="bg-white rounded-3xl p-6 flex flex-col justify-between min-h-[220px] hover:shadow-lg transition-all duration-300">
                  <h3 className="text-xl font-medium leading-tight text-[#1A1A1A]">Lightning<br />Fast</h3>
                  <p className="text-gray-500 text-sm mt-4">Generate professional posters in under 30 seconds.</p>
                </div>

                {/* Card 2 */}
                <div className="bg-white rounded-3xl p-6 flex flex-col justify-between min-h-[220px] hover:shadow-lg transition-all duration-300">
                  <h3 className="text-xl font-medium leading-tight text-[#1A1A1A]">Brand<br />Consistent</h3>
                  <p className="text-gray-500 text-sm mt-4">Maintain your visual identity across all designs.</p>
                </div>
              </div>

              {/* Bottom Tall Card */}
              <div className="bg-[#4A4A4A] rounded-3xl h-full min-h-[260px] relative overflow-hidden group text-white p-8">
                <div className="absolute inset-0 z-0 opacity-80 mix-blend-overlay">
                  <img
                    src="https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop"
                    alt="Print Ready"
                    className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="relative z-10 flex flex-col justify-between h-full">
                  <h3 className="text-2xl font-medium">Print-Ready<br />Quality</h3>
                  <p className="text-white/70 text-sm mt-auto">High-resolution exports for digital and print.</p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>


      {/* Industries Served - Icon Grid */}
      <section className="py-40 px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-24">
            <h2 className="font-clash-display text-6xl md:text-8xl font-medium text-[#1A1A1A] tracking-tight">
              Industries We Serve
            </h2>
          </div>

          {/* Dual Marquee Rows */}
          <div className="relative w-full overflow-hidden">
            {/* Gradient Masks for smooth fade edges */}


            <style>
              {`
               @keyframes marquee {
                 0% { transform: translateX(0); }
                 100% { transform: translateX(-50%); }
               }
               @keyframes marquee-reverse {
                 0% { transform: translateX(-50%); }
                 100% { transform: translateX(0); }
               }
               .animate-marquee {
                 animation: marquee 40s linear infinite;
               }
               .animate-marquee-reverse {
                 animation: marquee-reverse 40s linear infinite;
               }
               .pause-hover:hover {
                 animation-play-state: paused;
               }
               `}
            </style>

            <div className="flex flex-col gap-6">
              {/* Row 1 - Left */}
              <div className="flex w-max animate-marquee gap-6 pause-hover">
                {[
                  { icon: GraduationCap, title: 'Education', color: '#5BA8C4' },
                  { icon: Building2, title: 'Real Estate', color: '#A75BC4' },
                  { icon: Utensils, title: 'Hospitality', color: '#5BA8C4' },
                  { icon: Heart, title: 'Healthcare', color: '#A75BC4' },
                  { icon: TrendingUp, title: 'Business', color: '#5BA8C4' },
                  { icon: Music, title: 'Entertainment', color: '#A75BC4' },
                  // Duplicate for loop
                  { icon: GraduationCap, title: 'Education', color: '#5BA8C4' },
                  { icon: Building2, title: 'Real Estate', color: '#A75BC4' },
                  { icon: Utensils, title: 'Hospitality', color: '#5BA8C4' },
                  { icon: Heart, title: 'Healthcare', color: '#A75BC4' },
                  { icon: TrendingUp, title: 'Business', color: '#5BA8C4' },
                  { icon: Music, title: 'Entertainment', color: '#A75BC4' },
                  // Triplicate for seamless on wide screens
                  { icon: GraduationCap, title: 'Education', color: '#5BA8C4' },
                  { icon: Building2, title: 'Real Estate', color: '#A75BC4' },
                  { icon: Utensils, title: 'Hospitality', color: '#5BA8C4' },
                  { icon: Heart, title: 'Healthcare', color: '#A75BC4' },
                  { icon: TrendingUp, title: 'Business', color: '#5BA8C4' },
                  { icon: Music, title: 'Entertainment', color: '#A75BC4' },
                ].map((industry, idx) => (
                  <div key={idx} className="bg-white rounded-full px-8 py-4 flex items-center gap-4 shadow-sm border border-gray-100 min-w-[240px]">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${industry.color}15` }}
                    >
                      <industry.icon className="w-5 h-5" style={{ color: industry.color }} />
                    </div>
                    <h4 className="font-clash-display text-lg font-medium text-[#1A1A1A]">
                      {industry.title}
                    </h4>
                  </div>
                ))}
              </div>

              {/* Row 2 - Right (Reverse) */}
              <div className="flex w-max animate-marquee-reverse gap-6 pause-hover">
                {[
                  { icon: TrendingUp, title: 'Marketing', color: '#FF6B6B' },
                  { icon: Music, title: 'Concerts', color: '#4ECDC4' },
                  { icon: GraduationCap, title: 'Workshops', color: '#45B7D1' },
                  { icon: Building2, title: 'Construction', color: '#96CEB4' },
                  { icon: Utensils, title: 'Restaurants', color: '#FFEEAD' },
                  { icon: Heart, title: 'Wellness', color: '#FF9999' },
                  // Duplicate
                  { icon: TrendingUp, title: 'Marketing', color: '#FF6B6B' },
                  { icon: Music, title: 'Concerts', color: '#4ECDC4' },
                  { icon: GraduationCap, title: 'Workshops', color: '#45B7D1' },
                  { icon: Building2, title: 'Construction', color: '#96CEB4' },
                  { icon: Utensils, title: 'Restaurants', color: '#FFEEAD' },
                  { icon: Heart, title: 'Wellness', color: '#FF9999' },
                  // Triplicate
                  { icon: TrendingUp, title: 'Marketing', color: '#FF6B6B' },
                  { icon: Music, title: 'Concerts', color: '#4ECDC4' },
                  { icon: GraduationCap, title: 'Workshops', color: '#45B7D1' },
                  { icon: Building2, title: 'Construction', color: '#96CEB4' },
                  { icon: Utensils, title: 'Restaurants', color: '#FFEEAD' },
                  { icon: Heart, title: 'Wellness', color: '#FF9999' },
                ].map((industry, idx) => (
                  <div key={idx} className="bg-white rounded-full px-8 py-4 flex items-center gap-4 shadow-sm border border-gray-100 min-w-[240px]">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${industry.color}15` }}
                    >
                      <industry.icon className="w-5 h-5" style={{ color: industry.color }} />
                    </div>
                    <h4 className="font-clash-display text-lg font-medium text-[#1A1A1A]">
                      {industry.title}
                    </h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Selected Projects Showcase */}
      <SelectedProjects />

      {/* How It Works - Redesigned */}
      <HowItWorks />

      {/* Testimonials - Glassmorphic */}
      <Testimonials />

      {/* Why Professionals Choose - Enhanced Design */}
      <WhyChoose />


      {/* CTA Section - Redesigned */}
      <CallToAction />

      <Footer />

      {/* Custom Styles */}
      <style jsx>{`
        .font-clash-display {
          font-family: var(--font-clash-display), 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        .font-poppins {
          font-family: var(--font-poppins), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
      `}</style>
    </div >
  )
}
