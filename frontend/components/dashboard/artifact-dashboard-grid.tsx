"use client"

import { DashboardArtifactCard } from "@/components/dashboard/dashboard-artifact-card"
import { useLanguage } from "@/lib/i18n/language-context"

const allArtifacts = [
  {
    id: 1,
    status: "completed" as const,
    title: "Biface T-1247",
    category: "Stone Tools",
    image: "biface",
    completedBy: "Marie D.",
    date: "2024-01-15",
  },
  {
    id: 2,
    status: "completed" as const,
    title: "Scraper T-0892",
    category: "Stone Tools",
    image: "scraper",
    completedBy: "Carlos G.",
    date: "2024-01-14",
  },
  {
    id: 3,
    status: "in-progress" as const,
    title: "Bone Fragment T-2103",
    category: "Fauna",
    image: "bone",
    progress: 67,
    contributor: "Anna S.",
  },
  { id: 4, status: "not-started" as const, title: "Chopping Tool T-4521", category: "Stone Tools", image: "chopping" },
  {
    id: 5,
    status: "completed" as const,
    title: "Flake T-0445",
    category: "Stone Tools",
    image: "flake",
    completedBy: "Jean-Pierre L.",
    date: "2024-01-13",
  },
  {
    id: 6,
    status: "in-progress" as const,
    title: "Tooth T-3892",
    category: "Fauna",
    image: "tooth",
    progress: 34,
    contributor: "Sofia R.",
  },
  { id: 7, status: "not-started" as const, title: "Mandible T-3201", category: "Fauna", image: "mandible" },
  {
    id: 8,
    status: "completed" as const,
    title: "Point T-1567",
    category: "Stone Tools",
    image: "point",
    completedBy: "Thomas B.",
    date: "2024-01-12",
  },
  {
    id: 9,
    status: "completed" as const,
    title: "Chopper T-0123",
    category: "Stone Tools",
    image: "chopper",
    completedBy: "Emma W.",
    date: "2024-01-11",
  },
  {
    id: 10,
    status: "in-progress" as const,
    title: "Vertebra T-1876",
    category: "Fauna",
    image: "vertebra",
    progress: 89,
    contributor: "Pierre M.",
  },
  { id: 11, status: "not-started" as const, title: "Skull Fragment T-5234", category: "Fauna", image: "skull" },
  { id: 12, status: "not-started" as const, title: "Core T-2567", category: "Stone Tools", image: "core" },
  {
    id: 13,
    status: "completed" as const,
    title: "Handaxe T-0789",
    category: "Stone Tools",
    image: "handaxe",
    completedBy: "Lucia T.",
    date: "2024-01-10",
  },
  {
    id: 14,
    status: "in-progress" as const,
    title: "Rib T-4123",
    category: "Fauna",
    image: "rib",
    progress: 12,
    contributor: "Hans M.",
  },
  { id: 15, status: "not-started" as const, title: "Pebble Tool T-6789", category: "Stone Tools", image: "pebble" },
  {
    id: 16,
    status: "completed" as const,
    title: "Denticulate T-1234",
    category: "Stone Tools",
    image: "denticulate",
    completedBy: "Marie D.",
    date: "2024-01-09",
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
