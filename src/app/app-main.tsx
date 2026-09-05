
import { AppProviders } from './app-providers'
import { ErrorBoundary } from '../features/error-handling'

export default function MedicalScheduleGrid() {
  return (
    <ErrorBoundary>
      <AppProviders />
    </ErrorBoundary>
  )
}
