export interface CaveArtifact {
  id: string
  name: string
  type: "tool" | "bone" | "fossil" | "pottery"
  vectorized: boolean
  imageUrl: string
}

export interface CaveSlice {
  id: string
  name: string
  depth: string
  period: string
  description: string
  artifacts: CaveArtifact[]
  color: string
  position: [number, number, number]
}

export const caveSlices: CaveSlice[] = [
  {
    id: "slice-1",
    name: "Stratum A",
    depth: "0-2m",
    period: "Upper Paleolithic",
    description: "The uppermost layer containing the most recent deposits, approximately 20,000 years old.",
    color: "#8B4513",
    position: [0, 2, 0],
    artifacts: [
      { id: "a1", name: "Flint Scraper", type: "tool", vectorized: true, imageUrl: "/flint-scraper-stone-tool.jpg" },
      { id: "a2", name: "Bone Fragment", type: "bone", vectorized: true, imageUrl: "/prehistoric-bone-fragment.jpg" },
      { id: "a3", name: "Carved Antler", type: "tool", vectorized: false, imageUrl: "/carved-antler-prehistoric.jpg" },
    ],
  },
  {
    id: "slice-2",
    name: "Stratum B",
    depth: "2-4m",
    period: "Middle Paleolithic",
    description: "Contains significant Neanderthal activity evidence, dating to approximately 100,000 years ago.",
    color: "#A0522D",
    position: [0, 1, 0],
    artifacts: [
      { id: "b1", name: "Mousterian Point", type: "tool", vectorized: true, imageUrl: "/mousterian-stone-point.jpg" },
      { id: "b2", name: "Animal Tooth", type: "fossil", vectorized: false, imageUrl: "/prehistoric-animal-tooth-fossil.jpg" },
      { id: "b3", name: "Hand Axe", type: "tool", vectorized: true, imageUrl: "/prehistoric-hand-axe.jpg" },
      { id: "b4", name: "Deer Antler", type: "bone", vectorized: false, imageUrl: "/prehistoric-deer-antler.jpg" },
    ],
  },
  {
    id: "slice-3",
    name: "Stratum C",
    depth: "4-6m",
    period: "Lower Paleolithic",
    description: "The layer where Tautavel Man remains were discovered, approximately 450,000 years old.",
    color: "#CD853F",
    position: [0, 0, 0],
    artifacts: [
      {
        id: "c1",
        name: "Tautavel Skull Fragment",
        type: "fossil",
        vectorized: true,
        imageUrl: "/prehistoric-human-skull-fragment.jpg",
      },
      { id: "c2", name: "Primitive Chopper", type: "tool", vectorized: true, imageUrl: "/primitive-stone-chopper.jpg" },
      { id: "c3", name: "Horse Bone", type: "bone", vectorized: false, imageUrl: "/prehistoric-horse-bone.jpg" },
      { id: "c4", name: "Rhinoceros Tooth", type: "fossil", vectorized: true, imageUrl: "/prehistoric-rhinoceros-tooth.jpg" },
      { id: "c5", name: "Flake Tool", type: "tool", vectorized: false, imageUrl: "/prehistoric-flake-stone-tool.jpg" },
    ],
  },
  {
    id: "slice-4",
    name: "Stratum D",
    depth: "6-8m",
    period: "Early Lower Paleolithic",
    description: "Deep sediments with early human presence markers, over 500,000 years old.",
    color: "#DEB887",
    position: [0, -1, 0],
    artifacts: [
      { id: "d1", name: "Pebble Tool", type: "tool", vectorized: false, imageUrl: "/prehistoric-pebble-tool.jpg" },
      { id: "d2", name: "Bison Vertebra", type: "bone", vectorized: true, imageUrl: "/prehistoric-bison-vertebra.jpg" },
    ],
  },
  {
    id: "slice-5",
    name: "Stratum E",
    depth: "8-10m",
    period: "Basal Layer",
    description: "The oldest excavated layer, containing the earliest evidence of human activity in the cave.",
    color: "#D2691E",
    position: [0, -2, 0],
    artifacts: [
      { id: "e1", name: "Core Stone", type: "tool", vectorized: false, imageUrl: "/prehistoric-core-stone.jpg" },
      {
        id: "e2",
        name: "Mammoth Fragment",
        type: "fossil",
        vectorized: false,
        imageUrl: "/placeholder.svg?height=100&width=100",
      },
      {
        id: "e3",
        name: "Quartzite Flake",
        type: "tool",
        vectorized: true,
        imageUrl: "/placeholder.svg?height=100&width=100",
      },
    ],
  },
]
