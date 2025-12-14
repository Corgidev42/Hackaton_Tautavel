"use client"

import { ArtifactCard } from "@/components/artifact-card"
import { useLanguage } from "@/lib/i18n/language-context"

const artifacts = [
  {
    id: 1,
    status: "completed" as const,
    title: "Biface T-1247",
    category: "Stone Tools",
    progress: 100,
    imageSrc: "/mousterian-stone-point.jpg",
    overlayImageSrc: "", // Add transparent overlay path here
  },
  {
    id: 2,
    status: "completed" as const,
    title: "Scraper T-0892",
    category: "Stone Tools",
    progress: 100,
    imageSrc: "/flint-scraper-stone-tool.jpg",
    overlayImageSrc: "", // Add transparent overlay path here
  },
  {
    id: 3,
    status: "in-progress" as const,
    title: "Bone Fragment T-2103",
    category: "Fauna",
    progress: 67,
    imageSrc: "/prehistoric-bone-fragment.jpg",
    overlayImageSrc: "", // Add transparent overlay path here
  },
  {
    id: 4,
    status: "in-progress" as const,
    title: "Vertebra T-1876",
    category: "Fauna",
    progress: 34,
    imageSrc: "/prehistoric-bison-vertebra.jpg",
    overlayImageSrc: "", // Add transparent overlay path here
  },
  {
    id: 5,
    status: "completed" as const,
    title: "Flake T-0445",
    category: "Stone Tools",
    progress: 100,
    imageSrc: "/prehistoric-core-stone.jpg",
    overlayImageSrc: "", // Add transparent overlay path here
  },
  {
    id: 6,
    status: "in-progress" as const,
    title: "Antler T-0987",
    category: "Fauna",
    progress: 45,
    imageSrc: "/carved-antler-prehistoric.jpg",
    overlayImageSrc: "", // Add transparent overlay path here
  },
  {
    id: 7,
    status: "not-started" as const,
    title: "Mandible T-3201",
    category: "Fauna",
    progress: 0,
    imageSrc: "/prehistoric-horse-bone.jpg",
    overlayImageSrc: "", // Add transparent overlay path here
  },
  {
    id: 8,
    status: "not-started" as const,
    title: "Tooth T-4521",
    category: "Fauna",
    progress: 0,
    imageSrc: "/prehistoric-rhinoceros-tooth.jpg",
    overlayImageSrc: "", // Add transparent overlay path here
  },
  {
    id: 9,
    status: "completed" as const,
    title: "Chopper T-0123",
    category: "Stone Tools",
    progress: 100,
    imageSrc: "/prehistoric-animal-tooth-fossil.jpg",
    overlayImageSrc: "", // Add transparent overlay path here
  },
  {
    id: 10,
    status: "not-started" as const,
    title: "Core T-2567",
    category: "Stone Tools",
    progress: 0,
    imageSrc: "/prehistoric-pebble-tool.jpg",
    overlayImageSrc: "", // Add transparent overlay path here
  },
  {
    id: 11,
    status: "not-started" as const,
    title: "Scraper T-3890",
    category: "Stone Tools",
    progress: 0,
    imageSrc: "/prehistoric-hand-axe.jpg",
    overlayImageSrc: "", // Add transparent overlay path here
  },
  {
    id: 12,
    status: "not-started" as const,
    title: "Flake T-4123",
    category: "Stone Tools",
    progress: 0,
    imageSrc: "/prehistoric-flake-stone-tool.jpg",
    overlayImageSrc: "", // Add transparent overlay path here
  },
]

export function ArtifactGrid() {
  const { t } = useLanguage()

  return (
    <section id="artifacts" className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="font-serif text-3xl font-bold tracking-tight md:text-4xl">
            {t("digitizationQueue")} <span className="text-catalan-red">{t("digitization")}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">{t("digitizationQueueDesc")}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {artifacts.map((artifact) => (
            <ArtifactCard
              key={artifact.id}
              id={artifact.id}
              status={artifact.status}
              title={artifact.title}
              category={artifact.category}
              progress={artifact.progress}
              imageSrc={artifact.imageSrc || undefined}
              overlayImageSrc={artifact.overlayImageSrc || undefined}
            />
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-sm bg-catalan-red"></div>
            <span className="text-muted-foreground">{t("completed")}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-sm bg-catalan-gold"></div>
            <span className="text-muted-foreground">{t("inProgress")}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-sm border border-border bg-muted"></div>
            <span className="text-muted-foreground">{t("notStarted")}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
