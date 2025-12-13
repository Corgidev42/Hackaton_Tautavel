import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-muted/30 to-background py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-catalan-gold/50 bg-catalan-gold/10 px-4 py-1.5">
            <span className="h-2 w-2 rounded-full bg-catalan-gold"></span>
            <span className="text-sm font-medium text-catalan-gold-dark">450,000 years of human history</span>
          </div>

          <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl text-balance">
            Preserve History, <span className="text-catalan-red">One Vector</span> at a Time
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl text-pretty">
            Join thousands of contributors digitizing archaeological drawings from the Tautavel Cave. Your work helps
            preserve one of Europe's most important prehistoric sites for future generations.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="bg-catalan-red hover:bg-catalan-red-dark text-white px-8">
              Start Contributing
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="border-muted-foreground/30 bg-transparent">
              Learn More
            </Button>
          </div>

          <div className="mt-16 flex items-center justify-center gap-12 text-center">
            <div>
              <div className="text-3xl font-bold text-catalan-red">12,847</div>
              <div className="text-sm text-muted-foreground">Artifacts Digitized</div>
            </div>
            <div className="h-12 w-px bg-border"></div>
            <div>
              <div className="text-3xl font-bold text-catalan-red">2,341</div>
              <div className="text-sm text-muted-foreground">Contributors</div>
            </div>
            <div className="h-12 w-px bg-border"></div>
            <div>
              <div className="text-3xl font-bold text-catalan-red">89%</div>
              <div className="text-sm text-muted-foreground">Accuracy Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -top-40 right-0 h-80 w-80 rounded-full bg-catalan-gold/5 blur-3xl"></div>
      <div className="absolute -bottom-40 left-0 h-80 w-80 rounded-full bg-catalan-red/5 blur-3xl"></div>
    </section>
  )
}
