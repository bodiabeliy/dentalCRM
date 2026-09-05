import { useState } from 'react'
import {
  Box,
  Typography,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Button,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  FormControlLabel,
  TableSortLabel,
} from '@mui/material'
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Download as DownloadIcon,
  AttachFile as AttachFileIcon,
} from '@mui/icons-material'
import { SidebarLayout } from '../shared'
import { PaginationFooter } from '../features/settings-workers/ui/pagination-footer'
import PlusIcon from '../shared/assets/icons/plus.svg?react'
import PencilIcon from '../shared/assets/icons/pencil.svg?react'
import RefreshIcon from '../shared/assets/icons/refresh.svg?react'
import CheckIcon from '../shared/assets/icons/check-green.svg?react'
import File2Icon from '../shared/assets/icons/file2.svg?react'
import IncomeModal from '../widgets/income-modal'
import TransferModal from '../widgets/transfer-modal'
import ExpensesModal from '../widgets/expenses-modal'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && <Box sx={{ m: 2, mt: 0, width: '100%', minWidth: 0 }}>{children}</Box>}
    </div>
  )
}

type SortField =
  | 'date'
  | 'period'
  | 'article'
  | 'amount'
  | 'account'
  | 'dealer'
  | 'receipt'
  | 'patient'
  | 'status'
  | 'fn'
  | 'discount'
  | 'payment'
  | 'salesPoint'
  | 'result'
  | 'closingDate'
  | 'openingDate'
  | 'openingTime'
  | 'closingTime'
type SortDirection = 'asc' | 'desc'

interface FinancialTransaction {
  id: number
  date: string
  time: string
  period: string
  article: string
  amount: string
  amount2: string
  account: string
  hasAttachment: boolean
  isSelected: boolean
  courseUah: string
  dealer: string
}

export function FinancialManagementPage() {
  const [tabValue, setTabValue] = useState(0)
  const [sortField, setSortField] = useState<SortField>('date')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false)
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false)
  const [isExpensesModalOpen, setIsExpensesModalOpen] = useState(false)

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const handleSort = (field: SortField) => {
    const isAsc = sortField === field && sortDirection === 'asc'
    setSortDirection(isAsc ? 'desc' : 'asc')
    setSortField(field)
  }

  const handleChangePage = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1)
  }

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(Number(event.target.value))
    setPage(0)
  }

  const handleIncomeSave = (data: {
    time: Date | null
    date: Date | null
    paymentType: string
    cashRegister: string
    exchangeRate: string
    amount: string
    amountUah: string
    incomeArticle: string
    relatedDocument: string
    comment: string
    attachDocument: boolean
  }) => {
    console.log('Income data:', data)
  }

  const handleTransferSave = (data: {
    fromType: string
    fromCashRegister: string
    toType: string
    toCashRegister: string
    exchangeRate: string
    amount: string
    amountUah: string
    comment: string
  }) => {
    console.log('Transfer data:', data)
  }

  const handleExpensesSave = (data: {
    dateRange: [Date | null, Date | null]
    cashFlow: string
    paymentType: string
    cashRegister: string
    exchangeRate: string
    amount: string
    amountUah: string
    expenseArticle: string
    expenseRelation: string
    counterparty: string
    agreement: string
    relatedDocument: string
    comment: string
    attachDocument: boolean
  }) => {
    console.log('Expenses data:', data)
  }

  const zTableData = [
    {
      id: 1,
      openingDate: 'Євтущенко Марія Ігорівна 21.23.2024',
      closingDate: 'Євтущенко Марія Ігорівна 21.23.2024',
      openingTime: '12:30',
      closingTime: '12:30',
      amount: '2000 €',
      salesPoint: 'Торгова точка',
      receipt: 'Успішно',
      receiptColor: '#2e7d32',
      status: 'Повернення',
      statusColor: '#ef6c00',
      patient: 'Піпкін Віктор петрович',
      fn: '63725546483',
      discount: '0,0% (₴ 00,0)',
      payment: '72 81*******42',
      result: '2 000 ₴',
    },
    {
      id: 2,
      receipt: 'Частково',
      receiptColor: '#ef6c00',
      patient: 'Піпкін Віктор петрович',
      status: 'ГРГР-875687',
      statusColor: '#1b5e20',
      fn: '63725546483',
      amount: '2000 €',
      discount: '0,0% (₴ 00,0)',
      payment: 'Готівка',
      openingDate: 'Євтущенко Марія Ігорівна 21.23.2024',
      closingDate: 'Євтущенко Марія Ігорівна 21.23.2024',
      openingTime: '12:30',
      closingTime: '12:30',
      result: '2 000 ₴',
      salesPoint: 'Торгова точка',
    },
    {
      id: 3,
      receipt: 'Немає',
      receiptColor: '#d32f2f',
      patient: 'Піпкін Віктор петрович',
      status: 'Повернення',
      statusColor: '#ef6c00',
      fn: '63725546483',
      amount: '2000 €',
      discount: '0,0% (₴ 00,0)',
      payment: '72 81*******42',
      openingDate: 'Євтущенко Марія Ігорівна 22.12.2024',
      closingDate: 'Євтущенко Марія Ігорівна 22.12.2024',
      openingTime: '12:30',
      closingTime: '12:30',
      result: '2 000 ₴',
      salesPoint: 'Торгова точка',
    },
  ]

  const tableData: FinancialTransaction[] = [
    {
      id: 0,
      date: '21.23.2024',
      time: '12:30',
      period: 'День',
      article: 'Дохід від пацієнта',
      amount: '2000 €',
      amount2: '-2000 €',
      account: 'Назва каси',
      hasAttachment: true,
      isSelected: true,
      courseUah: '36.60 UAH',
      dealer: 'ТОВ АРКС/Договір партнерства',
    },
    {
      id: 1,
      date: '21.23.2024',
      time: '12:30',
      period: 'Місяць (червень)',
      article: 'Витрата Обмін валюти',
      amount: '',
      amount2: '-2000 €',
      account: 'Назва каси',
      hasAttachment: false,
      isSelected: false,
      courseUah: '36.60 UAH',
      dealer: 'ТОВ АРКС/Договір партнерства',
    },
    {
      id: 2,
      date: '21.23.2024',
      time: '12:30',
      period: 'Рік (2025)',
      article: 'Дохід від пацієнта',
      amount: '2000 €',
      amount2: '-2000 €',
      account: 'Назва каси',
      hasAttachment: true,
      isSelected: false,
      courseUah: '36.60 UAH',
      dealer: 'ТОВ АРКС/Договір партнерства',
    },
    {
      id: 3,
      date: '21.23.2024',
      time: '12:30',
      period: '12.06.25-18.07.2025',
      article: 'Витрата Обмін валюти',
      amount: '',
      amount2: '-2000 €',
      account: 'Назва каси',
      hasAttachment: false,
      isSelected: false,
      courseUah: '36.60 UAH',
      dealer: 'ТОВ АРКС/Договір партнерства',
    },
  ]

  const sortedData = [...tableData].sort((a, b) => {
    let comparison = 0

    if (sortField === 'date') {
      comparison = a.date.localeCompare(b.date)
    } else if (sortField === 'period') {
      comparison = a.period.localeCompare(b.period)
    } else if (sortField === 'article') {
      comparison = a.article.localeCompare(b.article)
    } else if (sortField === 'amount') {
      comparison = a.amount.localeCompare(b.amount)
    } else if (sortField === 'account') {
      comparison = a.account.localeCompare(b.account)
    }

    return sortDirection === 'desc' ? -comparison : comparison
  })

  return (
    <SidebarLayout title="Банк і каса" rightSidebar={<></>}>
      <Box sx={{ display: 'flex', height: 'calc(100vh - 66px)', bgcolor: 'white' }}>
        <Box
          sx={{
            width: 320,
            borderRight: '1px solid #e0e0e0',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'auto',
          }}>
          <Box sx={{ p: 2, bgcolor: '#e8e9fe' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 500,
                  fontSize: 16,
                  lineHeight: '150%',
                  letterSpacing: '0.01em',
                  color: '#0029d9',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}>
                Мої рахунки
                <PlusIcon style={{ color: '#0029d9', fontSize: 16 }} />
              </Typography>
              <PencilIcon style={{ color: '#7324d5', fontSize: 16 }} />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 4, height: 4, borderRadius: '50%', bgcolor: '#424242' }} />
                <Typography variant="subtitle2">Банківський рахунок</Typography>
              </Box>
              <Typography variant="body1" sx={{ ml: 2 }}>
                ₴ 2 000.00
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 4, height: 4, borderRadius: '50%', bgcolor: '#424242' }} />
                <Typography variant="subtitle2">Каса</Typography>
              </Box>
              <Typography variant="body1" sx={{ ml: 2 }}>
                ₴ 3 000.00
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 4, height: 4, borderRadius: '50%', bgcolor: '#424242' }} />
                <Typography variant="subtitle2">Сейф</Typography>
              </Box>
              <Typography variant="body1" sx={{ ml: 2 }}>
                ₴ 2 000.00
              </Typography>
            </Box>
          </Box>
          <Box sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <FormControlLabel
                control={<Checkbox size="small" />}
                label={
                  <Typography variant="body2" sx={{ color: '#424242' }}>
                    Банк
                  </Typography>
                }
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label={
                  <Typography variant="body2" sx={{ color: '#424242' }}>
                    Каса
                  </Typography>
                }
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label={
                  <Typography variant="body2" sx={{ color: '#424242' }}>
                    Надходження
                  </Typography>
                }
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label={
                  <Typography variant="body2" sx={{ color: '#424242' }}>
                    Витрати
                  </Typography>
                }
              />
            </Box>
          </Box>
          <Box>
            <Box sx={{ p: 2, pt: 0 }}>
              <Typography variant="subtitle2" sx={{ color: '#7324d5', mb: 1 }}>
                Відомість за 12.12.2024
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(21, 22, 24, 0.6)', display: 'block', mb: 1 }}>
                Каса готівка (UAH) (грн.)
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', bgcolor: '#e8e9fe', px: 2 }}>
                <Typography variant="subtitle2">Початок дня</Typography>
                <Typography variant="body2">5 000,00</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 2 }}>
                <Typography variant="subtitle2">Надійшло</Typography>
                <Typography variant="body2">5 000,00</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 2 }}>
                <Typography variant="subtitle2" color="#d32f2f">
                  Списано
                </Typography>
                <Typography variant="body2" color="#d32f2f">
                  5 000,00
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 2 }}>
                <Typography variant="subtitle2">Кінець дня</Typography>
                <Typography variant="body2">5 000,00</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', bgcolor: 'white', minWidth: 0 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            sx={{
              px: 2,
              '& .MuiTabs-flexContainer': {
                justifyContent: 'flex-end',
              },
            }}>
            <Tab
              label="Надходження і кошти"
              sx={{
                textTransform: 'none',
              }}
            />
            <Tab
              label="Z звіт"
              sx={{
                textTransform: 'none',
              }}
            />
          </Tabs>
          <TabPanel value={tabValue} index={0}>
            <Box
              sx={{
                boxShadow:
                  '0 2px 3px -1px rgba(0, 0, 0, 0.1), 0 1px 12px 0 rgba(0, 0, 0, 0.1), 0 1px 3px 0 rgba(0, 0, 0, 0.05)',
                background: '#fff',
                borderRadius: '16px',
                p: 2,
              }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3, justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <TextField
                    placeholder="Пошук"
                    size="small"
                    sx={{
                      width: 300,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '& fieldset': {
                          borderColor: '#e0e0e0',
                        },
                      },
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <SearchIcon sx={{ color: '#9e9e9e' }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Button variant="outlined" startIcon={<FilterListIcon />}>
                    ФІЛЬТР
                  </Button>
                  <Button variant="contained" startIcon={<DownloadIcon />}>
                    ЗАВАНТАЖИТИ З БАНКУ
                  </Button>
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="outlined"
                    startIcon={<PlusIcon />}
                    onClick={() => setIsIncomeModalOpen(true)}
                    sx={{
                      borderRadius: 2,
                      textTransform: 'none',
                      borderColor: '#2e7d32',
                      color: '#2e7d32',
                    }}>
                    НАДХОДЖЕННЯ
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => setIsExpensesModalOpen(true)}
                    sx={{
                      color: '#ef6c00',
                      borderColor: '#ef6c00',
                    }}>
                    ВИТРАТИ
                  </Button>
                  <IconButton
                    onClick={() => setIsTransferModalOpen(true)}
                    sx={{
                      bgcolor: '#e4e8ff',
                      borderRadius: 2,
                      '&:hover': { bgcolor: '#eeeeee' },
                    }}>
                    <RefreshIcon style={{ color: '#0029d9' }} />
                  </IconButton>
                </Box>
              </Box>
              <Box
                sx={{
                  borderRadius: '16px',
                  background: '#fff',
                  p: 0,
                  boxShadow: 'none',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                }}>
                <TableContainer sx={{ boxShadow: 'none', borderRadius: 0 }}>
                  <Table
                    sx={{
                      minWidth: 1200,
                      borderCollapse: 'separate',
                      borderSpacing: 0,
                      tableLayout: 'auto',
                    }}>
                    <TableHead>
                      <TableRow sx={{ background: '#f8f9fb' }}>
                        <TableCell sx={{ width: 50, p: 0, background: '#f8f9fb', border: 'none' }}></TableCell>
                        <TableCell sx={{ width: 50, p: 0, background: '#f8f9fb', border: 'none' }}></TableCell>
                        <TableCell sx={{ fontSize: 14, background: '#f8f9fb', border: 'none', minWidth: 180 }}>
                          <TableSortLabel
                            active={sortField === 'date'}
                            direction={sortField === 'date' ? sortDirection : 'asc'}
                            onClick={() => handleSort('date')}
                            sx={{ color: '#000' }}>
                            Дата і час
                          </TableSortLabel>
                        </TableCell>
                        <TableCell sx={{ fontSize: 14, background: '#f8f9fb', border: 'none', minWidth: 180 }}>
                          <TableSortLabel
                            active={sortField === 'period'}
                            direction={sortField === 'period' ? sortDirection : 'asc'}
                            onClick={() => handleSort('period')}
                            sx={{ color: '#000' }}>
                            Період
                          </TableSortLabel>
                        </TableCell>
                        <TableCell sx={{ fontSize: 14, background: '#f8f9fb', border: 'none', minWidth: 180 }}>
                          <TableSortLabel
                            active={sortField === 'article'}
                            direction={sortField === 'article' ? sortDirection : 'asc'}
                            onClick={() => handleSort('article')}
                            sx={{ color: '#000' }}>
                            Стаття
                          </TableSortLabel>
                        </TableCell>
                        <TableCell sx={{ fontSize: 14, background: '#f8f9fb', border: 'none', minWidth: 180 }}>
                          <TableSortLabel
                            active={sortField === 'amount'}
                            direction={sortField === 'amount' ? sortDirection : 'asc'}
                            onClick={() => handleSort('amount')}
                            sx={{ color: '#000' }}>
                            Сума
                          </TableSortLabel>
                        </TableCell>
                        <TableCell
                          sx={{ fontSize: 14, background: '#f8f9fb', border: 'none', minWidth: 180 }}></TableCell>
                        <TableCell sx={{ fontSize: 14, background: '#f8f9fb', border: 'none', minWidth: 180 }}>
                          <TableSortLabel
                            active={sortField === 'account'}
                            direction={sortField === 'account' ? sortDirection : 'asc'}
                            onClick={() => handleSort('account')}
                            sx={{ color: '#000' }}>
                            Назва / Рахунок
                          </TableSortLabel>
                        </TableCell>
                        <TableCell sx={{ fontSize: 14, background: '#f8f9fb', border: 'none', minWidth: 180 }}>
                          <TableSortLabel
                            active={sortField === 'dealer'}
                            direction={sortField === 'dealer' ? sortDirection : 'asc'}
                            onClick={() => handleSort('dealer')}
                            sx={{ color: '#000' }}>
                            Контрагент
                          </TableSortLabel>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {sortedData.map((row, idx) => (
                        <TableRow
                          key={row.id}
                          sx={{
                            background: idx % 2 === 0 ? '#fff' : '#f8f9fb',
                            '&:last-child td, &:last-child th': { border: 0 },
                            border: 'none',
                            boxShadow: 'none',
                            minHeight: 56,
                          }}>
                          <TableCell sx={{ border: 'none', width: 50, position: 'relative' }}>
                            <File2Icon style={{ color: '#9e9e9e' }} />
                            {row.isSelected && (
                              <CheckIcon
                                style={{
                                  color: '#4caf50',
                                  position: 'absolute',
                                  bottom: '50%',
                                  right: '50%',
                                  transform: 'translate(50%, 50%)',
                                }}
                              />
                            )}
                          </TableCell>
                          <TableCell sx={{ border: 'none', width: 50 }}>
                            {row.hasAttachment && <AttachFileIcon sx={{ color: '#9e9e9e', fontSize: 20 }} />}
                          </TableCell>
                          <TableCell sx={{ border: 'none', fontSize: 16 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                              <Typography variant="body2">{row.date}</Typography>
                              <Typography variant="body2">{row.time}</Typography>
                            </Box>
                          </TableCell>
                          <TableCell sx={{ border: 'none', fontSize: 16 }}>{row.period}</TableCell>
                          <TableCell sx={{ border: 'none', fontSize: 16 }}>{row.article}</TableCell>
                          <TableCell sx={{ border: 'none' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                              {row.amount ? (
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                  <Typography variant="body2" sx={{ color: '#2e7d32' }}>
                                    {row.amount}
                                  </Typography>
                                  <Typography variant="body2" sx={{ color: '#0029d9' }}>
                                    {row.courseUah}
                                  </Typography>
                                </Box>
                              ) : null}
                            </Box>
                          </TableCell>
                          <TableCell sx={{ border: 'none', fontSize: 16 }}>
                            <Typography variant="body2" sx={{ color: '#d32f2f' }}>
                              {row.amount2}
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ border: 'none', fontSize: 16 }}>{row.account}</TableCell>
                          <TableCell sx={{ border: 'none', fontSize: 16 }}>{row.dealer}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <PaginationFooter
                  count={Math.ceil(48 / rowsPerPage)}
                  page={page + 1}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  totalRows={48}
                />
              </Box>
            </Box>
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <Box
              sx={{
                boxShadow:
                  '0 2px 3px -1px rgba(0, 0, 0, 0.1), 0 1px 12px 0 rgba(0, 0, 0, 0.1), 0 1px 3px 0 rgba(0, 0, 0, 0.05)',
                background: '#fff',
                borderRadius: '16px',
                p: 2,
              }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3, justifyContent: 'space-between' }}>
                <TextField
                  placeholder="Пошук"
                  size="small"
                  sx={{
                    width: 300,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '& fieldset': {
                        borderColor: '#e0e0e0',
                      },
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon sx={{ color: '#9e9e9e' }} />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: '#0029d9',
                    textTransform: 'none',
                    borderRadius: 2,
                    '&:hover': { bgcolor: '#001a9e' },
                  }}>
                  ВІДКРИТИ ЗМІНУ
                </Button>
              </Box>
              <Box
                sx={{
                  borderRadius: '16px',
                  background: '#fff',
                  p: 0,
                  boxShadow: 'none',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                }}>
                <TableContainer
                  sx={{
                    boxShadow: 'none',
                    borderRadius: 0,
                    overflowX: 'auto',
                    '&::-webkit-scrollbar': {
                      height: '8px',
                    },
                    '&::-webkit-scrollbar-track': {
                      background: '#f1f1f1',
                      borderRadius: '4px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      background: '#c1c1c1',
                      borderRadius: '4px',
                      '&:hover': {
                        background: '#a8a8a8',
                      },
                    },
                  }}>
                  <Table
                    sx={{
                      width: 'max-content',
                      borderCollapse: 'separate',
                      borderSpacing: 0,
                      tableLayout: 'auto',
                    }}>
                    <TableHead>
                      <TableRow sx={{ background: '#f8f9fb' }}>
                        <TableCell sx={{ fontSize: 14, background: '#f8f9fb', border: 'none', minWidth: 320 }}>
                          <TableSortLabel
                            active={sortField === 'openingDate'}
                            direction={sortField === 'openingDate' ? sortDirection : 'asc'}
                            onClick={() => handleSort('openingDate')}
                            sx={{ color: '#000' }}>
                            Дата відкриття зміни
                          </TableSortLabel>
                        </TableCell>
                        <TableCell sx={{ width: 50, p: 0, background: '#f8f9fb', border: 'none' }}></TableCell>
                        <TableCell sx={{ fontSize: 14, background: '#f8f9fb', border: 'none', minWidth: 320 }}>
                          <TableSortLabel
                            active={sortField === 'closingDate'}
                            direction={sortField === 'closingDate' ? sortDirection : 'asc'}
                            onClick={() => handleSort('closingDate')}
                            sx={{ color: '#000' }}>
                            Дата закриття зміни
                          </TableSortLabel>
                        </TableCell>
                        <TableCell sx={{ width: 50, p: 0, background: '#f8f9fb', border: 'none' }}></TableCell>
                        <TableCell sx={{ fontSize: 14, background: '#f8f9fb', border: 'none', minWidth: 160 }}>
                          <TableSortLabel
                            active={sortField === 'result'}
                            direction={sortField === 'result' ? sortDirection : 'asc'}
                            onClick={() => handleSort('result')}
                            sx={{ color: '#000' }}>
                            Результат дня
                          </TableSortLabel>
                        </TableCell>
                        <TableCell sx={{ fontSize: 14, background: '#f8f9fb', border: 'none', minWidth: 160 }}>
                          <TableSortLabel
                            active={sortField === 'salesPoint'}
                            direction={sortField === 'salesPoint' ? sortDirection : 'asc'}
                            onClick={() => handleSort('salesPoint')}
                            sx={{ color: '#000' }}>
                            Торгова точка
                          </TableSortLabel>
                        </TableCell>
                        <TableCell sx={{ fontSize: 14, background: '#f8f9fb', border: 'none', minWidth: 120 }}>
                          <TableSortLabel
                            active={sortField === 'status'}
                            direction={sortField === 'status' ? sortDirection : 'asc'}
                            onClick={() => handleSort('status')}
                            sx={{ color: '#000' }}>
                            Статус
                          </TableSortLabel>
                        </TableCell>
                        <TableCell sx={{ fontSize: 14, background: '#f8f9fb', border: 'none', minWidth: 240 }}>
                          <TableSortLabel
                            active={sortField === 'receipt'}
                            direction={sortField === 'receipt' ? sortDirection : 'asc'}
                            onClick={() => handleSort('receipt')}
                            sx={{ color: '#000' }}>
                            Надходження коштів
                          </TableSortLabel>
                        </TableCell>
                        <TableCell sx={{ fontSize: 14, background: '#f8f9fb', border: 'none', minWidth: 200 }}>
                          <TableSortLabel
                            active={sortField === 'patient'}
                            direction={sortField === 'patient' ? sortDirection : 'asc'}
                            onClick={() => handleSort('patient')}
                            sx={{ color: '#000' }}>
                            Пацієнт
                          </TableSortLabel>
                        </TableCell>
                        <TableCell sx={{ fontSize: 14, background: '#f8f9fb', border: 'none', minWidth: 100 }}>
                          <TableSortLabel
                            active={sortField === 'fn'}
                            direction={sortField === 'fn' ? sortDirection : 'asc'}
                            onClick={() => handleSort('fn')}
                            sx={{ color: '#000' }}>
                            Фн
                          </TableSortLabel>
                        </TableCell>
                        <TableCell sx={{ fontSize: 14, background: '#f8f9fb', border: 'none', minWidth: 80 }}>
                          <TableSortLabel
                            active={sortField === 'amount'}
                            direction={sortField === 'amount' ? sortDirection : 'asc'}
                            onClick={() => handleSort('amount')}
                            sx={{ color: '#000' }}>
                            Сума
                          </TableSortLabel>
                        </TableCell>
                        <TableCell sx={{ fontSize: 14, background: '#f8f9fb', border: 'none', minWidth: 200 }}>
                          <TableSortLabel
                            active={sortField === 'discount'}
                            direction={sortField === 'discount' ? sortDirection : 'asc'}
                            onClick={() => handleSort('discount')}
                            sx={{ color: '#000' }}>
                            Знижка
                          </TableSortLabel>
                        </TableCell>
                        <TableCell sx={{ fontSize: 14, background: '#f8f9fb', border: 'none', minWidth: 180 }}>
                          <TableSortLabel
                            active={sortField === 'payment'}
                            direction={sortField === 'payment' ? sortDirection : 'asc'}
                            onClick={() => handleSort('payment')}
                            sx={{ color: '#000' }}>
                            Оплата
                          </TableSortLabel>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {zTableData.map((row) => (
                        <TableRow
                          key={row.id}
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 },
                            border: 'none',
                            boxShadow: 'none',
                            minHeight: 56,
                          }}>
                          <TableCell sx={{ border: 'none', fontSize: 16 }}>{row.openingDate}</TableCell>
                          <TableCell sx={{ border: 'none', fontSize: 16 }}>{row.openingTime}</TableCell>
                          <TableCell sx={{ border: 'none', fontSize: 16 }}>{row.closingDate}</TableCell>
                          <TableCell sx={{ border: 'none', fontSize: 16 }}>{row.closingTime}</TableCell>
                          <TableCell sx={{ border: 'none', fontSize: 16 }}>{row.result}</TableCell>
                          <TableCell sx={{ border: 'none', fontSize: 16 }}>{row.salesPoint}</TableCell>
                          <TableCell sx={{ border: 'none', fontSize: 16 }}>
                            <Button
                              variant="contained"
                              size="small"
                              sx={{
                                bgcolor: row.statusColor,
                                color: 'white',
                                textTransform: 'none',
                                fontSize: 12,
                                px: 1,
                                py: 0.5,
                                minWidth: 'auto',
                                '&:hover': { bgcolor: row.statusColor },
                              }}>
                              {row.status}
                            </Button>
                          </TableCell>
                          <TableCell sx={{ border: 'none', fontSize: 16 }}>
                            <Button
                              variant="contained"
                              size="small"
                              sx={{
                                bgcolor: row.receiptColor,
                                color: 'white',
                                textTransform: 'none',
                                fontSize: 12,
                                px: 1,
                                py: 0.5,
                                minWidth: 'auto',
                                '&:hover': { bgcolor: row.receiptColor },
                              }}>
                              {row.receipt}
                            </Button>
                          </TableCell>
                          <TableCell sx={{ border: 'none', fontSize: 16 }}>
                            <Typography variant="body2" sx={{ color: '#0029d9' }}>
                              {row.patient}
                            </Typography>
                          </TableCell>

                          <TableCell sx={{ border: 'none', fontSize: 16 }}>{row.fn}</TableCell>
                          <TableCell sx={{ border: 'none', fontSize: 16 }}>
                            <Typography variant="body2" sx={{ color: '#2e7d32' }}>
                              {row.amount}
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ border: 'none', fontSize: 16 }}>{row.discount}</TableCell>
                          <TableCell sx={{ border: 'none', fontSize: 16 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography variant="body2">{row.payment}</Typography>
                              {row.payment === 'Готівка' && (
                                <Box
                                  sx={{
                                    width: 16,
                                    height: 16,
                                    bgcolor: '#2e7d32',
                                    borderRadius: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                  }}>
                                  <Typography variant="caption" sx={{ color: 'white', fontSize: 10 }}>
                                    ₴
                                  </Typography>
                                </Box>
                              )}
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <PaginationFooter
                  count={Math.ceil(48 / rowsPerPage)}
                  page={page + 1}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  totalRows={48}
                />
              </Box>
            </Box>
          </TabPanel>
        </Box>
      </Box>
      <IncomeModal open={isIncomeModalOpen} onClose={() => setIsIncomeModalOpen(false)} onSave={handleIncomeSave} />
      <TransferModal
        open={isTransferModalOpen}
        onClose={() => setIsTransferModalOpen(false)}
        onSave={handleTransferSave}
      />
      <ExpensesModal
        open={isExpensesModalOpen}
        onClose={() => setIsExpensesModalOpen(false)}
        onSave={handleExpensesSave}
      />
    </SidebarLayout>
  )
}
