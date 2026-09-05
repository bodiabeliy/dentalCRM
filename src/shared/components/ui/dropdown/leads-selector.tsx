import { useCallback, useState } from 'react'
import type { FunctionComponent, MouseEvent, ReactNode } from 'react'
import { Button, Menu, MenuItem, ListItemText, Typography, IconButton } from '@mui/material'
import CalendarIcon from '../../../assets/icons/filter-calendar.svg?react'
import type { LeadFilter } from '../../../../features/leads/model/types'
import { useTranslation } from 'react-i18next'
// import { useTranslation } from 'react-i18next'

interface FilterSelectorProps {
  options: LeadFilter[] | []
  selectedFilterOption: LeadFilter | null
  onFilterSelect: (option: LeadFilter) => void
  onClick?: () => void
  isShowKanban?: boolean
  disabled?: boolean
  isMobile?: boolean
  bgcolor?: string
  bodyContent?: ReactNode | string
}

export interface StartIconProps {
  Icon: FunctionComponent<React.SVGProps<SVGSVGElement>>
}
const StartIcon: React.FC<StartIconProps> = (props) => {
  const Temp = props.Icon as React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  return <Temp />
}

export const LeadSelector = ({
  options,
  selectedFilterOption,
  onFilterSelect,
  onClick,
  disabled = false,
  isMobile = false,
  bgcolor = '',
  bodyContent = 'Всі',
}: FilterSelectorProps) => {
  const { t } = useTranslation('leads')

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedOptiion, setSelectedOption] = useState(t('kanbanSelectDefault'))

  const open = Boolean(anchorEl)

  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    if (!disabled) setAnchorEl(event.currentTarget)
  }
  const handleClose = () => setAnchorEl(null)

  const handleFilterOptionSelect = useCallback(
    (option: LeadFilter) => {
      setSelectedOption(option.name)
      onFilterSelect(option)
      if (onClick) onClick()
      handleClose()
    },
    [selectedOptiion]
  )

  return (
    <>
      <Button
        variant="text"
        onClick={handleOpen}
        disabled={disabled}
        sx={{
          borderRadius: '8px',
          bgcolor: bgcolor,
          maxWidth: '160px',
          height: '40px',
          display: 'flex',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
        }}
        startIcon={!isMobile && <CalendarIcon />}>
        {!isMobile ? selectedOptiion : bodyContent}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            bgcolor: '#e0e4f4',
            color: 'white',
            minWidth: 220,
            boxShadow: 3,
            borderRadius: 2,
            mt: 1,
            p: 0,
          },
        }}
        MenuListProps={{ sx: { p: 0 } }}>
        {options.map((option) => (
          <MenuItem
            key={option.id}
            selected={selectedFilterOption?.id === option.id}
            onClick={() => handleFilterOptionSelect(option)}
            sx={{
              bgcolor: 'white',
              px: 2,
              py: 1.2,
              gap: 1,
            }}>
            <IconButton>{option.startIcon ? <StartIcon Icon={option.startIcon} /> : null}</IconButton>
            <ListItemText primary={<Typography>{option.name}</Typography>} />
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
