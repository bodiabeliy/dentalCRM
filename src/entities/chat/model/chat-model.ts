import type { Chat, Message, ChatStatus } from './types'

export const chatModel = {
  mockChats: [
    {
      id: 1,
      name: 'Олена Петрівна',
      lastMessage: 'Текст надісланого повідомлення',
      time: '10:15',
      unread: 2,
      avatar: '/api/placeholder/40/40',
      isActive: false,
      viber: false,
      telegram: true,
    },
    {
      id: 2,
      name: 'Марія Іванівна',
      lastMessage: 'Текст надісланого повідомлення',
      time: '10:15',
      unread: 2,
      avatar: '/api/placeholder/40/40',
      isActive: true,
      viber: false,
      telegram: true,
    },
    {
      id: 3,
      name: 'Тетяна Сергіївна',
      lastMessage: 'Текст надісланого повідомлення',
      time: '10:15',
      unread: 0,
      avatar: '/api/placeholder/40/40',
      isActive: false,
      viber: false,
      telegram: true,
    },
    {
      id: 4,
      name: 'Ірина Василівна',
      lastMessage: 'Текст надісланого повідомлення',
      time: '10:15',
      unread: 0,
      avatar: '/api/placeholder/40/40',
      isActive: false,
      viber: true,
      telegram: false,
    },
  ] as Chat[],

  currentChat: {
    name: 'Ніна Нінченко Артемівна',
    id: 'LYF9VJ5xgU',
    phone: '+380(11)111-11-11',
    avatar: '/api/placeholder/40/40',
  } as ChatStatus,

  messages: [
    {
      id: 1,
      sender: 'Марія Іванівна',
      text: 'Доброго дня! Які дати доступні?',
      time: '15:00',
      isIncoming: true,
      status: 'read',
    },
    {
      id: 2,
      sender: 'Смолоскип Микола',
      text: 'Доброго дня! Дякуємо, що звернулися до нас. Можемо запропонувати запис на середу або четвер цього тижня. Який час вам підходить?',
      time: '15:00',
      isIncoming: false,
      status: 'read',
    },
    {
      id: 3,
      sender: 'Марія Іванівна',
      text: 'Давайте на четвер, ближче до обіду, якщо можливо',
      time: '15:00',
      isIncoming: true,
      status: 'sent',
    },
  ] as Message[],
}
