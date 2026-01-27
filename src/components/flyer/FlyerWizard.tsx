'use client'

import { useState } from 'react'
import { FlyerState, PURPOSE_OPTIONS, FORMAT_OPTIONS, INDUSTRY_OPTIONS, VISUAL_STYLE_OPTIONS, COLOR_THEME_OPTIONS, IMAGERY_STYLE_OPTIONS, LAYOUT_OPTIONS, TONE_OPTIONS } from '@/types/flyer'
import { ChevronRight, ChevronLeft, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

const TOTAL_STEPS = 4 // Simplified: 1=Purpose+Format+Industry, 2=Content, 3=Design Style, 4=Generate

export function FlyerWizard() {
    const [currentStep, setCurrentStep] = useState(1)
    const [isGenerating, setIsGenerating] = useState(false)

    const [state, setState] = useState<FlyerState>({
        purpose: '',
        format: '',
        industry: '',
        content: {
            headline: '',
            subheadline: '',
            details: '',
            cta: '',
            contactInfo: '',
        },
        visualStyle: '',
        colorTheme: '',
        imageryStyle: '',
        layout: '',
        tone: '',
        generatedImages: [],
        adjustments: {},
        exportFormat: 'png',
    })

    const [error, setError] = useState<string | null>(null)
    const [jobId, setJobId] = useState<string | null>(null)
    const [generatedImage, setGeneratedImage] = useState<string | null>(null)

    const updateState = (updates: Partial<FlyerState>) => {
        setState(prev => ({ ...prev, ...updates }))
    }

    const updateContent = (field: keyof FlyerState['content'], value: string) => {
        setState(prev => ({
            ...prev,
            content: { ...prev.content, [field]: value }
        }))
    }

    const checkJobStatus = async (id: string) => {
        try {
            const response = await fetch(`/api/v2/render/status?jobId=${id}`)
            const data = await response.json()

            if (data.success) {
                if (data.status === 'success' && data.resultUrls && data.resultUrls.length > 0) {
                    setGeneratedImage(data.resultUrls[0])
                    setIsGenerating(false)
                } else if (data.status === 'failed') {
                    setError(data.error || 'Generation failed')
                    setIsGenerating(false)
                } else {
                    // Still processing, poll again in 2s
                    setTimeout(() => checkJobStatus(id), 2000)
                }
            } else {
                setError(data.msg || 'Failed to check status')
                setIsGenerating(false)
            }
        } catch (err) {
            console.error('Status check error:', err)
            // Don't fail immediately on network error, retry once or twice could be better but keeping simple
            setTimeout(() => checkJobStatus(id), 2000)
        }
    }

    const handleGenerate = async () => {
        setIsGenerating(true)
        setError(null)
        setGeneratedImage(null)

        try {
            const response = await fetch('/api/v2/flyer/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(state),
            })

            const data = await response.json()

            if (data.success && data.jobId) {
                setJobId(data.jobId)
                // Start polling
                checkJobStatus(data.jobId)
            } else {
                setError(data.msg || 'Failed to start generation')
                setIsGenerating(false)
            }
        } catch (err) {
            console.error('Generation error:', err)
            setError('Network error. Please try again.')
            setIsGenerating(false)
        }
    }

    const nextStep = () => {
        if (currentStep < TOTAL_STEPS) {
            setCurrentStep(prev => prev + 1)
        }
    }

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1)
        }
    }

    const canProceed = () => {
        switch (currentStep) {
            case 1: return !!state.purpose && !!state.format && !!state.industry
            case 2: return !!state.content.headline && !!state.content.cta
            case 3: return !!state.visualStyle && !!state.colorTheme && !!state.tone
            default: return true
        }
    }

    return (
        <div className="min-h-screen bg-white text-[#1A1A1A] py-32 px-6">
            <div className="max-w-6xl mx-auto">

                {/* Progress Bar */}
                <div className="mb-12 max-w-3xl mx-auto">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-sm font-medium text-gray-500">Step {currentStep} of {TOTAL_STEPS}</h2>
                        <span className="text-sm font-medium text-[#1A1A1A]">{Math.round((currentStep / TOTAL_STEPS) * 100)}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-[#1A1A1A] transition-all duration-500 ease-out"
                            style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
                        />
                    </div>
                </div>

                {/* Step Content */}
                <div className="min-h-[600px]">
                    {currentStep === 1 && (
                        <div className="space-y-12">
                            <div className="text-center space-y-4 mb-12">
                                <h1 className="text-4xl md:text-5xl font-clash-display font-medium text-[#1A1A1A]">Let's Create Your Poster</h1>
                                <p className="text-xl text-gray-500">Tell us about your project</p>
                            </div>

                            {/* Purpose */}
                            <div>
                                <h3 className="text-2xl font-clash-display font-medium mb-6">1. What type of poster is this?</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {PURPOSE_OPTIONS.slice(0, 8).map((option) => (
                                        <button
                                            key={option.id}
                                            onClick={() => updateState({ purpose: option.id })}
                                            className={`p-6 rounded-[24px] border-2 transition-all duration-300 text-left hover:-translate-y-1 hover:shadow-lg ${state.purpose === option.id
                                                ? 'border-[#1A1A1A] bg-[#1A1A1A] text-white shadow-xl'
                                                : 'border-gray-100 bg-white hover:border-gray-200 text-gray-600'
                                                }`}
                                        >
                                            <h4 className="font-semibold text-base">{option.label}</h4>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Format */}
                            <div>
                                <h3 className="text-2xl font-clash-display font-medium mb-6">2. Where will you share this?</h3>
                                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                    {FORMAT_OPTIONS.slice(0, 10).map((option) => (
                                        <button
                                            key={option.id}
                                            onClick={() => updateState({ format: option.id })}
                                            className={`p-4 rounded-[20px] border-2 transition-all duration-300 text-center hover:-translate-y-1 ${state.format === option.id
                                                ? 'border-[#1A1A1A] bg-[#1A1A1A] text-white shadow-lg'
                                                : 'border-gray-100 bg-white hover:border-gray-200 text-gray-600'
                                                }`}
                                        >
                                            <h4 className="font-medium text-sm">{option.label}</h4>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Industry */}
                            <div>
                                <h3 className="text-2xl font-clash-display font-medium mb-6">3. Select your industry</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {INDUSTRY_OPTIONS.map((option) => (
                                        <button
                                            key={option.id}
                                            onClick={() => updateState({ industry: option.id })}
                                            className={`p-4 rounded-[20px] border-2 transition-all duration-300 text-center hover:-translate-y-1 ${state.industry === option.id
                                                ? 'border-[#1A1A1A] bg-[#1A1A1A] text-white shadow-lg'
                                                : 'border-gray-100 bg-white hover:border-gray-200 text-gray-600'
                                                }`}
                                        >
                                            <h4 className="font-medium text-sm">{option.label}</h4>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div className="space-y-8">
                            <div className="text-center space-y-4 mb-12">
                                <h1 className="text-4xl md:text-5xl font-clash-display font-medium text-[#1A1A1A]">Add Your Content</h1>
                                <p className="text-xl text-gray-500">Fill in the details for your poster</p>
                            </div>

                            <div className="max-w-2xl mx-auto space-y-8 bg-white p-8 rounded-[32px] border border-gray-100 shadow-xl">
                                <div>
                                    <label className="block text-sm font-semibold text-[#1A1A1A] mb-3">Headline / Title *</label>
                                    <input
                                        type="text"
                                        value={state.content.headline}
                                        onChange={(e) => updateContent('headline', e.target.value)}
                                        placeholder="e.g., Grand Opening Sale"
                                        className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-[20px] focus:border-[#1A1A1A] focus:bg-white focus:outline-none transition-all placeholder:text-gray-400 font-medium text-lg"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-[#1A1A1A] mb-3">Subheadline (optional)</label>
                                    <input
                                        type="text"
                                        value={state.content.subheadline}
                                        onChange={(e) => updateContent('subheadline', e.target.value)}
                                        placeholder="e.g., Up to 50% Off All Items"
                                        className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-[20px] focus:border-[#1A1A1A] focus:bg-white focus:outline-none transition-all placeholder:text-gray-400 font-medium"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-[#1A1A1A] mb-3">Key Details</label>
                                    <textarea
                                        value={state.content.details}
                                        onChange={(e) => updateContent('details', e.target.value)}
                                        placeholder="e.g., Date, time, location, or key features"
                                        rows={4}
                                        className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-[20px] focus:border-[#1A1A1A] focus:bg-white focus:outline-none transition-all placeholder:text-gray-400 font-medium resize-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-[#1A1A1A] mb-3">Call to Action *</label>
                                    <input
                                        type="text"
                                        value={state.content.cta}
                                        onChange={(e) => updateContent('cta', e.target.value)}
                                        placeholder="e.g., Shop Now, Register Today"
                                        className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-[20px] focus:border-[#1A1A1A] focus:bg-white focus:outline-none transition-all placeholder:text-gray-400 font-medium"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-[#1A1A1A] mb-3">Contact Info</label>
                                    <input
                                        type="text"
                                        value={state.content.contactInfo}
                                        onChange={(e) => updateContent('contactInfo', e.target.value)}
                                        placeholder="e.g., Phone, email, website"
                                        className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-[20px] focus:border-[#1A1A1A] focus:bg-white focus:outline-none transition-all placeholder:text-gray-400 font-medium"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {currentStep === 3 && (
                        <div className="space-y-12">
                            <div className="text-center space-y-4 mb-12">
                                <h1 className="text-4xl md:text-5xl font-clash-display font-medium text-[#1A1A1A]">Design Your Style</h1>
                                <p className="text-xl text-gray-500">Choose the look and feel</p>
                            </div>

                            {/* Visual Style */}
                            <div>
                                <h3 className="text-2xl font-clash-display font-medium mb-6">Visual Style</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {VISUAL_STYLE_OPTIONS.map((option) => (
                                        <button
                                            key={option.id}
                                            onClick={() => updateState({ visualStyle: option.id })}
                                            className={`p-8 rounded-[24px] border-2 transition-all duration-300 text-left hover:-translate-y-1 hover:shadow-lg ${state.visualStyle === option.id
                                                ? 'border-[#1A1A1A] bg-[#1A1A1A] text-white shadow-xl'
                                                : 'border-gray-100 bg-white hover:border-gray-200 text-gray-600'
                                                }`}
                                        >
                                            <h4 className="font-bold text-xl mb-2">{option.label}</h4>
                                            {option.description && (
                                                <p className={`text-sm ${state.visualStyle === option.id ? 'text-white/70' : 'text-gray-400'}`}>
                                                    {option.description}
                                                </p>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Color Theme */}
                            <div>
                                <h3 className="text-2xl font-clash-display font-medium mb-6">Color Theme</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {COLOR_THEME_OPTIONS.map((option) => (
                                        <button
                                            key={option.id}
                                            onClick={() => updateState({ colorTheme: option.id })}
                                            className={`p-6 rounded-[20px] border-2 transition-all duration-300 text-center hover:-translate-y-1 ${state.colorTheme === option.id
                                                ? 'border-[#1A1A1A] bg-[#1A1A1A] text-white shadow-lg'
                                                : 'border-gray-100 bg-white hover:border-gray-200 text-gray-600'
                                                }`}
                                        >
                                            <h4 className="font-semibold text-sm">{option.label}</h4>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Tone */}
                            <div>
                                <h3 className="text-2xl font-clash-display font-medium mb-6">Tone & Emotion</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {TONE_OPTIONS.map((option) => (
                                        <button
                                            key={option.id}
                                            onClick={() => updateState({ tone: option.id })}
                                            className={`p-6 rounded-[20px] border-2 transition-all duration-300 text-center hover:-translate-y-1 ${state.tone === option.id
                                                ? 'border-[#1A1A1A] bg-[#1A1A1A] text-white shadow-lg'
                                                : 'border-gray-100 bg-white hover:border-gray-200 text-gray-600'
                                                }`}
                                        >
                                            <h4 className="font-semibold text-sm">{option.label}</h4>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {currentStep === 4 && (
                        <div className="space-y-8">
                            <div className="text-center space-y-4">
                                <h1 className="text-4xl md:text-5xl font-clash-display font-medium text-[#1A1A1A]">
                                    {generatedImage ? 'Your Poster is Ready!' : isGenerating ? 'Creating Your Masterpiece...' : 'Generate Your Poster'}
                                </h1>
                                <p className="text-xl text-gray-500">
                                    {generatedImage ? 'Download or regenerate below' : isGenerating ? 'Please wait while our AI designs your poster' : 'Click below to create your professional design'}
                                </p>
                            </div>

                            <div className="max-w-xl mx-auto text-center py-12">
                                {error && (
                                    <div className="mb-8 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100">
                                        {error}
                                    </div>
                                )}

                                {generatedImage ? (
                                    <div className="space-y-8">
                                        <div className="rounded-[32px] overflow-hidden shadow-2xl border-4 border-white">
                                            <img src={generatedImage} alt="Generated Poster" className="w-full h-auto" />
                                        </div>
                                        <div className="flex gap-4 justify-center">
                                            <Button
                                                onClick={() => window.open(generatedImage, '_blank')}
                                                className="h-14 px-8 bg-[#1A1A1A] text-white rounded-full font-bold hover:bg-black transition-all"
                                            >
                                                Download High-Res
                                            </Button>
                                            <Button
                                                onClick={handleGenerate}
                                                variant="outline"
                                                className="h-14 px-8 border-2 border-gray-200 text-gray-700 rounded-full font-bold hover:border-[#1A1A1A] hover:text-[#1A1A1A] transition-all"
                                            >
                                                Regenerate
                                            </Button>
                                        </div>
                                    </div>
                                ) : isGenerating ? (
                                    <div className="py-12 flex flex-col items-center justify-center space-y-6">
                                        <div className="relative w-24 h-24">
                                            <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
                                            <div className="absolute inset-0 border-4 border-[#1A1A1A] rounded-full border-t-transparent animate-spin"></div>
                                        </div>
                                        <p className="text-gray-500 animate-pulse">Analyzing requirements & designing layout...</p>
                                    </div>
                                ) : (
                                    <>
                                        <Button
                                            onClick={handleGenerate}
                                            disabled={isGenerating}
                                            className="h-20 px-16 bg-[#1A1A1A] text-white text-xl font-bold rounded-full hover:bg-black hover:scale-105 hover:shadow-2xl transition-all duration-300"
                                        >
                                            <Sparkles className="w-6 h-6 mr-3" />
                                            Generate Poster
                                        </Button>

                                        {/* Summary */}
                                        <div className="mt-16 p-8 bg-gray-50 border border-gray-100 rounded-[32px] text-left shadow-lg">
                                            <h3 className="font-clash-display font-medium text-xl text-[#1A1A1A] mb-6">Your Design Summary:</h3>
                                            <div className="space-y-3 text-sm text-gray-600">
                                                <p><strong className="text-[#1A1A1A]">Type:</strong> {PURPOSE_OPTIONS.find(o => o.id === state.purpose)?.label}</p>
                                                <p><strong className="text-[#1A1A1A]">Format:</strong> {FORMAT_OPTIONS.find(o => o.id === state.format)?.label}</p>
                                                <p><strong className="text-[#1A1A1A]">Industry:</strong> {INDUSTRY_OPTIONS.find(o => o.id === state.industry)?.label}</p>
                                                <p><strong className="text-[#1A1A1A]">Headline:</strong> {state.content.headline}</p>
                                                <p><strong className="text-[#1A1A1A]">Style:</strong> {VISUAL_STYLE_OPTIONS.find(o => o.id === state.visualStyle)?.label}</p>
                                                <p><strong className="text-[#1A1A1A]">Colors:</strong> {COLOR_THEME_OPTIONS.find(o => o.id === state.colorTheme)?.label}</p>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between mt-20 pt-8 border-t border-gray-100 max-w-4xl mx-auto">
                    <Button
                        onClick={prevStep}
                        disabled={currentStep === 1}
                        variant="ghost"
                        className="text-gray-500 hover:text-[#1A1A1A] hover:bg-gray-100 h-14 px-8 rounded-full text-base font-medium disabled:opacity-30"
                    >
                        <ChevronLeft className="w-5 h-5 mr-2" />
                        Back
                    </Button>

                    {currentStep < TOTAL_STEPS && (
                        <Button
                            onClick={nextStep}
                            disabled={!canProceed()}
                            className="h-14 px-10 bg-[#1A1A1A] text-white rounded-full text-base font-bold hover:bg-black hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:hover:shadow-none"
                        >
                            Continue
                            <ChevronRight className="w-5 h-5 ml-2" />
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}
