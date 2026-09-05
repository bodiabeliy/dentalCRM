import { Box, Typography, IconButton, TextField } from '@mui/material'
import { AttachFile as AttachFileIcon, Send as SendIcon } from '@mui/icons-material'
import TelegramIcon from '../../../shared/assets/icons/telegram.svg?react'
import EmojiIcon from '../../../shared/assets/icons/emoji.svg?react'
import ChevronsIcon from '../../../shared/assets/icons/chevrons.svg?react'
import { Avatar } from '../../../shared/components/ui/avatar'

interface PatientChatWidgetProps {
  patientId: string
}

// @ts-ignore
export function PatientChatWidget({ patientId }: PatientChatWidgetProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        bgcolor: '#fafafa',
        position: 'relative',
      }}>
      <Box
        sx={{
          textAlign: 'center',
          py: 2,
          color: '#666',
          fontSize: '14px',
          flexShrink: 0,
        }}>
        Сьогодні
      </Box>
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          minHeight: 0,
        }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
          <Box sx={{ position: 'relative' }}>
            <Avatar
              sx={{
                borderRadius: '8px',
                width: 40,
                height: 40,
                bgcolor: '#e0e0e0',
                zIndex: 1,
              }}
            />
            <TelegramIcon style={{ width: 24, height: 24, position: 'absolute', bottom: -6, right: -6, zIndex: 10 }} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography
              sx={{
                fontSize: 12,
                lineHeight: '166%',
                letterSpacing: '0.03em',
                color: 'rgba(21, 22, 24, 0.87)',
              }}>
              Марія Іванівна
            </Typography>
            <Box
              sx={{
                bgcolor: '#f0f2f9',
                borderRadius: '8px',
                px: 2,
                py: 1,
                maxWidth: '70%',
                display: 'inline-block',
              }}>
              <Typography sx={{ fontSize: '14px', color: '#333' }}>
                Доброго дня! Хочу записатися на консультацію до стоматолога. Які дати доступні?
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', mt: 0.5, gap: 1 }}>
                <Typography variant="body2">15:00</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ChevronsIcon style={{ color: '#0029d9' }} />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, justifyContent: 'flex-end' }}>
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              gap: 1,
              alignItems: 'flex-end',
            }}>
            <Typography
              sx={{
                fontSize: 12,
                lineHeight: '166%',
                letterSpacing: '0.03em',
                color: 'rgba(21, 22, 24, 0.87)',
              }}>
              Смолоскип Микола
            </Typography>
            <Box
              sx={{
                bgcolor: '#dce1f6',
                borderRadius: '18px',
                px: 2,
                py: 1,
                maxWidth: '70%',
                display: 'inline-block',
              }}>
              <Typography sx={{ fontSize: '14px', color: '#333' }}>
                Доброго дня! Дякуємо, що звернулися до нас. Можемо запропонувати запис на середу або четвер цього тижня.
                Який час вам підходить?
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', mt: 0.5, gap: 1 }}>
                <Typography variant="body2">15:00</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ChevronsIcon style={{ color: '#0029d9' }} />
                </Box>
              </Box>
            </Box>
          </Box>
          <Avatar
            sx={{
              width: 40,
              height: 40,
              bgcolor: '#e0e0e0',
              borderRadius: '8px',
            }}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
          <Box sx={{ position: 'relative' }}>
            <Avatar
              sx={{
                width: 40,
                height: 40,
                bgcolor: '#e0e0e0',
                borderRadius: '8px',
                position: 'relative',
              }}
            />
            <TelegramIcon style={{ width: 24, height: 24, position: 'absolute', bottom: -6, right: -6 }} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography
              sx={{
                fontSize: 12,
                lineHeight: '166%',
                letterSpacing: '0.03em',
                color: 'rgba(21, 22, 24, 0.87)',
              }}>
              Марія Іванівна
            </Typography>
            <Box
              sx={{
                bgcolor: '#f0f2f9',
                borderRadius: '18px',
                px: 2,
                py: 1,
                maxWidth: '70%',
                display: 'inline-block',
              }}>
              <Typography sx={{ fontSize: '14px', color: '#333' }}>
                Давайте на четвер, ближче до обіду, якщо можливо
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', mt: 0.5, gap: 1 }}>
                <Typography variant="body2">15:00</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ChevronsIcon style={{ fillOpacity: '0.56', color: '#000' }} />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          p: 2,
          pb: 3,
          bgcolor: '#fafafa',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            bgcolor: '#f5f5f5',
            borderRadius: '8px',
            px: 2,
            py: 1,
            flex: 1,
          }}>
          <TextField
            placeholder="Введіть повідомлення"
            variant="standard"
            fullWidth
            sx={{
              '& .MuiInput-root': {
                '&:before': { borderBottom: 'none' },
                '&:after': { borderBottom: 'none' },
                '&:hover:not(.Mui-disabled):before': { borderBottom: 'none' },
              },
              '& .MuiInput-input': {
                fontSize: '14px',
                color: '#333',
              },
            }}
          />
          <IconButton size="small" sx={{ color: '#666' }}>
            <AttachFileIcon sx={{ fontSize: 20 }} />
          </IconButton>
          <IconButton size="small" sx={{ color: '#666' }}>
            <EmojiIcon />
          </IconButton>
        </Box>
        <IconButton
          size="small"
          sx={{
            bgcolor: '#0029d9',
            color: 'white',
            width: 36,
            height: 36,
            borderRadius: '8px',
          }}>
          <SendIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Box>
    </Box>
  )
}
