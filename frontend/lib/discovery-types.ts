export type DiscoveryCategory = "os" | "pierre" | "galet" | "calcite"

export interface Discovery {
  id: string
  category: DiscoveryCategory
  imagePath: string
  discovered: boolean
  title: string
  artifactCategory: string
  completedBy?: string
  date?: string
}

export interface ArtifactDiscoveries {
  discoveries: Discovery[]
}
