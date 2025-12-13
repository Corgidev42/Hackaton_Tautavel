"use client"

import { cn } from "@/lib/utils"
import { Slider } from "@/components/ui/slider"

interface ColorPaletteProps {
  selectedColor: string
  onColorSelect: (color: string) => void
  brushWidth: number
  onBrushWidthChange: (width: number) => void
}

const colors = [
  { name: "Catalan Red", value: "#C8102E" },
  { name: "Catalan Gold", value: "#FCDD09" },
  { name: "Dark Brown", value: "#5D4037" },
  { name: "Stone Gray", value: "#78909C" },
  { name: "Bone White", value: "#EFEBE9" },
  { name: "Earth", value: "#8D6E63" },
  { name: "Forest", value: "#558B2F" },
  { name: "Deep Blue", value: "#1565C0" },
  { name: "Black", value: "#212121" },
]

export function ColorPalette({ selectedColor, onColorSelect, brushWidth, onBrushWidthChange }: ColorPaletteProps) {
  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Color selection */}
        <div className="flex-1">
          <label className="mb-2 block text-sm font-medium">Stroke Color</label>
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
            Brush Size: <span className="text-catalan-gold">{brushWidth}px</span>
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
          <span className="text-sm text-muted-foreground">Preview:</span>
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
