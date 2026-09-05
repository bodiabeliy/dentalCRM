import { ScheduleProvider } from '../features/schedule'
import { SettingsProvider } from '../features/settings/contexts/settings-context'
import { ModalProvider } from '../shared/contexts/modal-context'
import { I18nextProvider } from 'react-i18next'
import i18n from '../shared/utils/i18n'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { SidebarLayoutProvider } from '../shared/contexts/sidebar-layout-context'
import { BrowserRouter } from 'react-router'
import { RouteProvider } from './providers/route-provider'
import { store } from './providers/store'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'

const theme = createTheme({
  typography: {
    fontFamily:
      '"Ubuntu", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    allVariants: {
      color: 'rgba(21, 22, 24, 0.87)',
      fontFeatureSettings: '"liga" 1, "kern" 1',
      textRendering: 'optimizeLegibility',
    },
  },
  palette: {
    primary: {
      main: '#0029d9',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          '&.Mui-checked': {
            color: '#0029d9',
          },
        },
      },
    },
  },
})

export function AppProviders() {
  return (
    <BrowserRouter>
      <Provider store={store()}>
        <ThemeProvider theme={theme}>
          <SidebarLayoutProvider>
            <I18nextProvider i18n={i18n}>
              <SettingsProvider>
                <ScheduleProvider>
                  <ModalProvider>
                    <RouteProvider />
                    <ToastContainer position="top-right" autoClose={3000} theme="colored" />
                  </ModalProvider>
                </ScheduleProvider>
              </SettingsProvider>
            </I18nextProvider>
          </SidebarLayoutProvider>
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  )
}
