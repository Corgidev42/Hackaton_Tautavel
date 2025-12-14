"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter, useParams } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Trash2, Save, Send } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/i18n/language-context"

interface User {
  email: string
  name: string
}

interface CSVRow {
  zone: string
  couche: string
  numero: string
  x: number
  y: number
  largeur: number
  longueur: number
}

interface Point {
  x: number
  y: number
}

export default function VectorizePage() {
  const params = useParams()
  const id = params.id as string
  const router = useRouter()
  const { t } = useLanguage()

  // User
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // CSV & Selection
  const [csvData, setCSVData] = useState<CSVRow[]>([])
  const [zoneInput, setZoneInput] = useState("")
  const [coucheInput, setCoucheInput] = useState("")
  const [numeroInput, setNumeroInput] = useState("")
  const [filteredRows, setFilteredRows] = useState<CSVRow[]>([])
  const [selectedRow, setSelectedRow] = useState<CSVRow | null>(null)

  // Image & Canvas
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const [imageLoaded, setImageLoaded] = useState(false)

  // Vectorization
  const [vectoredPoints, setVectoredPoints] = useState<Point[]>([])
  const [isSaved, setIsSaved] = useState(false)

  // Load CSV on mount
  useEffect(() => {
    const loadCSV = async () => {
		const parseCSVLine = (line: string): string[] => {
			const regex = /("([^"]+)"|[^,]+)(?=,|$)/g
			const matches = []
			let match
			while ((match = regex.exec(line)) !== null) {
				let value = match[1]
				// Supprimer les guillemets si présents
				if (value.startsWith('"') && value.endsWith('"')) {
				value = value.slice(1, -1)
				}
				matches.push(value)
			}
			return matches
		}
		const convertNumber = (str: string) => {
			if (!str) return 0
			// Remplacer la virgule décimale par un point
			return parseFloat(str.replace(",", "."))
		}
      try {
        const response = await fetch("/vectorization/bdd.csv")
        const text = await response.text()
        const lines = text.trim().split("\n")
        const headers = lines[0].split(",")
		const rows: CSVRow[] = lines.slice(1).map((line, index) => {
			const values = parseCSVLine(line)

			const row: CSVRow = {
				zone: values[0]?.trim() || "",
				numero: values[1]?.trim() || "",
				couche: values[2]?.trim() || "",
				x: convertNumber(values[3]),
				y: convertNumber(values[4]),
				longueur: convertNumber(values[11]),
				largeur: convertNumber(values[12]),
			}

			console.log(`Row ${index + 1}:`, row)
			return row
		})

        setCSVData(rows)
      } catch (error) {
        console.error("Error loading CSV:", error)
      }
    }

    const storedUser = sessionStorage.getItem("tautavel-user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    } else {
      router.push("/")
    }

    loadCSV()
    setIsLoading(false)
  }, [router])

  // Filter CSV rows in real time (exact matches)
  useEffect(() => {
    const filtered = csvData.filter(
      (row) =>
        (zoneInput === "" || row.zone.includes(zoneInput)) &&
        (coucheInput === "" || row.couche.includes(coucheInput)) &&
        (numeroInput === "" || row.numero.includes(numeroInput))
    )
    setFilteredRows(filtered)
  }, [zoneInput, coucheInput, numeroInput, csvData])

  // Determine if we should show selection
  const shouldShowSelection =
    filteredRows.length === 1 || (zoneInput !== "" && coucheInput !== "" && numeroInput !== "")

  // Handle row selection - immediately switch to vectorization image
  const handleSelectRow = (row: CSVRow) => {
    setSelectedRow(row)
    setZoneInput(row.zone)
    setCoucheInput(row.couche)
    setNumeroInput(row.numero)
    setVectoredPoints([])
    setImageLoaded(false)
  }



  // Image load handler - set canvas size to match image
  const handleImageLoad = () => {
    if (!imageRef.current || !canvasRef.current) return
    
    const image = imageRef.current
    const canvas = canvasRef.current
    
    // Set canvas internal resolution to match image dimensions
    canvas.width = image.naturalWidth
    canvas.height = image.naturalHeight
    
    setImageLoaded(true)
  }

  // Handle vectorization clicks - simple point addition
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !selectedRow) return

    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    
    // Get canvas coordinates accounting for display size
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    
    const clickX = (e.clientX - rect.left) * scaleX
    const clickY = (e.clientY - rect.top) * scaleY

    // Canvas coordinates = vector coordinates (no transformations)
    setVectoredPoints((prev) => [...prev, { x: clickX, y: clickY }])
  }

  // Draw canvas - simple image and points
  useEffect(() => {
    const canvas = canvasRef.current
    const image = imageRef.current
    if (!canvas || !image || !imageLoaded) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.fillStyle = "#f5f5f5"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw image - no transformations
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height)

    // Draw vectorized points
    if (vectoredPoints.length > 0) {
      vectoredPoints.forEach((point, idx) => {
        // Draw point (smaller, fixed size)
        ctx.fillStyle = "#0066FF"
        ctx.beginPath()
        ctx.arc(point.x, point.y, 3, 0, Math.PI * 2)
        ctx.fill()

        // Draw line to previous point (thinner)
        if (idx > 0) {
          const prevPoint = vectoredPoints[idx - 1]
          ctx.strokeStyle = "#0066FF"
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(prevPoint.x, prevPoint.y)
          ctx.lineTo(point.x, point.y)
          ctx.stroke()
        }
      })
    }
  }, [imageLoaded, vectoredPoints])

  const handleReset = () => {
    setSelectedRow(null)
    setZoneInput("")
    setCoucheInput("")
    setNumeroInput("")
    setVectoredPoints([])
    setImageLoaded(false)
  }

  const handleValidate = () => {
    if (!selectedRow || vectoredPoints.length === 0) return
    
    // Store the vectorized data
    const vectorizationResult = {
      csvRow: selectedRow,
      points: vectoredPoints,
      timestamp: new Date().toISOString()
    }
    
    console.log("Vectorization completed:", vectorizationResult)
    
    // Save to session storage or local storage
    sessionStorage.setItem("lastVectorization", JSON.stringify(vectorizationResult))
    
    setIsSaved(true)
    setTimeout(() => {
      setIsSaved(false)
      router.push("/dashboard")
    }, 1500)
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
    <div className="h-screen flex flex-col bg-background">
      <DashboardHeader user={user} />
      <main className="flex-1 overflow-hidden">
        <div className="container mx-auto px-6 py-4 h-full flex flex-col">
          {/* Header */}
          <div className="mb-4">
            <div className="flex items-center gap-3 mb-2">
              <Link href="/dashboard">
                <Button variant="ghost" size="icon" className="shrink-0">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="font-serif text-2xl font-bold">Vectorisation d'une forme – Démonstration</h1>
                <p className="text-sm text-muted-foreground">Sélectionnez un objet puis tracez sa forme directement sur l'image.</p>
              </div>
            </div>
          </div>

        <div className="grid gap-4 lg:grid-cols-2 flex-1 overflow-hidden">
          {/* Left Column - Selection */}
          <div className="flex flex-col gap-4 overflow-y-auto">
            {/* Step 1 - Selection */}
            <div className={`rounded-lg border bg-card p-5 transition-all ${!selectedRow ? 'ring-2 ring-catalan-red/50' : 'opacity-75'}`}>
              <h2 className="mb-1 font-serif text-xl font-bold text-catalan-red">Étape 1 – Identifier l'objet</h2>
              <p className="mb-4 text-sm text-muted-foreground">
                Renseignez les informations visibles sur le plan pour retrouver l'objet correspondant.
              </p>
              <div className="grid gap-3 grid-cols-3">
                <div>
                  <label className="text-xs font-medium mb-1 block">Zone</label>
                  <Input
                    placeholder="Ex: G7"
                    value={zoneInput}
                    onChange={(e) => setZoneInput(e.target.value.toUpperCase())}
                    disabled={selectedRow !== null}
                    className="h-9"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium mb-1 block">Couche</label>
                  <Input
                    placeholder="Ex: R3"
                    value={coucheInput}
                    onChange={(e) => setCoucheInput(e.target.value)}
                    disabled={selectedRow !== null}
                    className="h-9"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium mb-1 block">Numéro</label>
                  <Input
                    placeholder="Ex: 1"
                    value={numeroInput}
                    onChange={(e) => setNumeroInput(e.target.value)}
                    disabled={selectedRow !== null}
                    className="h-9"
                  />
                </div>
              </div>

              <div className="mt-4 text-sm">
                <p className="text-muted-foreground font-medium">
                  {filteredRows.length === 0 ? "Aucun résultat" : `${filteredRows.length} objet(s) trouvé(s)`}
                </p>
                {shouldShowSelection && filteredRows.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {filteredRows.map((row, idx) => (
                      <Button
                        key={idx}
                        variant={selectedRow?.numero === row.numero ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleSelectRow(row)}
                        className="text-xs h-8"
                      >
                        {row.zone}-{row.couche}-{row.numero}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
              
              {selectedRow && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-xs font-medium text-green-600 mb-2">✓ Objet sélectionné</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div><span className="text-muted-foreground">Zone:</span> <span className="font-medium">{selectedRow.zone}</span></div>
                    <div><span className="text-muted-foreground">Couche:</span> <span className="font-medium">{selectedRow.couche}</span></div>
                    <div><span className="text-muted-foreground">Numéro:</span> <span className="font-medium">{selectedRow.numero}</span></div>
                  </div>
                </div>
              )}
            </div>

            {/* Step 2 - Vectorization */}
            <div className={`rounded-lg border bg-card p-5 transition-all ${selectedRow ? 'ring-2 ring-catalan-red/50' : 'opacity-50'}`}>
              <h2 className="mb-1 font-serif text-xl font-bold text-catalan-red">Étape 2 – Tracer la forme</h2>
              <p className="mb-4 text-sm text-muted-foreground">
                Cliquez sur l'image pour tracer les contours de la forme.<br />
                Les points sont reliés automatiquement.
              </p>
              
              {selectedRow && (
                <div className="flex gap-2">
                  <Button
                    onClick={() => setVectoredPoints([])}
                    variant="outline"
                    size="sm"
                    disabled={vectoredPoints.length === 0}
                    className="h-9"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Effacer
                  </Button>
                  <Button
                    onClick={handleValidate}
                    className="flex-1 bg-catalan-red hover:bg-catalan-red-dark text-white h-9"
                    disabled={vectoredPoints.length < 3}
                  >
                    {isSaved ? "✓ Enregistré !" : "Valider la vectorisation"}
                  </Button>
                </div>
              )}
              
              {vectoredPoints.length > 0 && (
                <div className="mt-3 pt-3 border-t text-xs">
                  <span className="text-muted-foreground">Points tracés:</span> <span className="font-medium text-catalan-red">{vectoredPoints.length}</span>
                  {vectoredPoints.length < 3 && <span className="ml-2 text-amber-600">(minimum 3 requis)</span>}
                  {vectoredPoints.length >= 3 && <span className="ml-2 text-green-600">✓ Prêt à valider</span>}
                </div>
              )}
            </div>

            {/* Help Box */}
            <div className="rounded-lg border border-blue-200 bg-blue-50/50 p-4">
              <h3 className="font-semibold mb-2 text-sm flex items-center gap-2">
                <span className="text-blue-600">ℹ️</span>
                Consignes
              </h3>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li>• Cliquez point par point pour suivre le contour</li>
                <li>• Travaillez dans le sens horaire ou anti-horaire</li>
                <li>• Aucun zoom ou déplacement nécessaire</li>
                <li>• Ce prototype simule un comportement final</li>
              </ul>
            </div>
            
            {selectedRow && (
              <Button
                onClick={handleReset}
                variant="outline"
                size="sm"
                className="w-full"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Recommencer
              </Button>
            )}
          </div>

          {/* Right Column - Canvas */}
          <div className="flex flex-col gap-3 overflow-hidden">
            <div className="relative flex-1 rounded-lg border bg-gray-50 overflow-hidden flex items-center justify-center">
              <canvas
                ref={canvasRef}
                onClick={handleCanvasClick}
                className="block max-w-full max-h-full cursor-crosshair"
                style={{ width: 'auto', height: 'auto' }}
              />
              <img
                ref={imageRef}
                key={selectedRow ? "2step" : "file"}
                src={selectedRow ? "/vectorization/2step.png" : "/vectorization/file.jpeg"}
                alt="Image de vectorisation"
                onLoad={handleImageLoad}
                style={{ display: "none" }}
              />
              {selectedRow && (
                <div className="absolute bottom-3 left-3 rounded bg-black/75 px-3 py-1.5 text-xs text-white shadow-lg">
                  <span className="font-medium">{vectoredPoints.length}</span> point(s) • Cliquez pour ajouter
                </div>
              )}
              {!selectedRow && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/5 backdrop-blur-[1px]">
                  <div className="bg-white/90 px-6 py-4 rounded-lg shadow-lg text-center">
                    <p className="text-sm font-medium text-muted-foreground">
                      Sélectionnez d'abord un objet à gauche
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        </div>
      </main>
    </div>
  )
}
