"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ArtifactFormProps {
  artifactId: string
}

export function ArtifactForm({ artifactId }: ArtifactFormProps) {
  const [formData, setFormData] = useState({
    category: "",
    material: "",
    condition: "",
    notes: "",
  })

  return (
    <div className="rounded-xl border bg-card p-4">
      <h3 className="mb-4 font-serif text-lg font-semibold">Artifact Details</h3>
      <p className="mb-4 text-xs text-muted-foreground">
        Artifact ID: <span className="font-mono text-catalan-red">T-{artifactId}</span>
      </p>

      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="stone-tool">Stone Tool</SelectItem>
                <SelectItem value="bone">Bone Fragment</SelectItem>
                <SelectItem value="fossil">Fossil</SelectItem>
                <SelectItem value="fauna">Fauna Remains</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="material">Material</Label>
            <Select value={formData.material} onValueChange={(v) => setFormData({ ...formData, material: v })}>
              <SelectTrigger id="material">
                <SelectValue placeholder="Select material" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="flint">Flint</SelectItem>
                <SelectItem value="quartzite">Quartzite</SelectItem>
                <SelectItem value="limestone">Limestone</SelectItem>
                <SelectItem value="bone">Bone</SelectItem>
                <SelectItem value="antler">Antler</SelectItem>
                <SelectItem value="unknown">Unknown</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="condition">Preservation Condition</Label>
          <Select value={formData.condition} onValueChange={(v) => setFormData({ ...formData, condition: v })}>
            <SelectTrigger id="condition">
              <SelectValue placeholder="Assess condition" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="excellent">Excellent</SelectItem>
              <SelectItem value="good">Good</SelectItem>
              <SelectItem value="fair">Fair</SelectItem>
              <SelectItem value="poor">Poor</SelectItem>
              <SelectItem value="fragmentary">Fragmentary</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Notes & Observations</Label>
          <Textarea
            id="notes"
            placeholder="Add any observations about distinctive features, damage patterns, or other relevant details..."
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            rows={3}
            className="resize-none"
          />
        </div>
      </div>
    </div>
  )
}
