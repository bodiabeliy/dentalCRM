import { useState } from 'react'
import {
  Box,
  Tabs,
  Tab,
  Button,
  Typography,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Table,
  Divider,
  Switch,
} from '@mui/material'
import { TAB_LABELS } from '../../model/constants'
import { PaginationFooter } from '../../../settings-workers/ui/pagination-footer'
import SinglePayoutModal from './single-payout-modal'
import MassPayoutModal from './mass-payout-modal'
import { SearchField } from '../../../../shared/components'
import FilterIcon from '../../../../shared/assets/icons/filter.svg?react'
import BonusSettingsModal from './bonus-settings-modal'
import SettingsIcon from '../../../../shared/assets/icons/settings_general.svg?react'
import ChevronIcon from '../../../../shared/assets/icons/chevron.svg?react'
import PlusIcon from '../../../../shared/assets/icons/plus.svg?react'

const mockRows = [
  {
    date: '12.12.2024',
    month: 'Грудень',
    employee: 'Лінда Вітковська Ігорівна',
    amount: '10 000',
    comment: 'Коментар',
  },
  {
    date: '12.12.2024',
    month: 'Грудень',
    employee: 'Лінда Вітковська Ігорівна',
    amount: '10 000',
    comment: 'Коментар',
  },
]

const mockBonuses = [
  {
    status: true,
    name: 'За первинного пацієнта',
    description: 'Бонус нараховується по пацієнтам які за певний період часу принесли якусь фіксовану суму',
    appliedTo: 'Адміністратори',
  },
  {
    status: false,
    name: 'За кількість дзвінків',
    description: 'Бонус нараховується по пацієнтам які',
    appliedTo: 'Адміністратори',
  },
  {
    status: true,
    name: 'За фото пацієнта',
    description: 'Бонус нараховується по пацієнтам які',
    appliedTo: 'Лікарі',
  },
  {
    status: true,
    name: 'За первинного пацієнта',
    description: 'Бонус нараховується по пацієнтам які',
    appliedTo: 'Лікарі',
  },
  {
    status: true,
    name: 'За внесення адреси пацієнта',
    description: 'Бонус нараховується по пацієнтам які',
    appliedTo: 'Лікарі',
  },
  {
    status: true,
    name: 'За списання товарів',
    description: 'Бонус нараховується по пацієнтам які',
    appliedTo: 'Лікарі',
  },
]

export function SalaryPayments() {
  const [activeTab, setActiveTab] = useState(0)
  const [openSingle, setOpenSingle] = useState(false)
  const [openMass, setOpenMass] = useState(false)
  const [openBonus, setOpenBonus] = useState(false)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchQuery, setSearchQuery] = useState('')
  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', mr: 2 }}>
        <Tabs
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
          sx={{
            '& .MuiTabs-indicator': { backgroundColor: '#0029d9' },
            '& .Mui-selected': { color: '#0029d9' },
            ml: 'auto',
          }}>
          {TAB_LABELS.map((label) => (
            <Tab key={label} sx={{ '&.Mui-selected': { color: '#0029d9' }, textTransform: 'none' }} label={label} />
          ))}
        </Tabs>
      </Box>
      {activeTab === 0 && (
        <Box
          sx={{
            boxShadow:
              '0 2px 3px -1px rgba(0, 0, 0, 0.1), 0 1px 12px 0 rgba(0, 0, 0, 0.1), 0 1px 3px 0 rgba(0, 0, 0, 0.05)',
            background: '#fff',
            borderRadius: '16px',
            m: 2,
            mt: 2,
            position: 'relative',
          }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
              }}>
              <SearchField isStartAdornment value={searchQuery} onChange={setSearchQuery} fullWidth={false} />
              <Button startIcon={<FilterIcon />} variant="outlined" onClick={() => {}}>
                Фільтр
              </Button>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="contained"
                onClick={() => setOpenMass(true)}
                sx={{
                  padding: '4px 10px',
                }}>
                МАСОВА ВИПЛАТА
              </Button>
              <Button
                variant="outlined"
                onClick={() => setOpenSingle(true)}
                sx={{
                  padding: '4px 10px',
                }}>
                ВИПЛАТА
              </Button>
            </Box>
          </Box>
          <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
            <Table sx={{ borderCollapse: 'separate', borderSpacing: 0 }}>
              <TableHead>
                <TableRow style={{ background: '#f5f5f5' }}>
                  <TableCell sx={{ p: 2, tabSize: 14, fontWeight: 500 }}>Дата виплати</TableCell>
                  <TableCell sx={{ p: 2, tabSize: 14, fontWeight: 500 }}>За місяць</TableCell>
                  <TableCell sx={{ p: 2, tabSize: 14, fontWeight: 500 }}>Співробітник</TableCell>
                  <TableCell sx={{ p: 2, tabSize: 14, fontWeight: 500 }}>Сума</TableCell>
                  <TableCell sx={{ p: 2, tabSize: 14, fontWeight: 500 }}>Коментар до оплати</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockRows.map((row, idx) => (
                  <TableRow
                    key={idx}
                    sx={{
                      background: idx % 2 === 0 ? '#fff' : '#f5f7fe',
                      '&:last-child td, &:last-child th': { border: 0 },
                    }}>
                    <TableCell sx={{ p: 2 }}>{row.date}</TableCell>
                    <TableCell sx={{ p: 2 }}>{row.month}</TableCell>
                    <TableCell sx={{ p: 2 }}>{row.employee}</TableCell>
                    <TableCell sx={{ p: 2 }}>{row.amount}</TableCell>
                    <TableCell sx={{ p: 2 }}>{row.comment}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, mr: 2 }}>
            <Typography sx={{ fontWeight: 500, fontSize: 14 }}>₴ 256 287.00</Typography>
          </Box>
          <Divider sx={{ mt: 2 }} />
          <PaginationFooter
            count={mockRows.length}
            page={page + 1}
            onPageChange={(_, value) => setPage(value - 1)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(e) => setRowsPerPage(Number(e.target.value))}
            totalRows={48}
          />
        </Box>
      )}
      {activeTab === 1 && (
        <Box
          sx={{
            boxShadow:
              '0 2px 3px -1px rgba(0, 0, 0, 0.1), 0 1px 12px 0 rgba(0, 0, 0, 0.1), 0 1px 3px 0 rgba(0, 0, 0, 0.05)',
            background: '#fff',
            borderRadius: '16px',
            m: 2,
            mt: 2,
            position: 'relative',
          }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
            <Button variant="contained" onClick={() => setOpenBonus(true)} startIcon={<PlusIcon />}>
              ДОДАТИ БОНУС
            </Button>
          </Box>
          <Box sx={{ overflowX: 'auto' }}>
            <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
              <Table sx={{ width: '100%', borderCollapse: 'collapse' }}>
                <TableHead>
                  <TableRow style={{ background: '#F6F7FB' }}>
                    <TableCell sx={{ p: 2, tabSize: 14, fontWeight: 500 }}>Статус</TableCell>
                    <TableCell sx={{ p: 2, tabSize: 14, fontWeight: 500 }}>Назва</TableCell>
                    <TableCell sx={{ p: 2 }}></TableCell>
                    <TableCell sx={{ p: 2, tabSize: 14, fontWeight: 500 }}>Опис</TableCell>
                    <TableCell sx={{ p: 2, tabSize: 14, fontWeight: 500 }}>До кого застосовано</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockBonuses.map((row, idx) => (
                    <TableRow
                      key={idx}
                      sx={{
                        background: idx % 2 === 0 ? '#fff' : '#f5f7fe',
                        '&:last-child td, &:last-child th': { border: 0 },
                      }}>
                      <TableCell sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 4 }}>
                        {row.status ? <span>Вкл</span> : <span>Викл</span>}
                        <Switch checked={row.status} sx={{ color: '#2d3aff' }} />
                      </TableCell>
                      <TableCell
                        sx={{
                          p: 2,
                        }}>
                        {row.name}
                      </TableCell>
                      <TableCell sx={{ p: 2 }}>
                        <SettingsIcon />
                      </TableCell>
                      <TableCell sx={{ p: 2 }}>{row.description}</TableCell>
                      <TableCell sx={{ p: 2 }}>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            height: '100%',
                          }}>
                          {row.appliedTo}
                          <ChevronIcon style={{ transform: 'rotate(90deg)' }} />
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Box sx={{ mt: 2 }}>
            <PaginationFooter
              count={mockBonuses.length}
              page={page + 1}
              onPageChange={(_, value) => setPage(value - 1)}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={(e) => setRowsPerPage(Number(e.target.value))}
              totalRows={48}
            />
          </Box>
          <BonusSettingsModal open={openBonus} onClose={() => setOpenBonus(false)} />
        </Box>
      )}
      {activeTab === 2 && (
        <Box
          sx={{
            boxShadow:
              '0 2px 3px -1px rgba(0, 0, 0, 0.1), 0 1px 12px 0 rgba(0, 0, 0, 0.1), 0 1px 3px 0 rgba(0, 0, 0, 0.05)',
            background: '#fff',
            borderRadius: '16px',
            m: 2,
            mt: 2,
            position: 'relative',
          }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
            <Button variant="contained" onClick={() => {}} startIcon={<PlusIcon />}>
              ДОДАТИ ШТРАФ
            </Button>
          </Box>
          <Box sx={{ overflowX: 'auto' }}>
            <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
              <Table sx={{ width: '100%', borderCollapse: 'collapse' }}>
                <TableHead>
                  <TableRow style={{ background: '#F6F7FB' }}>
                    <TableCell sx={{ p: 2, tabSize: 14, fontWeight: 500 }}>Статус</TableCell>
                    <TableCell sx={{ p: 2, tabSize: 14, fontWeight: 500 }}>Назва</TableCell>
                    <TableCell sx={{ p: 2 }}></TableCell>
                    <TableCell sx={{ p: 2, tabSize: 14, fontWeight: 500 }}>Опис</TableCell>
                    <TableCell sx={{ p: 2, tabSize: 14, fontWeight: 500 }}>До кого застосовано</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockBonuses.map((row, idx) => (
                    <TableRow
                      key={idx}
                      sx={{
                        background: idx % 2 === 0 ? '#fff' : '#f5f7fe',
                        '&:last-child td, &:last-child th': { border: 0 },
                      }}>
                      <TableCell sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 4 }}>
                        {row.status ? <span>Вкл</span> : <span>Викл</span>}
                        <Switch checked={row.status} sx={{ color: '#2d3aff' }} />
                      </TableCell>
                      <TableCell
                        sx={{
                          p: 2,
                        }}>
                        {row.name}
                      </TableCell>
                      <TableCell sx={{ p: 2 }}>
                        <SettingsIcon />
                      </TableCell>
                      <TableCell sx={{ p: 2 }}>{row.description}</TableCell>
                      <TableCell sx={{ p: 2 }}>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            height: '100%',
                          }}>
                          {row.appliedTo}
                          <ChevronIcon style={{ transform: 'rotate(90deg)' }} />
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Box sx={{ mt: 2 }}>
            <PaginationFooter
              count={mockBonuses.length}
              page={page + 1}
              onPageChange={(_, value) => setPage(value - 1)}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={(e) => setRowsPerPage(Number(e.target.value))}
              totalRows={48}
            />
          </Box>
          <BonusSettingsModal open={openBonus} onClose={() => setOpenBonus(false)} />
        </Box>
      )}
      <SinglePayoutModal open={openSingle} onClose={() => setOpenSingle(false)} />
      <MassPayoutModal open={openMass} onClose={() => setOpenMass(false)} />
    </Box>
  )
}
