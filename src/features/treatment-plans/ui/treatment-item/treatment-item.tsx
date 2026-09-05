import { Box, Typography, IconButton, Input, InputAdornment } from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'
import StatusIcon from '../../../../shared/assets/icons/status.svg?react'

interface TreatmentItemProps {
  name: string
  quantity: number
  price: number
  statusColor: string
  onDelete: () => void
  isDiscount: boolean
}

export function TreatmentItem({ name, quantity, price, statusColor, onDelete, isDiscount }: TreatmentItemProps) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: isDiscount ? '24px 1fr 40px 60px 80px 24px' : '24px 1fr 40px 80px 24px',
          sm: isDiscount ? '32px 1fr 48px 60px 100px 32px' : '32px 1fr 48px 100px 32px',
        },
        alignItems: 'center',
        mb: 1,
        px: { xs: 1, sm: 2 },
        borderBottom: '1px solid #eee',
        minHeight: { xs: 32, sm: 36 },
        gap: { xs: 1, sm: 2 },
      }}>
      <Box sx={{ pl: { xs: 0.5, sm: 1 }, display: 'flex', alignItems: 'center' }}>
        <StatusIcon style={{ color: statusColor }} />
      </Box>
      <Typography variant="body2" sx={{ fontSize: { xs: 12, sm: 14 } }}>
        {name}
      </Typography>
      <Typography variant="body2" sx={{ textAlign: 'right', fontSize: { xs: 12, sm: 14 } }}>
        {quantity}
      </Typography>
      {isDiscount && (
        <Input
          type="number"
          sx={{
            '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
              opacity: 0,
              transition: 'opacity 0.2s',
            },
            '&:focus-within input::-webkit-outer-spin-button, &:focus-within input::-webkit-inner-spin-button': {
              opacity: 1,
            },
            '& input[type=number]': {
              MozAppearance: 'textfield',
            },
            '& input[type=number]:focus': {
              MozAppearance: 'auto',
            },
          }}
          endAdornment={<InputAdornment position="end">%</InputAdornment>}
        />
      )}
      <Typography variant="body2" sx={{ textAlign: 'right', fontSize: { xs: 12, sm: 14 } }}>
        ₴ {price.toFixed(2)}
      </Typography>
      <IconButton size="small" onClick={onDelete}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </Box>
  )
}
