import { useState } from 'react'
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
  useMediaQuery,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Button,
  Chip,
  Link,
} from '@mui/material'
import { FilterList, KeyboardArrowLeft } from '@mui/icons-material'
import { SidebarLayout } from '../shared'
import { SearchField } from '../shared/components'
import { PaginationFooter } from '../features/settings-workers/ui/pagination-footer'

interface OverdueService {
  id: string
  fullName: string
  status: 'no_show'
  amountPaid: string
  nextVisit: string
  overdueServices: Array<{
    name: string
    days: number
  }>
}

const mockOverdueServices: OverdueService[] = [
  {
    id: '1',
    fullName: 'Ніна Нінченко',
    status: 'no_show',
    amountPaid: '2 000 грн',
    nextVisit: '21.12.2024',
    overdueServices: [
      { name: 'Чистка', days: 3 },
      { name: 'Коронка цирконієва 2 шт', days: 15 },
    ],
  },
  {
    id: '2',
    fullName: 'Марія Коваль',
    status: 'no_show',
    amountPaid: '2 000 грн',
    nextVisit: '21.12.2024',
    overdueServices: [
      { name: 'Чистка', days: 3 },
      { name: 'Коронка цирконієва 2 шт', days: 15 },
    ],
  },
  {
    id: '3',
    fullName: 'Олег Тарасенко',
    status: 'no_show',
    amountPaid: '2 000 грн',
    nextVisit: '21.12.2024',
    overdueServices: [
      { name: 'Чистка', days: 3 },
      { name: 'Коронка цирконієва 2 шт', days: 15 },
    ],
  },
  {
    id: '4',
    fullName: 'Марія Коваль',
    status: 'no_show',
    amountPaid: '2 000 грн',
    nextVisit: '21.12.2024',
    overdueServices: [
      { name: 'Чистка', days: 3 },
      { name: 'Коронка цирконієва 2 шт', days: 15 },
    ],
  },
  {
    id: '5',
    fullName: 'Анна Петренко',
    status: 'no_show',
    amountPaid: '1 500 грн',
    nextVisit: '22.12.2024',
    overdueServices: [
      { name: 'Пломбування', days: 5 },
      { name: 'Відбілювання', days: 10 },
    ],
  },
  {
    id: '6',
    fullName: 'Іван Сидоренко',
    status: 'no_show',
    amountPaid: '3 000 грн',
    nextVisit: '23.12.2024',
    overdueServices: [
      { name: 'Імплантація', days: 7 },
      { name: 'Протезування', days: 20 },
    ],
  },
  {
    id: '7',
    fullName: 'Олена Коваленко',
    status: 'no_show',
    amountPaid: '1 800 грн',
    nextVisit: '24.12.2024',
    overdueServices: [
      { name: 'Чистка', days: 2 },
      { name: 'Консультація', days: 8 },
    ],
  },
  {
    id: '8',
    fullName: 'Віктор Мороз',
    status: 'no_show',
    amountPaid: '4 000 грн',
    nextVisit: '25.12.2024',
    overdueServices: [
      { name: 'Хірургія', days: 12 },
      { name: 'Реставрація', days: 18 },
    ],
  },
]

export function OverdueServicesPage() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'read' | 'unread'>('all')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const getStatusChip = () => {
    return (
      <Chip
        label="Не з'явився"
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

  const renderOverdueServices = (services: OverdueService['overdueServices']) => {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        {services.map((service, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" sx={{ color: '#000' }}>
              {service.name}
            </Typography>
            <Link
              component="button"
              variant="body2"
              sx={{
                color: '#0029d9',
                textDecoration: 'underline',
                fontSize: '14px',
                fontWeight: 'normal',
                textTransform: 'none',
                minWidth: 'auto',
                p: 0,
                '&:hover': {
                  backgroundColor: 'transparent',
                },
              }}>
              {service.days} днів
            </Link>
          </Box>
        ))}
      </Box>
    )
  }

  const filteredServices = mockOverdueServices.filter((service) => {
    const matchesSearch = service.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter =
      filterStatus === 'all' ||
      (filterStatus === 'read' && service.status === 'no_show') ||
      (filterStatus === 'unread' && service.status === 'no_show')
    return matchesSearch && matchesFilter
  })

  const totalRows = filteredServices.length

  return (
    <SidebarLayout title="Протерміновані послуги" rightSidebar={<></>}>
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

        {/* Table */}
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
                    Оплачено на суму
                  </TableCell>
                  <TableCell sx={{ fontSize: 14, background: '#f8f9fb', border: 'none', color: '#000' }}>
                    Наступний візит
                  </TableCell>
                  <TableCell sx={{ fontSize: 14, background: '#f8f9fb', border: 'none', color: '#000' }}>
                    Протерміновані послуги
                  </TableCell>
                  <TableCell sx={{ fontSize: 14, background: '#f8f9fb', border: 'none', color: '#000' }}>Дії</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredServices.map((service, idx) => (
                  <TableRow
                    key={service.id}
                    sx={{
                      background: idx % 2 === 0 ? '#fff' : '#f8f9fb',
                      '&:last-child td, &:last-child th': { border: 0 },
                      border: 'none',
                      minHeight: 56,
                      '&:hover': {
                        backgroundColor: '#f5f7fe',
                      },
                    }}>
                    <TableCell sx={{ border: 'none', color: '#000' }}>{service.fullName}</TableCell>
                    <TableCell sx={{ border: 'none' }}>{getStatusChip()}</TableCell>
                    <TableCell sx={{ border: 'none', color: '#000' }}>{service.amountPaid}</TableCell>
                    <TableCell sx={{ border: 'none', color: '#000' }}>{service.nextVisit}</TableCell>
                    <TableCell sx={{ border: 'none', color: '#000' }}>
                      {renderOverdueServices(service.overdueServices)}
                    </TableCell>
                    <TableCell sx={{ border: 'none' }}>
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{
                          borderRadius: '8px',
                          borderColor: '#bbb',
                          color: '#666',
                          textTransform: 'none',
                          fontSize: '12px',
                          px: 2,
                          py: 0.5,
                          '&:hover': {
                            borderColor: '#999',
                            backgroundColor: '#f5f5f5',
                          },
                        }}>
                        Показати все
                      </Button>
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
