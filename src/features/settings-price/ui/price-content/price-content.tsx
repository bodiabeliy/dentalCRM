import { Box, Button, Typography } from '@mui/material'
import { PriceSectionAccordion } from '../price-section-accordion/price-section-accordion'
import { PriceToolbar } from '../price-toolbar/price-toolbar'
import { PriceActionsMenu } from '../price-actions-menu/price-actions-menu'

import { WorkExampleDialog } from '../../../../features/settings-workers/ui/work-example'
import { LinkToProductsDialog } from '../../../../features/settings-workers/ui/link-to-products'
import { ExtendedQuestionsDialog } from '../../../../features/settings-workers/ui/extended-questions-dialog'

import { PricePositionsTable } from '../price-positions-table/price-positions-table'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import SettingsIcon from '../../../../shared/assets/icons/settings_general.svg?react'
import ArtIcon from '../../../../shared/assets/icons/art.svg?react'
import { usePriceSettings } from '../../model'
import { GeneralPriceDetailsDialog } from '../../../../features/settings-workers/ui/general-price-details'
import { PriceDetailsDialog } from '../../../../features/settings-workers/ui/price-details'
import { useState, useMemo, useEffect } from 'react'
import { savePricingSectionColor, getPricingSectionColor } from '../../../../shared/utils/pricingColorStorage'
import type { IPricing, IPricingItem } from '../../../../app/providers/types/pricing'
import { useAppDispatch, useAppSelector } from '../../../../app/providers/store-helpers'
import {
  createPricing,
  getAllPricing,
  updatePricing,
  updatePricePosition,
  createPricePosition,
  removePricePosition,
} from '../../../../app/services/PricingService'
import { pricingListSelector } from '../../../../app/providers/reducers/PricingSlice'
import { clinicRefernciesSelector, clinicSelector } from '../../../../app/providers/reducers/ClinicSlice'
import { getClinicRefercies } from '../../../../app/services/ClinicService'

export function PriceContent() {
  const dispatch = useAppDispatch()
  const pricingList = useAppSelector(pricingListSelector)
  const systemColors = useAppSelector(clinicRefernciesSelector)
  const currentClinic = useAppSelector(clinicSelector)

  const [sections, setSections] = useState<IPricing[]>([])
  const [draggingSectionIndex, setDraggingSectionIndex] = useState<number | null>(null)
  const [dragOverSectionIndex, setDragOverSectionIndex] = useState<number | null>(null)
  const [currentPositionToDelete, setCurrentPositionToDelete] = useState<{
    sectionId: number
    positionIndex: number
  } | null>(null)

  // Returns the color hex for a section, prioritizing localStorage, then server value, then default
  const resolveSectionColor = (sectionId: number, fallbackColorId: number) => {
    const storedColorId = getPricingSectionColor(sectionId)
    const colorId = storedColorId ?? fallbackColorId
    const colorObj = systemColors.clinicColors?.find((color) => color.id === colorId)
    return colorObj?.color || systemColors?.clinicColors?.[0]?.color
  }

  const {
    anchorEl,
    expanded,
    searchQuery,
    openPriceDetailsDialog,
    priceDetails,
    openGeneralPriceDetailsDialog,
    openWorkExampleDialog,
    openLinkToProductsDialog,
    openExtendedQuestionsDialog,
    extendedQuestions,

    setSearchQuery,
    setPriceDetails,
    handleAccordionChange,
    handleMenuOpen,
    handleMenuClose,
    setOpenPriceDetailsDialog,
    setOpenGeneralPriceDetailsDialog,
    setOpenWorkExampleDialog,
    setOpenLinkToProductsDialog,
    setOpenExtendedQuestionsDialog,
    setExtendedQuestions,
  } = usePriceSettings()

  // Custom menu handler to track position context
  const handlePositionMenuOpen = (event: React.MouseEvent<HTMLElement>, sectionId: string, positionIndex: number) => {
    setCurrentPositionToDelete({ sectionId: Number(sectionId), positionIndex })
    handleMenuOpen(event)
  }

  // Fetch pricing data when component mounts or clinic changes
  useEffect(() => {
    dispatch(getAllPricing())
    dispatch(getClinicRefercies())
  }, [dispatch, currentClinic.id, currentClinic.name])

  // Transform server data to component format when pricingList changes
  useEffect(() => {
    if (pricingList && pricingList.length > 0) {
      setSections(pricingList)
    } else {
      // When pricingList is empty, create empty sections array
      setSections([])
    }
  }, [pricingList, systemColors])

  // Create price actions dynamically with delete handler
  const priceActions = [
    {
      label: 'Деталі прайсу',
      Icon: SettingsIcon,
      onClick: () => setOpenGeneralPriceDetailsDialog(true),
    },
    {
      label: 'Приклад роботи',
      Icon: ArtIcon,
      onClick: () => setOpenWorkExampleDialog(true),
    },
    {
      label: 'Видалити',
      Icon: DeleteIcon,
      onClick: () => {
        if (currentPositionToDelete) {
          handleDeletePosition(currentPositionToDelete.sectionId, currentPositionToDelete.positionIndex)
          setCurrentPositionToDelete(null)
          handleMenuClose()
        }
      },
    },
  ]

  // Filter sections based on search query
  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return sections

    const query = searchQuery.toLowerCase()
    return sections
      .map((section) => ({
        ...section,
        items:
          section.items?.filter(
            (item) => item.name.toLowerCase().includes(query) || item.id.toString().toLowerCase().includes(query)
          ) || [],
      }))
      .filter((section) => (section.items && section.items.length > 0) || section.name.toLowerCase().includes(query))
  }, [sections, searchQuery])

  const handleAddSection = async () => {
    const colorId = systemColors?.clinicColors?.[0]?.id

    if (colorId) {
      // Create temporary section for local state
      const tempSection = {
        name: 'НОВИЙ РОЗДІЛ',
        color: Number(colorId),
        order: 1,
      }

      await dispatch(createPricing(tempSection))
    }
  }

  const handleAddPosition = async (sectionId: number) => {
    const newPosition = {
      name: 'Нова позиція',
      price: 0,
      cost: 0,
      executionTime: 0,
      photo: false,
      order: 1,
      color: 1,
      priceQuestions: [],
    }

    await dispatch(createPricePosition(sectionId, newPosition))
  }

  const handlePositionsReorder = (sectionId: number, reorderedPositions: IPricingItem[]) => {
    setSections((prevSections) =>
      prevSections.map((section) => (section.id === sectionId ? { ...section, items: reorderedPositions } : section))
    )
  }

  // Handles color selection for a section and persists it
  const handleSectionColorChange = (sectionId: number, colorHex: string) => {
    const selectedColorObj = systemColors?.clinicColors?.find((color) => color.color === colorHex)
    const newColorId = selectedColorObj?.id

    if (newColorId) {
      // Save the new color to localStorage
      savePricingSectionColor(sectionId, newColorId)

      // Update local state
      setSections((prevSections) =>
        prevSections.map((section) => (section.id === sectionId ? { ...section, color: newColorId } : section))
      )

      // Find the section to update on server
      const section = sections.find((s) => s.id === sectionId)
      if (section) {
        // Send update to server with all required fields
        dispatch(
          updatePricing({
            ...section,
            color: newColorId,
          })
        )
      }
    }
  }

  // Handles section name change with debouncing
  const handleSectionNameChange = (sectionId: number, newName: string, colorHex: string) => {
    const selectedColorObj = systemColors?.clinicColors?.find((color) => color.color === colorHex)

    // Find the section to update
    const section = sections.find((s) => s.id === sectionId)

    if (section && newName.trim() && newName !== section.name) {
      // Update local state immediately for responsive UI
      setSections((prevSections) => prevSections.map((s) => (s.id === sectionId ? { ...s, name: newName.trim() } : s)))

      // Send update to server
      dispatch(updatePricing({ ...section, color: selectedColorObj?.id, name: newName.trim() }))
    }
  }

  const handleDeleteSection = (sectionId: number) => {
    setSections((prevSections) => prevSections.filter((section) => section.id !== sectionId))
  }

  const handleDeletePosition = async (sectionId: number, positionIndex: number) => {
    // Find the section and position
    const section = sections.find((s) => s.id === sectionId)
    if (!section || !section.items || !section.items[positionIndex]) {
      return
    }

    const position = section.items[positionIndex]

    // Ensure id is defined before deleting
    if (!position.id) {
      console.error('Position ID is undefined')
      return
    }

    // Optimistically update local state immediately for responsive UI
    setSections((prevSections) =>
      prevSections.map((s) =>
        s.id === sectionId ? { ...s, items: s.items?.filter((_, idx) => idx !== positionIndex) || [] } : s
      )
    )

    // Call API to delete position (will refresh with getAllPricing)
    await dispatch(removePricePosition(sectionId, position))
  }

  // Handles pricing position update - sends update to server immediately
  const handlePositionUpdate = (sectionId: number, positionIndex: number, updated: Partial<IPricingItem>) => {
    // Find the section and position
    const section = sections.find((s) => s.id === sectionId)
    if (!section || !section.items || !section.items[positionIndex]) {
      return
    }

    const position = section.items[positionIndex]

    // Ensure id is defined before creating updated position
    if (!position.id) {
      console.error('Position ID is undefined')
      return
    }

    const updatedPosition: IPricingItem = {
      id: position.id,
      name: updated.name !== undefined ? updated.name : position.name,
      price: updated.price !== undefined ? updated.price : position.price,
      cost: updated.cost !== undefined ? updated.cost : position.cost,
      executionTime: updated.executionTime !== undefined ? updated.executionTime : (position.executionTime ?? 30),
      photo: updated.photo !== undefined ? updated.photo : (position.photo ?? false),
      order: updated.order !== undefined ? updated.order : (position.order ?? 1),
      color: updated.color !== undefined ? updated.color : (position.color ?? 1),
      priceQuestions: updated.priceQuestions !== undefined ? updated.priceQuestions : (position.priceQuestions ?? []),
    }

    // Update local state immediately for responsive UI
    setSections((prevSections) =>
      prevSections.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              items: s.items.map((item, idx) => (idx === positionIndex ? updatedPosition : item)) || [],
            }
          : s
      )
    )

    // Send update to server with complete data
    dispatch(updatePricePosition(sectionId, updatedPosition))
  }

  // Section drag and drop (same pattern as AddRoleDialog)
  const reorderSections = (list: IPricing[], startIndex: number, endIndex: number) => {
    const result = [...list]
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
  }

  const handleSectionDragStart = (index: number) => (e: React.DragEvent) => {
    setDraggingSectionIndex(index)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', String(index))
  }

  const handleSectionDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleSectionDrop = (index: number) => (e: React.DragEvent) => {
    e.preventDefault()
    const fromStr = e.dataTransfer.getData('text/plain')
    const from = Number(fromStr)
    if (Number.isNaN(from) || from === index) {
      setDraggingSectionIndex(null)
      setDragOverSectionIndex(null)
      return
    }

    // If dragging downward, after removing the source the indices shift by -1
    const targetIndex = from < index ? index - 1 : index
    const reorderedSections = reorderSections(sections, from, targetIndex)
    setSections(reorderedSections)

    setDraggingSectionIndex(null)
    setDragOverSectionIndex(null)
  }

  const handleSectionDragEnd = () => {
    setDraggingSectionIndex(null)
    setDragOverSectionIndex(null)
  }

  return (
    <>
      <PriceToolbar searchQuery={searchQuery} onSearchChange={setSearchQuery} onAddSection={handleAddSection} />
      <Box sx={{ mt: 3 }} onDragOver={handleSectionDragOver}>
        {filteredSections.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center', color: '#666' }}>
            <Typography variant="body1">
              {searchQuery.trim() ? 'Нічого не знайдено за вашим запитом' : 'Немає доступних розділів прайсу'}
            </Typography>
          </Box>
        ) : (
          systemColors?.clinicColors?.[0]?.color &&
          filteredSections.map((section) => {
            // Find original index for drag and drop functionality
            const originalIndex = sections.findIndex((s) => s.id === section.id)
            return (
              <PriceSectionAccordion
                key={section.id}
                section={{
                  id: section.id.toString(),
                  name: section.name,
                  color: resolveSectionColor(section.id, section.color ?? 0),
                  textColor: '#ffffff',
                  positions: (section.items || []).map((item) => ({
                    id: item.id.toString(),
                    name: item.name,
                    price: item.price,
                    cost: item.cost || 0,
                  })),
                }}
                expanded={expanded.includes(section.id.toString())}
                onToggle={handleAccordionChange}
                onColorChange={(sectionId: string, colorHex: string) =>
                  handleSectionColorChange(Number(sectionId), colorHex)
                }
                onNameChange={(sectionId: string, name: string, currentColorHex: string) =>
                  handleSectionNameChange(Number(sectionId), name, currentColorHex)
                }
                onDelete={(sectionId: string) => handleDeleteSection(Number(sectionId))}
                isDragging={draggingSectionIndex === originalIndex}
                onDragStart={handleSectionDragStart(originalIndex)}
                onDragOver={handleSectionDragOver}
                onDrop={handleSectionDrop(originalIndex)}
                onDragEnd={handleSectionDragEnd}>
                <PricePositionsTable
                  positions={section.items || []}
                  onMenuOpen={(event, positionIndex) =>
                    handlePositionMenuOpen(event, section.id.toString(), positionIndex)
                  }
                  onPositionsReorder={(reorderedPositions) => handlePositionsReorder(section.id, reorderedPositions)}
                  onPositionUpdate={(index, updated) => {
                    handlePositionUpdate(section.id, index, updated)
                  }}
                />
                <Box sx={{ px: 2, py: 1 }}>
                  <Button
                    startIcon={<AddIcon />}
                    variant="outlined"
                    sx={{ textTransform: 'none', fontWeight: 500, my: 2 }}
                    size="medium"
                    onClick={() => handleAddPosition(section.id)}>
                    ДОДАТИ ПОЗИЦІЮ ПРАЙСУ
                  </Button>
                </Box>
              </PriceSectionAccordion>
            )
          })
        )}
        {/* Drop zone at the end of the sections list - only show when not searching */}
        {!searchQuery.trim() && (
          <Box
            onDragOver={handleSectionDragOver}
            onDrop={handleSectionDrop(sections.length)}
            sx={{
              height: draggingSectionIndex !== null ? '60px' : '20px',
              border: draggingSectionIndex !== null ? '2px dashed #1976d2' : 'none',
              borderRadius: 2,
              backgroundColor: dragOverSectionIndex === sections.length ? 'rgba(25, 118, 210, 0.1)' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease-in-out',
              mt: 1,
            }}>
            {draggingSectionIndex !== null && (
              <Typography variant="body2" color="textSecondary">
                Перетягніть сюди, щоб розмістити в кінці
              </Typography>
            )}
          </Box>
        )}
      </Box>
      <PriceActionsMenu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose} actions={priceActions} />
      <PriceDetailsDialog
        open={openPriceDetailsDialog}
        onClose={() => setOpenPriceDetailsDialog(false)}
        names={priceDetails}
        onNamesChange={setPriceDetails}
        onSave={() => {}}
      />
      <GeneralPriceDetailsDialog
        open={openGeneralPriceDetailsDialog}
        onClose={() => setOpenGeneralPriceDetailsDialog(false)}
        onSave={() => {}}
        onOpenExtendedQuestions={() => setOpenExtendedQuestionsDialog(true)}
        extendedQuestions={extendedQuestions}
        onExtendedQuestionsChange={setExtendedQuestions}
      />
      <WorkExampleDialog
        open={openWorkExampleDialog}
        onClose={() => setOpenWorkExampleDialog(false)}
        onSave={() => {}}
      />
      <LinkToProductsDialog
        open={openLinkToProductsDialog}
        onClose={() => setOpenLinkToProductsDialog(false)}
        onSave={() => {}}
      />
      <ExtendedQuestionsDialog
        open={openExtendedQuestionsDialog}
        onClose={() => setOpenExtendedQuestionsDialog(false)}
        onSave={(questions) => setExtendedQuestions(questions)}
        existingQuestions={extendedQuestions}
      />
    </>
  )
}
