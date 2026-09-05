import { Box, Button, Divider, IconButton } from '@mui/material'
import { FilterList as FilterIcon } from '@mui/icons-material'
import { SearchField } from '../../../../shared/components'
import ArchiveIcon from '../../../../shared/assets/icons/archive.svg?react'

interface ChatFiltersProps {
  onFilterChange?: (filter: string) => void
}

// @ts-ignore
export function ChatFilters({ onFilterChange }: ChatFiltersProps) {
  return (
    <Box sx={{ p: 2, borderBottom: '1px solid #f0f0f0' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <SearchField value="" onChange={() => {}} isStartAdornment={false} sx={{ flex: 1 }} />
        <IconButton
          size="small"
          sx={{
            color: '#0029d9',
            borderRadius: '8px',
            border: '1px solid #0029d9',
            px: 2,
            py: 1,
            fontWeight: 500,
            fontSize: '13px',
            lineHeight: '169%',
            letterSpacing: '0.04em',
          }}>
          <FilterIcon sx={{ fontSize: 18, mr: 0.5 }} />
          ФІЛЬТР
        </IconButton>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Button
          variant="outlined"
          sx={{
            bgcolor: '#e4e8ff',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            border: 'none',
            color: 'rgba(21, 22, 24, 0.87)',
            textTransform: 'none',
            borderRadius: '8px',
            p: 1,
          }}>
          <span>Всі чати</span>
          <span style={{ backgroundColor: '#0029d9', color: '#fff', borderRadius: '8px', padding: '0px 8px' }}>
            350
          </span>
        </Button>
        <Button
          variant="outlined"
          sx={{
            bgcolor: '#fff',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            border: 'none',
            color: 'rgba(21, 22, 24, 0.6)',
            textTransform: 'none',
            borderRadius: '8px',
            p: 1,
          }}>
          <span>Непрочитані</span>
          <span style={{ backgroundColor: '#b9c5fd', color: '#fff', borderRadius: '8px', padding: '0px 8px' }}>20</span>
        </Button>
        <Divider
          orientation="vertical"
          flexItem
          sx={{
            bgcolor: 'rgba(21, 22, 24, 0.12)',
          }}
        />
        <Button
          variant="outlined"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            border: 'none',
            color: 'rgba(21, 22, 24, 0.6)',
            textTransform: 'none',
            borderRadius: '8px',
            p: 1,
          }}>
          <ArchiveIcon style={{ fillOpacity: '0.54', width: '18px', height: '18px' }} />
          <span>Архів</span>
        </Button>
      </Box>
    </Box>
  )
}
