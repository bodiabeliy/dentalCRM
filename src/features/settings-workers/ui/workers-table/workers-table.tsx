import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  TableSortLabel,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import type { SelectChangeEvent } from '@mui/material'
import { useState, useMemo } from 'react'
import { PaginationFooter } from '../pagination-footer'
import type { IStaff } from '../../../../app/providers/types/stuff'
import { useAppSelector } from '../../../../app/providers/store-helpers'
import { clinicRefernciesSelector } from '../../../../app/providers/reducers/ClinicSlice'

type SortField = 'name' | 'email' | 'branch' | 'role' | 'apiId'
type SortDirection = 'asc' | 'desc'

interface StuffsTableProps {
  staffs: IStaff[]
  totalRows: number
  page: number
  rowsPerPage: number
  onPageChange: (page: number) => void
  onRowsPerPageChange: (rowsPerPage: number) => void
  onEdit?: (staff: IStaff) => void
  onDelete?: (staff: IStaff) => void
}

const getRolePriority = (role: string): number => {
  switch (role) {
    case 'Адміністратор':
      return 1
    case 'Лікар':
      return 2
    case 'Асистент':
      return 3
    default:
      return 4
  }
}

export function StuffsTable({
  staffs,
  totalRows,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  onEdit,
  onDelete,
}: StuffsTableProps) {
  const { t } = useTranslation(['workers'])
  const clinicReferencies = useAppSelector(clinicRefernciesSelector)

  const [sortField, setSortField] = useState<SortField>('role')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')

  const handleChangePage = (_event: React.ChangeEvent<unknown>, value: number) => {
    onPageChange(value - 1)
  }

  const handleChangeRowsPerPage = (event: SelectChangeEvent<number>) => {
    onRowsPerPageChange(Number(event.target.value))
    onPageChange(0)
  }

  const handleSort = (field: SortField) => {
    const isAsc = sortField === field && sortDirection === 'asc'
    setSortDirection(isAsc ? 'desc' : 'asc')
    setSortField(field)
  }

  const sortedstaffs = useMemo(() => {
    return [...staffs].sort((a, b) => {
      let comparison = 0

      if (sortField === 'role') {
        const roleA = getRolePriority(a.role ?? '')
        const roleB = getRolePriority(b.role ?? '')
        comparison = roleA - roleB
      } else {
        // const valueA = a[sortField].toLowerCase()
        // const valueB = b[sortField].toLowerCase()
        // comparison = valueA.localeCompare(valueB)
      }

      return sortDirection === 'desc' ? -comparison : comparison
    })
  }, [staffs, sortField, sortDirection])

  // Build a fast lookup for clinic colors by both id and name
  const clinicColorMap = useMemo(() => {
    const map = new Map<string | number, string>()
    ;(clinicReferencies?.clinicColors || []).forEach((c) => {
      map.set(c.id, c.color)
      map.set(String(c.id), c.color)
      map.set(c.name, c.color)
    })
    return map
  }, [clinicReferencies?.clinicColors])

  const getRowColor = (staff: IStaff): string => {
    // Prefer explicit hex from nested colors object
    if (staff?.colors?.color) return staff.colors.color
    // Fallbacks: staff.color may contain color id or name (string)
    if (staff?.color && clinicColorMap.has(staff.color)) {
      return clinicColorMap.get(staff.color) as string
    }
    return ''
  }

  return (
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
        position: 'relative',
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
            width: '100%',
            borderCollapse: 'separate',
            borderSpacing: 0,
            tableLayout: 'auto',
          }}>
          <TableHead>
            <TableRow sx={{ background: '#f8f9fb' }}>
              <TableCell sx={{ width: 8, p: 0, background: '#f8f9fb' }} />
              <TableCell sx={{ fontSize: 14, background: '#f8f9fb', border: 'none', minWidth: 180, width: 220 }}>
                <TableSortLabel
                  active={sortField === 'name'}
                  direction={sortField === 'name' ? sortDirection : 'asc'}
                  onClick={() => handleSort('name')}>
                  {t('workers:workersTable.fullName')}
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ fontSize: 14, background: '#f8f9fb', border: 'none' }}>
                <TableSortLabel
                  active={sortField === 'email'}
                  direction={sortField === 'email' ? sortDirection : 'asc'}
                  onClick={() => handleSort('email')}>
                  {t('workers:workersTable.email')}
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ fontSize: 14, background: '#f8f9fb', border: 'none' }}>
                <TableSortLabel
                  active={sortField === 'apiId'}
                  direction={sortField === 'apiId' ? sortDirection : 'asc'}
                  onClick={() => handleSort('apiId')}>
                  {t('workers:workersTable.phone')}
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ fontSize: 14, background: '#f8f9fb', border: 'none' }}>
                <TableSortLabel
                  active={sortField === 'branch'}
                  direction={sortField === 'branch' ? sortDirection : 'asc'}
                  onClick={() => handleSort('branch')}>
                  {t('workers:workersTable.branch')}
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ fontSize: 14, background: '#f8f9fb', border: 'none' }}>
                <TableSortLabel
                  active={sortField === 'role'}
                  direction={sortField === 'role' ? sortDirection : 'asc'}
                  onClick={() => handleSort('role')}>
                  {t('workers:workersTable.role')}
                </TableSortLabel>
              </TableCell>

              <TableCell align="right" sx={{ background: '#f8f9fb', border: 'none' }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedstaffs?.map((staff, idx) => (
              <TableRow
                key={staff.id}
                sx={{
                  background: staff.status ? 'rgba(0, 0, 0, 0.04)' : idx % 2 === 0 ? '#fff' : '#f8f9fb',
                  '&:last-child td, &:last-child th': { border: 0 },
                  border: 'none',
                  boxShadow: 'none',
                  minHeight: 56,
                }}>
                <TableCell
                  sx={{ p: 0, width: 8, background: 'transparent', border: 'none', height: '100%', minHeight: 56 }}>
                  <Box
                    sx={{
                      width: 4,
                      height: '100%',
                      minHeight: 56,
                      borderRadius: '2px',
                      background: getRowColor(staff),
                    }}
                  />
                </TableCell>
                <TableCell
                  sx={{
                    border: 'none',
                    fontSize: 16,
                    minWidth: 250,
                    width: 300,
                    color: staff.status ? 'rgba(0, 0, 0, 0.5)' : 'inherit',
                  }}>
                  {staff.firstname}
                </TableCell>
                <TableCell
                  sx={{ border: 'none', fontSize: 16, color: staff.status ? 'rgba(0, 0, 0, 0.5)' : 'inherit' }}>
                  {staff.email}
                </TableCell>
                <TableCell
                  sx={{ border: 'none', fontSize: 16, color: staff.status ? 'rgba(0, 0, 0, 0.5)' : 'inherit' }}>
                  {staff.phone}
                </TableCell>
                <TableCell
                  sx={{ border: 'none', fontSize: 16, color: staff.status ? 'rgba(0, 0, 0, 0.5)' : 'inherit' }}>
                  {staff?.subclinics?.name}
                </TableCell>
                <TableCell
                  sx={{ border: 'none', fontSize: 16, color: staff.status ? 'rgba(0, 0, 0, 0.5)' : 'inherit' }}>
                  {staff.roles?.name}
                </TableCell>

                <TableCell
                  align="right"
                  sx={{
                    border: 'none',
                    minWidth: 100,
                    width: 100,
                    color: staff.status ? 'rgba(0, 0, 0, 0.5)' : 'inherit',
                  }}>
                  {!staff.status ? (
                    <>
                      <IconButton
                        size="small"
                        sx={{
                          mr: 1,
                          color: staff.status ? 'rgba(0, 0, 0, 0.5)' : 'inherit',
                        }}
                        onClick={() => onEdit?.(staff)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        sx={{
                          color: staff.status ? 'rgba(0, 0, 0, 0.5)' : 'inherit',
                        }}
                        onClick={() => onDelete?.(staff)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <IconButton
                        size="small"
                        sx={{
                          mr: 1,
                          color: staff.status ? 'rgba(0, 0, 0, 0.5)' : 'inherit',
                        }}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <PaginationFooter
        count={Math.ceil(totalRows / rowsPerPage)}
        page={page + 1}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        totalRows={totalRows}
      />
    </Box>
  )
}
