import { useState, useCallback, useEffect } from 'react'
import { Dialog, DialogContent, Box, Typography, TextField, Button, IconButton, Checkbox } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import PencilIcon from '../../../../shared/assets/icons/pencil.svg?react'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'

interface ExtendedQuestionsDialogProps {
  open: boolean
  onClose: () => void
  onSave: (questions: ExtendedQuestion[]) => void
  existingQuestions?: ExtendedQuestion[]
}

type ExtendedQuestion = {
  id: string
  name: string
  isRequired: boolean
}

export function ExtendedQuestionsDialog({
  open,
  onClose,
  onSave,
  existingQuestions = [],
}: ExtendedQuestionsDialogProps) {
  const [questions, setQuestions] = useState<Array<{ name: string; isRequired: boolean }>>([
    { name: '', isRequired: false },
  ])
  const [savedQuestions, setSavedQuestions] = useState<ExtendedQuestion[]>(existingQuestions)
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null)

  // Sync savedQuestions with existingQuestions when dialog opens or existingQuestions change
  useEffect(() => {
    if (open) {
      setSavedQuestions(existingQuestions)
    }
  }, [open, existingQuestions])

  const handleChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuestions = [...questions]
    newQuestions[index].name = e.target.value
    setQuestions(newQuestions)
  }

  const handleRequiredChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuestions = [...questions]
    newQuestions[index].isRequired = e.target.checked
    setQuestions(newQuestions)
  }

  const handleAddQuestion = () => {
    setQuestions([...questions, { name: '', isRequired: false }])
  }

  const handleDeleteQuestion = (index: number) => {
    const newQuestions = [...questions]
    newQuestions.splice(index, 1)
    setQuestions(newQuestions)
  }

  const handleSave = useCallback(() => {
    // Filter out empty questions
    const validQuestions = questions.filter((question) => question.name.trim() !== '')

    // Create new question objects with IDs
    const newQuestions: ExtendedQuestion[] = validQuestions?.map((q, index) => ({
      id: `question-${Date.now()}-${index}`,
      name: q.name,
      isRequired: q.isRequired,
    }))

    // Combine with existing questions
    const allQuestions = [...savedQuestions, ...newQuestions]

    // Call parent save handler with all questions
    onSave(allQuestions)

    // Reset form
    setQuestions([{ name: '', isRequired: false }])

    onClose()
  }, [questions, savedQuestions, onSave, onClose])

  // Drag and drop logic (same pattern as AddRoleDialog)
  const reorder = (list: ExtendedQuestion[], startIndex: number, endIndex: number) => {
    const result = [...list]
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
  }

  const handleDragStart = (index: number) => (e: React.DragEvent) => {
    setDraggingIndex(index)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', String(index))
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (index: number) => (e: React.DragEvent) => {
    e.preventDefault()
    const fromStr = e.dataTransfer.getData('text/plain')
    const from = Number(fromStr)
    if (Number.isNaN(from) || from === index) return
    setSavedQuestions((prev) => reorder(prev, from, index))
    setDraggingIndex(null)
  }

  const handleDeleteExistingQuestion = (questionId: string) => {
    setSavedQuestions((prev) => prev.filter((q) => q.id !== questionId))
  }

  const hasNewQuestions = questions.some((question) => question.name.trim() !== '')

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2, background: '#f4f7fe' }}>
        <PencilIcon style={{ color: '#0029d9', marginRight: 8 }} />
        <Typography variant="h6" sx={{ fontWeight: 500, flex: 1 }}>
          Розширені питання
        </Typography>
      </Box>
      <DialogContent sx={{ p: 3 }}>
        {savedQuestions.length > 0 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 3 }} onDragOver={handleDragOver}>
            {savedQuestions?.map((item, index) => (
              <Box
                key={item.id}
                draggable
                onDragStart={handleDragStart(index)}
                onDragOver={handleDragOver}
                onDrop={handleDrop(index)}
                sx={{
                  background: '#fff',
                  borderRadius: 2,
                  p: '12px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  border: '1px solid #e5e7eb',
                  boxShadow: draggingIndex === index ? '0 4px 10px rgba(0,0,0,0.12)' : 'none',
                  cursor: 'grab',
                }}>
                <Box sx={{ mr: 1, display: 'flex', alignItems: 'center', color: '#6b7280' }}>
                  <DragIndicatorIcon />
                </Box>
                <Typography variant="body1" sx={{ fontWeight: 500, flex: 1 }}>
                  {item.name}
                </Typography>
                <Checkbox checked={item.isRequired} size="small" sx={{ ml: 1 }} disabled />
                <Typography variant="body2" color="textSecondary" sx={{ ml: 1 }}>
                  Обов'язкове поле
                </Typography>
                <IconButton size="small" sx={{ ml: 1 }} onClick={() => handleDeleteExistingQuestion(item.id)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
          </Box>
        )}

        {questions?.map((question, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 2,
              backgroundColor: '#f8f9fb',
              borderRadius: '8px',
              p: 1,
              gap: 1,
            }}>
            <TextField
              placeholder="Введіть назву"
              fullWidth
              variant="outlined"
              sx={{
                background: '#fff',
                borderRadius: '8px',
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
              }}
              value={question.name}
              onChange={handleChange(index)}
            />
            <Checkbox checked={question.isRequired} onChange={handleRequiredChange(index)} size="small" />
            <Typography variant="body2" color="textSecondary" sx={{ minWidth: 'max-content' }}>
              Обов'язкове поле
            </Typography>
            <IconButton
              sx={{ color: '#9e9e9e' }}
              disabled={questions.length <= 1}
              onClick={() => handleDeleteQuestion(index)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}

        <Button
          fullWidth
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleAddQuestion}
          sx={{
            mt: 1,
            borderColor: '#7324D580',
            color: '#7324D580',
            borderRadius: '8px',
            padding: '10px 0',
            justifyContent: 'center',
            textTransform: 'uppercase',
            fontWeight: 500,
          }}>
          ДОДАТИ ЩЕ ОДИН ПУНКТ
        </Button>
      </DialogContent>
      <Box sx={{ display: 'flex', gap: '10px', justifyContent: 'flex-start', px: 3, pb: 3, pt: 1 }}>
        <Button
          variant="outlined"
          sx={{ borderColor: '#0029d9', color: '#0029d9', padding: '12px 22px' }}
          onClick={onClose}>
          СКАСУВАТИ
        </Button>
        <Button
          variant="contained"
          sx={{ bgcolor: '#0029d9', padding: '12px 22px', flex: 1 }}
          onClick={handleSave}
          disabled={!hasNewQuestions}>
          ЗБЕРЕГТИ
        </Button>
      </Box>
    </Dialog>
  )
}
