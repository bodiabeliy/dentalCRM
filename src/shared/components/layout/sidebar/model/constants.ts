import DesktopIcon from '../../../../assets/icons/desktop.svg?react'
import ScheduleIcon from '../../../../assets/icons/schedule.svg?react'
import PatientsIcon from '../../../../assets/icons/patients.svg?react'
import LeadsIcon from '../../../../assets/icons/leads.svg?react'
import ChatIcon from '../../../../assets/icons/chat.svg?react'
import TaskIcon from '../../../../assets/icons/task.svg?react'
import BankIcon from '../../../../assets/icons/bank.svg?react'
import CoinsIcon from '../../../../assets/icons/coins.svg?react'
import LabIcon from '../../../../assets/icons/lab.svg?react'
import ReportsIcon from '../../../../assets/icons/reports.svg?react'
import SettingsIcon from '../../../../assets/icons/settings.svg?react'
import type { SidebarSection } from './types'

export const MOCK_CLINICS = []

export const SIDEBAR_SECTIONS: SidebarSection[] = [
  {
    id: 'main',
    title: 'sidebar.main',
    items: [
      {
        id: 'desktop',
        text: 'sidebar.desktop',
        icon: DesktopIcon,
        link: '/',
      },
      {
        id: 'schedule',
        text: 'sidebar.schedule',
        icon: ScheduleIcon,
        link: '/schedule',
        hasSubItems: true,
        subItems: [
          {
            id: 'lost-consultation',
            text: 'sidebar.lost-consultation',
            link: '/lost-consultation',
          },
          {
            id: 'expired-consultation',
            text: 'sidebar.expired-consultation',
            link: '/overdue-services',
          },
        ],
      },
      {
        id: 'patients',
        text: 'sidebar.patients',
        icon: PatientsIcon,
        link: '/patients',
      },
    ],
  },
  {
    id: 'info',
    title: 'sidebar.info',
    items: [
      {
        id: 'leads',
        text: 'sidebar.leads',
        link: '/leads',
        icon: LeadsIcon,
      },
      {
        id: 'chat',
        text: 'sidebar.chats',
        icon: ChatIcon,
        link: '/chat',
      },
      {
        id: 'tasks',
        text: 'sidebar.tasks',
        icon: TaskIcon,
      },
    ],
  },
  {
    id: 'finance',
    title: 'sidebar.finance',
    items: [
      {
        id: 'bank-and-cash',
        text: 'sidebar.bank-and-cash',
        icon: BankIcon,
        link: '/financial-management',
      },
      {
        id: 'purchases',
        text: 'sidebar.purchases',
        icon: CoinsIcon,
      },
    ],
  },
  {
    id: 'management',
    title: 'sidebar.management',
    items: [
      {
        id: 'lab',
        text: 'sidebar.lab',
        icon: LabIcon,
      },
      {
        id: 'reports',
        text: 'sidebar.reports',
        icon: ReportsIcon,
      },
      {
        id: 'settings',
        text: 'sidebar.settings',
        icon: SettingsIcon,
        link: '/clinic-settings',
      },
    ],
  },
]

export const USER_PROFILE = {
  settingsLink: '/settings',
}
