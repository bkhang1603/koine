import z from 'zod'

export const ChatData = z.object({
  isDeleted: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  id: z.string(),
  name: z.string(),
  imageUrl: z.string(),
  isGroup: z.boolean()
})

export const ChatDataRes = z.object({
  data: z.array(ChatData),
  message: z.string(),
  statusCode: z.number()
})

export const ChatMessageData = z.object({
  messages: z.array(
    z.object({
      id: z.string(),
      content: z.string(),
      attachments: z.array(z.string()),
      isRead: z.boolean(),
      senderId: z.string(),
      roomId: z.string(),
      sender: z.object({
        id: z.string(),
        username: z.string(),
        name: z.string(),
        avatarUrl: z.string()
      }),
      createdAt: z.string(),
      updatedAt: z.string()
    })
  ),
  hasMore: z.boolean()
})

export const ChatMessageDataRes = z.object({
  data: ChatMessageData,
  message: z.string(),
  statusCode: z.number()
})

export const ChatForUser = z.object({
  id: z.string(),
  name: z.string(),
  isGroup: z.boolean(),
  isClose: z.boolean(),
  imageUrl: z.string(),
  isDeleted: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string()
})

export const ChatForUserRes = z.object({
  data: z.array(ChatForUser),
  message: z.string(),
  statusCode: z.number()
})

export const CreateChatForUserBody = z.object({
  message: z.string()
})

export const CreateChatForUserBodyRes = z.object({
  message: z.string(),
  statusCode: z.number()
})

export type ChatDataType = z.infer<typeof ChatData>

export type ChatDataResType = z.infer<typeof ChatDataRes>

export type ChatMessageDataType = z.infer<typeof ChatMessageData>

export type ChatMessageDataResType = z.infer<typeof ChatMessageDataRes>

export type ChatForUserType = z.infer<typeof ChatForUser>

export type ChatForUserResType = z.infer<typeof ChatForUserRes>

export type CreateChatForUserBodyType = z.infer<typeof CreateChatForUserBody>

export type CreateChatForUserBodyResType = z.infer<typeof CreateChatForUserBodyRes>
