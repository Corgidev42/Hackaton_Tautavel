"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter, useParams } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Trash2, X } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/i18n/language-context"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"

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

  // Modal & 3D Scene
  const [showModal, setShowModal] = useState(false)
  const modalContainerRef = useRef<HTMLDivElement>(null)
  const threeContainerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<{ scene?: THREE.Scene; camera?: THREE.PerspectiveCamera; renderer?: THREE.WebGLRenderer; controls?: OrbitControls; animationId?: number }>({})
  const [modalLoaded, setModalLoaded] = useState(false)
  const [xpPercent, setXpPercent] = useState(0)
  const [achievements, setAchievements] = useState(
    [
      { label: "Première vectorisation", unlocked: false },
      { label: "Contour fermé", unlocked: false },
      { label: "+50 XP", unlocked: false },
    ]
  )

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

  // Initialize Three.js scene in modal
  const initializeThreeScene = () => {
    if (!threeContainerRef.current || sceneRef.current.scene) return

    const container = threeContainerRef.current
    const width = container.clientWidth
    const height = container.clientHeight

    // Scene setup - follow feature.txt definitions
    const BLOCK_SIZE = { width: 250, height: 60, depth: 250 }
    const BLOCK_COLOR = 0x6699ff
    const EXTRUDE_COLOR = 0xff6644
    const JAUNE_OS_COLOR = 0xffff66
    const VERT_SILEX_COLOR = 0x228844
    const VIOLET_ECLAT_COLOR = 0x9933cc
    const JAUNE_TERREUX_COLOR = 0x8C8C55
    const SCENE_BG_COLOR = 0x111111

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(SCENE_BG_COLOR)

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000)
    camera.position.set(400, 400, 400)

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio)
    container.appendChild(renderer.domElement)

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.4))
    const dirLight = new THREE.DirectionalLight(0xffffff, 1)
    dirLight.position.set(200, 300, 200)
    scene.add(dirLight)

    // Axes helper
    scene.add(new THREE.AxesHelper(100))

    // Block wireframe
    const blockGeo = new THREE.BoxGeometry(BLOCK_SIZE.width, BLOCK_SIZE.height, BLOCK_SIZE.depth)
    const threshold = 1
    const edgesGeo = new THREE.EdgesGeometry(blockGeo, threshold)
    const edgesMat = new THREE.LineBasicMaterial({ color: BLOCK_COLOR })
    const blockMesh = new THREE.LineSegments(edgesGeo, edgesMat)
    scene.add(blockMesh)

    // Helper function to create extruded shapes
    const createExtrudedShape = (
      points2D: Array<{ x: number; y: number }>,
      extrusionDepth: number = BLOCK_SIZE.height,
      rotationAxis: string = 'Y',
      rotationAngle: number = 0,
      rotationAxis2: string | null = null,
      rotationAngle2: number = 0,
      color: number = EXTRUDE_COLOR
    ) => {
      const shape = new THREE.Shape()
      points2D.forEach((p, i) => (i === 0 ? shape.moveTo(p.x, p.y) : shape.lineTo(p.x, p.y)))
      shape.closePath()

      const extrudeGeo = new THREE.ExtrudeGeometry(shape, {
        depth: extrusionDepth,
        bevelEnabled: false
      })

      // Center geometry
      extrudeGeo.computeBoundingBox()
      const bbox = extrudeGeo.boundingBox!
      const centerX = (bbox.max.x + bbox.min.x) / 2
      const centerY = (bbox.max.y + bbox.min.y) / 2
      const extrudeHalfDepth = extrusionDepth / 2

      extrudeGeo.translate(-centerX, -centerY, -extrudeHalfDepth)

      // Initial rotation
      if (rotationAxis === 'Y') {
        extrudeGeo.rotateX(Math.PI / 2)
      } else if (rotationAxis === 'X') {
        extrudeGeo.rotateY(-Math.PI / 2)
      }

      // Apply rotations
      const applyRotation = (geometry: THREE.ExtrudeGeometry, axis: string, angle: number) => {
        if (axis === 'Y') {
          geometry.rotateY(angle)
        } else if (axis === 'X') {
          geometry.rotateX(angle)
        } else if (axis === 'Z') {
          geometry.rotateZ(angle)
        }
      }

      if (rotationAngle !== 0) {
        applyRotation(extrudeGeo, rotationAxis, rotationAngle)
      }

      if (rotationAxis2 && rotationAngle2 !== 0) {
        applyRotation(extrudeGeo, rotationAxis2, rotationAngle2)
      }

      // Material and mesh
      const extrudeMat = new THREE.MeshStandardMaterial({ color: color })
      const extrudeMesh = new THREE.Mesh(extrudeGeo, extrudeMat)
      extrudeMesh.position.set(0, 0, 0)

      scene.add(extrudeMesh)
      return extrudeMesh
    }

    // 1. jaune os
    const shapeDefinition = [
      { x: 1.0, y: 1.0 },
      { x: 8.0, y: 2.0 },
      { x: 7.0, y: 7.0 },
      { x: 2.0, y: 6.0 }
    ]

    const angle45 = (12 * Math.PI) / 6
    const angle30 = (67 * Math.PI) / 12

    const extrudedShapeDoubleRot = createExtrudedShape(
      shapeDefinition,
      BLOCK_SIZE.height,
      'Z',
      angle45,
      'X',
      angle30,
      JAUNE_OS_COLOR
    )

    if (extrudedShapeDoubleRot) {
      extrudedShapeDoubleRot.position.set(-30, 13, 30)
    }

    // 2. jaune ossement (Lame large)
    const bladeDefinitionLarge = [
      { x: -1.5, y: -1.3 },
      { x: 7.6, y: -1.4 },
      { x: 1.1, y: 1.3 },
      { x: -1.2, y: 4.5 },
      { x: -2.0, y: 1.8 },
      { x: 1.7, y: -1.38 },
      { x: 2.1, y: 1.4 },
      { x: -1.2, y: 1.1 }
    ]

    const angleX_15 = (17 * Math.PI) / 4
    const angleY_90 = (19 * Math.PI) / 12

    const largeThickBlade = createExtrudedShape(
      bladeDefinitionLarge,
      5,
      'Y',
      angleX_15,
      'X',
      angleY_90,
      JAUNE_TERREUX_COLOR
    )

    if (largeThickBlade) {
      largeThickBlade.position.set(60, -20, 60)
    }

    // 3. petit silex couleur verte
    const shapeDefinition2 = [
      { x: 1, y: 5 },
      { x: 10, y: 6 },
      { x: 8, y: -8 },
      { x: 4, y: -5 },
      { x: -7, y: -5 },
      { x: -5, y: -7 },
      { x: -15, y: 4 },
      { x: -8, y: 10 }
    ]

    const angle45_rad = (2 * Math.PI) / 3
    const angle30_rad = Math.PI / 6

    const originalShapeRotated = createExtrudedShape(
      shapeDefinition2,
      3,
      'Y',
      angle45_rad,
      'X',
      angle30_rad,
      VERT_SILEX_COLOR
    )

    if (originalShapeRotated) {
      originalShapeRotated.position.set(-60, 30, -60)
    }

    // 4. petit eclat couleur violet (Shape 3)
    const shapeDefinition3 = [
      { x: 1.1, y: 1.5 },
      { x: 3.1, y: 4.6 },
      { x: 1.8, y: -2.8 },
      { x: 2.4, y: -2.5 },
      { x: -2.7, y: -2.5 },
      { x: -2.5, y: -2.7 }
    ]

    const angle45_radI = (2 * Math.PI) / 3
    const angle30_radI = Math.PI / 6

    const originalShapeRotated3 = createExtrudedShape(
      shapeDefinition3,
      3,
      'Y',
      angle45_radI,
      'X',
      angle30_radI,
      VIOLET_ECLAT_COLOR
    )

    if (originalShapeRotated3) {
      originalShapeRotated3.position.set(-90, -30, -90)
    }

    // 5. petit eclat couleur violet (Shape 4)
    const shapeDefinition4 = [
      { x: 2.1, y: 2.5 },
      { x: 1.1, y: 1.6 },
      { x: 3.8, y: -3.8 },
      { x: 1.4, y: -1.5 },
      { x: -2.5, y: -2.7 },
      { x: -2.7, y: -2.5 }
    ]

    const angle45_radI4 = (2 * Math.PI) / 3
    const angle30_radI4 = Math.PI / 6

    const originalShapeRotated4 = createExtrudedShape(
      shapeDefinition4,
      2,
      'Y',
      angle45_radI4,
      'X',
      angle30_radI4,
      VIOLET_ECLAT_COLOR
    )

    if (originalShapeRotated4) {
      originalShapeRotated4.position.set(-40, 0, -70)
    }

    // 6. petit eclat couleur violet (Shape 5)
    const shapeDefinition5 = [
      { x: 1.2, y: 2.0 },
      { x: 2.1, y: 1.5 },
      { x: 3.6, y: -3.4 },
      { x: 3.1, y: -3.3 },
      { x: -2.3, y: -2.8 },
      { x: -1.1, y: -3.8 }
    ]

    const angle45_radI5 = (2 * Math.PI) / 3
    const angle30_radI5 = (19 * Math.PI) / 6

    const originalShapeRotated5 = createExtrudedShape(
      shapeDefinition5,
      2,
      'Y',
      angle45_radI5,
      'X',
      angle30_radI5,
      VIOLET_ECLAT_COLOR
    )

    if (originalShapeRotated5) {
      originalShapeRotated5.position.set(-40, 0, 70)
    }

    // 7. large shape
    const shapeDefinition8 = [
      { x: 17.5, y: 14.0 },
      { x: 0.0, y: 24.5 },
      { x: -17.5, y: 14.0 },
      { x: -21.0, y: 0.0 },
      { x: -7.0, y: -17.5 },
      { x: 7.0, y: -17.5 },
      { x: 21.0, y: 0.0 }
    ]

    const angle45_radI8 = (9 * Math.PI) / 3
    const angle30_radI8 = (19 * Math.PI) / 6

    const originalShapeRotated8 = createExtrudedShape(
      shapeDefinition8,
      10,
      'Y',
      angle45_radI8,
      'X',
      angle30_radI8,
      EXTRUDE_COLOR
    )

    if (originalShapeRotated8) {
      originalShapeRotated8.position.set(8, 0, -25)
      originalShapeRotated8.visible = false

      // Show after delay
      setTimeout(() => {
        originalShapeRotated8.visible = true
      }, 800)
    }

    // Animation loop
    const animate = () => {
      const id = requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
      sceneRef.current.animationId = id
    }
    animate()

    // Handle resize
    const handleResize = () => {
      const newWidth = container.clientWidth
      const newHeight = container.clientHeight
      camera.aspect = newWidth / newHeight
      camera.updateProjectionMatrix()
      renderer.setSize(newWidth, newHeight)
    }
    window.addEventListener('resize', handleResize)

    // Store references
    sceneRef.current = { scene, camera, renderer, controls, animationId: undefined }
  }

  // Clean up Three.js scene
  const cleanupThreeScene = () => {
    const { scene, renderer, animationId } = sceneRef.current
    
    if (animationId) {
      cancelAnimationFrame(animationId)
    }
    
    if (renderer && renderer.domElement.parentNode) {
      renderer.domElement.parentNode.removeChild(renderer.domElement)
    }
    
    if (scene) {
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose()
          object.material.dispose()
        }
      })
    }
    
    if (renderer) {
      renderer.dispose()
    }
    
    sceneRef.current = {}
  }

  // Handle modal open
  useEffect(() => {
    if (showModal && !modalLoaded) {
      setTimeout(() => {
        initializeThreeScene()
        setModalLoaded(true)
      }, 100)
    }
  }, [showModal, modalLoaded, vectoredPoints, selectedRow])

  // Gamification animations on modal open/close
  useEffect(() => {
    if (showModal) {
      setXpPercent(0)
      // Animate XP bar
      const xpTimer = setTimeout(() => setXpPercent(80), 300)
      // Unlock achievements progressively
      const achTimer = setTimeout(() => {
        setAchievements((prev) => prev.map((item) => ({ ...item, unlocked: true })))
      }, 600)
      return () => {
        clearTimeout(xpTimer)
        clearTimeout(achTimer)
      }
    } else {
      setXpPercent(0)
      setAchievements((prev) => prev.map((item) => ({ ...item, unlocked: false })))
    }
  }, [showModal])

  // Handle modal close
  const handleCloseModal = () => {
    cleanupThreeScene()
    setShowModal(false)
    setModalLoaded(false)
    // Redirect to dashboard
    setTimeout(() => {
      router.push("/dashboard")
    }, 300)
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
    
    // Save to session storage
    sessionStorage.setItem("lastVectorization", JSON.stringify(vectorizationResult))
    
    setIsSaved(true)
    
    // Open modal instead of immediate redirect
    setTimeout(() => {
      setShowModal(true)
    }, 500)
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

      {/* Modal Popup */}
      {showModal && (
        <div
          ref={modalContainerRef}
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm animate-fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              handleCloseModal()
            }
          }}
        >
          <div className="relative w-11/12 h-5/6 max-w-6xl rounded-lg bg-white shadow-2xl overflow-hidden animate-fade-in">
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 z-10 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Fermer"
            >
              <X className="h-6 w-6 text-gray-600 hover:text-gray-900" />
            </button>

            {/* Header */}
            <div className="bg-gradient-to-r from-catalan-red to-catalan-red/80 text-white p-6 pb-4">
              <h2 className="text-2xl font-serif font-bold">Résultat de la vectorisation</h2>
              <p className="text-white/90 text-sm mt-1">Votre forme vectorisée en 3D dans la couche</p>
            </div>

            {/* Split Content */}
            <div className="flex h-[calc(100%-128px)]">
              {/* Left Panel: Gamification & Info */}
              <div className="w-[38%] min-w-[280px] border-r bg-white flex flex-col">
                <div className="p-6 space-y-5 overflow-y-auto">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Progression</h3>
                    <div className="mt-2 text-sm text-gray-600 flex items-center justify-between">
                      <span>Niveau 1</span>
                      <span className="font-semibold text-catalan-red">{xpPercent}%</span>
                    </div>
                    <div className="mt-2 h-2 w-full rounded bg-gray-200 overflow-hidden">
                      <div
                        className="h-2 bg-catalan-red rounded transition-all duration-700"
                        style={{ width: `${xpPercent}%` }}
                      />
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">+50 XP pour cette vectorisation</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Succès débloqués</h3>
                    <ul className="mt-2 space-y-2">
                      {achievements.map((a, idx) => (
                        <li
                          key={idx}
                          className={`flex items-center justify-between rounded-lg border px-3 py-2 text-sm ${a.unlocked ? 'border-green-200 bg-green-50 animate-pop-in' : 'border-gray-200 bg-gray-50'}`}
                        >
                          <span className="text-gray-700">{a.label}</span>
                          <span className={`text-xs font-semibold ${a.unlocked ? 'text-green-700' : 'text-gray-500'}`}>{a.unlocked ? '✓' : '...'}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Métadonnées</h3>
                    <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                      <div className="text-gray-600">Zone</div>
                      <div className="font-medium">{selectedRow?.zone ?? '-'}</div>
                      <div className="text-gray-600">Couche</div>
                      <div className="font-medium">{selectedRow?.couche ?? '-'}</div>
                      <div className="text-gray-600">Numéro</div>
                      <div className="font-medium">{selectedRow?.numero ?? '-'}</div>
                      <div className="text-gray-600">Points</div>
                      <div className="font-medium">{vectoredPoints.length}</div>
                      <div className="text-gray-600">Date</div>
                      <div className="font-medium">{new Date().toLocaleDateString('fr-FR')}</div>
                    </div>
                  </div>
                </div>

                {/* Footer Left */}
                <div className="mt-auto px-6 py-4 border-t bg-gray-50">
                  <p className="text-xs text-gray-600">Merci pour votre contribution ✨</p>
                </div>
              </div>

              {/* Right Panel: Three.js */}
              <div className="flex-1 bg-gray-900">
                <div
                  ref={threeContainerRef}
                  className="w-full h-full relative"
                  style={{ minHeight: "400px" }}
                />
              </div>
            </div>

            {/* Footer removed */}
          </div>
        </div>
      )}

      {/* Animation styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes popIn {
          0% { transform: scale(0.95); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-pop-in {
          animation: popIn 0.4s ease-out;
        }
      `}</style>
    </div>
  )
}
