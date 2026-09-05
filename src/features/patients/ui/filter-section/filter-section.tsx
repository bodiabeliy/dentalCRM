import { Box, TextField, Select, MenuItem, FormControl, InputLabel, useTheme, useMediaQuery } from '@mui/material'

export interface FilterValues {
  lead: string
  period: string
  branch: string
  createdBy: string
  mainResponsible: string
  status: string
  tag: string
  source: string
  products: string
  important: string
  task: string
  lastCall: string
  refusalReason: string
  brand: string
  paymentAmount: string
  utmCampaign: string
  utmSource: string
  utmContent: string
  utmTerm: string
  ipAddress: string
  firstCallNumber: string
}

interface FilterSectionProps {
  filters: FilterValues
  onFilterChange: (field: keyof FilterValues, value: string) => void
  onReset: () => void
  onApply: () => void
}

export function FilterSection({ filters, onFilterChange }: FilterSectionProps) {
  const handleFilterChange = (field: keyof FilterValues, value: string) => {
    onFilterChange(field, value)
  }

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Box
      sx={{
        mb: 3,
      }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 2,
        }}>
        <FormControl fullWidth size="small">
          <InputLabel>Лід</InputLabel>
          <Select
            value={filters.lead}
            onChange={(e) => handleFilterChange('lead', e.target.value)}
            label="Лід"
            sx={{
              backgroundColor: 'white',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: filters.lead ? '#0029d9' : '#bbb',
              },
            }}>
            <MenuItem value="По створенню">По створенню</MenuItem>
            <MenuItem value="По оновленню">По оновленню</MenuItem>
            <MenuItem value="По останньому дзвінку">По останньому дзвінку</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth size="small">
          <InputLabel>Період</InputLabel>
          <Select
            value={filters.period}
            onChange={(e) => handleFilterChange('period', e.target.value)}
            label="Період"
            sx={{
              backgroundColor: 'white',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: filters.period ? '#0029d9' : '#bbb',
              },
            }}>
            <MenuItem value="01.09.24">01.09.24</MenuItem>
            <MenuItem value="01.10.24">01.10.24</MenuItem>
            <MenuItem value="01.11.24">01.11.24</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth size="small">
          <InputLabel>Філія</InputLabel>
          <Select
            value={filters.branch}
            onChange={(e) => handleFilterChange('branch', e.target.value)}
            label="Філія"
            sx={{ backgroundColor: 'white' }}>
            <MenuItem value="">Всі філії</MenuItem>
            <MenuItem value="central">Центральна</MenuItem>
            <MenuItem value="north">Північна</MenuItem>
            <MenuItem value="south">Південна</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth size="small">
          <InputLabel>Створив</InputLabel>
          <Select
            value={filters.createdBy}
            onChange={(e) => handleFilterChange('createdBy', e.target.value)}
            label="Створив"
            sx={{ backgroundColor: 'white' }}>
            <MenuItem value="">Всі користувачі</MenuItem>
            <MenuItem value="admin">Адміністратор</MenuItem>
            <MenuItem value="doctor">Лікар</MenuItem>
            <MenuItem value="assistant">Асистент</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth size="small">
          <InputLabel>Головний відповідальний</InputLabel>
          <Select
            value={filters.mainResponsible}
            onChange={(e) => handleFilterChange('mainResponsible', e.target.value)}
            label="Головний відповідальний"
            sx={{ backgroundColor: 'white' }}>
            <MenuItem value="">Всі відповідальні</MenuItem>
            <MenuItem value="doctor1">Доктор Іванов</MenuItem>
            <MenuItem value="doctor2">Доктор Петров</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth size="small">
          <InputLabel>Статус</InputLabel>
          <Select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            label="Статус"
            sx={{ backgroundColor: 'white' }}>
            <MenuItem value="">Всі статуси</MenuItem>
            <MenuItem value="new">Новий</MenuItem>
            <MenuItem value="in_progress">В роботі</MenuItem>
            <MenuItem value="completed">Завершено</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth size="small">
          <InputLabel>Тег</InputLabel>
          <Select
            value={filters.tag}
            onChange={(e) => handleFilterChange('tag', e.target.value)}
            label="Тег"
            sx={{ backgroundColor: 'white' }}>
            <MenuItem value="">Всі теги</MenuItem>
            <MenuItem value="vip">VIP</MenuItem>
            <MenuItem value="urgent">Терміново</MenuItem>
            <MenuItem value="regular">Звичайний</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth size="small">
          <InputLabel>Джерело</InputLabel>
          <Select
            value={filters.source}
            onChange={(e) => handleFilterChange('source', e.target.value)}
            label="Джерело"
            sx={{ backgroundColor: 'white' }}>
            <MenuItem value="">Всі джерела</MenuItem>
            <MenuItem value="website">Веб-сайт</MenuItem>
            <MenuItem value="social">Соціальні мережі</MenuItem>
            <MenuItem value="referral">Рекомендація</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth size="small">
          <InputLabel>Товари</InputLabel>
          <Select
            value={filters.products}
            onChange={(e) => handleFilterChange('products', e.target.value)}
            label="Товари"
            sx={{ backgroundColor: 'white' }}>
            <MenuItem value="">Всі товари</MenuItem>
            <MenuItem value="consultation">Консультація</MenuItem>
            <MenuItem value="treatment">Лікування</MenuItem>
            <MenuItem value="surgery">Хірургія</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth size="small">
          <InputLabel>Важливо</InputLabel>
          <Select
            value={filters.important}
            onChange={(e) => handleFilterChange('important', e.target.value)}
            label="Важливо"
            sx={{ backgroundColor: 'white' }}>
            <MenuItem value="">Всі</MenuItem>
            <MenuItem value="high">Високо</MenuItem>
            <MenuItem value="medium">Середньо</MenuItem>
            <MenuItem value="low">Низько</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth size="small">
          <InputLabel>Завдання</InputLabel>
          <Select
            value={filters.task}
            onChange={(e) => handleFilterChange('task', e.target.value)}
            label="Завдання"
            sx={{ backgroundColor: 'white' }}>
            <MenuItem value="">Всі завдання</MenuItem>
            <MenuItem value="call">Дзвінок</MenuItem>
            <MenuItem value="meeting">Зустріч</MenuItem>
            <MenuItem value="follow_up">Додатковий зв'язок</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth size="small">
          <InputLabel>Останній дзвінок</InputLabel>
          <Select
            value={filters.lastCall}
            onChange={(e) => handleFilterChange('lastCall', e.target.value)}
            label="Останній дзвінок"
            sx={{ backgroundColor: 'white' }}>
            <MenuItem value="">Всі дзвінки</MenuItem>
            <MenuItem value="today">Сьогодні</MenuItem>
            <MenuItem value="week">Цього тижня</MenuItem>
            <MenuItem value="month">Цього місяця</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth size="small">
          <InputLabel>Причина відмови</InputLabel>
          <Select
            value={filters.refusalReason}
            onChange={(e) => handleFilterChange('refusalReason', e.target.value)}
            label="Причина відмови"
            sx={{ backgroundColor: 'white' }}>
            <MenuItem value="">Всі причини</MenuItem>
            <MenuItem value="price">Ціна</MenuItem>
            <MenuItem value="location">Розташування</MenuItem>
            <MenuItem value="time">Час</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth size="small">
          <InputLabel>Бренд</InputLabel>
          <Select
            value={filters.brand}
            onChange={(e) => handleFilterChange('brand', e.target.value)}
            label="Бренд"
            sx={{ backgroundColor: 'white' }}>
            <MenuItem value="">Всі бренди</MenuItem>
            <MenuItem value="brand1">Бренд 1</MenuItem>
            <MenuItem value="brand2">Бренд 2</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          size="small"
          label="Сума оплат"
          value={filters.paymentAmount}
          onChange={(e) => handleFilterChange('paymentAmount', e.target.value)}
          sx={{ backgroundColor: 'white' }}
        />
        <TextField
          fullWidth
          size="small"
          label="UTM_campaign"
          value={filters.utmCampaign}
          onChange={(e) => handleFilterChange('utmCampaign', e.target.value)}
          sx={{ backgroundColor: 'white' }}
        />
        <TextField
          fullWidth
          size="small"
          label="UTM_source"
          value={filters.utmSource}
          onChange={(e) => handleFilterChange('utmSource', e.target.value)}
          sx={{
            backgroundColor: 'white',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: filters.utmSource ? '#0029d9' : '#bbb',
            },
          }}
        />
        <TextField
          fullWidth
          size="small"
          label="UTM_content"
          value={filters.utmContent}
          onChange={(e) => handleFilterChange('utmContent', e.target.value)}
          sx={{ backgroundColor: 'white' }}
        />
        <TextField
          fullWidth
          size="small"
          label="UTM_term"
          value={filters.utmTerm}
          onChange={(e) => handleFilterChange('utmTerm', e.target.value)}
          sx={{ backgroundColor: 'white' }}
        />
        <TextField
          fullWidth
          size="small"
          label="IP адреса"
          value={filters.ipAddress}
          onChange={(e) => handleFilterChange('ipAddress', e.target.value)}
          sx={{ backgroundColor: 'white' }}
        />
        <TextField
          fullWidth
          size="small"
          label="Номер першого виклику"
          value={filters.firstCallNumber}
          onChange={(e) => handleFilterChange('firstCallNumber', e.target.value)}
          sx={{ backgroundColor: 'white' }}
        />
      </Box>
    </Box>
  )
}
