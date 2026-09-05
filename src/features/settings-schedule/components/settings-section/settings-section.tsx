import { Box, Typography, Switch, FormControlLabel, TextField, useMediaQuery, useTheme } from '@mui/material'

interface SettingsSectionProps {
  settings: {
    showVisitsInColor: boolean
    minFreeTime: string
  }
  setSettings: (settings: { showVisitsInColor: boolean; minFreeTime: string }) => void
}

export function SettingsSection({ settings, setSettings }: SettingsSectionProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  return (
    <Box mb={isMobile ? 0 : 3}>
      <Typography variant="h6" mb={2}>
        Налаштування
      </Typography>
      <FormControlLabel
        control={
          <Switch
            checked={settings.showVisitsInColor}
            onChange={(_, checked) => setSettings({ ...settings, showVisitsInColor: checked })}
            sx={{
              '& .MuiSwitch-thumb': {
                backgroundColor: '#0029d9',
                '&:hover': {
                  backgroundColor: '#0029d9',
                },
              },
            }}
          />
        }
        label="Відображати візити в кольорі лікарів"
        sx={{ mb: isMobile ? 0 : 2 }}
      />
      <TextField
        label="Мінімально допустимий вільний час у розкладі"
        variant="outlined"
        size="small"
        value={settings.minFreeTime}
        onChange={(e) => setSettings({ ...settings, minFreeTime: e.target.value })}
        fullWidth
      />
    </Box>
  )
}
