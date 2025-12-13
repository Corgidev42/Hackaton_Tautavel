"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/lib/i18n/language-context"
import { Button } from "@/components/ui/button"
import { ArrowRight, MousePointer2, Pencil, CheckCircle, Upload, Award, Users } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { LoginModal } from "@/components/login-modal"

export default function ContributePage() {
  const { t } = useLanguage()
  const [isLoginOpen, setIsLoginOpen] = useState(false)

  const steps = [
    {
      icon: MousePointer2,
      title: t("step1Title"),
      description: t("step1Description"),
    },
    {
      icon: Pencil,
      title: t("step2Title"),
      description: t("step2Description"),
    },
    {
      icon: CheckCircle,
      title: t("step3Title"),
      description: t("step3Description"),
    },
    {
      icon: Upload,
      title: t("step4Title"),
      description: t("step4Description"),
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-muted/30 to-background py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-catalan-gold/50 bg-catalan-gold/10 px-4 py-1.5">
                <Users className="h-4 w-4 text-catalan-gold" />
                <span className="text-sm font-medium text-catalan-gold-dark">{t("joinCommunity")}</span>
              </div>
              <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl text-balance">
                {t("contributeTitle")}
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground text-pretty">
                {t("contributeSubtitle")}
              </p>
              <div className="mt-8">
                <Button
                  size="lg"
                  className="bg-catalan-red hover:bg-catalan-red-dark text-white px-8"
                  onClick={() => setIsLoginOpen(true)}
                >
                  {t("startNow")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          <div className="absolute -top-40 right-0 h-80 w-80 rounded-full bg-catalan-gold/5 blur-3xl"></div>
          <div className="absolute -bottom-40 left-0 h-80 w-80 rounded-full bg-catalan-red/5 blur-3xl"></div>
        </section>

        {/* How It Works */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                {t("howItWorksTitle")}
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">{t("howItWorksSubtitle")}</p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="rounded-xl border border-border bg-background p-6">
                    <div className="mb-4 flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-catalan-red text-white font-bold">
                        {index + 1}
                      </div>
                      <step.icon className="h-6 w-6 text-catalan-gold" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ArrowRight className="h-6 w-6 text-muted-foreground/30" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What is Vectorization */}
        <section className="border-y border-border bg-muted/30 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <div>
                <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                  {t("whatIsVectorization")}
                </h2>
                <div className="mt-6 space-y-4 text-muted-foreground">
                  <p>{t("vectorizationParagraph1")}</p>
                  <p>{t("vectorizationParagraph2")}</p>
                  <p>{t("vectorizationParagraph3")}</p>
                </div>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-muted">
                <Image
                  src="/digital-vectorization-process-archaeological-drawi.jpg"
                  alt="Vectorization Process"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Rewards & Gamification */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                {t("rewardsTitle")}
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">{t("rewardsSubtitle")}</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-xl border border-border bg-background p-6 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-catalan-gold/10">
                  <Award className="h-7 w-7 text-catalan-gold" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{t("earnXPTitle")}</h3>
                <p className="text-sm text-muted-foreground">{t("earnXPDescription")}</p>
              </div>
              <div className="rounded-xl border border-border bg-background p-6 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-catalan-red/10">
                  <Users className="h-7 w-7 text-catalan-red" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{t("leaderboardTitle")}</h3>
                <p className="text-sm text-muted-foreground">{t("leaderboardDescription")}</p>
              </div>
              <div className="rounded-xl border border-border bg-background p-6 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-catalan-gold/10">
                  <CheckCircle className="h-7 w-7 text-catalan-gold" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{t("achievementsTitle")}</h3>
                <p className="text-sm text-muted-foreground">{t("achievementsDescription")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t border-border bg-catalan-red py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-white md:text-4xl">{t("readyToStart")}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">{t("readyToStartSubtitle")}</p>
            <div className="mt-8">
              <Button
                size="lg"
                className="bg-white text-catalan-red hover:bg-white/90 px-8"
                onClick={() => setIsLoginOpen(true)}
              >
                {t("createAccount")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </div>
  )
}
