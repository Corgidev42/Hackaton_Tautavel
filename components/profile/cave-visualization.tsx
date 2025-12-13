"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mountain } from "lucide-react"
import { caveSlices, type CaveSlice } from "@/lib/cave-data"
import { cn } from "@/lib/utils"

interface CaveVisualizationProps {
  selectedSlice: CaveSlice | null
  onSelectSlice: (slice: CaveSlice) => void
}

export function CaveVisualization({ selectedSlice, onSelectSlice }: CaveVisualizationProps) {
  const [hoveredSlice, setHoveredSlice] = useState<string | null>(null)

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 font-serif text-xl">
          <Mountain className="h-5 w-5 text-catalan-red" />
          Cave Exploration
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Click on a stratum layer to explore artifacts found at that depth
        </p>
      </CardHeader>
      <CardContent className="p-0">
        {/* Fake 3D cave visualization with CSS transforms and parallax */}
        <div
          className="relative h-[500px] w-full overflow-hidden"
          style={{
            perspective: "1000px",
            background: "linear-gradient(180deg, #1a0f0a 0%, #2a1810 30%, #3d2317 70%, #4a2c1c 100%)",
          }}
        >
          {/* Cave ceiling texture overlay */}
          <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Title */}
          <div className="absolute top-4 left-0 right-0 text-center z-10">
            <h3 className="text-catalan-red font-serif text-2xl font-bold tracking-wide">Caune de l'Arago</h3>
            <p className="text-stone-400 text-sm mt-1">Stratigraphic Cross-Section</p>
          </div>

          {/* Cave layers container with 3D transform */}
          <div
            className="absolute inset-0 top-20 flex flex-col items-center justify-center gap-2 px-8"
            style={{
              transformStyle: "preserve-3d",
              transform: "rotateX(15deg)",
            }}
          >
            {caveSlices.map((slice, index) => {
              const completedCount = slice.artifacts.filter((a) => a.vectorized).length
              const totalCount = slice.artifacts.length
              const completionPercent = (completedCount / totalCount) * 100
              const isSelected = selectedSlice?.id === slice.id
              const isHovered = hoveredSlice === slice.id

              // Depth-based styling for parallax effect
              const depth = index * 15
              const scale = 1 - index * 0.03

              return (
                <button
                  key={slice.id}
                  onClick={() => onSelectSlice(slice)}
                  onMouseEnter={() => setHoveredSlice(slice.id)}
                  onMouseLeave={() => setHoveredSlice(null)}
                  className={cn(
                    "relative w-full max-w-xl h-16 rounded-lg transition-all duration-300 ease-out cursor-pointer group",
                    "border-2 shadow-lg",
                    isSelected
                      ? "border-catalan-red shadow-catalan-red/30 scale-105 z-10"
                      : isHovered
                        ? "border-catalan-gold shadow-catalan-gold/20 scale-102 z-5"
                        : "border-transparent",
                  )}
                  style={{
                    transform: `translateZ(${depth}px) scale(${isHovered || isSelected ? scale + 0.02 : scale})`,
                    backgroundColor: slice.color,
                    boxShadow: `
                      0 ${4 + index * 2}px ${8 + index * 4}px rgba(0,0,0,0.3),
                      inset 0 1px 0 rgba(255,255,255,0.1),
                      inset 0 -2px 0 rgba(0,0,0,0.2)
                    `,
                  }}
                >
                  {/* Rock texture overlay */}
                  <div
                    className="absolute inset-0 rounded-lg opacity-40 mix-blend-overlay pointer-events-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.65' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    }}
                  />

                  {/* Progress bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-black/30 rounded-b-lg overflow-hidden">
                    <div
                      className="h-full bg-catalan-gold transition-all duration-500"
                      style={{
                        width: `${completionPercent}%`,
                        boxShadow: "0 0 8px rgba(252, 221, 9, 0.5)",
                      }}
                    />
                  </div>

                  {/* Layer info */}
                  <div className="absolute inset-0 flex items-center justify-between px-4 text-white">
                    <div className="flex flex-col items-start">
                      <span
                        className={cn(
                          "font-bold text-sm transition-colors",
                          (isSelected || isHovered) && "text-catalan-gold",
                        )}
                      >
                        {slice.name}
                      </span>
                      <span className="text-xs text-white/70">{slice.period}</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-xs text-white/80 font-mono">{slice.depth}</span>
                      <span className="text-xs text-white/60">
                        {completedCount}/{totalCount} artifacts
                      </span>
                    </div>
                  </div>

                  {/* Hover glow effect */}
                  <div
                    className={cn(
                      "absolute inset-0 rounded-lg transition-opacity duration-300 pointer-events-none",
                      isHovered && !isSelected ? "opacity-100" : "opacity-0",
                    )}
                    style={{
                      background: "linear-gradient(90deg, transparent, rgba(252, 221, 9, 0.1), transparent)",
                    }}
                  />

                  {/* Selection indicator */}
                  {isSelected && (
                    <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-1 h-8 bg-catalan-red rounded-full animate-pulse" />
                  )}
                </button>
              )
            })}
          </div>

          {/* Depth indicator on the side */}
          <div className="absolute right-4 top-24 bottom-8 w-px bg-gradient-to-b from-transparent via-stone-600 to-transparent">
            <div className="absolute top-0 -left-6 text-xs text-stone-500">Surface</div>
            <div className="absolute bottom-0 -left-6 text-xs text-stone-500">-11m</div>
          </div>

          {/* Floating particles for atmosphere */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-catalan-gold/30 rounded-full animate-float"
                style={{
                  left: `${10 + Math.random() * 80}%`,
                  top: `${20 + Math.random() * 60}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: `${3 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 py-3 border-t bg-muted/30">
          <div className="flex items-center gap-2 text-xs">
            <div className="h-3 w-3 rounded bg-catalan-gold"></div>
            <span className="text-muted-foreground">Vectorization Progress</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="h-3 w-3 rounded bg-catalan-red"></div>
            <span className="text-muted-foreground">Selected Layer</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
