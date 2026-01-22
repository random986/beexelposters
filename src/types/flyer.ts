// Type definitions for the AI Flyer & Poster Generator

export interface FlyerState {
    // Step 1: Purpose Selection
    purpose: string // e.g., 'Event Flyer', 'Business Promotion', etc.

    // Step 2: Format & Distribution
    format: string // e.g., 'Instagram Post', 'A4 Print', etc.

    // Step 3: Industry/Niche
    industry: string // e.g., 'Education', 'Real Estate', etc.

    // Step 4: Content Input
    content: {
        headline: string
        subheadline: string
        details: string
        cta: string
        contactInfo: string
        logoUrl?: string
    }

    // Step 5: Visual Style
    visualStyle: string // e.g., 'Professional', 'Bold', 'Luxury', etc.

    // Step 6: Color Theme
    colorTheme: string // e.g., 'Auto', 'Brand Colors', 'Corporate Blue', etc.
    brandColors?: string[] // If 'Brand Colors' selected

    // Step 7: Imagery Style
    imageryStyle: string // e.g., 'Realistic Photography', '3D Illustration', etc.
    imageSource?: 'ai' | 'upload'
    uploadedImage?: File

    // Step 8: Layout Preference
    layout: string // e.g., 'Image on Top', 'Centered Typography', etc.

    // Step 9: Tone & Emotion
    tone: string // e.g., 'Urgent', 'Trustworthy', 'Exciting', etc.

    // Step 10: Generation
    generatedImages: string[]
    selectedVariation?: number

    // Step 11: Fine-tuning
    adjustments: {
        regenerate?: boolean
        modifications?: string
    }

    // Step 12: Export
    exportFormat: 'jpg' | 'png' | 'pdf'
}

export interface StepOption {
    id: string
    label: string
    description?: string
    icon?: any
    image?: string
}

// Purpose options (Step 1)
export const PURPOSE_OPTIONS: StepOption[] = [
    { id: 'event-flyer', label: 'Event Flyer', description: 'Concerts, conferences, gatherings' },
    { id: 'business-promotion', label: 'Business Promotion', description: 'Sales, offers, new products' },
    { id: 'product-ad', label: 'Product Advertisement', description: 'Product launches, features' },
    { id: 'social-media', label: 'Social Media Post', description: 'Instagram, Facebook, Twitter' },
    { id: 'corporate-poster', label: 'Corporate Poster', description: 'Company announcements' },
    { id: 'educational', label: 'Educational / Training', description: 'Workshops, courses' },
    { id: 'real-estate', label: 'Real Estate Flyer', description: 'Property listings' },
    { id: 'political', label: 'Political / Advocacy', description: 'Campaigns, awareness' },
    { id: 'church', label: 'Church / Religious', description: 'Events, announcements' },
    { id: 'entertainment', label: 'Entertainment / Lifestyle', description: 'Shows, lifestyle' },
    { id: 'hospitality', label: 'Hospitality', description: 'Hotels, restaurants, lounges' },
    { id: 'job-vacancy', label: 'Job Vacancy Poster', description: 'Hiring announcements' },
    { id: 'public-notice', label: 'Public Notice', description: 'Announcements, alerts' },
    { id: 'personal', label: 'Personal', description: 'Birthdays, weddings, memorials' },
]

// Format options (Step 2)
export const FORMAT_OPTIONS: StepOption[] = [
    { id: 'instagram-post', label: 'Instagram Post', description: '1:1 square' },
    { id: 'instagram-story', label: 'Instagram Story', description: '9:16 vertical' },
    { id: 'facebook-post', label: 'Facebook Post', description: '1.91:1 landscape' },
    { id: 'whatsapp-flyer', label: 'WhatsApp Flyer', description: '4:3 format' },
    { id: 'a4-print', label: 'A4 Print', description: '210×297mm' },
    { id: 'a5-print', label: 'A5 Print', description: '148×210mm' },
    { id: 'poster-large', label: 'Poster (Large)', description: 'A3, A2, A1' },
    { id: 'billboard-landscape', label: 'Billboard Landscape', description: 'Wide format' },
    { id: 'billboard-portrait', label: 'Billboard Portrait', description: 'Tall format' },
    { id: 'digital-screen', label: 'Digital Screen / TV', description: '16:9 format' },
]

// Industry options (Step 3)
export const INDUSTRY_OPTIONS: StepOption[] = [
    { id: 'education', label: 'Education & Training' },
    { id: 'real-estate', label: 'Real Estate' },
    { id: 'health-fitness', label: 'Health & Fitness' },
    { id: 'technology', label: 'Technology' },
    { id: 'agriculture', label: 'Agriculture' },
    { id: 'ngo', label: 'NGO / Non-Profit' },
    { id: 'corporate', label: 'Corporate / Consulting' },
    { id: 'fashion-beauty', label: 'Fashion & Beauty' },
    { id: 'food-beverage', label: 'Food & Beverage' },
    { id: 'construction', label: 'Construction' },
    { id: 'entertainment', label: 'Entertainment' },
    { id: 'finance', label: 'Finance & Banking' },
]

// Visual Style options (Step 5)
export const VISUAL_STYLE_OPTIONS: StepOption[] = [
    { id: 'professional', label: 'Professional & Corporate', description: 'Clean, minimal, neutral tones' },
    { id: 'bold', label: 'Bold & High-Impact', description: 'Strong contrast, bright colors' },
    { id: 'luxury', label: 'Luxury & Premium', description: 'Dark backgrounds, gold accents' },
    { id: 'modern-tech', label: 'Modern & Tech', description: 'Dark mode, neon, gradients' },
    { id: 'creative-playful', label: 'Creative & Playful', description: 'Illustrations, bright palettes' },
    { id: 'elegant-soft', label: 'Elegant & Soft', description: 'Pastel colors, white space' },
    { id: 'cultural', label: 'Cultural / Localized', description: 'African-inspired, traditional' },
]

// Color Theme options (Step 6)
export const COLOR_THEME_OPTIONS: StepOption[] = [
    { id: 'auto', label: 'Auto (Recommended)', description: 'AI selects best colors' },
    { id: 'brand', label: 'Brand Colors', description: 'Upload logo to extract' },
    { id: 'corporate-blue', label: 'Corporate Blue', description: '#0071c1 theme' },
    { id: 'vibrant-red-yellow', label: 'Vibrant Red & Yellow', description: 'Energetic palette' },
    { id: 'earthy-green', label: 'Earthy Green & Brown', description: 'Natural tones' },
    { id: 'black-gold', label: 'Black & Gold', description: 'Premium look' },
    { id: 'pastel', label: 'Pastel Mix', description: 'Soft colors' },
    { id: 'monochrome', label: 'Monochrome', description: 'Black, white, gray' },
]

// Imagery Style options (Step 7)
export const IMAGERY_STYLE_OPTIONS: StepOption[] = [
    { id: 'realistic', label: 'Realistic Photography', description: 'Stock-style photos' },
    { id: 'abstract', label: 'Abstract Background', description: 'Shapes, gradients' },
    { id: '3d', label: '3D Illustration', description: 'Modern 3D renders' },
    { id: 'vector', label: 'Flat Vector Illustration', description: 'Clean vectors' },
    { id: 'typography', label: 'No Image (Typography)', description: 'Text-based design' },
]

// Layout options (Step 8)
export const LAYOUT_OPTIONS: StepOption[] = [
    { id: 'image-top', label: 'Image on Top', description: 'Text below' },
    { id: 'image-bg', label: 'Image Background', description: 'Text overlay' },
    { id: 'split', label: 'Split Layout', description: 'Text + Image side-by-side' },
    { id: 'centered', label: 'Centered Typography', description: 'Balanced center' },
    { id: 'card', label: 'Card-style Layout', description: 'Boxed elements' },
    { id: 'poster-grid', label: 'Poster Grid Layout', description: 'Multi-section' },
]

// Tone & Emotion options (Step 9)
export const TONE_OPTIONS: StepOption[] = [
    { id: 'urgent', label: 'Urgent', description: 'Time-sensitive, action now' },
    { id: 'trustworthy', label: 'Trustworthy', description: 'Professional, reliable' },
    { id: 'inspirational', label: 'Inspirational', description: 'Motivational, uplifting' },
    { id: 'exciting', label: 'Exciting', description: 'Energetic, fun' },
    { id: 'serious', label: 'Serious', description: 'Formal, important' },
    { id: 'friendly', label: 'Friendly', description: 'Warm, approachable' },
    { id: 'premium', label: 'Premium', description: 'Exclusive, high-end' },
    { id: 'formal', label: 'Formal', description: 'Corporate, official' },
]
