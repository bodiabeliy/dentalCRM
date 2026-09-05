import { useState } from 'react'
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Dialog,
  TextField,
  FormControl,
  DialogContent,
  InputLabel,
  Button,
  InputAdornment,
} from '@mui/material'
import { Percent as PercentIcon, Close as CloseIcon, Check as CheckIcon, Add as PlusIcon } from '@mui/icons-material'
import type { Act, Detail } from '../../model'
import ChevronIcon from '../../../../shared/assets/icons/chevron.svg?react'
import StatusIcon from '../../../../shared/assets/icons/status.svg?react'
import { SearchField } from '../../../../shared/components/ui/search-field'

interface ActEditorProps {
  act: Act
  details: Detail[]
  onClose: () => void
  onSave: () => void
}

export function ActEditor({ act, details, onClose, onSave }: ActEditorProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])
  const [isDiscount, setIsDiscount] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    )
  }

  const totalAmount = details.reduce((sum, detail) => sum + detail.sum, 0)
  const totalDiscount = details.reduce(
    (sum, detail) => sum + (typeof detail.discount === 'number' ? detail.discount : 0),
    0
  )
  const finalAmount = totalAmount - totalDiscount

  console.log('act', act)

  const serviceCategories = [
    {
      id: 'prepare',
      title: 'Підготовка до протезування',
      color: '#ff8f00',
      items: [
        { name: 'Ортодонтичне лікування', price: 2500, statusColor: '#ff8f00' },
        { name: 'Синусліфтинг / Кісткова аугментація', price: 2500, statusColor: '#ff8f00' },
        { name: 'Імплантація', price: 2500, statusColor: '#ff8f00' },
        { name: 'Розкриття імплантів', price: 2500, statusColor: '#ff8f00' },
      ],
    },
    {
      id: 'inspection',
      title: 'Обстеження',
      color: '#001acf',
      items: [
        { name: 'Ортодонтичне лікування', price: 2500, statusColor: '#001acf' },
        { name: 'Синусліфтинг / Кісткова аугментація', price: 2500, statusColor: '#001acf' },
        { name: 'Імплантація', price: 2500, statusColor: '#001acf' },
        { name: 'Розкриття імплантів', price: 2500, statusColor: '#001acf' },
      ],
    },
    {
      id: 'prophylaxis',
      title: 'Профілактика',
      color: '#00838f',
      items: [],
    },
    {
      id: 'caries',
      title: 'Лікування карієсу/реставрації',
      color: '#d84315',
      items: [],
    },
    {
      id: 'endodontics',
      title: 'Ендодонтія',
      color: '#2e7d32',
      items: [],
    },
    {
      id: 'surgery',
      title: 'Хірургія',
      color: '#ad1457',
      items: [],
    },
    {
      id: 'orthopedics',
      title: 'Ортопедія',
      color: '#6a1b9a',
      items: [],
    },
  ]

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          backgroundColor: 'white',
        }}>
        <Box
          sx={{
            display: 'flex',
            flex: 1,
            overflow: 'hidden',
            boxShadow:
              '0 2px 3px -1px rgba(0, 0, 0, 0.1), 0 1px 12px 0 rgba(0, 0, 0, 0.1), 0 1px 3px 0 rgba(0, 0, 0, 0.05)',
            p: 3,
            borderRadius: 2,
            gap: 2,
            overflowX: { xs: 'auto', lg: 'hidden' },
          }}>
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              boxShadow:
                '0 2px 3px -1px rgba(0, 0, 0, 0.1), 0 1px 12px 0 rgba(0, 0, 0, 0.1), 0 1px 3px 0 rgba(0, 0, 0, 0.05)',
              p: 2,
              borderRadius: 2,
            }}>
            <Typography variant="h6" align="center">
              Акт виконаних робіт
            </Typography>
            <Box sx={{ flex: 1, p: 2, mt: 2, display: 'flex', flexDirection: 'column' }}>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ borderBottom: '1px solid rgba(21, 22, 24, 0.12)' }}>
                    <TableCell sx={{ fontWeight: 500, border: 'none' }}>Зона</TableCell>
                    <TableCell sx={{ fontWeight: 500, border: 'none' }}>Опис роботи</TableCell>
                    <TableCell sx={{ fontWeight: 500, border: 'none' }}>Ціна</TableCell>
                    <TableCell sx={{ fontWeight: 500, border: 'none' }}>К-сть</TableCell>
                    <TableCell sx={{ fontWeight: 500, border: 'none' }}>Сума</TableCell>
                    <TableCell sx={{ fontWeight: 500, border: 'none' }}>Знижка</TableCell>
                    <TableCell sx={{ fontWeight: 500, border: 'none' }}>Оплачено</TableCell>
                    <TableCell sx={{ width: 50, border: 'none' }}></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {details.map((detail) => (
                    <TableRow
                      key={detail.id}
                      sx={{
                        '&:hover': { backgroundColor: '#f5f5f5' },
                        borderBottom: '1px solid rgba(21, 22, 24, 0.12)',
                      }}>
                      <TableCell sx={{ border: 'none' }}>{detail.zone}</TableCell>
                      <TableCell sx={{ border: 'none' }}>{detail.work}</TableCell>
                      <TableCell sx={{ border: 'none' }}>{detail.price.toFixed(2)}</TableCell>
                      <TableCell sx={{ border: 'none' }}>{detail.qty}</TableCell>
                      <TableCell sx={{ border: 'none' }}>{detail.sum.toLocaleString()}</TableCell>
                      <TableCell sx={{ border: 'none' }}>{detail.discount || '0%'}</TableCell>
                      <TableCell sx={{ border: 'none' }}>{detail.paid.toLocaleString()}</TableCell>
                      <TableCell sx={{ border: 'none' }}>
                        <IconButton size="small" sx={{ color: '#666' }}>
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: 14,
                    lineHeight: '171%',
                    letterSpacing: '0.01em',
                    color: '#0029d9',
                  }}>
                  Загальна сума: {totalAmount.toLocaleString()}.00
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography sx={{ fontWeight: 500, fontSize: 14, lineHeight: '171%', letterSpacing: '0.01em' }}>
                    Знижка: {totalDiscount.toLocaleString()}.00
                  </Typography>
                  <Typography sx={{ fontWeight: 500, fontSize: 14, lineHeight: '171%', letterSpacing: '0.01em' }}>
                    Разом: {finalAmount.toLocaleString()}.00
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box sx={{ display: { xs: 'none', lg: 'flex' }, flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <SearchField placeholder="Пошук" isStartAdornment={false} value={''} onChange={() => {}} />
              <IconButton
                onClick={() => setIsDiscount(!isDiscount)}
                sx={{
                  backgroundColor: '#e4e8ff',
                  color: '#0029d9',
                }}>
                <PercentIcon />
              </IconButton>
            </Box>
            <ActCategory items={serviceCategories} expanded={expandedCategories} onToggle={toggleCategory} />
          </Box>
        </Box>
        <Box
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            zIndex: 1300,
          }}>
          <IconButton
            onClick={() => setIsOpen(true)}
            sx={{
              width: 48,
              height: 48,
              backgroundColor: 'white',
              color: '#666',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              '&:hover': {
                backgroundColor: '#f5f5f5',
              },
              display: { xs: 'flex', lg: 'none' },
            }}>
            <PlusIcon />
          </IconButton>
          <IconButton
            onClick={onClose}
            sx={{
              width: 48,
              height: 48,
              backgroundColor: 'white',
              color: '#666',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              '&:hover': {
                backgroundColor: '#f5f5f5',
              },
            }}>
            <CloseIcon />
          </IconButton>
          <IconButton
            onClick={onSave}
            sx={{
              width: 48,
              height: 48,
              backgroundColor: '#0029d9',
              color: 'white',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              '&:hover': {
                backgroundColor: '#001fb8',
              },
            }}>
            <CheckIcon />
          </IconButton>
        </Box>
      </Box>
      <Dialog
        open={isDiscount}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '8px',
            overflow: 'hidden',
          },
        }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: 2,
            background: '#f4f7fe',
            borderBottom: '1px solid #e0e0e0',
          }}>
          <PercentIcon style={{ color: '#0029d9', marginRight: 8, width: 20, height: 20 }} />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 500,
              flex: 1,
              color: '#333',
              fontSize: '16px',
            }}>
            Встановіть знижку
          </Typography>
        </Box>
        <DialogContent sx={{ p: 3 }}>
          <Box display="flex" flexDirection="column" gap={3}>
            <FormControl fullWidth>
              <InputLabel>Знижка</InputLabel>
              <TextField
                label="Знижка"
                onChange={() => {}}
                value={''}
                InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }}
              />
            </FormControl>
          </Box>
        </DialogContent>
        <Box sx={{ display: 'flex', gap: '10px', justifyContent: 'flex-start', px: 3, pb: 3, pt: 1 }}>
          <Button
            variant="outlined"
            sx={{ borderColor: '#0029d9', color: '#0029d9', padding: '12px 22px' }}
            onClick={onClose}>
            СКАСУВАТИ
          </Button>
          <Button variant="contained" sx={{ bgcolor: '#0029d9', padding: '12px 22px', flex: 1 }} onClick={onSave}>
            ЗБЕРЕГТИ
          </Button>
        </Box>
      </Dialog>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} fullScreen>
        <DialogContent sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SearchField placeholder="Пошук" isStartAdornment={false} value={''} onChange={() => {}} />
            <IconButton
              onClick={() => setIsDiscount(!isDiscount)}
              sx={{
                backgroundColor: '#e4e8ff',
                color: '#0029d9',
              }}>
              <PercentIcon />
            </IconButton>
          </Box>
          <ActCategory items={serviceCategories} expanded={expandedCategories} onToggle={toggleCategory} />
          <IconButton
            onClick={() => setIsOpen(false)}
            sx={{
              position: 'absolute',
              bottom: 16,
              right: 16,
              bgcolor: '#fff',
              boxShadow: 2,
              zIndex: 1000,
              borderRadius: '50%',
              width: 40,
              height: 40,
            }}>
            <CloseIcon />
          </IconButton>
        </DialogContent>
      </Dialog>
    </>
  )
}

interface ActCategoryProps {
  items: any[]
  expanded: string[]
  onToggle: (category: string) => void
}

const ActCategory = ({ items, expanded, onToggle }: ActCategoryProps) => {
  return (
    <Box>
      {items.map((category) => (
        <ActCategoryAccordion
          key={category.id}
          title={category.title}
          color={category.color}
          items={category.items}
          expanded={expanded.includes(category.id)}
          onToggle={() => onToggle(category.id)}
        />
      ))}
    </Box>
  )
}

interface ActCategoryAccordionProps {
  title: string
  color: string
  items: any[]
  expanded: boolean
  onToggle: () => void
}

function ActCategoryAccordion({ title, color, items, expanded, onToggle }: ActCategoryAccordionProps) {
  return (
    <Accordion
      expanded={expanded}
      onChange={onToggle}
      sx={{
        '&.MuiAccordion-gutters.Mui-expanded': {
          padding: 0,
        },
        '&.Mui-expanded': {
          margin: 0,
        },
      }}>
      <AccordionSummary
        sx={{
          background: '#f5f7fe',
          '& .MuiAccordionSummary-content': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          },
        }}>
        <Typography variant="subtitle1" color={color}>
          {title}
        </Typography>
        <ChevronIcon
          style={{
            color: '#000',
            fillOpacity: '0.54',
            width: 24,
            height: 24,
            transform: expanded ? 'rotate(270deg)' : 'rotate(90deg)',
          }}
        />
      </AccordionSummary>
      <AccordionDetails>
        {items.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: 'grid',
              gridTemplateColumns: '32px 1fr 100px',
              alignItems: 'center',
              mb: 1,
            }}>
            <StatusIcon style={{ color: color }} />
            <Typography variant="body2">{item.name}</Typography>
            <Typography variant="body2" textAlign="right">
              {item.currency} {item.price.toFixed(2)}
            </Typography>
          </Box>
        ))}
      </AccordionDetails>
    </Accordion>
  )
}
