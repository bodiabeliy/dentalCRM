import { Box, Typography, TextField, IconButton } from '@mui/material'
import { Delete } from '@mui/icons-material'
import { useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { uk } from 'date-fns/locale'
import { VisitHeader } from '../visit-header'
import { TreatmentItem } from '../treatment-item'
import { TimeSelector, TeethSelector, TeethChart } from '../../../../shared/ui'
import type { TeethChartType } from '../../../../shared/ui/teeth-chart/teeth-chart'
import { UniversalTimePicker } from '../../../../shared/components'
import PercentIcon from '../../../../shared/assets/icons/percent.svg?react'

interface TreatmentItemData {
  id: string
  name: string
  quantity: number
  price: number
  statusColor: string
}

interface VisitCardProps {
  visitNumber: number
  doctorImage: string
  doctorName: string
  treatments: TreatmentItemData[]
  timeValue: string
  timeType: { label: string; value: string }
  comment: string
  onTimeTypeChange: (type: { label: string; value: string }) => void
  onTimeValueChange: (value: string) => void
  onTeethSelect: (option: TeethChartType) => void
  onCommentChange: (value: string) => void
  onDeleteVisit: () => void
  onDeleteTreatment: (id: string) => void
  teethType: TeethChartType
  visitDuration: number | null
  onVisitDurationChange: (value: number | null) => void
  visitName?: string
  onVisitNameChange?: (name: string) => void
}

export function VisitCard({
  visitNumber,
  doctorImage,
  doctorName,
  treatments,
  timeValue,
  timeType,
  comment,
  onTimeTypeChange,
  onTimeValueChange,
  onTeethSelect,
  onCommentChange,
  onDeleteVisit,
  onDeleteTreatment,
  teethType,
  visitDuration,
  onVisitDurationChange,
  visitName,
  onVisitNameChange,
}: VisitCardProps) {
  const [selectedTeeth, setSelectedTeeth] = useState<string[]>([])
  const totalPrice = treatments.reduce((sum, treatment) => sum + treatment.price * treatment.quantity, 0)
  const [isDiscount, setIsDiscount] = useState(false)

  const handleTeethSelect = (toothId: string) => {
    setSelectedTeeth((prev) => {
      if (prev.includes(toothId)) {
        return prev.filter((id) => id !== toothId)
      } else {
        return [...prev, toothId]
      }
    })
  }

  const handleTeethTypeChange = (option: TeethChartType) => {
    onTeethSelect(option)
    setSelectedTeeth([])
  }

  return (
    <Box sx={{ borderRadius: 2, mb: { xs: 1, sm: 2 }, boxShadow: 1, minWidth: '720px' }}>
      <VisitHeader
        visitNumber={visitNumber}
        doctorImage={doctorImage}
        doctorName={doctorName}
        onDelete={onDeleteVisit}
        visitName={visitName}
        onVisitNameChange={onVisitNameChange}
      />
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, justifyContent: 'space-between', px: { xs: 1, sm: 2 } }}>
        <TimeSelector
          selectedType={timeType}
          onTypeChange={onTimeTypeChange}
          value={timeValue}
          onValueChange={onTimeValueChange}
        />
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={() => setIsDiscount(!isDiscount)}>
            <PercentIcon style={{ color: isDiscount ? '#0029d9' : 'rgba(21, 22, 24, 0.56)' }} />
          </IconButton>
          <TeethSelector onSelect={(option) => handleTeethTypeChange(option as TeethChartType)} />
          <IconButton>
            <Delete />
          </IconButton>
        </Box>
      </Box>
      <TeethChart type={teethType} selectedTeeth={selectedTeeth} onTeethSelect={handleTeethSelect} />
      <Box>
        {treatments.map((treatment) => (
          <TreatmentItem
            key={treatment.id}
            name={treatment.name}
            quantity={treatment.quantity}
            price={treatment.price}
            statusColor={treatment.statusColor}
            onDelete={() => onDeleteTreatment(treatment.id)}
            isDiscount={isDiscount}
          />
        ))}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, mt: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={uk}>
            <UniversalTimePicker
              label="Тривалість візиту"
              value={visitDuration && visitDuration > 0 ? new Date(visitDuration) : null}
              onChange={(value) => onVisitDurationChange(value?.getTime() || null)}
              useUkrainianFormat
              sx={{
                width: { xs: '100%', sm: '200px' },
              }}
            />
          </LocalizationProvider>
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: { xs: 12, sm: 14 },
              lineHeight: '171%',
              letterSpacing: '0.01em',
              color: '#0029d9',
              textAlign: 'right',
              px: { xs: 1, sm: 2 },
              py: { xs: 0.5, sm: 1 },
            }}>
            Ціна візиту: ₴ {totalPrice.toFixed(2)}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ p: { xs: 1, sm: 2 } }}>
        <TextField
          sx={{
            width: '100%',
            backgroundColor: '#f0f0f0',
          }}
          placeholder="Напишіть свій коментар..."
          value={comment}
          onChange={(e) => onCommentChange(e.target.value)}
        />
      </Box>
    </Box>
  )
}
