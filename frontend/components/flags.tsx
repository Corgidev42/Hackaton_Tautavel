"use client"

export function FrenchFlag({ className = "h-4 w-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="8" height="16" fill="#002395" />
      <rect x="8" width="8" height="16" fill="#FFFFFF" />
      <rect x="16" width="8" height="16" fill="#ED2939" />
    </svg>
  )
}

export function BritishFlag({ className = "h-4 w-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="16" fill="#012169" />
      <path d="M0 0L24 16M24 0L0 16" stroke="#FFFFFF" strokeWidth="3" />
      <path d="M0 0L24 16M24 0L0 16" stroke="#C8102E" strokeWidth="1.5" />
      <path d="M12 0V16M0 8H24" stroke="#FFFFFF" strokeWidth="5" />
      <path d="M12 0V16M0 8H24" stroke="#C8102E" strokeWidth="3" />
    </svg>
  )
}

export function CatalanFlag({ className = "h-4 w-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Senyera - 9 stripes alternating yellow and red */}
      <rect width="24" height="16" fill="#FCDD09" />
      <rect y="1.78" width="24" height="1.78" fill="#DA121A" />
      <rect y="5.33" width="24" height="1.78" fill="#DA121A" />
      <rect y="8.89" width="24" height="1.78" fill="#DA121A" />
      <rect y="12.44" width="24" height="1.78" fill="#DA121A" />
    </svg>
  )
}

export function SpanishFlag({ className = "h-4 w-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="4" fill="#AA151B" />
      <rect y="4" width="24" height="8" fill="#F1BF00" />
      <rect y="12" width="24" height="4" fill="#AA151B" />
    </svg>
  )
}

export const flagComponents = {
  fr: FrenchFlag,
  en: BritishFlag,
  ca: CatalanFlag,
  es: SpanishFlag,
}
