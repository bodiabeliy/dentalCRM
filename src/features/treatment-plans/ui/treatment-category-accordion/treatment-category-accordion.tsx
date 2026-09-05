import { Accordion, AccordionSummary, AccordionDetails, Box, Typography } from '@mui/material'
import ChevronIcon from '../../../../shared/assets/icons/chevron.svg?react'
import StatusIcon from '../../../../shared/assets/icons/status.svg?react'

interface TreatmentCategoryItem {
  name: string
  price: number
  statusColor: string
}

interface TreatmentCategoryAccordionProps {
  title: string
  color: string
  items: TreatmentCategoryItem[]
  expanded: boolean
  onToggle: () => void
  onTreatmentSelect?: (treatment: TreatmentCategoryItem) => void
}

export function TreatmentCategoryAccordion({
  title,
  color,
  items,
  expanded,
  onToggle,
  onTreatmentSelect,
}: TreatmentCategoryAccordionProps) {
  const handleTreatmentClick = (treatment: TreatmentCategoryItem) => {
    if (onTreatmentSelect) {
      onTreatmentSelect(treatment)
    }
  }

  return (
    <Accordion
      expanded={expanded}
      onChange={onToggle}
      sx={{
        '&.MuiAccordion-gutters.Mui-expanded': {
          padding: 0,
        },
        '&.Mui-expanded': {
          margin: 0,
        },
      }}>
      <AccordionSummary
        sx={{
          background: '#f5f7fe',
          '& .MuiAccordionSummary-content': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          },
        }}>
        <Typography variant="subtitle1" color={color}>
          {title}
        </Typography>
        <ChevronIcon
          style={{
            color: '#000',
            fillOpacity: '0.54',
            width: 24,
            height: 24,
            transform: expanded ? 'rotate(270deg)' : 'rotate(90deg)',
          }}
        />
      </AccordionSummary>
      <AccordionDetails>
        {items.map((item, index) => (
          <Box
            key={index}
            onClick={() => handleTreatmentClick(item)}
            sx={{
              display: 'grid',
              gridTemplateColumns: '32px 1fr 100px',
              alignItems: 'center',
              mb: 1,
              cursor: onTreatmentSelect ? 'pointer' : 'default',
              '&:hover': onTreatmentSelect
                ? {
                    backgroundColor: '#f5f5f5',
                    borderRadius: 1,
                  }
                : {},
              p: onTreatmentSelect ? 1 : 0,
            }}>
            <StatusIcon style={{ color: item.statusColor }} />
            <Typography variant="body2">{item.name}</Typography>
            <Typography variant="body2" textAlign="right">
              ₴ {item.price.toFixed(2)}
            </Typography>
          </Box>
        ))}
      </AccordionDetails>
    </Accordion>
  )
}
