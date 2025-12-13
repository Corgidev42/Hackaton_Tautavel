"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mountain } from "lucide-react"
import { caveSlices, type CaveSlice } from "@/lib/cave-data"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/i18n/language-context"

interface CaveVisualizationProps {
  selectedSlice: CaveSlice | null
  onSelectSlice: (slice: CaveSlice) => void
}

export function CaveVisualization({ selectedSlice, onSelectSlice }: CaveVisualizationProps) {
  const [hoveredSlice, setHoveredSlice] = useState<string | null>(null)
  const { t } = useLanguage()

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 font-serif text-lg md:text-xl">
          <Mountain className="h-4 w-4 text-catalan-red md:h-5 md:w-5" />
          {t("caveExploration")}
        </CardTitle>
        <p className="text-xs text-muted-foreground md:text-sm">{t("clickOnStratum")}</p>
      </CardHeader>
      <CardContent className="p-0">
        <div
          className="relative h-[350px] w-full overflow-hidden md:h-[500px]"
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
          <div className="absolute top-2 left-0 right-0 text-center z-10 md:top-4">
            <h3 className="text-catalan-red font-serif text-lg font-bold tracking-wide md:text-2xl">
              Caune de l&apos;Arago
            </h3>
            <p className="text-stone-400 text-[10px] mt-0.5 md:text-sm md:mt-1">{t("stratigraphicCrossSection")}</p>
          </div>

          {/* Cave layers container with 3D transform */}
          <div
            className="absolute inset-0 top-14 flex flex-col items-center justify-center gap-1.5 px-4 md:top-20 md:gap-2 md:px-8"
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

              const depth = index * 15
              const scale = 1 - index * 0.03

              return (
                <button
                  key={slice.id}
                  onClick={() => onSelectSlice(slice)}
                  onMouseEnter={() => setHoveredSlice(slice.id)}
                  onMouseLeave={() => setHoveredSlice(null)}
                  className={cn(
                    "relative w-full max-w-xl h-12 rounded-lg transition-all duration-300 ease-out cursor-pointer group md:h-16",
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
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30 rounded-b-lg overflow-hidden md:h-1.5">
                    <div
                      className="h-full bg-catalan-gold transition-all duration-500"
                      style={{
                        width: `${completionPercent}%`,
                        boxShadow: "0 0 8px rgba(252, 221, 9, 0.5)",
                      }}
                    />
                  </div>

                  {/* Layer info - simplified on mobile */}
                  <div className="absolute inset-0 flex items-center justify-between px-3 text-white md:px-4">
                    <div className="flex flex-col items-start">
                      <span
                        className={cn(
                          "font-bold text-xs transition-colors md:text-sm",
                          (isSelected || isHovered) && "text-catalan-gold",
                        )}
                      >
                        {slice.name}
                      </span>
                      <span className="text-[10px] text-white/70 md:text-xs">{slice.period}</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] text-white/80 font-mono md:text-xs">{slice.depth}</span>
                      <span className="text-[10px] text-white/60 hidden sm:block">
                        {completedCount}/{totalCount}
                      </span>
                    </div>
                  </div>

                  {/* Selection indicator */}
                  {isSelected && (
                    <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-catalan-red rounded-full animate-pulse md:-right-2 md:w-1 md:h-8" />
                  )}
                </button>
              )
            })}
          </div>

          {/* Depth indicator - hidden on mobile */}
          <div className="absolute right-2 top-16 bottom-4 w-px bg-gradient-to-b from-transparent via-stone-600 to-transparent hidden md:block md:right-4 md:top-24 md:bottom-8">
            <div className="absolute top-0 -left-6 text-xs text-stone-500">{t("surface")}</div>
            <div className="absolute bottom-0 -left-6 text-xs text-stone-500">-11m</div>
          </div>

          {/* Floating particles - fewer on mobile */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(6)].map((_, i) => (
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

        {/* Legend - simplified on mobile */}
        <div className="flex items-center justify-center gap-4 py-2 border-t bg-muted/30 md:gap-6 md:py-3">
          <div className="flex items-center gap-1.5 text-[10px] md:gap-2 md:text-xs">
            <div className="h-2 w-2 rounded bg-catalan-gold md:h-3 md:w-3"></div>
            <span className="text-muted-foreground">{t("progress")}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] md:gap-2 md:text-xs">
            <div className="h-2 w-2 rounded bg-catalan-red md:h-3 md:w-3"></div>
            <span className="text-muted-foreground">{t("selected")}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
