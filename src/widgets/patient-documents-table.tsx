import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Chip,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import StackIcon from '../shared/assets/icons/stack.svg?react'
import PrinterIcon from '../shared/assets/icons/printer.svg?react'
import PencilEditIcon from '../shared/assets/icons/pencil_edit.svg?react'
import CopyIcon from '@mui/icons-material/ContentCopy'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import React from 'react'
import { Avatar } from '../shared/components/ui/avatar'

export interface PatientDocument {
  id: string
  name: string
  date: string
  status?: string
  doctor: { name: string; avatar: string }
  canEdit: boolean
}

export interface DocumentTemplate {
  id: string
  name: string
}

export interface MozForm {
  id: string
  name: string
}

interface PatientDocumentsTableProps {
  documents: PatientDocument[]
  documentTemplates: DocumentTemplate[]
  mozForms: MozForm[]
  onCreateDocument: () => void
}

export const PatientDocumentsTable: React.FC<PatientDocumentsTableProps> = ({
  documents,
  documentTemplates,
  mozForms,
  onCreateDocument,
}) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  return (
    <Box
      sx={{
        m: 2,
        boxShadow:
          '0 2px 3px -1px rgba(0, 0, 0, 0.1), 0 1px 12px 0 rgba(0, 0, 0, 0.1), 0 1px 3px 0 rgba(0, 0, 0, 0.05)',
        borderRadius: '8px',
      }}>
      <Box
        sx={{
          display: 'flex',
          mb: isMobile ? 0 : 3,
          alignItems: 'center',
          justifyContent: 'flex-end',
          p: 2,
        }}>
        <Button
          variant="contained"
          startIcon={<AddIcon sx={{ width: 20, height: 20 }} />}
          onClick={onCreateDocument}
          sx={{ padding: '6px 16px', fontWeight: 500, fontSize: '14px' }}>
          СТВОРИТИ ДОКУМЕНТ
        </Button>
      </Box>
      <Box sx={{ backgroundColor: 'white', overflow: 'hidden' }}>
        <TableContainer sx={{ maxWidth: '100%', overflowX: 'auto' }}>
          <Table sx={{ minWidth: 800 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f8f9fb' }}>
                <TableCell sx={{ width: 48, p: 1, border: 'none', minWidth: 48 }}>
                  <Checkbox sx={{ color: '#bbb', '&.Mui-checked': { color: '#0029d9' } }} />
                </TableCell>
                <TableCell sx={{ border: 'none', fontWeight: 500, p: 0, minWidth: 200 }}>Документи пацієнта</TableCell>
                <TableCell sx={{ border: 'none', fontWeight: 500, p: 0, minWidth: 120 }}>Дата</TableCell>
                <TableCell sx={{ border: 'none', fontWeight: 500, p: 0, minWidth: 140 }}>Статус</TableCell>
                <TableCell sx={{ border: 'none', fontWeight: 500, p: 0, minWidth: 180 }}>Лікар</TableCell>
                <TableCell sx={{ border: 'none', fontWeight: 500, p: 0, minWidth: 120 }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {documents?.map((doc) => (
                <TableRow key={doc.id} sx={{ '&:nth-of-type(even)': { backgroundColor: '#f5f7fe' } }}>
                  <TableCell sx={{ p: 1, border: 'none' }}>
                    <Checkbox sx={{ color: '#bbb', '&.Mui-checked': { color: '#0029d9' } }} />
                  </TableCell>
                  <TableCell sx={{ border: 'none', p: 0, verticalAlign: 'middle' }}>
                    <Typography sx={{ fontSize: 14, whiteSpace: 'normal', wordBreak: 'normal' }}>{doc.name}</Typography>
                  </TableCell>
                  <TableCell sx={{ border: 'none', p: 0, verticalAlign: 'middle' }}>
                    <Typography sx={{ fontSize: 14 }}>{doc.date}</Typography>
                  </TableCell>
                  <TableCell sx={{ border: 'none', p: 0, verticalAlign: 'middle' }}>
                    {doc.status && (
                      <Chip
                        label={doc.status}
                        sx={{
                          borderRadius: '8px',
                          padding: '4px 8px',
                          background: '#0029d9',
                          color: 'white',
                          fontSize: 14,
                          height: 'auto',
                          '& .MuiChip-label': {
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          },
                        }}
                      />
                    )}
                  </TableCell>
                  <TableCell sx={{ border: 'none', p: 0, verticalAlign: 'middle' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar width={32} height={32} borderRadius="8px" />
                      <Typography sx={{ fontSize: 14, whiteSpace: 'normal', wordBreak: 'normal' }}>
                        {doc.doctor.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ border: 'none', pr: 2, verticalAlign: 'middle' }}>
                    <Box sx={{ display: 'flex', gap: 4, justifyContent: 'flex-end' }}>
                      {doc.canEdit && (
                        <IconButton sx={{ p: 0 }}>
                          <PencilEditIcon style={{ width: 18, height: 18 }} />
                        </IconButton>
                      )}
                      <IconButton sx={{ p: 0 }}>
                        <PrinterIcon style={{ width: 18, height: 18 }} />
                      </IconButton>
                      <IconButton sx={{ p: 0 }}>
                        <CopyIcon style={{ width: 18, height: 18 }} />
                      </IconButton>
                      <IconButton sx={{ p: 0 }}>
                        <DeleteIcon style={{ width: 18, height: 18 }} />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{
            backgroundColor: '#eeeeee',
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Typography sx={{ fontWeight: 500, fontSize: '14px', lineHeight: '171%', letterSpacing: '0.01em' }}>
            Шаблони документів
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" sx={{ color: '#0029d9' }}>
              Шаблони
            </Typography>
            <StackIcon style={{ color: '#0029d9', width: 18, height: 18 }} />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {documentTemplates?.map((template, idx) => (
            <Box
              key={template.id}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                py: 1,
                px: 2,
                backgroundColor: idx % 2 !== 0 ? '#f5f7fe' : 'white',
              }}>
              <Typography variant="body1">{template.name}</Typography>
              <IconButton size="small" sx={{ color: '#666' }}>
                <PrinterIcon fontSize="small" />
              </IconButton>
            </Box>
          ))}
        </Box>
      </Box>
      <Box sx={{ mb: 4 }}>
        <Box sx={{ backgroundColor: '#eeeeee', p: 2 }}>
          <Typography sx={{ fontWeight: 500, fontSize: '14px', lineHeight: '171%', letterSpacing: '0.01em' }}>
            Форми МОЗ
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {mozForms?.map((template, idx) => (
            <Box
              key={template.id}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                py: 1,
                px: 2,
                backgroundColor: idx % 2 !== 0 ? '#f5f7fe' : 'white',
              }}>
              <Typography variant="body1">{template.name}</Typography>
              <IconButton size="small" sx={{ color: '#666' }}>
                <PrinterIcon fontSize="small" />
              </IconButton>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  )
}
