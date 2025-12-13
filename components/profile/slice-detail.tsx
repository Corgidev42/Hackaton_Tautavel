"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X, Check, Clock, ArrowRight, Layers } from "lucide-react"
import type { CaveSlice, CaveArtifact } from "@/lib/cave-data"
import Image from "next/image"

interface SliceDetailProps {
  slice: CaveSlice
  onClose: () => void
}

function getArtifactTypeColor(type: CaveArtifact["type"]): string {
  switch (type) {
    case "tool":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "bone":
      return "bg-amber-100 text-amber-800 border-amber-200"
    case "fossil":
      return "bg-emerald-100 text-emerald-800 border-emerald-200"
    case "pottery":
      return "bg-purple-100 text-purple-800 border-purple-200"
    default:
      return "bg-muted text-muted-foreground"
  }
}

function getArtifactTypeIcon(type: CaveArtifact["type"]): string {
  switch (type) {
    case "tool":
      return "🔨"
    case "bone":
      return "🦴"
    case "fossil":
      return "🦕"
    case "pottery":
      return "🏺"
    default:
      return "📦"
  }
}

export function SliceDetail({ slice, onClose }: SliceDetailProps) {
  const completedCount = slice.artifacts.filter((a) => a.vectorized).length
  const totalCount = slice.artifacts.length
  const completionPercent = Math.round((completedCount / totalCount) * 100)

  return (
    <Card className="border-catalan-red/30 bg-gradient-to-br from-background to-muted/20">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Layers className="h-5 w-5 text-catalan-red" />
              <CardTitle className="font-serif text-xl">{slice.name}</CardTitle>
              <Badge variant="outline" className="text-xs">
                {slice.depth}
              </Badge>
            </div>
            <p className="text-sm font-medium text-catalan-gold">{slice.period}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="shrink-0">
            <X className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">{slice.description}</p>

        {/* Progress bar */}
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Vectorization Progress</span>
            <span className="font-semibold">{completionPercent}%</span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-catalan-red to-catalan-gold transition-all duration-500"
              style={{ width: `${completionPercent}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            {completedCount} of {totalCount} artifacts vectorized
          </p>
        </div>
      </CardHeader>

      <CardContent>
        <h4 className="font-semibold mb-3 flex items-center gap-2">
          Artifacts Found
          <Badge className="bg-catalan-red/10 text-catalan-red border-catalan-red/20">{totalCount} items</Badge>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {slice.artifacts.map((artifact) => (
            <div
              key={artifact.id}
              className={`group relative rounded-lg border p-3 transition-all hover:shadow-md ${
                artifact.vectorized
                  ? "bg-emerald-50/50 border-emerald-200"
                  : "bg-background border-border hover:border-catalan-gold"
              }`}
            >
              {/* Status indicator */}
              <div
                className={`absolute top-2 right-2 rounded-full p-1 ${
                  artifact.vectorized ? "bg-emerald-500 text-white" : "bg-muted text-muted-foreground"
                }`}
              >
                {artifact.vectorized ? <Check className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
              </div>

              {/* Artifact image */}
              <div className="aspect-square rounded-md overflow-hidden bg-muted mb-2">
                <Image
                  src={artifact.imageUrl || "/placeholder.svg"}
                  alt={artifact.name}
                  width={100}
                  height={100}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Artifact info */}
              <div className="space-y-1">
                <p className="font-medium text-sm truncate">{artifact.name}</p>
                <div className="flex items-center gap-1">
                  <Badge variant="outline" className={`text-xs ${getArtifactTypeColor(artifact.type)}`}>
                    <span className="mr-1">{getArtifactTypeIcon(artifact.type)}</span>
                    {artifact.type}
                  </Badge>
                </div>
              </div>

              {/* Action button for non-vectorized */}
              {!artifact.vectorized && (
                <Button
                  size="sm"
                  className="w-full mt-2 bg-catalan-red hover:bg-catalan-red-dark text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Vectorize
                  <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
