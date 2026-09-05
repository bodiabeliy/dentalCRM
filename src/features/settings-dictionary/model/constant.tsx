import UsersIcon from '../../../shared/assets/icons/users.svg?react'
import BoxIcon from '../../../shared/assets/icons/box.svg?react'
import CoinIcon from '../../../shared/assets/icons/coins.svg?react'
import SettingsGeneralIcon from '../../../shared/assets/icons/settings_general.svg?react'

export const DICTIONARY_SETTINGS_TABS = [
  {
    id: 1,
    title: 'Ліди',
    Icon: UsersIcon,
    color: 'rgba(0, 41, 217, 0.5)',
    subitems: [
      {
        id: 1,
        title: 'Статуси лідів',
        tab: 'leads-statuses',
      },
      {
        id: 2,
        title: 'Причина відмови',
      },
    ],
  },
  {
    id: 2,
    title: 'Склад',
    Icon: BoxIcon,
    color: '#7324d5',
    subitems: [
      {
        id: 1,
        title: 'Список складів',
      },
    ],
  },
  {
    id: 3,
    title: 'ОПЛАТИ',
    Icon: CoinIcon,
    color: 'rgba(2, 136, 209, 0.5)',
    subitems: [
      {
        id: 1,
        title: 'Каси',
      },
      {
        id: 2,
        title: 'Карти Фіз осіб',
      },
      {
        id: 3,
        title: 'Рахунки і компанії',
      },
      {
        id: 4,
        title: 'Статті доходу',
      },
      {
        id: 5,
        title: 'Статті витрат',
      },
    ],
  },
  {
    id: 4,
    title: 'ЗАГАЛЬНІ',
    Icon: SettingsGeneralIcon,
    color: '#2e7d32',
    subitems: [
      {
        id: 1,
        title: 'Теги',
      },
      {
        id: 2,
        title: 'Причина відмови',
      },
      {
        id: 3,
        title: 'Звідки дізнався',
      },
      {
        id: 4,
        title: 'Джерело контакту',
      },
    ],
  },
]
