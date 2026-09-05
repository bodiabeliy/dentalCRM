import { Box } from '@mui/material'
import { useState } from 'react'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { SidebarLayout } from '../shared'
import { chatModel } from '../entities/chat'
import { CreateChatModal, CloseChatModal, ChatMessageInput } from '../features/chat'
import { ChatList, ChatHeader, ChatMessages } from '../widgets/chat'

export function ChatPage() {
  const [isCreateChatModalOpen, setIsCreateChatModalOpen] = useState(false)
  const [isCloseChatModalOpen, setIsCloseChatModalOpen] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <>
      <SidebarLayout rightSidebar={<></>}>
        <Box sx={{ display: 'flex', height: '100vh', bgcolor: 'white' }}>
          <ChatList
            chats={chatModel.mockChats}
            onChatSelect={(chat: any) => {
              console.log('Selected chat:', chat)
            }}
          />
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <ChatHeader
              currentChat={chatModel.currentChat}
              onCreateChat={() => setIsCreateChatModalOpen(true)}
              onCloseChat={() => setIsCloseChatModalOpen(true)}
            />
            <ChatMessages messages={chatModel.messages} />
            <ChatMessageInput
              onSend={(message: string) => {
                console.log('Sending message:', message)
              }}
            />
          </Box>
        </Box>
      </SidebarLayout>
      <CreateChatModal
        open={isCreateChatModalOpen}
        onClose={() => setIsCreateChatModalOpen(false)}
        isMobile={isMobile}
      />
      <CloseChatModal open={isCloseChatModalOpen} onClose={() => setIsCloseChatModalOpen(false)} isMobile={isMobile} />
    </>
  )
}
