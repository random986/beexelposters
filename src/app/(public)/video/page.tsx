'use client'

import { Header } from '@/components/layout/Header'
import { Sparkles, Film } from 'lucide-react'

/*
// Original VideoPage Code (Preserved)
import { useState, useRef } from 'react'
import { useToast } from '@/components/ui/toast'
import {
  Loader2, Zap, Upload, X, Info,
  Camera, Cloud, Wind, Sun, Droplets, User,
  Construction, Timer, Home, Repeat,
  Leaf, Palette, Eye
} from 'lucide-react'
import Image from 'next/image'
import { VIDEO_TEMPLATES_SINGLE, VIDEO_TEMPLATES_TWO, VideoTemplate } from '@/lib/modules/video/templates'
import { PRICING } from '@/lib/constants/pricing'

// Map template IDs/Icons to Lucide components
const ICON_MAP: Record<string, any> = {
  // Single Image Templates
  'camera-pan': Camera,
  'clouds-moving': Cloud,
  'gentle-breeze': Wind,
  'sunset-glow': Sun,
  'water-flow': Droplets,
  'people-walking': User,
  'light-shadows': Sun, // Fallback
  'architectural-reveal': Eye,

  // Two Image Templates
  'construction-animation': Construction,
  'viral-construction': Timer, // Viral/Fast
  'construction-phasing': Construction,
  'house-warping': Home, // Morphing
  'house-transform': Home,
  'season-changes': Leaf,
  'texture-changes': Palette,
}

export default function VideoPage() {
  const { showToast } = useToast()
  const [prompt, setPrompt] = useState('')
  const [images, setImages] = useState<File[]>([])
  const [mode, setMode] = useState<'fast' | 'quality'>('fast')
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Combined templates based on image count
  const relevantTemplates = images.length > 1 ? VIDEO_TEMPLATES_TWO : [...VIDEO_TEMPLATES_SINGLE, ...VIDEO_TEMPLATES_TWO]

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files)
      // Limit total to 2
      const combined = [...images, ...newFiles].slice(0, 2)
      setImages(combined)
      showToast('Images uploaded successfully', 'success')
    }
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const handleTemplateSelect = (template: VideoTemplate) => {
    if (selectedTemplate === template.id) {
      setSelectedTemplate(null)
    } else {
      setSelectedTemplate(template.id)
    }
  }

  const handleSubmit = async () => {
    if (!prompt && images.length === 0) {
      showToast("Please provide at least an image or a prompt", 'error')
      return
    }

    setIsGenerating(true)
    const formData = new FormData()
    formData.append('prompt', prompt)
    formData.append('mode', mode)
    if (selectedTemplate) formData.append('template', selectedTemplate)

    images.forEach((file, index) => {
      formData.append(`image_${index}`, file)
    })

    try {
      const res = await fetch('/api/v2/video/create', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()

      if (data.success) {
        showToast("Video generation started! Check your dashboard.", 'success')
        // Reset form
        setPrompt('')
        setImages([])
        setSelectedTemplate(null)
      } else {
        showToast(data.msg || 'Failed to start generation', 'error')
      }
    } catch (error) {
      showToast('An error occurred while generating video', 'error')
    } finally {
      setIsGenerating(false)
    }
  }

  const cost = mode === 'fast' ? PRICING.VIDEO.FAST.tokens : PRICING.VIDEO.QUALITY.tokens
  const price = mode === 'fast' ? PRICING.VIDEO.FAST.price : PRICING.VIDEO.QUALITY.price

  return (
    <div className="min-h-screen bg-[#0a0e27] text-white font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-7xl pt-28">

        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Video Generation
          </h1>
          <p className="text-gray-400">Create high quality videos from your renders.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2 space-y-6">

            <div className="bg-[#131b31] p-6 rounded-2xl border border-white/5">
              <h2 className="text-sm font-semibold text-gray-300 mb-4 flex items-center gap-2">
                <Upload className="w-4 h-4" /> INPUT IMAGES (Max 2)
              </h2>

              <div className="grid grid-cols-2 gap-4">
                {images.map((img, idx) => (
                  <div key={idx} className="relative group aspect-video bg-black/40 rounded-xl overflow-hidden border border-white/10">
                    <Image
                      src={URL.createObjectURL(img)}
                      alt="Input"
                      fill
                      className="object-cover"
                    />
                    <button
                      onClick={() => removeImage(idx)}
                      className="absolute top-2 right-2 p-1 bg-red-500/80 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                {images.length < 2 && (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="aspect-video border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center text-gray-500 hover:text-cyan-400 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition cursor-pointer"
                  >
                    <Upload className="w-8 h-8 mb-2 opacity-50" />
                    <span className="text-xs font-medium">Click to Upload</span>
                  </div>
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
                onClick={(e) => (e.currentTarget.value = '')}
              />
            </div>

            <div className="bg-[#131b31] p-6 rounded-2xl border border-white/5">
              <h2 className="text-sm font-semibold text-gray-300 mb-4 flex items-center gap-2">
                <Film className="w-4 h-4" /> PROMPT
              </h2>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your video..."
                className="w-full bg-[#0a0e1a] border border-white/10 rounded-xl p-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 min-h-[120px] resize-none"
              />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-gray-300 mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" /> TEMPLATES
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {relevantTemplates.map(t => {
                  const IconComp = ICON_MAP[t.id] || Sparkles
                  return (
                    <button
                      key={t.id}
                      onClick={() => handleTemplateSelect(t)}
                      className={`p-3 rounded-xl border text-left transition relative overflow-hidden group ${selectedTemplate === t.id
                        ? 'bg-cyan-500/20 border-cyan-500 text-white'
                        : 'bg-[#131b31] border-white/5 text-gray-400 hover:border-white/20 hover:text-gray-200'
                        }`}
                    >
                      <div className="mb-2">
                        <IconComp className={`w-6 h-6 ${selectedTemplate === t.id ? 'text-cyan-400' : 'text-gray-500 group-hover:text-gray-300'}`} />
                      </div>
                      <div className="text-xs font-bold truncate">{t.name}</div>
                      <div className="text-[10px] opacity-70 line-clamp-2 leading-tight mt-1">{t.description}</div>
                    </button>
                  )
                })}
              </div>
            </div>

          </div>

          <div className="lg:col-span-1 space-y-6">

            <div className="bg-[#131b31] p-6 rounded-2xl border border-white/5 sticky top-28">
              <h2 className="text-sm font-semibold text-gray-300 mb-4">GENERATION SETTINGS</h2>

              <div className="space-y-3">
                <label
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition ${mode === 'fast' ? 'bg-cyan-500/10 border-cyan-500/50' : 'bg-[#0a0e1a] border-white/5 hover:border-white/20'
                    }`}
                  onClick={() => setMode('fast')}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${mode === 'fast' ? 'bg-cyan-500 text-white' : 'bg-gray-800 text-gray-400'}`}>
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-sm">Fast Generation</div>
                      <div className="text-[10px] text-gray-400">Standard Quality</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-white">KES {PRICING.VIDEO.FAST.price}</div>
                    <div className="text-[10px] text-cyan-400">{PRICING.VIDEO.FAST.tokens} Tokens</div>
                  </div>
                </label>

                <label
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition ${mode === 'quality' ? 'bg-purple-500/10 border-purple-500/50' : 'bg-[#0a0e1a] border-white/5 hover:border-white/20'
                    }`}
                  onClick={() => setMode('quality')}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${mode === 'quality' ? 'bg-purple-500 text-white' : 'bg-gray-800 text-gray-400'}`}>
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-sm">Quality Generation</div>
                      <div className="text-[10px] text-gray-400">High Fidelity</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-white">KES {PRICING.VIDEO.QUALITY.price}</div>
                    <div className="text-[10px] text-purple-400">{PRICING.VIDEO.QUALITY.tokens} Tokens</div>
                  </div>
                </label>
              </div>

              <div className="mt-6 p-4 bg-[#0a0e1a]/50 rounded-xl border border-white/5 text-xs text-gray-400 flex items-start gap-2">
                <Info className="w-4 h-4 flex-shrink-0 mt-0.5 text-blue-400" />
                <p>
                  Videos are generated with a duration of <span className="text-white font-medium">8 seconds</span>.
                  Quality mode provides higher resolution and more coherent motion.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-gray-400 text-sm">Total Cost</span>
                  <span className="text-xl font-bold flex items-center gap-2">
                    {cost} Tokens <span className="text-xs font-normal text-gray-500">(KES {price})</span>
                  </span>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isGenerating || (!prompt && images.length === 0)}
                  className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" /> Generating...
                    </>
                  ) : (
                    <>
                      <Film className="w-5 h-5" /> Generate Video
                    </>
                  )}
                </button>
              </div>

            </div>

          </div>

        </div>
      </main>
    </div>
  )
}
*/

export default function VideoPage() {
  return (
    <div className="min-h-screen bg-[#0a0e27] text-white font-sans overflow-hidden relative">
      <Header />

      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '7s' }} />
      </div>

      <main className="container mx-auto px-4 h-screen flex flex-col items-center justify-center relative z-10 pt-16">

        <div className="text-center space-y-8 max-w-2xl mx-auto">
          {/* Animated Icon */}
          <div className="relative inline-block mb-4">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-600 blur-2xl opacity-20 animate-pulse"></div>
            <div className="w-24 h-24 bg-[#131b31] border border-white/10 rounded-3xl flex items-center justify-center shadow-2xl relative z-10 animate-bounce cursor-default hover:border-cyan-500/30 transition duration-500">
              <Film className="w-10 h-10 text-cyan-400" />
            </div>
            <div className="absolute -top-2 -right-2">
              <Sparkles className="w-8 h-8 text-amber-400 animate-spin-slow" style={{ animationDuration: '3s' }} />
            </div>
          </div>

          {/* Main Text */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient-x pb-2">
              Coming Soon
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 font-light">
              We are crafting something <span className="text-white font-medium">extraordinary</span>.
            </p>
          </div>

          {/* Feature Teasers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8 border-t border-white/5 mx-auto max-w-xl">
            <div className="p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-white/10 transition group">
              <div className="text-2xl mb-2 group-hover:scale-110 transition">⚡</div>
              <div className="text-sm font-medium text-gray-300">Fast Render</div>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-white/10 transition group">
              <div className="text-2xl mb-2 group-hover:scale-110 transition">🎬</div>
              <div className="text-sm font-medium text-gray-300">Pro Motion</div>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-white/10 transition group">
              <div className="text-2xl mb-2 group-hover:scale-110 transition">✨</div>
              <div className="text-sm font-medium text-gray-300">AI Magic</div>
            </div>
          </div>

          <div className="pt-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm animate-pulse">
              <Sparkles className="w-3 h-3" />
              <span>Launching Very Soon</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
