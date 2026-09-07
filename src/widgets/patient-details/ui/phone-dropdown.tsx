import { Box, Typography, Paper, ClickAwayListener, Divider } from '@mui/material'

interface PhoneNumber {
  number: string
  label: string
}

interface PhoneDropdownProps {
  phoneNumbers: PhoneNumber[]
  onCallHistoryClick: () => void
  anchorEl: HTMLElement | null
  onClose: () => void
}

export function PhoneDropdown({ phoneNumbers, onCallHistoryClick, anchorEl, onClose }: PhoneDropdownProps) {
  if (!anchorEl) return null

  const rect = anchorEl.getBoundingClientRect()

  return (
    <ClickAwayListener onClickAway={onClose}>
      <Paper
        sx={{
          position: 'fixed',
          top: rect.bottom + 4,
          left: rect.left,
          minWidth: 220,
          zIndex: 1000,
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          borderRadius: '8px',
          overflow: 'hidden',
          backgroundColor: '#fff',
        }}>
        <Box
          onClick={onCallHistoryClick}
          sx={{
            fontWeight: 400,
            fontSize: 16,
            lineHeight: '150%',
            letterSpacing: '0.01em',
            color: '#0029d9',
            p: 2,
            pb: 1,
          }}>
          Історія дзвінків та СМС
        </Box>
        <Divider />
        {phoneNumbers?.map((phone, index) => (
          <Box
            key={index}
            sx={{
              px: 2,
              py: 0.5,
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: '#f8f9fb',
              },
            }}>
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: 16,
                lineHeight: '150%',
                letterSpacing: '0.01em',
                color: 'rgba(21, 22, 24, 0.87)',
              }}>
              {phone.number}
            </Typography>
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: 16,
                lineHeight: '150%',
                letterSpacing: '0.01em',
                color: 'rgba(21, 22, 24, 0.6)',
              }}>
              {phone.label}
            </Typography>
          </Box>
        ))}
      </Paper>
    </ClickAwayListener>
  )
}
