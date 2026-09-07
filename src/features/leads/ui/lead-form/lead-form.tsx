import {
  Box,
  Typography,
  Stack,
  Button,
  Chip,
  Autocomplete,
  TextField,
  InputAdornment,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
} from '@mui/material'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import TagOutlinedIcon from '@mui/icons-material/TagOutlined'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import SellOutlinedIcon from '@mui/icons-material/SellOutlined'
import AddLocationOutlinedIcon from '@mui/icons-material/AddLocationOutlined'
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined'

import { useLocation } from 'react-router'
import { LEAD_STATUS_TAG, LEAD_TAG } from '../../model/constants'
import { FormField } from '../../../../shared/components/ui/form-field/form-field'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Avatar } from '../../../../shared/components/ui/avatar'

interface LeadFormProps {
  isMobile: boolean
  activeTab: number
  onClick?: () => void
}

export function LeadForm({ isMobile, activeTab }: LeadFormProps) {
  const { t } = useTranslation('leads')

  const location = useLocation()
  const { name, avatar } = location.state.lead

  const fixedOptions = [LEAD_TAG[0]]
  const [value, setValue] = useState([...fixedOptions, LEAD_TAG[1]])

  return (
    <Paper
      sx={{
        background: '#fff',
        borderRadius: '16px',
        boxShadow:
          '0 2px 3px -1px rgba(0, 0, 0, 0.1), 0 1px 12px 0 rgba(0, 0, 0, 0.1), 0 1px 3px 0 rgba(0, 0, 0, 0.05)',
        p: 1.5,
        minWidth: isMobile ? 'auto' : '540px',
        display: isMobile && activeTab !== 0 ? 'none' : 'flex',
        flexDirection: 'column',
        gap: 3,
      }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar src={avatar} width={40} height={40} borderRadius="12px" />
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 600, fontSize: 20, color: '#2D3748' }}>
            {name}
          </Typography>
          <Typography sx={{ color: '#718096', fontSize: 15 }}>29 років</Typography>
        </Box>
      </Box>

      {/* Form Fields */}
      <Stack spacing={2.5}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormField label="Дата народження" value="29.12.2000" icon={<CalendarTodayIcon />} />
          <FormField label="Стать" value="Жінка" icon={<PersonOutlineIcon />} />
        </Box>

        <FormField label="Email" value="user@gmail.com" icon={<EmailOutlinedIcon />} />

        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormField label="Номер телефону" value="+380(11)111-11-11" icon={<LocalPhoneOutlinedIcon />} />
          <FormField label="Примітка до номеру" value="Основний номер" />
        </Box>

        <FormField label="Відповідальний" value="ПІБ" icon={<AccountCircleOutlinedIcon />} />

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Autocomplete
            multiple
            fullWidth
            readOnly
            id="status-tags"
            options={LEAD_STATUS_TAG}
            getOptionLabel={(option) => option?.title}
            defaultValue={[LEAD_STATUS_TAG[0]]}
            renderInput={(params) => (
              <TextField
                {...params}
                InputLabelProps={{
                  sx: {
                    color: '#718096',
                    fontSize: 14,
                    transform: 'none',
                    position: 'relative',
                    '&.Mui-focused': {
                      color: '#718096 !important',
                    },
                  },
                }}
                label="Статус"
                variant="standard"
                sx={{
                  '& .MuiInput-root': {
                    borderBottom: '1px solid #E2E8F0',
                    '&:before, &:after': {
                      display: 'none',
                    },
                  },
                  '& label + .MuiInput-root': {
                    marginTop: '0px',
                  },
                }}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <>
                      <InputAdornment position="start">
                        <SellOutlinedIcon sx={{ color: '#A0AEC0' }} />
                      </InputAdornment>
                      {params.InputProps.startAdornment}
                    </>
                  ),
                  endAdornment: null,
                }}
              />
            )}
            renderTags={() =>
              LEAD_STATUS_TAG?.map((option, index) => (
                <Chip
                  key={index}
                  label={option?.title}
                  sx={{
                    borderRadius: '8px',
                    margin: '2px',
                    height: '24px',
                    fontSize: '13px',
                    fontWeight: 500,
                    bgcolor: option?.color,
                    color: '#fff',
                    '& .MuiChip-deleteIcon': {
                      color: '#fff',
                      fontSize: '18px',
                      '&:hover': {
                        color: '#ffffff90',
                      },
                    },
                  }}
                />
              ))
            }
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Autocomplete
            multiple
            fullWidth
            limitTags={2}
            id="tags"
            value={value}
            onChange={(_, newValue) => {
              setValue([...fixedOptions, ...newValue.filter((option) => !fixedOptions.includes(option))])
            }}
            options={LEAD_TAG}
            getOptionLabel={(option) => option?.title}
            defaultValue={[LEAD_TAG[0]]}
            renderValue={(values, getItemProps) =>
              values?.map((option, index) => {
                const { key, ...itemProps } = getItemProps({ index })
                return (
                  <Chip
                    key={key}
                    label={option?.title}
                    {...itemProps}
                    sx={{
                      borderRadius: '8px',
                      margin: '2px',
                      height: '24px',
                      fontSize: '13px',
                      fontWeight: 500,
                      bgcolor: option?.color,
                      color: '#fff',
                      '& .MuiChip-deleteIcon': {
                        color: '#fff',
                        fontSize: '18px',
                        '&:hover': {
                          color: '#ffffff90',
                        },
                      },
                    }}
                  />
                )
              })
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                placeholder="Виберіть теги"
                InputLabelProps={{
                  sx: {
                    color: '#718096',
                    fontSize: 14,
                    transform: 'none',
                    position: 'relative',
                    '&.Mui-focused': {
                      color: '#718096 !important',
                    },
                  },
                }}
                label="Теги"
                sx={{
                  '& .MuiInput-root': {
                    borderBottom: '1px solid #E2E8F0',
                    '&:before, &:after': {
                      display: 'none',
                    },
                  },
                  '& label + .MuiInput-root': {
                    marginTop: '0px',
                  },
                }}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <>
                      <InputAdornment position="start">
                        <TagOutlinedIcon sx={{ color: '#A0AEC0' }} />
                      </InputAdornment>
                      {params.InputProps.startAdornment}
                    </>
                  ),
                }}
              />
            )}
          />
        </Box>

        <FormField label="Як дізнався про клініку" value="Facebook" icon={<AddLocationOutlinedIcon />} />

        <FormField label="Джерела лідів" value="Телефонний дзвінок" icon={<SearchOutlinedIcon />} />

        <FormField label="Причина відмови" value="Дорого" icon={<WarningAmberOutlinedIcon />} />
      </Stack>

      <Button
        variant="contained"
        // onClick={onClick}
        sx={{
          bgcolor: '#7B3FF2',
          color: '#fff',
          width: 'fit-content',
          textTransform: 'uppercase',
          fontWeight: 500,
          fontSize: '14px',
          '&:hover': {
            bgcolor: '#6930c3',
          },
        }}>
        {t('leadInfoTEditButton')}
      </Button>

      {/* System Info Section */}
      <Box>
        <Accordion
          sx={{
            boxShadow: 'none',
          }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              padding: 0,
            }}>
            <Typography variant="h6" sx={{ fontWeight: 600, paddingLeft: 1 }}>
              {t('leadInfoSystemTitle')}
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              padding: 0,
            }}>
            <Stack spacing={2}>
              <FormField isDisabled label="Хто створив" value="ПІБ" disableIcon />
              <Box sx={{ display: 'flex', gap: 2 }}>
                <FormField isDisabled label="Дата створення" value="20.10.2024 13:45" disableIcon />
                <FormField isDisabled label="Дата запису" value="20.10.2024 13:45" disableIcon />
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <FormField isDisabled label="Остання активність" value="20.10.2024 13:45" disableIcon />
                <FormField isDisabled label="Час за який зв'язалися з лідом" value="14:20" disableIcon />
              </Box>
              {/* UTM Fields */}
              {[
                'Referral',
                'UTM_campaign',
                'UTM_content',
                'UTM_source',
                'UTM_term',
                'UTM_medium',
                'IP адрес',
                'Page_Order',
              ]?.map((label) => (
                <FormField
                  isDisabled
                  key={label}
                  label={label}
                  value={label === 'Referral' ? '-' : 'user@gmail.com'}
                  disableIcon
                />
              ))}
            </Stack>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Paper>
  )
}
