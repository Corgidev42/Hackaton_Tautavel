"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/lib/i18n/language-context"
import { MapPin, Calendar, Users, Mountain, Bone, FlaskConical } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-muted/30 to-background py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-catalan-gold/50 bg-catalan-gold/10 px-4 py-1.5">
                <MapPin className="h-4 w-4 text-catalan-gold" />
                <span className="text-sm font-medium text-catalan-gold-dark">{t("pyreneesOrientales")}</span>
              </div>
              <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl text-balance">
                {t("aboutTitle")}
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground text-pretty">{t("aboutSubtitle")}</p>
            </div>
          </div>
          <div className="absolute -top-40 right-0 h-80 w-80 rounded-full bg-catalan-gold/5 blur-3xl"></div>
          <div className="absolute -bottom-40 left-0 h-80 w-80 rounded-full bg-catalan-red/5 blur-3xl"></div>
        </section>

        {/* History Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-catalan-red/50 bg-catalan-red/10 px-3 py-1">
                  <Calendar className="h-4 w-4 text-catalan-red" />
                  <span className="text-sm font-medium text-catalan-red">{t("discoveredIn1971")}</span>
                </div>
                <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                  {t("historyTitle")}
                </h2>
                <div className="mt-6 space-y-4 text-muted-foreground">
                  <p>{t("historyParagraph1")}</p>
                  <p>{t("historyParagraph2")}</p>
                  <p>{t("historyParagraph3")}</p>
                </div>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-muted">
                <Image src="/tautavel-cave-archaeological-site-excavation.jpg" alt="Tautavel Cave" fill className="object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* Key Facts */}
        <section className="border-y border-border bg-muted/30 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-center font-serif text-3xl font-bold tracking-tight text-foreground md:text-4xl mb-12">
              {t("keyFacts")}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl border border-border bg-background p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-catalan-red/10">
                  <Mountain className="h-6 w-6 text-catalan-red" />
                </div>
                <div className="text-3xl font-bold text-catalan-red">450 000</div>
                <div className="mt-1 text-sm text-muted-foreground">{t("yearsOld")}</div>
              </div>
              <div className="rounded-xl border border-border bg-background p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-catalan-gold/10">
                  <Bone className="h-6 w-6 text-catalan-gold" />
                </div>
                <div className="text-3xl font-bold text-catalan-gold-dark">150+</div>
                <div className="mt-1 text-sm text-muted-foreground">{t("humanRemains")}</div>
              </div>
              <div className="rounded-xl border border-border bg-background p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-catalan-red/10">
                  <FlaskConical className="h-6 w-6 text-catalan-red" />
                </div>
                <div className="text-3xl font-bold text-catalan-red">600 000+</div>
                <div className="mt-1 text-sm text-muted-foreground">{t("artifactsDiscovered")}</div>
              </div>
              <div className="rounded-xl border border-border bg-background p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-catalan-gold/10">
                  <Users className="h-6 w-6 text-catalan-gold" />
                </div>
                <div className="text-3xl font-bold text-catalan-gold-dark">50+</div>
                <div className="mt-1 text-sm text-muted-foreground">{t("yearsOfResearch")}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Tautavel Man Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="order-2 lg:order-1 relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-muted">
                <Image src="/tautavel-man-skull-reconstruction-prehistoric-huma.jpg" alt="Tautavel Man" fill className="object-cover" />
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                  {t("tautavelManTitle")}
                </h2>
                <div className="mt-6 space-y-4 text-muted-foreground">
                  <p>{t("tautavelManParagraph1")}</p>
                  <p>{t("tautavelManParagraph2")}</p>
                  <p>{t("tautavelManParagraph3")}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Project Mission */}
        <section className="border-t border-border bg-muted/30 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                {t("ourMission")}
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">{t("missionParagraph1")}</p>
              <p className="mt-4 text-lg text-muted-foreground">{t("missionParagraph2")}</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
