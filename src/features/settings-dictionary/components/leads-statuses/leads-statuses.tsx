import { useState } from 'react'
import {
  Box,
  Button,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Table,
  IconButton,
  Dialog,
  DialogContent,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  useTheme,
  useMediaQuery,
  Switch,
  FormControlLabel,
} from '@mui/material'
import { PaginationFooter } from '../../../settings-workers/ui/pagination-footer'
import { SearchField } from '../../../../shared/components'
import StatusIcon from '../../../../shared/assets/icons/status.svg?react'
import PencilIcon from '../../../../shared/assets/icons/pencil.svg?react'
import TrashIcon from '../../../../shared/assets/icons/trash.svg?react'
import PlusIcon from '../../../../shared/assets/icons/plus.svg?react'
import BadgeIcon from '../../../../shared/assets/icons/badge.svg?react'

const mockRows = [
  {
    name: 'Підтверджено',
    color: {
      label: 'Світло-зелений',
      value: '#8bc34a',
    },
    isArchived: true,
  },
  {
    name: 'Був візит',
    color: {
      label: 'Зелений',
      value: '#4caf50',
    },
    isArchived: false,
  },
  {
    name: `Не з'явився`,
    color: {
      label: 'Фіолетовий',
      value: '#9c27b0',
    },
    isArchived: false,
  },
]

export function LeadsStatuses() {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchQuery, setSearchQuery] = useState('')
  const [open, setOpen] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const [status, setStatus] = useState({
    name: '',
    color: '',
  })

  const handleClose = () => {
    setOpen(false)
    setStatus({
      name: '',
      color: '',
    })
  }
  return (
    <>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
        }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: isMobile ? 1 : 2,
            width: '100%',
          }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: isMobile ? 'flex-end' : 'space-between',
              width: '100%',
            }}>
            {!isMobile ? (
              <SearchField isStartAdornment value={searchQuery} onChange={setSearchQuery} fullWidth={false} />
            ) : null}
            <Button
              variant="contained"
              startIcon={<PlusIcon />}
              sx={{ mr: 2, fontSize: isMobile ? 12 : 14 }}
              onClick={() => setOpen(true)}>
              Додати статус
            </Button>
          </Box>
        </Box>
        <TableContainer
          component={Paper}
          sx={{
            boxShadow: 'none',
            mt: isMobile ? 1 : 2,
            width: '100%',
            overflowX: 'auto',
            '& .MuiTable-root': {
              minWidth: isMobile ? '100%' : 'auto',
            },
          }}>
          <Table sx={{ borderCollapse: 'separate', borderSpacing: 0, minWidth: isMobile ? '100%' : 'auto' }}>
            <TableHead>
              <TableRow style={{ background: '#f5f5f5' }}>
                <TableCell sx={{ p: isMobile ? 1 : 2, fontSize: isMobile ? 12 : 14, whiteSpace: 'nowrap' }}>
                  Назва
                </TableCell>
                <TableCell sx={{ p: isMobile ? 1 : 2, fontSize: isMobile ? 12 : 14, whiteSpace: 'nowrap' }}>
                  Колір
                </TableCell>
                <TableCell sx={{ p: isMobile ? 1 : 2, fontSize: isMobile ? 12 : 14, whiteSpace: 'nowrap' }}>
                  Архівувати
                </TableCell>
                <TableCell sx={{ p: isMobile ? 1 : 2, whiteSpace: 'nowrap' }}></TableCell>
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
                  <TableCell sx={{ p: isMobile ? 1 : 2, fontSize: isMobile ? 12 : 14, whiteSpace: 'nowrap' }}>
                    {row.name}
                  </TableCell>
                  <TableCell sx={{ p: isMobile ? 1 : 2, fontSize: isMobile ? 12 : 14, whiteSpace: 'nowrap' }}>
                    {row.color.label}{' '}
                    <StatusIcon style={{ color: row.color.value, marginLeft: isMobile ? '5px' : '10px' }} />
                  </TableCell>
                  <TableCell sx={{ p: isMobile ? 1 : 2, fontSize: isMobile ? 12 : 14, whiteSpace: 'nowrap' }}>
                    {row.isArchived ? 'Архівовано' : 'Активно'}
                  </TableCell>
                  <TableCell sx={{ p: isMobile ? 1 : 2, whiteSpace: 'nowrap' }}>
                    <IconButton size={isMobile ? 'small' : 'medium'}>
                      <PencilIcon />
                    </IconButton>
                    <IconButton size={isMobile ? 'small' : 'medium'}>
                      <TrashIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <PaginationFooter
          count={mockRows.length}
          page={page + 1}
          onPageChange={(_, value) => setPage(value - 1)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => setRowsPerPage(Number(e.target.value))}
          totalRows={48}
        />
      </Box>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <Box sx={{ display: 'flex', alignItems: 'center', p: 2, background: '#f4f7fe' }}>
          <BadgeIcon style={{ color: '#0029d9', marginRight: 8 }} />
          <Typography variant="h6" sx={{ fontWeight: 500, flex: 1 }}>
            Статус
          </Typography>
        </Box>
        <DialogContent sx={{ pb: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FormControl>
            <TextField
              label="Вкажіть назву"
              value={status.name}
              onChange={(e) => setStatus({ ...status, name: e.target.value })}
              fullWidth
              sx={{ background: '#fff', borderRadius: 2 }}
              InputLabelProps={{ shrink: true }}
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Колір користувача</InputLabel>
            <Select
              value={status.color}
              onChange={(e) => setStatus({ ...status, color: e.target.value })}
              label="Колір користувача"
              sx={{
                '& .MuiSelect-select': {
                  display: 'flex',
                  alignItems: 'center',
                },
              }}>
              <MenuItem value="#8bc34a" sx={{ display: 'flex', alignItems: 'center' }}>
                Світло-зелений
                <StatusIcon style={{ color: '#8bc34a', marginLeft: '10px' }} />
              </MenuItem>
              <MenuItem value="#4caf50" sx={{ display: 'flex', alignItems: 'center' }}>
                Зелений
                <StatusIcon style={{ color: '#4caf50', marginLeft: '10px' }} />
              </MenuItem>
              <MenuItem value="#9c27b0" sx={{ display: 'flex', alignItems: 'center' }}>
                Фіолетовий
                <StatusIcon style={{ color: '#9c27b0', marginLeft: '10px' }} />
              </MenuItem>
            </Select>
          </FormControl>
          <FormControlLabel control={<Switch />} label="Архівувати" />
        </DialogContent>
        <Box sx={{ display: 'flex', gap: '10px', justifyContent: 'flex-start', px: 3, pb: 3, pt: 1, mt: 2 }}>
          <Button
            variant="outlined"
            sx={{ borderColor: '#0029d9', color: '#0029d9', padding: '12px 22px' }}
            onClick={handleClose}>
            СКАСУВАТИ
          </Button>
          <Button variant="contained" sx={{ bgcolor: '#0029d9', padding: '12px 22px', flex: 1 }} onClick={() => {}}>
            ЗБЕРЕГТИ
          </Button>
        </Box>
      </Dialog>
    </>
  )
}
