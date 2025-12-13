"use client"

import { DashboardArtifactCard } from "@/components/dashboard/dashboard-artifact-card"
import { useLanguage } from "@/lib/i18n/language-context"
import { Discovery } from "@/lib/discovery-types"

const allArtifacts = [
  {
    id: 1,
    status: "completed" as const,
    title: "Biface T-1247",
    category: "Stone Tools",
    image: "biface",
    completedBy: "Marie D.",
    date: "2024-01-15",
    discoveries: [
      { id: "1-1", category: "pierre" as const, imagePath: "/addons/pierre/pierre-1.png", discovered: true },
      { id: "1-2", category: "pierre" as const, imagePath: "/addons/pierre/pierre-2.png", discovered: true },
      { id: "1-3", category: "galet" as const, imagePath: "/addons/galet/galet-1.png", discovered: true },
    ],
  },
  {
    id: 2,
    status: "completed" as const,
    title: "Scraper T-0892",
    category: "Stone Tools",
    image: "scraper",
    completedBy: "Carlos G.",
    date: "2024-01-14",
    discoveries: [
      { id: "2-1", category: "pierre" as const, imagePath: "/addons/pierre/pierre-1.png", discovered: true },
      { id: "2-2", category: "calcite" as const, imagePath: "/addons/calcite/calcite-1.png", discovered: true },
    ],
  },
  {
    id: 3,
    status: "in-progress" as const,
    title: "Bone Fragment T-2103",
    category: "Fauna",
    image: "bone",
    progress: 67,
    contributor: "Anna S.",
    discoveries: [
      { id: "3-1", category: "os" as const, imagePath: "/addons/os/os-1.png", discovered: true },
      { id: "3-2", category: "os" as const, imagePath: "/addons/os/os-2.png", discovered: true },
      { id: "3-3", category: "calcite" as const, imagePath: "/addons/calcite/calcite-1.png", discovered: false },
      { id: "3-4", category: "pierre" as const, imagePath: "/addons/pierre/pierre-1.png", discovered: false },
    ],
  },
  { 
    id: 4, 
    status: "not-started" as const, 
    title: "Chopping Tool T-4521", 
    category: "Stone Tools", 
    image: "chopping",
    discoveries: [
      { id: "4-1", category: "pierre" as const, imagePath: "/addons/pierre/pierre-1.png", discovered: false },
      { id: "4-2", category: "galet" as const, imagePath: "/addons/galet/galet-1.png", discovered: false },
      { id: "4-3", category: "galet" as const, imagePath: "/addons/galet/galet-2.png", discovered: false },
    ],
  },
  {
    id: 5,
    status: "completed" as const,
    title: "Flake T-0445",
    category: "Stone Tools",
    image: "flake",
    completedBy: "Jean-Pierre L.",
    date: "2024-01-13",
    discoveries: [
      { id: "5-1", category: "pierre" as const, imagePath: "/addons/pierre/pierre-2.png", discovered: true },
      { id: "5-2", category: "galet" as const, imagePath: "/addons/galet/galet-1.png", discovered: true },
      { id: "5-3", category: "galet" as const, imagePath: "/addons/galet/galet-2.png", discovered: true },
      { id: "5-4", category: "calcite" as const, imagePath: "/addons/calcite/calcite-2.png", discovered: true },
    ],
  },
  {
    id: 6,
    status: "in-progress" as const,
    title: "Tooth T-3892",
    category: "Fauna",
    image: "tooth",
    progress: 34,
    contributor: "Sofia R.",
    discoveries: [
      { id: "6-1", category: "os" as const, imagePath: "/addons/os/os-1.png", discovered: true },
      { id: "6-2", category: "calcite" as const, imagePath: "/addons/calcite/calcite-1.png", discovered: true },
      { id: "6-3", category: "calcite" as const, imagePath: "/addons/calcite/calcite-2.png", discovered: false },
    ],
  },
  { 
    id: 7, 
    status: "not-started" as const, 
    title: "Mandible T-3201", 
    category: "Fauna", 
    image: "mandible",
    discoveries: [
      { id: "7-1", category: "os" as const, imagePath: "/addons/os/os-1.png", discovered: false },
      { id: "7-2", category: "os" as const, imagePath: "/addons/os/os-2.png", discovered: false },
    ],
  },
  {
    id: 8,
    status: "completed" as const,
    title: "Point T-1567",
    category: "Stone Tools",
    image: "point",
    completedBy: "Thomas B.",
    date: "2024-01-12",
    discoveries: [
      { id: "8-1", category: "pierre" as const, imagePath: "/addons/pierre/pierre-1.png", discovered: true },
      { id: "8-2", category: "galet" as const, imagePath: "/addons/galet/galet-2.png", discovered: true },
      { id: "8-3", category: "calcite" as const, imagePath: "/addons/calcite/calcite-1.png", discovered: true },
    ],
  },
  {
    id: 9,
    status: "completed" as const,
    title: "Chopper T-0123",
    category: "Stone Tools",
    image: "chopper",
    completedBy: "Emma W.",
    date: "2024-01-11",
    discoveries: [
      { id: "9-1", category: "pierre" as const, imagePath: "/addons/pierre/pierre-2.png", discovered: true },
      { id: "9-2", category: "pierre" as const, imagePath: "/addons/pierre/pierre-1.png", discovered: true },
    ],
  },
  {
    id: 10,
    status: "in-progress" as const,
    title: "Vertebra T-1876",
    category: "Fauna",
    image: "vertebra",
    progress: 89,
    contributor: "Pierre M.",
    discoveries: [
      { id: "10-1", category: "os" as const, imagePath: "/addons/os/os-2.png", discovered: true },
      { id: "10-2", category: "os" as const, imagePath: "/addons/os/os-1.png", discovered: true },
      { id: "10-3", category: "calcite" as const, imagePath: "/addons/calcite/calcite-2.png", discovered: true },
      { id: "10-4", category: "pierre" as const, imagePath: "/addons/pierre/pierre-2.png", discovered: false },
    ],
  },
  { 
    id: 11, 
    status: "not-started" as const, 
    title: "Skull Fragment T-5234", 
    category: "Fauna", 
    image: "skull",
    discoveries: [
      { id: "11-1", category: "os" as const, imagePath: "/addons/os/os-1.png", discovered: false },
      { id: "11-2", category: "os" as const, imagePath: "/addons/os/os-2.png", discovered: false },
      { id: "11-3", category: "calcite" as const, imagePath: "/addons/calcite/calcite-1.png", discovered: false },
    ],
  },
  { 
    id: 12, 
    status: "not-started" as const, 
    title: "Core T-2567", 
    category: "Stone Tools", 
    image: "core",
    discoveries: [
      { id: "12-1", category: "pierre" as const, imagePath: "/addons/pierre/pierre-1.png", discovered: false },
      { id: "12-2", category: "galet" as const, imagePath: "/addons/galet/galet-1.png", discovered: false },
    ],
  },
  {
    id: 13,
    status: "completed" as const,
    title: "Handaxe T-0789",
    category: "Stone Tools",
    image: "handaxe",
    completedBy: "Lucia T.",
    date: "2024-01-10",
    discoveries: [
      { id: "13-1", category: "pierre" as const, imagePath: "/addons/pierre/pierre-2.png", discovered: true },
      { id: "13-2", category: "pierre" as const, imagePath: "/addons/pierre/pierre-1.png", discovered: true },
      { id: "13-3", category: "galet" as const, imagePath: "/addons/galet/galet-1.png", discovered: true },
      { id: "13-4", category: "calcite" as const, imagePath: "/addons/calcite/calcite-2.png", discovered: true },
      { id: "13-5", category: "calcite" as const, imagePath: "/addons/calcite/calcite-1.png", discovered: true },
    ],
  },
  {
    id: 14,
    status: "in-progress" as const,
    title: "Rib T-4123",
    category: "Fauna",
    image: "rib",
    progress: 12,
    contributor: "Hans M.",
    discoveries: [
      { id: "14-1", category: "os" as const, imagePath: "/addons/os/os-1.png", discovered: true },
      { id: "14-2", category: "pierre" as const, imagePath: "/addons/pierre/pierre-1.png", discovered: false },
      { id: "14-3", category: "galet" as const, imagePath: "/addons/galet/galet-2.png", discovered: false },
    ],
  },
  { 
    id: 15, 
    status: "not-started" as const, 
    title: "Pebble Tool T-6789", 
    category: "Stone Tools", 
    image: "pebble",
    discoveries: [
      { id: "15-1", category: "galet" as const, imagePath: "/addons/galet/galet-1.png", discovered: false },
      { id: "15-2", category: "galet" as const, imagePath: "/addons/galet/galet-2.png", discovered: false },
      { id: "15-3", category: "pierre" as const, imagePath: "/addons/pierre/pierre-2.png", discovered: false },
    ],
  },
  {
    id: 16,
    status: "completed" as const,
    title: "Denticulate T-1234",
    category: "Stone Tools",
    image: "denticulate",
    completedBy: "Marie D.",
    date: "2024-01-09",
    discoveries: [
      { id: "16-1", category: "pierre" as const, imagePath: "/addons/pierre/pierre-1.png", discovered: true },
      { id: "16-2", category: "pierre" as const, imagePath: "/addons/pierre/pierre-2.png", discovered: true },
      { id: "16-3", category: "calcite" as const, imagePath: "/addons/calcite/calcite-1.png", discovered: true },
    ],
  },
]

export function ArtifactDashboardGrid() {
  const { t } = useLanguage()
  const completed = allArtifacts.filter((a) => a.status === "completed").length
  const inProgress = allArtifacts.filter((a) => a.status === "in-progress").length
  const notStarted = allArtifacts.filter((a) => a.status === "not-started").length

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold md:text-3xl">{t("artifactCollection")}</h1>
          <p className="mt-1 text-muted-foreground">{t("selectArtifact")}</p>
        </div>
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-sm bg-catalan-red"></div>
            <span>
              {completed} {t("completed")}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-sm bg-catalan-gold"></div>
            <span>
              {inProgress} {t("inProgress")}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-sm border border-border bg-muted"></div>
            <span>
              {notStarted} {t("available")}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {allArtifacts.map((artifact) => (
          <DashboardArtifactCard key={artifact.id} {...artifact} />
        ))}
      </div>
    </div>
  )
}
