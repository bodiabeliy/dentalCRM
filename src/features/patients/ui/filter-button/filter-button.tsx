import { Button, Badge } from '@mui/material'
import { FilterList, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'

interface FilterButtonProps {
  activeFilters: number
  isExpanded: boolean
  onClick: () => void
}

export function FilterButton({ activeFilters, isExpanded, onClick }: FilterButtonProps) {
  return (
    <Button
      variant="outlined"
      onClick={onClick}
      startIcon={<FilterList />}
      endIcon={isExpanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
      sx={{
        textTransform: 'uppercase',
        fontSize: '14px',
        px: 2,
        py: 1,
        position: 'relative',
      }}>
      ФІЛЬТР
      {activeFilters > 0 && (
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
      )}
    </Button>
  )
}
