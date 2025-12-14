"use client"

import { DashboardArtifactCard } from "@/components/dashboard/dashboard-artifact-card"
import { useLanguage } from "@/lib/i18n/language-context"
import { Discovery } from "@/lib/discovery-types"

const allArtifacts = [
  {
    id: 1,
    status: "completed" as const,
    discoveries: [
      { 
        id: "1-1", 
        category: "pierre" as const, 
        imagePath: "/addons/pierre/pierre-1.png", 
        discovered: true,
        title: "Pierre T-1247",
        artifactCategory: "Stone Tools",
        completedBy: "Marie D.",
        date: "2024-01-15"
      },
      { 
        id: "1-2", 
        category: "pierre" as const, 
        imagePath: "/addons/pierre/pierre-2.png", 
        discovered: true,
        title: "Pierre T-0892",
        artifactCategory: "Stone Tools",
        completedBy: "Jean P.",
        date: "2024-01-12"
      },
      { 
        id: "1-3", 
        category: "galet" as const, 
        imagePath: "/addons/galet/galet-1.png", 
        discovered: true,
        title: "Galet T-3341",
        artifactCategory: "Stone Tools",
        completedBy: "Anna S.",
        date: "2024-01-08"
      },
    ],
  },
  {
    id: 2,
    status: "completed" as const,
    discoveries: [
      { 
        id: "2-1", 
        category: "pierre" as const, 
        imagePath: "/addons/pierre/pierre-3.png", 
        discovered: true,
        title: "Pierre T-0892",
        artifactCategory: "Stone Tools",
        completedBy: "Carlos G.",
        date: "2024-01-14"
      },
      { 
        id: "2-2", 
        category: "calcite" as const, 
        imagePath: "/addons/calcite/calcite-1.png", 
        discovered: true,
        title: "Calcite T-4521",
        artifactCategory: "Mineral",
        completedBy: "Sofia R.",
        date: "2024-01-11"
      },
    ],
  },
  {
    id: 3,
    status: "in-progress" as const,
    discoveries: [
      { 
        id: "3-1", 
        category: "os" as const, 
        imagePath: "/addons/os/os-1.png", 
        discovered: true,
        title: "Os T-2103",
        artifactCategory: "Fauna",
        completedBy: "Anna S.",
        date: "2024-01-16"
      },
      { 
        id: "3-2", 
        category: "os" as const, 
        imagePath: "/addons/os/os-3.png", 
        discovered: true,
        title: "Os T-6789",
        artifactCategory: "Fauna",
        completedBy: "Thomas B.",
        date: "2024-01-13"
      },
      { 
        id: "3-3", 
        category: "calcite" as const, 
        imagePath: "/addons/calcite/calcite-1.png", 
        discovered: false,
        title: "Calcite T-9012",
        artifactCategory: "Mineral",
        completedBy: "Emma W.",
        date: "2024-01-09"
      },
      { 
        id: "3-4", 
        category: "pierre" as const, 
        imagePath: "/addons/pierre/pierre-4.png", 
        discovered: false,
        title: "Pierre T-3456",
        artifactCategory: "Stone Tools",
        completedBy: "Pierre M.",
        date: "2024-01-07"
      },
    ],
  },
  { 
    id: 4, 
    status: "not-started" as const,
    discoveries: [
      { 
        id: "4-1", 
        category: "pierre" as const, 
        imagePath: "/addons/pierre/pierre-1.png", 
        discovered: false,
        title: "Pierre T-4521",
        artifactCategory: "Stone Tools",
        completedBy: "Lucia T.",
        date: "2024-01-05"
      },
      { 
        id: "4-2", 
        category: "galet" as const, 
        imagePath: "/addons/galet/galet-1.png", 
        discovered: false,
        title: "Galet T-7890",
        artifactCategory: "Stone Tools",
        completedBy: "Hans M.",
        date: "2024-01-04"
      },
      { 
        id: "4-3", 
        category: "galet" as const, 
        imagePath: "/addons/galet/galet-2.png", 
        discovered: false,
        title: "Galet T-2345",
        artifactCategory: "Stone Tools",
        completedBy: "Carlos G.",
        date: "2024-01-03"
      },
    ],
  },
  {
    id: 5,
    status: "completed" as const,
    discoveries: [
      { 
        id: "5-1", 
        category: "pierre" as const, 
        imagePath: "/addons/pierre/pierre-2.png", 
        discovered: false,
        title: "Pierre T-0445",
        artifactCategory: "Stone Tools",
        completedBy: "Jean-Pierre L.",
        date: "2024-01-13"
      },
      { 
        id: "5-2", 
        category: "galet" as const, 
        imagePath: "/addons/galet/galet-1.png", 
        discovered: true,
        title: "Galet T-8901",
        artifactCategory: "Stone Tools",
        completedBy: "Marie D.",
        date: "2024-01-10"
      },
      { 
        id: "5-3", 
        category: "galet" as const, 
        imagePath: "/addons/galet/galet-2.png", 
        discovered: true,
        title: "Galet T-5678",
        artifactCategory: "Stone Tools",
        completedBy: "Anna S.",
        date: "2024-01-08"
      },
      { 
        id: "5-4", 
        category: "calcite" as const, 
        imagePath: "/addons/calcite/calcite-2.png", 
        discovered: true,
        title: "Calcite T-1234",
        artifactCategory: "Mineral",
        completedBy: "Sofia R.",
        date: "2024-01-06"
      },
    ],
  },
  {
    id: 6,
    status: "in-progress" as const,
    discoveries: [
      { 
        id: "6-1", 
        category: "calcite" as const, 
        imagePath: "/addons/calcite/calcite-1.png", 
        discovered: true,
        title: "Calcite T-3892",
        artifactCategory: "Mineral",
        completedBy: "Sofia R.",
        date: "2024-01-14"
      },
      { 
        id: "6-2", 
        category: "os" as const, 
        imagePath: "/addons/os/os-1.png", 
        discovered: true,
        title: "Os T-4567",
        artifactCategory: "Fauna",
        completedBy: "Thomas B.",
        date: "2024-01-11"
      },
      { 
        id: "6-3", 
        category: "calcite" as const, 
        imagePath: "/addons/calcite/calcite-2.png", 
        discovered: false,
        title: "Calcite T-7890",
        artifactCategory: "Mineral",
        completedBy: "Emma W.",
        date: "2024-01-09"
      },
    ],
  },
  { 
    id: 7, 
    status: "not-started" as const,
    discoveries: [
      { 
        id: "7-1", 
        category: "os" as const, 
        imagePath: "/addons/os/os-1.png", 
        discovered: false,
        title: "Os T-3201",
        artifactCategory: "Fauna",
        completedBy: "Pierre M.",
        date: "2024-01-12"
      },
      { 
        id: "7-2", 
        category: "os" as const, 
        imagePath: "/addons/os/os-2.png", 
        discovered: false,
        title: "Os T-9012",
        artifactCategory: "Fauna",
        completedBy: "Lucia T.",
        date: "2024-01-10"
      },
    ],
  },
  {
    id: 8,
    status: "completed" as const,
    discoveries: [
      { 
        id: "8-1", 
        category: "galet" as const, 
        imagePath: "/addons/galet/galet-2.png", 
        discovered: true,
        title: "Galet T-1567",
        artifactCategory: "Stone Tools",
        completedBy: "Thomas B.",
        date: "2024-01-12"
      },
      { 
        id: "8-2", 
        category: "pierre" as const, 
        imagePath: "/addons/pierre/pierre-1.png", 
        discovered: true,
        title: "Pierre T-2345",
        artifactCategory: "Stone Tools",
        completedBy: "Hans M.",
        date: "2024-01-09"
      },
      { 
        id: "8-3", 
        category: "calcite" as const, 
        imagePath: "/addons/calcite/calcite-1.png", 
        discovered: true,
        title: "Calcite T-6789",
        artifactCategory: "Mineral",
        completedBy: "Carlos G.",
        date: "2024-01-07"
      },
    ],
  },
  {
    id: 9,
    status: "completed" as const,
    discoveries: [
      { 
        id: "9-1", 
        category: "pierre" as const, 
        imagePath: "/addons/pierre/pierre-3.png", 
        discovered: true,
        title: "Pierre T-0123",
        artifactCategory: "Stone Tools",
        completedBy: "Emma W.",
        date: "2024-01-11"
      },
      { 
        id: "9-2", 
        category: "pierre" as const, 
        imagePath: "/addons/pierre/pierre-4.png", 
        discovered: true,
        title: "Pierre T-4567",
        artifactCategory: "Stone Tools",
        completedBy: "Marie D.",
        date: "2024-01-08"
      },
    ],
  },
  {
    id: 10,
    status: "in-progress" as const,
    discoveries: [
      { 
        id: "10-1", 
        category: "os" as const, 
        imagePath: "/addons/os/os-2.png", 
        discovered: true,
        title: "Os T-1876",
        artifactCategory: "Fauna",
        completedBy: "Pierre M.",
        date: "2024-01-15"
      },
      { 
        id: "10-2", 
        category: "os" as const, 
        imagePath: "/addons/os/os-1.png", 
        discovered: true,
        title: "Os T-3456",
        artifactCategory: "Fauna",
        completedBy: "Anna S.",
        date: "2024-01-13"
      },
      { 
        id: "10-3", 
        category: "calcite" as const, 
        imagePath: "/addons/calcite/calcite-2.png", 
        discovered: true,
        title: "Calcite T-7890",
        artifactCategory: "Mineral",
        completedBy: "Sofia R.",
        date: "2024-01-11"
      },
      { 
        id: "10-4", 
        category: "pierre" as const, 
        imagePath: "/addons/pierre/pierre-2.png", 
        discovered: false,
        title: "Pierre T-2345",
        artifactCategory: "Stone Tools",
        completedBy: "Thomas B.",
        date: "2024-01-09"
      },
    ],
  },
  { 
    id: 11, 
    status: "not-started" as const,
    discoveries: [
      { 
        id: "11-1", 
        category: "calcite" as const, 
        imagePath: "/addons/calcite/calcite-3.png", 
        discovered: true,
        title: "Calcite T-5234",
        artifactCategory: "Mineral",
        completedBy: "Emma W.",
        date: "2024-01-14"
      },
      { 
        id: "11-2", 
        category: "os" as const, 
        imagePath: "/addons/os/os-2.png", 
        discovered: false,
        title: "Os T-8901",
        artifactCategory: "Fauna",
        completedBy: "Lucia T.",
        date: "2024-01-12"
      },
      { 
        id: "11-3", 
        category: "calcite" as const, 
        imagePath: "/addons/calcite/calcite-1.png", 
        discovered: false,
        title: "Calcite T-5678",
        artifactCategory: "Mineral",
        completedBy: "Hans M.",
        date: "2024-01-10"
      },
    ],
  },
  { 
    id: 12, 
    status: "not-started" as const,
    discoveries: [
      { 
        id: "12-1", 
        category: "galet" as const, 
        imagePath: "/addons/galet/galet-4.png", 
        discovered: true,
        title: "Galet T-2567",
        artifactCategory: "Stone Tools",
        completedBy: "Carlos G.",
        date: "2024-01-13"
      },
      { 
        id: "12-2", 
        category: "galet" as const, 
        imagePath: "/addons/galet/galet-1.png", 
        discovered: false,
        title: "Galet T-3456",
        artifactCategory: "Stone Tools",
        completedBy: "Pierre M.",
        date: "2024-01-11"
      },
    ],
  },
  {
    id: 13,
    status: "completed" as const,
    discoveries: [
      { 
        id: "13-1", 
        category: "galet" as const, 
        imagePath: "/addons/galet/galet-3.png", 
        discovered: true,
        title: "Galet T-0789",
        artifactCategory: "Stone Tools",
        completedBy: "Lucia T.",
        date: "2024-01-10"
      },
      { 
        id: "13-2", 
        category: "pierre" as const, 
        imagePath: "/addons/pierre/pierre-1.png", 
        discovered: true,
        title: "Pierre T-9012",
        artifactCategory: "Stone Tools",
        completedBy: "Anna S.",
        date: "2024-01-08"
      },
      { 
        id: "13-3", 
        category: "galet" as const, 
        imagePath: "/addons/galet/galet-1.png", 
        discovered: true,
        title: "Galet T-3456",
        artifactCategory: "Stone Tools",
        completedBy: "Sofia R.",
        date: "2024-01-07"
      },
      { 
        id: "13-4", 
        category: "calcite" as const, 
        imagePath: "/addons/calcite/calcite-2.png", 
        discovered: true,
        title: "Calcite T-7890",
        artifactCategory: "Mineral",
        completedBy: "Thomas B.",
        date: "2024-01-06"
      },
      { 
        id: "13-5", 
        category: "calcite" as const, 
        imagePath: "/addons/calcite/calcite-1.png", 
        discovered: true,
        title: "Calcite T-2345",
        artifactCategory: "Mineral",
        completedBy: "Emma W.",
        date: "2024-01-05"
      },
    ],
  },
  {
    id: 14,
    status: "in-progress" as const,
    discoveries: [
      { 
        id: "14-1", 
        category: "os" as const, 
        imagePath: "/addons/os/os-4.png", 
        discovered: true,
        title: "Os T-4123",
        artifactCategory: "Fauna",
        completedBy: "Hans M.",
        date: "2024-01-15"
      },
      { 
        id: "14-2", 
        category: "pierre" as const, 
        imagePath: "/addons/pierre/pierre-1.png", 
        discovered: false,
        title: "Pierre T-5678",
        artifactCategory: "Stone Tools",
        completedBy: "Marie D.",
        date: "2024-01-12"
      },
      { 
        id: "14-3", 
        category: "galet" as const, 
        imagePath: "/addons/galet/galet-2.png", 
        discovered: false,
        title: "Galet T-9012",
        artifactCategory: "Stone Tools",
        completedBy: "Carlos G.",
        date: "2024-01-10"
      },
    ],
  },
  { 
    id: 15, 
    status: "not-started" as const,
    discoveries: [
      { 
        id: "15-1", 
        category: "galet" as const, 
        imagePath: "/addons/galet/galet-1.png", 
        discovered: false,
        title: "Galet T-6789",
        artifactCategory: "Stone Tools",
        completedBy: "Pierre M.",
        date: "2024-01-14"
      },
      { 
        id: "15-2", 
        category: "galet" as const, 
        imagePath: "/addons/galet/galet-2.png", 
        discovered: false,
        title: "Galet T-1234",
        artifactCategory: "Stone Tools",
        completedBy: "Lucia T.",
        date: "2024-01-11"
      },
      { 
        id: "15-3", 
        category: "pierre" as const, 
        imagePath: "/addons/pierre/pierre-2.png", 
        discovered: false,
        title: "Pierre T-4567",
        artifactCategory: "Stone Tools",
        completedBy: "Anna S.",
        date: "2024-01-09"
      },
    ],
  },
  {
    id: 16,
    status: "completed" as const,
    discoveries: [
      { 
        id: "16-1", 
        category: "os" as const, 
        imagePath: "/addons/os/os-3.png", 
        discovered: true,
        title: "Os T-1234",
        artifactCategory: "Fauna",
        completedBy: "Marie D.",
        date: "2024-01-09"
      },
      { 
        id: "16-2", 
        category: "pierre" as const, 
        imagePath: "/addons/pierre/pierre-2.png", 
        discovered: true,
        title: "Pierre T-5678",
        artifactCategory: "Stone Tools",
        completedBy: "Sofia R.",
        date: "2024-01-07"
      },
      { 
        id: "16-3", 
        category: "calcite" as const, 
        imagePath: "/addons/calcite/calcite-1.png", 
        discovered: true,
        title: "Calcite T-9012",
        artifactCategory: "Mineral",
        completedBy: "Thomas B.",
        date: "2024-01-05"
      },
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
          <DashboardArtifactCard 
            key={artifact.id} 
            id={artifact.id}
            status={artifact.status}
            discoveries={artifact.discoveries}
          />
        ))}
      </div>
    </div>
  )
}
