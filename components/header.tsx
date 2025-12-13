"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { LoginModal } from "@/components/login-modal"

export function Header() {
  const [isLoginOpen, setIsLoginOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded bg-catalan-red">
              <span className="font-serif text-lg font-bold text-white">T</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold tracking-tight">Tautavel Vector</span>
              <span className="text-xs text-muted-foreground">Citizen Science Project</span>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <Link
              href="#artifacts"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Artifacts
            </Link>
            <Link
              href="#about"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              About
            </Link>
            <Link
              href="#contribute"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              How to Contribute
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="border-catalan-red text-catalan-red hover:bg-catalan-red hover:text-white bg-transparent"
              onClick={() => setIsLoginOpen(true)}
            >
              Sign In
            </Button>
            <Button
              className="bg-catalan-red hover:bg-catalan-red-dark text-white"
              onClick={() => setIsLoginOpen(true)}
            >
              Join Project
            </Button>
          </div>
        </div>
      </header>
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  )
}
