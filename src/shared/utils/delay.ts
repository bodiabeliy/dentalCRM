/**
 * Creates a promise that resolves after the specified time
 * @param ms - The delay time in milliseconds
 * @returns A promise that resolves after the specified time
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export default delay
