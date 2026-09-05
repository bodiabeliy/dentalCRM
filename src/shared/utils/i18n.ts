import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import HttpBackend from 'i18next-http-backend'

// detect initial language

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    lng: 'uk',
    fallbackLng: 'uk',
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    // Preload common + domain namespaces; keep 'translation' for backward compatibility
    ns: [
      'common',
      'auth',
      'settings',
      'clinic',
      'sidebar',
      'workers',
      'patients',
      'schedule',
      'treatment',
      'finance',
      'leads',
      'errors',
      'notifications',
      'translation',
    ],
    defaultNS: 'common',
  })

export default i18n
