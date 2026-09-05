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
import type { ISubClinic } from '../../../../app/providers/types/clinic'

// Define the Brance type if not imported from elsewhere

type SortField = 'name' | 'usersCount' | 'address' | 'id'
type SortDirection = 'asc' | 'desc'

interface BrancesTableProps {
  brances: ISubClinic[]
  totalRows: number
  page: number
  rowsPerPage: number
  onPageChange: (page: number) => void
  onRowsPerPageChange: (rowsPerPage: number) => void
  onEdit?: (brance: ISubClinic) => void
  onDelete?: (brance: ISubClinic) => void
}

export function BrancesTable({
  brances,
  totalRows,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  onEdit,
  onDelete,
}: BrancesTableProps) {
  const { t } = useTranslation(['workers'])
  const [sortField, setSortField] = useState<SortField>('name')
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

  const sortedBrances = useMemo(() => {
    return [...brances].sort((a, b) => {
      let comparison = 0

      switch (sortField) {
        case 'name': {
          const nameA = String(a.name || '').toLowerCase()
          const nameB = String(b.name || '').toLowerCase()
          comparison = nameA.localeCompare(nameB)
          break
        }
        case 'usersCount': {
          comparison = (a.usersCount || 0) - (b.usersCount || 0)
          break
        }
        case 'address': {
          const addressA = String(a.address || '').toLowerCase()
          const addressB = String(b.address || '').toLowerCase()
          comparison = addressA.localeCompare(addressB)
          break
        }
        case 'id': {
          const idA = String(a.id || '')
          const idB = String(b.id || '')
          comparison = idA.localeCompare(idB)
          break
        }
      }

      return sortDirection === 'desc' ? -comparison : comparison
    })
  }, [brances, sortField, sortDirection])

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
                  onClick={() => handleSort('name')}
                  sx={{ color: '#000' }}>
                  {t('workers:branchesTable.name')}
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ fontSize: 14, background: '#f8f9fb', border: 'none' }}>
                <TableSortLabel
                  active={sortField === 'usersCount'}
                  direction={sortField === 'usersCount' ? sortDirection : 'asc'}
                  onClick={() => handleSort('usersCount')}
                  sx={{ color: '#000' }}>
                  {t('workers:branchesTable.count')}
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ fontSize: 14, background: '#f8f9fb', border: 'none' }}>
                <TableSortLabel
                  active={sortField === 'address'}
                  direction={sortField === 'address' ? sortDirection : 'asc'}
                  onClick={() => handleSort('address')}
                  sx={{ color: '#000' }}>
                  {t('workers:branchesTable.address')}
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ fontSize: 14, background: '#f8f9fb', border: 'none' }}>
                <TableSortLabel
                  active={sortField === 'id'}
                  direction={sortField === 'id' ? sortDirection : 'asc'}
                  onClick={() => handleSort('id')}
                  sx={{ color: '#000' }}>
                  {t('workers:branchesTable.apiId')}
                </TableSortLabel>
              </TableCell>
              <TableCell align="right" sx={{ background: '#f8f9fb', border: 'none' }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedBrances.map((brance, idx) => (
              <TableRow
                key={brance.id}
                sx={{
                  background: idx % 2 === 0 ? '#fff' : '#f8f9fb',
                  '&:last-child td, &:last-child th': { border: 0 },
                  border: 'none',
                  boxShadow: 'none',
                  minHeight: 56,
                }}>
                <TableCell
                  sx={{ p: 0, width: 8, background: 'transparent', border: 'none', height: '100%', minHeight: 56 }}>
                  <Box sx={{ width: 4, height: '100%', minHeight: 56, borderRadius: '2px', background: '#0029D9' }} />
                </TableCell>
                <TableCell
                  sx={{
                    border: 'none',
                    fontSize: 16,
                    minWidth: 250,
                    width: 300,
                  }}>
                  {brance.name}
                </TableCell>
                <TableCell sx={{ border: 'none', fontSize: 16 }}>{brance.usersCount}</TableCell>
                <TableCell sx={{ border: 'none', fontSize: 16 }}>
                  {brance.address || t('workers:branchesTable.notSpecified')}
                </TableCell>
                <TableCell sx={{ border: 'none', fontSize: 16 }}>{brance.id}</TableCell>
                <TableCell align="right" sx={{ border: 'none', minWidth: 100, width: 100 }}>
                  <IconButton size="small" sx={{ mr: 1 }} onClick={() => onEdit?.(brance)}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" onClick={() => onDelete?.(brance)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {sortedBrances.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                  {t('workers:branchesTable.empty')}
                </TableCell>
              </TableRow>
            )}
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
