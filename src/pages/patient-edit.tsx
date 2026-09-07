import { useState, useEffect } from 'react'
import {
  Box,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  FormLabel,
} from '@mui/material'
import { Edit } from '@mui/icons-material'
import { useParams, useNavigate } from 'react-router'
import { SidebarLayout } from '../shared'
import { mockPatients } from '../features/patients/model/constants'
import type { Patient } from '../features/patients/model/types'
import { Avatar } from '../shared/components/ui/avatar'

export function PatientEditPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [patient, setPatient] = useState<Patient | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const foundPatient = mockPatients.find((p) => p.id === id)
    if (foundPatient) {
      const extendedPatient: Patient = {
        ...foundPatient,
        lastName: 'Нінченко',
        firstName: 'Ніна',
        patronymic: 'Артемівна',
        dateOfBirth: '29.12.2000',
        gender: 'female',
        address: '',
        email: 'user@gmail.com',
        phoneNote: 'Основний номер',
        importantInfo: 'Алегрія на препарат № 5',
        tags: ['Ter'],
        isArchived: false,
        source: 'Facebook',
        contactSource: 'Телеграм',
        curator: 'ПІБ',
        discount: '10 %',
        refusalReason: 'Причина відмови',
        branch: 'Філія',
        notes: '',
        insurancePolicies: [
          {
            id: '1',
            company: 'Компанія',
            policyNumber: '123',
            expirationDate: '12.12.2024',
            limit: '20000',
            guarantor: 'Гарант',
            note: 'Примітка',
            status: 'active',
          },
          {
            id: '2',
            company: 'Компанія',
            policyNumber: '123',
            expirationDate: '12.12.2024',
            limit: '20000',
            guarantor: 'Гарант',
            note: 'Примітка',
            status: 'inactive',
          },
        ],
      }
      setPatient(extendedPatient)
    }
    setLoading(false)
  }, [id])

  const handleSave = () => {
    console.log('Saving patient:', patient)
    navigate('/patients')
  }

  const handleCancel = () => {
    navigate('/patients')
  }

  const handleChange = (field: keyof Patient, value: any) => {
    if (patient) {
      setPatient({ ...patient, [field]: value })
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!patient) {
    return <div>Patient not found</div>
  }

  return (
    <SidebarLayout title="Пацієнт" rightSidebar={<></>}>
      <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto', width: '100%' }}>
        <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
          <Box sx={{ flex: { md: 2 } }}>
            <Paper
              sx={{
                p: 3,
                mb: 3,
                borderRadius: '16px',
                boxShadow:
                  '0 2px 3px -1px rgba(0, 0, 0, 0.1), 0 1px 12px 0 rgba(0, 0, 0, 0.1), 0 1px 3px 0 rgba(0, 0, 0, 0.05)',
              }}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Фото профілю
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Avatar src={patient.avatar} width={40} height={40} borderRadius="8px" />
                  <Button
                    variant="text"
                    sx={{
                      borderColor: '#0029d9',
                      color: '#0029d9',
                      '&:hover': {
                        borderColor: '#0029d9',
                        backgroundColor: 'rgba(0, 41, 217, 0.04)',
                      },
                    }}>
                    ЗМІНИТИ
                  </Button>
                </Box>
              </Box>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                <TextField
                  fullWidth
                  label="Прізвище"
                  value={patient.lastName || ''}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Ім'я"
                  value={patient.firstName || ''}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="По батькові"
                  value={patient.patronymic || ''}
                  onChange={(e) => handleChange('patronymic', e.target.value)}
                  sx={{ mb: 2, gridColumn: { xs: '1', sm: 'span 2' } }}
                />
                <TextField
                  fullWidth
                  label="Дата народження"
                  value={patient.dateOfBirth || ''}
                  onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                  sx={{ mb: 2 }}
                />
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Стать</InputLabel>
                  <Select
                    value={patient.gender || ''}
                    onChange={(e) => handleChange('gender', e.target.value)}
                    label="Стать">
                    <MenuItem value="male">Чоловік</MenuItem>
                    <MenuItem value="female">Жінка</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  label="Адреса"
                  value={patient.address || ''}
                  onChange={(e) => handleChange('address', e.target.value)}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Email"
                  value={patient.email || ''}
                  onChange={(e) => handleChange('email', e.target.value)}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Номер телефону"
                  value={patient.phoneNumber}
                  onChange={(e) => handleChange('phoneNumber', e.target.value)}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Примітка до номеру"
                  value={patient.phoneNote || ''}
                  onChange={(e) => handleChange('phoneNote', e.target.value)}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Важлива інформація"
                  value={patient.importantInfo || ''}
                  onChange={(e) => handleChange('importantInfo', e.target.value)}
                  sx={{ mb: 2, gridColumn: { xs: '1', sm: 'span 2' } }}
                  InputProps={{
                    sx: { color: '#d32f2f' },
                  }}
                />
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Тег</InputLabel>
                  <Select
                    value={patient.tags?.[0] || ''}
                    onChange={(e) => handleChange('tags', [e.target.value])}
                    label="Тег">
                    <MenuItem value="Ter">Ter</MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ mb: 2 }}>
                  <Typography
                    sx={{
                      fontWeight: 400,
                      fontSize: '12px',
                      lineHeight: '100%',
                      letterSpacing: '0.01em',
                      color: 'rgba(21, 22, 24, 0.6)',
                      mb: 1,
                    }}>
                    Архів
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <Switch
                      checked={!patient.isArchived}
                      onChange={(e) => handleChange('isArchived', !e.target.checked)}
                    />
                    <FormLabel>В роботі</FormLabel>
                  </Box>
                </FormControl>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Звідки дізнався</InputLabel>
                  <Select
                    value={patient.source || ''}
                    onChange={(e) => handleChange('source', e.target.value)}
                    label="Звідки дізнався">
                    <MenuItem value="Facebook">Facebook</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Джерело контакту</InputLabel>
                  <Select
                    value={patient.contactSource || ''}
                    onChange={(e) => handleChange('contactSource', e.target.value)}
                    label="Джерело контакту">
                    <MenuItem value="Телеграм">Телеграм</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth sx={{ mb: 2, gridColumn: { xs: '1', sm: 'span 2' } }}>
                  <InputLabel>Куратор</InputLabel>
                  <Select
                    value={patient.curator || ''}
                    onChange={(e) => handleChange('curator', e.target.value)}
                    label="Куратор">
                    <MenuItem value="ПІБ">ПІБ</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  label="Знижка"
                  value={patient.discount || ''}
                  onChange={(e) => handleChange('discount', e.target.value)}
                  sx={{ mb: 2 }}
                />
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Статус</InputLabel>
                  <Select value="Відмова" onChange={(e) => handleChange('status', e.target.value)} label="Статус">
                    <MenuItem value="Відмова">Відмова</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  label="Нотатка"
                  value={patient.notes || ''}
                  onChange={(e) => handleChange('notes', e.target.value)}
                  multiline
                  rows={2}
                  sx={{ mb: 2, gridColumn: { xs: '1', sm: 'span 2' }, background: '#f0f0f0' }}
                />
              </Box>
              <Box sx={{ flex: { md: 1 } }}>
                <Typography variant="h6" sx={{ mb: 3 }}>
                  Системна інформація
                </Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                  <TextField
                    fullWidth
                    label="Номер карти"
                    value={patient.number}
                    sx={{ mb: 2 }}
                    InputProps={{
                      sx: { color: '#666' },
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Реєстрація"
                    value={patient.registrationDate}
                    sx={{ mb: 2 }}
                    InputProps={{
                      sx: { color: '#666' },
                    }}
                  />
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Причина відмови</InputLabel>
                    <Select
                      value={patient.refusalReason || ''}
                      onChange={(e) => handleChange('refusalReason', e.target.value)}
                      label="Причина відмови">
                      <MenuItem value="Причина відмови">Причина відмови</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Філія</InputLabel>
                    <Select
                      value={patient.branch || ''}
                      onChange={(e) => handleChange('branch', e.target.value)}
                      label="Філія">
                      <MenuItem value="Філія">Філія</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ mt: 3, display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                  <Button
                    variant="outlined"
                    onClick={handleCancel}
                    sx={{
                      borderColor: '#0029d9',
                      color: '#0029d9',
                      '&:hover': {
                        borderColor: '#0029d9',
                        backgroundColor: 'rgba(0, 41, 217, 0.04)',
                      },
                    }}>
                    СКАСУВАТИ
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleSave}
                    sx={{
                      backgroundColor: '#0029d9',
                      '&:hover': {
                        backgroundColor: '#0021b3',
                      },
                    }}>
                    ЗБЕРЕГТИ ЗМІНИ
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Box>
        <Paper
          sx={{
            borderRadius: '16px',
            boxShadow:
              '0 2px 3px -1px rgba(0, 0, 0, 0.1), 0 1px 12px 0 rgba(0, 0, 0, 0.1), 0 1px 3px 0 rgba(0, 0, 0, 0.05)',
          }}>
          <Typography variant="h6" sx={{ p: 3 }}>
            Страховий поліс
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ background: '#f5f7fe' }}>
                  <TableCell>Компанія</TableCell>
                  <TableCell>Номер полісу</TableCell>
                  <TableCell>Термін дії полісу</TableCell>
                  <TableCell>Ліміт полісу</TableCell>
                  <TableCell>Гарант</TableCell>
                  <TableCell>Примітка</TableCell>
                  <TableCell>Статус дії полісу</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {patient.insurancePolicies??.map((policy) => (
                  <TableRow
                    key={policy.id}
                    sx={{
                      background: policy.status === 'active' ? '#fff' : 'rgba(0, 41, 217, 0.04)',
                      '&:last-child td, &:last-child th': { border: 0 },
                      opacity: policy.status === 'active' ? 1 : 0.4,
                    }}>
                    <TableCell>{policy.company}</TableCell>
                    <TableCell>{policy.policyNumber}</TableCell>
                    <TableCell>{policy.expirationDate}</TableCell>
                    <TableCell>{policy.limit}</TableCell>
                    <TableCell>{policy.guarantor}</TableCell>
                    <TableCell>{policy.note}</TableCell>
                    <TableCell>
                      <Chip
                        label={policy.status === 'active' ? 'Активний' : 'Неактивний'}
                        sx={{
                          backgroundColor: policy.status === 'active' ? '#4caf50' : 'rgba(0, 0, 0, 0.08)',
                          color: policy.status === 'active' ? '#fff' : 'rgba(21, 22, 24, 0.38)',
                          fontSize: '12px',
                          borderRadius: '8px',
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton size="small">
                        <Edit />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </SidebarLayout>
  )
}
