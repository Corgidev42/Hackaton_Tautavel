"use client"

import { cn } from "@/lib/utils"
import { Check, Clock } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"
import Image from "next/image"

interface ArtifactCardProps {
  id: number
  status: "completed" | "in-progress" | "not-started"
  title: string
  category: string
  progress: number
  imageSrc?: string
  overlayImageSrc?: string
}

export function ArtifactCard({ status, title, category, progress, imageSrc, overlayImageSrc }: ArtifactCardProps) {
  const { t } = useLanguage()

  return (
    <div
      className={cn(
        "group relative aspect-square cursor-pointer overflow-hidden rounded-lg border transition-all duration-300 hover:scale-105 hover:shadow-lg",
        status === "completed" && "border-catalan-red/30 bg-catalan-red/5",
        status === "in-progress" && "border-catalan-gold/30 bg-catalan-gold/5",
        status === "not-started" && "border-border bg-muted/50",
      )}
    >
      {/* Base image layer */}
      {imageSrc && (
        <div className="absolute inset-0">
          <Image src={imageSrc || "/placeholder.svg"} alt={title} fill className="object-cover" />
        </div>
      )}

      {status === "not-started" && (
        <div className="absolute inset-0 z-[1]">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id={`grid-pattern-${title.replace(/\s/g, "-")}`}
                patternUnits="userSpaceOnUse"
                width="20"
                height="20"
              >
                <path
                  d="M 20 0 L 0 0 0 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  className="text-foreground/30"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#grid-pattern-${title.replace(/\s/g, "-")})`} />
          </svg>
          {/* Semi-transparent overlay to desaturate the image */}
          <div className="absolute inset-0 bg-background/40"></div>
        </div>
      )}

      {/* Pattern for in-progress/completed without image */}
      {(status === "in-progress" || status === "completed") && !imageSrc && (
        <div className="absolute inset-0 opacity-30">
          <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern
              id={`pattern-${status}-${title.replace(/\s/g, "-")}`}
              patternUnits="userSpaceOnUse"
              width="10"
              height="10"
            >
              <path d="M 0 5 L 10 5 M 5 0 L 5 10" stroke="currentColor" strokeWidth="0.5" fill="none" />
            </pattern>
            <rect width="100" height="100" fill={`url(#pattern-${status}-${title.replace(/\s/g, "-")})`} />
          </svg>
        </div>
      )}

      {/* Transparent overlay image layer */}
      {overlayImageSrc && (
        <div className="absolute inset-0 z-[2]">
          <Image src={overlayImageSrc || "/placeholder.svg"} alt={`${title} overlay`} fill className="object-contain" />
        </div>
      )}

      {/* Status indicator */}
      <div
        className={cn(
          "absolute left-2 top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full",
          status === "completed" && "bg-catalan-red text-white",
          status === "in-progress" && "bg-catalan-gold text-catalan-gold-dark",
          status === "not-started" && "border border-border bg-background",
        )}
      >
        {status === "completed" && <Check className="h-3.5 w-3.5" />}
        {status === "in-progress" && <Clock className="h-3.5 w-3.5" />}
      </div>

      {/* Progress bar for in-progress */}
      {status === "in-progress" && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-catalan-gold/30 z-10">
          <div className="h-full bg-catalan-gold transition-all" style={{ width: `${progress}%` }}></div>
        </div>
      )}

      {/* Hover overlay with details */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-background/90 opacity-0 transition-opacity group-hover:opacity-100">
        <span className="text-xs font-medium text-foreground">{title}</span>
        {category && <span className="mt-1 text-xs text-muted-foreground">{category}</span>}
        {status === "in-progress" && (
          <span className="mt-2 text-xs font-semibold text-catalan-gold">
            {progress}% {t("complete")}
          </span>
        )}
        {status === "not-started" && (
          <span className="mt-2 text-xs font-semibold text-muted-foreground">{t("notStarted")}</span>
        )}
      </div>
    </div>
  )
}
