import React from 'react'
import { Box } from '@mui/material'
import MessageIcon from '../../../../shared/assets/icons/message.svg?react'
import CloseRedIcon from '../../../../shared/assets/icons/close-red.svg?react'
import CheckGreenIcon from '../../../../shared/assets/icons/check-green.svg?react'

interface StatusIconProps {
  status: 'failed' | 'success' | null
}

export const StatusIcon: React.FC<StatusIconProps> = ({ status }) => {
  if (!status) return null

  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <MessageIcon style={{ width: 24, height: 24 }} />
      {status === 'failed' && (
        <CloseRedIcon
          style={{
            position: 'absolute',
            top: 4,
            right: -8,
          }}
        />
      )}
      {status === 'success' && (
        <CheckGreenIcon
          style={{
            position: 'absolute',
            top: 4,
            right: -8,
          }}
        />
      )}
    </Box>
  )
}
