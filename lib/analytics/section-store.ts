import type { SectionSnapshot, TrackSectionOptions } from "./types"
import { getPageContext, setLastViewedSection } from "./state"
import { round } from "./utils"

interface MutableSectionSnapshot extends SectionSnapshot {
  visible_started_at?: number
}

const sections = new Map<string, MutableSectionSnapshot>()

function getSectionKey(sectionId: string, propertyId?: string) {
  return propertyId ? `${sectionId}:${propertyId}` : sectionId
}

export function resetSectionStore() {
  sections.clear()
}

export function startSectionView(options: TrackSectionOptions, visibleRatio: number) {
  const page = getPageContext()
  const sectionKey = getSectionKey(options.sectionId, options.propertyId)
  const existing = sections.get(sectionKey)
  const now = Date.now()
  const snapshot: MutableSectionSnapshot =
    existing ??
    {
      section_id: options.sectionId,
      section_name: options.sectionName,
      page_path: page.page_path,
      property_id: options.propertyId,
      first_visible_time: new Date(now).toISOString(),
      total_visible_duration_ms: 0,
      max_visible_percent: 0,
      visible_count: 0,
      is_visible: false,
    }

  if (!snapshot.is_visible) {
    snapshot.visible_count += 1
    snapshot.visible_started_at = now
    snapshot.is_visible = true
  }

  snapshot.max_visible_percent = Math.max(snapshot.max_visible_percent, round(visibleRatio * 100, 1))
  sections.set(sectionKey, snapshot)
  setLastViewedSection(options.sectionId)

  return snapshotSection(snapshot)
}

export function updateSectionVisibility(options: TrackSectionOptions, visibleRatio: number) {
  const sectionKey = getSectionKey(options.sectionId, options.propertyId)
  const existing = sections.get(sectionKey)

  if (!existing) return undefined

  existing.max_visible_percent = Math.max(existing.max_visible_percent, round(visibleRatio * 100, 1))
  sections.set(sectionKey, existing)

  if (visibleRatio > 0) {
    setLastViewedSection(options.sectionId)
  }

  return snapshotSection(existing)
}

export function endSectionView(options: TrackSectionOptions) {
  const sectionKey = getSectionKey(options.sectionId, options.propertyId)
  const existing = sections.get(sectionKey)

  if (!existing || !existing.is_visible) return undefined

  existing.total_visible_duration_ms += Date.now() - (existing.visible_started_at ?? Date.now())
  existing.visible_started_at = undefined
  existing.is_visible = false
  sections.set(sectionKey, existing)

  return snapshotSection(existing)
}

export function getSectionSnapshots() {
  return Array.from(sections.values()).map(snapshotSection)
}

function snapshotSection(section: MutableSectionSnapshot): SectionSnapshot {
  const visibleDuration = section.is_visible
    ? Date.now() - (section.visible_started_at ?? Date.now())
    : 0

  return {
    section_id: section.section_id,
    section_name: section.section_name,
    page_path: section.page_path,
    property_id: section.property_id,
    first_visible_time: section.first_visible_time,
    total_visible_duration_ms: Math.round(section.total_visible_duration_ms + visibleDuration),
    max_visible_percent: round(section.max_visible_percent, 1),
    visible_count: section.visible_count,
    is_visible: section.is_visible,
  }
}
