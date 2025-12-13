"use client"

import type React from "react"

import { useRef, useEffect, useState, useCallback } from "react"

interface Point {
  x: number
  y: number
}

interface Path {
  points: Point[]
  color: string
  width: number
}

interface VectorCanvasProps {
  selectedColor: string
  brushWidth: number
  paths: Path[]
  onAddPath: (path: Path) => void
}

export function VectorCanvas({ selectedColor, brushWidth, paths, onAddPath }: VectorCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [currentPath, setCurrentPath] = useState<Point[]>([])
  const [canvasSize, setCanvasSize] = useState({ width: 600, height: 500 })

  // Resize canvas to fit container
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const size = Math.min(rect.width, 600)
        setCanvasSize({ width: size, height: Math.min(size * 0.85, 500) })
      }
    }
    updateSize()
    window.addEventListener("resize", updateSize)
    return () => window.removeEventListener("resize", updateSize)
  }, [])

  // Draw all paths and current path
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.fillStyle = "#f5f5f0"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw placeholder artifact outline (faint)
    ctx.strokeStyle = "#d4d4c8"
    ctx.lineWidth = 1
    ctx.setLineDash([5, 5])
    ctx.beginPath()
    const cx = canvas.width / 2
    const cy = canvas.height / 2
    ctx.ellipse(cx, cy, canvas.width * 0.35, canvas.height * 0.4, 0, 0, Math.PI * 2)
    ctx.stroke()
    ctx.setLineDash([])

    // Draw guide text
    ctx.fillStyle = "#a3a39d"
    ctx.font = "14px sans-serif"
    ctx.textAlign = "center"
    ctx.fillText("Trace the artifact outline here", cx, cy - 20)
    ctx.fillText("(placeholder for artifact image)", cx, cy + 10)

    // Draw saved paths
    paths.forEach((path) => {
      if (path.points.length < 2) return
      ctx.beginPath()
      ctx.strokeStyle = path.color
      ctx.lineWidth = path.width
      ctx.lineCap = "round"
      ctx.lineJoin = "round"
      ctx.moveTo(path.points[0].x, path.points[0].y)
      path.points.forEach((point) => {
        ctx.lineTo(point.x, point.y)
      })
      ctx.stroke()
    })

    // Draw current path
    if (currentPath.length > 1) {
      ctx.beginPath()
      ctx.strokeStyle = selectedColor
      ctx.lineWidth = brushWidth
      ctx.lineCap = "round"
      ctx.lineJoin = "round"
      ctx.moveTo(currentPath[0].x, currentPath[0].y)
      currentPath.forEach((point) => {
        ctx.lineTo(point.x, point.y)
      })
      ctx.stroke()
    }
  }, [paths, currentPath, selectedColor, brushWidth, canvasSize])

  const getPosition = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }
    const rect = canvas.getBoundingClientRect()

    if ("touches" in e) {
      const touch = e.touches[0]
      return {
        x: (touch.clientX - rect.left) * (canvas.width / rect.width),
        y: (touch.clientY - rect.top) * (canvas.height / rect.height),
      }
    }
    return {
      x: (e.clientX - rect.left) * (canvas.width / rect.width),
      y: (e.clientY - rect.top) * (canvas.height / rect.height),
    }
  }, [])

  const startDrawing = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault()
      setIsDrawing(true)
      const pos = getPosition(e)
      setCurrentPath([pos])
    },
    [getPosition],
  )

  const draw = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (!isDrawing) return
      e.preventDefault()
      const pos = getPosition(e)
      setCurrentPath((prev) => [...prev, pos])
    },
    [isDrawing, getPosition],
  )

  const stopDrawing = useCallback(() => {
    if (isDrawing && currentPath.length > 1) {
      onAddPath({
        points: currentPath,
        color: selectedColor,
        width: brushWidth,
      })
    }
    setIsDrawing(false)
    setCurrentPath([])
  }, [isDrawing, currentPath, selectedColor, brushWidth, onAddPath])

  return (
    <div
      ref={containerRef}
      className="w-full rounded-xl border-2 border-dashed border-catalan-gold/30 bg-card p-2 md:p-4"
    >
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        className="w-full cursor-crosshair rounded-lg touch-none"
        style={{ aspectRatio: `${canvasSize.width}/${canvasSize.height}` }}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
      />
      <p className="mt-2 text-center text-xs text-muted-foreground">
        Click and drag (or touch) to draw. Use the color palette below.
      </p>
    </div>
  )
}
