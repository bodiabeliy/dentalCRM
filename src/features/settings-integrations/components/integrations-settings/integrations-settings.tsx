import { Typography } from '@mui/material'
import { useEffect } from 'react'

export function IntegrationsSettings({ setSubtitle }: { setSubtitle: (subtitle: string) => void }) {
  useEffect(() => {
    setSubtitle('Інтеграції')
  }, [setSubtitle])

  return <Typography variant="h6">Інтеграції</Typography>
}
