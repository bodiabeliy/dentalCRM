import React from 'react'
import { Box, Typography, IconButton, Chip } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import type { WriteOff } from '../../model'

interface WriteOffsListProps {
  writeOffs: WriteOff[]
}

export const WriteOffsList: React.FC<WriteOffsListProps> = ({ writeOffs }) => {
  const getSourceColor = (source: string) => {
    switch (source) {
      case 'main_warehouse':
        return { bgcolor: '#303f9f', color: '#fff' }
      case 'cash_register':
        return { bgcolor: '#00796b', color: '#fff' }
      default:
        return { bgcolor: '#666', color: '#fff' }
    }
  }

  const getSourceText = (source: string) => {
    switch (source) {
      case 'main_warehouse':
        return 'Головний Склад'
      case 'cash_register':
        return 'Каса готівка осн'
      default:
        return source
    }
  }

  const getStatusIcon = (source: string) => {
    switch (source) {
      case 'main_warehouse':
        return (
          <Box
            sx={{
              width: 16,
              height: 16,
              borderRadius: '50%',
              border: '2px solid #0031bf',
              bgcolor: '#0031bf',
            }}
          />
        )
      case 'cash_register':
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
              width: 16,
              height: 16,
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
        Списання
      </Typography>
      <Box
        sx={{
          bgcolor: '#f5f5f5',
          p: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}>
        <Typography
          variant="body1"
          sx={{
            minWidth: 100,
            fontSize: 14,
            fontWeight: 500,
          }}>
          Дата
        </Typography>
        <Box sx={{ minWidth: 16 }} />
        <Typography
          variant="body1"
          sx={{
            minWidth: 110,
            fontWeight: 500,
            fontSize: 14,
          }}>
          Сумма
        </Typography>
        <Typography
          variant="body1"
          sx={{
            minWidth: 100,
            fontWeight: 500,
            fontSize: 14,
          }}>
          Акт
        </Typography>
        <Typography
          variant="body1"
          sx={{
            minWidth: 80,
            fontWeight: 500,
            fontSize: 14,
          }}>
          Джерело
        </Typography>
        <Box sx={{ minWidth: 40 }} />
      </Box>
      <Box sx={{ borderRadius: 1 }}>
        {writeOffs.map((writeOff, index) => (
          <Box
            key={writeOff.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              p: 1,
              bgcolor: index % 2 === 0 ? '#fff' : '#f5f7fe',
              '&:hover': { bgcolor: '#f5f5f5' },
            }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
              <Typography variant="body1" sx={{ minWidth: 100 }}>
                {writeOff.date}
              </Typography>
              <Box sx={{ minWidth: 16, display: 'flex', justifyContent: 'center' }}>
                {getStatusIcon(writeOff.source)}
              </Box>
              <Typography variant="body1" sx={{ minWidth: 80 }}>
                {writeOff.amount.toFixed(2)}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  minWidth: 80,
                  color: '#0029d9',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                }}>
                {writeOff.actNumber}
              </Typography>
              <Chip
                label={getSourceText(writeOff.source)}
                size="small"
                sx={{
                  ...getSourceColor(writeOff.source),
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
        ))}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            px: 1,
            pt: 2,
          }}>
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: 14,
              lineHeight: '171%',
              letterSpacing: '0.01em',
              color: '#0029d9',
            }}>
            Списано: {writeOffs.reduce((sum, writeOff) => sum + writeOff.amount, 0).toLocaleString()}.00
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
