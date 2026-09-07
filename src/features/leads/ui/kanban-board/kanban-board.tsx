import { Box, Typography, IconButton, Chip, Paper, Stack } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Avatar } from '../../../../shared/components/ui/avatar'

function getLeadId(lead: { phone: string }) {
  return lead.phone
}

// migrate to constants in the future
const initialColumns = [
  {
    key: 'appointment',
    title: 'Записані на прийом',
    count: 350,
    color: '#fff',
    bg: '#219653',
    border: '#219653',
    leads: [
      {
        name: 'Олександр Петро',
        phone: '067483276',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        date: '20.10.2024 20:12',
        weeks: 29,
      },
      {
        name: 'Андрій Петрович',
        phone: '098765431',
        avatar: '',
        date: '16.11.2025 19:00',
        weeks: 30,
      },
      {
        name: 'Катерина Іваненко',
        phone: '012345679',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        date: '26.12.2025 15:30',
        weeks: 41,
      },
    ],
  },
  // ...other columns unchanged...
  {
    key: 'missed',
    title: 'Недозвон',
    count: 150,
    color: '#fff',
    bg: '#FFA000',
    border: '#FFA000',
    leads: [
      {
        name: 'Олександр Коваленко',
        phone: '123456788',
        avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
        date: '31.01.2026 10:30',
        weeks: 36,
      },
      {
        name: 'Тетяна Соловйова',
        phone: '987654320',
        avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
        date: '11.02.2026 12:45',
        weeks: 29,
      },
    ],
  },
  {
    key: 'inwork',
    title: 'В роботі',
    count: 400,
    color: '#fff',
    bg: '#2D358F',
    border: '#2D358F',
    leads: [
      {
        name: 'Ірина Григоренко',
        phone: '067123456',
        avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
        date: '15.11.2024 14:20',
        weeks: 28,
      },
      {
        name: 'Сергій Васильєв',
        phone: '098765432',
        avatar: '',
        date: '22.11.2025 16:00',
        weeks: 27,
        highlight: true,
      },
      {
        name: 'Людмила Коваль',
        phone: '012346789',
        avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
        date: '15.12.2025 11:15',
        weeks: 20,
      },
    ],
  },
  {
    key: 'refused',
    title: 'Відмова',
    count: 180,
    color: '#fff',
    bg: '#EB5757',
    border: '#EB5757',
    leads: [
      {
        name: 'Марія Сидоренко',
        phone: '123456789',
        avatar: 'https://randomuser.me/api/portraits/women/77.jpg',
        date: '10.02.2026 09:00',
        weeks: 34,
      },
      {
        name: 'Анатолій Михайлов',
        phone: '987654321',
        avatar: 'https://randomuser.me/api/portraits/men/78.jpg',
        date: '05.03.2026 13:30',
        weeks: 25,
      },
    ],
  },
]
// decompose this component in the future
export function KanbanBoard() {
  const { t } = useTranslation('leads')
  const [columns, setColumns] = useState(initialColumns)
  const dragItem = useRef<{ colIdx: number; leadIdx: number } | null>(null)
  const dragOver = useRef<{ colIdx: number; leadIdx: number } | null>(null)

  const handleDragStart = (colIdx: number, leadIdx: number) => {
    dragItem.current = { colIdx, leadIdx }
  }

  const handleDragEnter = (colIdx: number, leadIdx: number) => {
    dragOver.current = { colIdx, leadIdx }
    if (!dragItem.current) return
    if (dragItem.current.colIdx === colIdx && dragItem.current.leadIdx === leadIdx) {
      return
    }
    setColumns((prevCols) => {
      const newCols = prevCols?.map((col) => ({
        ...col,
        leads: [...col.leads],
      }))
      const sourceCol = newCols[dragItem.current!.colIdx]
      const destCol = newCols[colIdx]
      const [movedLead] = sourceCol.leads.splice(dragItem.current!.leadIdx, 1)
      destCol.leads.splice(leadIdx, 0, movedLead)
      dragItem.current = { colIdx, leadIdx }
      return newCols
    })
  }

  const handleDragEnd = () => {
    dragItem.current = null
    dragOver.current = null
  }

  const handleDropOnColumn = (colIdx: number) => {
    if (!dragItem.current) return
    setColumns((prevCols) => {
      const newCols = prevCols?.map((col) => ({
        ...col,
        leads: [...col.leads],
      }))
      const sourceCol = newCols[dragItem.current!.colIdx]
      const destCol = newCols[colIdx]
      const [movedLead] = sourceCol.leads.splice(dragItem.current!.leadIdx, 1)
      destCol.leads.push(movedLead)
      return newCols
    })
    dragItem.current = null
    dragOver.current = null
  }

  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', width: '100%' }}>
      {columns?.map((col, colIdx) => (
        <Paper
          key={col.key}
          sx={{
            flex: 1,
            minWidth: 300,
            maxWidth: 340,
            background: '#fff',
            borderRadius: '12px',
            boxShadow: '0 2px 8px 0 rgba(44, 62, 80, 0.10)',
            p: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 0,
          }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => {
            if (dragItem.current && (col.leads.length === 0 || dragItem.current.colIdx !== colIdx)) {
              handleDropOnColumn(colIdx)
            }
          }}>
          {/* Header */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              px: 2,
              py: 1.2,
              borderTopLeftRadius: '12px',
              borderTopRightRadius: '12px',
              background: col.bg,
              color: col.color,
              fontWeight: 600,
              fontSize: 17,
              minHeight: 44,
            }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                color: col.color,
                flex: 1,
                fontSize: 17,
                letterSpacing: 0.1,
              }}>
              {t('kanbanCardTitle', { title: col.title })}
            </Typography>
            <Chip
              label={col.count}
              size="small"
              sx={{
                bgcolor: 'rgba(255,255,255,0.2)',
                color: col.color,
                fontWeight: 500,
                fontSize: 15,
                ml: 1,
                mr: 1,
                borderRadius: 2,
                height: 28,
                px: 1.5,
                letterSpacing: 0.1,
              }}
            />
            <IconButton size="small" sx={{ color: col.color, ml: 0.5 }}>
              <AddIcon />
            </IconButton>
          </Box>
          {/* Leads */}
          <Stack spacing={1.2} sx={{ p: 1.2, pt: 1.5, border: `1px solid ${col.border}` }}>
            {col.leads?.map((lead, leadIdx) => (
              <Paper
                key={getLeadId(lead)}
                draggable
                onDragStart={() => handleDragStart(colIdx, leadIdx)}
                onDragEnter={() => handleDragEnter(colIdx, leadIdx)}
                onDragEnd={handleDragEnd}
                sx={{
                  p: 1.2,
                  borderRadius: '10px',
                  border: '1.5px solid #E0E0E0',
                  background: '#F8F9FB',
                  boxShadow: 'none',
                  mb: 0.5,
                  position: 'relative',
                  cursor: 'grab',
                  transition: 'border 0.2s, box-shadow 0.2s',
                  ...(lead.highlight && {
                    border: `2px solid ${col.bg}`,
                    background: '#fff',
                    boxShadow: `0 0 0 2px ${col.bg}33`,
                  }),
                  '&:hover': {
                    border: `1.5px solid ${col.bg}`,
                  },
                }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Avatar
                    src={lead.avatar}
                    width={44}
                    height={44}
                    borderRadius="8px"
                    sx={{
                      bgcolor: '#e0e0e0',
                      fontSize: 18,
                    }}
                  />
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography sx={{ fontWeight: 500, fontSize: 16, color: '#222', lineHeight: 1.1 }}>
                      {lead.name}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 15,
                        color: col.bg,
                        textDecoration: 'underline',
                        cursor: 'pointer',
                        lineHeight: 1.2,
                        fontWeight: 500,
                      }}
                      component="a"
                      href={`tel:${lead.phone}`}>
                      {lead.phone}
                    </Typography>
                  </Box>
                  <IconButton size="small" sx={{ color: '#888' }}>
                    <MoreVertIcon />
                  </IconButton>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, gap: 1 }}>
                  <Typography sx={{ fontSize: 14, color: '#6B7683', flex: 1 }}>{lead.date}</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <ChatBubbleOutlineIcon sx={{ fontSize: 18, color: '#BDBDBD' }} />
                    <Typography sx={{ fontSize: 14, color: '#6B7683', fontWeight: 500 }}>{lead.weeks} тиж</Typography>
                  </Box>
                </Box>
              </Paper>
            ))}
          </Stack>
        </Paper>
      ))}
    </Box>
  )
}
