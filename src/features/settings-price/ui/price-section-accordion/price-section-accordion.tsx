import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton,
  Box,
  useMediaQuery,
  useTheme,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import ChevronIcon from '../../../../shared/assets/icons/chevron.svg?react'
import DeleteIcon from '@mui/icons-material/Delete'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import CheckIcon from '@mui/icons-material/Check'
import { useEffect, useState } from 'react'
import StatusIcon from '../../../../shared/assets/icons/status.svg?react'
import { useAppDispatch, useAppSelector } from '../../../../app/providers/store-helpers'
import { clinicRefernciesSelector } from '../../../../app/providers/reducers/ClinicSlice'
import { getClinicRefercies } from '../../../../app/services/ClinicService'
import type { PriceSection } from '../../../../app/providers/types/pricing'
import { removePricing } from '../../../../app/services/PricingService'
import type { IClinicColor } from '../../../../app/providers/types/clinic'

interface PriceSectionAccordionProps {
  section: PriceSection
  expanded: boolean
  onToggle: (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => void
  children: React.ReactNode
  onColorChange?: (sectionId: string, colorHex: string, currentColorId: number) => void
  onNameChange?: (sectionId: string, name: string, currentColorHex: string) => void
  onDelete?: (sectionId: string) => void
  // Drag and drop props
  isDragging?: boolean
  onDragStart?: (e: React.DragEvent) => void
  onDragOver?: (e: React.DragEvent) => void
  onDrop?: (e: React.DragEvent) => void
  onDragEnd?: () => void
}

export function PriceSectionAccordion({
  section,
  expanded,
  onToggle,
  children,
  onColorChange,
  onNameChange,
  onDelete,
  isDragging,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
}: PriceSectionAccordionProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const systemColors = useAppSelector(clinicRefernciesSelector)
  const dispatch = useAppDispatch()

  // State for dropdown menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [colorMenuExpanded, setColorMenuExpanded] = useState(false)

  useEffect(() => {
    dispatch(getClinicRefercies())
  }, [dispatch])

  const open = Boolean(anchorEl)

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation() // Prevent accordion from toggling
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setColorMenuExpanded(false)
  }

  const handleColorClick = () => {
    setColorMenuExpanded(!colorMenuExpanded)
  }

  const handleColorSelect = (colorOption: IClinicColor) => {
    if (onColorChange) {
      // Find the current color ID from systemColors
      const currentColorObj = systemColors.clinicColors?.find((c) => c.color === section.color)
      const currentColorId = currentColorObj?.id ?? 0
      onColorChange(section.id, colorOption.color, currentColorId)
    }
    setColorMenuExpanded(false)
  }

  const handleDeleteClick = () => {
    if (onDelete) {
      dispatch(removePricing(Number(section.id)))
      onDelete(section.id)
    }
    handleMenuClose()
  }

  const handleNameBlur = (e: React.FocusEvent<HTMLElement>) => {
    const newName = e.currentTarget.textContent || ''
    if (onNameChange && newName.trim() && newName !== section.name) {
      onNameChange(section.id, newName.trim(), section.color || '')
    }
  }

  const handleNameKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    // Prevent Enter key from creating new line
    if (e.key === 'Enter') {
      e.preventDefault()
      e.currentTarget.blur()
    }
  }

  return (
    <Accordion
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragEnd={onDragEnd}
      sx={{
        my: 1,
        borderRadius: 2,
        border: `1px solid ${section.color}`,
        opacity: isDragging ? 0.5 : 1,
        cursor: isDragging ? 'grabbing' : 'grab',
        boxShadow: isDragging ? '0 8px 25px rgba(25, 118, 210, 0.3), 0 4px 10px rgba(0,0,0,0.2)' : 'none',
        transition: 'all 0.2s ease-in-out',
        '&::before': {
          display: 'none',
        },
      }}
      expanded={expanded}
      onChange={onToggle(section.id)}>
      <AccordionSummary
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: section.color,
          borderRadius: 2,
          '& .Mui-expanded': {
            m: 0,
          },
          // Override focus styles to prevent background change
          '&.Mui-focusVisible': {
            backgroundColor: section.color,
          },
          '&:focus': {
            backgroundColor: section.color,
          },
          '&:focus-visible': {
            backgroundColor: section.color,
          },
        }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <DragHandleIcon
            onDragStart={(e) => e.preventDefault()} // Prevent dragging from icon itself
            sx={{
              color: section.textColor,
              mr: 4,
              cursor: isDragging ? 'grabbing' : 'grab',
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: isMobile ? 1 : 3 }}>
            <Typography
              contentEditable
              onBlur={handleNameBlur}
              onKeyDown={handleNameKeyDown}
              suppressContentEditableWarning
              variant="body1"
              sx={{
                flexGrow: 1,
                color: section.textColor,
                fontWeight: 500,
                fontSize: 14,
                '&:focus': {
                  outline: '2px solid #0029d9',
                  outlineOffset: '1px',
                  borderRadius: '4px',
                },
              }}>
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
        <IconButton size="small" style={{ marginLeft: 'auto' }} onClick={handleMenuClick}>
          <MoreVertIcon sx={{ color: section.textColor }} />
        </IconButton>
      </AccordionSummary>
      <AccordionDetails sx={{ p: 0 }}>{children}</AccordionDetails>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            minWidth: 200,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
            borderRadius: 2,
            mt: 1,
          },
        }}>
        <MenuItem onClick={handleColorClick} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ListItemIcon>
            <StatusIcon style={{ color: section.color }} />
          </ListItemIcon>
          <ListItemText primary="Колір розділу" />
          {colorMenuExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </MenuItem>
        <Collapse in={colorMenuExpanded}>
          <Box sx={{ p: 2, borderTop: '1px solid #eee' }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 1 }}>
              {systemColors.clinicColors && systemColors.clinicColors.length > 0 ? (
                systemColors.clinicColors?.map((colorOption, index) => (
                  <Box
                    key={colorOption.id || index}
                    onClick={() => handleColorSelect(colorOption)}
                    sx={{
                      width: 32,
                      height: 32,
                      backgroundColor: colorOption.color,
                      borderRadius: 1,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      '&:hover': {
                        transform: 'scale(1.1)',
                        transition: 'transform 0.2s',
                      },
                    }}>
                    {section.color === colorOption.color && <CheckIcon sx={{ color: '#fff', fontSize: 20 }} />}
                  </Box>
                ))
              ) : (
                <Box sx={{ p: 2, textAlign: 'center', color: '#666', gridColumn: '1 / -1' }}>
                  <Typography variant="caption">Завантаження кольорів...</Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Collapse>

        {/* Delete Option */}
        <MenuItem onClick={handleDeleteClick} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ListItemIcon>
            <DeleteIcon sx={{ color: '#666' }} />
          </ListItemIcon>
          <ListItemText primary="Видалити" />
        </MenuItem>
      </Menu>
    </Accordion>
  )
}
