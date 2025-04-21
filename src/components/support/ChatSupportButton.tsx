'use client'

import { useState, useRef, useEffect, useMemo, FormEvent, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Loader2, MoreVertical, Paperclip, Smile, MessageSquare, History } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { format, isToday, isYesterday } from 'date-fns'
import { vi } from 'date-fns/locale'
import { useAppStore } from '@/components/app-provider'
import { useGetChatForUser, useStartChat, useGetChatMessages } from '@/queries/useChat'
import { socketForChat } from '@/lib/socket'
import { getAccessTokenFromLocalStorage } from '@/lib/utils'

// Type for chat room
interface ChatRoom {
  id: string
  name: string
  imageUrl: string
  isGroup: boolean
  isClose: boolean
  isDeleted: boolean
  createdAt: string
  updatedAt: string
  unreadCount?: number
}

// Message type
interface Message {
  id: string
  content: string
  attachments: string[]
  isRead: boolean
  senderId: string
  roomId: string
  sender: {
    id: string
    username: string
    name: string
    avatarUrl: string
  }
  createdAt: string
  updatedAt: string
}

const ChatSupportButton = () => {
  const user = useAppStore((state) => state.user)
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [newMessage, setNewMessage] = useState('')
  const [isSending, setIsSending] = useState(false)
  const messageEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Queries
  const { data: chatData, isLoading: isChatLoading, refetch: refetchChat } = useGetChatForUser()

  const { mutateAsync: startChatMutation, isPending: isStartingChat } = useStartChat()

  // Parse chat data safely
  const chatRoom = useMemo(() => (chatData?.payload?.data || null) as ChatRoom | null, [chatData?.payload?.data])
  const isChatClosed = useMemo(() => chatRoom?.isClose || false, [chatRoom])
  const isChatEmpty = useMemo(() => chatData === null || chatData?.payload?.data === null, [chatData])
  const unreadCount = useMemo(() => chatRoom?.unreadCount || 0, [chatRoom])

  // Get chat messages using the separate hook
  const {
    data: messagesData,
    isLoading: isMessagesLoading,
    refetch: refetchMessages
  } = useGetChatMessages({
    id: chatRoom?.id || '',
    limit: 100,
    enabled: !!chatRoom?.id
  })

  // Parse messages safely
  const messages = useMemo(() => {
    if (!messagesData?.payload?.data?.messages) return []
    return messagesData.payload.data.messages as Message[]
  }, [messagesData])

  // Check viewport size
  useEffect(() => {
    const checkSize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkSize()
    window.addEventListener('resize', checkSize)
    return () => window.removeEventListener('resize', checkSize)
  }, [])

  // Scroll to bottom when new messages come in
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current && !isChatClosed && !isChatEmpty) {
      inputRef.current.focus()
    }
  }, [isOpen, isChatClosed, isChatEmpty])

  const token = getAccessTokenFromLocalStorage()

  // Socket event handlers
  const handleNewMessage = useCallback(() => {
    if (chatRoom?.id) {
      refetchMessages()
    }
  }, [chatRoom?.id, refetchMessages])

  // Socket connection management
  useEffect(() => {
    if (!user) return

    function onConnect() {
      if (!isLoggedIn) {
        login()
        setIsLoggedIn(true)
      }
    }

    function onDisconnect() {
      setIsLoggedIn(false)
    }

    function login() {
      socketForChat.emit(
        'login',
        {
          token: token
        },
        (response: any) => {
          if (response?.statusCode === 200) {
            if (chatRoom?.id) {
              joinRoom()
            }
          }
        }
      )
    }

    function joinRoom() {
      if (chatRoom?.id) {
        socketForChat.emit(
          'joinRoom',
          {
            roomId: chatRoom.id
          },
          (response: any) => {
            if (response?.statusCode === 200) {
              refetchMessages()
            }
          }
        )
      }
    }

    if (!socketForChat.connected) {
      socketForChat.connect()
    } else {
      onConnect()
    }

    socketForChat.on('connect', onConnect)
    socketForChat.on('disconnect', onDisconnect)
    socketForChat.on('newMessage', handleNewMessage)

    return () => {
      socketForChat.off('connect', onConnect)
      socketForChat.off('disconnect', onDisconnect)
      socketForChat.off('newMessage', handleNewMessage)
    }
  }, [user, token, isLoggedIn, chatRoom?.id, handleNewMessage, refetchChat, refetchMessages])

  // Join chat room when chat ID changes
  // useEffect(() => {
  //   if (!user || !chatRoom?.id || !socketForChat.connected || isChatClosed) return

  //   socketForChat.emit('joinRoom', {
  //     roomId: chatRoom.id
  //   })
  // }, [chatRoom?.id, user, isChatClosed])

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value)
  }

  const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!newMessage.trim() || !chatRoom?.id || isSending) return

    setIsSending(true)

    const messageContent = newMessage.trim()
    setNewMessage('')

    socketForChat.emit(
      'sendMessage',
      {
        roomId: chatRoom.id,
        message: messageContent
      },
      (response: any) => {
        setIsSending(false)

        if (response?.statusCode === 200) {
          refetchMessages()
        }
      }
    )
  }

  const handleStartChat = async () => {
    try {
      await startChatMutation({ message: 'Bắt đầu' })
      refetchChat()
    } catch (error) {
      console.error('Failed to start chat:', error)
    }
  }

  // Format date for message timestamp
  const formatMessageDate = (date: string) => {
    const messageDate = new Date(date)
    if (isToday(messageDate)) {
      return format(messageDate, 'HH:mm')
    } else if (isYesterday(messageDate)) {
      return `Hôm qua ${format(messageDate, 'HH:mm')}`
    } else {
      return format(messageDate, 'dd/MM/yyyy HH:mm')
    }
  }

  // Determine if we should show the date separator
  const shouldShowDateSeparator = (message: Message, index: number) => {
    if (index === 0) return true

    const currentDate = new Date(message.createdAt)
    const prevDate = new Date(messages[index - 1].createdAt)

    return (
      currentDate.getDate() !== prevDate.getDate() ||
      currentDate.getMonth() !== prevDate.getMonth() ||
      currentDate.getFullYear() !== prevDate.getFullYear()
    )
  }

  // Group messages by sender for better UI
  const getMessageGroupClass = (message: Message, index: number) => {
    const isUser = message.senderId === user?.id
    const classes = isUser ? 'justify-end' : 'justify-start'

    if (index > 0 && messages[index - 1].senderId === message.senderId) {
      return `${classes} mt-1`
    }

    return `${classes} mt-3`
  }

  if (!user) return null

  const isLoading = isChatLoading || (chatRoom?.id && isMessagesLoading)
  const hasMessages = messages.length > 0

  return (
    <div className='fixed bottom-20 right-5 z-50 mb-4'>
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className='absolute bottom-16 right-0 mb-4 z-[60]'
            style={{ width: isMobile ? '95vw' : '400px', height: isMobile ? '90vh' : '60vh' }}
          >
            <div className='bg-white rounded-2xl shadow-xl border border-gray-100 h-full flex flex-col justify-between overflow-hidden'>
              {/* Header */}
              <div className='flex items-center justify-between px-4 py-3 border-b bg-gray-50/50 h-14'>
                <div className='flex items-center gap-3'>
                  <span className='font-semibold text-gray-800'>Trung tâm hỗ trợ</span>
                </div>
                <Button variant='ghost' size='icon' onClick={toggleChat} className='h-8 w-8 text-gray-500'>
                  <X size={18} />
                </Button>
              </div>

              {/* Chat Messages */}
              <div className='h-[calc(100%-56px)] flex flex-col'>
                {isLoading ? (
                  <div className='h-full flex justify-center items-center bg-gray-50/50'>
                    <Loader2 className='h-6 w-6 animate-spin text-primary' />
                  </div>
                ) : isChatEmpty ? (
                  <div className='h-full flex flex-col justify-center items-center bg-gray-50/50 p-6'>
                    <div className='w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4'>
                      <MessageSquare className='h-7 w-7 text-primary' />
                    </div>
                    <p className='text-sm font-medium text-gray-700 mb-3'>Phòng chat hỗ trợ</p>
                    <p className='text-xs text-gray-500 text-center max-w-xs mb-6'>
                      Bạn cần hỗ trợ? Hãy bắt đầu cuộc trò chuyện với nhân viên hỗ trợ của chúng tôi.
                    </p>
                    <Button onClick={handleStartChat} disabled={isStartingChat} className='bg-primary text-white'>
                      {isStartingChat ? (
                        <>
                          <Loader2 className='h-4 w-4 animate-spin mr-2' /> Đang khởi tạo...
                        </>
                      ) : (
                        'Bắt đầu trò chuyện'
                      )}
                    </Button>
                  </div>
                ) : (
                  <div className='flex flex-col h-full justify-between'>
                    {/* Chat header */}
                    {chatRoom && (
                      <div className='px-4 py-3 border-b flex items-center justify-between bg-white'>
                        <div className='flex items-center gap-3'>
                          <Avatar className='h-10 w-10 border border-gray-100'>
                            <AvatarImage src={chatRoom.imageUrl} />
                            <AvatarFallback className='bg-primary/10 text-primary'>
                              {(chatRoom.name || 'Hỗ trợ').charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className='font-medium text-gray-900'>{chatRoom.name || 'Hỗ trợ viên'}</p>
                            <div className='flex items-center text-xs text-green-600'>
                              {isChatClosed ? (
                                <>
                                  <span className='w-1.5 h-1.5 bg-gray-400 rounded-full mr-1.5'></span>
                                  Đã kết thúc
                                </>
                              ) : (
                                <>
                                  <span className='w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5'></span>
                                  Đang hoạt động
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        <Button variant='ghost' size='icon' className='h-8 w-8 text-gray-500'>
                          <MoreVertical size={18} />
                        </Button>
                      </div>
                    )}

                    {/* Messages area */}
                    <ScrollArea className='bg-gray-50/50'>
                      <div className='p-4'>
                        {!hasMessages ? (
                          <div className='h-full flex flex-col justify-center items-center py-20'>
                            <div className='w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4'>
                              <Send className='h-7 w-7 text-primary' />
                            </div>
                            <p className='text-sm font-medium text-gray-700 mb-1'>Bắt đầu cuộc trò chuyện</p>
                            <p className='text-xs text-gray-500 text-center max-w-xs'>
                              Gửi tin nhắn đầu tiên để được hỗ trợ từ đội ngũ chăm sóc khách hàng
                            </p>
                          </div>
                        ) : (
                          messages.map((msg: Message, index: number) => (
                            <div key={msg.id || index}>
                              {shouldShowDateSeparator(msg, index) && (
                                <div className='flex justify-center my-4'>
                                  <span className='text-xs bg-gray-200 text-gray-600 px-3 py-1 rounded-full'>
                                    {format(new Date(msg.createdAt), 'dd MMMM yyyy', {
                                      locale: vi
                                    })}
                                  </span>
                                </div>
                              )}
                              <div className={`flex ${getMessageGroupClass(msg, index)}`}>
                                {msg.senderId !== user?.id && (
                                  <Avatar className='h-8 w-8 mr-2 mt-0.5 flex-shrink-0'>
                                    <AvatarImage src={chatRoom?.imageUrl} />
                                    <AvatarFallback className='bg-primary/10 text-primary'>
                                      {(chatRoom?.name || 'Hỗ trợ').charAt(0)}
                                    </AvatarFallback>
                                  </Avatar>
                                )}
                                <div
                                  className={`max-w-[80%] px-4 py-2.5 rounded-2xl ${
                                    msg.senderId === user?.id
                                      ? 'bg-primary text-white rounded-tr-none'
                                      : 'bg-white border border-gray-100 text-gray-800 rounded-tl-none shadow-sm'
                                  }`}
                                >
                                  <p className='text-sm whitespace-pre-wrap break-words leading-relaxed'>
                                    {msg.content}
                                  </p>
                                  <div
                                    className={`flex justify-end mt-1 text-[10px] ${
                                      msg.senderId === user?.id ? 'text-white/70' : 'text-gray-500'
                                    }`}
                                  >
                                    {formatMessageDate(msg.createdAt)}
                                    {msg.senderId === user?.id && (
                                      <span className='ml-1'>{msg.isRead ? '✓✓' : '✓'}</span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                        <div ref={messageEndRef} />
                      </div>
                    </ScrollArea>

                    <div>
                      {/* Input area or Start New Chat button if closed */}
                      {isChatClosed ? (
                        <div className='p-4 border-t bg-white flex flex-col items-center'>
                          <div className='text-xs text-gray-500 mb-3 text-center'>
                            <History className='h-4 w-4 inline-block mr-1 mb-0.5' />
                            Cuộc hội thoại này đã kết thúc.
                          </div>
                          <Button
                            onClick={handleStartChat}
                            disabled={isStartingChat}
                            className='bg-primary text-white w-full'
                          >
                            {isStartingChat ? (
                              <>
                                <Loader2 className='h-4 w-4 animate-spin mr-2' /> Đang khởi tạo...
                              </>
                            ) : (
                              'Bắt đầu hỗ trợ mới'
                            )}
                          </Button>
                        </div>
                      ) : (
                        <form onSubmit={handleSendMessage} className='p-3 border-t bg-white flex items-center gap-2'>
                          <Button
                            type='button'
                            variant='ghost'
                            size='icon'
                            className='h-9 w-9 text-gray-500 hover:text-primary'
                          >
                            <Paperclip size={18} />
                          </Button>

                          <div className='flex-1 relative'>
                            <Input
                              ref={inputRef}
                              value={newMessage}
                              onChange={handleInputChange}
                              placeholder='Nhập tin nhắn...'
                              className='flex-1 bg-gray-50/80 border-gray-200 pr-10'
                              disabled={isSending}
                            />
                            <Button
                              type='button'
                              variant='ghost'
                              size='icon'
                              className='h-8 w-8 absolute right-1 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary'
                            >
                              <Smile size={18} />
                            </Button>
                          </div>

                          <Button
                            type='submit'
                            disabled={!newMessage.trim() || isSending}
                            className='h-9 w-9 rounded-full p-0 flex items-center justify-center'
                          >
                            {isSending ? <Loader2 className='h-4 w-4 animate-spin' /> : <Send className='h-4 w-4' />}
                          </Button>
                        </form>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Button with Pulse Animation */}
      <div className='relative'>
        {/* Pulse animations */}
        <div className='absolute inset-0 z-0 pointer-events-none'>
          <motion.span
            className='absolute inset-0 rounded-full bg-primary/30 opacity-30'
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.15, 0.3]
            }}
            transition={{
              duration: 3,
              ease: [0.4, 0, 0.6, 1],
              repeat: Infinity,
              repeatType: 'loop'
            }}
          />
          <motion.span
            className='absolute inset-0 rounded-full bg-primary/20 opacity-20'
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.1, 0.2]
            }}
            transition={{
              duration: 3,
              ease: [0.4, 0, 0.6, 1],
              repeat: Infinity,
              repeatType: 'loop',
              delay: 1
            }}
          />
        </div>

        <motion.button
          onClick={toggleChat}
          className='relative bg-primary text-white p-3.5 rounded-full shadow-lg hover:shadow-xl transition-shadow z-10'
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className='flex items-center justify-center'
          >
            {isOpen ? <X className='w-6 h-6' /> : <MessageSquare className='w-6 h-6' />}
          </motion.div>

          {/* Unread Badge */}
          {!isOpen && unreadCount > 0 && (
            <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs font-medium rounded-full min-w-5 h-5 flex items-center justify-center px-1.5'>
              {unreadCount}
            </span>
          )}
        </motion.button>
      </div>
    </div>
  )
}

export default ChatSupportButton
