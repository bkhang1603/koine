'use client'

import { useState, useRef, useEffect, useMemo, FormEvent, useCallback } from 'react'
import { format, isToday, isYesterday } from 'date-fns'
import { vi } from 'date-fns/locale'
import { Send, Loader2, Search, CheckCheck, History, UserPlus, MoreVertical, MessageSquare, LogOut } from 'lucide-react'
import { useAppStore } from '@/components/app-provider'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useGetSupporterChatRoomList, useGetChatMessages, useRequestJoinChatRoom } from '@/queries/useChat'
import { getAccessTokenFromLocalStorage } from '@/lib/utils'
import socket from '@/lib/socket'
import { ChatMessageDataType } from '@/schemaValidations/chat.schema'
import { Skeleton } from '@/components/ui/skeleton'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

// Type alias for a single message element
type ChatMessageElement = ChatMessageDataType['messages'][number]

// Extended type to add fields we need for UI display
interface ExtendedChatMessage extends ChatMessageElement {
  isRead?: boolean
  createdAt?: string
  isSystem?: boolean
}

function SupportChat() {
  const user = useAppStore((state) => state.user)
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null)
  const [newMessage, setNewMessage] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeTab, setActiveTab] = useState('all')
  const [isCloseDialogOpen, setIsCloseDialogOpen] = useState(false)
  const [roomToClose, setRoomToClose] = useState<string | null>(null)
  const messageEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Get chat rooms list for supporter
  const {
    data: roomsData,
    isLoading: isRoomsLoading,
    refetch: refetchRooms
  } = useGetSupporterChatRoomList({
    page_index: 1,
    page_size: 50
  })

  // Get messages for selected room
  const {
    data: messagesData,
    isLoading: isMessagesLoading,
    refetch: refetchMessages
  } = useGetChatMessages({
    id: selectedRoomId || '',
    limit: 100,
    enabled: !!selectedRoomId
  })

  // Mutations
  const requestJoinChatMutation = useRequestJoinChatRoom({
    onSuccess: () => {
      refetchRooms()
    }
  })

  // Parse chat rooms data safely
  const chatRooms = useMemo(() => {
    if (!roomsData?.payload?.data) return []
    return roomsData.payload.data
  }, [roomsData?.payload?.data])

  // Filter rooms based on search and tab
  const filteredRooms = useMemo(() => {
    let filtered = chatRooms

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter((room) => room.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    // Apply tab filter
    if (activeTab === 'active') {
      filtered = filtered.filter((room) => !room.isClose)
    } else if (activeTab === 'closed') {
      filtered = filtered.filter((room) => room.isClose)
    }

    return filtered
  }, [chatRooms, searchQuery, activeTab])

  // Get selected room
  const selectedRoom = useMemo(() => {
    return chatRooms.find((room) => room.id === selectedRoomId) || null
  }, [chatRooms, selectedRoomId])

  // Parse messages safely
  const messages = useMemo(() => {
    if (!messagesData?.payload?.data?.messages) return []

    return messagesData.payload.data.messages
      .map((msg: any) => {
        if (!msg) return null

        return {
          id: msg.id || '',
          content: msg.content || '',
          senderId: msg.senderId || null,
          roomId: msg.roomId || '',
          sender: msg.sender
            ? {
                id: msg.sender?.id || '',
                username: msg.sender?.username || '',
                createdAt: msg.sender?.createdAt || new Date().toISOString(),
                userDetail: {
                  firstName: msg.sender?.userDetail?.firstName || '',
                  lastName: msg.sender?.userDetail?.lastName || '',
                  avatarUrl: msg.sender?.userDetail?.avatarUrl || ''
                }
              }
            : null,
          isRead: msg.isRead || false,
          createdAt: msg.createdAt || msg.sender?.createdAt || new Date().toISOString(),
          isSystem: !msg.senderId || !msg.sender
        }
      })
      .filter(Boolean) as ExtendedChatMessage[]
  }, [messagesData])

  // Socket event handlers
  const handleNewMessage = useCallback(() => {
    if (selectedRoomId) {
      refetchMessages()
    }
    refetchRooms() // Refresh room list to update latest messages and unread counts
  }, [selectedRoomId, refetchMessages, refetchRooms])

  // Socket connection management
  useEffect(() => {
    if (!user) return

    function onConnect() {
      if (!isLoggedIn) {
        login()
        setIsLoggedIn(true)
      }
    }

    function login() {
      const token = getAccessTokenFromLocalStorage()
      socket.emit('login', { token }, (response: any) => {
        if (response?.statusCode === 200) {
          if (selectedRoomId) {
            joinRoom()
          }
        }
      })
    }

    function joinRoom() {
      if (selectedRoomId) {
        socket.emit('joinRoom', { roomId: selectedRoomId }, (response: any) => {
          if (response?.statusCode === 200) {
            refetchMessages()
          }
        })
      }
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
  }, [user, isLoggedIn, selectedRoomId, handleNewMessage, refetchMessages])

  // Scroll to bottom when new messages come in or room changes
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, selectedRoomId])

  // Focus input when room changes
  useEffect(() => {
    if (inputRef.current && selectedRoom && !selectedRoom.isClose) {
      inputRef.current.focus()
    }
  }, [selectedRoomId, selectedRoom])

  // Handle sending message
  const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!newMessage.trim() || !selectedRoomId || isSending || (selectedRoom?.isClose ?? false)) return

    setIsSending(true)

    const messageContent = newMessage.trim()
    setNewMessage('')

    socket.emit(
      'sendMessage',
      {
        roomId: selectedRoomId,
        message: messageContent
      },
      (response: any) => {
        setIsSending(false)

        if (response?.statusCode === 200) {
          refetchMessages()
          refetchRooms() // Update latest message in room list
        }
      }
    )
  }

  // Handle join chat room
  const handleJoinChat = (roomId: string) => {
    requestJoinChatMutation.mutate(roomId)
  }

  // Handle close chat room
  const handleCloseChat = (roomId: string) => {
    setRoomToClose(roomId)
    setIsCloseDialogOpen(true)
  }

  // Confirm and close chat
  const confirmCloseChat = async () => {
    if (!roomToClose) return

    setIsCloseDialogOpen(false)

    // Using socket to close the room instead of API call
    socket.emit('closeRoom', { roomId: roomToClose }, (response: any) => {
      if (response?.statusCode === 200) {
        refetchRooms()
        setRoomToClose(null)
      }
    })
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

  // Format date for chat list
  const formatChatDate = (date: string) => {
    const messageDate = new Date(date)
    if (isToday(messageDate)) {
      return format(messageDate, 'HH:mm')
    } else if (isYesterday(messageDate)) {
      return `Hôm qua`
    } else {
      return format(messageDate, 'dd/MM')
    }
  }

  // Determine if we should show the date separator
  const shouldShowDateSeparator = (message: ExtendedChatMessage, index: number) => {
    if (index === 0) return true

    // Safely access previous message
    const prevMessage = messages[index - 1]
    if (!prevMessage || !message) return false

    const currentDate = new Date(message.createdAt || message.sender?.createdAt || new Date())
    const prevDate = new Date(prevMessage.createdAt || prevMessage.sender?.createdAt || new Date())

    return (
      currentDate.getDate() !== prevDate.getDate() ||
      currentDate.getMonth() !== prevDate.getMonth() ||
      currentDate.getFullYear() !== prevDate.getFullYear()
    )
  }

  // Group messages by sender for better UI
  const getMessageGroupClass = (message: ExtendedChatMessage, index: number) => {
    if (!message) return 'justify-start mt-3'

    // Center system messages
    if (message.isSystem) {
      return 'justify-center mt-3'
    }

    if (!user) return 'justify-start mt-3'

    const isUser = message.senderId === user.id
    const classes = isUser ? 'justify-end' : 'justify-start'

    if (
      index > 0 &&
      messages[index - 1]?.senderId === message.senderId &&
      !message.isSystem &&
      !messages[index - 1]?.isSystem
    ) {
      return `${classes} mt-1`
    }

    return `${classes} mt-3`
  }

  if (!user) {
    return (
      <div className='flex h-[calc(100vh-64px)]'>
        {/* Skeleton for Chat List Sidebar */}
        <div className='w-80 border-r border-t border-b border-l flex flex-col bg-gray-50/50'>
          <div className='p-4 border-b'>
            <Skeleton className='h-5 w-40 mb-3' />
            <Skeleton className='h-9 w-full rounded-md' />
          </div>

          <div className='px-2 pt-2'>
            <Skeleton className='h-10 w-full rounded-md' />
          </div>

          <div className='p-3 mt-2 border-t pt-2'>
            <div className='flex items-start gap-3'>
              <Skeleton className='h-12 w-12 rounded-full flex-shrink-0' />
              <div className='flex-1'>
                <div className='flex justify-between'>
                  <Skeleton className='h-4 w-24 mb-2' />
                  <Skeleton className='h-3 w-8' />
                </div>
                <Skeleton className='h-4 w-20 mb-2' />
                <Skeleton className='h-3 w-full' />
              </div>
            </div>
          </div>

          <div className='p-3 border-t border-gray-100'>
            <div className='flex items-start gap-3'>
              <Skeleton className='h-12 w-12 rounded-full flex-shrink-0' />
              <div className='flex-1'>
                <div className='flex justify-between'>
                  <Skeleton className='h-4 w-32 mb-2' />
                  <Skeleton className='h-3 w-8' />
                </div>
                <Skeleton className='h-4 w-16 mb-2' />
                <Skeleton className='h-3 w-full' />
              </div>
            </div>
          </div>
        </div>

        {/* Skeleton for Chat Area */}
        <div className='flex-1 flex flex-col items-center justify-center bg-gray-50/30 border-t border-b border-r'>
          <Skeleton className='h-16 w-16 rounded-full mb-4' />
          <Skeleton className='h-5 w-64 mb-2' />
          <Skeleton className='h-4 w-80' />
        </div>
      </div>
    )
  }

  return (
    <div className='flex h-[calc(100vh-64px)]'>
      {/* Chat List Sidebar */}
      <div className='w-80 border-r flex flex-col bg-gray-50/50 border-t border-b border-l'>
        <div className='p-4 border-b'>
          <h2 className='font-semibold mb-3'>Phòng hỗ trợ</h2>
          <div className='relative'>
            <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-500' />
            <Input
              placeholder='Tìm kiếm phòng chat...'
              className='pl-9 bg-white'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue='all' value={activeTab} onValueChange={setActiveTab} className='w-full'>
          <div className='px-2 pt-2'>
            <TabsList className='w-full'>
              <TabsTrigger value='all' className='flex-1'>
                Tất cả
              </TabsTrigger>
              <TabsTrigger value='active' className='flex-1'>
                Đang chat
              </TabsTrigger>
              <TabsTrigger value='closed' className='flex-1'>
                Đã đóng
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value={activeTab} className='mt-2 border-t pt-2'>
            <ScrollArea className='flex-1 h-[calc(100vh-180px)]'>
              {isRoomsLoading ? (
                <div className='flex justify-center items-center py-10'>
                  <Loader2 className='animate-spin h-6 w-6 text-primary' />
                </div>
              ) : filteredRooms.length === 0 ? (
                <div className='flex flex-col items-center justify-center text-center p-8 text-gray-500'>
                  <Search className='h-10 w-10 mb-3 text-gray-400' />
                  <p className='text-sm'>Không tìm thấy phòng chat nào</p>
                </div>
              ) : (
                filteredRooms.map((room) => (
                  <div
                    key={room.id}
                    className={`p-3 cursor-pointer w-full hover:bg-gray-100 transition-colors ${
                      selectedRoomId === room.id ? 'bg-primary/5 border-l-4 border-primary pl-2' : ''
                    }`}
                    onClick={() => setSelectedRoomId(room.id)}
                  >
                    <div className='flex items-start gap-3 w-full'>
                      <div className='relative flex-shrink-0'>
                        <Avatar className='h-12 w-12 border border-gray-100'>
                          <AvatarImage src={room.imageUrl || undefined} />
                          <AvatarFallback className='bg-primary/10 text-primary'>{room.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {room.unreadCount > 0 && (
                          <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'>
                            {room.unreadCount}
                          </span>
                        )}
                      </div>
                      <div className='flex-1 min-w-0 w-full overflow-hidden'>
                        <div className='flex items-center justify-between w-full'>
                          <p className='font-medium text-sm truncate max-w-[130px]'>{room.name}</p>
                          <span className='text-xs text-gray-500 ml-1 flex-shrink-0 whitespace-nowrap'>
                            {room.latestMessage && formatChatDate(room.latestMessage.createdAt)}
                          </span>
                        </div>
                        <div className='flex items-center gap-1 mt-1 w-full'>
                          {room.isClose ? (
                            <Badge
                              variant='outline'
                              className='px-1.5 py-0 gap-1 text-gray-500 border-gray-200 bg-gray-50 flex-shrink-0 whitespace-nowrap'
                            >
                              <History className='h-3 w-3' />
                              <span className='text-[10px]'>Đã kết thúc</span>
                            </Badge>
                          ) : (
                            <Badge
                              variant='outline'
                              className='px-1.5 py-0 gap-1 text-green-500 border-green-200 bg-green-50 flex-shrink-0 whitespace-nowrap'
                            >
                              <CheckCheck className='h-3 w-3' />
                              <span className='text-[10px]'>Đang hỗ trợ</span>
                            </Badge>
                          )}
                        </div>
                        {room.latestMessage && (
                          <p
                            className='text-xs text-gray-500 line-clamp-1 mt-1 max-w-full'
                            title={room.latestMessage.content}
                          >
                            {room.latestMessage.content}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>

      {/* Chat Area */}
      <div className='flex-1 flex flex-col border-t border-r border-b'>
        {selectedRoom ? (
          <>
            {/* Chat Header */}
            <div className='px-4 py-3 border-b flex items-center justify-between bg-white'>
              <div className='flex items-center gap-3'>
                <Avatar className='h-10 w-10 border border-gray-100'>
                  <AvatarImage src={selectedRoom.imageUrl || undefined} />
                  <AvatarFallback className='bg-primary/10 text-primary'>{selectedRoom.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className='font-medium text-gray-900'>{selectedRoom.name}</p>
                  <div className='flex items-center text-xs'>
                    {selectedRoom.isClose ? (
                      <span className='text-gray-500 flex items-center'>
                        <History className='h-3 w-3 mr-1' />
                        Đã kết thúc
                      </span>
                    ) : (
                      <span className='text-green-500 flex items-center'>
                        <CheckCheck className='h-3 w-3 mr-1' />
                        Đang hỗ trợ
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                {!selectedRoom.isClose && (
                  <>
                    <Button
                      size='sm'
                      onClick={() => handleJoinChat(selectedRoom.id)}
                      disabled={requestJoinChatMutation.isPending}
                    >
                      {requestJoinChatMutation.isPending ? (
                        <Loader2 className='h-4 w-4 animate-spin mr-1' />
                      ) : (
                        <UserPlus className='h-4 w-4 mr-1' />
                      )}
                      Tham gia hỗ trợ
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant='ghost' size='icon' className='h-8 w-8 text-gray-500'>
                          <MoreVertical size={18} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align='end'>
                        <DropdownMenuItem
                          className='text-red-500 focus:text-red-500 cursor-pointer'
                          onClick={() => handleCloseChat(selectedRoom.id)}
                        >
                          <LogOut className='h-4 w-4 mr-2' />
                          Kết thúc cuộc trò chuyện
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </>
                )}
              </div>
            </div>

            {/* Messages Area */}
            <ScrollArea className='flex-1 p-4 bg-gray-50/50'>
              {isMessagesLoading ? (
                <div className='flex justify-center items-center py-10'>
                  <Loader2 className='animate-spin h-6 w-6 text-primary' />
                </div>
              ) : messages.length === 0 ? (
                <div className='flex flex-col items-center justify-center h-full text-center text-gray-500'>
                  <Send className='h-12 w-12 mb-3 text-gray-300' />
                  <p className='font-medium text-gray-600 mb-1'>Chưa có tin nhắn</p>
                  <p className='text-sm max-w-md'>
                    {selectedRoom.isPendingSupport
                      ? 'Hãy tham gia hỗ trợ để bắt đầu trò chuyện với khách hàng này.'
                      : selectedRoom.isClose
                        ? 'Cuộc trò chuyện này đã kết thúc.'
                        : 'Hãy gửi tin nhắn để bắt đầu cuộc trò chuyện.'}
                  </p>
                </div>
              ) : (
                messages.map((msg: ExtendedChatMessage, index: number) => (
                  <div key={msg?.id || index}>
                    {shouldShowDateSeparator(msg, index) && (
                      <div className='flex justify-center my-4'>
                        <span className='text-xs bg-gray-200 text-gray-600 px-3 py-1 rounded-full'>
                          {format(new Date(msg?.createdAt || msg?.sender?.createdAt || new Date()), 'dd MMMM yyyy', {
                            locale: vi
                          })}
                        </span>
                      </div>
                    )}
                    <div className={`flex ${getMessageGroupClass(msg, index)}`}>
                      {msg?.senderId !== user?.id && !msg?.isSystem && (
                        <Avatar className='h-8 w-8 mr-2 mt-0.5 flex-shrink-0'>
                          <AvatarImage src={selectedRoom?.imageUrl || undefined} />
                          <AvatarFallback className='bg-primary/10 text-primary'>
                            {(selectedRoom?.name || 'Hỗ trợ').charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={`max-w-[80%] px-4 py-2.5 rounded-2xl ${
                          msg?.isSystem
                            ? 'bg-gray-100 text-gray-600 mx-auto'
                            : msg?.senderId === user?.id
                              ? 'bg-primary text-white rounded-tr-none'
                              : 'bg-white border border-gray-100 text-gray-800 rounded-tl-none shadow-sm'
                        }`}
                      >
                        <p className='text-sm whitespace-pre-wrap break-words leading-relaxed'>{msg?.content}</p>
                        <div
                          className={`flex justify-end mt-1 text-[10px] ${
                            msg?.isSystem
                              ? 'text-gray-400'
                              : msg?.senderId === user?.id
                                ? 'text-white/70'
                                : 'text-gray-500'
                          }`}
                        >
                          {formatMessageDate(msg?.createdAt || msg?.sender?.createdAt || '')}
                          {msg?.senderId === user?.id && !msg?.isSystem && (
                            <span className='ml-1'>{msg?.isRead ? '✓✓' : '✓'}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
              <div ref={messageEndRef} />
            </ScrollArea>

            {/* Input Area */}
            {!selectedRoom.isClose ? (
              <form onSubmit={handleSendMessage} className='p-3 border-t bg-white flex items-center gap-2'>
                <div className='flex-1 relative'>
                  <Input
                    ref={inputRef}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder='Nhập tin nhắn...'
                    className='bg-gray-50/80 border-gray-200'
                    disabled={isSending}
                  />
                </div>
                <Button
                  type='submit'
                  disabled={!newMessage.trim() || isSending}
                  className='h-9 w-9 rounded-full p-0 flex items-center justify-center'
                >
                  {isSending ? <Loader2 className='h-4 w-4 animate-spin' /> : <Send className='h-4 w-4' />}
                </Button>
              </form>
            ) : (
              <div className='p-4 border-t bg-white flex flex-col items-center'>
                <div className='text-xs text-gray-500 text-center'>
                  <History className='h-4 w-4 inline-block mr-1 mb-0.5' />
                  Cuộc hội thoại này đã kết thúc.
                </div>
              </div>
            )}
          </>
        ) : (
          <div className='flex flex-col items-center justify-center h-full text-center text-gray-500 bg-gray-50/50'>
            <div className='w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4'>
              <MessageSquare className='h-8 w-8 text-primary' />
            </div>
            <p className='font-medium text-gray-700 mb-2'>Chọn một cuộc trò chuyện để bắt đầu</p>
            <p className='text-sm max-w-md'>Chọn một phòng chat từ danh sách bên trái để bắt đầu hỗ trợ khách hàng</p>
          </div>
        )}
      </div>

      {/* Close Chat Confirmation Dialog */}
      <Dialog open={isCloseDialogOpen} onOpenChange={setIsCloseDialogOpen}>
        <DialogContent className='sm:max-w-md'>
          <DialogHeader>
            <DialogTitle>Kết thúc cuộc trò chuyện</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn kết thúc cuộc trò chuyện này? Hành động này không thể hoàn tác.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className='sm:justify-between'>
            <Button
              type='button'
              variant='outline'
              onClick={() => {
                setIsCloseDialogOpen(false)
                setRoomToClose(null)
              }}
            >
              Hủy
            </Button>
            <Button type='button' variant='destructive' onClick={confirmCloseChat}>
              Kết thúc cuộc trò chuyện
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function page() {
  return <SupportChat />
}

export default page
