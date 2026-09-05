import { Typography } from '@mui/material'
import { useEffect } from 'react'

export function GeneralSettings({ setSubtitle }: { setSubtitle: (subtitle: string) => void }) {
  useEffect(() => {
    setSubtitle('Загальні налаштування')
  }, [setSubtitle])

  return <Typography variant="h6">Загальні налаштування</Typography>
}
