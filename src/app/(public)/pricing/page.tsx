'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Check, Zap, Sparkles, CreditCard, Shield, Loader2, Minus, Plus } from 'lucide-react'
import { BuyTokensModal } from '@/components/payment/BuyTokensModal'
import { CallToAction } from '@/components/home/CallToAction'

export default function PricingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [tokens, setTokens] = useState(5)

  const price = tokens * 20

  return (
    <div className="min-h-screen bg-[#f0f4f8] text-[#1A1A1A]">
      <Header lightBackground />
      <BuyTokensModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} initialTokens={tokens} />

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 font-clash-display text-center">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-6xl md:text-8xl font-medium leading-[1.1] mb-6 text-[#1A1A1A] tracking-tight">
            Simple, Transparent<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Pay As You Go.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            No subscriptions. No hidden fees. Just KES 20 per poster.
          </p>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-10 px-6">
        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="bg-white/70 backdrop-blur-3xl border-2 border-white/60 rounded-[48px] p-12 md:p-16 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)] text-center">

            <h2 className="text-3xl font-clash-display font-medium text-[#1A1A1A] mb-12">How many posters do you need today?</h2>

            <div className="flex flex-col md:flex-row items-center justify-center gap-12 mb-16">

              {/* Controls */}
              <div className="flex items-center gap-6">
                <button
                  onClick={() => setTokens(Math.max(1, tokens - 1))}
                  className="w-16 h-16 rounded-2xl bg-white shadow-md border border-gray-100 flex items-center justify-center hover:scale-105 hover:shadow-lg transition-all text-[#1A1A1A]"
                >
                  <Minus className="w-6 h-6" />
                </button>

                <div className="text-center w-32">
                  <span className="block text-6xl font-clash-display font-semibold text-[#1A1A1A]">{tokens}</span>
                  <span className="text-sm font-medium text-gray-500 uppercase tracking-widest">Tokens</span>
                </div>

                <button
                  onClick={() => setTokens(tokens + 1)}
                  className="w-16 h-16 rounded-2xl bg-[#1A1A1A] text-white shadow-md flex items-center justify-center hover:scale-105 hover:shadow-lg transition-all"
                >
                  <Plus className="w-6 h-6" />
                </button>
              </div>

              {/* Divider */}
              <div className="hidden md:block w-px h-32 bg-gray-200"></div>

              {/* Price Display */}
              <div className="text-center md:text-left">
                <div className="text-lg text-gray-500 mb-1">Total Price</div>
                <div className="text-7xl font-clash-display font-bold text-[#1A1A1A]">
                  <span className="text-2xl align-top mr-2 font-medium text-gray-400">KES</span>
                  {price}
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="px-16 py-6 bg-[#1A1A1A] text-white rounded-full text-xl font-bold hover:scale-105 hover:bg-black transition-all duration-300 shadow-xl shadow-gray-200"
            >
              Get {tokens} Tokens
            </button>

            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-gray-500">
              <span className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Instant Generation</span>
              <span className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Commercial Rights</span>
              <span className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> High Res Download</span>
            </div>

          </div>
        </div>
      </section>

      {/* Feature Grid - Glassmorph */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/60 backdrop-blur-xl border border-white/60 p-10 rounded-[40px] shadow-sm hover:shadow-xl transition-all h-full">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                <Zap className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-2xl font-clash-display font-medium text-[#1A1A1A] mb-4">Lightning Fast</h3>
              <p className="text-gray-600 leading-relaxed">
                Don't wait days for a designer. Generate professional assets in seconds and keep your socials active.
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-xl border border-white/60 p-10 rounded-[40px] shadow-sm hover:shadow-xl transition-all h-full">
              <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center mb-6">
                <Sparkles className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-2xl font-clash-display font-medium text-[#1A1A1A] mb-4">Print Ready</h3>
              <p className="text-gray-600 leading-relaxed">
                All generations are high resolution (300 DPI equivalent) suitable for printing flyers and posters.
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-xl border border-white/60 p-10 rounded-[40px] shadow-sm hover:shadow-xl transition-all h-full">
              <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mb-6">
                <CreditCard className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-2xl font-clash-display font-medium text-[#1A1A1A] mb-4">Secure Payments</h3>
              <p className="text-gray-600 leading-relaxed">
                Pay safely using M-PESA. Transactions are secured by Intasend, a trusted Kenyan payment gateway.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CallToAction />
      <Footer />
    </div>
  )
}
