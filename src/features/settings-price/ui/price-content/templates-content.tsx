import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import { useState, useMemo } from 'react'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import ChevronIcon from '../../../../shared/assets/icons/chevron.svg?react'
import ArrowsIcon from '../../../../shared/assets/arrows.svg?react'
import TrashIcon from '../../../../shared/assets/icons/trash.svg?react'
import MinusIcon from '../../../../shared/assets/icons/minus.svg?react'
import { SearchField } from '../../../../shared/components'
import { TemplateAccordion } from '../template-accordion'
import { TemplateTable } from '../template-table'
import { mockTemplates, mockTemplatesRightSide } from '../../model/mock-data'
import type { PricePosition } from '../../model/types'
import { TeethSelector } from '../../../../shared/ui/teeth-selector'
import { TeethChart } from '../../../../shared/ui/teeth-chart'
import type { TeethChartType } from '../../../../shared/ui/teeth-chart/teeth-chart'

export function TemplatesContent() {
  const [expanded, setExpanded] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [rightSearchQuery, setRightSearchQuery] = useState('')
  const [templates, setTemplates] = useState(mockTemplates)
  const [templatesRightSide, setTemplatesRightSide] = useState(mockTemplatesRightSide)

  const [activeSectionId, setActiveSectionId] = useState<string | null>(templatesRightSide[0]?.id || null)
  const [sectionTeethSelections, setSectionTeethSelections] = useState<
    Record<string, { teethType: TeethChartType; selectedTeeth: string[] }>
  >({})

  const handleAccordionChange = (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? [...expanded, panel] : expanded.filter((item) => item !== panel))
  }

  const handleTeethSelect = (toothId: string, sectionId: string) => {
    if (!sectionId) return

    setActiveSectionId(sectionId)

    setSectionTeethSelections((prev) => {
      const currentSelection = prev[sectionId] || { teethType: 'tooth', selectedTeeth: [] }
      const newSelectedTeeth = currentSelection.selectedTeeth.includes(toothId)
        ? currentSelection.selectedTeeth.filter((id) => id !== toothId)
        : [...currentSelection.selectedTeeth, toothId]

      return {
        ...prev,
        [sectionId]: {
          ...currentSelection,
          selectedTeeth: newSelectedTeeth,
        },
      }
    })
  }

  const handleTeethTypeChange = (newTeethType: TeethChartType, sectionId: string) => {
    if (!sectionId) return

    setSectionTeethSelections((prev) => {
      const currentSelection = prev[sectionId] || { teethType: 'tooth', selectedTeeth: [] }
      return {
        ...prev,
        [sectionId]: {
          ...currentSelection,
          teethType: newTeethType,
        },
      }
    })
  }

  const handleSectionActivate = (sectionId: string) => {
    setActiveSectionId(sectionId)
  }

  const handleLeftSideReorder = (sectionId: string, reorderedPositions: PricePosition[]) => {
    setTemplates((prevTemplates) =>
      prevTemplates.map((section) =>
        section.id === sectionId ? { ...section, positions: reorderedPositions } : section
      )
    )
  }

  const handleRightSideReorder = (sectionId: string, reorderedPositions: PricePosition[]) => {
    setTemplatesRightSide((prevTemplates) =>
      prevTemplates.map((section) =>
        section.id === sectionId ? { ...section, positions: reorderedPositions } : section
      )
    )
  }

  const handleTreatmentSelect = (treatment: PricePosition) => {
    if (!activeSectionId) return

    const newTreatment = {
      id: Date.now().toString(),
      name: treatment.name,
      price: treatment.price,
      cost: treatment.cost,
    }

    setTemplatesRightSide((prev) => {
      const updatedSections = prev.map((section) =>
        section.id === activeSectionId ? { ...section, positions: [...section.positions, newTreatment] } : section
      )
      return updatedSections
    })
  }

  const handleRemoveTreatment = (sectionId: string, treatmentId: string) => {
    setTemplatesRightSide(
      (prev) =>
        prev
          .map((section) =>
            section.id === sectionId
              ? { ...section, positions: section.positions.filter((treatment) => treatment.id !== treatmentId) }
              : section
          )
          .filter((section) => section.positions.length > 0) // Remove empty sections
    )
  }

  const handleAddCategory = () => {
    const newCategoryId = Date.now().toString()
    const newCategory = {
      id: newCategoryId,
      name: 'Нова категорія',
      color: '#e8f5e9',
      textColor: '#1b5e20',
      positions: [],
    }

    setTemplatesRightSide((prev) => [...prev, newCategory])
    setActiveSectionId(newCategoryId)
  }

  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const isMediumScreen = useMediaQuery('(min-width: 800px) and (max-width: 1600px)')
  const isLargeScreen = useMediaQuery('(min-width: 1600px)')

  // Filter templates based on search query (left side)
  const filteredTemplates = useMemo(() => {
    if (!searchQuery.trim()) return templates

    const query = searchQuery.toLowerCase()
    return templates
      .map((section) => ({
        ...section,
        positions: section.positions.filter(
          (position) => position.name.toLowerCase().includes(query) || position.id.toLowerCase().includes(query)
        ),
      }))
      .filter((section) => section.positions.length > 0)
  }, [templates, searchQuery])

  // Filter right side templates based on search query
  const filteredRightTemplates = useMemo(() => {
    if (!rightSearchQuery.trim()) return templatesRightSide

    const query = rightSearchQuery.toLowerCase()
    return templatesRightSide
      .map((section) => ({
        ...section,
        positions: section.positions.filter(
          (position) => position.name.toLowerCase().includes(query) || position.id.toLowerCase().includes(query)
        ),
      }))
      .filter((section) => section.positions.length > 0 || section.name.toLowerCase().includes(query))
  }, [templatesRightSide, rightSearchQuery])

  return (
    <>
      <Box
        sx={{
          display: isSmallScreen ? 'flex' : 'grid',
          flexDirection: isSmallScreen ? 'column' : undefined,
          gridTemplateColumns: isLargeScreen
            ? 'minmax(260px,560px) 60px 1fr'
            : isMediumScreen
              ? '1fr 40px 1.2fr'
              : undefined,
          mt: 2,
          alignItems: 'start',
          mx: isLargeScreen ? 'auto' : 1,
          gap: 2,
          maxWidth: isLargeScreen ? 1400 : '100%',
          width: '100%',
        }}>
        <Box
          sx={{
            boxShadow:
              '0 2px 3px -1px rgba(0, 0, 0, 0.1), 0 1px 12px 0 rgba(0, 0, 0, 0.1), 0 1px 3px 0 rgba(0, 0, 0, 0.05)',
            background: '#fff',
            borderRadius: '16px',
            position: 'relative',
            p: 2,
            height: 'auto',
            mb: isSmallScreen ? 2 : 0,
            width: isSmallScreen ? '100%' : '100%',
            minWidth: isLargeScreen ? 260 : 180,
            maxWidth: isLargeScreen ? 560 : '100%',
            flex: isSmallScreen ? 'unset' : '1 1 auto',
          }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <SearchField
              placeholder="Пошук послуг"
              value={searchQuery}
              onChange={setSearchQuery}
              fullWidth={false}
              sx={{ width: 200 }}
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            {filteredTemplates.length === 0 ? (
              <Box sx={{ p: 2, textAlign: 'center', color: '#666' }}>
                <Typography variant="body2">
                  {searchQuery.trim() ? 'Нічого не знайдено за вашим запитом' : 'Немає доступних послуг'}
                </Typography>
              </Box>
            ) : (
              filteredTemplates.map((section) => (
                <TemplateAccordion
                  key={section.id}
                  section={section}
                  expanded={expanded.includes(section.id)}
                  onToggle={handleAccordionChange}>
                  <TemplateTable
                    positions={section.positions}
                    searchQuery={searchQuery}
                    onPositionsReorder={(reorderedPositions) => handleLeftSideReorder(section.id, reorderedPositions)}
                    onTreatmentSelect={handleTreatmentSelect}
                  />
                </TemplateAccordion>
              ))
            )}
          </Box>
        </Box>
        {isSmallScreen ? (
          <></>
        ) : (
          <Box sx={{ height: '100%', mt: 3, display: 'flex', justifyContent: 'center' }}>
            <ArrowsIcon style={{ color: '#000', fillOpacity: 0.56 }} />
          </Box>
        )}
        <Box
          sx={{
            boxShadow:
              '0 2px 3px -1px rgba(0, 0, 0, 0.1), 0 1px 12px 0 rgba(0, 0, 0, 0.1), 0 1px 3px 0 rgba(0, 0, 0, 0.05)',
            background: '#fff',
            borderRadius: '16px',
            position: 'relative',
            p: 2,
            mt: isSmallScreen ? 2 : 0,
            width: isSmallScreen ? '100%' : '100%',
            minWidth: 0,
            flex: isSmallScreen ? 'unset' : '2 1 0',
          }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 2,
              justifyContent: 'space-between',
              flexWrap: isSmallScreen ? 'wrap' : 'nowrap',
              gap: isSmallScreen ? 1 : 0,
            }}>
            <SearchField
              placeholder="Пошук шаблонів"
              value={rightSearchQuery}
              onChange={setRightSearchQuery}
              fullWidth={false}
              sx={{ width: isSmallScreen ? '100%' : 200, mb: isSmallScreen ? 1 : 0 }}
            />
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddCategory}
              sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 500, width: isSmallScreen ? '100%' : 'auto' }}>
              ДОДАТИ КАТЕГОРІЮ
            </Button>
          </Box>
          <Box>
            {filteredRightTemplates.length === 0 ? (
              <Box sx={{ p: 2, textAlign: 'center', color: '#666' }}>
                <Typography variant="body2">
                  {rightSearchQuery.trim() ? 'Нічого не знайдено за вашим запитом' : 'Немає створених шаблонів'}
                </Typography>
              </Box>
            ) : (
              filteredRightTemplates.map((section) => (
                <Accordion
                  key={section.id}
                  sx={{
                    my: 1,
                    borderRadius: 2,
                    border: `1px solid #0000bf`,
                  }}>
                  <AccordionSummary
                    onClick={() => handleSectionActivate(section.id)}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: '#e8e9fe',
                      borderRadius: 2,
                      cursor: 'pointer',
                      '& .Mui-expanded': {
                        m: 0,
                      },
                    }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 3,
                        width: '100%',
                        justifyContent: 'space-between',
                      }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        <Typography
                          contentEditable
                          variant="body1"
                          sx={{
                            flexGrow: 1,
                            color: '#0000bf',
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
                            color: '#0000bf',
                            width: 24,
                            height: 24,
                            transform: expanded ? 'rotate(270deg)' : 'rotate(90deg)',
                          }}
                        />
                      </Box>
                      <DeleteIcon sx={{ color: '#0000bf' }} />
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails sx={{ p: 0 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                      <TeethSelector
                        onSelect={(option) => {
                          handleTeethTypeChange(option as TeethChartType, section.id)
                        }}
                      />
                      <IconButton>
                        <TrashIcon />
                      </IconButton>
                    </Box>
                    <TeethChart
                      type={sectionTeethSelections[section.id]?.teethType || 'tooth'}
                      selectedTeeth={sectionTeethSelections[section.id]?.selectedTeeth || []}
                      onTeethSelect={(toothId) => handleTeethSelect(toothId, section.id)}
                    />
                    {section.positions.length === 0 ? (
                      <Box sx={{ p: 2, textAlign: 'center', color: '#666' }}>
                        <Typography variant="body2">
                          {activeSectionId === section.id
                            ? 'Оберіть послуги з лівої колонки, щоб додати їх сюди'
                            : 'Клікніть на заголовок секції, щоб активувати її'}
                        </Typography>
                      </Box>
                    ) : (
                      section.positions.map((pos, idx) => (
                        <Box
                          key={pos.id + idx}
                          draggable
                          onDragStart={(e) => {
                            e.dataTransfer.effectAllowed = 'move'
                            e.dataTransfer.setData('text/plain', JSON.stringify({ sectionId: section.id, index: idx }))
                            const dragImage = e.currentTarget.cloneNode(true) as HTMLElement
                            dragImage.style.opacity = '0.8'
                            dragImage.style.transform = 'rotate(5deg)'
                            dragImage.style.boxShadow = '0 8px 25px rgba(0,0,0,0.3)'
                            document.body.appendChild(dragImage)
                            e.dataTransfer.setDragImage(dragImage, 0, 0)
                            setTimeout(() => document.body.removeChild(dragImage), 0)
                          }}
                          onDragOver={(e) => {
                            e.preventDefault()
                            e.currentTarget.style.borderTop = '3px solid #1976d2'
                            e.currentTarget.style.borderBottom = '3px solid #1976d2'
                            e.currentTarget.style.backgroundColor = '#e3f2fd'
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(25, 118, 210, 0.3)'
                          }}
                          onDrop={(e) => {
                            e.preventDefault()
                            e.currentTarget.style.borderTop = 'none'
                            e.currentTarget.style.borderBottom = 'none'
                            e.currentTarget.style.backgroundColor = ''
                            e.currentTarget.style.boxShadow = 'none'

                            const data = e.dataTransfer.getData('text/plain')
                            if (data) {
                              const { sectionId, index: draggedIndex } = JSON.parse(data)
                              if (sectionId === section.id && draggedIndex !== idx) {
                                const reorderedPositions = Array.from(section.positions)
                                const [removed] = reorderedPositions.splice(draggedIndex, 1)
                                reorderedPositions.splice(idx, 0, removed)
                                handleRightSideReorder(section.id, reorderedPositions)
                              }
                            }
                          }}
                          onDragLeave={(e) => {
                            e.currentTarget.style.borderTop = 'none'
                            e.currentTarget.style.borderBottom = 'none'
                            e.currentTarget.style.backgroundColor = ''
                            e.currentTarget.style.boxShadow = 'none'
                          }}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mb: 1,
                            background: idx % 2 === 0 ? '#fff' : '#f5f7fe',
                            '&:last-child td, &:last-child th': { border: 0 },
                            border: 'none',
                            boxShadow: 'none',
                            px: 2,

                            cursor: 'grab',
                            borderRadius: 1,
                            transition: 'all 0.2s ease-in-out',
                            '&:active': {
                              cursor: 'grabbing',
                              transform: 'scale(0.98)',
                            },
                            '&:hover': {
                              backgroundColor: '#f8f9fa',
                              transform: 'translateY(-1px)',
                              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            },
                          }}>
                          <MinusIcon
                            style={{
                              color: '#000',
                              fillOpacity: 0.56,
                              cursor: 'grab',
                              transition: 'all 0.2s ease-in-out',
                            }}
                          />
                          <Typography sx={{ flex: 1, fontSize: 16, ml: 2 }}>{pos.name}</Typography>
                          <Typography sx={{ width: 120, textAlign: 'right', fontSize: 16 }}>
                            {pos.price.toFixed(2)} ₴
                          </Typography>
                          <IconButton
                            size="small"
                            sx={{ ml: 1 }}
                            onClick={() => handleRemoveTreatment(section.id, pos.id)}>
                            <DeleteIcon sx={{ color: '#000', fillOpacity: 0.56 }} />
                          </IconButton>
                        </Box>
                      ))
                    )}
                    <Box sx={{ display: 'flex', alignItems: 'end', pr: 3 }}>
                      <Typography sx={{ fontWeight: 500, fontSize: 14, ml: 'auto' }}>Ціна: ₴ 256 287.00</Typography>
                    </Box>
                    <Box sx={{ p: 2 }}>
                      <TextField
                        variant="filled"
                        size="small"
                        multiline
                        minRows={1}
                        maxRows={3}
                        placeholder="Коментар"
                        sx={{
                          width: '100%',
                          border: 'none',
                          borderRadius: 2,
                          '& .MuiFilledInput-root': {
                            background: '#f0f0f0',
                            border: 'none',
                            borderBottom: 'none',
                          },
                          '& .MuiFilledInput-root:before': {
                            borderBottom: 'none',
                          },
                          '& .MuiFilledInput-root:after': {
                            borderBottom: 'none',
                          },
                          '& .MuiFilledInput-root:hover': {
                            border: 'none',
                          },
                        }}
                      />
                    </Box>
                  </AccordionDetails>
                </Accordion>
              ))
            )}
          </Box>
        </Box>
      </Box>
    </>
  )
}
