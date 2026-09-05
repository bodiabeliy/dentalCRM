import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Paper } from '@mui/material'
import { useTranslation } from 'react-i18next'
import type { SelectChangeEvent } from '@mui/material'
import { PaginationFooter } from '../pagination-footer'

interface Permission {
  label: string
  values: boolean[]
  code?: string
}

interface EnhancedPermissionsTableProps {
  permissions: Permission[]
  onTogglePermission?: (permissionIndex: number, roleIndex: number) => void
  page: number
  rowsPerPage: number
  onPageChange: (page: number) => void
  onRowsPerPageChange: (rowsPerPage: number) => void
  totalRows: number
  roleNames?: string[] // Add role names prop
}

export function EnhancedPermissionsTable({
  permissions,
  onTogglePermission,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  totalRows,
  roleNames = [],
}: EnhancedPermissionsTableProps) {
  const { t } = useTranslation(['workers'])
  const handleChangePage = (_event: React.ChangeEvent<unknown>, value: number) => {
    onPageChange(value - 1)
  }

  const handleChangeRowsPerPage = (event: SelectChangeEvent<number>) => {
    onRowsPerPageChange(Number(event.target.value))
    onPageChange(0)
  }

  // Determine which permissions to display based on pagination
  const startIndex = page * rowsPerPage

  const paginatedPermissions = permissions.slice(startIndex, startIndex + rowsPerPage)

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
        component={Paper}
        sx={{
          boxShadow: 'none',
          borderRadius: '12px',
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
        <Table>
          <TableHead>
            <TableRow sx={{ background: '#f8f9fb' }}>
              <TableCell sx={{ fontSize: 14, fontWeight: 500, background: '#fafaff', minWidth: 220 }}>
                {t('workers:permissions.access')}
              </TableCell>
              {/* Dynamically generate table headers based on available roles */}
              {paginatedPermissions.length > 0 &&
                paginatedPermissions[0].values.map((_, idx) => (
                  <TableCell
                    key={idx}
                    sx={{
                      fontSize: 14,
                      fontWeight: 500,
                      background: '#fafaff',
                      textAlign: 'center',
                      minWidth: 120,
                    }}>
                    {roleNames && roleNames[idx] ? roleNames[idx] : t('workers:permissions.roleN', { n: idx + 1 })}
                  </TableCell>
                ))}
              {paginatedPermissions.length > 0 && paginatedPermissions[0].values.length === 0 && (
                <TableCell sx={{ fontSize: 14, fontWeight: 500, background: '#fafaff', textAlign: 'center' }}>
                  {t('workers:permissions.rolesNotFound')}
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedPermissions.map((permission, idx) => (
              <TableRow key={idx} sx={{ background: idx % 2 === 0 ? '#fafaff' : '#f6f4fd' }}>
                <TableCell sx={{ fontWeight: 500 }}>{permission.label}</TableCell>
                {permission.values.map((checked, roleIdx) => (
                  <TableCell key={roleIdx} align="center">
                    <Checkbox
                      checked={checked}
                      onChange={() => onTogglePermission?.(idx + startIndex, roleIdx)}
                      sx={{
                        p: 0,
                        color: '#d0d0d0',
                        '&.Mui-checked': {
                          color: '#0029d9',
                        },
                      }}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
            {paginatedPermissions.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ py: 3 }}>
                  {t('workers:permissions.empty')}
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

// Role permissions matrix for a specific role
export function RolePermissionsMatrix({
  roleIndex,
  permissions,
  onToggle,
}: {
  roleIndex: number
  permissions: Array<{ label: string; values: boolean[] }>
  onToggle?: (permissionIndex: number) => void
}) {
  const { t } = useTranslation(['workers'])
  return (
    <TableContainer component={Paper} sx={{ borderRadius: '12px', boxShadow: 'none', mb: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontSize: 14, fontWeight: 500, background: '#fafaff' }}>
              {t('workers:permissions.access')}
            </TableCell>
            <TableCell sx={{ fontSize: 14, fontWeight: 500, background: '#fafaff', textAlign: 'center' }}>
              {t('workers:permissions.active')}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {permissions.map((permission, idx) => (
            <TableRow key={idx} sx={{ background: idx % 2 === 0 ? '#fafaff' : '#f6f4fd' }}>
              <TableCell sx={{ fontWeight: 500 }}>{permission.label}</TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={permission.values[roleIndex] || false}
                  onChange={() => onToggle?.(idx)}
                  sx={{
                    p: 0,
                    color: '#d0d0d0',
                    '&.Mui-checked': {
                      color: '#0029d9',
                    },
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
