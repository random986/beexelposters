'use client'

import { Header } from '@/components/layout/Header'
import { FlyerWizard } from '@/components/flyer/FlyerWizard'

export default function RenderPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header lightBackground />
      <FlyerWizard />
    </div>
  )
}
