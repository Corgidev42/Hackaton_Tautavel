"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { ProfileCard } from "@/components/profile/profile-card"
import { CaveVisualization } from "@/components/profile/cave-visualization"
import { SliceDetail } from "@/components/profile/slice-detail"
import type { CaveSlice } from "@/lib/cave-data"

interface User {
  email: string
  name: string
}

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedSlice, setSelectedSlice] = useState<CaveSlice | null>(null)

  useEffect(() => {
    const storedUser = sessionStorage.getItem("tautavel-user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    } else {
      router.push("/")
    }
    setIsLoading(false)
  }, [router])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-catalan-red border-t-transparent"></div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader user={user} />
      <main className="container mx-auto px-4 py-4 md:py-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:gap-8">
          {/* Left side - Profile info and XP */}
          <aside className="w-full lg:w-80 xl:w-96 shrink-0">
            <ProfileCard user={user} />
          </aside>

          {/* Right side - Cave visualization */}
          <div className="flex-1 space-y-4 md:space-y-6">
            <CaveVisualization selectedSlice={selectedSlice} onSelectSlice={setSelectedSlice} />
            {selectedSlice && <SliceDetail slice={selectedSlice} onClose={() => setSelectedSlice(null)} />}
          </div>
        </div>
      </main>
    </div>
  )
}