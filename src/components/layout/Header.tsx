import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTokenContext } from '@/context/TokenContext'
import { ChevronDown, BookOpen, Video, Zap, GraduationCap, PlayCircle } from 'lucide-react'

interface HeaderProps {
  lightBackground?: boolean
}

export function Header({ lightBackground = false }: HeaderProps) {
  const pathname = usePathname()
  const { tokenBalance } = useTokenContext()
  const [scrolled, setScrolled] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (path: string) => pathname === path

  return (
    <header
      className={`fixed top-0 left-1/2 z-50 transition-all duration-700 ease-out ${scrolled
        ? 'w-[98%] max-w-[1400px] mt-4 px-8 py-4 bg-white/70 backdrop-blur-3xl shadow-[0_8px_40px_rgba(0,0,0,0.15)] border-2 border-white/60 rounded-full transform -translate-x-1/2'
        : 'w-full px-8 py-5 bg-transparent backdrop-blur-none border-2 border-transparent transform -translate-x-1/2 translate-y-0'
        }`}
      style={{
        transform: scrolled
          ? 'translateX(-50%) translateY(0) scale(1)'
          : 'translateX(-50%) translateY(0) scale(1)'
      }}
    >
      <div className={`flex items-center ${scrolled ? 'justify-between gap-6' : 'justify-between max-w-7xl mx-auto'}`}>
        {/* Logo - Text Only */}
        <Link href="/" className="flex items-center overflow-hidden">
          <span className={`font-clash-display text-2xl font-semibold transition-all duration-300 hover:translate-y-[-4px] inline-block ${scrolled || lightBackground ? 'text-[#1A1A1A]' : 'text-white'
            }`}>
            Beexel Posters
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {[
            { href: '/features', label: 'Features' },
            { href: '/about', label: 'About' },
            { href: '/pricing', label: 'Pricing' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-4 py-2 rounded-lg overflow-hidden group"
            >
              <span className={`text-base font-poppins font-medium transition-all duration-300 inline-block group-hover:translate-y-[-4px] ${scrolled || lightBackground
                ? isActive(item.href)
                  ? 'text-[#1A1A1A] bg-black/5 px-4 py-2 rounded-lg'
                  : 'text-[#6B6B68] group-hover:text-[#1A1A1A]'
                : isActive(item.href)
                  ? 'text-white bg-white/20 px-4 py-2 rounded-lg'
                  : 'text-white/90 group-hover:text-white'
                }`}>
                {item.label}
              </span>
            </Link>
          ))}

          {/* Resources Mega Menu */}
          <div
            className="h-full flex items-center" // Removed 'relative' to allow dropdown to position vs header
            onMouseEnter={() => setResourcesOpen(true)}
            onMouseLeave={() => setResourcesOpen(false)}
          >
            <button
              className="px-4 py-2 rounded-lg overflow-hidden group outline-none"
            >
              <span className={`text-base font-poppins font-medium transition-all duration-300 inline-flex items-center gap-1 group-hover:translate-y-[-4px] ${scrolled || lightBackground
                ? resourcesOpen || pathname.startsWith('/resources')
                  ? 'text-[#1A1A1A] bg-black/5 px-4 py-2 rounded-lg'
                  : 'text-[#6B6B68] group-hover:text-[#1A1A1A]'
                : resourcesOpen || pathname.startsWith('/resources')
                  ? 'text-white bg-white/20 px-4 py-2 rounded-lg'
                  : 'text-white/90 group-hover:text-white'
                }`}>
                Resources
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${resourcesOpen ? 'rotate-180' : ''}`} />
              </span>
            </button>

            {/* Mega Menu Dropdown */}
            <div
              className={`absolute top-[80px] left-1/2 -translate-x-1/2 w-[90vw] max-w-5xl p-4 rounded-[32px] 
              bg-white/80 backdrop-blur-2xl border border-white/60 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] 
              transform transition-all duration-300 origin-top
              ${resourcesOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-2 invisible'}`}
            >
              <div className="grid grid-cols-2 gap-6">
                {/* Left Column: Links */}
                <div className="flex flex-col gap-1">
                  <div className="px-4 mb-2">
                    <span className="text-xs font-semibold text-gray-400 tracking-wider uppercase">Learn</span>
                  </div>

                  <Link href="/render" className="group flex items-center gap-4 p-3 rounded-2xl hover:bg-white/60 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#1A1A1A] mb-0.5">Generate</h4>
                      <p className="text-xs text-gray-500 leading-relaxed">Start creating your posters immediately.</p>
                    </div>
                  </Link>

                  <Link href="/resources/help" className="group flex items-center gap-4 p-3 rounded-2xl hover:bg-white/60 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#1A1A1A] mb-0.5">Help Center</h4>
                      <p className="text-xs text-gray-500 leading-relaxed">Get support and find answers quickly.</p>
                    </div>
                  </Link>

                  <Link href="/resources/faq" className="group flex items-center gap-4 p-3 rounded-2xl hover:bg-white/60 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-500 group-hover:scale-110 transition-transform">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#1A1A1A] mb-0.5">FAQ</h4>
                      <p className="text-xs text-gray-500 leading-relaxed">Frequently asked questions and answers.</p>
                    </div>
                  </Link>
                </div>

                {/* Right Column: Visual Guide */}
                <div className="relative rounded-2xl overflow-hidden group cursor-pointer bg-gray-100">
                  <img
                    src="https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=2000&auto=format&fit=crop"
                    alt="Video Guide"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-4 group-hover:bg-white transition-colors">
                      <PlayCircle className="w-5 h-5 text-white group-hover:text-black transition-colors" />
                    </div>
                    <h4 className="text-white font-medium text-lg mb-1">Video Guide</h4>
                    <p className="text-white/70 text-xs">Watch how to design in 3 mins</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Link
            href="/contact"
            className="px-4 py-2 rounded-lg overflow-hidden group"
          >
            <span className={`text-base font-poppins font-medium transition-all duration-300 inline-block group-hover:translate-y-[-4px] ${scrolled || lightBackground
              ? isActive('/contact')
                ? 'text-[#1A1A1A] bg-black/5 px-4 py-2 rounded-lg'
                : 'text-[#6B6B68] group-hover:text-[#1A1A1A]'
              : isActive('/contact')
                ? 'text-white bg-white/20 px-4 py-2 rounded-lg'
                : 'text-white/90 group-hover:text-white'
              }`}>
              Contact Us
            </span>
          </Link>
        </nav>

        {/* Token Balance & CTA */}
        <div className="flex items-center gap-4">
          {tokenBalance !== null && (
            <div className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${scrolled || lightBackground ? 'bg-black/5' : 'bg-white/20 backdrop-blur-sm'
              }`}>
              <span className={`text-sm font-poppins font-medium ${scrolled || lightBackground ? 'text-[#6B6B68]' : 'text-white/80'}`}>
                Tokens:
              </span>
              <span className={`text-base font-poppins font-bold ${scrolled || lightBackground ? 'text-[#1A1A1A]' : 'text-white'}`}>
                {tokenBalance}
              </span>
            </div>
          )}
          <Link href="/render">
            <button className="px-7 py-3 rounded-full font-poppins font-medium text-base bg-[#2C2C2C] text-white hover:bg-[#3C3C3C] transition-all duration-300 shadow-sm">
              Create Poster
            </button>
          </Link>
        </div>
      </div>
    </header>
  )
}
