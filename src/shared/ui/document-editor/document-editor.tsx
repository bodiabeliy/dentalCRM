import { useState } from 'react'
import { Box, IconButton, Select, MenuItem, FormControl, Divider, Paper } from '@mui/material'
import {
  Undo as UndoIcon,
  Redo as RedoIcon,
  FormatBold as BoldIcon,
  FormatItalic as ItalicIcon,
  FormatUnderlined as UnderlineIcon,
  TableChart as TableIcon,
  Image as ImageIcon,
  FormatAlignLeft as AlignLeftIcon,
  FormatAlignCenter as AlignCenterIcon,
  FormatAlignRight as AlignRightIcon,
  FormatAlignJustify as AlignJustifyIcon,
  FormatColorText as ColorIcon,
  FormatColorFill as HighlightIcon,
  FormatListBulleted as BulletListIcon,
  FormatListNumbered as NumberedListIcon,
  FormatIndentIncrease as IndentIcon,
  FormatIndentDecrease as OutdentIcon,
  HorizontalRule as HorizontalRuleIcon,
  CheckBox as CheckboxIcon,
  RadioButtonUnchecked as CircleIcon,
  CheckBoxOutlineBlank as SquareCheckboxIcon,
  Close as CloseIcon,
  Print as PrintIcon,
  Check as CheckIcon,
} from '@mui/icons-material'

interface DocumentEditorProps {
  onClose: () => void
  onSave: () => void
  onPrint: () => void
}

export function DocumentEditor({ onClose, onSave, onPrint }: DocumentEditorProps) {
  const [fontSize, setFontSize] = useState('14')
  const [paragraphStyle, setParagraphStyle] = useState('Абзац')
  const [fontFamily, setFontFamily] = useState('Roboto')

  return (
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
          alignItems: 'center',
          gap: 1,
          p: 2,
          borderBottom: '1px solid #e0e0e0',
          backgroundColor: '#f8f9fa',
          flexWrap: 'wrap',
        }}>
        <IconButton size="small" sx={{ color: '#666' }}>
          <UndoIcon fontSize="small" />
        </IconButton>
        <IconButton size="small" sx={{ color: '#666' }}>
          <RedoIcon fontSize="small" />
        </IconButton>
        <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <Select value={paragraphStyle} onChange={(e) => setParagraphStyle(e.target.value)} sx={{ fontSize: '14px' }}>
            <MenuItem value="Абзац">Абзац</MenuItem>
            <MenuItem value="Заголовок 1">Заголовок 1</MenuItem>
            <MenuItem value="Заголовок 2">Заголовок 2</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <Select value={fontFamily} onChange={(e) => setFontFamily(e.target.value)} sx={{ fontSize: '14px' }}>
            <MenuItem value="Roboto">Roboto</MenuItem>
            <MenuItem value="Arial">Arial</MenuItem>
            <MenuItem value="Times New Roman">Times New Roman</MenuItem>
          </Select>
        </FormControl>
        <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
        <IconButton size="small" sx={{ color: '#666' }}>
          <BoldIcon fontSize="small" />
        </IconButton>
        <IconButton size="small" sx={{ color: '#666' }}>
          <ItalicIcon fontSize="small" />
        </IconButton>
        <IconButton size="small" sx={{ color: '#666' }}>
          <UnderlineIcon fontSize="small" />
        </IconButton>
        <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
        <IconButton size="small" sx={{ color: '#666' }}>
          <TableIcon fontSize="small" />
        </IconButton>
        <IconButton size="small" sx={{ color: '#666' }}>
          <ImageIcon fontSize="small" />
        </IconButton>
        <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
        <FormControl size="small" sx={{ minWidth: 80 }}>
          <Select value={fontSize} onChange={(e) => setFontSize(e.target.value)} sx={{ fontSize: '14px' }}>
            <MenuItem value="12">12 px</MenuItem>
            <MenuItem value="14">14 px</MenuItem>
            <MenuItem value="16">16 px</MenuItem>
            <MenuItem value="18">18 px</MenuItem>
            <MenuItem value="20">20 px</MenuItem>
          </Select>
        </FormControl>
        <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
        <IconButton size="small" sx={{ color: '#666' }}>
          <AlignLeftIcon fontSize="small" />
        </IconButton>
        <IconButton size="small" sx={{ color: '#666' }}>
          <AlignCenterIcon fontSize="small" />
        </IconButton>
        <IconButton size="small" sx={{ color: '#666' }}>
          <AlignRightIcon fontSize="small" />
        </IconButton>
        <IconButton size="small" sx={{ color: '#666' }}>
          <AlignJustifyIcon fontSize="small" />
        </IconButton>
        <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
        <IconButton size="small" sx={{ color: '#666' }}>
          <ColorIcon fontSize="small" />
        </IconButton>
        <IconButton size="small" sx={{ color: '#666' }}>
          <HighlightIcon fontSize="small" />
        </IconButton>
        <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
        <IconButton size="small" sx={{ color: '#666' }}>
          <BulletListIcon fontSize="small" />
        </IconButton>
        <IconButton size="small" sx={{ color: '#666' }}>
          <NumberedListIcon fontSize="small" />
        </IconButton>
        <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
        <IconButton size="small" sx={{ color: '#666' }}>
          <IndentIcon fontSize="small" />
        </IconButton>
        <IconButton size="small" sx={{ color: '#666' }}>
          <OutdentIcon fontSize="small" />
        </IconButton>
        <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
        <IconButton size="small" sx={{ color: '#666' }}>
          <HorizontalRuleIcon fontSize="small" />
        </IconButton>
        <IconButton size="small" sx={{ color: '#666' }}>
          <CheckboxIcon fontSize="small" />
        </IconButton>
        <IconButton size="small" sx={{ color: '#666' }}>
          <CircleIcon fontSize="small" />
        </IconButton>
        <IconButton size="small" sx={{ color: '#666' }}>
          <SquareCheckboxIcon fontSize="small" />
        </IconButton>
      </Box>
      <Box
        sx={{
          flex: 1,
          p: 2,
          backgroundColor: 'white',
          overflow: 'auto',
        }}>
        <Paper
          elevation={1}
          sx={{
            minHeight: '100%',
            backgroundColor: 'white',
            p: 4,
            boxShadow:
              '0 2px 3px -1px rgba(0, 0, 0, 0.1), 0 1px 12px 0 rgba(0, 0, 0, 0.1), 0 1px 3px 0 rgba(0, 0, 0, 0.05)',
          }}>
          <Box
            contentEditable
            sx={{
              minHeight: '400px',
              outline: 'none',
              fontFamily: fontFamily,
              fontSize: `${fontSize}px`,
              lineHeight: 1.6,
              '&:empty:before': {
                content: '"Почніть вводити текст..."',
                color: '#999',
                fontStyle: 'italic',
              },
            }}
          />
        </Paper>
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
          onClick={onPrint}
          sx={{
            width: 48,
            height: 48,
            backgroundColor: '#8a4bdc',
            color: 'white',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            '&:hover': {
              backgroundColor: '#7a3bc8',
            },
          }}>
          <PrintIcon />
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
  )
}
