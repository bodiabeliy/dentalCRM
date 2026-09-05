export interface Chat {
  id: number
  name: string
  lastMessage: string
  time: string
  unread: number
  avatar: string
  isActive: boolean
  viber: boolean
  telegram: boolean
}

export interface Message {
  id: number
  sender: string
  text: string
  time: string
  isIncoming: boolean
  status: 'read' | 'sent' | 'delivered'
}

export interface ChatStatus {
  id: string
  name: string
  phone: string
  avatar: string
}
