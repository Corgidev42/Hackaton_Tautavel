"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter, useParams } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { VectorCanvas } from "@/components/vectorize/vector-canvas"
import { ColorPalette } from "@/components/vectorize/color-palette"
import { ArtifactForm } from "@/components/vectorize/artifact-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Undo2, Redo2, Trash2, Save, Send } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/i18n/language-context"

interface User {
  email: string
  name: string
}

interface Point {
  x: number
  y: number
}

interface Path {
  points: Point[]
  color: string
  width: number
}

export default function VectorizePage() {
  const params = useParams()
  const id = params.id as string
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedColor, setSelectedColor] = useState("#C8102E")
  const [brushWidth, setBrushWidth] = useState(3)
  const [paths, setPaths] = useState<Path[]>([])
  const [redoStack, setRedoStack] = useState<Path[]>([])
  const [isSaved, setIsSaved] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    const storedUser = sessionStorage.getItem("tautavel-user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    } else {
      router.push("/")
    }
    setIsLoading(false)
  }, [router])

  const handleAddPath = useCallback((path: Path) => {
    setPaths((prev) => [...prev, path])
    setRedoStack([])
    setIsSaved(false)
  }, [])

  const handleUndo = () => {
    if (paths.length > 0) {
      const newPaths = [...paths]
      const removed = newPaths.pop()
      if (removed) {
        setPaths(newPaths)
        setRedoStack((prev) => [...prev, removed])
      }
    }
  }

  const handleRedo = () => {
    if (redoStack.length > 0) {
      const newRedoStack = [...redoStack]
      const restored = newRedoStack.pop()
      if (restored) {
        setRedoStack(newRedoStack)
        setPaths((prev) => [...prev, restored])
      }
    }
  }

  const handleClear = () => {
    setRedoStack([...redoStack, ...paths])
    setPaths([])
  }

  const handleSave = () => {
    setIsSaved(true)
    // In a real app, this would save to a backend
  }

  const handleSubmit = () => {
    // In a real app, this would submit the vectorization
    router.push("/dashboard")
  }

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
        {/* Back button and title */}
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon" className="shrink-0">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="font-serif text-xl font-bold md:text-2xl">
                {t("vectorizeArtifact")} #{id}
              </h1>
              <p className="text-sm text-muted-foreground">{t("traceOutlines")}</p>
            </div>
          </div>

          {/* Action buttons - responsive */}
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={handleUndo} disabled={paths.length === 0}>
              <Undo2 className="mr-1.5 h-4 w-4" />
              <span className="hidden sm:inline">{t("undo")}</span>
            </Button>
            <Button variant="outline" size="sm" onClick={handleRedo} disabled={redoStack.length === 0}>
              <Redo2 className="mr-1.5 h-4 w-4" />
              <span className="hidden sm:inline">{t("redo")}</span>
            </Button>
            <Button variant="outline" size="sm" onClick={handleClear} disabled={paths.length === 0}>
              <Trash2 className="mr-1.5 h-4 w-4" />
              <span className="hidden sm:inline">{t("clear")}</span>
            </Button>
          </div>
        </div>

        {/* Main content grid - responsive */}
        <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
          {/* Canvas area */}
          <div className="order-2 lg:order-1 flex flex-col gap-4">
            <VectorCanvas
              selectedColor={selectedColor}
              brushWidth={brushWidth}
              paths={paths}
              onAddPath={handleAddPath}
            />

            {/* Color palette - below canvas on mobile, inline on desktop */}
            <ColorPalette
              selectedColor={selectedColor}
              onColorSelect={setSelectedColor}
              brushWidth={brushWidth}
              onBrushWidthChange={setBrushWidth}
            />
          </div>

          {/* Sidebar - form and actions */}
          <div className="order-1 lg:order-2 flex flex-col gap-4">
            <ArtifactForm artifactId={id} />

            {/* Submit actions */}
            <div className="rounded-xl border bg-card p-4">
              <h3 className="mb-3 font-semibold">{t("submitWork")}</h3>
              <div className="flex flex-col gap-2">
                <Button variant="outline" className="w-full justify-start bg-transparent" onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" />
                  {t("saveDraft")}
                  {isSaved && <span className="ml-auto text-xs text-green-600">{t("saved")}</span>}
                </Button>
                <Button
                  className="w-full justify-start bg-catalan-red hover:bg-catalan-red-dark text-white"
                  onClick={handleSubmit}
                  disabled={paths.length === 0}
                >
                  <Send className="mr-2 h-4 w-4" />
                  {t("submitVectorization")}
                </Button>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                {t("earnXP")} <span className="font-semibold text-catalan-gold">+50 XP</span>{" "}
                {t("forEachVectorization")}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
