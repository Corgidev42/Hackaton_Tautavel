"use client"

import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, Settings, User, LayoutDashboard, Menu, X } from "lucide-react"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/lib/i18n/language-context"

interface DashboardHeaderProps {
  user: {
    email: string
    name: string
  }
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { t } = useLanguage()

  const handleLogout = () => {
    sessionStorage.removeItem("tautavel-user")
    router.push("/")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4 md:h-16">
        <Link href="/" className="flex items-center gap-2 md:gap-3">
          <img src="/crane.svg" alt="Tautavel Logo" className="h-8 w-8 md:h-9 md:w-9" />
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight md:text-lg">Tautavel Vector</span>
            <span className="hidden text-xs text-muted-foreground sm:block">{t("citizenScienceProject")}</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/dashboard"
            className={`text-sm font-medium transition-colors hover:text-catalan-red ${
              pathname === "/dashboard" ? "text-catalan-red" : "text-muted-foreground"
            }`}
          >
            {t("dashboard")}
          </Link>
          <Link
            href="/profile"
            className={`text-sm font-medium transition-colors hover:text-catalan-red ${
              pathname === "/profile" ? "text-catalan-red" : "text-muted-foreground"
            }`}
          >
            {t("profile")}
          </Link>
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          <LanguageSwitcher />
          <div className="hidden text-right lg:block">
            <div className="text-sm font-medium">{user.name}</div>
            <div className="text-xs text-muted-foreground">{user.email}</div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full md:h-10 md:w-10">
                <Avatar className="h-8 w-8 border-2 border-catalan-gold md:h-10 md:w-10">
                  <AvatarFallback className="bg-catalan-red text-white text-sm font-semibold md:text-base">
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  <span>{t("dashboard")}</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/profile">
                  <User className="mr-2 h-4 w-4" />
                  <span>{t("profile")}</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>{t("settings")}</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-catalan-red focus:text-catalan-red">
                <LogOut className="mr-2 h-4 w-4" />
                <span>{t("logOut")}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="border-t border-border bg-background px-4 py-3 md:hidden">
          <nav className="flex flex-col gap-2">
            <Link
              href="/dashboard"
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                pathname === "/dashboard"
                  ? "bg-catalan-red/10 text-catalan-red"
                  : "text-muted-foreground hover:bg-muted"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <LayoutDashboard className="mr-2 inline h-4 w-4" />
              {t("dashboard")}
            </Link>
            <Link
              href="/profile"
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                pathname === "/profile" ? "bg-catalan-red/10 text-catalan-red" : "text-muted-foreground hover:bg-muted"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <User className="mr-2 inline h-4 w-4" />
              {t("profile")}
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
