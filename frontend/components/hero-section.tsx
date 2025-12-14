"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"
import { TautavelSkull3D } from "@/components/tautavel-skull-3d"
import Link from "next/link"
import { useEffect } from "react"

export function HeroSection() {
  const { t } = useLanguage()

  useEffect(() => {
    // Empêcher le scroll quand le composant est monté
    document.body.style.overflow = 'hidden'
    
    // Réactiver le scroll quand le composant est démonté
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-muted/30 to-background py-12 md:py-20 lg:py-32 h-screen flex items-center">
      <TautavelSkull3D />

      <div className="container mx-auto px-4 relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-catalan-gold/50 bg-catalan-gold/10 px-3 py-1 md:mb-6 md:px-4 md:py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-catalan-gold md:h-2 md:w-2"></span>
            <span className="text-xs font-medium text-catalan-gold-dark md:text-sm">{t("yearsOfHistory")}</span>
          </div>

          <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-7xl text-balance">
            {t("heroTitle")} <span className="text-catalan-red">{t("heroTitleHighlight")}</span> {t("heroTitleEnd")}
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:mt-6 md:text-lg lg:text-xl text-pretty">
            {t("heroDescription")}
          </p>

          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row md:mt-10 md:gap-4">
            <Button
              asChild
              size="lg"
              className="w-full bg-catalan-red hover:bg-catalan-red-dark text-white px-8 sm:w-auto"
            >
              <Link href="/contribute">
                {t("startContributing")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full border-muted-foreground/30 bg-transparent sm:w-auto"
            >
              <Link href="/about">{t("learnMore")}</Link>
            </Button>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4 text-center md:mt-16 md:flex md:items-center md:justify-center md:gap-12">
            <div>
              <div className="text-xl font-bold text-catalan-red sm:text-2xl md:text-3xl">12 847</div>
              <div className="text-xs text-muted-foreground sm:text-sm">{t("artifactsDigitized")}</div>
            </div>
            <div className="hidden h-12 w-px bg-border md:block"></div>
            <div>
              <div className="text-xl font-bold text-catalan-red sm:text-2xl md:text-3xl">2 341</div>
              <div className="text-xs text-muted-foreground sm:text-sm">{t("contributors")}</div>
            </div>
            <div className="hidden h-12 w-px bg-border md:block"></div>
            <div>
              <div className="text-xl font-bold text-catalan-red sm:text-2xl md:text-3xl">89%</div>
              <div className="text-xs text-muted-foreground sm:text-sm">{t("accuracyRate")}</div>
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
