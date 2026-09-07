import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Checkbox,
  Chip,
  Tooltip,
  Typography,
} from '@mui/material'
import { useNavigate } from 'react-router'
import type { SelectChangeEvent } from '@mui/material'
import { useState, useMemo } from 'react'
import { PaginationFooter } from '../../../settings-workers/ui/pagination-footer'
import type { Patient, SortField, SortDirection } from '../../model/types'
import { ContextMenu } from '../context-menu/context-menu'
import { Avatar } from '../../../../shared/components/ui/avatar'

interface PatientsTableProps {
  patients: Patient[]
  totalRows: number
  page: number
  rowsPerPage: number
  onPageChange: (page: number) => void
  onRowsPerPageChange: (rowsPerPage: number) => void
  selectedPatients: string[]
  onSelectionChange: (selectedIds: string[]) => void
  onSendMessage?: (patient: Patient) => void
  onDeletePatient?: (patient: Patient) => void
  onEditPatient?: (patient: Patient) => void
}

export function PatientsTable({
  patients,
  totalRows,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  selectedPatients,
  onSelectionChange,
  onSendMessage,
  onDeletePatient,
  onEditPatient,
}: PatientsTableProps) {
  const navigate = useNavigate()
  const [sortField, setSortField] = useState<SortField>('name')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')
  const [contextMenu, setContextMenu] = useState<{
    mouseX: number
    mouseY: number
    patient: Patient | null
  } | null>(null)

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

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      onSelectionChange(patients?.map((patient) => patient.id))
    } else {
      onSelectionChange([])
    }
  }

  const handleSelectPatient = (patientId: string) => {
    const selectedIndex = selectedPatients.indexOf(patientId)
    let newSelected: string[] = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedPatients, patientId)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedPatients.slice(1))
    } else if (selectedIndex === selectedPatients.length - 1) {
      newSelected = newSelected.concat(selectedPatients.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedPatients.slice(0, selectedIndex),
        selectedPatients.slice(selectedIndex + 1)
      )
    }

    onSelectionChange(newSelected)
  }

  const handleContextMenu = (event: React.MouseEvent, patient: Patient) => {
    event.preventDefault()
    setContextMenu({
      mouseX: event.clientX + 2,
      mouseY: event.clientY - 6,
      patient,
    })
  }

  const handleCloseContextMenu = () => {
    setContextMenu(null)
  }

  const handleSendMessage = () => {
    if (contextMenu?.patient && onSendMessage) {
      onSendMessage(contextMenu.patient)
    }
  }

  const handleDeletePatient = () => {
    if (contextMenu?.patient && onDeletePatient) {
      onDeletePatient(contextMenu.patient)
    }
  }

  const handleEditPatient = () => {
    if (contextMenu?.patient && onEditPatient) {
      onEditPatient(contextMenu.patient)
    }
  }

  const sortedPatients = useMemo(() => {
    return [...patients].sort((a, b) => {
      let comparison = 0

      if (sortField === 'name') {
        comparison = a.name.localeCompare(b.name)
      } else if (sortField === 'status') {
        comparison = a.status.localeCompare(b.status)
      } else if (sortField === 'phoneNumber') {
        comparison = a.phoneNumber.localeCompare(b.phoneNumber)
      } else if (sortField === 'executedAmount') {
        comparison = a.executedAmount.localeCompare(b.executedAmount)
      } else if (sortField === 'paid') {
        comparison = a.paid.localeCompare(b.paid)
      } else if (sortField === 'plannedAmount') {
        comparison = a.plannedAmount.localeCompare(b.plannedAmount)
      } else if (sortField === 'comment') {
        comparison = a.comment.localeCompare(b.comment)
      } else if (sortField === 'registrationDate') {
        comparison = a.registrationDate.localeCompare(b.registrationDate)
      } else if (sortField === 'nextVisit') {
        comparison = a.nextVisit.localeCompare(b.nextVisit)
      } else if (sortField === 'nextReminder') {
        comparison = a.nextReminder.localeCompare(b.nextReminder)
      }

      return sortDirection === 'desc' ? -comparison : comparison
    })
  }, [patients, sortField, sortDirection])

  const isAllSelected = patients.length > 0 && selectedPatients.length === patients.length
  const isIndeterminate = selectedPatients.length > 0 && selectedPatients.length < patients.length

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
            minWidth: 1200,
            borderCollapse: 'separate',
            borderSpacing: 0,
            tableLayout: 'auto',
          }}>
          <TableHead>
            <TableRow sx={{ background: '#f8f9fb' }}>
              <TableCell sx={{ width: 48, p: 0, background: '#f8f9fb', border: 'none' }}>
                <Checkbox
                  indeterminate={isIndeterminate}
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                  sx={{
                    color: '#bbb',
                    '&.Mui-checked': {
                      color: '#0029d9',
                    },
                    '&.MuiCheckbox-indeterminate': {
                      color: '#0029d9',
                    },
                  }}
                />
              </TableCell>
              <TableCell sx={{ fontSize: 14, background: '#f8f9fb', border: 'none', width: 60 }}>№</TableCell>
              <TableCell sx={{ fontSize: 14, background: '#f8f9fb', border: 'none', minWidth: 200 }}>
                <TableSortLabel
                  active={sortField === 'name'}
                  direction={sortField === 'name' ? sortDirection : 'asc'}
                  onClick={() => handleSort('name')}
                  sx={{ color: '#000' }}>
                  Пацієнт
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ fontSize: 14, background: '#f8f9fb', border: 'none', minWidth: 120 }}>Пацієнт</TableCell>
              <TableCell sx={{ fontSize: 14, background: '#f8f9fb', border: 'none', minWidth: 140 }}>
                Номер телефону
              </TableCell>
              <TableCell sx={{ fontSize: 14, background: '#f8f9fb', border: 'none', minWidth: 140 }}>
                Виконано на суму
              </TableCell>
              <TableCell sx={{ fontSize: 14, background: '#f8f9fb', border: 'none', minWidth: 100 }}>
                Оплачено
              </TableCell>
              <TableCell sx={{ fontSize: 14, background: '#f8f9fb', border: 'none', minWidth: 140 }}>
                Заплановано на суму
              </TableCell>
              <TableCell sx={{ fontSize: 14, background: '#f8f9fb', border: 'none', minWidth: 150 }}>
                Коментар
              </TableCell>
              <TableCell sx={{ fontSize: 14, background: '#f8f9fb', border: 'none', minWidth: 140 }}>
                Дата реєстрації
              </TableCell>
              <TableCell sx={{ fontSize: 14, background: '#f8f9fb', border: 'none', minWidth: 140 }}>
                Наступний візит
              </TableCell>
              <TableCell sx={{ fontSize: 14, background: '#f8f9fb', border: 'none', minWidth: 140 }}>
                Наступне нагадування
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedPatients?.map((patient, idx) => (
              <TableRow
                key={patient.id}
                onContextMenu={(event) => handleContextMenu(event, patient)}
                sx={{
                  background: idx % 2 === 0 ? '#fff' : '#f8f9fb',
                  '&:last-child td, &:last-child th': { border: 0 },
                  border: 'none',
                  boxShadow: 'none',
                  minHeight: 56,
                  cursor: 'pointer',
                }}>
                <TableCell
                  sx={{ p: 0, width: 48, background: 'transparent', border: 'none', height: '100%', minHeight: 56 }}>
                  <Checkbox
                    checked={selectedPatients.indexOf(patient.id) !== -1}
                    onChange={() => handleSelectPatient(patient.id)}
                    onClick={(e) => e.stopPropagation()}
                    sx={{
                      color: '#bbb',
                      '&.Mui-checked': {
                        color: '#0029d9',
                      },
                    }}
                  />
                </TableCell>
                <TableCell sx={{ border: 'none', fontSize: 16, width: 60 }}>{patient.number}</TableCell>
                <TableCell
                  sx={{
                    border: 'none',
                    fontSize: 16,
                    minWidth: 200,
                  }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      cursor: 'pointer',
                      '&:hover': {
                        opacity: 0.7,
                      },
                    }}
                    onClick={() => navigate(`/patients/${patient.id}`)}>
                    <Avatar
                      src={patient.avatar}
                      alt={patient.name}
                      width={32}
                      height={32}
                      borderRadius="8px"
                      sx={{
                        fontSize: 14,
                        bgcolor: '#e0e0e0',
                        color: '#666',
                      }}
                    />
                    <span>{patient.name}</span>
                  </Box>
                </TableCell>
                <TableCell sx={{ border: 'none', fontSize: 16, minWidth: 120 }}>
                  <Chip
                    label="Не з'явився"
                    sx={{
                      backgroundColor: '#7324d5',
                      color: 'white',
                      fontSize: '14px',
                      height: '32px',
                      borderRadius: '8px',
                      fontWeight: 500,
                    }}
                  />
                </TableCell>
                <TableCell sx={{ border: 'none', fontSize: 16, minWidth: 140 }}>{patient.phoneNumber}</TableCell>
                <TableCell sx={{ border: 'none', fontSize: 16, minWidth: 140 }}>{patient.executedAmount}</TableCell>
                <TableCell sx={{ border: 'none', fontSize: 16, minWidth: 100 }}>{patient.paid}</TableCell>
                <TableCell sx={{ border: 'none', fontSize: 16, minWidth: 140 }}>{patient.plannedAmount}</TableCell>
                <TableCell sx={{ border: 'none', fontSize: 16, minWidth: 150 }}>
                  <Tooltip
                    title={<Typography sx={{ fontSize: '14px', lineHeight: 1.4 }}>{patient.comment}</Typography>}
                    placement="top"
                    arrow
                    PopperProps={{
                      sx: {
                        '& .MuiTooltip-tooltip': {
                          backgroundColor: '#424242',
                          color: 'white',
                          fontSize: '14px',
                          padding: '12px 16px',
                          maxWidth: 400,
                          borderRadius: '8px',
                          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                        },
                        '& .MuiTooltip-arrow': {
                          color: '#424242',
                        },
                        '& .MuiTypography-root': {
                          color: 'white',
                        },
                      },
                    }}>
                    <Box
                      sx={{
                        maxWidth: '200px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        '&:hover': {
                          backgroundColor: 'rgba(0, 41, 217, 0.08)',
                          borderRadius: '4px',
                          padding: '4px 8px',
                          margin: '-4px -8px',
                        },
                      }}>
                      {patient.comment}
                    </Box>
                  </Tooltip>
                </TableCell>
                <TableCell sx={{ border: 'none', fontSize: 16, minWidth: 140 }}>{patient.registrationDate}</TableCell>
                <TableCell sx={{ border: 'none', fontSize: 16, minWidth: 140 }}>{patient.nextVisit}</TableCell>
                <TableCell sx={{ border: 'none', fontSize: 16, minWidth: 140 }}>{patient.nextReminder}</TableCell>
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
      <ContextMenu
        mouseX={contextMenu?.mouseX || null}
        mouseY={contextMenu?.mouseY || null}
        onClose={handleCloseContextMenu}
        onSendMessage={handleSendMessage}
        onDelete={handleDeletePatient}
        onEdit={handleEditPatient}
      />
    </Box>
  )
}
