import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from '@mui/material'

import { useState, useMemo } from 'react'

type SortField = 'caller' | 'status' | 'id'
type SortDirection = 'asc' | 'desc'

interface LeadCall {
  id: number
  caller: string
  date: string
  time: string
  recording: string
  status: string
  lineCode: number
  waitTime: string
  duration: string
}

interface LeadCallsTableProps {
  LeadCalls: LeadCall[]
  isExpended?: boolean
}

const getcallerPriority = (caller: string): number => {
  switch (caller) {
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

export function LeadCallsTable({ LeadCalls, isExpended }: LeadCallsTableProps) {
  const [sortField, setSortField] = useState<SortField>('caller')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')

  const handleSort = (field: SortField) => {
    const isAsc = sortField === field && sortDirection === 'asc'
    setSortDirection(isAsc ? 'desc' : 'asc')
    setSortField(field)
  }

  const sortedLeadCalls = useMemo(() => {
    return [...LeadCalls].sort((a, b) => {
      let comparison = 0

      if (sortField === 'id') {
        const callerA = getcallerPriority(a.caller)
        const callerB = getcallerPriority(b.caller)
        comparison = callerA - callerB
      } else {
        const valueA = a[sortField].toLowerCase()
        const valueB = b[sortField].toLowerCase()
        comparison = valueA.localeCompare(valueB)
      }

      return sortDirection === 'desc' ? -comparison : comparison
    })
  }, [LeadCalls, sortField, sortDirection])

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
      }}>
      <TableContainer sx={{ boxShadow: 'none', borderRadius: 0 }}>
        <Table
          sx={{
            width: !isExpended ? '100%' : 340,
            borderCollapse: 'separate',
            borderSpacing: 0,
            tableLayout: 'auto',
          }}>
          <TableHead>
            <TableRow sx={{ background: '#f8f9fb' }}>
              {!isExpended ? (
                <>
                  <TableCell sx={{ fontSize: 14, background: '#f8f9fb', border: 'none', minWidth: 180, width: 220 }}>
                    <TableSortLabel
                      active={sortField === 'caller'}
                      direction={sortField === 'caller' ? sortDirection : 'asc'}
                      onClick={() => handleSort('caller')}
                      sx={{ color: '#000' }}>
                      Хто дзвонив
                    </TableSortLabel>
                  </TableCell>

                  <TableCell sx={{ fontSize: 14, background: '#f8f9fb', border: 'none', minWidth: 180, width: 220 }}>
                    <TableSortLabel
                      active={sortField === 'caller'}
                      direction={sortField === 'caller' ? sortDirection : 'asc'}
                      onClick={() => handleSort('caller')}
                      sx={{ color: '#000' }}>
                      дата і час
                    </TableSortLabel>
                  </TableCell>

                  <TableCell sx={{ fontSize: 14, background: '#f8f9fb', border: 'none', minWidth: 180, width: 220 }}>
                    <TableSortLabel
                      active={sortField === 'caller'}
                      direction={sortField === 'caller' ? sortDirection : 'asc'}
                      onClick={() => handleSort('caller')}
                      sx={{ color: '#000' }}>
                      запис
                    </TableSortLabel>
                  </TableCell>
                </>
              ) : (
                <>
                  <TableCell sx={{ fontSize: 14, background: '#f8f9fb', border: 'none' }}>
                    <TableSortLabel
                      active={sortField === 'status'}
                      direction={sortField === 'status' ? sortDirection : 'asc'}
                      onClick={() => handleSort('status')}
                      sx={{ color: '#000' }}>
                      Лінія
                    </TableSortLabel>
                  </TableCell>

                  <TableCell sx={{ fontSize: 14, background: '#f8f9fb', border: 'none' }}>
                    <TableSortLabel
                      active={sortField === 'status'}
                      direction={sortField === 'status' ? sortDirection : 'asc'}
                      onClick={() => handleSort('status')}
                      sx={{ color: '#000' }}>
                      Хто дзвонив
                    </TableSortLabel>
                  </TableCell>

                  <TableCell sx={{ fontSize: 14, background: '#f8f9fb', border: 'none' }}>
                    <TableSortLabel
                      active={sortField === 'status'}
                      direction={sortField === 'status' ? sortDirection : 'asc'}
                      onClick={() => handleSort('status')}
                      sx={{ color: '#000' }}>
                      Статус
                    </TableSortLabel>

                    <TableSortLabel
                      active={sortField === 'status'}
                      direction={sortField === 'status' ? sortDirection : 'asc'}
                      onClick={() => handleSort('status')}
                      sx={{ color: '#000' }}>
                      Очікування
                    </TableSortLabel>
                  </TableCell>

                  <TableSortLabel
                    active={sortField === 'status'}
                    direction={sortField === 'status' ? sortDirection : 'asc'}
                    onClick={() => handleSort('status')}
                    sx={{ color: '#000' }}>
                    Тривалість
                  </TableSortLabel>
                </>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {!isExpended &&
              sortedLeadCalls.map((call, idx) => (
                <TableRow
                  key={call.id}
                  sx={{
                    background: idx % 2 === 0 ? '#fff' : '#f8f9fb',
                    '&:last-child td, &:last-child th': { border: 0 },
                    border: 'none',
                    boxShadow: 'none',
                    minHeight: 56,
                  }}>
                  <TableCell
                    sx={{ p: 0, width: 8, background: 'transparent', border: 'none', height: '100%', minHeight: 56 }}>
                    <Box sx={{ width: 4, height: '100%', minHeight: 56, borderRadius: '2px' }} />
                  </TableCell>
                  <TableCell
                    sx={{
                      border: 'none',
                      fontSize: 16,
                      minWidth: 250,
                      width: 300,
                    }}>
                    {call.caller}
                  </TableCell>
                  <TableCell sx={{ border: 'none', fontSize: 16 }}>{call.caller}</TableCell>
                  <TableCell sx={{ border: 'none', fontSize: 16 }}>{call.caller}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
