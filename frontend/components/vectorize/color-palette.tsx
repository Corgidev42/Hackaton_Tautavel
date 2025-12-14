"use client"

import { cn } from "@/lib/utils"
import { Slider } from "@/components/ui/slider"
import { useLanguage } from "@/lib/i18n/language-context"

interface ColorPaletteProps {
  selectedColor: string
  onColorSelect: (color: string) => void
  brushWidth: number
  onBrushWidthChange: (width: number) => void
}

export function ColorPalette({ selectedColor, onColorSelect, brushWidth, onBrushWidthChange }: ColorPaletteProps) {
  const { t } = useLanguage()

  const colors = [
    { name: t("catalanRed"), value: "#C8102E" },
    { name: t("catalanGold"), value: "#FCDD09" },
    { name: t("darkBrown"), value: "#5D4037" },
    { name: t("stoneGray"), value: "#78909C" },
    { name: t("boneWhite"), value: "#EFEBE9" },
    { name: t("earth"), value: "#8D6E63" },
    { name: t("forest"), value: "#558B2F" },
    { name: t("deepBlue"), value: "#1565C0" },
    { name: t("black"), value: "#212121" },
  ]

  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Color selection */}
        <div className="flex-1">
          <label className="mb-2 block text-sm font-medium">{t("strokeColor")}</label>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <button
                key={color.value}
                onClick={() => onColorSelect(color.value)}
                className={cn(
                  "h-8 w-8 rounded-full border-2 transition-all hover:scale-110",
                  selectedColor === color.value
                    ? "border-foreground ring-2 ring-foreground ring-offset-2"
                    : "border-transparent",
                )}
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </div>
        </div>

        {/* Brush width */}
        <div className="w-full sm:w-40">
          <label className="mb-2 block text-sm font-medium">
            {t("brushSize")}: <span className="text-catalan-gold">{brushWidth}px</span>
          </label>
          <Slider
            value={[brushWidth]}
            onValueChange={(v) => onBrushWidthChange(v[0])}
            min={1}
            max={10}
            step={1}
            className="w-full"
          />
        </div>

        {/* Preview */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">{t("preview")}:</span>
          <div
            className="rounded-full"
            style={{
              backgroundColor: selectedColor,
              width: brushWidth * 3 + 10,
              height: brushWidth * 3 + 10,
            }}
          />
        </div>
      </div>
    </div>
  )
}
