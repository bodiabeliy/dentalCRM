import React, { useState } from 'react'
import { Box, Popover, Typography } from '@mui/material'
import { AssistantEventCard } from '../../../calendar/components/assistant-event-card'
import { computeOverlaps, getMaxOverlapCount } from '../../../calendar/utils/computeOverlaps'
import { calculateEventPosition } from '../../../../shared/utils/dateUtils'

interface AssistantCabinet {
  id: number
  name: string
  color?: string
  assistants: Array<{
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

interface AssistantGridProps {
  cabinets: { id: number; name: string }[]
  assistantsCabinets: AssistantCabinet[][]
  timeColumnWidth: number
  eventColumnWidth: number
  totalHeaderHeight: number
  slotHeight: number
  onAssistantContextMenu: (e: React.MouseEvent, assistantId: number) => void
}

type AssistantPopupType = {
  id: number
  name: string
  surname: string
  scheduledTimeStart: string
  scheduledTimeEnd: string
  actualTimeStart?: string
  actualTimeEnd?: string
  avatar?: string
} | null

export const AssistantGrid = React.memo(
  ({
    cabinets,
    assistantsCabinets,
    timeColumnWidth,
    eventColumnWidth,
    totalHeaderHeight,
    slotHeight,
    onAssistantContextMenu,
  }: AssistantGridProps) => {
    const [assistantPopup, setAssistantPopup] = useState<{
      anchorEl: HTMLElement | null
      assistant: AssistantPopupType
    }>({ anchorEl: null, assistant: null })

    const handleAssistantClick = (event: React.MouseEvent<HTMLElement>, assistant: AssistantPopupType) => {
      setAssistantPopup({ anchorEl: event.currentTarget, assistant })
    }

    const handleAssistantPopupClose = () => {
      if (document.activeElement) {
        ;(document.activeElement as HTMLElement).blur()
      }
      setAssistantPopup({ anchorEl: null, assistant: null })
    }

    const handleAssistantContextMenu = (e: React.MouseEvent, assistant: AssistantPopupType) => {
      e.preventDefault()
      e.stopPropagation()
      if (assistant) {
        onAssistantContextMenu(e, assistant.id)
      }
    }

    return (
      <>
        {assistantsCabinets.map((dayAssistantsCabinets, dayIdx) =>
          dayAssistantsCabinets.map((assistantCabinet) => {
            const cabinet = cabinets.find((cab) => cab.id === assistantCabinet.id)
            if (!cabinet) return null

            const cIdx = cabinets.findIndex((cab) => cab.id === assistantCabinet.id)
            const assistants = assistantCabinet.assistants || []
            const overlapped = computeOverlaps(assistants)
            const withMaxOverlap = getMaxOverlapCount(overlapped)
            const gap = 4

            return withMaxOverlap.map((assistant) => {
              const {
                scheduledTimeStart,
                scheduledTimeEnd,
                actualTimeStart,
                actualTimeEnd,
                overlapGroupIndex,
                maxOverlap,
              } = assistant

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
                <React.Fragment key={`assistant-block-${dayIdx}-${cabinet.id}-${assistant.id}`}>
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
                    onClick={(e) => {
                      if (e.currentTarget.blur) e.currentTarget.blur()
                      if (document.activeElement && e.currentTarget.contains(document.activeElement)) {
                        const activeElement = document.activeElement as HTMLElement
                        if (
                          activeElement.tagName !== 'INPUT' &&
                          activeElement.tagName !== 'TEXTAREA' &&
                          activeElement.tagName !== 'SELECT'
                        ) {
                          activeElement.blur()
                        }
                      }
                      handleAssistantClick(e, assistant)
                    }}
                    onContextMenu={(e) => handleAssistantContextMenu(e, assistant)}
                    onMouseDown={(e: React.MouseEvent) => {
                      if (document.activeElement && e.currentTarget.contains(document.activeElement)) {
                        const activeElement = document.activeElement as HTMLElement
                        if (
                          activeElement.tagName !== 'INPUT' &&
                          activeElement.tagName !== 'TEXTAREA' &&
                          activeElement.tagName !== 'SELECT'
                        ) {
                          activeElement.blur()
                        }
                      }
                      if (e.button === 0) e.preventDefault()
                    }}>
                    <AssistantEventCard assistant={assistant} />
                  </Box>
                </React.Fragment>
              )
            })
          })
        )}
        <Popover
          open={Boolean(assistantPopup.anchorEl)}
          anchorEl={assistantPopup.anchorEl}
          onClose={handleAssistantPopupClose}
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
          {assistantPopup.assistant && (
            <Box sx={{ display: 'flex', alignItems: 'center', p: 1, pr: 2 }}>
              <img
                src={assistantPopup.assistant.avatar}
                alt={assistantPopup.assistant.name}
                style={{ borderRadius: '8px', width: '40px', height: '40px', marginRight: '6px' }}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5, gap: 1 }}>
                  <Typography sx={{ fontSize: 14, lineHeight: '143%', letterSpacing: '0.01em', color: '#c5e1a5' }}>
                    Планований час
                  </Typography>
                  <Typography sx={{ fontSize: 14, lineHeight: '143%', letterSpacing: '0.01em', color: '#c5e1a5' }}>
                    {assistantPopup.assistant.scheduledTimeStart}–{assistantPopup.assistant.scheduledTimeEnd}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography sx={{ fontSize: 14, lineHeight: '143%', letterSpacing: '0.01em', color: '#c5c7fc' }}>
                    Фактичний час
                  </Typography>
                  <Typography sx={{ fontSize: 14, lineHeight: '143%', letterSpacing: '0.01em', color: '#c5c7fc' }}>
                    {assistantPopup.assistant.actualTimeStart}–{assistantPopup.assistant.actualTimeEnd}
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
