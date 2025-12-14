"use client"

import Link from "next/link"
import { useLanguage } from "@/lib/i18n/language-context"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t border-border bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded bg-catalan-red">
                <span className="font-serif text-lg font-bold text-white">T</span>
              </div>
              <span className="text-lg font-semibold">Vector' His</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">{t("footerDescription")}</p>
          </div>

          <div>
            <h4 className="font-semibold">{t("project")}</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-foreground">
                  {t("aboutTautavel")}
                </Link>
              </li>
              <li>
                <Link href="/contribute" className="hover:text-foreground">
                  {t("howItWorks")}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-foreground">
                  {t("researchTeam")}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-foreground">
                  {t("publications")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold">{t("community")}</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/dashboard" className="hover:text-foreground">
                  {t("leaderboard")}
                </Link>
              </li>
              <li>
                <Link href="/contribute" className="hover:text-foreground">
                  {t("forum")}
                </Link>
              </li>
              <li>
                <Link href="/contribute" className="hover:text-foreground">
                  {t("guidelines")}
                </Link>
              </li>
              <li>
                <Link href="/contribute" className="hover:text-foreground">
                  {t("faq")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold">{t("partners")}</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-foreground">
                  CNRS
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground">
                  Musée de Tautavel
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground">
                  Université de Perpignan
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">© 2025 Vector' His Project. {t("allRightsReserved")}</p>
          <div className="flex items-center gap-2">
            <div className="h-4 w-6 rounded-sm bg-catalan-gold"></div>
            <div className="h-4 w-6 rounded-sm bg-catalan-red"></div>
            <div className="h-4 w-6 rounded-sm bg-catalan-gold"></div>
            <div className="h-4 w-6 rounded-sm bg-catalan-red"></div>
            <span className="ml-2 text-xs text-muted-foreground">Catalunya</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
