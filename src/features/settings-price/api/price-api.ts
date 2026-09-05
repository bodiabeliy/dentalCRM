import type { PriceSection } from '../model/types'

export const priceApi = {
  async getPriceSections(): Promise<PriceSection[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([])
      }, 1000)
    })
  },

  async createPriceSection(section: Omit<PriceSection, 'id'>): Promise<PriceSection> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          ...section,
          id: Date.now().toString(),
        })
      }, 1000)
    })
  },

  async updatePriceSection(section: PriceSection): Promise<PriceSection> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(section)
      }, 1000)
    })
  },

  async deletePriceSection(id: string): Promise<void> {
    console.log('Deleting price section with id:', id)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, 1000)
    })
  },
}
