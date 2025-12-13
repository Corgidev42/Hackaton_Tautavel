"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useLanguage } from "@/lib/i18n/language-context"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { t } = useLanguage()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login delay (static, no backend)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Store "logged in" state in sessionStorage (static mock)
    if (typeof window !== "undefined") {
      sessionStorage.setItem("tautavel-user", JSON.stringify({ email, name: email.split("@")[0] }))
    }

    setIsLoading(false)
    onClose()
    router.push("/dashboard")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded bg-catalan-red">
            <span className="font-serif text-xl font-bold text-white">T</span>
          </div>
          <DialogTitle className="text-center font-serif text-2xl">{t("welcomeBack")}</DialogTitle>
          <DialogDescription className="text-center">{t("signInToContinue")}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">{t("email")}</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">{t("password")}</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-catalan-red hover:bg-catalan-red-dark text-white"
            disabled={isLoading}
          >
            {isLoading ? t("signingIn") : t("signIn")}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            {t("noAccount")}{" "}
            <button type="button" className="font-medium text-catalan-red hover:underline">
              {t("createOne")}
            </button>
          </p>
        </form>
      </DialogContent>
    </Dialog>
  )
}
