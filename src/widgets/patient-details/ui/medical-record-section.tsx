import { Box, Typography } from '@mui/material'
import type { MedicalRecordSection } from '../../../entities/treatment/model/types'

interface MedicalRecordSectionProps {
  sections: MedicalRecordSection
}

const sectionLabels = {
  complaints: 'Скарги:',
  anamnesis: 'Анамнез:',
  objective: 'Об`єктивно:',
  diagnosis: 'Діагноз:',
  treatment: 'Лікування:',
  recommendations: 'Рекомендовано:',
}

export function MedicalRecordSection({ sections }: MedicalRecordSectionProps) {
  return (
    <Box sx={{ background: '#e6e9f7', borderRadius: 1, mt: 2 }}>
      {Object.entries(sections)?.map(([key, value]) => {
        if (!value) return null
        return (
          <Box
            key={key}
            sx={{
              mb: 0.5,
              p: 1,
              display: 'grid',
              gridTemplateColumns: '160px 1fr',
              alignItems: 'center',
              background: '#dee3f7',
              '&:last-child': { mb: 0 },
            }}>
            <Typography
              variant="subtitle2"
              sx={{
                color: 'rgba(21, 22, 24, 0.6)',
                position: 'relative',
                paddingLeft: '24px',
                ':before': {
                  content: '"•"',
                  position: 'absolute',
                  left: '6px',
                  top: '0',
                  color: 'rgba(21, 22, 24, 0.6)',
                },
              }}>
              {sectionLabels[key as keyof typeof sectionLabels]}
            </Typography>
            <Typography variant="body2" sx={{ flex: 1, color: '#151618' }}>
              {value}
            </Typography>
          </Box>
        )
      })}
    </Box>
  )
}
