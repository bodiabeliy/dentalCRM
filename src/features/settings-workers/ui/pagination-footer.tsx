import { Box, Select, MenuItem, Pagination, useMediaQuery, useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import type { SelectChangeEvent } from '@mui/material'

interface PaginationFooterProps {
  count: number
  page: number
  onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void
  rowsPerPage: number
  onRowsPerPageChange: (event: SelectChangeEvent<number>) => void
  totalRows: number
}

export function PaginationFooter({
  count,
  page,
  onPageChange,
  rowsPerPage,
  onRowsPerPageChange,
  totalRows,
}: PaginationFooterProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const { t } = useTranslation(['common'])

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 2,
        py: 1.5,
        background: '#fff',
        borderBottomLeftRadius: '16px',
        borderBottomRightRadius: '16px',
        marginTop: 'auto',
      }}>
      {!isMobile ? (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, fontSize: 14, color: '#444' }}>
          <span>{t('common:rowsOnTable')}</span>
          <Select<number>
            value={rowsPerPage}
            onChange={onRowsPerPageChange}
            variant="standard"
            disableUnderline
            sx={{ fontSize: 14, mx: 0.5, minWidth: 32 }}>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
          <span>
            {t('common:totalRows')} {totalRows}
          </span>
        </Box>
      ) : null}
      <Pagination
        count={count}
        page={page}
        onChange={onPageChange}
        shape="rounded"
        color="primary"
        siblingCount={1}
        boundaryCount={1}
        sx={{
          '& .MuiPaginationItem-root': {
            borderRadius: '8px',
            minWidth: 36,
          },
        }}
      />
    </Box>
  )
}
