import React from 'react'
import { Box, Typography } from '@mui/material'
import type { Payment } from '../../model'

interface BalanceListProps {
  payments: Payment[]
}

export const BalanceList: React.FC<BalanceListProps> = ({ payments }) => {
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
          Баланс
        </Typography>
      </Box>
      <Box>
        {payments?.map((payment, index) => (
          <Box
            key={payment.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: 1,
              bgcolor: index % 2 === 0 ? '#fff' : '#f5f7fe',
              height: 46,
            }}>
            <Typography variant="body1">{payment.balance.toLocaleString()}</Typography>
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
        Баланс: {payments.reduce((sum, payment) => sum + payment.balance, 0).toFixed(2)}
      </Typography>
    </Box>
  )
}
