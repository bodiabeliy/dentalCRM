import { useEffect } from 'react'

import { Box, IconButton, ListItemButton, Typography } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import { getUser, logout } from '../../../../../../app/services/UserService'
import { useAppDispatch, useAppSelector } from '../../../../../../app/providers/store-helpers'
import { userSelector } from '../../../../../../app/providers/reducers/UserSlice'
import AvatarImage from '../../../../../assets/images/avatar.png'

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import { useNavigate } from 'react-router'

interface UserProfileProps {
  isCollapsed: boolean
  settingsLink: string
  onSettingsClick: () => void
}

export function UserProfileComponent({ isCollapsed, onSettingsClick }: UserProfileProps) {
  const dispatch = useAppDispatch()
  const currentUser = useAppSelector(userSelector)
  const navigate = useNavigate()
  const userAvatar = currentUser.photo ? `${process.env.STATIC_FILES_URL + currentUser.photo}` : AvatarImage

  useEffect(() => {
    dispatch(getUser())
  }, [])

  const sessionLogout = async () => {
    await dispatch(logout())
    await navigate('/login', { replace: true })
  }
  return (
    <Box
      sx={{
        mt: 'auto',
        p: isCollapsed ? '8px 0' : '8px',
        display: 'flex',
        justifyContent: isCollapsed ? 'center' : 'flex-start',
      }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          p: isCollapsed ? 0 : '16px 8px',
          bgcolor: 'transparent',
          borderRadius: '8px',
          cursor: 'pointer',
          transition: 'background 0.2s',
          width: '100%',
          '&:hover': {
            background: 'rgba(255,255,255,0.08)',
          },
        }}
        tabIndex={0}
        role="button"
        aria-label="Перейти до налаштувань профілю">
        {!isCollapsed ? (
          <Box>
            <Box sx={{ display: 'flex' }}>
              {currentUser.photo != null ? (
                <img
                  src={userAvatar}
                  alt="User Avatar"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    border: '2px solid rgba(255,255,255,0.2)',
                  }}
                />
              ) : (
                <AccountCircleOutlinedIcon sx={{ mt: 1 }} />
              )}

              <Box sx={{ marginLeft: '6px' }} onClick={onSettingsClick}>
                <Typography sx={{ fontWeight: 500, fontSize: '14px', whiteSpace: 'nowrap', color: 'white' }}>
                  {currentUser?.firstname + ' ' + currentUser.lastname}
                </Typography>
                <Typography sx={{ fontSize: '12px', color: '#b9c5fd', whiteSpace: 'nowrap' }}>
                  {currentUser?.email}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', ml: '-5%' }}>
                <ListItemButton
                  onClick={() => sessionLogout()}
                  sx={{
                    borderRadius: '6px',
                    py: isCollapsed ? '12px' : '8px',
                    justifyContent: isCollapsed ? 'center' : 'flex-start',
                    minHeight: isCollapsed ? '48px' : 'auto',
                  }}>
                  <IconButton
                    size="small"
                    sx={{
                      color: 'white',
                      padding: '4px',
                    }}>
                    <LogoutIcon />
                  </IconButton>
                </ListItemButton>
              </Box>
            </Box>
          </Box>
        ) : (
          <ListItemButton
            onClick={() => sessionLogout()}
            sx={{
              borderRadius: '6px',
              py: isCollapsed ? '12px' : '8px',
              justifyContent: isCollapsed ? 'center' : 'flex-start',
              minHeight: isCollapsed ? '48px' : 'auto',
            }}>
            <IconButton
              size="small"
              sx={{
                color: 'white',
                padding: '4px',
              }}>
              <LogoutIcon />
            </IconButton>
          </ListItemButton>
        )}
      </Box>
    </Box>
  )
}
