import { useState } from 'react'
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
  useMediaQuery,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Button,
  Chip,
} from '@mui/material'
import { FilterList, KeyboardArrowLeft } from '@mui/icons-material'
import { SidebarLayout } from '../shared'
import { SearchField } from '../shared/components'
import { PaginationFooter } from '../features/settings-workers/ui/pagination-footer'

interface Patient {
  id: string
  fullName: string
  status: 'visited' | 'not_started'
  lastComment: string
  nextReminder: string
  nextVisit: string
  plannedAmount: string
  plannedVisits: number
  plannedTreatments: number
}

const mockPatients: Patient[] = [
  {
    id: '1',
    fullName: 'Ніна Нінченко',
    status: 'visited',
    lastComment: 'Коментар',
    nextReminder: '21.12.2024',
    nextVisit: '21.12.2024',
    plannedAmount: '20 000.00 грн',
    plannedVisits: 2,
    plannedTreatments: 2,
  },
  {
    id: '2',
    fullName: 'Ніна Нінченко',
    status: 'not_started',
    lastComment: 'Коментар',
    nextReminder: '21.12.2024',
    nextVisit: '21.12.2024',
    plannedAmount: '20 000.00 грн',
    plannedVisits: 2,
    plannedTreatments: 2,
  },
  {
    id: '3',
    fullName: 'Олег Тарасенко',
    status: 'not_started',
    lastComment: 'Коментар',
    nextReminder: '21.12.2024',
    nextVisit: '21.12.2024',
    plannedAmount: '20 000.00 грн',
    plannedVisits: 2,
    plannedTreatments: 2,
  },
  {
    id: '4',
    fullName: 'Марія Коваль',
    status: 'not_started',
    lastComment: 'Коментар',
    nextReminder: '21.12.2024',
    nextVisit: '21.12.2024',
    plannedAmount: '20 000.00 грн',
    plannedVisits: 2,
    plannedTreatments: 2,
  },
  {
    id: '5',
    fullName: 'Анна Петренко',
    status: 'visited',
    lastComment: 'Коментар',
    nextReminder: '22.12.2024',
    nextVisit: '22.12.2024',
    plannedAmount: '15 000.00 грн',
    plannedVisits: 1,
    plannedTreatments: 1,
  },
  {
    id: '6',
    fullName: 'Іван Сидоренко',
    status: 'not_started',
    lastComment: 'Коментар',
    nextReminder: '23.12.2024',
    nextVisit: '23.12.2024',
    plannedAmount: '25 000.00 грн',
    plannedVisits: 3,
    plannedTreatments: 3,
  },
  {
    id: '7',
    fullName: 'Олена Коваленко',
    status: 'visited',
    lastComment: 'Коментар',
    nextReminder: '24.12.2024',
    nextVisit: '24.12.2024',
    plannedAmount: '18 000.00 грн',
    plannedVisits: 2,
    plannedTreatments: 2,
  },
  {
    id: '8',
    fullName: 'Віктор Мороз',
    status: 'not_started',
    lastComment: 'Коментар',
    nextReminder: '25.12.2024',
    nextVisit: '25.12.2024',
    plannedAmount: '30 000.00 грн',
    plannedVisits: 4,
    plannedTreatments: 4,
  },
]

export function LostConsultationPage() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'read' | 'unread'>('all')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const getStatusChip = (status: Patient['status']) => {
    if (status === 'visited') {
      return (
        <Chip
          label="Був візит"
          sx={{
            backgroundColor: '#2e7d32',
            color: 'white',
            fontSize: '14px',
            height: '32px',
            borderRadius: '8px',
          }}
        />
      )
    }
    return (
      <Chip
        label="Не почали лікування"
        sx={{
          backgroundColor: '#ef6c00',
          color: 'white',
          fontSize: '14px',
          height: '32px',
          borderRadius: '8px',
        }}
      />
    )
  }

  const filteredPatients = mockPatients.filter((patient) => {
    const matchesSearch = patient.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter =
      filterStatus === 'all' ||
      (filterStatus === 'read' && patient.status === 'visited') ||
      (filterStatus === 'unread' && patient.status === 'not_started')
    return matchesSearch && matchesFilter
  })

  const totalRows = filteredPatients.length

  return (
    <SidebarLayout title="Пацієнти" rightSidebar={<></>}>
      <Box
        sx={{
          p: isMobile ? 2 : 4,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}>
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            mb: 3,
            alignItems: isMobile ? 'stretch' : 'center',
          }}>
          <SearchField
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Пошук"
            fullWidth={isMobile}
            isStartAdornment={false}
          />
          <Button
            variant="outlined"
            startIcon={<FilterList />}
            endIcon={<KeyboardArrowLeft sx={{ transform: 'rotate(90deg)' }} />}
            sx={{
              borderRadius: '8px',
              borderColor: '#bbb',
              textTransform: 'none',
              fontSize: '14px',
              px: 2,
              py: 1,
              minWidth: isMobile ? 'auto' : '120px',
              display: isMobile ? 'flex' : 'none',
            }}>
            ФІЛЬТР
          </Button>
          {isMobile ? null : (
            <FormControl component="fieldset">
              <RadioGroup
                row
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as 'all' | 'read' | 'unread')}
                sx={{
                  flexDirection: isMobile ? 'column' : 'row',
                }}>
                <FormControlLabel
                  value="all"
                  control={
                    <Radio
                      sx={{
                        color: '#bbb',
                        '&.Mui-checked': {
                          color: '#0029d9',
                        },
                      }}
                    />
                  }
                  label="Всі"
                  sx={{
                    '& .MuiFormControlLabel-label': {
                      fontSize: '14px',
                      color: '#444',
                    },
                  }}
                />
                <FormControlLabel
                  value="read"
                  control={
                    <Radio
                      sx={{
                        color: '#bbb',
                        '&.Mui-checked': {
                          color: '#0029d9',
                        },
                      }}
                    />
                  }
                  label="Прочитані"
                  sx={{
                    '& .MuiFormControlLabel-label': {
                      fontSize: '14px',
                      color: '#444',
                    },
                  }}
                />
                <FormControlLabel
                  value="unread"
                  control={
                    <Radio
                      sx={{
                        color: '#bbb',
                        '&.Mui-checked': {
                          color: '#0029d9',
                        },
                      }}
                    />
                  }
                  label="Не прочитані"
                  sx={{
                    '& .MuiFormControlLabel-label': {
                      fontSize: '14px',
                      color: '#444',
                    },
                  }}
                />
              </RadioGroup>
            </FormControl>
          )}
        </Box>
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            background: '#fff',
            borderRadius: '16px',
            boxShadow:
              '0 2px 3px -1px rgba(0, 0, 0, 0.1), 0 1px 12px 0 rgba(0, 0, 0, 0.1), 0 1px 3px 0 rgba(0, 0, 0, 0.05)',
            overflow: 'hidden',
          }}>
          <TableContainer sx={{ flex: 1, boxShadow: 'none', overflowX: 'auto' }}>
            <Table sx={{ minWidth: isMobile ? 800 : 650, borderCollapse: 'separate', borderSpacing: 0 }}>
              <TableHead>
                <TableRow sx={{ background: '#f8f9fb' }}>
                  <TableCell sx={{ fontSize: 14, background: '#f8f9fb', border: 'none', color: '#000' }}>ПІБ</TableCell>
                  <TableCell sx={{ fontSize: 14, background: '#f8f9fb', border: 'none', color: '#000' }}>
                    Статус
                  </TableCell>
                  <TableCell sx={{ fontSize: 14, background: '#f8f9fb', border: 'none', color: '#000' }}>
                    Останній коментар
                  </TableCell>
                  <TableCell sx={{ fontSize: 14, background: '#f8f9fb', border: 'none', color: '#000' }}>
                    Наступ. нагадування
                  </TableCell>
                  <TableCell sx={{ fontSize: 14, background: '#f8f9fb', border: 'none', color: '#000' }}>
                    Наступ. візит
                  </TableCell>
                  <TableCell sx={{ fontSize: 14, background: '#f8f9fb', border: 'none', color: '#000' }}>
                    Заплановано на суму
                  </TableCell>
                  <TableCell sx={{ fontSize: 14, background: '#f8f9fb', border: 'none', color: '#000' }}>
                    Заплан. візитів
                  </TableCell>
                  <TableCell sx={{ fontSize: 14, background: '#f8f9fb', border: 'none', color: '#000' }}>
                    К-сть пл. лік
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredPatients.map((patient, idx) => (
                  <TableRow
                    key={patient.id}
                    sx={{
                      background: idx % 2 === 0 ? '#fff' : '#f8f9fb',
                      '&:last-child td, &:last-child th': { border: 0 },
                      border: 'none',
                      minHeight: 56,
                      '&:hover': {
                        backgroundColor: '#f5f7fe',
                      },
                    }}>
                    <TableCell sx={{ border: 'none', fontSize: 16, color: '#000' }}>{patient.fullName}</TableCell>
                    <TableCell sx={{ border: 'none' }}>{getStatusChip(patient.status)}</TableCell>
                    <TableCell sx={{ border: 'none', fontSize: 16, color: '#000' }}>{patient.lastComment}</TableCell>
                    <TableCell sx={{ border: 'none', fontSize: 16, color: '#000' }}>{patient.nextReminder}</TableCell>
                    <TableCell sx={{ border: 'none', fontSize: 16, color: '#000' }}>{patient.nextVisit}</TableCell>
                    <TableCell sx={{ border: 'none', fontSize: 16, color: '#000' }}>{patient.plannedAmount}</TableCell>
                    <TableCell sx={{ border: 'none', fontSize: 16, color: '#000' }}>{patient.plannedVisits}</TableCell>
                    <TableCell sx={{ border: 'none', fontSize: 16, color: '#000' }}>
                      {patient.plannedTreatments}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <PaginationFooter
            count={Math.ceil(totalRows / rowsPerPage)}
            page={page + 1}
            onPageChange={(_, value) => setPage(value - 1)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(Number(e.target.value))
              setPage(0)
            }}
            totalRows={totalRows}
          />
        </Box>
      </Box>
    </SidebarLayout>
  )
}
