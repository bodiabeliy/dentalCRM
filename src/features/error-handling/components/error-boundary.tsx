import React, { Component, type ReactNode } from 'react'
import { Box, Typography, Button, Paper, Alert, AlertTitle, Collapse, Stack } from '@mui/material'
import { ExpandMore, ExpandLess } from '@mui/icons-material'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
  errorInfo?: React.ErrorInfo
  showDetails: boolean
}

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode | ((error: Error, errorInfo: React.ErrorInfo) => ReactNode)
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
  resetKey?: string | number
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, showDetails: false }
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)

    this.setState({
      error,
      errorInfo,
    })

    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    if (prevProps.resetKey !== this.props.resetKey && this.state.hasError) {
      this.setState({ hasError: false, error: undefined, errorInfo: undefined, showDetails: false })
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined, showDetails: false })
  }

  toggleDetails = () => {
    this.setState((prev) => ({ showDetails: !prev.showDetails }))
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        if (typeof this.props.fallback === 'function') {
          return this.props.fallback(this.state.error!, this.state.errorInfo!)
        }
        return this.props.fallback
      }

      return (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          minHeight="100vh"
          p={3}
          sx={{ backgroundColor: 'grey.50' }}>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              maxWidth: 500,
              textAlign: 'center',
              borderRadius: 2,
            }}>
            <Alert severity="error" sx={{ mb: 3 }}>
              <AlertTitle>Щось пішло не так</AlertTitle>
              Вибачте, щось не так. Будь ласка, спробуйте оновити сторінку.
            </Alert>
            <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 3 }}>
              <Button variant="contained" onClick={this.handleReset} color="primary">
                Спробувати знову
              </Button>
              <Button variant="outlined" onClick={() => window.location.reload()} color="secondary">
                Оновити сторінку
              </Button>
            </Stack>

            {import.meta.env.DEV && this.state.error && (
              <Box>
                <Button
                  onClick={this.toggleDetails}
                  endIcon={this.state.showDetails ? <ExpandLess /> : <ExpandMore />}
                  variant="text"
                  size="small"
                  sx={{ mb: 1 }}>
                  Деталі помилки (Розробка)
                </Button>

                <Collapse in={this.state.showDetails}>
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 2,
                      backgroundColor: 'grey.50',
                      textAlign: 'left',
                    }}>
                    <Typography variant="subtitle2" color="error" gutterBottom>
                      Повідомлення про помилку:
                    </Typography>
                    <Typography
                      component="pre"
                      variant="caption"
                      sx={{
                        backgroundColor: 'grey.100',
                        p: 1,
                        borderRadius: 1,
                        overflow: 'auto',
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                        color: 'error.main',
                        mb: 2,
                      }}>
                      {this.state.error.toString()}
                    </Typography>

                    {this.state.errorInfo && (
                      <>
                        <Typography variant="subtitle2" color="error" gutterBottom>
                          Стек компонентів:
                        </Typography>
                        <Typography
                          component="pre"
                          variant="caption"
                          sx={{
                            backgroundColor: 'grey.100',
                            p: 1,
                            borderRadius: 1,
                            overflow: 'auto',
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-word',
                            color: 'error.main',
                          }}>
                          {this.state.errorInfo.componentStack}
                        </Typography>
                      </>
                    )}
                  </Paper>
                </Collapse>
              </Box>
            )}
          </Paper>
        </Box>
      )
    }

    return this.props.children
  }
}
