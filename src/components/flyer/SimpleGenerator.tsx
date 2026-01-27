'use client'

import { useState, useEffect, useRef } from 'react'
import { Sparkles, Upload, X, Image as ImageIcon, Clock, Loader2, ChevronDown, Settings, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { VISUAL_STYLE_OPTIONS, COLOR_THEME_OPTIONS, TONE_OPTIONS } from '@/types/flyer'

interface HistoryItem {
    id: string
    url: string
    title: string
    timestamp: number
}

interface PlatformOption {
    id: string
    label: string
    aspectRatio: string
}

const PLATFORMS: PlatformOption[] = [
    { id: 'instagram_post', label: 'Instagram Post (1080x1080)', aspectRatio: '1:1' },
    { id: 'instagram_story', label: 'Instagram Story (1080x1920)', aspectRatio: '9:16' },
    { id: 'instagram_reel', label: 'Instagram Reel (1080x1920)', aspectRatio: '9:16' },
    { id: 'facebook_post', label: 'Facebook Post (1200x630)', aspectRatio: '1.91:1' },
    { id: 'facebook_cover', label: 'Facebook Cover (820x312)', aspectRatio: '2.6:1' },
    { id: 'twitter_post', label: 'X / Twitter Post (1200x675)', aspectRatio: '16:9' },
    { id: 'linkedin_post', label: 'LinkedIn Post (1200x1200)', aspectRatio: '1:1' },
    { id: 'linkedin_banner', label: 'LinkedIn Banner (1584x396)', aspectRatio: '4:1' },
    { id: 'pinterest_pin', label: 'Pinterest Pin (1000x1500)', aspectRatio: '2:3' },
    { id: 'youtube_thumbnail', label: 'YouTube Thumbnail (1280x720)', aspectRatio: '16:9' },
    { id: 'tiktok_video', label: 'TikTok Video (1080x1920)', aspectRatio: '9:16' },
    { id: 'snapchat_story', label: 'Snapchat Story (1080x1920)', aspectRatio: '9:16' },
    { id: 'whatsapp_status', label: 'WhatsApp Status (1080x1920)', aspectRatio: '9:16' },
    { id: 'a4_poster', label: 'A4 Poster (Print) (2480x3508)', aspectRatio: '1:1.41' },
    { id: 'a3_poster', label: 'A3 Poster (Print) (3508x4960)', aspectRatio: '1:1.41' },
    { id: 'flyer_a5', label: 'A5 Flyer (Print) (1748x2480)', aspectRatio: '1:1.41' }
]

export function SimpleGenerator() {
    // Structured form fields
    const [formData, setFormData] = useState({
        headline: '',
        tagline: '',
        description: '',
        bulletPoints: '',
        benefits: '',
        date: '',
        time: '',
        duration: '',
        location: '',
        price: '',
        urgencyLine: '',
        cta: 'Register Now',
        sportType: '' // New field
    })

    const [platform, setPlatform] = useState<string>('instagram_post')
    const [referenceImage, setReferenceImage] = useState<File | null>(null)
    const [referencePreview, setReferencePreview] = useState<string | null>(null)
    const [logoImage, setLogoImage] = useState<File | null>(null)
    const [logoPreview, setLogoPreview] = useState<string | null>(null)
    const [isGenerating, setIsGenerating] = useState(false)
    const [history, setHistory] = useState<HistoryItem[]>([])
    const [isLoadingHistory, setIsLoadingHistory] = useState(true)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const logoInputRef = useRef<HTMLInputElement>(null)

    // Advanced settings state
    const [showAdvanced, setShowAdvanced] = useState(false)
    const [visualStyle, setVisualStyle] = useState('corporate')
    const [colorTheme, setColorTheme] = useState('auto')
    const [tone, setTone] = useState('') // Muted default
    const [customColors, setCustomColors] = useState<string[]>([])

    // Figure and product image state
    const [figureType, setFigureType] = useState<string>('none')
    const [productImages, setProductImages] = useState<File[]>([])
    const [productPreviews, setProductPreviews] = useState<string[]>([])
    const [imageArrangement, setImageArrangement] = useState<string>('auto')
    // New: Font State (3 levels) - Muted default
    const [fontSelection, setFontSelection] = useState({
        headline: '',
        subheadline: '',
        body: ''
    })
    const [useAiBackground, setUseAiBackground] = useState(false)
    const [customFigurePrompt, setCustomFigurePrompt] = useState('')
    const [isAdvancedModalOpen, setIsAdvancedModalOpen] = useState(false)
    const [influencerImage, setInfluencerImage] = useState<File | null>(null)
    const [influencerPreview, setInfluencerPreview] = useState<string | null>(null)
    const [customCta, setCustomCta] = useState('')
    const [skinTone, setSkinTone] = useState('')

    const productInputRef = useRef<HTMLInputElement>(null)
    const influencerInputRef = useRef<HTMLInputElement>(null)

    // EXPANDED FONT LIST (Free for Commercial Use)
    const GOOGLE_FONTS = [
        "Inter", "Roboto", "Open Sans", "Lato", "Montserrat", "Oswald", "Raleway",
        "Poppins", "Playfair Display", "Merriweather", "Pacifico", "Rubik", "Ubuntu",
        "Nunito", "Lora", "Fira Sans", "Work Sans", "Quicksand", "Barlow", "Titillium Web",
        "Libre Baskerville", "Josefin Sans", "Anton", "Cabin", "Karla", "Arvo", "Dancing Script",
        "Abril Fatface", "Bebas Neue", "Lobster", "Comfortaa", "Exo 2", "Righteous", "Fredoka One"
    ]

    // New: Load Google Fonts dynamically
    useEffect(() => {
        if (typeof document !== 'undefined') {
            const link = document.createElement('link')
            const fontFamilies = GOOGLE_FONTS.map(f => f.replace(/ /g, '+') + ':wght@400;700').join('&family=')
            link.href = `https://fonts.googleapis.com/css2?family=${fontFamilies}&display=swap`
            link.rel = 'stylesheet'
            document.head.appendChild(link)
        }
    }, [])

    const updateField = (field: keyof typeof formData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    // Load history on mount
    useEffect(() => {
        fetchHistory()
    }, [])

    const fetchHistory = async () => {
        try {
            setIsLoadingHistory(true)
            const res = await fetch('/api/v2/render/history')
            const data = await res.json()
            if (data.success && data.history) {
                setHistory(data.history)
            }
        } catch (error) {
            console.error('Failed to load history:', error)
        } finally {
            setIsLoadingHistory(false)
        }
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setReferenceImage(file)
            const reader = new FileReader()
            reader.onloadend = () => {
                setReferencePreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const removeImage = () => {
        setReferenceImage(null)
        setReferencePreview(null)
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setLogoImage(file)
            const reader = new FileReader()
            reader.onloadend = () => {
                setLogoPreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const removeLogo = () => {
        setLogoImage(null)
        setLogoPreview(null)
        if (logoInputRef.current) {
            logoInputRef.current.value = ''
        }
    }

    // New: Handle multiple product images (up to 6)
    const handleProductUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || [])
        if (files.length > 0) {
            const spacesAvailable = 6 - productImages.length
            const newFiles = files.slice(0, spacesAvailable)

            setProductImages(prev => [...prev, ...newFiles])

            newFiles.forEach(file => {
                const reader = new FileReader()
                reader.onloadend = () => {
                    setProductPreviews(prev => [...prev, reader.result as string])
                }
                reader.readAsDataURL(file)
            })
        }
        // Reset input
        if (productInputRef.current) productInputRef.current.value = ''
    }

    const removeProduct = (index: number) => {
        setProductImages(prev => prev.filter((_, i) => i !== index))
        setProductPreviews(prev => prev.filter((_, i) => i !== index))
    }

    const uploadFile = async (file: File) => {
        try {
            const formData = new FormData()
            formData.append('file', file)
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            })
            const data = await res.json()
            return data.success ? data.url : null
        } catch (e) {
            console.error('Upload failed', e)
            return null
        }
    }

    const downloadImage = async (url: string) => {
        try {
            const response = await fetch(url)
            const blob = await response.blob()
            const link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.download = `poster-${Date.now()}.png`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        } catch (error) {
            console.error('Download failed:', error)
            window.open(url, '_blank') // Fallback
        }
    }

    const [error, setError] = useState<string | null>(null)
    const [generatedImage, setGeneratedImage] = useState<string | null>(null)
    const [jobId, setJobId] = useState<string | null>(null)

    const checkJobStatus = async (id: string) => {
        try {
            const response = await fetch(`/api/v2/render/status?jobId=${id}`)
            const data = await response.json()

            if (data.success) {
                if (data.status === 'success' && data.resultUrls && data.resultUrls.length > 0) {
                    setGeneratedImage(data.resultUrls[0])
                    setIsGenerating(false)
                    // Refresh history
                    fetchHistory()
                } else if (data.status === 'failed') {
                    setError(data.error || 'Generation failed')
                    setIsGenerating(false)
                } else {
                    // Still processing
                    setTimeout(() => checkJobStatus(id), 2000)
                }
            } else {
                setError(data.msg || 'Failed to check status')
                setIsGenerating(false)
            }
        } catch (err) {
            console.error('Status check error:', err)
            setTimeout(() => checkJobStatus(id), 2000)
        }
    }

    const handleGenerate = async () => {
        if (!formData.headline.trim()) return

        setIsGenerating(true)
        setError(null)
        setGeneratedImage(null)

        try {
            // Upload images first
            const uploadedUrls: string[] = []

            if (referenceImage) {
                const url = await uploadFile(referenceImage)
                if (url) uploadedUrls.push(url)
            }

            if (logoImage) {
                const url = await uploadFile(logoImage)
                if (url) uploadedUrls.push(url)
            }

            // Upload product images
            const uploadedProductUrls: string[] = []
            for (const file of productImages) {
                const url = await uploadFile(file)
                if (url) uploadedProductUrls.push(url)
            }

            // Upload influencer image
            let influencerUrl: string | null = null
            if (influencerImage) {
                influencerUrl = await uploadFile(influencerImage)
            }

            // Construct basic state from script
            // In a real app, we might use LLM to parse the script into structured data
            // For now, we put the whole script as 'details' and use defaults
            const payload = {
                purpose: 'promotional', // Default
                format: platform,
                industry: 'general',
                content: {
                    headline: formData.headline,
                    subheadline: formData.tagline,
                    details: [
                        formData.description,
                        formData.bulletPoints ? `Key Points: ${formData.bulletPoints}` : '',
                        formData.benefits ? `Benefits: ${formData.benefits}` : '',
                        formData.date ? `Date: ${formData.date}` : '',
                        formData.time ? `Time: ${formData.time}` : '',
                        formData.duration ? `Duration: ${formData.duration}` : '',
                        formData.location ? `Location: ${formData.location}` : '',
                        formData.price ? `Price: ${formData.price}` : '',
                        formData.urgencyLine || ''
                    ].filter(Boolean).join(' | '),
                    cta: formData.cta === 'other' ? customCta : formData.cta,
                },
                visualStyle: visualStyle,
                colorTheme: colorTheme,
                tone: tone,
                customColors: customColors.filter(c => c && c.length === 7), // Only valid hex colors
                imageUrls: uploadedUrls,
                // New fields
                figureType,
                productImageUrls: uploadedProductUrls,
                imageArrangement,
                fontSelection,
                useAiBackground,
                influencerImageUrl: influencerUrl,
                customFigurePrompt,
                skinTone,
                sportType: formData.sportType // Pass new field
            }

            const response = await fetch('/api/v2/flyer/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            })

            const data = await response.json()

            if (data.success && data.jobId) {
                setJobId(data.jobId)
                checkJobStatus(data.jobId)
            } else {
                setError(data.msg || 'Failed to start generation')
                setIsGenerating(false)
            }
        } catch (error) {
            console.error('Generation failed:', error)
            setError('Network error. Please try again.')
            setIsGenerating(false)
        }
    }

    const formatTimestamp = (timestamp: number) => {
        const date = new Date(timestamp)
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    return (
        <div className="min-h-screen bg-white text-[#1A1A1A] pt-32 pb-12 px-6">
            <div className="max-w-[1600px] mx-auto">
                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    {/* Left: Input Section */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* Structured Form */}
                        <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-xl space-y-6">

                            {/* TOP SECTION: Visuals & Style */}
                            <div className="space-y-6 border-b border-gray-100 pb-6">
                                <div className="space-y-6">
                                    {/* Logo Upload - Full Width */}
                                    <div>
                                        <label className="block text-sm font-semibold text-[#1A1A1A] mb-3">
                                            Company Logo (Optional)
                                        </label>
                                        <p className="text-sm text-gray-500 mb-4 h-10">
                                            Upload logo for brand guidance & colors
                                        </p>

                                        {logoPreview ? (
                                            <div className="relative inline-block w-full">
                                                <div className="w-full h-32 flex items-center justify-center bg-gray-50 rounded-[16px] border-2 border-gray-100">
                                                    <img
                                                        src={logoPreview}
                                                        alt="Logo"
                                                        className="max-w-full max-h-full object-contain p-2"
                                                    />
                                                </div>
                                                <button
                                                    onClick={removeLogo}
                                                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => logoInputRef.current?.click()}
                                                className="w-full flex flex-col items-center justify-center gap-3 px-6 py-8 bg-gray-50 border-2 border-dashed border-gray-200 rounded-[20px] hover:border-gray-300 hover:bg-gray-100 transition-all"
                                            >
                                                <Upload className="w-5 h-5 text-gray-400" />
                                                <span className="text-gray-500 font-medium text-sm">Upload Logo</span>
                                            </button>
                                        )}

                                        <input
                                            ref={logoInputRef}
                                            type="file"
                                            accept="image/*"
                                            onChange={handleLogoUpload}
                                            className="hidden"
                                        />
                                    </div>
                                </div>

                                {/* Poster Theme (Compulsory) */}
                                <div>
                                    <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">Poster Theme *</label>
                                    <select
                                        value={visualStyle}
                                        onChange={(e) => setVisualStyle(e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:border-[#1A1A1A] focus:bg-white focus:outline-none transition-all font-medium cursor-pointer"
                                    >
                                        <option value="corporate">Corporate / Business</option>
                                        <option value="sport">Sport / Tournament</option>
                                        <option value="party">Party / Celebration</option>
                                        <option value="event">Event / Conference</option>
                                        <option value="wedding">Wedding / Engagement</option>
                                        <option value="education">Education / Training</option>
                                        <option value="real-estate">Real Estate / Property</option>
                                        <option value="church">Church / Religious</option>
                                        <option value="fitness">Fitness / Health</option>
                                        <option value="food">Food / Restaurant</option>
                                        <option value="tech">Technology / Startup</option>
                                        <option value="fashion">Fashion / Beauty</option>
                                        <option value="music">Music / Entertainment</option>
                                        <option value="national-celebration">National Celebrations (Kenya)</option>
                                        <option value="african-culture">African Culture</option>
                                    </select>
                                </div>
                            </div>

                            {/* Sport Type (Conditional) */}
                            {visualStyle === 'sport' && (
                                <div className="mb-6 animate-in fade-in slide-in-from-top-2">
                                    <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">Sport Type</label>
                                    <input
                                        type="text"
                                        value={formData.sportType}
                                        onChange={(e) => updateField('sportType', e.target.value)}
                                        placeholder="e.g. Football, Badminton, Yoga"
                                        className="w-full px-4 py-3 bg-blue-50 border-2 border-blue-100 rounded-xl focus:border-blue-500 focus:bg-white focus:outline-none transition-all font-medium"
                                    />
                                </div>
                            )}

                            {/* Main Headline */}
                            <div>
                                <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">Main Headline *</label>
                                <input
                                    type="text"
                                    value={formData.headline}
                                    onChange={(e) => updateField('headline', e.target.value)}
                                    placeholder="e.g., AI Masterclass 2024"
                                    className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:border-[#1A1A1A] focus:bg-white focus:outline-none transition-all font-medium"
                                />
                            </div>

                            {/* Tagline */}
                            <div>
                                <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">Subtitle / Tagline</label>
                                <input
                                    type="text"
                                    value={formData.tagline}
                                    onChange={(e) => updateField('tagline', e.target.value)}
                                    placeholder="e.g., Learn the Future Today"
                                    className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:border-[#1A1A1A] focus:bg-white focus:outline-none transition-all font-medium"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">Short Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => updateField('description', e.target.value)}
                                    placeholder="Brief overview of your event/offer..."
                                    rows={2}
                                    className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:border-[#1A1A1A] focus:bg-white focus:outline-none transition-all font-medium resize-none"
                                />
                            </div>

                            {/* Two-column grid for smaller fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Bullet Points */}
                                <div>
                                    <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">Key Highlights</label>
                                    <input
                                        type="text"
                                        value={formData.bulletPoints}
                                        onChange={(e) => updateField('bulletPoints', e.target.value)}
                                        placeholder="e.g., Hands-on labs, Expert speakers"
                                        className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:border-[#1A1A1A] focus:bg-white focus:outline-none transition-all font-medium text-sm"
                                    />
                                </div>

                                {/* Benefits */}
                                <div>
                                    <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">Benefits / Outcomes</label>
                                    <input
                                        type="text"
                                        value={formData.benefits}
                                        onChange={(e) => updateField('benefits', e.target.value)}
                                        placeholder="e.g., Certificate, Lifetime access"
                                        className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:border-[#1A1A1A] focus:bg-white focus:outline-none transition-all font-medium text-sm"
                                    />
                                </div>

                                {/* Date */}
                                <div>
                                    <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">Date</label>
                                    <input
                                        type="text"
                                        value={formData.date}
                                        onChange={(e) => updateField('date', e.target.value)}
                                        placeholder="e.g., March 15-17, 2024"
                                        className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:border-[#1A1A1A] focus:bg-white focus:outline-none transition-all font-medium text-sm"
                                    />
                                </div>

                                {/* Time */}
                                <div>
                                    <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">Time</label>
                                    <input
                                        type="text"
                                        value={formData.time}
                                        onChange={(e) => updateField('time', e.target.value)}
                                        placeholder="e.g., 9:00 AM - 5:00 PM"
                                        className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:border-[#1A1A1A] focus:bg-white focus:outline-none transition-all font-medium text-sm"
                                    />
                                </div>

                                {/* Duration */}
                                <div>
                                    <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">Duration</label>
                                    <input
                                        type="text"
                                        value={formData.duration}
                                        onChange={(e) => updateField('duration', e.target.value)}
                                        placeholder="e.g., 3 days, 2 hours"
                                        className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:border-[#1A1A1A] focus:bg-white focus:outline-none transition-all font-medium text-sm"
                                    />
                                </div>

                                {/* Location */}
                                <div>
                                    <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">Location</label>
                                    <input
                                        type="text"
                                        value={formData.location}
                                        onChange={(e) => updateField('location', e.target.value)}
                                        placeholder="e.g., Online, Nairobi, Hybrid"
                                        className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:border-[#1A1A1A] focus:bg-white focus:outline-none transition-all font-medium text-sm"
                                    />
                                </div>

                                {/* Price */}
                                <div>
                                    <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">Price (optional)</label>
                                    <input
                                        type="text"
                                        value={formData.price}
                                        onChange={(e) => updateField('price', e.target.value)}
                                        placeholder="e.g., KES 5,000, Free"
                                        className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:border-[#1A1A1A] focus:bg-white focus:outline-none transition-all font-medium text-sm"
                                    />
                                </div>

                                {/* Urgency */}
                                <div>
                                    <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">Urgency Line (optional)</label>
                                    <input
                                        type="text"
                                        value={formData.urgencyLine}
                                        onChange={(e) => updateField('urgencyLine', e.target.value)}
                                        placeholder="e.g., Limited seats!, Early bird ends soon"
                                        className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:border-[#1A1A1A] focus:bg-white focus:outline-none transition-all font-medium text-sm"
                                    />
                                </div>
                            </div>

                            {/* CTA */}
                            <div>
                                <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">Call-to-Action</label>
                                <select
                                    value={formData.cta}
                                    onChange={(e) => updateField('cta', e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:border-[#1A1A1A] focus:bg-white focus:outline-none transition-all font-medium cursor-pointer"
                                >
                                    <option value="Register Now">Register Now</option>
                                    <option value="Apply Today">Apply Today</option>
                                    <option value="Book a Seat">Book a Seat</option>
                                    <option value="Get Started">Get Started</option>
                                    <option value="Learn More">Learn More</option>
                                    <option value="Sign Up">Sign Up</option>
                                    <option value="Join Now">Join Now</option>
                                    <option value="Sign Up">Sign Up</option>
                                    <option value="Join Now">Join Now</option>
                                    <option value="Shop Now">Shop Now</option>
                                    <option value="Contact Us">Contact Us</option>
                                    <option value="other">Other (Custom)</option>
                                </select>
                                {formData.cta === 'other' && (
                                    <input
                                        type="text"
                                        value={customCta}
                                        onChange={(e) => {
                                            setCustomCta(e.target.value)
                                            // We don't update formData.cta here because it needs to stay 'other' to keep input visible
                                            // We will handle the actual value in handleGenerate
                                        }}
                                        placeholder="Enter custom Call-to-Action..."
                                        className="w-full mt-2 px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-[#1A1A1A] focus:outline-none transition-all font-medium text-sm animate-in fade-in slide-in-from-top-1"
                                    />
                                )}
                            </div>

                            {/* Advanced Controls Button */}
                            <div className="mt-8">
                                <button
                                    onClick={() => setIsAdvancedModalOpen(true)}
                                    className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gray-50 border-2 border-dashed border-gray-200 rounded-[20px] hover:border-[#1A1A1A] hover:bg-white transition-all group"
                                >
                                    <Settings className="w-5 h-5 text-gray-500 group-hover:text-[#1A1A1A]" />
                                    <span className="font-semibold text-gray-600 group-hover:text-[#1A1A1A]">Open Advanced Design Controls</span>
                                </button>
                                <p className="text-center text-xs text-gray-400 mt-2">Customize colors, fonts, figures, and more</p>
                            </div>

                            {/* Platform Selector */}
                            <div className="mt-8">
                                <label className="block text-lg font-semibold text-[#1A1A1A] mb-4">
                                    Format & Platform
                                </label>
                                <div className="relative">
                                    <select
                                        value={platform}
                                        onChange={(e) => setPlatform(e.target.value)}
                                        className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-[20px] focus:border-[#1A1A1A] focus:bg-white focus:outline-none transition-all font-medium appearance-none cursor-pointer"
                                    >
                                        {PLATFORMS.map((option) => (
                                            <option key={option.id} value={option.id}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-500 mt-2 px-2">
                                    Select the target platform to ensure perfect dimensions
                                </p>
                            </div>



                            {/* Result Area */}
                            {generatedImage && (
                                <div className="mt-8 p-6 bg-green-50 rounded-[24px] border border-green-100 text-center">
                                    <h3 className="text-xl font-bold text-green-800 mb-4">Poster Generated!</h3>
                                    <div className="w-full h-auto rounded-xl overflow-hidden shadow-lg border-4 border-white mb-6">
                                        <img src={generatedImage} alt="Generated Poster" className="w-full h-auto" />
                                    </div>
                                    <button
                                        onClick={() => downloadImage(generatedImage)}
                                        className="px-6 py-2.5 bg-[#1A1A1A] text-white rounded-xl font-medium text-sm hover:bg-black transition-all flex items-center gap-2 shadow-lg shadow-black/5"
                                    >
                                        <Download className="w-4 h-4" />
                                        Download Poster
                                    </button>
                                </div>
                            )}

                            {error && (
                                <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 text-center">
                                    {error}
                                </div>
                            )}

                            {/* Generate Button */}
                            <div className="mt-8">
                                <Button
                                    onClick={handleGenerate}
                                    disabled={!formData.headline.trim() || isGenerating}
                                    style={{ backgroundImage: 'none', backgroundColor: 'black' }}
                                    className="w-full h-16 bg-black text-white text-lg font-bold rounded-full hover:bg-gray-900 hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none"
                                >
                                    {isGenerating ? (
                                        <>
                                            <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                                            Generating...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="w-6 h-6 mr-3" />
                                            Generate Poster
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Right: History Section - Sticky */}
                    <div className="lg:col-span-2 relative">
                        <div className="sticky top-8 bg-gray-50 p-6 rounded-[32px] border border-gray-100 h-[calc(100vh-2rem)] overflow-y-auto">
                            <div className="flex items-center gap-2 mb-6">
                                <Clock className="w-5 h-5 text-gray-500" />
                                <h3 className="font-clash-display font-medium text-lg text-[#1A1A1A]">
                                    Recent Generations
                                </h3>
                            </div>

                            {/* History Items would go here - Update rendering to support taller previews */}
                            {/* Assuming existing code renders items, verifying aspect ratio update if visible in previous views, 
                               otherwise user might need to confirm where the items are rendered. 
                               But the user said "Make Recent Generations static... and longer". 
                               I updated the container height to h-[calc(100vh-2rem)]. 
                               I will assume the internal item rendering is handled elsewhere or is dynamic. 
                               Wait, I don't see the ITEM rendering loop here. It must be inside the history component or below. 
                               Ah, I was looking at the simplified view. 
                               If it's not here, I might need to find where `history` is mapped. 
                               However, I will apply the container fix for now.
                            */}

                            {isLoadingHistory ? (
                                <div className="flex items-center justify-center py-12">
                                    <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                                </div>
                            ) : history.length === 0 ? (
                                <div className="text-center py-12">
                                    <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                    <p className="text-gray-500 text-sm">No generations yet</p>
                                    <p className="text-gray-400 text-xs mt-1">Your creations will appear here</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {history.map((item) => (
                                        <div key={item.id} className="group relative bg-white p-3 rounded-2xl border border-gray-100 hover:border-[#1A1A1A] transition-all cursor-pointer">
                                            <div className="rounded-xl overflow-hidden bg-gray-50 mb-3 relative">
                                                {item.url && (
                                                    <img
                                                        src={item.url}
                                                        alt={item.title}
                                                        className="w-full h-auto object-contain"
                                                    />
                                                )}
                                            </div>
                                            <div className="p-3 flex items-center justify-between gap-2">
                                                <p className="text-sm font-medium text-[#1A1A1A] truncate flex-1">
                                                    {item.title}
                                                </p>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        downloadImage(item.url)
                                                    }}
                                                    className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-[#1A1A1A] transition-colors"
                                                    title="Download"
                                                >
                                                    <Download className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Advanced Settings Modal */}
            {isAdvancedModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-white rounded-[32px] w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in slide-in-from-bottom-4 flex flex-col">
                        <div className="sticky top-0 bg-white/95 backdrop-blur z-10 p-6 border-b border-gray-100 flex items-center justify-between">
                            <h2 className="text-xl font-bold font-clash-display">Advanced Controls</h2>
                            <button
                                onClick={() => setIsAdvancedModalOpen(false)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-8 space-y-8 overflow-y-auto flex-1">
                            {/* Color Picker */}
                            <div>
                                <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                                    Custom Colors
                                </label>
                                <p className="text-xs text-gray-400 mb-3">Leave empty to use colors from reference image</p>
                                <div className="flex flex-wrap gap-3">
                                    {[0, 1, 2].map((index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <input
                                                type="color"
                                                value={customColors[index] || '#000000'}
                                                onChange={(e) => {
                                                    const newColors = [...customColors]
                                                    newColors[index] = e.target.value
                                                    setCustomColors(newColors.slice(0, 3))
                                                }}
                                                className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer"
                                            />
                                            {customColors[index] && (
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const newColors = customColors.filter((_, i) => i !== index)
                                                        setCustomColors(newColors)
                                                    }}
                                                    className="text-gray-400 hover:text-red-500"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Tone & Emotion */}
                            <div>
                                <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">Tone & Emotion</label>
                                <select
                                    value={tone}
                                    onChange={(e) => setTone(e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:border-[#1A1A1A] focus:outline-none transition-all cursor-pointer"
                                >
                                    <option value="">Auto / Default (AI Decides)</option>
                                    <option value="professional">Professional & Corporate</option>
                                    <option value="exciting">Exciting & Energetic</option>
                                    <option value="urgent">Urgent & Time-Sensitive</option>
                                    <option value="friendly">Friendly & Approachable</option>
                                    <option value="premium">Premium & Luxurious</option>
                                    <option value="inspirational">Inspirational & Motivational</option>
                                    <option value="trustworthy">Trustworthy & Reliable</option>
                                    <option value="playful">Playful & Fun</option>
                                    <option value="elegant">Elegant & Sophisticated</option>
                                    <option value="bold">Bold & Confident</option>
                                    <option value="calm">Calm & Peaceful</option>
                                    <option value="modern">Modern & Trendy</option>
                                    <option value="kenyan-vibe">Kenyan Vibe (Patriotic)</option>
                                    <option value="swahili-coastal">Swahili Coastal (Elegant)</option>
                                    <option value="maasai-bold">Maasai Bold (Vibrant)</option>
                                    <option value="afro-modern">Afro-Modern (Urban)</option>
                                </select>
                            </div>

                            {/* Fonts */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-semibold text-[#1A1A1A]">Typography Setup</label>
                                    <span className="text-[10px] text-gray-500 bg-gray-100 px-2 py-1 rounded-full">Google Fonts</span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {(['headline', 'subheadline', 'body'] as const).map((type) => (
                                        <div key={type}>
                                            <label className="block text-xs text-gray-500 mb-1 capitalize">{type}</label>
                                            <select
                                                value={fontSelection[type]}
                                                onChange={(e) => setFontSelection(prev => ({ ...prev, [type]: e.target.value }))}
                                                style={{ fontFamily: fontSelection[type] }}
                                                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:border-[#1A1A1A] focus:outline-none transition-all cursor-pointer"
                                            >
                                                <option value="">Auto</option>
                                                {GOOGLE_FONTS.map(font => (
                                                    <option key={font} value={font} style={{ fontFamily: font }}>{font}</option>
                                                ))}
                                            </select>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* AI Background */}
                            <div className="flex items-center justify-between p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:border-[#1A1A1A] transition-colors group">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-800 group-hover:text-[#1A1A1A] transition-colors">Background Image Overlay</label>
                                    <p className="text-xs text-gray-500 mt-1">Generate a custom mood-based background layer</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={useAiBackground}
                                        onChange={(e) => setUseAiBackground(e.target.checked)}
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1A1A1A]"></div>
                                </label>
                            </div>

                            {/* Human Figures */}
                            <div>
                                <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">Human Figures</label>
                                <select
                                    value={figureType}
                                    onChange={(e) => setFigureType(e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:border-[#1A1A1A] focus:outline-none transition-all cursor-pointer"
                                >
                                    <option value="none">No Figures</option>
                                    <option value="male-casual">Male (Casual)</option>
                                    <option value="male-corporate">Male (Corporate)</option>
                                    <option value="female-casual">Female (Casual)</option>
                                    <option value="female-corporate">Female (Corporate)</option>
                                    <option value="diverse-group">Diverse Group</option>
                                    <option value="robot">Robot / Futuristic Character</option>
                                    <option value="influencer">Influencer / Specific Person (Upload)</option>
                                    <option value="other">Other (Describe...)</option>
                                </select>

                                {/* Skin Tone Selector (Conditional) */}
                                {figureType !== 'none' && figureType !== 'robot' && (
                                    <div className="mt-3 animate-in fade-in slide-in-from-top-2">
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Skin Tone Preference</label>
                                        <select
                                            value={skinTone}
                                            onChange={(e) => setSkinTone(e.target.value)}
                                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:border-[#1A1A1A] focus:outline-none transition-all cursor-pointer"
                                        >
                                            <option value="">Any / Auto</option>
                                            <option value="African">African / Black</option>
                                            <option value="White">White / Caucasian</option>
                                            <option value="Asian">Asian</option>
                                            <option value="Latino">Latino / Hispanic</option>
                                        </select>
                                    </div>
                                )}

                                {figureType === 'other' && (
                                    <input
                                        type="text"
                                        value={customFigurePrompt}
                                        onChange={(e) => setCustomFigurePrompt(e.target.value)}
                                        placeholder="Describe the human figure(s)..."
                                        className="w-full mt-3 px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:border-[#1A1A1A] focus:outline-none transition-all"
                                    />
                                )}
                                {figureType === 'influencer' && (
                                    <div className="mt-3 space-y-3 animate-in fade-in slide-in-from-top-2">
                                        <div
                                            onClick={() => influencerInputRef.current?.click()}
                                            className="border-2 border-dashed border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:border-[#1A1A1A] hover:bg-gray-50 transition-all text-center relative overflow-hidden"
                                        >
                                            {influencerPreview ? (
                                                <div className="relative w-full aspect-square max-w-[200px] mb-2">
                                                    <img src={influencerPreview} alt="Influencer" className="w-full h-full object-cover rounded-lg" />
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            setInfluencerImage(null)
                                                            setInfluencerPreview(null)
                                                        }}
                                                        className="absolute top-1 right-1 bg-white/90 p-1 rounded-full text-red-500 hover:bg-white"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <>
                                                    <Upload className="w-6 h-6 text-gray-400 mb-2" />
                                                    <p className="text-xs text-gray-500">Upload Reference Photo</p>
                                                    <p className="text-[10px] text-gray-400">AI will attempt to match this person</p>
                                                </>
                                            )}
                                        </div>
                                        <input
                                            type="file"
                                            ref={influencerInputRef}
                                            onChange={(e) => {
                                                const file = e.target.files?.[0]
                                                if (file) {
                                                    setInfluencerImage(file)
                                                    const reader = new FileReader()
                                                    reader.onloadend = () => setInfluencerPreview(reader.result as string)
                                                    reader.readAsDataURL(file)
                                                }
                                            }}
                                            accept="image/*"
                                            className="hidden"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Product Images */}
                            <div>
                                <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                                    Product Images (Max 6)
                                </label>
                                <div className="space-y-4">
                                    {productImages.length < 6 && (
                                        <div
                                            onClick={() => productInputRef.current?.click()}
                                            className="border-2 border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-[#1A1A1A] hover:bg-gray-50 transition-all text-center"
                                        >
                                            <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
                                            <p className="text-sm text-gray-500 font-medium">Click to upload images</p>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        ref={productInputRef}
                                        onChange={handleProductUpload}
                                        accept="image/*"
                                        multiple
                                        className="hidden"
                                    />

                                    {productPreviews.length > 0 && (
                                        <div className="grid grid-cols-3 gap-3">
                                            {productPreviews.map((preview, index) => (
                                                <div key={index} className="relative aspect-square rounded-xl overflow-hidden border border-gray-100 group">
                                                    <img src={preview} alt={`Product ${index + 1}`} className="w-full h-full object-cover" />
                                                    <button
                                                        onClick={() => removeProduct(index)}
                                                        className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-sm"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Arrangement */}
                                    {productImages.length > 0 && (
                                        <div className="animate-in fade-in slide-in-from-top-2 pt-2">
                                            <label className="block text-xs font-medium text-gray-500 mb-2">Arrangement Style</label>
                                            <select
                                                value={imageArrangement}
                                                onChange={(e) => setImageArrangement(e.target.value)}
                                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:border-[#1A1A1A] focus:outline-none transition-all cursor-pointer"
                                            >
                                                <option value="auto">Auto Layout</option>
                                                <option value="mosaic">Mosaic Grid</option>
                                                <option value="bordered">Bordered / Framed</option>
                                                <option value="masonry">Masonry (Editorial)</option>
                                                <option value="popup">Pop-up / Floating</option>
                                                <option value="collage">Artistic Collage</option>
                                            </select>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="sticky bottom-0 bg-white p-6 border-t border-gray-100">
                            <button
                                onClick={() => setIsAdvancedModalOpen(false)}
                                className="w-full py-4 bg-[#1A1A1A] text-white rounded-xl font-bold hover:bg-black transition-colors"
                            >
                                Save & Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
