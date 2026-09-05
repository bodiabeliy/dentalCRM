import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox } from '@mui/material'

interface Permission {
  label: string
  values: boolean[]
}

interface PermissionsTableProps {
  permissions: Permission[]
}

export function PermissionsTable({ permissions }: PermissionsTableProps) {
  return (
    <TableContainer component={Paper} sx={{ borderRadius: '12px', boxShadow: 'none' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontSize: 14, background: '#fafaff' }}>Доступ</TableCell>
            <TableCell sx={{ fontSize: 14, background: '#fafaff', textAlign: 'center' }}>Адміністратори</TableCell>
            <TableCell sx={{ fontSize: 14, background: '#fafaff', textAlign: 'center' }}>Лікарі</TableCell>
            <TableCell sx={{ fontSize: 14, background: '#fafaff', textAlign: 'center' }}>Асистенти</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {permissions.map((permission, idx) => (
            <TableRow key={permission.label} sx={{ background: idx % 2 === 0 ? '#fafaff' : '#f6f4fd' }}>
              <TableCell sx={{ fontWeight: 500 }}>{permission.label}</TableCell>
              {permission.values.map((checked, i) => (
                <TableCell key={i} align="center">
                  <Checkbox checked={checked} sx={{ p: 0 }} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
