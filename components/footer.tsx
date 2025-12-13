import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded bg-catalan-red">
                <span className="font-serif text-lg font-bold text-white">T</span>
              </div>
              <span className="text-lg font-semibold">Tautavel Vector</span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              A citizen science project dedicated to preserving archaeological heritage through digital vectorization.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">Project</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-foreground">
                  About Tautavel
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground">
                  Research Team
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground">
                  Publications
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold">Community</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-foreground">
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground">
                  Forum
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground">
                  Guidelines
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold">Partners</h4>
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
          <p className="text-sm text-muted-foreground">© 2025 Tautavel Vector Project. All rights reserved.</p>
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
