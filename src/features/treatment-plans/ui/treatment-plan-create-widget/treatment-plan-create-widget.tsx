import {
  Box,
  Typography,
  Button,
  IconButton,
  Radio,
  RadioGroup,
  FormControlLabel,
  useMediaQuery,
  useTheme,
  Dialog,
  DialogContent,
} from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'
import { useState } from 'react'
import { VisitCard } from '../visit-card'
import { TreatmentCategoryAccordion } from '../treatment-category-accordion'
import { SearchField } from '../../../../shared/components'
import ChevronIcon from '../../../../shared/assets/icons/chevron.svg?react'
import PlusIcon from '../../../../shared/assets/icons/plus.svg?react'
import type { TeethChartType } from '../../../../shared/ui/teeth-chart/teeth-chart'

const timeOptions = [
  { label: 'днів', value: 'days' },
  { label: 'годин', value: 'hours' },
  { label: 'хвилин', value: 'minutes' },
]

const treatmentCategories = [
  {
    id: 'prepare',
    title: 'Підготовка до протезування',
    color: '#ff8f00',
    items: [
      { name: 'Ортодонтичне лікування', price: 2500, statusColor: '#ff8f00' },
      { name: 'Синусліфтинг / Кісткова аугментація', price: 2500, statusColor: '#ff8f00' },
      { name: 'Імплантація', price: 2500, statusColor: '#ff8f00' },
      { name: 'Розкриття імплантів', price: 2500, statusColor: '#ff8f00' },
    ],
  },
  {
    id: 'inspection',
    title: 'Обстеження',
    color: '#001acf',
    items: [
      { name: 'Ортодонтичне лікування', price: 2500, statusColor: '#001acf' },
      { name: 'Синусліфтинг / Кісткова аугментація', price: 2500, statusColor: '#001acf' },
      { name: 'Імплантація', price: 2500, statusColor: '#001acf' },
      { name: 'Розкриття імплантів', price: 2500, statusColor: '#001acf' },
    ],
  },
  {
    id: 'prophylaxis',
    title: 'Профілактика',
    color: '#00838f',
    items: [],
  },
  {
    id: 'caries',
    title: 'Лікування карієсу/реставрації',
    color: '#d84315',
    items: [],
  },
  {
    id: 'endodontics',
    title: 'Ендодонтія',
    color: '#2e7d32',
    items: [],
  },
  {
    id: 'surgery',
    title: 'Хірургія',
    color: '#ad1457',
    items: [],
  },
  {
    id: 'orthopedics',
    title: 'Ортопедія',
    color: '#6a1b9a',
    items: [],
  },
]

const mockTreatments = [
  { id: '1', name: 'Ортодонтичне лікування', quantity: 25, price: 250, statusColor: '#ff8f00' },
  { id: '2', name: 'Імплантація', quantity: 25, price: 2500, statusColor: '#001acf' },
  { id: '3', name: 'Розкриття імплантів', quantity: 25, price: 2500, statusColor: '#001acf' },
]

interface TreatmentCategoryProps {
  items: any[]
  expanded: string[]
  onToggle: (categoryId: string) => void
  onTreatmentSelect?: (treatment: any) => void
}

interface TreatmentPlanCreateWidgetProps {
  onClose: () => void
}

export function TreatmentPlanCreateWidget({ onClose }: TreatmentPlanCreateWidgetProps) {
  const [expanded, setExpanded] = useState<string[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [visits, setVisits] = useState([
    {
      id: '1',
      visitNumber: 1,
      visitName: '',
      treatments: mockTreatments,
      timeValue: '',
      timeType: timeOptions[1],
      comment: '',
      teethType: 'tooth' as TeethChartType,
      visitDuration: new Date(2024, 0, 1, 2, 30).getTime() as number | null,
    },
  ])
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'))

  const handleAccordionToggle = (categoryId: string) => {
    setExpanded(
      expanded.includes(categoryId) ? expanded.filter((item) => item !== categoryId) : [...expanded, categoryId]
    )
  }

  const handleDeleteTreatment = (visitId: string, treatmentId: string) => {
    setVisits((prev) =>
      prev?.map((visit) =>
        visit.id === visitId
          ? { ...visit, treatments: visit.treatments.filter((treatment) => treatment.id !== treatmentId) }
          : visit
      )
    )
  }

  const handleTreatmentSelect = (treatment: any) => {
    const newTreatment = {
      id: Date.now().toString(),
      name: treatment.name,
      quantity: 1,
      price: treatment.price,
      statusColor: treatment.statusColor,
    }

    setVisits((prev) => {
      if (prev.length === 0) return prev
      const lastVisit = prev[prev.length - 1]
      return prev?.map((visit) =>
        visit.id === lastVisit.id ? { ...visit, treatments: [...visit.treatments, newTreatment] } : visit
      )
    })
  }

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleAddVisit = () => {
    const newVisit = {
      id: Date.now().toString(),
      visitNumber: visits.length + 1,
      visitName: '',
      treatments: [],
      timeValue: '',
      timeType: timeOptions[1],
      comment: '',
      teethType: 'tooth' as TeethChartType,
      visitDuration: new Date(2024, 0, 1, 2, 30).getTime() as number | null,
    }
    setVisits((prev) => [...prev, newVisit])
  }

  const handleDeleteVisit = (visitId: string) => {
    setVisits((prev) => prev.filter((visit) => visit.id !== visitId))
  }

  const handleVisitNameChange = (visitId: string, name: string) => {
    setVisits((prev) => prev?.map((visit) => (visit.id === visitId ? { ...visit, visitName: name } : visit)))
  }

  const handleVisitUpdate = (visitId: string, updates: Partial<(typeof visits)[0]>) => {
    setVisits((prev) => prev?.map((visit) => (visit.id === visitId ? { ...visit, ...updates } : visit)))
  }

  return (
    <>
      <Box
        sx={{
          position: 'relative',
          p: 0,
          bgcolor: 'transparent',
          borderRadius: 0,
          boxShadow: 'none',
          mt: 0,
        }}>
        <IconButton
          onClick={handleOpen}
          sx={{
            position: 'fixed',
            bottom: 80,
            right: 16,
            bgcolor: '#fff',
            boxShadow: 2,
            zIndex: 1000,
            borderRadius: '50%',
            width: 40,
            height: 40,
            display: isMobile ? 'flex' : 'none',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-label="plus">
          <PlusIcon style={{ width: 18, height: 18 }} />
        </IconButton>
        <IconButton
          onClick={onClose}
          sx={{
            position: 'fixed',
            bottom: 32,
            right: 16,
            bgcolor: '#fff',
            boxShadow: 2,
            zIndex: 1000,
            borderRadius: '50%',
            width: 40,
            height: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-label="close">
          <CloseIcon />
        </IconButton>
        <Box>
          <Box sx={{ display: 'flex', gap: { xs: 2, sm: 3 }, alignItems: 'flex-start' }}>
            <Box sx={{ flex: isMobile ? 1 : 'none', minWidth: isMobile ? 0 : 'auto' }}>
              <Box
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: { xs: 1, sm: 2 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 } }}>
                  <Radio />
                  <Typography
                    sx={{
                      fontWeight: 500,
                      fontSize: { xs: 14, sm: 16 },
                      lineHeight: '150%',
                      letterSpacing: '0.01em',
                      color: 'rgba(21, 22, 24, 0.87)',
                    }}>
                    План лікування
                  </Typography>
                </Box>
                <IconButton>
                  <ChevronIcon style={{ transform: 'rotate(90deg)', width: 24, height: 24 }} />
                </IconButton>
              </Box>
              {visits?.map((visit) => (
                <VisitCard
                  key={visit.id}
                  visitNumber={visit.visitNumber}
                  doctorImage="https://randomuser.me/api/portraits/women/44.jpg"
                  doctorName="Dr. Smith"
                  treatments={visit.treatments}
                  timeValue={visit.timeValue}
                  timeType={visit.timeType}
                  comment={visit.comment}
                  onTimeTypeChange={(type) => handleVisitUpdate(visit.id, { timeType: type })}
                  onTimeValueChange={(value) => handleVisitUpdate(visit.id, { timeValue: value })}
                  onTeethSelect={(type) => handleVisitUpdate(visit.id, { teethType: type })}
                  onCommentChange={(value) => handleVisitUpdate(visit.id, { comment: value })}
                  onDeleteVisit={() => handleDeleteVisit(visit.id)}
                  onDeleteTreatment={(treatmentId) => handleDeleteTreatment(visit.id, treatmentId)}
                  teethType={visit.teethType}
                  visitDuration={visit.visitDuration}
                  onVisitDurationChange={(value) => handleVisitUpdate(visit.id, { visitDuration: value })}
                  visitName={visit.visitName}
                  onVisitNameChange={(name) => handleVisitNameChange(visit.id, name)}
                />
              ))}
              <Button
                variant="contained"
                onClick={handleAddVisit}
                sx={{
                  width: '100%',
                  background: '#7324d5',
                  fontSize: { xs: 12, sm: 14 },
                  py: { xs: 1, sm: 1.5 },
                  px: { xs: 2, sm: 3 },
                }}>
                ДОДАТИ НАСТУПНИЙ ЕТАП
              </Button>
            </Box>
            {!isMobile ? (
              <Box sx={{ flexShrink: 0 }}>
                <TreatmentCategory
                  items={treatmentCategories}
                  expanded={expanded}
                  onToggle={handleAccordionToggle}
                  onTreatmentSelect={handleTreatmentSelect}
                />
              </Box>
            ) : null}
          </Box>
        </Box>
      </Box>
      <Dialog open={isOpen} onClose={handleOpen} fullScreen>
        <DialogContent sx={{ p: 0 }}>
          <TreatmentCategory
            items={treatmentCategories}
            expanded={expanded}
            onToggle={handleAccordionToggle}
            onTreatmentSelect={handleTreatmentSelect}
          />
          <IconButton
            onClick={() => setIsOpen(false)}
            sx={{
              position: 'absolute',
              bottom: 16,
              right: 16,
              bgcolor: '#fff',
              boxShadow: 2,
              zIndex: 1000,
              borderRadius: '50%',
              width: 40,
              height: 40,
            }}>
            <CloseIcon />
          </IconButton>
        </DialogContent>
      </Dialog>
    </>
  )
}

const TreatmentCategory = ({ items, expanded, onToggle, onTreatmentSelect }: TreatmentCategoryProps) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'))
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: isMobile ? 'flex-start' : 'center',
          mb: isMobile ? 0 : 3,
          gap: 2,
          flexDirection: isMobile ? 'column' : 'row',
          p: isMobile ? 2 : 0,
        }}>
        <SearchField placeholder="Пошук" value="" onChange={() => {}} isStartAdornment={false} fullWidth={isMobile} />
        <Box>
          <RadioGroup row defaultValue="price" sx={{ ml: 2 }}>
            <FormControlLabel
              value="price"
              control={<Radio size="small" sx={{ color: '#0029d9', '&.Mui-checked': { color: '#0029d9' } }} />}
              label={<Typography sx={{ fontSize: 15 }}>По прайсу</Typography>}
            />
            <FormControlLabel
              value="template"
              control={<Radio size="small" sx={{ color: '#0029d9', '&.Mui-checked': { color: '#0029d9' } }} />}
              label={<Typography sx={{ fontSize: 15 }}>З шаблонів</Typography>}
            />
          </RadioGroup>
        </Box>
      </Box>
      {items?.map((category) => (
        <TreatmentCategoryAccordion
          key={category.id}
          title={category.title}
          color={category.color}
          items={category.items}
          expanded={expanded.includes(category.id)}
          onToggle={() => onToggle(category.id)}
          onTreatmentSelect={onTreatmentSelect}
        />
      ))}
    </Box>
  )
}
