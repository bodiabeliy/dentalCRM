import React, { useState } from 'react'
import { Box, Popover, Typography } from '@mui/material'
import { AdministratorEventCard } from '../../../calendar/components/administrator-event-card'
import { computeOverlaps, getMaxOverlapCount } from '../../../calendar/utils/computeOverlaps'
import { calculateEventPosition } from '../../../../shared/utils/dateUtils'

interface AdministratorCabinet {
  id: number
  name: string
  color?: string
  administrators: Array<{
    id: number
    name: string
    surname: string
    actualTimeStart: string
    actualTimeEnd: string
    scheduledTimeStart: string
    scheduledTimeEnd: string
    avatarUrl?: string
  }>
}

interface AdministratorGridProps {
  cabinets: { id: number; name: string }[]
  administratorsCabinets: AdministratorCabinet[][]
  timeColumnWidth: number
  eventColumnWidth: number
  totalHeaderHeight: number
  slotHeight: number
  onAdministratorContextMenu: (e: React.MouseEvent, administratorId: number) => void
  onEdit?: (administratorId: number) => void
}

type AdministratorPopupType = {
  id: number
  name: string
  surname: string
  scheduledTimeStart: string
  scheduledTimeEnd: string
  actualTimeStart?: string
  actualTimeEnd?: string
  avatar?: string
} | null

export const AdministratorGrid = React.memo(
  ({
    cabinets,
    administratorsCabinets,
    timeColumnWidth,
    eventColumnWidth,
    totalHeaderHeight,
    slotHeight,
    onAdministratorContextMenu,
    onEdit,
  }: AdministratorGridProps) => {
    const [administratorPopup, setAdministratorPopup] = useState<{
      anchorEl: HTMLElement | null
      administrator: AdministratorPopupType
    }>({ anchorEl: null, administrator: null })

    const handleAdministratorPopupClose = () => {
      if (document.activeElement) {
        ;(document.activeElement as HTMLElement).blur()
      }
      setAdministratorPopup({ anchorEl: null, administrator: null })
    }

    return (
      <>
        {administratorsCabinets.map((dayAdministratorsCabinets, dayIdx) =>
          dayAdministratorsCabinets.map((administratorCabinet) => {
            const cabinet = { id: administratorCabinet.id, name: administratorCabinet.name }
            const cIdx = cabinets.findIndex((cab) => cab.id === administratorCabinet.id)
            const administrators = administratorCabinet.administrators || []
            const overlapped = computeOverlaps(administrators)
            const withMaxOverlap = getMaxOverlapCount(overlapped)
            const gap = 4

            return withMaxOverlap.map((administrator) => {
              const {
                scheduledTimeStart,
                scheduledTimeEnd,
                actualTimeStart,
                actualTimeEnd,
                overlapGroupIndex,
                maxOverlap,
              } = administrator

              const scheduledPos = calculateEventPosition(scheduledTimeStart, scheduledTimeEnd, slotHeight)

              const actualPos =
                actualTimeStart && actualTimeEnd
                  ? calculateEventPosition(actualTimeStart, actualTimeEnd, slotHeight)
                  : null
              const widthPx = (eventColumnWidth - (maxOverlap - 1) * gap) / maxOverlap
              const left =
                timeColumnWidth +
                (dayIdx * cabinets.length + cIdx) * eventColumnWidth +
                overlapGroupIndex * (widthPx + gap)

              return (
                <React.Fragment key={`administrator-block-${dayIdx}-${cabinet.id}-${administrator.id}`}>
                  {actualPos && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: actualPos.top + totalHeaderHeight,
                        left: left,
                        width: widthPx,
                        height: actualPos.height,
                        bgcolor: '#d8dafd',
                        borderRadius: '8px',
                        zIndex: 1,
                        p: 0,
                        m: 0,
                      }}
                    />
                  )}

                  <Box
                    sx={{
                      position: 'absolute',
                      top: scheduledPos.top + totalHeaderHeight,
                      left: left,
                      width: widthPx,
                      height: scheduledPos.height,
                      zIndex: 2,
                      display: 'flex',
                      alignItems: 'stretch',
                      justifyContent: 'flex-start',
                      p: 0,
                      m: 0,
                      cursor: 'pointer',
                      userSelect: 'none',
                      outline: 'none',
                      '&:focus': { outline: 'none' },
                      '&:focus-visible': { outline: 'none' },
                      '& *': { outline: 'none' },
                    }}
                    onFocus={(e) => {
                      const target = e.target as HTMLElement
                      if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA' && target.tagName !== 'SELECT') {
                        e.currentTarget.blur()
                      }
                    }}
                    onClick={() => {
                      if (document.activeElement) {
                        const activeElement = document.activeElement as HTMLElement
                        if (
                          activeElement.tagName !== 'INPUT' &&
                          activeElement.tagName !== 'TEXTAREA' &&
                          activeElement.tagName !== 'SELECT'
                        ) {
                          activeElement.blur()
                        }
                      }
                      if (onEdit) onEdit(administrator.id)
                    }}
                    onContextMenu={(event) => onAdministratorContextMenu(event, administrator.id)}
                    onMouseDown={() => {
                      if (document.activeElement) {
                        const activeElement = document.activeElement as HTMLElement
                        if (
                          activeElement.tagName !== 'INPUT' &&
                          activeElement.tagName !== 'TEXTAREA' &&
                          activeElement.tagName !== 'SELECT'
                        ) {
                          activeElement.blur()
                        }
                      }
                    }}>
                    <AdministratorEventCard administrator={administrator} />
                  </Box>
                </React.Fragment>
              )
            })
          })
        )}
        <Popover
          open={Boolean(administratorPopup.anchorEl)}
          anchorEl={administratorPopup.anchorEl}
          onClose={handleAdministratorPopupClose}
          anchorOrigin={{ vertical: 'center', horizontal: 'right' }}
          transformOrigin={{ vertical: 'center', horizontal: 'left' }}
          PaperProps={{
            sx: {
              background: '#757575',
              borderRadius: '16px',
              boxShadow: 3,
              p: 0,
              minWidth: 260,
              maxWidth: 320,
              overflow: 'visible',
              outline: 'none',
            },
            onMouseDown: (e: React.MouseEvent) => e.preventDefault(),
          }}
          disableRestoreFocus
          disableAutoFocus
          disableEnforceFocus>
          {administratorPopup.administrator && (
            <Box sx={{ display: 'flex', alignItems: 'center', p: 1, pr: 2 }}>
              <img
                src={administratorPopup.administrator.avatar}
                alt={administratorPopup.administrator.name}
                style={{ borderRadius: '8px', width: '40px', height: '40px', marginRight: '6px' }}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5, gap: 1 }}>
                  <Typography sx={{ fontSize: 14, lineHeight: '143%', letterSpacing: '0.01em', color: '#c5e1a5' }}>
                    Планований час
                  </Typography>
                  <Typography sx={{ fontSize: 14, lineHeight: '143%', letterSpacing: '0.01em', color: '#c5e1a5' }}>
                    {administratorPopup.administrator.scheduledTimeStart}–
                    {administratorPopup.administrator.scheduledTimeEnd}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography sx={{ fontSize: 14, lineHeight: '143%', letterSpacing: '0.01em', color: '#c5c7fc' }}>
                    Фактичний час
                  </Typography>
                  <Typography sx={{ fontSize: 14, lineHeight: '143%', letterSpacing: '0.01em', color: '#c5c7fc' }}>
                    {administratorPopup.administrator.actualTimeStart}–{administratorPopup.administrator.actualTimeEnd}
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}
        </Popover>
      </>
    )
  }
)
