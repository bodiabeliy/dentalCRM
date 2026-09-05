import { SchedulePage } from '../../pages/schedule'
import { SignUpPage } from '../../pages/sign-up'
import { LoginPage } from '../../pages/login'
import { ForgotPasswordPage } from '../../pages/forgot-password'
import { ClinicSettingsPage } from '../../widgets'
import { LostConsultationPage } from '../../pages/lost-consultation'

import { LeadsPage } from '../../pages/leads/leads'
import { LeadInfoPage } from '../../pages/leads/lead-info'

import { OverdueServicesPage } from '../../pages/overdue-services'
import { PatientsPage } from '../../pages/patients'
import { PatientDetailsPage } from '../../pages/patient-details'
import { PatientEditPage } from '../../pages/patient-edit'
import { DesktopPage } from '../../pages/desktop'
import { CreateClinicPage } from '../../pages/create-clinic'
import SettingsPage from '../../pages/settings'
import { ChatPage } from '../../pages/chat'
import { FinancialManagementPage } from '../../pages/financial-management'

import {
  getForgotPasswordRoute,
  getHomeRoute,
  getLoginRoute,
  getScheduleRoute,
  getSettingsRoute,
  getSignUpRoute,
  getClinicSettingsRoute,
  getClinicSettingsProfileRoute,
  getClinicSettingsWorkersRoute,
  getClinicSettingsScheduleRoute,
  getClinicSettingsPriceRoute,
  getClinicSettingsSalaryRoute,
  getClinicSettingsIntegrationsRoute,
  getClinicSettingsGeneralRoute,
  getClinicSettingsDictionaryRoute,
  getClinicSettingsWorkerEditRoute,
  getLostConsultationRoute,
  getOverdueServicesRoute,
  getPatientsRoute,
  getPatientDetailsRoute,
  getPatientEditRoute,
  getCreateClinicRoute,
  getChatRoute,
  getLeadsRoute,
  getLeadInfoRoute,
  getFinancialManagementRoute,
  getConfirmationPage,
  getRecoveryPasswordRoute,
} from '../../shared/types/routes'
import { Route, Routes } from 'react-router'
import { CodeConfirmationPage } from '../../pages/code-confirmation'
import { useSelector } from 'react-redux'
import { isAuth, isUserAuthSelector } from './reducers/UserSlice'

import { RecoveryPasswordPage } from '../../pages/recovery-password'
import { token } from '../../shared/utils/storageUtils'
import { useAppDispatch } from './store-helpers'
import { useEffect } from 'react'
import PrivatePageWrapper from '../../shared/components/privatePage/RequireAuth'

const unAuthorizedRoutes = [
  {
    element: <SignUpPage />,
    path: getSignUpRoute(),
  },
  {
    element: <CodeConfirmationPage />,
    path: getConfirmationPage(),
  },
  {
    element: <LoginPage />,
    path: getLoginRoute(),
  },
  {
    element: <DesktopPage />,
    path: getHomeRoute(),
  },
  {
    element: <ForgotPasswordPage />,
    path: getForgotPasswordRoute(),
  },
  {
    element: <RecoveryPasswordPage />,
    path: getRecoveryPasswordRoute(),
  },
  {
    element: (
      <PrivatePageWrapper>
        <DesktopPage />
      </PrivatePageWrapper>
    ),
    path: '*',
  },
]

const authorizedRoutes = [
  {
    element: <DesktopPage />,
    path: getHomeRoute(),
  },
  {
    element: <SchedulePage />,
    path: getScheduleRoute(),
  },
  {
    element: <SettingsPage />,
    path: getSettingsRoute(),
  },
  {
    element: <ClinicSettingsPage />,
    path: getClinicSettingsRoute(),
  },
  // Settings subroutes (deep links)
  { element: <ClinicSettingsPage />, path: getClinicSettingsProfileRoute() },
  { element: <ClinicSettingsPage />, path: getClinicSettingsWorkersRoute() },
  { element: <ClinicSettingsPage />, path: getClinicSettingsScheduleRoute() },
  { element: <ClinicSettingsPage />, path: getClinicSettingsPriceRoute() },
  { element: <ClinicSettingsPage />, path: getClinicSettingsSalaryRoute() },
  { element: <ClinicSettingsPage />, path: getClinicSettingsIntegrationsRoute() },
  { element: <ClinicSettingsPage />, path: getClinicSettingsGeneralRoute() },
  { element: <ClinicSettingsPage />, path: getClinicSettingsDictionaryRoute() },
  // Edit staff form route (opens workers subpage with edit)
  { element: <ClinicSettingsPage />, path: getClinicSettingsWorkerEditRoute(':id') },
  {
    element: <LostConsultationPage />,
    path: getLostConsultationRoute(),
  },
  {
    element: <OverdueServicesPage />,
    path: getOverdueServicesRoute(),
  },
  {
    element: <PatientsPage />,
    path: getPatientsRoute(),
  },
  {
    element: <PatientDetailsPage />,
    path: getPatientDetailsRoute(':id'),
  },
  {
    element: <PatientEditPage />,
    path: getPatientEditRoute(':id'),
  },
  {
    element: <CreateClinicPage />,
    path: getCreateClinicRoute(),
  },
  {
    element: <ChatPage />,
    path: getChatRoute(),
  },
  {
    element: <FinancialManagementPage />,
    path: getFinancialManagementRoute(),
  },
  {
    element: <LeadsPage />,
    path: getLeadsRoute(),
  },
  {
    element: <LeadInfoPage />,
    path: getLeadInfoRoute(':id'),
  },
]

export function RouteProvider() {
  const isAuthorization = useSelector(isUserAuthSelector)
  const dispatch = useAppDispatch()
  // If not authorized and not already on login, redirect to login

  console.log('isAuthorization', isAuthorization)

  useEffect(() => {
    if (token) {
      dispatch(isAuth(true))
    }
  }, [dispatch])

  return (
    <Routes>
      {isAuthorization
        ? authorizedRoutes.map((route) => <Route key={route.path} element={route.element} path={route.path} />)
        : unAuthorizedRoutes.map((route) => <Route key={route.path} element={route.element} path={route.path} />)}
    </Routes>
  )
}
