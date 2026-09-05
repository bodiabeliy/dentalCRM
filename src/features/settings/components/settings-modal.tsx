import { useState, useEffect } from 'react'
import {
  Dialog,
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Switch,
  Select,
  FormControl,
  InputLabel,
  Button,
  Alert,
  CircularProgress,
} from '@mui/material'
import SettingsIcon from '../../../shared/assets/icons/settings_general.svg?react'
import MenuItem from '@mui/material/MenuItem'
import { useTranslation } from 'react-i18next'
import { useSettings } from '../contexts/settings-context'

export const SettingsModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const { t } = useTranslation()
  const { settings, cabinets, doctors, isLoading, error, updateSettings, resetSettings } = useSettings()

  // Local state for form values
  const [enabledCabinets, setEnabledCabinets] = useState<number[]>([])
  const [selectedDoctor, setSelectedDoctor] = useState<string>('')
  const [showOnlySelectedDoctor, setShowOnlySelectedDoctor] = useState(false)
  const [selectedDays, setSelectedDays] = useState<string>('')
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [isSaving, setIsSaving] = useState(false)

  // Initialize form values when settings are loaded
  useEffect(() => {
    if (settings) {
      setEnabledCabinets(settings.enabledCabinets)
      setSelectedDoctor(settings.selectedDoctor?.toString() || '')
      setShowOnlySelectedDoctor(settings.showOnlySelectedDoctor)
      setSelectedDays(settings.numberOfDays.toString())
      setSelectedSize(settings.scheduleSize)
    }
  }, [settings])

  const handleCabinetToggle = (cabinetId: number) => {
    setEnabledCabinets((prev) =>
      prev.includes(cabinetId) ? prev.filter((id) => id !== cabinetId) : [...prev, cabinetId]
    )
  }

  const handleSave = async () => {
    if (!settings) return

    setIsSaving(true)
    try {
      await updateSettings({
        enabledCabinets,
        selectedDoctor: selectedDoctor ? Number(selectedDoctor) : null,
        showOnlySelectedDoctor,
        numberOfDays: parseInt(selectedDays),
        scheduleSize: selectedSize as 'none' | 'shrink',
      })
      onClose()
    } catch (error) {
      console.error('Failed to save settings:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleReset = async () => {
    try {
      await resetSettings()
      onClose()
    } catch (error) {
      console.error('Failed to reset settings:', error)
    }
  }

  if (isLoading) {
    return (
      <Dialog
        open={open}
        onClose={onClose}
        fullScreen={isMobile}
        PaperProps={{
          sx: {
            width: '100%',
            maxWidth: isMobile ? '100%' : 700,
            borderRadius: isMobile ? 0 : 2,
            m: 2,
            p: 0,
            background: '#fff',
            boxShadow: '0 4px 24px rgba(44,51,74,0.12)',
            display: 'flex',
            overflow: 'visible',
            height: isMobile ? '100%' : 'auto',
          },
        }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <CircularProgress />
        </Box>
      </Dialog>
    )
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={isMobile}
      PaperProps={{
        sx: {
          width: '100%',
          maxWidth: isMobile ? '100%' : 700,
          borderRadius: isMobile ? 0 : 2,
          m: 2,
          p: 0,
          background: '#fff',
          boxShadow: '0 4px 24px rgba(44,51,74,0.12)',
          display: 'flex',
          overflow: 'visible',
          height: isMobile ? '100%' : 'auto',
        },
      }}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '8px',
          background: '#eff3ff',
          padding: '16px',
        }}>
        <SettingsIcon style={{ width: isMobile ? 20 : 24, height: isMobile ? 20 : 24, color: '#0029d9' }} />
        <Typography
          sx={{
            fontWeight: 500,
            fontSize: isMobile ? 18 : 20,
            lineHeight: '160%',
            letterSpacing: '0.01em',
            color: 'rgba(21, 22, 24, 0.87)',
          }}>
          {t('display-schedule')}
        </Typography>
      </Box>

      {error && (
        <Box sx={{ p: 2 }}>
          <Alert severity="error">{error.message}</Alert>
        </Box>
      )}

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '24px', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          {cabinets.map((cabinet) => (
            <Box key={cabinet.id} sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Switch
                checked={enabledCabinets.includes(cabinet.id)}
                onChange={() => handleCabinetToggle(cabinet.id)}
                sx={{
                  '& .MuiSwitch-track': {
                    backgroundColor: '#0029d9',
                  },
                  '& .MuiSwitch-thumb': {
                    backgroundColor: '#0029d9',
                  },
                }}
              />
              <Typography>{cabinet.name}</Typography>
            </Box>
          ))}
        </Box>

        <FormControl sx={{ width: '100%' }}>
          <InputLabel>{t('doctor')}</InputLabel>
          <Select
            value={selectedDoctor}
            onChange={(e) => setSelectedDoctor(e.target.value)}
            label={t('doctor')}
            sx={{
              borderRadius: '8px',
              width: '100%',
              flexGrow: 1,
            }}>
            <MenuItem value="">{t('all-doctors')}</MenuItem>
            {doctors.map((doctor) => (
              <MenuItem key={doctor.id} value={doctor.id.toString()}>
                {doctor.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', alignSelf: 'flex-start' }}>
          <Switch
            checked={showOnlySelectedDoctor}
            onChange={(e) => setShowOnlySelectedDoctor(e.target.checked)}
            disabled={!selectedDoctor}
            sx={{
              '& .MuiSwitch-track': {
                backgroundColor: '#0029d9',
              },
              '& .MuiSwitch-thumb': {
                backgroundColor: '#0029d9',
              },
            }}
          />
          <Typography>{t('display-schedule-only-this-doctor')}</Typography>
        </Box>

        <FormControl sx={{ width: '100%' }}>
          <InputLabel>{t('number-of-days')}</InputLabel>
          <Select
            value={selectedDays}
            onChange={(e) => setSelectedDays(e.target.value)}
            label={t('number-of-days')}
            sx={{
              borderRadius: '8px',
              width: '100%',
              flexGrow: 1,
            }}>
            <MenuItem value="1">1 день</MenuItem>
            <MenuItem value="2">2 дні</MenuItem>
            <MenuItem value="3">3 дні</MenuItem>
            <MenuItem value="4">4 дні</MenuItem>
            <MenuItem value="5">5 днів</MenuItem>
            <MenuItem value="6">6 днів</MenuItem>
            <MenuItem value="7">7 днів</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ width: '100%' }}>
          <InputLabel>{t('schedule-size')}</InputLabel>
          <Select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            label={t('schedule_size')}
            sx={{
              borderRadius: '8px',
              width: '100%',
              flexGrow: 1,
            }}>
            <MenuItem value="none">{t('no-shrink')}</MenuItem>
            <MenuItem value="shrink">{t('shrink')}</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="text"
          color="primary"
          onClick={handleReset}
          sx={{
            fontWeight: 500,
            fontSize: '14px',
            lineHeight: '143%',
            letterSpacing: '0.01em',
            color: '#7324d5',
            alignSelf: 'flex-start',
            textTransform: 'none',
          }}>
          {t('reset-filter')}
        </Button>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 2fr',
            gap: '8px',
            width: '100%',
          }}>
          <Button
            variant="outlined"
            onClick={onClose}
            disabled={isSaving}
            sx={{
              fontWeight: 500,
              fontSize: isMobile ? 14 : 15,
              lineHeight: '173%',
              letterSpacing: '0.03em',
              textTransform: 'uppercase',
              color: '#0029d9',
              border: '1px solid rgba(0, 41, 217, 0.5)',
              borderRadius: '8px',
              padding: isMobile ? '14px 22px' : '12px 22px',
              minHeight: isMobile ? 56 : 'auto',
            }}>
            {t('cancel')}
          </Button>

          <Button
            variant="contained"
            onClick={handleSave}
            disabled={isSaving}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              bgcolor: '#0029D9',
              minHeight: isMobile ? 56 : 'auto',
              fontSize: isMobile ? 14 : 16,
              '&:hover': {
                bgcolor: '#0020A8',
              },
              '&:disabled': {
                bgcolor: '#ccc',
              },
            }}>
            {isSaving ? <CircularProgress size={20} color="inherit" /> : t('save')}
          </Button>
        </Box>
      </Box>
    </Dialog>
  )
}
