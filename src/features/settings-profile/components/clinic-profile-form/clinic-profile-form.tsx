import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  useMediaQuery,
  useTheme,
  ListSubheader,
  Checkbox,
  ListItemText,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import ClinicLogo from '../../../../shared/assets/icons/clinic.svg?react'
import { useCallback, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../app/providers/store-helpers'
import { clinicSelector, getCurrentClinic } from '../../../../app/providers/reducers/ClinicSlice'
import type { IClinic } from '../../../../app/providers/types/clinic'
import { useFormValidation } from '../../../../shared/hooks/use-form-field'
import { getClinicById, updateClinicInfo, uploadClinicImage } from '../../../../app/services/ClinicService'
import { DeleteClinicDialog } from '../../ui/delete-clinic'

export function ClinicProfileForm({ setSubtitle }: { setSubtitle: (subtitle: string) => void }) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const { t } = useTranslation(['settings', 'common'])

  const dispatch = useAppDispatch()

  const currentClinic = useAppSelector(clinicSelector)

  const currentClinicLogo = currentClinic?.logo ? `${process.env.STATIC_FILES_URL}${currentClinic.logo}` : ''

  // Currency options grouped by region — values are lowercase ISO codes to match backend data; labels via i18n
  const currencyGroupConfig: { key: 'europe' | 'easternEurope' | 'americas' | 'asia'; codes: string[] }[] = [
    { key: 'europe', codes: ['eur', 'gbp', 'chf', 'sek', 'nok', 'dkk', 'pln', 'czk', 'huf', 'bgn', 'ron'] },
    { key: 'easternEurope', codes: ['uah', 'rub', 'byn', 'mdl'] },
    { key: 'americas', codes: ['usd', 'cad', 'aud'] },
    { key: 'asia', codes: ['jpy', 'cny'] },
  ]

  const toKey = (code: string | undefined) => (code ? code.toLowerCase() : code)
  const currencyLabel = (code: string) => t(`settings:clinicProfile.currencies.${toKey(code)}`, code)
  const currencyGroupLabel = (groupKey: string) => t(`settings:clinicProfile.currencyGroups.${groupKey}`, groupKey)

  useEffect(() => {
    setSubtitle(t('settings:tabs.clinicProfile'))
  }, [setSubtitle, t])

  const validate = () => ({
    id: '',
    name: '',
    logo: '',
    sub_name: '',
    sub_address: '',
  })

  const { formData, setFormData, handleFieldChange } = useFormValidation<IClinic>(
    {
      id: '',
      name: '',
      logo: '',
      sub_name: '',
      sub_address: '',
      utc: '',
      formatDate: '',
      formatTime: '',
      startWeek: '',
      currenciesIso: [],
      mainCurrencyIso: '',
    },
    validate
  )

  useEffect(() => {
    if (currentClinic) {
      setFormData({
        id: currentClinic.id,
        name: currentClinic?.name,
        logo: currentClinic?.logo,
        sub_name: currentClinic?.sub_name,
        sub_address: currentClinic?.sub_address,
        utc: currentClinic?.utc,
        formatDate: currentClinic?.formatDate,
        formatTime: currentClinic?.formatTime,
        startWeek: currentClinic?.startWeek,
        currenciesIso: currentClinic?.currenciesIso,
        mainCurrencyIso: currentClinic?.mainCurrencyIso,
      })
    }
  }, [currentClinic, setFormData])

  const UploadFiles = useCallback(
    (uploadedFile: File) => {
      if (uploadedFile) {
        dispatch(uploadClinicImage(uploadedFile))
        if (currentClinic.id) {
          dispatch(getClinicById(currentClinic.id))
        }
      }
    },
    [currentClinic, dispatch]
  )

  const resetForm = () => {
    setFormData({
      id: currentClinic?.id,
      name: currentClinic?.name,
      logo: currentClinic?.logo,
      sub_name: currentClinic?.sub_name,
      sub_address: currentClinic?.sub_address,
      utc: currentClinic?.utc,
      formatDate: currentClinic?.formatDate,
      formatTime: currentClinic?.formatTime,
      startWeek: currentClinic?.startWeek,
      currenciesIso: currentClinic?.currenciesIso,
      mainCurrencyIso: currentClinic?.mainCurrencyIso,
    })
  }

  // Derived lowercase values for rendering inside selects
  const uiCurrencies = (formData?.currenciesIso || []).map(toKey)
  const uiMainCurrency = toKey(formData?.mainCurrencyIso)

  const formSubmit = useCallback(async () => {
    const updateClinic: IClinic = {
      id: currentClinic.id,
      name: formData.name,
      logo: formData.logo,
      sub_name: currentClinic.sub_name,
      sub_address: currentClinic.sub_address,
      utc: formData.utc,
      formatDate: formData.formatDate,
      formatTime: formData.formatTime,
      startWeek: formData.startWeek,
      currenciesIso: formData.currenciesIso,
      mainCurrencyIso: formData.mainCurrencyIso,
    }

    const result = await dispatch(updateClinicInfo(updateClinic))
    if (result?.success) {
      dispatch(getCurrentClinic(updateClinic))
    }
  }, [currentClinic, formData, dispatch])

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const openDeleteDialog = useCallback(() => setIsDeleteDialogOpen(true), [])
  const closeDeleteDialog = useCallback(() => setIsDeleteDialogOpen(false), [])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: isMobile ? '100%' : 'auto',
        justifyContent: 'space-between',
        boxShadow:
          '0 2px 3px -1px rgba(0, 0, 0, 0.1), 0 1px 12px 0 rgba(0, 0, 0, 0.1), 0 1px 3px 0 rgba(0, 0, 0, 0.05)',
        background: '#fff',
        borderRadius: '16px',
        p: isMobile ? 2 : 3,
        mt: isMobile ? '16px' : '0',
      }}>
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">{t('settings:clinicProfile.logoTitle', 'Лого клініки')}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', mt: '8px' }}>
          <Box
            sx={{
              borderRadius: '8px',
              width: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {currentClinicLogo ? (
              <img
                src={currentClinicLogo}
                style={{ width: 40, height: 40, borderRadius: '8px', marginRight: '12px' }}
              />
            ) : (
              <ClinicLogo style={{ width: 40, height: 40, borderRadius: '8px', marginRight: '12px' }} />
            )}
          </Box>
          <Button
            variant="text"
            sx={{
              color: '#0029d9',
              fontSize: 14,
              fontWeight: 500,
              lineHeight: '171%',
              letterSpacing: '0.03em',
              textTransform: 'uppercase',
            }}>
            {t('settings:profile.change')}
          </Button>
          <TextField
            sx={{ transform: 'translate(-80px)', opacity: 0, maxWidth: '200px' }}
            id="outlined-basic"
            type="file"
            inputProps={{ multiple: false }}
            onChange={(event) => {
              const file = (event.target as HTMLInputElement).files?.[0]
              if (file) UploadFiles(file)
            }}
          />
        </Box>

        <form style={{ width: '100%', marginTop: '16px' }}>
          <TextField
            sx={{ '& .MuiInputBase-root': { borderRadius: '8px' } }}
            label={t('settings:clinicProfile.clinicName')}
            variant="outlined"
            fullWidth
            value={formData?.name}
            onChange={(event) => handleFieldChange('name', event.target.value)}
          />

          <Box sx={{ mt: '16px', display: 'flex', alignItems: 'center', gap: '16px', width: '100%' }}>
            <FormControl fullWidth sx={{ borderRadius: '8px' }}>
              <InputLabel id="timezone-label">{t('settings:clinicProfile.timezone')}</InputLabel>
              <Select
                value={formData?.utc}
                onChange={(event) => handleFieldChange('utc', event.target.value)}
                labelId="timezone-label"
                sx={{ '& .MuiInputBase-root': { borderRadius: '8px' }, width: '100%' }}
                label={t('settings:clinicProfile.timezone')}>
                {[
                  'UTC-12',
                  'UTC-11',
                  'UTC-10',
                  'UTC-9',
                  'UTC-8',
                  'UTC-7',
                  'UTC-6',
                  'UTC-5',
                  'UTC-4',
                  'UTC-3',
                  'UTC-2',
                  'UTC-1',
                  'UTC+0',
                  'UTC+1',
                  'UTC+2',
                  'UTC+3',
                  'UTC+4',
                  'UTC+5',
                  'UTC+5:30',
                  'UTC+6',
                  'UTC+7',
                  'UTC+8',
                  'UTC+9',
                  'UTC+10',
                  'UTC+11',
                  'UTC+12',
                ].map((tz) => (
                  <MenuItem key={tz} value={tz}>
                    {t(`settings:clinicProfile.timezones.${tz}`, tz)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ borderRadius: '8px' }}>
              <InputLabel id="timeformat-label">{t('settings:clinicProfile.timeFormat')}</InputLabel>
              <Select
                value={formData?.formatTime}
                onChange={(event) => {
                  handleFieldChange('formatTime', event.target.value)
                }}
                labelId="timeformat-label"
                sx={{
                  '& .MuiInputBase-root': { borderRadius: '8px' },
                  '& .MuiSelect-select': {
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    minWidth: 0,
                    paddingRight: '40px',
                  },
                  width: '100%',
                }}
                label={t('settings:clinicProfile.timeFormat')}>
                <MenuItem value="24">{t('settings:clinicProfile.timeFormat24', '24-годинний')}</MenuItem>
                <MenuItem value="12">{t('settings:clinicProfile.timeFormat12', '12-годинний')}</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ mt: '16px', display: 'flex', alignItems: 'center', gap: '16px', width: '100%' }}>
            <FormControl fullWidth sx={{ borderRadius: '8px' }}>
              <InputLabel id="date-format-label">{t('settings:clinicProfile.dateFormat')}</InputLabel>
              <Select
                value={formData?.formatDate}
                onChange={(event) => handleFieldChange('formatDate', event.target.value)}
                labelId="date-format-label"
                sx={{ '& .MuiInputBase-root': { borderRadius: '8px' }, width: '100%' }}
                label={t('settings:clinicProfile.dateFormat')}>
                <MenuItem value="dd.mm.yyyy">
                  {t('settings:clinicProfile.dateFormats.dd.mm.yyyy', 'ДД.ММ.РРРР (31.12.2024)')}
                </MenuItem>
                <MenuItem value="mm.dd.yyyy">
                  {t('settings:clinicProfile.dateFormats.mm.dd.yyyy', 'ММ.ДД.РРРР (12.31.2024)')}
                </MenuItem>
                <MenuItem value="yyyy.mm.dd">
                  {t('settings:clinicProfile.dateFormats.yyyy.mm.dd', 'РРРР.ММ.ДД (2024.12.31)')}
                </MenuItem>
                <MenuItem value="dd/mm/yyyy">
                  {t('settings:clinicProfile.dateFormats.dd/mm/yyyy', 'ДД/ММ/РРРР (31/12/2024)')}
                </MenuItem>
                <MenuItem value="mm/dd/yyyy">
                  {t('settings:clinicProfile.dateFormats.mm/dd/yyyy', 'ММ/ДД/РРРР (12/31/2024)')}
                </MenuItem>
                <MenuItem value="yyyy/mm/dd">
                  {t('settings:clinicProfile.dateFormats.yyyy/mm/dd', 'РРРР/ММ/ДД (2024/12/31)')}
                </MenuItem>
                <MenuItem value="dd-mm-yyyy">
                  {t('settings:clinicProfile.dateFormats.dd-mm-yyyy', 'ДД-ММ-РРРР (31-12-2024)')}
                </MenuItem>
                <MenuItem value="mm-dd-yyyy">
                  {t('settings:clinicProfile.dateFormats.mm-dd-yyyy', 'ММ-ДД-РРРР (12-31-2024)')}
                </MenuItem>
                <MenuItem value="yyyy-mm-dd">
                  {t('settings:clinicProfile.dateFormats.yyyy-mm-dd', 'РРРР-ММ-ДД (2024-12-31)')}
                </MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ borderRadius: '8px' }}>
              <InputLabel id="week-start-label">{t('settings:clinicProfile.weekStart')}</InputLabel>
              <Select
                value={formData?.startWeek}
                onChange={(event) => handleFieldChange('startWeek', event.target.value)}
                labelId="week-start-label"
                sx={{
                  '& .MuiInputBase-root': { borderRadius: '8px' },
                  '& .MuiSelect-select': {
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    minWidth: 0,
                    paddingRight: '40px',
                  },
                  width: '100%',
                }}
                label={t('settings:clinicProfile.weekStart')}>
                <MenuItem value="monday">{t('settings:clinicProfile.weekDays.monday', 'Понеділок')}</MenuItem>
                <MenuItem value="tuesday">{t('settings:clinicProfile.weekDays.tuesday', 'Вівторок')}</MenuItem>
                <MenuItem value="wednesday">{t('settings:clinicProfile.weekDays.wednesday', 'Середа')}</MenuItem>
                <MenuItem value="thursday">{t('settings:clinicProfile.weekDays.thursday', 'Четвер')}</MenuItem>
                <MenuItem value="friday">{t('settings:clinicProfile.weekDays.friday', "П'ятниця")}</MenuItem>
                <MenuItem value="saturday">{t('settings:clinicProfile.weekDays.saturday', 'Субота')}</MenuItem>
                <MenuItem value="sunday">{t('settings:clinicProfile.weekDays.sunday', 'Неділя')}</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ mt: '16px', display: 'flex', alignItems: 'center', gap: '16px', width: '100%' }}>
            <FormControl fullWidth sx={{ borderRadius: '8px' }}>
              <InputLabel id="use-currencies-label">{t('settings:clinicProfile.useCurrencies')}</InputLabel>
              <Select
                multiple
                value={uiCurrencies}
                onChange={(event) => {
                  const next = (event.target.value as string[])
                    .map(toKey)
                    .filter((v): v is string => typeof v === 'string')
                  handleFieldChange('currenciesIso', next)
                }}
                labelId="use-currencies-label"
                renderValue={(selected) => {
                  const values = (selected as string[]) || []
                  if (values.length === 0) return ''
                  const labels = values.map((val) => currencyLabel(val))
                  // Show labels when the list is short; otherwise show a translated summary
                  return labels.length <= 1
                    ? labels.join(', ')
                    : t('settings:clinicProfile.selectedCurrencies', { count: labels.length })
                }}
                sx={{ '& .MuiInputBase-root': { borderRadius: '8px' }, width: '100%' }}
                label={t('settings:clinicProfile.useCurrencies')}>
                {currencyGroupConfig.map((group) => [
                  <ListSubheader key={group.key} sx={{ fontWeight: 600, color: '#666' }}>
                    {currencyGroupLabel(group.key)}
                  </ListSubheader>,
                  ...group.codes.map((code) => (
                    <MenuItem key={code} value={code}>
                      <Checkbox
                        checked={uiCurrencies.indexOf(code) > -1}
                        sx={{ color: '#0029d9', '&.Mui-checked': { color: '#0029d9' } }}
                      />
                      <ListItemText primary={currencyLabel(code)} />
                    </MenuItem>
                  )),
                ])}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ borderRadius: '8px' }}>
              <InputLabel id="main-currency-label">{t('settings:clinicProfile.mainCurrency')}</InputLabel>
              <Select
                value={uiMainCurrency}
                onChange={(event) => handleFieldChange('mainCurrencyIso', toKey(event.target.value as string))}
                labelId="main-currency-label"
                renderValue={(selected) => (selected ? currencyLabel(selected as string) : '')}
                sx={{ '& .MuiInputBase-root': { borderRadius: '8px' }, width: '100%' }}
                label={t('settings:clinicProfile.mainCurrency')}>
                {[
                  'uah',
                  'usd',
                  'eur',
                  'gbp',
                  'pln',
                  'czk',
                  'cad',
                  'aud',
                  'chf',
                  'sek',
                  'nok',
                  'dkk',
                  'jpy',
                  'cny',
                  'rub',
                  'byn',
                  'mdl',
                  'ron',
                  'huf',
                  'bgn',
                ].map((code) => (
                  <MenuItem key={code} value={code}>
                    {currencyLabel(code)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </form>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: '16px' }}>
        <Box sx={{ display: 'flex' }}>
          <Button
            onClick={() => resetForm()}
            variant="outlined"
            sx={{
              mr: '16px',
              borderRadius: '8px',
              padding: '12px 22px',
              border: '1px solid #0029d9',
              color: '#0029d9',
              textTransform: 'uppercase',
            }}>
            {t('common:actions.cancel')}
          </Button>
          <Button
            onClick={() => formSubmit()}
            variant="contained"
            sx={{
              borderRadius: '8px',
              padding: '12px 22px',
              boxShadow:
                '0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12)',
              background: '#0029d9',
              textTransform: 'uppercase',
            }}>
            {t('settings:profile.saveChanges')}
          </Button>
        </Box>
        <Box sx={{ justifySelf: 'end', ml: '16px' }}>
          <Button
            onClick={openDeleteDialog}
            variant="contained"
            sx={{
              width: '100%',
              alignSelf: 'flex-end',
              borderRadius: '8px',
              padding: '12px 22px',
              boxShadow:
                '0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12)',
              background: 'red',
              textTransform: 'uppercase',
            }}>
            {t('settings:clinicProfile.deleteAccount')}
          </Button>
        </Box>
      </Box>
      <DeleteClinicDialog open={isDeleteDialogOpen} clinic={currentClinic} onClose={closeDeleteDialog} />
    </Box>
  )
}
