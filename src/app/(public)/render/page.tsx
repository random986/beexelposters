'use client'

import { Header } from '@/components/layout/Header'
import { SimpleGenerator } from '@/components/flyer/SimpleGenerator'

export default function RenderPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header lightBackground />
      <SimpleGenerator />
    </div>
  )
}
