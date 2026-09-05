// src/shared/utils/pricingColorStorage.ts
// Helper functions for managing pricing section colors in localStorage

const PRICING_COLOR_STORAGE_KEY = 'pricingSectionColors'

/**
 * Save the color ID for a pricing section to localStorage
 * @param sectionId - The unique ID of the pricing section
 * @param colorId - The color ID to save
 */
export const savePricingSectionColor = (sectionId: number, colorId: number): void => {
  const raw = localStorage.getItem(PRICING_COLOR_STORAGE_KEY)
  let colorMap: Record<string, number> = {}
  if (raw) {
    try {
      colorMap = JSON.parse(raw) as Record<string, number>
    } catch {
      colorMap = {}
    }
  }
  colorMap[String(sectionId)] = colorId
  localStorage.setItem(PRICING_COLOR_STORAGE_KEY, JSON.stringify(colorMap))
}

/**
 * Retrieve the color ID for a pricing section from localStorage
 * @param sectionId - The unique ID of the pricing section
 * @returns The color ID if found, otherwise undefined
 */
export const getPricingSectionColor = (sectionId: number): number | undefined => {
  const raw = localStorage.getItem(PRICING_COLOR_STORAGE_KEY)
  if (!raw) return undefined
  try {
    const colorMap: Record<string, number> = JSON.parse(raw)
    return colorMap[String(sectionId)]
  } catch {
    return undefined
  }
}
