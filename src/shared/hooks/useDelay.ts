import { useCallback } from 'react'
import delay from '../utils/delay'

/**
 * Custom hook that provides a delay function
 * @returns A function that returns a promise which resolves after the specified milliseconds
 */
export const useDelay = () => {
  /**
   * Memoized delay function that resolves after the specified time
   * @param ms - The delay time in milliseconds
   * @returns A promise that resolves after the specified time
   */
  const delayFn = useCallback((ms: number) => {
    return delay(ms)
  }, [])

  return { delay: delayFn }
}

export default useDelay
