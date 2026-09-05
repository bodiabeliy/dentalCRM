import React from 'react'
import { Box } from '@mui/material'
import ReceiptIcon from '@mui/icons-material/Receipt'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import AddIcon from '@mui/icons-material/Add'
import InvoiceIcon from '../../../../shared/assets/icons/invoice.svg?react'
import CheckGreenIcon from '../../../../shared/assets/icons/check-green.svg?react'
import PlusIcon from '../../../../shared/assets/icons/plus.svg?react'

interface PaymentIconProps {
  icon: 'receipt' | 'check' | 'add'
  showOverlay?: boolean
}

export const PaymentIcon: React.FC<PaymentIconProps> = ({ icon, showOverlay = true }) => {
  const getIcon = () => {
    switch (icon) {
      case 'receipt':
        return <ReceiptIcon sx={{ fontSize: 16, color: '#666' }} />
      case 'check':
        return <CheckCircleIcon sx={{ fontSize: 16, color: '#2e7d32' }} />
      case 'add':
        return <AddIcon sx={{ fontSize: 16, color: '#1976d2' }} />
      default:
        return <ReceiptIcon sx={{ fontSize: 16, color: '#666' }} />
    }
  }

  if (!showOverlay) {
    return getIcon()
  }

  return (
    <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
      <InvoiceIcon />
      {icon === 'check' && (
        <CheckGreenIcon
          style={{
            position: 'absolute',
            top: 4,
            right: -8,
          }}
        />
      )}
      {icon === 'add' && (
        <PlusIcon
          style={{
            position: 'absolute',
            top: 4,
            right: -8,
            width: 16,
            height: 16,
            color: '#0029d9',
          }}
        />
      )}
    </Box>
  )
}
