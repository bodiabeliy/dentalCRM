import { Accordion, AccordionSummary, AccordionDetails, Typography, IconButton, Box } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import ChevronIcon from '../../../../shared/assets/icons/chevron.svg?react'
import type { NomenclatureSection } from '../../model/types'

interface NomenclatureAccordionProps {
  section: NomenclatureSection
  expanded: boolean
  onToggle: (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => void
  children: React.ReactNode
}

export function NomenclatureAccordion({ section, expanded, onToggle, children }: NomenclatureAccordionProps) {
  return (
    <Accordion
      sx={{
        my: 1,
        borderRadius: 2,
        border: `1px solid ${section.textColor}`,
        borderTop: 'none',
      }}
      expanded={expanded}
      onChange={onToggle(section.id)}>
      <AccordionSummary
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: section.color,
          borderTop: `1px solid ${section.textColor}`,
          borderRadius: 2,
          '& .Mui-expanded': {
            m: 0,
          },
        }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <DragHandleIcon
            sx={{
              color: section.textColor,
              mr: 4,
              cursor: 'grab',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                transform: 'scale(1.1)',
                filter: 'brightness(1.2)',
              },
              '&:active': {
                cursor: 'grabbing',
                transform: 'scale(0.95)',
              },
            }}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Typography variant="body1" sx={{ flexGrow: 1, color: section.textColor, fontWeight: 500, fontSize: 14 }}>
              {section.name}
            </Typography>
            <ChevronIcon
              style={{
                color: section.textColor,
                width: 24,
                height: 24,
                transform: expanded ? 'rotate(270deg)' : 'rotate(90deg)',
              }}
            />
          </Box>
        </Box>
        <IconButton size="small" style={{ marginLeft: 'auto' }}>
          <MoreVertIcon sx={{ color: section.textColor }} />
        </IconButton>
      </AccordionSummary>
      <AccordionDetails sx={{ p: 0 }}>{children}</AccordionDetails>
    </Accordion>
  )
}
