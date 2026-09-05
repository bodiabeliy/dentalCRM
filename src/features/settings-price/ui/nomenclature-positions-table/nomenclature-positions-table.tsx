import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material'
import SettingsIcon from '../../../../shared/assets/icons/settings_general.svg?react'
import type { NomenclaturePosition } from '../../model/types'

interface NomenclaturePositionsTableProps {
  positions: NomenclaturePosition[]
  onMenuOpen: (event: React.MouseEvent<HTMLElement>) => void
}

export function NomenclaturePositionsTable({ positions, onMenuOpen }: NomenclaturePositionsTableProps) {
  return (
    <TableContainer sx={{ boxShadow: 'none', borderRadius: 0 }}>
      <Table sx={{ minWidth: 650, borderCollapse: 'separate', borderSpacing: 0 }}>
        <TableHead>
          <TableRow sx={{ background: '#f5f5f5' }}>
            <TableCell sx={{ fontSize: 14, border: 'none', p: 1, pl: 2 }}>ID</TableCell>
            <TableCell sx={{ fontSize: 14, border: 'none', p: 1 }}>Назва позиції</TableCell>
            <TableCell sx={{ fontSize: 14, border: 'none', p: 1 }}>Тип</TableCell>
            <TableCell sx={{ fontSize: 14, border: 'none', p: 1 }}>Собівартість</TableCell>
            <TableCell sx={{ fontSize: 14, border: 'none', p: 1 }}>Кількість</TableCell>
            <TableCell sx={{ fontSize: 14, border: 'none', p: 1 }}>Сума</TableCell>
            <TableCell align="right" sx={{ border: 'none', p: 1 }}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {positions.map((row, idx) => (
            <TableRow
              key={row.id + idx}
              sx={{
                background: idx % 2 === 0 ? '#fff' : '#f5f7fe',
                '&:last-child td, &:last-child th': { border: 0 },
                border: 'none',
                boxShadow: 'none',
                minHeight: 56,
              }}>
              <TableCell sx={{ border: 'none', fontSize: 16, p: 0.5, pl: 2 }}>{row.id}</TableCell>
              <TableCell
                sx={{
                  border: 'none',
                  fontSize: 16,
                  p: 0.5,
                  '&:focus': {
                    outline: '2px solid #0029d9',
                    outlineOffset: '2px',
                    borderRadius: '4px',
                    position: 'relative',
                    zIndex: 1,
                  },
                }}>
                <span contentEditable>{row.name}</span>
                {row.positionQuantity && (
                  <span style={{ color: 'rgba(21, 22, 24, 0.6)' }}> ({row.positionQuantity})</span>
                )}
              </TableCell>
              <TableCell sx={{ border: 'none', fontSize: 16, p: 0.5, display: 'flex', alignItems: 'center' }}>
                {row.type}
              </TableCell>
              <TableCell sx={{ border: 'none', fontSize: 16, p: 0.5 }}>{row.cost.toFixed(2)} ₴</TableCell>
              <TableCell sx={{ border: 'none', fontSize: 16, p: 0.5 }}>
                {row.quantity} <span style={{ color: 'rgba(21, 22, 24, 0.6)' }}>{row.quantityType}</span>
              </TableCell>
              <TableCell sx={{ border: 'none', fontSize: 16, p: 0.5 }}>{row.sum.toFixed(2)} грн.</TableCell>
              <TableCell align="right" sx={{ border: 'none', p: 0.5 }}>
                <IconButton size="small" onClick={onMenuOpen}>
                  <SettingsIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
