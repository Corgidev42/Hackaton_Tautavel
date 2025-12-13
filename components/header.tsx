"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { LoginModal } from "@/components/login-modal"
import { Menu, X } from "lucide-react"

export function Header() {
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-14 items-center justify-between px-4 md:h-16">
          <Link href="/" className="flex items-center gap-2 md:gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-catalan-red md:h-9 md:w-9">
              <span className="font-serif text-base font-bold text-white md:text-lg">T</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-tight md:text-lg">Tautavel Vector</span>
              <span className="hidden text-xs text-muted-foreground sm:block">Citizen Science Project</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 lg:flex">
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

          {/* Desktop buttons */}
          <div className="hidden items-center gap-3 md:flex">
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

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="border-t border-border bg-background px-4 py-4 md:hidden">
            <nav className="flex flex-col gap-3">
              <Link
                href="#artifacts"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Artifacts
              </Link>
              <Link
                href="#about"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="#contribute"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                How to Contribute
              </Link>
              <div className="mt-3 flex flex-col gap-2 border-t border-border pt-3">
                <Button
                  variant="outline"
                  className="w-full border-catalan-red text-catalan-red hover:bg-catalan-red hover:text-white bg-transparent"
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    setIsLoginOpen(true)
                  }}
                >
                  Sign In
                </Button>
                <Button
                  className="w-full bg-catalan-red hover:bg-catalan-red-dark text-white"
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    setIsLoginOpen(true)
                  }}
                >
                  Join Project
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  )
}
