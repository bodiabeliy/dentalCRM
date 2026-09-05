import './shared/utils/i18n'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './app/app-styles.css'
import 'react-toastify/dist/ReactToastify.css'
import App from './app/app-main.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
