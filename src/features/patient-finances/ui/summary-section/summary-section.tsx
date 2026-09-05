import React from 'react'
import { Box, Typography } from '@mui/material'
import type { PatientFinancesSummary } from '../../model'

interface SummarySectionProps {
  summary: PatientFinancesSummary
}

export const SummarySection: React.FC<SummarySectionProps> = ({ summary }) => {
  return (
    <Box sx={{ mt: 2, display: 'grid', gridTemplateColumns: '6fr 3fr 1fr', gap: 2, px: 2 }}>
      <Typography
        sx={{
          fontWeight: 500,
          fontSize: 14,
          lineHeight: '171%',
          letterSpacing: '0.01em',
          color: '#0029d9',
          textAlign: 'right',
        }}>
        Виконано на: {summary.totalCompleted.toLocaleString()}
      </Typography>
      <Typography
        sx={{
          fontWeight: 500,
          fontSize: 14,
          lineHeight: '171%',
          letterSpacing: '0.01em',
          color: '#0029d9',
          textAlign: 'right',
        }}>
        Оплачено: {summary.totalPaid.toLocaleString()}
      </Typography>
      <Typography
        sx={{
          fontWeight: 500,
          fontSize: 14,
          lineHeight: '171%',
          letterSpacing: '0.01em',
          color: '#0029d9',
          textAlign: 'right',
        }}>
        Баланс: {summary.balance.toFixed(2)}
      </Typography>
    </Box>
  )
}
