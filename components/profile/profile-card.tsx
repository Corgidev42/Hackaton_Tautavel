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
      <div className="h-24 bg-gradient-to-br from-catalan-red to-catalan-red-dark relative">
        <div className="absolute inset-0 opacity-20">
          {/* Catalan stripes pattern */}
          <div className="h-full flex flex-col justify-evenly">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-3 bg-catalan-gold"></div>
            ))}
          </div>
        </div>
      </div>

      <CardHeader className="relative pt-0 pb-4">
        {/* Avatar overlapping the header */}
        <div className="flex items-end gap-4 -mt-12">
          <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
            <AvatarFallback className="bg-catalan-gold text-catalan-gold-dark text-3xl font-bold">
              {user.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="pb-2">
            <h2 className="text-2xl font-semibold">{user.name}</h2>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Level and XP */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge className={`${getLevelColor(levelInfo.level)} font-semibold`}>Level {levelInfo.level}</Badge>
              <span className="font-serif text-lg">{levelInfo.title}</span>
            </div>
            <div className="flex items-center gap-1 text-catalan-gold">
              <Sparkles className="h-4 w-4" />
              <span className="font-bold">{xp.toLocaleString()} XP</span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{levelInfo.currentXP.toLocaleString()} XP</span>
              <span>{levelInfo.nextLevelXP.toLocaleString()} XP</span>
            </div>
            <Progress value={progressPercent} className="h-3 bg-muted" />
            <p className="text-xs text-center text-muted-foreground">
              {(levelInfo.nextLevelXP - levelInfo.currentXP).toLocaleString()} XP to next level
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <StatCard
            icon={<Target className="h-5 w-5 text-catalan-red" />}
            label="Vectors Completed"
            value={userStats.totalVectors.toLocaleString()}
          />
          <StatCard
            icon={<TrendingUp className="h-5 w-5 text-catalan-gold" />}
            label="Global Rank"
            value={`#${userStats.rank}`}
          />
          <StatCard
            icon={<Flame className="h-5 w-5 text-orange-500" />}
            label="Day Streak"
            value={`${userStats.streak} days`}
          />
          <StatCard
            icon={<Award className="h-5 w-5 text-emerald-500" />}
            label="Accuracy"
            value={`${userStats.accuracy}%`}
          />
        </div>

        {/* Achievements preview */}
        <div className="space-y-2">
          <h3 className="font-semibold text-sm flex items-center gap-2">
            <Award className="h-4 w-4 text-catalan-gold" />
            Recent Achievements
          </h3>
          <div className="flex flex-wrap gap-2">
            <AchievementBadge title="First Vector" icon="🎯" unlocked />
            <AchievementBadge title="Week Warrior" icon="⚔️" unlocked />
            <AchievementBadge title="Century Club" icon="💯" unlocked />
            <AchievementBadge title="Perfectionist" icon="✨" unlocked={false} />
          </div>
        </div>

        {/* Member since */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2 border-t">
          <Calendar className="h-4 w-4" />
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
    <div className="rounded-lg border bg-muted/30 p-3 space-y-1">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
      <p className="text-xl font-bold">{value}</p>
    </div>
  )
}

function AchievementBadge({ title, icon, unlocked }: { title: string; icon: string; unlocked: boolean }) {
  return (
    <div
      className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
        unlocked
          ? "bg-catalan-gold/20 text-catalan-gold-dark border border-catalan-gold/30"
          : "bg-muted text-muted-foreground opacity-50 grayscale"
      }`}
      title={unlocked ? title : `${title} - Locked`}
    >
      <span>{icon}</span>
      <span>{title}</span>
    </div>
  )
}
