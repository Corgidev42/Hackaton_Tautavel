import { Trophy, Medal, Award } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

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
  if (rank === 1) return <Trophy className="h-5 w-5 text-catalan-gold" />
  if (rank === 2) return <Medal className="h-5 w-5 text-gray-400" />
  if (rank === 3) return <Award className="h-5 w-5 text-amber-600" />
  return <span className="text-sm font-medium text-muted-foreground w-5 text-center">{rank}</span>
}

function getRankBackground(rank: number) {
  if (rank === 1) return "bg-catalan-gold/10 border-catalan-gold/30"
  if (rank === 2) return "bg-gray-100 border-gray-200"
  if (rank === 3) return "bg-amber-50 border-amber-200"
  return "bg-transparent border-transparent"
}

export function Leaderboard() {
  return (
    <Card className="sticky top-24">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 font-serif text-xl">
          <Trophy className="h-5 w-5 text-catalan-gold" />
          Top Contributors
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {contributors.map((contributor) => (
          <div
            key={contributor.rank}
            className={`flex items-center gap-3 rounded-lg border p-2.5 transition-colors hover:bg-muted/50 ${getRankBackground(contributor.rank)}`}
          >
            <div className="flex h-8 w-8 items-center justify-center">{getRankIcon(contributor.rank)}</div>
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-catalan-red/10 text-catalan-red text-xs font-medium">
                {contributor.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="truncate text-sm font-medium">{contributor.name}</div>
              <div className="text-xs text-muted-foreground">{contributor.country}</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-catalan-red">{contributor.contributions.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">vectors</div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
