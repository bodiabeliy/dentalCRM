import { Box, Typography, Checkbox, IconButton, Radio } from '@mui/material'
import { useState } from 'react'
import type { TreatmentPlan } from '../model/treatment-plans-model'
import SettingsIcon from '../../../shared/assets/icons/settings_general.svg?react'
import { TreatmentPlanCreateWidget } from './treatment-plan-create-widget'

interface TreatmentPlanCardProps {
  plan: TreatmentPlan
  isAgreed: boolean
}

export function TreatmentPlanCard({ plan, isAgreed }: TreatmentPlanCardProps) {
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const completedProcedures = plan.visits.flatMap((visit) => visit.procedures.filter((proc) => proc.completed))
  const completedAmount = completedProcedures.reduce((sum, proc) => sum + proc.price, 0)

  const handleCardClick = () => {
    setIsCreateOpen(true)
  }

  return (
    <>
      {isCreateOpen ? (
        <TreatmentPlanCreateWidget onClose={() => setIsCreateOpen(false)} />
      ) : (
        <Box
          onClick={handleCardClick}
          sx={{
            borderRadius: 2,
            background: 'white',
            height: 'fit-content',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            '&:hover': {
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            },
          }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
            <Box>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 400,
                  fontSize: 12,
                  lineHeight: '100%',
                  letterSpacing: '0.01em',
                }}>
                {plan.date}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 500,
                  fontSize: 14,
                  lineHeight: '171%',
                  letterSpacing: '0.01em',
                  color: isAgreed ? '#0029d9' : 'rgba(21, 22, 24, 0.87)',
                }}>
                {isAgreed ? 'Узгоджений план лікування' : 'План лікування'}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 400,
                  fontSize: 12,
                  lineHeight: '100%',
                  letterSpacing: '0.01em',
                  color: 'rgba(21, 22, 24, 0.6)',
                }}>
                {plan.doctorName}
              </Typography>
            </Box>
            {isAgreed ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Radio
                    checked
                    sx={{
                      p: 0,
                      '&.Mui-checked': {
                        color: '#0029d9',
                      },
                    }}
                  />
                  <IconButton
                    sx={{
                      color: '#666',
                      p: 0,
                    }}>
                    <SettingsIcon width={18} height={18} />
                  </IconButton>
                </Box>
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: 14,
                    lineHeight: '171%',
                    letterSpacing: '0.01em',
                    color: 'rgba(21, 22, 24, 0.87)',
                  }}>
                  Виконано етапів:{' '}
                  <span
                    style={{
                      fontWeight: 500,
                      fontSize: 12,
                      lineHeight: '100%',
                      letterSpacing: '0.01em',
                      textTransform: 'uppercase',
                      textAlign: 'right',
                      color: '#0029d9',
                    }}>
                    3 / 8
                  </span>
                </Typography>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Radio
                    sx={{
                      p: 0,
                      '&.Mui-checked': {
                        color: '#0029d9',
                      },
                    }}
                  />
                  <IconButton
                    sx={{
                      color: '#666',
                      p: 0,
                    }}>
                    <SettingsIcon width={18} height={18} />
                  </IconButton>
                </Box>
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: 14,
                    lineHeight: '171%',
                    letterSpacing: '0.01em',
                    color: 'rgba(21, 22, 24, 0.87)',
                  }}>
                  Етапів:{' '}
                  <span
                    style={{
                      fontWeight: 500,
                      fontSize: 12,
                      lineHeight: '100%',
                      letterSpacing: '0.01em',
                      textTransform: 'uppercase',
                      textAlign: 'right',
                      color: '#0029d9',
                    }}>
                    8
                  </span>
                </Typography>
              </Box>
            )}
          </Box>
          {plan.visits.map((visit) => (
            <Box key={visit.id}>
              <Box
                sx={{
                  background: '#f5f7fe',
                  p: 1,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  border: '1px solid rgba(21, 22, 24, 0.12)',
                  borderLeft: 0,
                  borderRight: 0,
                }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 400,
                    fontSize: 16,
                    lineHeight: '175%',
                    letterSpacing: '0.01em',
                    color: '#7324d5',
                  }}>
                  Візит № {visit.number}
                </Typography>
                <Typography variant="body2">₴ {visit.totalPrice.toLocaleString()}</Typography>
              </Box>
              <Box>
                {visit.procedures.map((procedure, index) => (
                  <Box
                    key={procedure.id}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      py: 2,
                      px: 1,
                      borderBottom: index === visit.procedures.length - 1 ? 'none' : '1px solid rgba(21, 22, 24, 0.12)',
                    }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                      <Checkbox
                        checked={procedure.completed}
                        sx={{
                          p: 0,
                          mr: 1,
                        }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'rgba(21, 22, 24, 0.87)',
                          fontWeight: 400,
                          fontSize: 14,
                          lineHeight: '143%',
                          letterSpacing: '0.01em',
                        }}>
                        {procedure.name}
                      </Typography>
                    </Box>
                    <Typography variant="body2">₴ {procedure.price.toLocaleString()}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
          <Box
            sx={{
              borderTop: '1px solid #e0e0e0',
              py: 2,
              display: 'flex',
              justifyContent: isAgreed ? 'space-between' : 'flex-end',
              alignItems: 'center',
              px: 1,
            }}>
            {isAgreed ? (
              <>
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: 14,
                    lineHeight: '171%',
                    letterSpacing: '0.01em',
                  }}
                  color="#0029d9">
                  Виконано: ₴ {completedAmount.toLocaleString()}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: 14,
                    lineHeight: '171%',
                    letterSpacing: '0.01em',
                    color: 'rgba(21, 22, 24, 0.87)',
                  }}>
                  Залишок: ₴ {(plan.totalPrice - completedAmount).toLocaleString()}
                </Typography>
              </>
            ) : (
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: 14,
                  lineHeight: '171%',
                  letterSpacing: '0.01em',
                  color: 'rgba(21, 22, 24, 0.87)',
                }}>
                Ціна: ₴ {plan.totalPrice.toLocaleString()}
              </Typography>
            )}
          </Box>
        </Box>
      )}
    </>
  )
}
