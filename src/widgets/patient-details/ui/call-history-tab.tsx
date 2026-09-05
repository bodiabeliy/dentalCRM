import { Box, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody, Chip, Button } from '@mui/material'
import { PlayArrow as PlayArrowIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material'
import { useState } from 'react'
import { SearchField } from '../../../shared/components'
import LetterIcon from '../../../shared/assets/icons/letter.svg?react'

interface CallHistoryEntry {
  id: number
  line?: number
  caller: string
  status: 'Прийнято' | 'Зайнято' | 'Відхилено' | 'SMS'
  waiting?: string
  duration?: string
  date: string
  day: string
  time: string
  record?: string
  isSMS?: boolean
  message?: string
}

export function CallHistoryTab() {
  const [searchTerm, setSearchTerm] = useState('')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Прийнято':
        return '#2E7D32'
      case 'Зайнято':
        return '#ef6c00'
      case 'Відхилено':
        return '#c62828'
      default:
        return '#666'
    }
  }

  const getStatusIcon = (entry: CallHistoryEntry) => {
    if (entry.isSMS) {
      return <LetterIcon style={{ color: '#0029d9', width: 20, height: 16 }} />
    }
    switch (entry.status) {
      case 'Прийнято':
        return <ArrowBackIcon sx={{ color: '#2E7D32', transform: 'rotate(135deg)' }} />
      case 'Зайнято':
        return <ArrowBackIcon sx={{ color: '#ef6c00', transform: 'rotate(-45deg)' }} />
      case 'Відхилено':
        return <ArrowBackIcon sx={{ color: '#c62828', transform: 'rotate(-45deg)' }} />
      default:
        return ''
    }
  }

  const mockEntries: CallHistoryEntry[] = [
    {
      id: 1,
      line: 912,
      caller: 'Ніна Нінченко',
      status: 'Прийнято',
      waiting: '00:20',
      duration: '02:00',
      date: '21.23.2024',
      day: 'Вт',
      time: '15:30',
      record: 'Прослухати',
    },
    {
      id: 2,
      line: 912,
      caller: 'Ніна Нінченко',
      status: 'Зайнято',
      waiting: '00:20',
      date: '21.23.2024',
      day: 'Вт',
      time: '15:30',
    },
    {
      id: 3,
      line: 912,
      caller: 'Олег Тарасенко',
      status: 'Прийнято',
      waiting: '00:45',
      duration: '03:00',
      date: '21.23.2024',
      day: 'Ср',
      time: '16:00',
      record: 'Прослухати',
    },
    {
      id: 4,
      line: 912,
      caller: 'Марія Коваль',
      status: 'Відхилено',
      waiting: '00:30',
      date: '21.23.2024',
      day: 'Чт',
      time: '14:00',
    },
    {
      id: 5,
      caller: 'Петро Гнатюк',
      status: 'SMS',
      date: '21.23.2024',
      day: 'Пт',
      time: '13:30',
      message: 'Початок тексту смс Початок...',
      isSMS: true,
    },
  ]

  const filteredEntries = mockEntries.filter((entry) => entry.caller.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <Box sx={{ m: 2 }}>
      <Paper sx={{ borderRadius: '16px', overflow: 'hidden' }}>
        <SearchField
          placeholder="Пошук"
          value={searchTerm}
          onChange={(value: string) => setSearchTerm(value)}
          sx={{
            width: 300,
            p: 2,
          }}
        />
        <Box sx={{ overflowX: 'auto' }}>
          <Table sx={{ minWidth: 800 }}>
            <TableHead>
              <TableRow sx={{ background: '#f8f9fb' }}>
                <TableCell sx={{ fontSize: 14, background: '#f8f9fb', border: 'none', width: 60 }}>Лінія</TableCell>
                <TableCell sx={{ fontSize: 14, background: '#f8f9fb', border: 'none', minWidth: 200 }}>
                  Хто дзвонив
                </TableCell>
                <TableCell sx={{ fontSize: 14, background: '#f8f9fb', border: 'none', minWidth: 120 }}>
                  Статус
                </TableCell>
                <TableCell sx={{ fontSize: 14, background: '#f8f9fb', border: 'none', minWidth: 100 }}>
                  Очікування
                </TableCell>
                <TableCell sx={{ fontSize: 14, background: '#f8f9fb', border: 'none', minWidth: 100 }}>
                  Тривалість
                </TableCell>
                <TableCell sx={{ fontSize: 14, background: '#f8f9fb', border: 'none', minWidth: 150 }}>
                  Дата і час
                </TableCell>
                <TableCell sx={{ fontSize: 14, background: '#f8f9fb', border: 'none', minWidth: 120 }}>Запис</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEntries.map((entry, idx) => (
                <TableRow
                  key={entry.id}
                  sx={{
                    background: idx % 2 === 0 ? '#fff' : '#f8f9fb',
                    '&:last-child td, &:last-child th': { border: 0 },
                    border: 'none',
                    boxShadow: 'none',
                    minHeight: 50,
                  }}>
                  <TableCell sx={{ border: 'none', fontSize: 16, width: 60, py: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, py: 1 }}>
                      <span style={{ fontSize: '16px' }}>{getStatusIcon(entry)}</span>
                      <Typography sx={{ fontSize: 16, fontWeight: 400, lineHeight: '150%', letterSpacing: '0.01em' }}>
                        {entry.line}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ border: 'none', fontSize: 16, minWidth: 200, py: 1 }}>{entry.caller}</TableCell>
                  <TableCell sx={{ border: 'none', fontSize: 16, minWidth: 120, py: 1 }}>
                    {!entry.isSMS && (
                      <Chip
                        label={entry.status}
                        sx={{
                          backgroundColor: getStatusColor(entry.status),
                          color: 'white',
                          fontSize: '14px',
                          height: '32px',
                          borderRadius: '8px',
                          fontWeight: 500,
                        }}
                      />
                    )}
                  </TableCell>
                  <TableCell sx={{ border: 'none', fontSize: 16, minWidth: 100, py: 1 }}>
                    {entry.waiting || ''}
                  </TableCell>
                  <TableCell sx={{ border: 'none', fontSize: 16, minWidth: 100, py: 1 }}>
                    {entry.duration || ''}
                  </TableCell>
                  <TableCell sx={{ border: 'none', fontSize: 16, minWidth: 150, py: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <span>{entry.date}</span>
                      <span>{entry.day}</span>
                      <span>{entry.time}</span>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ border: 'none', fontSize: 16, minWidth: 120, py: 1 }}>
                    {entry.record ? (
                      <Button variant="contained" size="small" startIcon={<PlayArrowIcon />}>
                        <span>Прослухати</span>
                      </Button>
                    ) : entry.isSMS ? (
                      <Typography variant="body2" sx={{ color: '#666' }}>
                        {entry.record || 'Початок тексту смс Початок...'}
                      </Typography>
                    ) : (
                      ''
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Paper>
    </Box>
  )
}
