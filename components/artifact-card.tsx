"use client"

import { cn } from "@/lib/utils"
import { Check, Clock, Loader2 } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"

interface ArtifactCardProps {
  id: number
  status: "completed" | "in-progress" | "not-started" | "loading"
  title: string
  category: string
  progress: number
}

export function ArtifactCard({ status, title, category, progress }: ArtifactCardProps) {
  const { t } = useLanguage()

  return (
    <div
      className={cn(
        "group relative aspect-square cursor-pointer overflow-hidden rounded-lg border transition-all duration-300 hover:scale-105 hover:shadow-lg",
        status === "completed" && "border-catalan-red/30 bg-catalan-red/5",
        status === "in-progress" && "border-catalan-gold/30 bg-catalan-gold/5",
        status === "not-started" && "border-border bg-muted/50",
        status === "loading" && "border-border bg-muted",
      )}
    >
      {status === "loading" ? (
        <div className="flex h-full w-full items-center justify-center">
          <div className="h-full w-full animate-pulse-slow bg-gradient-to-br from-muted to-muted-foreground/10"></div>
          <Loader2 className="absolute h-6 w-6 animate-spin text-muted-foreground/50" />
        </div>
      ) : (
        <>
          {/* Placeholder image pattern */}
          <div className="absolute inset-0 opacity-20">
            <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <pattern id={`pattern-${status}`} patternUnits="userSpaceOnUse" width="10" height="10">
                <path d="M 0 5 L 10 5 M 5 0 L 5 10" stroke="currentColor" strokeWidth="0.5" fill="none" />
              </pattern>
              <rect width="100" height="100" fill={`url(#pattern-${status})`} />
            </svg>
          </div>

          {/* Status indicator */}
          <div
            className={cn(
              "absolute left-2 top-2 flex h-6 w-6 items-center justify-center rounded-full",
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
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-catalan-gold/30">
              <div className="h-full bg-catalan-gold transition-all" style={{ width: `${progress}%` }}></div>
            </div>
          )}

          {/* Hover overlay with details */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/90 opacity-0 transition-opacity group-hover:opacity-100">
            <span className="text-xs font-medium text-foreground">{title}</span>
            {category && <span className="mt-1 text-xs text-muted-foreground">{category}</span>}
            {status === "in-progress" && (
              <span className="mt-2 text-xs font-semibold text-catalan-gold">
                {progress}% {t("complete")}
              </span>
            )}
          </div>
        </>
      )}
    </div>
  )
}
