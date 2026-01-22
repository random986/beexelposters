'use client'

import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin, ArrowUpRight } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white border-t border-gray-100 pt-24 pb-12">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-24">

          {/* Brand Column - Left */}
          <div className="md:col-span-4 lg:col-span-5 flex flex-col justify-between">
            <div className="mb-8">
              <Link href="/" className="inline-block mb-6">
                <h3 className="text-3xl font-clash-display font-medium text-[#1A1A1A]">Beexel AI</h3>
              </Link>
              <div className="flex flex-col gap-2 text-[#6B6B68]">
                <a href="tel:+254700000000" className="hover:text-[#1A1A1A] transition-colors">+254 700 000 000</a>
                <a href="mailto:support@beexel.com" className="hover:text-[#1A1A1A] transition-colors">support@beexel.com</a>
              </div>
            </div>

            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-[#1A1A1A] hover:bg-black hover:text-white transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-[#1A1A1A] hover:bg-black hover:text-white transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-[#1A1A1A] hover:bg-black hover:text-white transition-all">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Studio Info Column */}
          <div className="md:col-span-4 lg:col-span-3">
            <h4 className="text-sm font-bold text-[#1A1A1A] uppercase tracking-widest mb-8">Studio Info</h4>
            <ul className="flex flex-col gap-4 text-[#6B6B68]">
              <li><Link href="/" className="hover:text-[#1A1A1A] transition-colors">About Us</Link></li>
              <li><Link href="/templates" className="hover:text-[#1A1A1A] transition-colors">Templates</Link></li>
              <li><Link href="/pricing" className="hover:text-[#1A1A1A] transition-colors">Pricing</Link></li>
              <li><Link href="/contact" className="hover:text-[#1A1A1A] transition-colors">Contact Support</Link></li>
              <li><Link href="/terms" className="hover:text-[#1A1A1A] transition-colors">Terms & Privacy</Link></li>
            </ul>
          </div>

          {/* Services Column */}
          <div className="md:col-span-4 lg:col-span-4">
            <h4 className="text-sm font-bold text-[#1A1A1A] uppercase tracking-widest mb-8">Services</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-[#6B6B68]">
              <Link href="/render" className="hover:text-[#1A1A1A] transition-colors flex items-center gap-1 group">
                Flyer Design <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link href="/render" className="hover:text-[#1A1A1A] transition-colors flex items-center gap-1 group">
                Social Media Posts <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link href="/render" className="hover:text-[#1A1A1A] transition-colors flex items-center gap-1 group">
                Event Posters <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link href="/render" className="hover:text-[#1A1A1A] transition-colors flex items-center gap-1 group">
                Business Cards <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link href="/render" className="hover:text-[#1A1A1A] transition-colors flex items-center gap-1 group">
                Banners <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link href="/render" className="hover:text-[#1A1A1A] transition-colors flex items-center gap-1 group">
                Campaign Graphics <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[#9B9B98]">
            © {currentYear} Beexel AI. All rights reserved.
          </p>
          <a href="https://websites.beexelgraphics.com/" target="_blank" rel="noopener noreferrer" className="text-sm text-[#9B9B98] flex items-center gap-1 hover:text-[#1A1A1A] transition-colors">
            Built by Beexel. Made with <span className="text-red-500">♥</span> in Nairobi by Beexel
          </a>
        </div>

      </div>
    </footer>
  )
}
