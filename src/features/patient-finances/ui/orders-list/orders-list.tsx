import React from 'react'
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Button,
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import type { Order } from '../../model'
import DownloadIcon from '@mui/icons-material/Download'

interface OrdersListProps {
  orders: Order[]
  expandedOrders: number[]
  onToggleOrder: (orderId: number) => void
  onActNumberClick?: (actNumber: string) => void
}

export const OrdersList: React.FC<OrdersListProps> = ({ orders, expandedOrders, onToggleOrder, onActNumberClick }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_clinic':
        return { bgcolor: '#0031bf', color: '#fff' }
      case 'ordered':
        return { bgcolor: '#2e7d32', color: '#fff' }
      default:
        return { bgcolor: '#666', color: '#fff' }
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'in_clinic':
        return 'В клініці'
      case 'ordered':
        return 'Замовлено'
      default:
        return status
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in_clinic':
        return (
          <Box
            sx={{
              width: 16,
              height: 16,
              borderRadius: '50%',
              border: '2px solid #2e7d32',
              bgcolor: '#fff',
            }}
          />
        )
      case 'ordered':
        return (
          <Box
            sx={{
              width: 16,
              height: 16,
              borderRadius: '50%',
              border: '2px solid #2e7d32',
              bgcolor: '#2e7d32',
            }}
          />
        )
      default:
        return (
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              border: '2px solid #666',
              bgcolor: '#fff',
            }}
          />
        )
    }
  }

  return (
    <Box>
      <Typography
        sx={{
          fontWeight: 400,
          fontSize: 16,
          lineHeight: '175%',
          letterSpacing: '0.01em',
          color: 'rgba(21, 22, 24, 0.87)',
          p: 2,
          pb: 0,
        }}>
        Замовлення у постачальників
      </Typography>
      <Box
        sx={{
          bgcolor: '#f5f5f5',
          p: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}>
        <Box sx={{ minWidth: 20 }} />
        <Box sx={{ minWidth: 16 }} />
        <Typography variant="body1" sx={{ minWidth: 100, textAlign: 'left', fontSize: 14, fontWeight: 500 }}>
          Дата
        </Typography>
        <Typography variant="body1" sx={{ minWidth: 100, textAlign: 'left', fontSize: 14, fontWeight: 500 }}>
          Постачальник
        </Typography>
        <Typography variant="body1" sx={{ minWidth: 100, textAlign: 'left', fontSize: 14, fontWeight: 500 }}>
          Акт пац.
        </Typography>
        <Typography variant="body1" sx={{ minWidth: 100, textAlign: 'left', fontSize: 14, fontWeight: 500 }}>
          Сума
        </Typography>
        <Typography variant="body1" sx={{ minWidth: 100, textAlign: 'left', fontSize: 14, fontWeight: 500 }}>
          Стан
        </Typography>
        <Box sx={{ minWidth: 40 }} />
      </Box>
      <Box sx={{ borderRadius: 1 }}>
        {orders?.map((order, index) => (
          <Box key={order.id}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                p: 1,
                bgcolor: index % 2 === 0 ? '#fff' : '#f5f7fe',
                cursor: 'pointer',
                '&:hover': { bgcolor: '#f5f5f5' },
              }}
              onClick={() => onToggleOrder(order.id)}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
                <Box sx={{ minWidth: 20, display: 'flex', justifyContent: 'center' }}>
                  {expandedOrders.includes(order.id) ? (
                    <ExpandLessIcon sx={{ fontSize: 20, color: '#666' }} />
                  ) : (
                    <ExpandMoreIcon sx={{ fontSize: 20, color: '#666' }} />
                  )}
                </Box>
                <Box sx={{ minWidth: 16, display: 'flex', justifyContent: 'center' }}>
                  {getStatusIcon(order.status)}
                </Box>
                <Typography variant="body1" sx={{ minWidth: 100 }}>
                  {order.date}
                </Typography>
                <Typography variant="body1" sx={{ minWidth: 120 }}>
                  {order.supplier}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    minWidth: 80,
                    color: '#0029d9',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                  }}
                  onClick={(e) => {
                    e.stopPropagation()
                    onActNumberClick?.(order.actNumber.toString())
                  }}>
                  {order.actNumber}
                </Typography>
                <Typography variant="body1" sx={{ minWidth: 80 }}>
                  {order.amount.toFixed(2)}
                </Typography>
                <Chip
                  label={getStatusText(order.status)}
                  size="small"
                  sx={{
                    ...getStatusColor(order.status),
                    fontSize: 14,
                    borderRadius: 2,
                    px: 1,
                    py: 2,
                  }}
                />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, minWidth: 40 }}>
                <IconButton size="small">
                  <MoreVertIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
            {expandedOrders.includes(order.id) && (
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ background: '#ebebeb' }}>
                    <TableCell sx={{ fontWeight: 500, border: 'none', fontSize: 12 }}>Назва позиції</TableCell>
                    <TableCell sx={{ fontWeight: 500, border: 'none', fontSize: 12 }}>К-сть</TableCell>
                    <TableCell sx={{ fontWeight: 500, border: 'none', fontSize: 12 }}>Сума</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.items?.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell sx={{ border: 'none', fontSize: 12 }}>{item.name}</TableCell>
                      <TableCell sx={{ border: 'none', fontSize: 12 }}>{item.quantity}</TableCell>
                      <TableCell sx={{ border: 'none', fontSize: 12 }}>{item.amount.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </Box>
        ))}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, px: 1, pt: 2 }}>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            sx={{
              borderColor: '#7324d5',
              color: '#7324d5',
              textTransform: 'none',
              fontWeight: 500,
            }}>
            СКАЧАТИ ЗАКАЗ-НАРЯД
          </Button>
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: 14,
              lineHeight: '171%',
              letterSpacing: '0.01em',
              color: '#0029d9',
            }}>
            Замовлено загалом: {orders.reduce((sum, order) => sum + order.amount, 0).toLocaleString()}.00
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
