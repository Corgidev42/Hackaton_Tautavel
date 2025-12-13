"use client"

import { Trophy, Medal, Award } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useLanguage } from "@/lib/i18n/language-context"

const contributors = [
  { rank: 1, name: "Marie Dupont", contributions: 1247, country: "France" },
  { rank: 2, name: "Carlos García", contributions: 1089, country: "Spain" },
  { rank: 3, name: "Anna Schmidt", contributions: 956, country: "Germany" },
  { rank: 4, name: "Jean-Pierre L.", contributions: 834, country: "France" },
  { rank: 5, name: "Sofia Rossi", contributions: 721, country: "Italy" },
  { rank: 6, name: "Thomas Berg", contributions: 698, country: "Sweden" },
  { rank: 7, name: "Emma Wilson", contributions: 654, country: "UK" },
  { rank: 8, name: "Pierre Martin", contributions: 589, country: "France" },
  { rank: 9, name: "Lucia Torres", contributions: 534, country: "Spain" },
  { rank: 10, name: "Hans Müller", contributions: 487, country: "Austria" },
]

function getRankIcon(rank: number) {
  if (rank === 1) return <Trophy className="h-4 w-4 text-catalan-gold md:h-5 md:w-5" />
  if (rank === 2) return <Medal className="h-4 w-4 text-gray-400 md:h-5 md:w-5" />
  if (rank === 3) return <Award className="h-4 w-4 text-amber-600 md:h-5 md:w-5" />
  return <span className="text-xs font-medium text-muted-foreground w-4 text-center md:w-5 md:text-sm">{rank}</span>
}

function getRankBackground(rank: number) {
  if (rank === 1) return "bg-catalan-gold/10 border-catalan-gold/30"
  if (rank === 2) return "bg-gray-100 border-gray-200"
  if (rank === 3) return "bg-amber-50 border-amber-200"
  return "bg-transparent border-transparent"
}

export function Leaderboard() {
  const { t } = useLanguage()

  return (
    <Card className="lg:sticky lg:top-24">
      <CardHeader className="pb-2 md:pb-3">
        <CardTitle className="flex items-center gap-2 font-serif text-lg md:text-xl">
          <Trophy className="h-4 w-4 text-catalan-gold md:h-5 md:w-5" />
          {t("topContributors")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-1.5 md:space-y-2">
        {contributors.map((contributor, index) => (
          <div
            key={contributor.rank}
            className={`flex items-center gap-2 rounded-lg border p-2 transition-colors hover:bg-muted/50 md:gap-3 md:p-2.5 ${getRankBackground(contributor.rank)} ${index >= 5 ? "hidden lg:flex" : ""}`}
          >
            <div className="flex h-6 w-6 items-center justify-center md:h-8 md:w-8">
              {getRankIcon(contributor.rank)}
            </div>
            <Avatar className="h-6 w-6 md:h-8 md:w-8">
              <AvatarFallback className="bg-catalan-red/10 text-catalan-red text-[10px] font-medium md:text-xs">
                {contributor.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="truncate text-xs font-medium md:text-sm">{contributor.name}</div>
              <div className="hidden text-xs text-muted-foreground sm:block">{contributor.country}</div>
            </div>
            <div className="text-right">
              <div className="text-xs font-semibold text-catalan-red md:text-sm">
                {contributor.contributions.toLocaleString()}
              </div>
              <div className="hidden text-xs text-muted-foreground sm:block">{t("vectors")}</div>
            </div>
          </div>
        ))}
        {/* Mobile "see more" indicator */}
        <p className="text-center text-xs text-muted-foreground pt-1 lg:hidden">{t("moreContributors")}</p>
      </CardContent>
    </Card>
  )
}
