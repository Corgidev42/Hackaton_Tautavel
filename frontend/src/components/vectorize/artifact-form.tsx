"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/lib/i18n/language-context"

interface ArtifactFormProps {
  artifactId: string
}

export function ArtifactForm({ artifactId }: ArtifactFormProps) {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    category: "",
    material: "",
    condition: "",
    notes: "",
  })

  return (
    <div className="rounded-xl border bg-card p-4">
      <h3 className="mb-4 font-serif text-lg font-semibold">{t("artifactDetails")}</h3>
      <p className="mb-4 text-xs text-muted-foreground">
        {t("artifactId")}: <span className="font-mono text-catalan-red">T-{artifactId}</span>
      </p>

      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="category">{t("category")}</Label>
            <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
              <SelectTrigger id="category">
                <SelectValue placeholder={t("selectType")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="stone-tool">{t("stoneTool")}</SelectItem>
                <SelectItem value="bone">{t("boneFragment")}</SelectItem>
                <SelectItem value="fossil">{t("fossil")}</SelectItem>
                <SelectItem value="fauna">{t("faunaRemains")}</SelectItem>
                <SelectItem value="other">{t("other")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="material">{t("material")}</Label>
            <Select value={formData.material} onValueChange={(v) => setFormData({ ...formData, material: v })}>
              <SelectTrigger id="material">
                <SelectValue placeholder={t("selectMaterial")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="flint">{t("flint")}</SelectItem>
                <SelectItem value="quartzite">{t("quartzite")}</SelectItem>
                <SelectItem value="limestone">{t("limestone")}</SelectItem>
                <SelectItem value="bone">{t("bone")}</SelectItem>
                <SelectItem value="antler">{t("antler")}</SelectItem>
                <SelectItem value="unknown">{t("unknown")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="condition">{t("preservationCondition")}</Label>
          <Select value={formData.condition} onValueChange={(v) => setFormData({ ...formData, condition: v })}>
            <SelectTrigger id="condition">
              <SelectValue placeholder={t("assessCondition")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="excellent">{t("excellent")}</SelectItem>
              <SelectItem value="good">{t("good")}</SelectItem>
              <SelectItem value="fair">{t("fair")}</SelectItem>
              <SelectItem value="poor">{t("poor")}</SelectItem>
              <SelectItem value="fragmentary">{t("fragmentary")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">{t("notesAndObservations")}</Label>
          <Textarea
            id="notes"
            placeholder={t("notesPlaceholder")}
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
