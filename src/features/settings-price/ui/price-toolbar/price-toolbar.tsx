import { Box, Button, useMediaQuery, useTheme } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { SearchField } from '../../../../shared/components/ui/search-field'
import PencilIcon from '../../../../shared/assets/icons/pencil.svg?react'
import ChevronIcon from '../../../../shared/assets/icons/chevron.svg?react'

interface PriceToolbarProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  onAddSection: () => void
}

export function PriceToolbar({ searchQuery, onSearchChange, onAddSection }: PriceToolbarProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: 'space-between' }}>
      <Box sx={{ display: 'flex', gap: 1 }}>
        {!isMobile ? <SearchField value={searchQuery} onChange={onSearchChange} fullWidth={false} /> : null}
        <Button
          variant="outlined"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: 'auto',
            minHeight: 'auto',
            p: '4px 10px',
          }}>
          <PencilIcon />
        </Button>
        <Button
          variant="outlined"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: 'auto',
            minHeight: 'auto',
            p: '4px 10px',
          }}>
          <ChevronIcon style={{ transform: 'rotate(90deg)' }} />
        </Button>
        <Button
          variant="outlined"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: 'auto',
            minHeight: 'auto',
            p: '4px 10px',
          }}>
          <ChevronIcon style={{ transform: 'rotate(270deg)' }} />
        </Button>
      </Box>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={onAddSection}
        sx={{ borderRadius: 2, textTransform: 'uppercase' }}>
        {isMobile ? 'Додати' : 'ДОДАТИ РОЗДІЛ ПРАЙСУ'}
      </Button>
    </Box>
  )
}
