"use client"

import { ArtifactCard } from "@/components/artifact-card"

const artifacts = [
  { id: 1, status: "completed" as const, title: "Biface T-1247", category: "Stone Tools", progress: 100 },
  { id: 2, status: "completed" as const, title: "Scraper T-0892", category: "Stone Tools", progress: 100 },
  { id: 3, status: "in-progress" as const, title: "Bone Fragment T-2103", category: "Fauna", progress: 67 },
  { id: 4, status: "loading" as const, title: "Loading...", category: "", progress: 0 },
  { id: 5, status: "completed" as const, title: "Flake T-0445", category: "Stone Tools", progress: 100 },
  { id: 6, status: "loading" as const, title: "Loading...", category: "", progress: 0 },
  { id: 7, status: "not-started" as const, title: "Mandible T-3201", category: "Fauna", progress: 0 },
  { id: 8, status: "loading" as const, title: "Loading...", category: "", progress: 0 },
  { id: 9, status: "completed" as const, title: "Chopper T-0123", category: "Stone Tools", progress: 100 },
  { id: 10, status: "in-progress" as const, title: "Vertebra T-1876", category: "Fauna", progress: 34 },
  { id: 11, status: "loading" as const, title: "Loading...", category: "", progress: 0 },
  { id: 12, status: "not-started" as const, title: "Core T-2567", category: "Stone Tools", progress: 0 },
]

export function ArtifactGrid() {
  return (
    <section id="artifacts" className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="font-serif text-3xl font-bold tracking-tight md:text-4xl">
            Current <span className="text-catalan-red">Digitization</span> Queue
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Browse artifacts awaiting vectorization. Each square represents a historical drawing that needs your help to
            be preserved digitally.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {artifacts.map((artifact) => (
            <ArtifactCard key={artifact.id} {...artifact} />
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-sm bg-catalan-red"></div>
            <span className="text-muted-foreground">Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-sm bg-catalan-gold"></div>
            <span className="text-muted-foreground">In Progress</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-sm border border-border bg-muted"></div>
            <span className="text-muted-foreground">Not Started</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 animate-pulse rounded-sm bg-muted"></div>
            <span className="text-muted-foreground">Loading</span>
          </div>
        </div>
      </div>
    </section>
  )
}
