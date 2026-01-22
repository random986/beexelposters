'use client'

import React from 'react'

interface ProtectedImageProps {
    src: string
    alt: string
    className?: string
    width?: number | string
    height?: number | string
    useProxy?: boolean
    showOverlay?: boolean
}

/**
 * An image component that implements several layers of anti-download features:
 * 1. Disables context menu (right-click)
 * 2. Disables dragging
 * 3. Uses a transparent overlay to prevent direct image selection (optional)
 * 4. (Optional) Proxies through a secure backend route with no-cache/no-store headers
 */
export function ProtectedImage({
    src,
    alt,
    className = '',
    width,
    height,
    useProxy = false,
    showOverlay = true
}: ProtectedImageProps) {
    // If useProxy is true, route through our secure assets API
    const finalSrc = useProxy
        ? `/api/v2/assets/secure?path=${encodeURIComponent(src.startsWith('/') ? `public${src}` : `public/${src}`)}`
        : src

    return (
        <div
            className={`img-protection-wrapper ${className}`}
            onContextMenu={(e) => e.preventDefault()}
            style={{ width, height }}
        >
            <img
                src={finalSrc}
                alt={alt}
                className="w-full h-full object-cover no-download"
                draggable={false}
            />
            {/* Invisible overlay that sits on top of the image */}
            {showOverlay && <div className="img-protection-overlay" />}
        </div>
    )
}
