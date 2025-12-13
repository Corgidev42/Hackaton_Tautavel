import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ArtifactGrid } from "@/components/artifact-grid"
import { StatsSection } from "@/components/stats-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ArtifactGrid />
        <StatsSection />
      </main>
      <Footer />
    </div>
  )
}
