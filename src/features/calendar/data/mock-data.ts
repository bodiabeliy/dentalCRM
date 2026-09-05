import EndoIcon from '../../../shared/assets/icons/patient-statuses/endo.svg?react'
import FillingsIcon from '../../../shared/assets/icons/patient-statuses/fillings.svg?react'
import ImplantationIcon from '../../../shared/assets/icons/patient-statuses/implantation.svg?react'
import VipIcon from '../../../shared/assets/icons/patient-statuses/vip.svg?react'
import ExpensiveWorkIcon from '../../../shared/assets/icons/patient-statuses/expensive_work.svg?react'
import FirstTimeIcon from '../../../shared/assets/icons/patient-statuses/first_time.svg?react'
import PhotoProtocolIcon from '../../../shared/assets/icons/patient-statuses/photo_protocol.svg?react'
import OnlineVisitIcon from '../../../shared/assets/icons/patient-statuses/online_visit.svg?react'
import FollowUpConsultationIcon from '../../../shared/assets/icons/patient-statuses/follow_up_consultation.svg?react'
import ProstheticsIcon from '../../../shared/assets/icons/patient-statuses/prosthetics.svg?react'
import CheckupIcon from '../../../shared/assets/icons/patient-statuses/checkup.svg?react'
import HygieneIcon from '../../../shared/assets/icons/patient-statuses/hygiene.svg?react'
import ConsultationIcon from '../../../shared/assets/icons/patient-statuses/consultation.svg?react'
import ImpressionsIcon from '../../../shared/assets/icons/patient-statuses/impressions.svg?react'
import SutureRemovalIcon from '../../../shared/assets/icons/patient-statuses/suture_removal.svg?react'
import ExtractionIcon from '../../../shared/assets/icons/patient-statuses/extraction.svg?react'
import type { FunctionComponent, SVGProps } from 'react'

export type PatientsStatuses =
  | 'endo'
  | 'fillings'
  | 'implantation'
  | 'vip'
  | 'expensive_work'
  | 'first_time'
  | 'photo_protocol'
  | 'online_visit'
  | 'follow_up_consultation'
  | 'prosthetics'
  | 'checkup'
  | 'hygiene'
  | 'consultation'
  | 'impressions'
  | 'suture_removal'
  | 'extraction'

export const PATIENTS_STATUSES: Record<
  PatientsStatuses,
  {
    label: string
    icon: FunctionComponent<SVGProps<SVGSVGElement>>
  }
> = {
  endo: {
    label: 'patient-visit.characteristic.options.endo',
    icon: EndoIcon,
  },
  fillings: {
    label: 'patient-visit.characteristic.options.fillings',
    icon: FillingsIcon,
  },
  implantation: {
    label: 'patient-visit.characteristic.options.implantation',
    icon: ImplantationIcon,
  },
  vip: {
    label: 'patient-visit.characteristic.options.vip',
    icon: VipIcon,
  },
  expensive_work: {
    label: 'patient-visit.characteristic.options.expensive_work',
    icon: ExpensiveWorkIcon,
  },
  first_time: {
    label: 'patient-visit.characteristic.options.first_time',
    icon: FirstTimeIcon,
  },
  photo_protocol: {
    label: 'patient-visit.characteristic.options.photo_protocol',
    icon: PhotoProtocolIcon,
  },
  online_visit: {
    label: 'patient-visit.characteristic.options.online_visit',
    icon: OnlineVisitIcon,
  },
  follow_up_consultation: {
    label: 'patient-visit.characteristic.options.follow_up_consultation',
    icon: FollowUpConsultationIcon,
  },
  prosthetics: {
    label: 'patient-visit.characteristic.options.prosthetics',
    icon: ProstheticsIcon,
  },
  checkup: {
    label: 'patient-visit.characteristic.options.checkup',
    icon: CheckupIcon,
  },
  hygiene: {
    label: 'patient-visit.characteristic.options.hygiene',
    icon: HygieneIcon,
  },
  consultation: {
    label: 'patient-visit.characteristic.options.consultation',
    icon: ConsultationIcon,
  },
  impressions: {
    label: 'patient-visit.characteristic.options.impressions',
    icon: ImpressionsIcon,
  },
  suture_removal: {
    label: 'patient-visit.characteristic.options.suture_removal',
    icon: SutureRemovalIcon,
  },
  extraction: {
    label: 'patient-visit.characteristic.options.extraction',
    icon: ExtractionIcon,
  },
} as const

export const ASSISTANTS = {
  '2025-07-03': {
    cabinets: [
      {
        id: 1,
        name: 'Кабінет 1',
        color: '#FFDDC1',
        assistants: [
          {
            id: 1,
            name: 'Наталя',
            surname: 'Наталівна',
            actualTimeStart: '09:00',
            actualTimeEnd: '15:00',
            scheduledTimeStart: '09:00',
            scheduledTimeEnd: '12:00',
            avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704b',
          },
          {
            id: 2,
            name: 'Оксана',
            surname: 'Олександрівна',
            actualTimeStart: '11:00',
            actualTimeEnd: '14:00',
            scheduledTimeStart: '11:00',
            scheduledTimeEnd: '14:00',
            avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704h',
          },
          {
            id: 3,
            name: 'Оксана',
            surname: 'Олександрівна',
            actualTimeStart: '11:00',
            actualTimeEnd: '14:00',
            scheduledTimeStart: '11:00',
            scheduledTimeEnd: '18:00',
            avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704c',
          },
        ],
      },
      {
        id: 2,
        name: 'Кабінет 2',
        color: '#C1FFD7',
        assistants: [
          {
            id: 4,
            name: 'Оксана',
            surname: 'Олександрівна',
            actualTimeStart: '10:00',
            actualTimeEnd: '19:00',
            scheduledTimeStart: '11:00',
            scheduledTimeEnd: '17:00',
            avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
          },
        ],
      },
    ],
  },
}

export const ADMINISTRATORS = {
  '2025-07-03': {
    cabinets: [
      {
        id: 1,
        name: 'Адміністратори',
        color: '#FFDDC1',
        administrators: [
          {
            id: 1,
            name: 'Наталя',
            surname: 'Наталівна',
            actualTimeStart: '09:00',
            actualTimeEnd: '18:00',
            scheduledTimeStart: '09:00',
            scheduledTimeEnd: '12:00',
            avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704b',
          },
          {
            id: 2,
            name: 'Оксана',
            surname: 'Олександрівна',
            actualTimeStart: '11:00',
            actualTimeEnd: '14:00',
            scheduledTimeStart: '11:00',
            scheduledTimeEnd: '14:00',
            avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704h',
          },
          {
            id: 3,
            name: 'Оксана',
            surname: 'Олександрівна',
            actualTimeStart: '11:00',
            actualTimeEnd: '14:00',
            scheduledTimeStart: '11:00',
            scheduledTimeEnd: '18:00',
            avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704c',
          },
        ],
      },
      {
        id: 2,
        name: 'Прибиральниці',
        color: '#C1FFD7',
        administrators: [
          {
            id: 4,
            name: 'Оксана',
            surname: 'Олександрівна',
            actualTimeStart: '10:00',
            actualTimeEnd: '19:00',
            scheduledTimeStart: '11:00',
            scheduledTimeEnd: '17:00',
            avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
          },
        ],
      },
      {
        id: 3,
        name: 'SMM',
        color: '#FFC1C1',
        administrators: [
          {
            id: 5,
            name: 'Марія',
            surname: 'Іванівна',
            actualTimeStart: '08:00',
            actualTimeEnd: '16:00',
            scheduledTimeStart: '09:00',
            scheduledTimeEnd: '17:00',
            avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704e',
          },
        ],
      },
      {
        id: 4,
        name: 'Бухгалтер',
        color: '#C1C7FF',
        administrators: [
          {
            id: 6,
            name: 'Анна',
            surname: 'Петрівна',
            actualTimeStart: '09:00',
            actualTimeEnd: '18:00',
            scheduledTimeStart: '09:00',
            scheduledTimeEnd: '18:00',
            avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704f',
          },
        ],
      },
    ],
  },
  '2025-07-04': {
    cabinets: [
      {
        id: 1,
        name: 'Адміністратори',
        color: '#FFDDC1',
        administrators: [
          {
            id: 1,
            name: 'Наталя Наталівна',
            actualTimeStart: '08:00',
            actualTimeEnd: '19:00',
            scheduledTimeStart: '09:00',
            scheduledTimeEnd: '15:00',
          },
        ],
      },
      {
        id: 2,
        name: 'Прибиральниці',
        color: '#C1FFD7',
        administrators: [
          {
            id: 2,
            name: 'Оксана Олександрівна',
            actualTimeStart: '09:00',
            actualTimeEnd: '15:00',
            scheduledTimeStart: '09:00',
            scheduledTimeEnd: '12:00',
          },
        ],
      },
      {
        id: 3,
        name: 'SMM',
        color: '#FFC1C1',
        administrators: [
          {
            id: 3,
            name: 'Марія Іванівна',
            actualTimeStart: '09:00',
            actualTimeEnd: '15:00',
            scheduledTimeStart: '09:00',
            scheduledTimeEnd: '12:00',
          },
        ],
      },
      {
        id: 4,
        name: 'Бухгалтер',
        color: '#C1C7FF',
        administrators: [
          {
            id: 4,
            name: 'Анна Петрівна',
            actualTimeStart: '09:00',
            actualTimeEnd: '15:00',
            scheduledTimeStart: '09:00',
            scheduledTimeEnd: '12:00',
          },
        ],
      },
    ],
  },
}
