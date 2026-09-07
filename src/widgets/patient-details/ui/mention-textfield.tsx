import { useState, useRef, useEffect } from 'react'
import { Box, TextField, Typography, IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { Avatar } from '../../../shared/components/ui/avatar'

interface User {
  id: string
  name: string
  avatar?: string
}

interface MentionTextFieldProps {
  placeholder?: string
  multiline?: boolean
  rows?: number
  sx?: any
  value?: string
  onChange?: (value: string) => void
}

const mockUsers: User[] = [
  { id: '1', name: 'Ірина Вікторівна', avatar: '/avatars/iryna1.jpg' },
  { id: '2', name: 'Ірина Ігорівна', avatar: '/avatars/iryna2.jpg' },
  { id: '3', name: 'Ірина Опанасенко', avatar: '/avatars/iryna3.jpg' },
  { id: '4', name: 'Олекса Олексій Ігорович', avatar: '/avatars/oleksa.jpg' },
  { id: '5', name: 'Марія Петрівна', avatar: '/avatars/maria.jpg' },
]

export function MentionTextField({
  placeholder,
  multiline = false,
  rows = 1,
  sx,
  value = '',
  onChange,
}: MentionTextFieldProps) {
  const [inputValue, setInputValue] = useState(value)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [suggestions, setSuggestions] = useState<User[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [mentionQuery, setMentionQuery] = useState('')
  const [cursorPosition, setCursorPosition] = useState(0)
  const [dropdownPosition, setDropdownPosition] = useState<'top' | 'bottom'>('bottom')
  const textFieldRef = useRef<HTMLDivElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setInputValue(value)
  }, [value])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        textFieldRef.current &&
        !textFieldRef.current.contains(event.target as Node) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false)
        setSuggestions([])
      }
    }

    if (showSuggestions) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showSuggestions])

  const findMentionQuery = (text: string, cursorPos: number) => {
    const beforeCursor = text.slice(0, cursorPos)
    const match = beforeCursor.match(/@([а-яА-ЯіІїЇєЄ\w]*)$/)
    return match ? match[1] : null
  }

  const filterUsers = (query: string) => {
    if (!query) return mockUsers
    return mockUsers.filter((user) => user.name.toLowerCase().includes(query.toLowerCase()))
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = event.target.value
    const cursorPos = event.target.selectionStart || 0

    setInputValue(newValue)
    setCursorPosition(cursorPos)

    const query = findMentionQuery(newValue, cursorPos)

    if (query !== null) {
      setMentionQuery(query)
      const filteredUsers = filterUsers(query)
      setSuggestions(filteredUsers)
      setShowSuggestions(filteredUsers.length > 0)
      setSelectedIndex(0)

      setTimeout(() => {
        if (textFieldRef.current) {
          setDropdownPosition('top')
        }
      }, 0)
    } else {
      setShowSuggestions(false)
      setSuggestions([])
    }

    onChange?.(newValue)
  }

  const insertMention = (user: User) => {
    const beforeMention = inputValue.slice(0, cursorPosition - mentionQuery.length - 1)
    const afterMention = inputValue.slice(cursorPosition)
    const newValue = `${beforeMention}@${user.name} ${afterMention}`

    setInputValue(newValue)
    setShowSuggestions(false)
    setSuggestions([])
    onChange?.(newValue)

    setTimeout(() => {
      const textField = textFieldRef.current?.querySelector('textarea') as HTMLTextAreaElement
      if (textField) {
        const newCursorPos = beforeMention.length + user.name.length + 2 // +2 for @ and space
        textField.focus()
        textField.setSelectionRange(newCursorPos, newCursorPos)
      }
    }, 0)
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (showSuggestions) {
      if (event.key === 'ArrowDown') {
        event.preventDefault()
        setSelectedIndex((prev) => (prev + 1) % suggestions.length)
      } else if (event.key === 'ArrowUp') {
        event.preventDefault()
        setSelectedIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length)
      } else if (event.key === 'Enter' && suggestions.length > 0) {
        event.preventDefault()
        insertMention(suggestions[selectedIndex])
      } else if (event.key === 'Escape') {
        setShowSuggestions(false)
        setSuggestions([])
      }
    }
  }

  const handleSuggestionClick = (user: User) => {
    insertMention(user)
  }

  return (
    <Box sx={{ position: 'relative', width: '100%', zIndex: showSuggestions ? 9999 : 'auto' }}>
      <TextField
        ref={textFieldRef}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        multiline={multiline}
        rows={rows}
        sx={sx}
        fullWidth
      />

      {showSuggestions && suggestions.length > 0 && (
        <Box
          ref={suggestionsRef}
          sx={{
            position: 'absolute',
            [dropdownPosition === 'top' ? 'bottom' : 'top']: dropdownPosition === 'top' ? 'calc(100% + 8px)' : '100%',
            left: 0,
            zIndex: 9999,
            background: 'white',
            borderRadius: 2,
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            border: '1px solid #e0e0e0',
            maxHeight: 200,
            overflow: 'auto',
            width: 'fit-content',
          }}>
          <Typography
            sx={{
              p: 1.5,
              pb: 1,
              fontWeight: 500,
              fontSize: 14,
              lineHeight: '171%',
              letterSpacing: '0.01em',
              color: 'rgba(21, 22, 24, 0.87)',
              borderBottom: '1px solid #f0f0f0',
            }}>
            Пропозиції
          </Typography>
          {suggestions?.map((user, index) => (
            <Box
              key={user.id}
              onClick={() => handleSuggestionClick(user)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                p: 1.5,
                cursor: 'pointer',
                background: index === selectedIndex ? '#f5f5f5' : 'transparent',
                '&:hover': {
                  background: '#f5f5f5',
                },
              }}>
              <Avatar
                src={user.avatar}
                width={24}
                height={24}
                borderRadius="8px"
                sx={{
                  mr: 1.5,
                  fontSize: 14,
                }}
              />
              <Typography
                sx={{
                  flex: 1,
                  fontWeight: 400,
                  fontSize: 16,
                  lineHeight: '150%',
                  letterSpacing: '0.01em',
                  color: 'rgba(21, 22, 24, 0.87)',
                }}>
                {user.name}
              </Typography>
              <IconButton
                size="small"
                sx={{
                  p: 0.5,
                  color: '#666',
                  '&:hover': {
                    color: '#1976d2',
                  },
                }}>
                <AddIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  )
}
