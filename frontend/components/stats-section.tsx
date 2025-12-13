import { Users, FileCheck, Clock, Trophy } from "lucide-react"

const stats = [
  {
    icon: FileCheck,
    value: "12,847",
    label: "Artifacts Vectorized",
    description: "Historical drawings preserved forever",
  },
  {
    icon: Users,
    value: "2,341",
    label: "Contributors",
    description: "From 47 different countries",
  },
  {
    icon: Clock,
    value: "4,230",
    label: "Hours Contributed",
    description: "By our amazing community",
  },
  {
    icon: Trophy,
    value: "89%",
    label: "Accuracy Rate",
    description: "Validated by archaeologists",
  },
]

export function StatsSection() {
  return (
    <section className="border-t border-border bg-muted/30 py-20">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-catalan-red/10">
                <stat.icon className="h-6 w-6 text-catalan-red" />
              </div>
              <div className="text-3xl font-bold text-foreground">{stat.value}</div>
              <div className="mt-1 font-medium text-foreground">{stat.label}</div>
              <div className="mt-1 text-sm text-muted-foreground">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
