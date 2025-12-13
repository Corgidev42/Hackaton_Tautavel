"use client"

import { cn } from "@/lib/utils"
import { Check, Clock, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"
import { Discovery } from "@/lib/discovery-types"
import Image from "next/image"

interface DashboardArtifactCardProps {
  id: number
  status: "completed" | "in-progress" | "not-started"
  title: string
  category: string
  image: string
  progress?: number
  contributor?: string
  completedBy?: string
  date?: string
  discoveries?: Discovery[]
}

export function DashboardArtifactCard({
  id,
  status,
  title,
  category,
  progress,
  contributor,
  completedBy,
  date,
  discoveries = [],
}: DashboardArtifactCardProps) {
  const CardWrapper = status === "not-started" ? Link : "div"
  const cardProps = status === "not-started" ? { href: `/vectorize/${id}` } : {}
  const [isHovering, setIsHovering] = useState(false)

  // Filter out only discovered items for display
  const displayedDiscoveries = discoveries.map(d => ({
    ...d,
    imagePath: d.discovered ? d.imagePath : "/addons/placeholder.svg"
  }))

  return (
    <CardWrapper
      {...cardProps}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={cn(
        "group relative aspect-square cursor-pointer overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-xl block",
        status === "completed" && "border-catalan-red/40 bg-catalan-red/5",
        status === "in-progress" && "border-catalan-gold/40 bg-catalan-gold/5",
        status === "not-started" && "border-border bg-background hover:border-catalan-red/50",
      )}
    >
      {/* Discovery images display with infinite sliding animation */}
      {displayedDiscoveries.length > 0 && (
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden p-4">
          <style dangerouslySetInnerHTML={{
            __html: `
              @keyframes scroll-carousel-${id} {
                0% {
                  transform: translateX(0);
                }
                100% {
                  transform: translateX(-50%);
                }
              }
              .carousel-scroll-${id} {
                animation: ${isHovering ? `scroll-carousel-${id} ${displayedDiscoveries.length * 0.5}s linear infinite` : 'none'};
              }
            `
          }} />
          <div className="relative h-24 w-24 md:h-32 md:w-32 overflow-hidden">
            <div className={`carousel-scroll-${id} flex h-full`}>
              {/* Original images */}
              {displayedDiscoveries.map((discovery) => (
                <div
                  key={discovery.id}
                  className="relative h-full w-24 flex-shrink-0 md:w-32"
                >
                  <img
                    src={discovery.imagePath}
                    alt={`Discovery ${discovery.category}`}
                    className="h-full w-full object-contain"
                  />
                </div>
              ))}
              {/* Duplicated images for seamless loop */}
              {displayedDiscoveries.map((discovery) => (
                <div
                  key={`${discovery.id}-dup`}
                  className="relative h-full w-24 flex-shrink-0 md:w-32"
                >
                  <img
                    src={discovery.imagePath}
                    alt={`Discovery ${discovery.category}`}
                    className="h-full w-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Background pattern (fallback if no discoveries) */}
      {displayedDiscoveries.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center opacity-30">
          <svg className="h-3/4 w-3/4" viewBox="0 0 100 100">
            <defs>
              <pattern id={`artifact-pattern-${id}`} patternUnits="userSpaceOnUse" width="8" height="8">
                <circle cx="4" cy="4" r="1" fill="currentColor" opacity="0.5" />
              </pattern>
            </defs>
            <ellipse
              cx="50"
              cy="50"
              rx="40"
              ry="35"
              fill={`url(#artifact-pattern-${id})`}
              stroke="currentColor"
              strokeWidth="1"
            />
            <path
              d="M 30 40 Q 50 30 70 40 Q 60 60 50 65 Q 40 60 30 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            />
          </svg>
        </div>
      )}

      {/* Status indicator */}
      <div
        className={cn(
          "absolute left-2 top-2 flex h-6 w-6 items-center justify-center rounded-full shadow-sm md:left-3 md:top-3 md:h-7 md:w-7",
          status === "completed" && "bg-catalan-red text-white",
          status === "in-progress" && "bg-catalan-gold text-white",
          status === "not-started" && "border-2 border-border bg-background",
        )}
      >
        {status === "completed" && <Check className="h-3 w-3 md:h-4 md:w-4" />}
        {status === "in-progress" && <Clock className="h-3 w-3 md:h-4 md:w-4" />}
      </div>

      {/* Progress bar for in-progress */}
      {status === "in-progress" && progress !== undefined && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-catalan-gold/30 md:h-1.5">
          <div className="h-full bg-catalan-gold transition-all duration-500" style={{ width: `${progress}%` }}></div>
        </div>
      )}

      {/* Title in top right */}
      <div className="absolute right-2 top-2 max-w-[60%] rounded-md bg-background/40 px-2 py-1 backdrop-blur-sm md:right-3 md:top-3">
        <div className="truncate text-xs font-semibold md:text-sm">{title}</div>
      </div>

      {/* Bottom info: last contributor and date */}
      {((status === "completed" && completedBy) || (status === "in-progress" && contributor)) && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-center md:bottom-3">
          <div className="rounded-md bg-background/40 px-2 py-1 backdrop-blur-sm">
            {status === "completed" && completedBy && (
              <>
                <div className="text-[10px] font-medium md:text-xs">
                  by {completedBy}
                </div>
                <div className="text-[9px] text-muted-foreground md:text-[10px]">{date}</div>
              </>
            )}
            {status === "in-progress" && contributor && (
              <>
                <div className="text-[10px] font-medium md:text-xs">
                  {contributor}
                </div>
                <div className="text-[9px] font-semibold text-catalan-gold md:text-[10px]">{progress}%</div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Hover action for not-started */}
      {status === "not-started" && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/60 opacity-0 transition-opacity group-hover:opacity-100">
          <Button size="sm" className="bg-catalan-red hover:bg-catalan-red-dark text-white text-xs md:text-sm">
            <Play className="mr-1 h-3 w-3 md:mr-1.5 md:h-3.5 md:w-3.5" />
            Start
          </Button>
        </div>
      )}
    </CardWrapper>
  )
}
