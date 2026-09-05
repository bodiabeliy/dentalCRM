import { Box, Button, Typography, useTheme, IconButton } from '@mui/material'
import RocketIcon from '../shared/assets/icons/rocket.svg?react'
import ClinicIcon from '../shared/assets/icons/clinic.svg?react'
import PatientsIcon from '../shared/assets/icons/patients.svg?react'
import UserIcon from '../shared/assets/icons/leads.svg?react'

import LetterIcon from '../shared/assets/icons/letter.svg?react'
import InvitiesIcon from '../shared/assets/icons/invites.svg?react'

import CardBg from '../shared/assets/images/home_card_bg.png'
import { useMediaQuery } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SidebarLayout } from '../shared'
import MoreVerticalIcon from '../shared/assets/icons/more-vertical.svg?react'
import BellIcon from '../shared/assets/icons/bell.svg?react'
import { useAppDispatch, useAppSelector } from '../app/providers/store-helpers'
import { userSelector } from '../app/providers/reducers/UserSlice'
import { CreationModal } from '../features/clinic'
import { clinicInvitesSelector, clinicsSelector } from '../app/providers/reducers/ClinicSlice'
import { useNavigate } from 'react-router'
import { acceptInvite, decileInvite, getClinicById, getClinicsAll, getInvities } from '../app/services/ClinicService'
import type { IClinic, IClinicInvite } from '../app/providers/types/clinic'

export function CreateClinicPage() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [isCreateClinicDialogOpen, setIsCreateClinicDialogOpen] = useState(false)
  const { t } = useTranslation(['clinic'])

  const navigate = useNavigate()

  const currentUser = useAppSelector(userSelector)
  const currentClinicsList = useAppSelector(clinicsSelector)

  const currentClinicInviteList = useAppSelector(clinicInvitesSelector)
  const dispatch = useAppDispatch()

  const navigateTo = (clinikId: string) => {
    dispatch(getClinicById(clinikId))
    navigate('/clinic-settings')
  }

  useEffect(() => {
    dispatch(getInvities(currentUser.email))
  }, [dispatch, currentUser.email])

  useEffect(() => {
    dispatch(getClinicsAll())
  }, [dispatch])

  const acceptedInvite = useCallback(
    async (id: number) => {
      // Wait for server to accept the invite before refreshing list
      try {
        await dispatch(acceptInvite(id))
      } finally {
        await dispatch(getInvities(currentUser.email))
      }
    },
    [dispatch, currentUser.email]
  )

  const declinedInvite = useCallback(
    async (id: number) => {
      try {
        await dispatch(decileInvite(id))
      } finally {
        await dispatch(getInvities(currentUser.email))
      }
      // mock needed for improve
    },
    [dispatch, currentUser.email]
  )

  return (
    <SidebarLayout
      title={t('create.title', { ns: 'clinic' })}
      rightSidebar={
        <>
          <IconButton
            sx={{
              background: '#f5f7fe',
              border: '1px solid rgba(0, 41, 217, 0.3)',
              borderRadius: '8px',
              width: '40px',
              height: '40px',
            }}>
            <MoreVerticalIcon style={{ color: '#8a4bdc' }} />
          </IconButton>
          <IconButton
            sx={{
              background: '#8a4bdc',
              borderRadius: '8px',
              width: '40px',
              height: '40px',
            }}>
            <BellIcon style={{ color: 'white' }} />
          </IconButton>
        </>
      }>
      <Box sx={{ p: isMobile ? 2 : 4, flex: 1 }}>
        <Box>
          <Typography variant={isMobile ? 'h5' : 'h4'}>
            {t('create.welcome', { ns: 'clinic', name: currentUser.firstname })}
          </Typography>
          <Typography variant="body1">{t('create.welcomeSubtitle', { ns: 'clinic' })}</Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            gap: 4,
            mt: isMobile ? 2 : 0,
            p: isMobile ? 0 : 4,
            alignItems: 'stretch',
            flexDirection: { xs: 'column', lg: 'row' },
          }}>
          <Box>
            <Box sx={{ minHeight: isMobile ? 'auto' : '400px', minWidth: isMobile ? 'auto' : '600px' }}>
              {currentClinicsList.length > 0 && (
                <Typography
                  variant={isMobile ? 'subtitle1' : 'h6'}
                  sx={{ color: 'rgba(0, 41, 217, 1)', mb: isMobile ? 1 : 2 }}>
                  {t('create.yourClinic', { ns: 'clinic' })}
                </Typography>
              )}
              {currentClinicsList.map((currentClinic: IClinic) => (
                <Box key={currentClinic.id} sx={{ mt: isMobile ? 2 : 0 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      background: 'linear-gradient(153deg, rgba(121, 134, 203, 0) 0%, #2c334a 100%), #2c334a',
                      borderRadius: 2,
                      p: isMobile ? 2 : 4,
                      color: '#fff',
                      boxShadow:
                        '0 2px 3px -1px rgba(0, 0, 0, 0.1), 0 1px 12px 0 rgba(0, 0, 0, 0.1), 0 1px 3px 0 rgba(0, 0, 0, 0.05)',
                      mb: isMobile ? 2 : 4,
                      flexDirection: 'column',
                      gap: isMobile ? 2 : 4,
                    }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', width: isMobile ? 'auto' : '420px' }}>
                      {currentClinic?.logo ? (
                        <img
                          src={`${process.env.STATIC_FILES_URL}${currentClinic?.logo}`}
                          style={{ width: 44, height: 44, borderRadius: '8px', marginRight: '12px' }}
                        />
                      ) : (
                        <ClinicIcon
                          style={{
                            width: isMobile ? '44px' : '44px',
                            height: isMobile ? '44px' : '44px',
                            marginRight: '20px',
                          }}
                        />
                      )}

                      <Box sx={{ flex: 1 }}>
                        <Typography variant={'h5'} color="inherit">
                          {t('create.yourClinicNamed', { ns: 'clinic', name: currentClinic?.name })}
                        </Typography>
                        <Typography variant="body2" color="inherit">
                          {currentClinic?.subClinics && currentClinic.subClinics[0].name}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                          <PatientsIcon
                            style={{
                              color: '#9da2fa',
                            }}
                          />
                          <Typography variant="body2" color="inherit">
                            {t('create.patients', { ns: 'clinic', count: currentClinic.patientsCount })}
                          </Typography>
                          <UserIcon
                            style={{
                              color: '#9da2fa',
                            }}
                          />
                          <Typography variant="body2" color="inherit">
                            {t('create.staff', { ns: 'clinic', count: currentClinic.staffCount })}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    {/* Button */}
                    <Button
                      onClick={() => currentClinic?.id && navigateTo(currentClinic.id)}
                      variant="contained"
                      sx={{
                        background: '#9da2fa',
                        boxShadow:
                          '0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12)',
                        color: 'black',
                        borderRadius: '8px',
                        fontWeight: 600,
                        px: isMobile ? 2 : 4,
                        py: isMobile ? 1 : 2,
                        mt: isMobile ? 2 : 0,
                        '&:hover': {
                          background: 'white',
                        },
                      }}>
                      {t('create.goToClinic', { ns: 'clinic' })}
                    </Button>
                  </Box>
                </Box>
              ))}
              <Box>
                <Typography variant={isMobile ? 'subtitle1' : 'h6'} sx={{ color: 'rgba(0, 41, 217, 1)' }}>
                  {t('create.setupTitle', { ns: 'clinic' })}
                </Typography>
                <Box
                  sx={{
                    boxShadow:
                      '0 2px 3px -1px rgba(0, 0, 0, 0.1), 0 1px 12px 0 rgba(0, 0, 0, 0.1), 0 1px 3px 0 rgba(0, 0, 0, 0.05)',
                    background: 'linear-gradient(153deg, rgba(121, 134, 203, 0) 0%, #7986cb 100%), #2c334a',
                    borderRadius: 2,
                    p: isMobile ? 2 : 4,
                    mt: '16px',
                    color: '#fff',
                    minHeight: isMobile ? 'auto' : '400px',
                    textAlign: isMobile ? 'center' : 'left',
                  }}>
                  <RocketIcon
                    style={{
                      margin: '0 auto',
                      display: 'block',
                      width: isMobile ? '44px' : '52px',
                      height: isMobile ? '44px' : '52px',
                    }}
                  />
                  <Typography sx={{ mt: '24px' }} variant={isMobile ? 'subtitle1' : 'h6'} color="inherit">
                    {t('create.pitchTitle', { ns: 'clinic' })}
                  </Typography>
                  <Typography sx={{ mt: 1 }} variant={isMobile ? 'body2' : 'subtitle1'} color="inherit">
                    {t('create.pitchSubtitle', { ns: 'clinic' })}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      mx: 'auto',
                      display: 'block',
                      mt: '24px',
                      boxShadow:
                        '0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12)',
                      background: '#7324d5',
                      borderRadius: '8px',
                      padding: isMobile ? '6px 16px' : '12px 24px',
                    }}
                    onClick={() => setIsCreateClinicDialogOpen(true)}>
                    {t('create.createClinic', { ns: 'clinic' })}
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>

          {!currentClinicInviteList.length ? (
            <Box>
              <Typography variant={isMobile ? 'subtitle1' : 'h6'} sx={{ color: 'rgba(0, 41, 217, 1)' }}>
                {t('create.waitingInviteTitle', { ns: 'clinic' })}
              </Typography>
              <Box
                sx={{
                  background: `url(${CardBg})`,
                  backgroundPosition: '-25px -15px',
                  backgroundSize: '110% 110%',
                  backgroundRepeat: 'no-repeat',
                  backgroundColor: '#fff',
                  borderRadius: '8px',
                  mt: '16px',
                  p: isMobile ? 2 : 4,
                  pt: 4,
                  boxShadow:
                    '0 2px 3px -1px rgba(0, 0, 0, 0.1), 0 1px 12px 0 rgba(0, 0, 0, 0.1), 0 1px 3px 0 rgba(0, 0, 0, 0.05)',
                  minHeight: isMobile ? 'auto' : '100%',
                  textAlign: isMobile ? 'center' : 'left',
                }}>
                <LetterIcon
                  style={{
                    margin: '0 auto',
                    display: 'block',
                    width: isMobile ? '44px' : '52px',
                    height: isMobile ? '44px' : '52px',
                    fillOpacity: '0.56',
                  }}
                />
                <Typography variant={isMobile ? 'subtitle1' : 'h6'} sx={{ mt: '36px' }}>
                  {t('create.invitePendingTitle', { ns: 'clinic' })}
                </Typography>
                <Typography variant={isMobile ? 'body2' : 'subtitle1'} sx={{ mt: isMobile ? '12px' : '56px' }}>
                  {t('create.invitePendingText', { ns: 'clinic' })}
                </Typography>
              </Box>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              {currentClinicInviteList.map((invite: IClinicInvite) => (
                <Box key={invite.id}>
                  <Typography variant={isMobile ? 'subtitle1' : 'h6'} sx={{ color: '#7324d5' }}>
                    {t('create.inviteFrom', { ns: 'clinic' })}
                    {invite.inviter?.firstname + ' ' + invite.inviter?.lastname}
                  </Typography>
                  <Box
                    sx={{
                      background: `url(${CardBg})`,
                      backgroundPosition: '-25px -15px',
                      backgroundSize: '110% 110%',
                      backgroundRepeat: 'no-repeat',
                      backgroundColor: '#fff',
                      borderRadius: '8px',
                      mt: '16px',
                      p: isMobile ? 2 : 4,
                      pt: 4,
                      boxShadow:
                        '0 2px 3px -1px rgba(0, 0, 0, 0.1), 0 1px 12px 0 rgba(0, 0, 0, 0.1), 0 1px 3px 0 rgba(0, 0, 0, 0.05)',
                      minHeight: isMobile ? 'auto' : '400px',
                      textAlign: isMobile ? 'center' : 'left',
                    }}>
                    <InvitiesIcon
                      style={{
                        margin: '0 auto',
                        display: 'block',
                        width: isMobile ? '44px' : '52px',
                        height: isMobile ? '44px' : '52px',
                      }}
                    />
                    <Typography variant={isMobile ? 'subtitle1' : 'h6'} sx={{ mt: '36px' }}>
                      {t('create.invitedToClinic', { ns: 'clinic' })}
                    </Typography>
                    <Typography
                      style={{ fontSize: '36px', color: 'rgba(0, 41, 217, 1)' }}
                      variant={isMobile ? 'subtitle1' : 'h6'}>
                      "{invite.tenant}"
                    </Typography>
                    <Typography variant={isMobile ? 'body2' : 'subtitle1'} sx={{}}>
                      {t('create.inviteText', { ns: 'clinic', clinic: invite.tenant })}
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row' }}>
                      <Button
                        variant="contained"
                        sx={{
                          mx: 'auto',
                          display: 'block',
                          mt: '24px',
                          width: isMobile ? '100%' : '180px',
                          boxShadow:
                            '0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12)',
                          background: 'rgba(0, 41, 217, 1)',
                          borderRadius: '8px',
                          padding: isMobile ? '6px 16px' : '12px 24px',
                        }}
                        onClick={() => acceptedInvite(invite.id)}>
                        {t('create.accept', { ns: 'clinic' })}
                      </Button>
                      <Button
                        variant="contained"
                        sx={{
                          mx: 'auto',
                          display: 'block',
                          mt: '24px',
                          width: isMobile ? '100%' : '180px',
                          border: '1px solid rgba(0, 41, 217, 1)',
                          color: 'rgba(0, 41, 217, 1)',
                          background: 'transparent',
                          boxShadow:
                            '0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12)',
                          borderRadius: '8px',
                          padding: isMobile ? '6px 16px' : '12px 24px',
                        }}
                        onClick={() => declinedInvite(invite.id)}>
                        {t('create.decline', { ns: 'clinic' })}
                      </Button>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Box>
      <CreationModal open={isCreateClinicDialogOpen} onClose={() => setIsCreateClinicDialogOpen(false)} />
    </SidebarLayout>
  )
}
