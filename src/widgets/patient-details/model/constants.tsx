import EndoIcon from '../../../shared/assets/icons/patient-statuses/endo.svg?react'
import FillingsIcon from '../../../shared/assets/icons/patient-statuses/fillings.svg?react'
import FirstTimeIcon from '../../../shared/assets/icons/patient-statuses/first_time.svg?react'
import ConsultationIcon from '../../../shared/assets/icons/patient-statuses/consultation.svg?react'

export const mockDocuments = [
  {
    id: '1',
    name: 'Договір про документи',
    date: '21.23.2024',
    status: '',
    doctor: { name: 'Олена Сергіївна', avatar: '' },
    canEdit: true,
  },
  {
    id: '2',
    name: 'Договір про документи',
    date: '21.23.2024',
    status: 'Надруковано',
    doctor: { name: 'Олена Сергіївна', avatar: '' },
    canEdit: false,
  },
  {
    id: '3',
    name: 'Договір про документи',
    date: '21.23.2024',
    status: '',
    doctor: { name: 'Олена Сергіївна', avatar: '' },
    canEdit: true,
  },
]

export const mockDocumentTemplates = [
  { id: '1', name: 'Договір про документи' },
  { id: '2', name: 'Договір про документи' },
]

export const mockMozForms = [{ id: '1', name: 'Договір про документи' }]

export const mockVisits = [
  {
    id: '1',
    date: new Date(2024, 8, 23),
    dayOfWeek: 'Вт',
    time: '10:00-11:30',
    icon: 'endo',
    patientType: 'Первинний пацієнт',
    room: '107 Кабінет',
    doctor: { name: 'Марія Петрівна', avatar: '' },
    status: 'Виконано',
    statusColor: '#2e7d32',
    hasDescription: false,
  },
  {
    id: '2',
    date: new Date(2024, 8, 23),
    dayOfWeek: 'Вт',
    time: '10:00-11:30',
    icon: 'fillings',
    patientType: 'Первинний пацієнт',
    room: '107 Кабінет',
    doctor: { name: 'Марія Петрівна', avatar: '' },
    status: 'Скасовано',
    statusColor: '#d32f2f',
    hasDescription: false,
  },
  {
    id: '3',
    date: new Date(2024, 8, 24),
    dayOfWeek: 'Ср',
    time: '10:00-11:30',
    icon: 'first_time',
    patientType: 'Первинний пацієнт',
    room: '107 Кабінет',
    doctor: { name: 'Марія Петрівна', avatar: '' },
    status: 'Виконано',
    statusColor: '#2e7d32',
    hasDescription: true,
    description:
      'Первинний прийом. Пацієнт звернувся зі скаргами на загальний стан ротової порожнини. Проведено огляд, виявлено потребу',
  },
  {
    id: '4',
    date: new Date(2024, 8, 23),
    dayOfWeek: 'Вт',
    time: '10:00-11:30',
    icon: 'endo',
    patientType: 'Первинний пацієнт',
    room: '107 Кабінет',
    doctor: { name: 'Марія Петрівна', avatar: '' },
    status: 'Виконано',
    statusColor: '#2e7d32',
    hasDescription: true,
    description:
      'Первинний прийом. Пацієнт звернувся зі скаргами на загальний стан ротової порожнини. Проведено огляд, виявлено потребу',
  },
  {
    id: '5',
    date: new Date(2024, 8, 23),
    dayOfWeek: 'Вт',
    time: '10:00-11:30',
    icon: 'fillings',
    patientType: 'Первинний пацієнт',
    room: '107 Кабінет',
    doctor: { name: 'Марія Петрівна', avatar: '' },
    status: 'Скасовано',
    statusColor: '#d32f2f',
    hasDescription: false,
  },
]

export const mockReminders = [
  {
    id: '1',
    text: 'Звернути увагу на повний збір анамнезу, алергії, хронічні захворювання, попередній стоматологічний досвід. За потреби — направлення на рентген та консультування суміжних спеціалістів',
    employees: 5,
    status: 'Виконано',
    statusColor: '#2e7d32',
    hasDescription: true,
    description:
      'Первинний прийом. Пацієнт звернувся зі скаргами на загальний стан ротової порожнини. Проведено огляд, виявлено потребу',
  },
  {
    id: '2',
    text: 'Звернути увагу на повний збір анамнезу, алергії, хронічні захворювання, попередній стоматологічний досвід. За потреби — направлення на рентген та консультування суміжних спеціалістів',
    employees: 5,
    status: 'Виконано',
    statusColor: '#2e7d32',
    hasDescription: true,
    description:
      'Первинний прийом. Пацієнт звернувся зі скаргами на загальний стан ротової порожнини. Проведено огляд, виявлено потребу',
  },
]

export const getIconComponent = (iconType: string) => {
  switch (iconType) {
    case 'endo':
      return <EndoIcon style={{ width: 24, height: 24 }} />
    case 'fillings':
      return <FillingsIcon style={{ width: 24, height: 24 }} />
    case 'first_time':
      return <FirstTimeIcon style={{ width: 24, height: 24 }} />
    case 'consultation':
      return <ConsultationIcon style={{ width: 24, height: 24 }} />
    default:
      return <EndoIcon style={{ width: 24, height: 24 }} />
  }
}
