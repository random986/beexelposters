'use client'

import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CallToAction } from '@/components/home/CallToAction'
import { Zap, Palette, CreditCard, MousePointer2, Smartphone, Upload, Sparkles, ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header lightBackground />

      {/* Hero Section */}
      <section className="pt-40 pb-32 px-6 bg-white overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full mb-8 border border-gray-100">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-sm font-medium text-gray-500 uppercase tracking-widest">Version 2.0 Live</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-clash-display font-medium text-[#1A1A1A] mb-8 leading-[0.95]">
                Creativity<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-200">Unleashed.</span>
              </h1>
              <p className="text-xl text-gray-500 leading-relaxed max-w-lg mb-12">
                The most advanced AI poster generator in Kenya. Built for speed, quality, and complete creative freedom.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/render">
                  <button className="px-8 py-4 bg-[#1A1A1A] text-white rounded-full font-bold hover:scale-105 transition-transform shadow-lg">
                    Start Creating
                  </button>
                </Link>
                <Link href="/pricing">
                  <button className="px-8 py-4 bg-white border border-gray-200 text-[#1A1A1A] rounded-full font-bold hover:bg-gray-50 transition-colors">
                    View Pricing
                  </button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative h-[600px] rounded-[48px] overflow-hidden shadow-2xl group">
                <img
                  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop"
                  alt="Creative Abstract"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="absolute bottom-12 left-12 right-12 bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-[32px]"
                >
                  <div className="flex items-center gap-4 text-white mb-2">
                    <Sparkles className="w-6 h-6 text-yellow-400" />
                    <span className="font-clash-display font-medium text-lg">AI Generated</span>
                  </div>
                  <p className="text-white/80 text-sm">"Commercial poster for a Nairobi jazz festival, vibrant colors, minimalist style"</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Designed for Pros - Bento Grid Design */}
      <section className="py-24 px-6 bg-[#FAFAF8]">
        <div className="container mx-auto max-w-7xl">

          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-5xl md:text-6xl font-clash-display font-medium text-[#1A1A1A] mb-6">Designed for Pros</h2>
              <p className="text-xl text-gray-500">We stripped away the complexity and kept the power. Every pixel works for you.</p>
            </div>
            <Link href="/render">
              <button className="px-8 py-3 rounded-full border-2 border-gray-200 hover:border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-all font-medium flex items-center gap-2">
                Start Creating <ArrowUpRight className="w-4 h-4" />
              </button>
            </Link>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[400px]">

            {/* Feature 1: Instant Speed (Large - Span 2) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-2 relative group rounded-[40px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
            >
              <img src="https://images.unsplash.com/photo-1492552181161-62217fc3076d?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Speed" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-10 max-w-lg">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 text-white border border-white/20">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-3xl font-clash-display font-medium text-white mb-2">Instant Speed</h3>
                <p className="text-white/70 text-lg">Generate production-ready assets in under 30 seconds. Perfect for tight deadlines.</p>
              </div>
            </motion.div>

            {/* Feature 2: Smart Branding (Small - Span 1) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="md:col-span-1 relative group rounded-[40px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 bg-[#1A1A1A]"
            >
              <img src="https://images.unsplash.com/photo-1558655146-d09347e0c766?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105 mix-blend-overlay" alt="Branding" />
              <div className="absolute top-6 right-6 w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#1A1A1A]">
                <ArrowUpRight className="w-4 h-4" />
              </div>
              <div className="absolute bottom-0 left-0 p-8">
                <div className="mb-4">
                  <Palette className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-clash-display font-medium text-white mb-2">Smart Branding</h3>
                <p className="text-white/60 text-sm">Consistency is key. Our AI matches your brand vibe perfectly.</p>
              </div>
            </motion.div>

            {/* Feature 3: Local Payments (Small - Span 1) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="md:col-span-1 relative group rounded-[40px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
            >
              <img src="https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Payment" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors"></div>
              <div className="absolute top-6 right-6 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white">
                <ArrowUpRight className="w-4 h-4" />
              </div>
              <div className="absolute bottom-0 left-0 p-8">
                <div className="mb-4">
                  <CreditCard className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-2xl font-clash-display font-medium text-white mb-2">Local Payments</h3>
                <p className="text-white/80 text-sm">Seamless M-PESA integration. No credit card needed.</p>
              </div>
            </motion.div>

            {/* Feature 4: One-Click Edits (Large - Span 2) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="md:col-span-2 relative group rounded-[40px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
            >
              <img src="https://images.unsplash.com/photo-1542744094-24638eff58bb?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Editing" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-10 max-w-lg">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 text-white border border-white/20">
                  <MousePointer2 className="w-6 h-6" />
                </div>
                <h3 className="text-3xl font-clash-display font-medium text-white mb-2">One-Click Edits</h3>
                <p className="text-white/70 text-lg">Use our smart editor to tweak text or regenerate specific areas instantly.</p>
              </div>
            </motion.div>

            {/* Feature 5: Mobile First (Small - Span 1) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="md:col-span-1 relative group rounded-[40px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
            >
              <img src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Mobile" />
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors"></div>
              <div className="absolute top-6 right-6 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white">
                <ArrowUpRight className="w-4 h-4" />
              </div>
              <div className="absolute bottom-0 left-0 p-8">
                <div className="mb-4">
                  <Smartphone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-clash-display font-medium text-white mb-2">Mobile First</h3>
                <p className="text-white/80 text-sm">Design on the go. Optimized for your phone.</p>
              </div>
            </motion.div>

            {/* Feature 6: High Res Export (Large - Span 2) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="md:col-span-2 relative group rounded-[40px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 bg-gray-900"
            >
              <img src="https://images.unsplash.com/photo-1626785774573-4b799314346d?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80" alt="High Res" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-10 max-w-lg">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 text-white border border-white/20">
                  <Upload className="w-6 h-6" />
                </div>
                <h3 className="text-3xl font-clash-display font-medium text-white mb-2">High Res Export</h3>
                <p className="text-white/70 text-lg">Download in 4K resolution. Suitable for large format printing or crisp social posts.</p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Replaced Manual CTA with Component from Homepage */}
      <CallToAction />

      <Footer />
    </div>
  )
}
