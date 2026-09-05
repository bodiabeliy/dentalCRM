import { Box, Button, Radio, FormControlLabel, RadioGroup, useTheme, useMediaQuery } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { SearchField } from '../../../../shared/components/ui/search-field'
import PencilIcon from '../../../../shared/assets/icons/pencil.svg?react'
import ChevronIcon from '../../../../shared/assets/icons/chevron.svg?react'
import FilterIcon from '../../../../shared/assets/icons/filter.svg?react'

interface NomenclatureToolbarProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  onEditGeneralDetails: () => void
  onAddSection: () => void
}

export function NomenclatureToolbar({
  searchQuery,
  onSearchChange,
  onEditGeneralDetails,
  onAddSection,
}: NomenclatureToolbarProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  return (
    <Box
      sx={{ display: 'flex', alignItems: isMobile ? 'flex-start' : 'center', mb: 2, justifyContent: 'space-between' }}>
      <Box sx={{ display: 'flex', gap: 1, flexDirection: isMobile ? 'column' : 'row' }}>
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            alignItems: 'stretch',
            flexWrap: isMobile ? 'wrap' : 'nowrap',
            height: '100%',
          }}>
          {isMobile ? null : <SearchField value={searchQuery} onChange={onSearchChange} fullWidth={false} />}
          <Button
            variant="outlined"
            onClick={onEditGeneralDetails}
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
            <FilterIcon />
          </Button>
        </Box>
        <RadioGroup sx={{ display: 'flex', alignItems: 'center', gap: 1, flexDirection: 'row', ml: 2 }}>
          <FormControlLabel value="all" control={<Radio />} label="Все" sx={{ mr: 0 }} />
          <FormControlLabel value="active" control={<Radio />} label="Товари" sx={{ mr: 0 }} />
          <FormControlLabel value="inactive" control={<Radio />} label="Послуги" sx={{ mr: 0 }} />
        </RadioGroup>
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
