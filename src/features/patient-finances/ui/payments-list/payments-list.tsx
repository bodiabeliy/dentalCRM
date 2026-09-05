import React from 'react'
import { Box, Typography, IconButton } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import type { Payment } from '../../model'
import { PaymentIcon } from '../payment-icon'

interface PaymentsListProps {
  payments: Payment[]
}

export const PaymentsList: React.FC<PaymentsListProps> = ({ payments }) => {
  return (
    <Box>
      <Box
        sx={{
          bgcolor: '#f5f5f5',
          p: 2,
        }}>
        <Typography
          sx={{
            fontWeight: 500,
            fontSize: 14,
            lineHeight: '171%',
            letterSpacing: '0.01em',
            color: 'rgba(21, 22, 24, 0.87)',
          }}>
          Платежі
        </Typography>
      </Box>
      <Box sx={{}}>
        {payments.map((payment, index) => (
          <Box
            key={payment.id}
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr auto 1fr auto',
              alignItems: 'center',
              gap: 2,
              p: 1,
              bgcolor: index % 2 === 0 ? '#fff' : '#f5f7fe',
              cursor: 'pointer',
              '&:hover': { bgcolor: '#f5f5f5' },
              position: 'relative',
            }}>
            <Typography variant="body1">{payment.date}</Typography>
            <Typography variant="body1">{payment.amount.toFixed(2)}</Typography>
            <PaymentIcon icon={payment.icon} />
            <Typography variant="body1">{payment.type}</Typography>
            <IconButton size="small">
              <MoreVertIcon fontSize="small" />
            </IconButton>
          </Box>
        ))}
      </Box>
      <Typography
        sx={{
          fontWeight: 500,
          fontSize: 14,
          lineHeight: '171%',
          letterSpacing: '0.01em',
          color: '#0029d9',
          textAlign: 'right',
        }}>
        Оплачено: {payments.reduce((sum, payment) => sum + payment.amount, 0).toLocaleString()}
      </Typography>
    </Box>
  )
}
