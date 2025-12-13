export type DiscoveryCategory = "os" | "pierre" | "galet" | "calcite"

export interface Discovery {
  id: string
  category: DiscoveryCategory
  imagePath: string
  discovered: boolean
}

export interface ArtifactDiscoveries {
  discoveries: Discovery[]
}
