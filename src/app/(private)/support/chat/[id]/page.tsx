'use client'

import { use, useState, useRef, useEffect, useMemo, FormEvent, useCallback } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useToast } from '@/components/ui/use-toast'
import { Breadcrumb } from '@/components/private/common/breadcrumb'
import { Badge } from '@/components/ui/badge'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { format, isToday, isYesterday } from 'date-fns'
import { vi } from 'date-fns/locale'
import { Send, Paperclip, Loader2, X, Smile, MoreVertical, History } from 'lucide-react'
import { useRouter } from 'next/navigation'
import socket from '@/lib/socket'
import { getAccessTokenFromLocalStorage } from '@/lib/utils'
import { useAppStore } from '@/components/app-provider'
import { useGetChatMessages, useRequestJoinChatRoom, useCloseChatRoom, useGetChatRoom } from '@/queries/useChat'
import configRoute from '@/config/route'
import { motion } from 'framer-motion'

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

// ChatRoom type
interface ChatRoom {
  id: string
  name: string
  imageUrl: string | null
  isGroup: boolean
  isClose: boolean
  isDeleted: boolean
  createdAt: string
  updatedAt: string
  members: {
    id: string
    username: string
    name: string
    avatarUrl: string
    isAdmin: boolean
  }[]
  unreadCount?: number
  isPendingSupport: boolean
}

export default function SupportChatDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params)
  const chatId = params.id
  const { toast } = useToast()
  const router = useRouter()
  const user = useAppStore((state) => state.user)
  const messageEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [newMessage, setNewMessage] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isCloseChatDialogOpen, setIsCloseChatDialogOpen] = useState(false)

  // Fetch chat room details using the custom hook
  // eslint-disable-next-line no-unused-vars
  const { data: chatRoomData, isLoading: isChatRoomLoading, refetch: refetchChatRoom } = useGetChatRoom(chatId)

  const chatRoom = useMemo(() => chatRoomData as ChatRoom | undefined, [chatRoomData])

  // Request to join chat room
  const requestJoinChatMutation = useRequestJoinChatRoom({
    onSuccess: () => {
      toast({
        title: 'Tham gia phòng chat thành công',
        description: 'Bạn đã được thêm vào phòng chat hỗ trợ này',
        variant: 'success'
      })
      // Join room via socket after API request succeeds
      if (socket.connected) {
        joinRoom()
      }
    }
  })

  // Get chat messages
  const {
    data: messagesData,
    isLoading: isMessagesLoading,
    refetch: refetchMessages
  } = useGetChatMessages({
    id: chatId,
    limit: 100,
    enabled: !!chatId
  })

  // Parse messages safely with reverse chronological order for UI display
  const messages = useMemo(() => {
    if (!messagesData?.payload?.data?.messages) return []
    return (
      messagesData.payload.data.messages
        .filter((message: any) => message && message.id) // Filter out any invalid messages
        .map((message: any) => ({
          ...message,
          sender: message.sender || {
            id: 'unknown',
            username: 'unknown',
            name: 'Người dùng',
            avatarUrl: ''
          }
        }))
        // Sorting messages by date (oldest to newest)
        .sort((a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) as Message[]
    )
  }, [messagesData])

  // Socket event handlers
  const handleNewMessage = useCallback(() => {
    refetchMessages()
  }, [refetchMessages])

  function joinRoom() {
    socket.emit(
      'joinRoom',
      {
        roomId: chatId
      },
      (response: any) => {
        if (response?.statusCode === 200) {
          refetchMessages()
        }
      }
    )
  }

  // Socket connection management
  useEffect(() => {
    if (!user) return

    const token = getAccessTokenFromLocalStorage()

    function onConnect() {
      if (!isLoggedIn) {
        login()
        setIsLoggedIn(true)
      }
    }

    function login() {
      socket.emit(
        'login',
        {
          token
        },
        (response: any) => {
          if (response?.statusCode === 200) {
            joinRoom()
          }
        }
      )
    }

    if (!socket.connected) {
      socket.connect()
    } else {
      onConnect()
    }

    socket.on('newMessage', handleNewMessage)

    return () => {
      socket.off('newMessage', handleNewMessage)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isLoggedIn, chatId, handleNewMessage])

  // Request to join chat when component mounts
  useEffect(() => {
    if (chatRoom?.isPendingSupport) {
      requestJoinChatMutation.mutate(chatId)
    }
  }, [chatRoom, requestJoinChatMutation, chatId])

  // Also scroll to bottom when component loads and after messages are loaded
  useEffect(() => {
    if (messages.length > 0 && messageEndRef.current && !isChatRoomLoading) {
      // Immediate scroll on first load
      messageEndRef.current.scrollIntoView({ behavior: 'auto' })

      // Also add a delayed scroll to handle any layout shifts
      const timer = setTimeout(() => {
        messageEndRef.current?.scrollIntoView({ behavior: 'auto' })
      }, 300)

      return () => clearTimeout(timer)
    }
  }, [messages.length, isChatRoomLoading])

  // Additional effect to scroll when message data changes or loads
  useEffect(() => {
    if (messagesData && messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'auto' })
    }
  }, [messagesData])

  // Focus input when component mounts
  useEffect(() => {
    if (inputRef.current && !chatRoom?.isClose) {
      inputRef.current.focus()
    }
  }, [chatRoom])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value)
  }

  const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!newMessage.trim() || isSending || !chatId || chatRoom?.isClose) return

    setIsSending(true)

    const messageContent = newMessage.trim()
    setNewMessage('')

    socket.emit(
      'sendMessage',
      {
        roomId: chatId,
        message: messageContent
      },
      (response: any) => {
        setIsSending(false)

        if (response?.statusCode === 200) {
          refetchMessages()
        } else {
          toast({
            title: 'Lỗi gửi tin nhắn',
            description: response?.message || 'Không thể gửi tin nhắn. Vui lòng thử lại sau.',
            variant: 'destructive'
          })
          // Restore the message in case of error
          setNewMessage(messageContent)
        }
      }
    )
  }

  // Format date for message timestamp (updated to match ChatSupportButton)
  const formatMessageDate = (date: string | undefined) => {
    if (!date) return ''

    try {
      const messageDate = new Date(date)
      if (isToday(messageDate)) {
        return format(messageDate, 'HH:mm')
      } else if (isYesterday(messageDate)) {
        return `Hôm qua ${format(messageDate, 'HH:mm')}`
      } else {
        return format(messageDate, 'dd/MM/yyyy HH:mm', { locale: vi })
      }
    } catch (error) {
      return ''
    }
  }

  // Determine if we should show the date separator
  const shouldShowDateSeparator = (message: Message, index: number) => {
    if (index === 0) return true
    if (!message.createdAt || !messages[index - 1]?.createdAt) return false

    try {
      const currentDate = new Date(message.createdAt)
      const prevDate = new Date(messages[index - 1].createdAt)

      return (
        currentDate.getDate() !== prevDate.getDate() ||
        currentDate.getMonth() !== prevDate.getMonth() ||
        currentDate.getFullYear() !== prevDate.getFullYear()
      )
    } catch (error) {
      return false
    }
  }

  // Format date for the separator (enhanced to match ChatSupportButton)
  const formatDateSeparator = (date: string | undefined) => {
    if (!date) return 'Ngày không xác định'

    try {
      const messageDate = new Date(date)
      if (isToday(messageDate)) {
        return 'Hôm nay'
      } else if (isYesterday(messageDate)) {
        return 'Hôm qua'
      } else {
        return format(messageDate, 'dd MMMM yyyy', { locale: vi })
      }
    } catch (error) {
      return 'Ngày không xác định'
    }
  }

  // Group messages by sender for better UI
  const getMessageGroupClass = (message: Message, index: number) => {
    const isCurrentUser = user?.id && message.senderId === user.id
    const classes = isCurrentUser ? 'justify-end' : 'justify-start'

    if (index > 0 && messages[index - 1]?.senderId === message.senderId) {
      return `${classes} mt-1`
    }

    return `${classes} mt-3`
  }

  const isLoading = isChatRoomLoading || isMessagesLoading

  const breadcrumbItems = [
    {
      title: 'Danh sách hỗ trợ',
      href: configRoute.support.chat
    },
    {
      title: chatRoom?.name || 'Chi tiết cuộc trò chuyện'
    }
  ]

  // Close chat room mutation with navigation
  const closeChatMutation = useCloseChatRoom({
    onSuccess: () => {
      toast({
        title: 'Phòng chat đã đóng',
        description: 'Phòng chat đã được đóng thành công',
        variant: 'success'
      })

      // Navigate back to chat list
      router.push(configRoute.support.chat)
    }
  })

  // Handle close chat room
  const handleCloseChat = () => {
    if (chatRoom?.isClose) {
      toast({
        title: 'Phòng chat đã đóng',
        description: 'Phòng chat này đã được đóng trước đó',
        variant: 'default'
      })
      return
    }

    // Open dialog instead of using window.confirm
    setIsCloseChatDialogOpen(true)
  }

  const confirmCloseChat = () => {
    closeChatMutation.mutate(chatId)
  }

  return (
    <div className='container mx-auto px-4 py-6 space-y-6'>
      {/* Breadcrumb */}
      <div className='flex items-center justify-between'>
        <div className='mb-6'>
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      {/* Chat interface */}
      <Card className='border shadow-lg rounded-xl overflow-hidden'>
        {/* Chat header */}
        {chatRoom && (
          <div className='px-4 py-3 border-b flex items-center justify-between bg-white'>
            <div className='flex items-center gap-3'>
              <Avatar className='h-10 w-10 border border-gray-100'>
                <AvatarImage src={chatRoom.imageUrl || undefined} />
                <AvatarFallback className='bg-primary/10 text-primary'>
                  {(chatRoom.name || 'Hỗ trợ').charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className='flex items-center gap-2'>
                  <p className='font-medium text-gray-900'>{chatRoom.name || 'Người dùng'}</p>
                  {chatRoom.isPendingSupport && <Badge variant='destructive'>Đang chờ hỗ trợ</Badge>}
                  {chatRoom.isClose ? (
                    <Badge variant='secondary'>Đã đóng</Badge>
                  ) : (
                    <Badge variant='green'>Đang mở</Badge>
                  )}
                </div>
                <div className='flex items-center text-xs'>
                  {chatRoom.isClose ? (
                    <span className='text-gray-500'>
                      <span className='w-1.5 h-1.5 bg-gray-400 rounded-full mr-1.5 inline-block'></span>
                      Đã kết thúc hỗ trợ
                    </span>
                  ) : (
                    <span className='text-green-600'>
                      <span className='w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5 inline-block'></span>
                      Đang hoạt động
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              {!chatRoom.isClose && (
                <Button
                  variant='outline'
                  size='sm'
                  className='text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600'
                  onClick={handleCloseChat}
                  disabled={closeChatMutation.isPending}
                >
                  {closeChatMutation.isPending ? (
                    <Loader2 className='h-4 w-4 mr-2 animate-spin' />
                  ) : (
                    <X className='h-4 w-4 mr-2' />
                  )}
                  Đóng chat
                </Button>
              )}
              <Button
                variant='ghost'
                size='icon'
                onClick={() => router.push(configRoute.support.chat)}
                className='h-9 w-9 text-gray-500'
              >
                <MoreVertical size={18} />
              </Button>
            </div>
          </div>
        )}

        {/* Messages area */}
        <CardContent className='p-0 flex flex-col h-[calc(80vh-200px)]'>
          {isLoading ? (
            <div className='flex-1 flex items-center justify-center bg-gray-50/50'>
              <Loader2 className='w-8 h-8 text-primary animate-spin' />
            </div>
          ) : (
            <>
              <ScrollArea className='flex-1 bg-gray-50/50' type='auto'>
                <div className='p-4 flex flex-col min-h-[calc(80vh-280px)]'>
                  {messages.length === 0 ? (
                    <div className='flex flex-col items-center justify-center flex-1 text-center space-y-3 py-20'>
                      <div className='bg-primary/10 p-4 rounded-full'>
                        <Send className='h-8 w-8 text-primary' />
                      </div>
                      <div>
                        <p className='text-lg font-medium'>Bắt đầu cuộc trò chuyện</p>
                        <p className='text-gray-500 text-sm mt-1'>Gửi tin nhắn đầu tiên để bắt đầu cuộc trò chuyện</p>
                      </div>
                    </div>
                  ) : (
                    <div className='space-y-1 flex-1 flex flex-col justify-end'>
                      {messages.map((message, index) => {
                        const isCurrentUser = user?.id && message.senderId === user.id
                        return (
                          <div key={message.id}>
                            {/* Date separator */}
                            {shouldShowDateSeparator(message, index) && (
                              <div className='flex justify-center my-4'>
                                <div className='bg-gray-200 px-3 py-1 rounded-full text-xs text-gray-600'>
                                  {formatDateSeparator(message.createdAt)}
                                </div>
                              </div>
                            )}

                            {/* Message */}
                            <div className={`flex ${getMessageGroupClass(message, index)}`}>
                              {!isCurrentUser && (
                                <Avatar className='h-8 w-8 mr-2 flex-shrink-0 mt-1'>
                                  <AvatarImage src={message.sender?.avatarUrl} />
                                  <AvatarFallback className='bg-primary/10 text-primary'>
                                    {message.sender?.name ? message.sender.name.charAt(0) : 'U'}
                                  </AvatarFallback>
                                </Avatar>
                              )}

                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2 }}
                                className={`max-w-[75%] ${isCurrentUser ? 'ml-auto' : ''}`}
                              >
                                <div
                                  className={`px-4 py-2.5 rounded-2xl break-words ${
                                    isCurrentUser
                                      ? 'bg-primary text-white rounded-tr-none'
                                      : 'bg-white border border-gray-100 text-gray-800 rounded-tl-none shadow-sm'
                                  }`}
                                >
                                  <p className='text-sm whitespace-pre-wrap leading-relaxed'>{message.content}</p>
                                </div>
                                <div
                                  className={`text-xs mt-1 ${
                                    isCurrentUser ? 'text-right text-gray-500' : 'text-left text-gray-500'
                                  }`}
                                >
                                  {formatMessageDate(message.createdAt)}
                                  {isCurrentUser && <span className='ml-1'>{message.isRead ? '✓✓' : '✓'}</span>}
                                </div>
                              </motion.div>
                            </div>
                          </div>
                        )
                      })}
                      <div ref={messageEndRef} className='h-4' />
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Message input */}
              {chatRoom?.isClose ? (
                <div className='px-4 py-6 border-t bg-white flex flex-col items-center'>
                  <div className='text-sm text-gray-500 mb-3 text-center'>
                    <History className='h-4 w-4 inline-block mr-1 mb-0.5' />
                    Cuộc hội thoại này đã kết thúc.
                  </div>
                  <Button
                    variant='outline'
                    className='w-full max-w-md'
                    onClick={() => router.push(configRoute.support.chat)}
                  >
                    Quay lại danh sách hỗ trợ
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSendMessage} className='p-3 border-t bg-white flex items-center gap-2'>
                  <Button
                    type='button'
                    variant='ghost'
                    size='icon'
                    className='h-10 w-10 text-gray-500 hover:text-primary'
                    disabled={chatRoom?.isClose}
                  >
                    <Paperclip className='h-5 w-5' />
                  </Button>

                  <div className='flex-1 relative'>
                    <Input
                      ref={inputRef}
                      type='text'
                      placeholder={chatRoom?.isClose ? 'Phòng chat đã đóng' : 'Nhập tin nhắn...'}
                      value={newMessage}
                      onChange={handleInputChange}
                      className='flex-1 bg-gray-50/80 border-gray-200 pr-10'
                      disabled={chatRoom?.isClose || isSending}
                    />
                    <Button
                      type='button'
                      variant='ghost'
                      size='icon'
                      className='h-8 w-8 absolute right-1 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary'
                      disabled={chatRoom?.isClose}
                    >
                      <Smile className='h-5 w-5' />
                    </Button>
                  </div>

                  <Button
                    type='submit'
                    size='icon'
                    className='h-10 w-10 rounded-full p-0 flex items-center justify-center'
                    disabled={!newMessage.trim() || isSending || chatRoom?.isClose}
                  >
                    {isSending ? <Loader2 className='h-5 w-5 animate-spin' /> : <Send className='h-5 w-5' />}
                  </Button>
                </form>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Close Chat Dialog */}
      <AlertDialog open={isCloseChatDialogOpen} onOpenChange={setIsCloseChatDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Đóng phòng chat</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn đóng phòng chat này? Sau khi đóng, người dùng sẽ không thể gửi tin nhắn mới.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmCloseChat}
              className='bg-red-500 hover:bg-red-600'
              disabled={closeChatMutation.isPending}
            >
              {closeChatMutation.isPending ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Đang đóng...
                </>
              ) : (
                <>
                  <X className='mr-2 h-4 w-4' />
                  Đóng phòng chat
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
