'use client'

import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/toast'
import { Search, Heart, Info, Filter, ArrowRight } from 'lucide-react'
import { useState } from 'react'

// Placeholder texture data simulating Polyhaven's quality
const textureTypes = [
  { id: 1, name: 'Kenyan Brick', category: 'Wall', type: 'Brick', resolution: '4k', color: '#c76a45' },
  { id: 2, name: 'Makuti Thatch', category: 'Roof', type: 'Nature', resolution: '4k', color: '#d4b483' },
  { id: 3, name: 'Coral Stone', category: 'Wall', type: 'Stone', resolution: '8k', color: '#e2e2e2' },
  { id: 4, name: 'Mud Wall', category: 'Wall', type: 'Plaster', resolution: '4k', color: '#8b5a2b' },
  { id: 5, name: 'Rough Concrete', category: 'Floor', type: 'Concrete', resolution: '4k', color: '#a0a0a0' },
  { id: 6, name: 'Cedar Wood', category: 'Wood', type: 'Wood', resolution: '4k', color: '#8b4513' },
  { id: 7, name: 'Savannah Grass', category: 'Nature', type: 'Nature', resolution: '2k', color: '#556b2f' },
  { id: 8, name: 'Laterite Soil', category: 'Ground', type: 'Ground', resolution: '4k', color: '#a52a2a' },
  { id: 9, name: 'Nairobi Stone', category: 'Wall', type: 'Stone', resolution: '4k', color: '#708090' },
  { id: 10, name: 'Bamboo', category: 'Wood', type: 'Wood', resolution: '4k', color: '#6b8e23' },
  { id: 11, name: 'Mabati Rust', category: 'Metal', type: 'Metal', resolution: '4k', color: '#b7410e' },
  { id: 12, name: 'Terrazzo Floor', category: 'Floor', type: 'Tile', resolution: '8k', color: '#d3d3d3' },
  { id: 13, name: 'Asphalt Worn', category: 'Ground', type: 'Asphalt', resolution: '8k', color: '#333333' },
  { id: 14, name: 'Roof Tiles Clay', category: 'Roof', type: 'Tile', resolution: '4k', color: '#b94e48' },
  { id: 15, name: 'Pavement Stone', category: 'Ground', type: 'Stone', resolution: '4k', color: '#888888' },
  { id: 16, name: 'Sand Waves', category: 'Nature', type: 'Sand', resolution: '4k', color: '#e6ccb2' },
]

export default function ResourcesPage() {
  const { showToast } = useToast()
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const handleAssetClick = () => {
    showToast('This resource is coming soon!', 'info', 3000)
  }

  const filteredTextures = textureTypes.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = activeCategory === 'All' || t.category === activeCategory
    return matchesSearch && matchesCategory
  })

  // CSS for making the circles look like lit spheres
  const sphereStyle = (color: string) => ({
    background: `radial-gradient(circle at 30% 30%, ${color}, #000)`,
    boxShadow: `inset -10px -10px 20px rgba(0,0,0,0.5), inset 10px 10px 20px rgba(255,255,255,0.4), 0 10px 20px rgba(0,0,0,0.3)`
  })

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white font-sans selection:bg-orange-500/30">
      <Header />

      <main className="pt-24 pb-12">
        {/* Top Banner / Hero similar to Polyhaven */}
        <div className="bg-[#111] border-b border-white/5 py-12 px-6">
          <div className="container mx-auto max-w-7xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="space-y-4 max-w-2xl">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white/90">
                  Free 3D Assets
                </h1>
                <p className="text-xl text-white/50 font-light">
                  A curated collection of African architectural textures and models. <br />
                  100% Free for any use.
                </p>
              </div>

              {/* Support Card similar to Polyhaven's Patreon CTA */}
              <div className="bg-gradient-to-br from-orange-600/20 to-orange-900/20 border border-orange-500/20 rounded-xl p-6 max-w-md w-full relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Heart size={100} />
                </div>
                <h3 className="text-lg font-bold text-orange-400 mb-2 flex items-center gap-2">
                  <Heart size={18} fill="currentColor" />
                  Support our work
                </h3>
                <p className="text-sm text-white/70 mb-4 leading-relaxed">
                  Ensure we can continue scanning and providing high-quality African textures to you for free.
                </p>
                <Button
                  onClick={() => showToast('Donation page coming soon!', 'info')}
                  className="bg-orange-600 hover:bg-orange-500 text-white border-none rounded-lg font-semibold w-full"
                >
                  Support Us
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="sticky top-16 z-30 bg-[#1a1a1a]/95 backdrop-blur-md border-b border-white/5 py-4 px-6 shadow-xl">
          <div className="container mx-auto max-w-7xl flex flex-col md:flex-row gap-4 items-center justify-between">

            {/* Search */}
            <div className="relative w-full md:w-96 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-focus-within:text-orange-400 transition-colors" />
              <input
                type="text"
                placeholder="Search assets..."
                className="w-full bg-[#0d0d0d] border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-orange-500/50 transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Categories */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar">
              {['All', 'Wall', 'Roof', 'Floor', 'Ground', 'Wood', 'Nature', 'Metal'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${activeCategory === cat
                      ? 'bg-white text-black'
                      : 'bg-[#2a2a2a] text-white/60 hover:bg-[#333] hover:text-white'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Asset Grid */}
        <div className="container mx-auto max-w-7xl px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredTextures.map((texture) => (
              <div
                key={texture.id}
                onClick={handleAssetClick}
                className="group cursor-pointer bg-[#222] rounded-lg overflow-hidden border border-white/5 hover:border-orange-500/30 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Sphere Preview Area */}
                <div className="aspect-square bg-[#111] relative flex items-center justify-center p-6 overflow-hidden">
                  {/* Background Grid Pattern */}
                  <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                  }} />

                  {/* The Sphere */}
                  <div
                    className="w-full h-full rounded-full relative z-10 transition-transform duration-500 group-hover:scale-105 shadow-2xl"
                    style={sphereStyle(texture.color)}
                  >
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <span className="text-white font-bold text-xs uppercase tracking-widest bg-black/60 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">Coming Soon</span>
                    </div>
                  </div>

                  {/* Quality Badge */}
                  <div className="absolute bottom-3 right-3 z-20 bg-black/80 backdrop-blur text-[10px] font-bold px-1.5 py-0.5 rounded border border-white/10 text-orange-400">
                    {texture.resolution.toUpperCase()}
                  </div>
                </div>

                {/* Info Area */}
                <div className="p-4 bg-[#222] group-hover:bg-[#252525] transition-colors relative">
                  <h3 className="font-bold text-white/90 text-sm truncate pr-4">{texture.name}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[10px] uppercase tracking-wider text-white/40">{texture.type}</span>
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500/50" title="Seamless"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50" title="PBR Ready"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
