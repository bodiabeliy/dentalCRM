import { useNavigate } from 'react-router'
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
import type { SelectChangeEvent } from '@mui/material'
import { useState, useMemo, type ChangeEvent } from 'react'
import { PaginationFooter } from '../../../settings-workers/ui/pagination-footer'
import type { Lead, SortField, SortDirection } from '../../model/types'
import { ContextMenu } from '../context-menu/context-menu'
import { KanbanBoard } from '../kanban-board/kanban-board'
import { Avatar } from '../../../../shared/components/ui/avatar'

interface LeadsTableProps {
  leads: Lead[]
  totalRows: number
  page: number
  rowsPerPage: number
  onPageChange: (page: number) => void
  onRowsPerPageChange: (rowsPerPage: number) => void
  selectedLeads: string[]
  onSelectionChange: (selectedIds: string[]) => void
  onSendMessage?: (lead: Lead) => void
  onDeleteLead?: (lead: Lead) => void
  onEditLead?: (lead: Lead) => void
  isShowKanban: boolean
}

export function LeadsTable({
  leads,
  totalRows,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  selectedLeads,
  onSelectionChange,
  onSendMessage,
  onDeleteLead,
  onEditLead,
  isShowKanban,
}: LeadsTableProps) {
  const [sortField, setSortField] = useState<SortField>('firstName')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')
  const [contextMenu, setContextMenu] = useState<{
    mouseX: number
    mouseY: number
    lead: Lead
  } | null>(null)

  const navigate = useNavigate()

  //  navigation and routing logic
  const openLeadInfoPage = (lead: Lead) => {
    navigate(`/leads/${lead.id}`, { state: { lead } })
  }

  const handleChangePage = (_event: ChangeEvent<unknown>, value: number) => {
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
      onSelectionChange(leads.map((lead) => lead.id))
    } else {
      onSelectionChange([])
    }
  }

  const handleSelectLead = (leadId: string) => {
    const selectedIndex = selectedLeads.indexOf(leadId)
    let newSelected: string[] = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedLeads, leadId)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedLeads.slice(1))
    } else if (selectedIndex === selectedLeads.length - 1) {
      newSelected = newSelected.concat(selectedLeads.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selectedLeads.slice(0, selectedIndex), selectedLeads.slice(selectedIndex + 1))
    }

    onSelectionChange(newSelected)
  }

  const handleContextMenu = (event: React.MouseEvent, lead: Lead) => {
    event.preventDefault()
    setContextMenu({
      mouseX: event.clientX + 2,
      mouseY: event.clientY - 6,
      lead,
    })
  }

  const handleCloseContextMenu = () => {
    setContextMenu(null)
  }

  const handleSendMessage = () => {
    if (contextMenu?.lead && onSendMessage) {
      onSendMessage(contextMenu.lead)
    }
  }

  const handleDeleteLead = () => {
    if (contextMenu?.lead && onDeleteLead) {
      onDeleteLead(contextMenu.lead)
    }
  }

  const handleEditLead = () => {
    if (contextMenu?.lead && onEditLead) {
      onEditLead(contextMenu.lead)
    }
  }

  const sortedLeads = useMemo(() => {
    return [...leads]
  }, [leads, sortField, sortDirection])

  const isAllSelected = leads.length > 0 && selectedLeads.length === leads.length
  const isIndeterminate = selectedLeads.length > 0 && selectedLeads.length < leads.length

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
      <TableContainer sx={{}}>
        {!isShowKanban ? (
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
                    active={sortField === 'firstName'}
                    direction={sortField === 'firstName' ? sortDirection : 'asc'}
                    onClick={() => handleSort('firstName')}
                    sx={{ color: '#000' }}>
                    Лід
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontSize: 14, background: '#f8f9fb', border: 'none', minWidth: 120 }}>
                  Статус
                </TableCell>
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
              {sortedLeads.map((lead: Lead, idx: number) => (
                <TableRow
                  key={lead.id}
                  onContextMenu={(event) => handleContextMenu(event, lead)}
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
                      checked={selectedLeads.indexOf(lead.id) !== -1}
                      onChange={() => handleSelectLead(lead.id)}
                      onClick={(e) => e.stopPropagation()}
                      sx={{
                        color: '#bbb',
                        '&.Mui-checked': {
                          color: '#0029d9',
                        },
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ border: 'none', fontSize: 16, width: 60 }}>{lead.id}</TableCell>
                  <TableCell
                    sx={{
                      border: 'none',
                      fontSize: 16,
                      minWidth: 200,
                    }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }} onClick={() => openLeadInfoPage(lead)}>
                      <Avatar
                        src={lead.avatar}
                        alt={lead.name}
                        width={32}
                        height={32}
                        borderRadius="8px"
                        sx={{
                          fontSize: 14,
                          bgcolor: '#e0e0e0',
                          color: '#666',
                        }}
                      />
                      <span>{lead.name}</span>
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
                  <TableCell sx={{ border: 'none', fontSize: 16, minWidth: 140 }}>{lead.phoneNumber}</TableCell>
                  <TableCell sx={{ border: 'none', fontSize: 16, minWidth: 140 }}>{lead.executedAmount}</TableCell>
                  <TableCell sx={{ border: 'none', fontSize: 16, minWidth: 100 }}>{lead.paid}</TableCell>
                  <TableCell sx={{ border: 'none', fontSize: 16, minWidth: 140 }}>{lead.plannedAmount}</TableCell>
                  <TableCell sx={{ border: 'none', fontSize: 16, minWidth: 150 }}>
                    <Tooltip
                      title={<Typography sx={{ fontSize: '14px', lineHeight: 1.4 }}>{lead.comment}</Typography>}
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
                        {lead.comment}
                      </Box>
                    </Tooltip>
                  </TableCell>
                  <TableCell sx={{ border: 'none', fontSize: 16, minWidth: 140 }}>{lead.registrationDate}</TableCell>
                  <TableCell sx={{ border: 'none', fontSize: 16, minWidth: 140 }}>{lead.nextVisit}</TableCell>
                  <TableCell sx={{ border: 'none', fontSize: 16, minWidth: 140 }}>{lead.nextReminder}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <KanbanBoard />
        )}
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
        onDelete={handleDeleteLead}
        onEdit={handleEditLead}
      />
    </Box>
  )
}
