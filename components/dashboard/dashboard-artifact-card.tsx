"use client"

import { cn } from "@/lib/utils"
import { Check, Clock, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

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
}

export function DashboardArtifactCard({
  status,
  title,
  category,
  progress,
  contributor,
  completedBy,
  date,
}: DashboardArtifactCardProps) {
  return (
    <div
      className={cn(
        "group relative aspect-square cursor-pointer overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-xl",
        status === "completed" && "border-catalan-red/40 bg-catalan-red/5",
        status === "in-progress" && "border-catalan-gold/40 bg-catalan-gold/5",
        status === "not-started" && "border-border bg-background hover:border-catalan-red/50",
      )}
    >
      {/* Background pattern representing artifact sketch */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30">
        <svg className="h-3/4 w-3/4" viewBox="0 0 100 100">
          <defs>
            <pattern id="artifact-pattern" patternUnits="userSpaceOnUse" width="8" height="8">
              <circle cx="4" cy="4" r="1" fill="currentColor" opacity="0.5" />
            </pattern>
          </defs>
          <ellipse
            cx="50"
            cy="50"
            rx="40"
            ry="35"
            fill="url(#artifact-pattern)"
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

      {/* Status indicator */}
      <div
        className={cn(
          "absolute left-3 top-3 flex h-7 w-7 items-center justify-center rounded-full shadow-sm",
          status === "completed" && "bg-catalan-red text-white",
          status === "in-progress" && "bg-catalan-gold text-white",
          status === "not-started" && "border-2 border-border bg-background",
        )}
      >
        {status === "completed" && <Check className="h-4 w-4" />}
        {status === "in-progress" && <Clock className="h-4 w-4" />}
      </div>

      {/* Progress bar for in-progress */}
      {status === "in-progress" && progress !== undefined && (
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-catalan-gold/30">
          <div className="h-full bg-catalan-gold transition-all duration-500" style={{ width: `${progress}%` }}></div>
        </div>
      )}

      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-background/95 via-background/50 to-transparent p-3">
        <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{category}</div>
        <div className="mt-0.5 truncate text-sm font-semibold">{title}</div>

        {status === "completed" && completedBy && (
          <div className="mt-1 text-xs text-muted-foreground">
            by {completedBy} • {date}
          </div>
        )}

        {status === "in-progress" && (
          <div className="mt-1 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">{contributor}</span>
            <span className="text-xs font-semibold text-catalan-gold">{progress}%</span>
          </div>
        )}
      </div>

      {/* Hover action for not-started */}
      {status === "not-started" && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 opacity-0 transition-opacity group-hover:opacity-100">
          <Button size="sm" className="bg-catalan-red hover:bg-catalan-red-dark text-white">
            <Play className="mr-1.5 h-3.5 w-3.5" />
            Start Vectorizing
          </Button>
        </div>
      )}
    </div>
  )
}
