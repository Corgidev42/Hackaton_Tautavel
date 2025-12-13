"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"
import { languages, type Language } from "@/lib/i18n/translations"
import { flagComponents } from "@/components/flags"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  const currentLang = languages.find((l) => l.code === language)
  const CurrentFlag = flagComponents[language]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-1.5 px-2">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">
            <CurrentFlag className="h-3 w-5 rounded-sm overflow-hidden" />
          </span>
          <span className="text-xs font-medium uppercase">{language}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[140px]">
        {languages.map((lang) => {
          const FlagComponent = flagComponents[lang.code as Language]
          return (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={language === lang.code ? "bg-muted" : ""}
            >
              <FlagComponent className="mr-2 h-3 w-5 rounded-sm overflow-hidden" />
              <span>{lang.name}</span>
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
