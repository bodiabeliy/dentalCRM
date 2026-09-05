import { useCallback } from 'react'

interface ErrorHandlerOptions {
  onError?: (error: Error, context?: string) => void
  context?: string
  showUserNotification?: boolean
}

export function useErrorHandler(options: ErrorHandlerOptions = {}) {
  const { onError, context = 'Unknown', showUserNotification = true } = options

  const handleError = useCallback(
    (error: Error, additionalContext?: string) => {
      const errorContext = additionalContext || context

      console.error(`Error in ${errorContext}:`, error)

      if (onError) {
        onError(error, errorContext)
      }

      if (showUserNotification) {
        console.warn('User notification would be shown here:', error.message)
      }
    },
    [onError, context, showUserNotification]
  )

  const handleAsyncError = useCallback(
    async <T>(asyncFn: () => Promise<T>, additionalContext?: string): Promise<T | null> => {
      try {
        return await asyncFn()
      } catch (error) {
        handleError(error as Error, additionalContext)
        return null
      }
    },
    [handleError]
  )

  return {
    handleError,
    handleAsyncError,
  }
}
