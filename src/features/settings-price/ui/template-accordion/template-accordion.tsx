import { Accordion, AccordionSummary, AccordionDetails, Typography, Box } from '@mui/material'
import ChevronIcon from '../../../../shared/assets/icons/chevron.svg?react'
import type { PriceSection } from '../../model/types'

interface TemplateAccordionProps {
  section: PriceSection
  expanded: boolean
  onToggle: (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => void
  children: React.ReactNode
}

export function TemplateAccordion({ section, expanded, onToggle, children }: TemplateAccordionProps) {
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
      </AccordionSummary>
      <AccordionDetails sx={{ p: 0 }}>{children}</AccordionDetails>
    </Accordion>
  )
}
