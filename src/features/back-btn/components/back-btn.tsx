import { IconButton, type SxProps } from '@mui/material'
import ArrowIcon from '../../../shared/assets/icons/arrow.svg?react'

export function BackBtn({ handleBack, sx }: { handleBack: () => void; sx?: SxProps }) {
  return (
    <IconButton onClick={handleBack} sx={sx}>
      <ArrowIcon style={{ color: '#b3b8c3' }} />
    </IconButton>
  )
}
