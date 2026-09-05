import { Badge, Button } from '@mui/material'
import { FilterList, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'

interface FilterButtonProps {
  activeFilters: number
  isExpanded: boolean
  isMobile?: boolean
  height?: number
  onClick: () => void
}

export function FilterButton({ isExpanded, isMobile = false, onClick, activeFilters }: FilterButtonProps) {
  return (
    <Button
      variant="outlined"
      onClick={onClick}
      startIcon={<FilterList />}
      fullWidth={isMobile}
      endIcon={isExpanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
      sx={{
        height: isMobile ? 32 : 'auto',
        alignSelf: 'center',
        borderColor: '#0029d9',
        color: '#0029d9',
        textTransform: 'uppercase',
        fontWeight: 500,
        fontSize: '14px',
        px: 2,
        py: 1,
        position: 'relative',
      }}>
      ФІЛЬТР
      <Badge
        badgeContent={activeFilters}
        sx={{
          position: 'absolute',
          top: 4,
          left: 20,
          '& .MuiBadge-badge': {
            backgroundColor: '#0029d9',
            color: 'white',
            fontSize: '12px',
            fontWeight: 600,
            minWidth: '20px',
            height: '20px',
            borderRadius: '10px',
          },
        }}
      />
    </Button>
  )
}
