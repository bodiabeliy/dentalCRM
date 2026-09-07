import React, { useState } from 'react'
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, Checkbox, IconButton } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ScienceIcon from '../../../../shared/assets/icons/science.svg?react'
import type { Act, Detail } from '../../model'
import { StatusIcon } from '../status-icon'
import { SupplierOrderModal } from './supplier-order-modal'

interface ActsListProps {
  acts: Act[]
  details: Detail[]
  expandedActs: number[]
  selectedDetails: number[]
  onToggleAct: (actId: number) => void
  onActClick: (act: Act) => void
  onSelectDetail: (id: number) => void
  onSelectAllDetails: (event: React.ChangeEvent<HTMLInputElement>) => void
  toggle?: boolean
}

export const ActsList: React.FC<ActsListProps> = ({
  acts,
  details,
  expandedActs,
  selectedDetails,
  onToggleAct,
  onActClick,
  onSelectDetail,
  onSelectAllDetails,
  toggle = false,
}) => {
  const [isFinancialModalOpen, setIsFinancialModalOpen] = useState(false)
  const [selectedAct, setSelectedAct] = useState<Act | null>(null)
  const handleOpenFinancialModal = (act: Act, event: React.MouseEvent) => {
    event.stopPropagation()
    setSelectedAct(act)
    setIsFinancialModalOpen(true)
  }

  const handleCloseFinancialModal = () => {
    setIsFinancialModalOpen(false)
    setSelectedAct(null)
  }

  const getBorderColor = (index: number) => {
    if (!toggle) return 'transparent'

    const colors = ['#ff9800', '#4caf50', '#4caf50', '#ffeb3b']
    return colors[index % colors.length]
  }

  console.log(selectedAct)

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
          Акти виконаних робіт
        </Typography>
      </Box>
      <Box sx={{ borderRadius: 1 }}>
        {acts?.map((act, index) => (
          <Box key={act.id}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                p: 1,
                bgcolor: index % 2 === 0 ? '#fff' : '#f5f7fe',
                cursor: 'pointer',
                '&:hover': { bgcolor: '#f5f5f5' },
                position: 'relative',
              }}
              onClick={(event) => {
                event.stopPropagation()
                onActClick(act)
              }}>
              {toggle && (
                <Box
                  sx={{
                    position: 'absolute',
                    left: 32,
                    top: 0,
                    bottom: 0,
                    width: 4,
                    background: getBorderColor(index),
                  }}
                />
              )}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
                <Box
                  onClick={(event) => {
                    event.stopPropagation()
                    onToggleAct(act.id)
                  }}
                  sx={{ cursor: 'pointer' }}>
                  {expandedActs.includes(act.id) ? (
                    <ExpandLessIcon sx={{ fontSize: 20, color: '#666' }} />
                  ) : (
                    <ExpandMoreIcon sx={{ fontSize: 20, color: '#666' }} />
                  )}
                </Box>
                <Typography variant="body1" sx={{ minWidth: 100 }}>
                  {act.date}
                </Typography>
                <Typography variant="body1" sx={{ minWidth: 60 }}>
                  {act.number}
                </Typography>
                {act.tags?.map((tag, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      bgcolor: '#7324d5',
                      color: '#fff',
                      borderRadius: 2,
                      padding: 1,
                      fontSize: 14,
                    }}>
                    {tag}
                  </Box>
                ))}
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <StatusIcon status={act.statusIcon} />
                <Typography variant="body1">{act.amount.toFixed(2)}</Typography>
                <IconButton
                  size="small"
                  onClick={(event) => {
                    event.stopPropagation()
                  }}>
                  <MoreVertIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
            {expandedActs.includes(act.id) && (
              <Box>
                <Table size="small" sx={{ width: '100%', tableLayout: 'auto' }}>
                  <TableHead>
                    <TableRow
                      sx={{
                        background: '#ebebeb',
                      }}>
                      <TableCell padding="checkbox" sx={{ width: 50, minWidth: 50 }}>
                        <Checkbox
                          indeterminate={selectedDetails.length > 0 && selectedDetails.length < details.length}
                          checked={selectedDetails.length === details.length}
                          onChange={onSelectAllDetails}
                        />
                      </TableCell>
                      <TableCell sx={{ fontWeight: 500, border: 'none', width: 'auto', minWidth: 60 }}>Зона</TableCell>
                      <TableCell sx={{ fontWeight: 500, border: 'none', width: 'auto', minWidth: 120 }}>
                        Робота
                      </TableCell>
                      <TableCell sx={{ fontWeight: 500, border: 'none', width: 'auto', minWidth: 80 }}>Ціна</TableCell>
                      <TableCell sx={{ fontWeight: 500, border: 'none', width: 'auto', minWidth: 80 }}>
                        Знижка
                      </TableCell>
                      <TableCell sx={{ fontWeight: 500, border: 'none', width: 'auto', minWidth: 60 }}>К-сть</TableCell>
                      <TableCell sx={{ fontWeight: 500, border: 'none', width: 'auto', minWidth: 80 }}>Сума</TableCell>
                      <TableCell sx={{ fontWeight: 500, border: 'none', width: 'auto', minWidth: 80 }}>
                        Оплачено
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {details?.map((d) => (
                      <TableRow key={d.id}>
                        <TableCell
                          sx={{
                            border: 'none',
                          }}
                          padding="checkbox">
                          <Checkbox checked={selectedDetails.includes(d.id)} onChange={() => onSelectDetail(d.id)} />
                        </TableCell>
                        <TableCell
                          sx={{
                            border: 'none',
                          }}>
                          {d.zone}
                        </TableCell>
                        <TableCell
                          sx={{
                            border: 'none',
                          }}>
                          {d.work}
                        </TableCell>
                        <TableCell
                          sx={{
                            border: 'none',
                          }}>
                          {d.price}
                        </TableCell>
                        <TableCell
                          sx={{
                            border: 'none',
                          }}>
                          {d.discount}
                        </TableCell>
                        <TableCell
                          sx={{
                            border: 'none',
                          }}>
                          {d.qty}
                        </TableCell>
                        <TableCell
                          sx={{
                            border: 'none',
                          }}>
                          {d.sum.toLocaleString()}
                        </TableCell>
                        <TableCell
                          sx={{
                            border: 'none',
                          }}>
                          {d.paid.toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, px: 2 }}>
                  <IconButton
                    onClick={(event) => handleOpenFinancialModal(act, event)}
                    sx={{
                      background: '#f5f7fe',
                      borderRadius: '8px',
                      border: '1px solid rgba(0, 41, 217, 0.3)',
                    }}>
                    <ScienceIcon style={{ color: '#7324d5' }} />
                  </IconButton>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Typography
                      sx={{
                        fontWeight: 500,
                        fontSize: 14,
                        lineHeight: '171%',
                        letterSpacing: '0.01em',
                        color: '#0029d9',
                      }}>
                      Прибуток: 250 500.00
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 500,
                        fontSize: 14,
                        lineHeight: '171%',
                        letterSpacing: '0.01em',
                      }}>
                      Витрати: 2 500.00
                    </Typography>
                    <Typography sx={{ fontWeight: 500, fontSize: 14, lineHeight: '171%', letterSpacing: '0.01em' }}>
                      ЗП лікаря: 2 500.00
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
        ))}
        <Typography
          sx={{
            fontWeight: 500,
            fontSize: 14,
            lineHeight: '171%',
            letterSpacing: '0.01em',
            color: '#0029d9',
            textAlign: 'right',
          }}>
          Виконано на: {acts.reduce((sum, act) => sum + act.amount, 0).toLocaleString()}
        </Typography>
      </Box>
      <SupplierOrderModal open={isFinancialModalOpen} onClose={handleCloseFinancialModal} />
    </Box>
  )
}
