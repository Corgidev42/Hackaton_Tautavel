"use client"

import type React from "react"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Sparkles, Target, Flame, Award, TrendingUp, Calendar } from "lucide-react"

interface ProfileCardProps {
  user: {
    email: string
    name: string
  }
}

// Mock user stats - in real app would come from database
const userStats = {
  totalVectors: 347,
  rank: 24,
  joinedDate: "2024-09-15",
  streak: 12,
  completedSlices: 8,
  accuracy: 94.2,
}

// XP calculation: 10 XP per vector, bonus for streaks and accuracy
function calculateXP(vectors: number, streak: number, accuracy: number): number {
  const baseXP = vectors * 10
  const streakBonus = streak * 25
  const accuracyBonus = Math.floor(accuracy * 5)
  return baseXP + streakBonus + accuracyBonus
}

function getLevel(xp: number): { level: number; title: string; currentXP: number; nextLevelXP: number } {
  const levels = [
    { threshold: 0, title: "Novice Explorer" },
    { threshold: 500, title: "Cave Apprentice" },
    { threshold: 1500, title: "Artifact Seeker" },
    { threshold: 3500, title: "Vector Specialist" },
    { threshold: 7000, title: "Site Guardian" },
    { threshold: 12000, title: "Master Archaeologist" },
    { threshold: 20000, title: "Tautavel Legend" },
  ]

  let currentLevel = 0
  for (let i = levels.length - 1; i >= 0; i--) {
    if (xp >= levels[i].threshold) {
      currentLevel = i
      break
    }
  }

  const currentThreshold = levels[currentLevel].threshold
  const nextThreshold = levels[currentLevel + 1]?.threshold || levels[currentLevel].threshold * 2

  return {
    level: currentLevel + 1,
    title: levels[currentLevel].title,
    currentXP: xp - currentThreshold,
    nextLevelXP: nextThreshold - currentThreshold,
  }
}

function getLevelColor(level: number): string {
  if (level >= 6) return "bg-catalan-gold text-catalan-gold-dark"
  if (level >= 4) return "bg-catalan-red text-white"
  if (level >= 2) return "bg-amber-100 text-amber-800"
  return "bg-muted text-muted-foreground"
}

export function ProfileCard({ user }: ProfileCardProps) {
  const xp = calculateXP(userStats.totalVectors, userStats.streak, userStats.accuracy)
  const levelInfo = getLevel(xp)
  const progressPercent = (levelInfo.currentXP / levelInfo.nextLevelXP) * 100

  return (
    <Card className="overflow-hidden">
      {/* Header with gradient */}
      <div className="h-16 bg-gradient-to-br from-catalan-red to-catalan-red-dark relative md:h-24">
        <div className="absolute inset-0 opacity-20">
          {/* Catalan stripes pattern */}
          <div className="h-full flex flex-col justify-evenly">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-2 bg-catalan-gold md:h-3"></div>
            ))}
          </div>
        </div>
      </div>

      <CardHeader className="relative pt-0 pb-3 md:pb-4">
        {/* Avatar overlapping the header */}
        <div className="flex items-end gap-3 -mt-8 md:-mt-12 md:gap-4">
          <Avatar className="h-16 w-16 border-4 border-background shadow-lg md:h-24 md:w-24">
            <AvatarFallback className="bg-catalan-gold text-catalan-gold-dark text-xl font-bold md:text-3xl">
              {user.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="pb-1 md:pb-2">
            <h2 className="text-lg font-semibold md:text-2xl">{user.name}</h2>
            <p className="text-xs text-muted-foreground md:text-sm">{user.email}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 md:space-y-6">
        {/* Level and XP */}
        <div className="space-y-2 md:space-y-3">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <Badge className={`${getLevelColor(levelInfo.level)} text-xs font-semibold`}>
                Level {levelInfo.level}
              </Badge>
              <span className="font-serif text-sm md:text-lg">{levelInfo.title}</span>
            </div>
            <div className="flex items-center gap-1 text-catalan-gold">
              <Sparkles className="h-3 w-3 md:h-4 md:w-4" />
              <span className="text-sm font-bold md:text-base">{xp.toLocaleString()} XP</span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-[10px] text-muted-foreground md:text-xs">
              <span>{levelInfo.currentXP.toLocaleString()} XP</span>
              <span>{levelInfo.nextLevelXP.toLocaleString()} XP</span>
            </div>
            <Progress value={progressPercent} className="h-2 bg-muted md:h-3" />
            <p className="text-[10px] text-center text-muted-foreground md:text-xs">
              {(levelInfo.nextLevelXP - levelInfo.currentXP).toLocaleString()} XP to next level
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-2 md:gap-3">
          <StatCard
            icon={<Target className="h-4 w-4 text-catalan-red md:h-5 md:w-5" />}
            label="Vectors"
            value={userStats.totalVectors.toLocaleString()}
          />
          <StatCard
            icon={<TrendingUp className="h-4 w-4 text-catalan-gold md:h-5 md:w-5" />}
            label="Rank"
            value={`#${userStats.rank}`}
          />
          <StatCard
            icon={<Flame className="h-4 w-4 text-orange-500 md:h-5 md:w-5" />}
            label="Streak"
            value={`${userStats.streak}d`}
          />
          <StatCard
            icon={<Award className="h-4 w-4 text-emerald-500 md:h-5 md:w-5" />}
            label="Accuracy"
            value={`${userStats.accuracy}%`}
          />
        </div>

        {/* Achievements preview */}
        <div className="space-y-2">
          <h3 className="font-semibold text-xs flex items-center gap-2 md:text-sm">
            <Award className="h-3 w-3 text-catalan-gold md:h-4 md:w-4" />
            Recent Achievements
          </h3>
          <div className="flex flex-wrap gap-1.5 md:gap-2">
            <AchievementBadge title="First Vector" icon="🎯" unlocked />
            <AchievementBadge title="Week Warrior" icon="⚔️" unlocked />
            <AchievementBadge title="Century Club" icon="💯" unlocked />
            <AchievementBadge title="Perfectionist" icon="✨" unlocked={false} />
          </div>
        </div>

        {/* Member since */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2 border-t md:text-sm">
          <Calendar className="h-3 w-3 md:h-4 md:w-4" />
          <span>
            Member since{" "}
            {new Date(userStats.joinedDate).toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-lg border bg-muted/30 p-2 space-y-0.5 md:p-3 md:space-y-1">
      <div className="flex items-center gap-1.5 md:gap-2">
        {icon}
        <span className="text-[10px] text-muted-foreground md:text-xs">{label}</span>
      </div>
      <p className="text-base font-bold md:text-xl">{value}</p>
    </div>
  )
}

function AchievementBadge({ title, icon, unlocked }: { title: string; icon: string; unlocked: boolean }) {
  return (
    <div
      className={`flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-medium transition-all md:gap-1.5 md:px-3 md:py-1.5 md:text-xs ${
        unlocked
          ? "bg-catalan-gold/20 text-catalan-gold-dark border border-catalan-gold/30"
          : "bg-muted text-muted-foreground opacity-50 grayscale"
      }`}
      title={unlocked ? title : `${title} - Locked`}
    >
      <span>{icon}</span>
      <span className="hidden sm:inline">{title}</span>
    </div>
  )
}
