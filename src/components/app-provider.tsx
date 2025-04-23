/* eslint-disable no-unused-vars */
'use client'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'
import {
  decodeToken,
  getAccessTokenFromLocalStorage,
  removeTokensFromLocalStorage,
  setCheckoutDataToLocalStorage,
  getCheckoutDataFromLocalStorage,
  removeCheckoutDataFromLocalStorage,
  getCheckoutBuyNowFromLocalStorage,
  setCheckoutBuyNowToLocalStorage,
  removeCheckoutBuyNowFromLocalStorage,
  setOrderIdToLocalStorage,
  removeOrderIdFromLocalStorage,
  getOrderIdFromLocalStorage
} from '@/lib/utils'
import { RoleType } from '@/types/jwt.types'
import type { Socket } from 'socket.io-client'
import { create } from 'zustand'
import RefreshToken from '@/components/refresh-token'
import { AccountOneAddressResType, AccountResType, ProfileChildResType } from '@/schemaValidations/account.schema'
import { CartDetailResType } from '@/schemaValidations/cart-detail.schema'
import { OrderBuyNowResType } from '@/schemaValidations/order.schema'
import { AuthModalProvider } from './auth/auth-modal-provider'

// Default
// staleTime: 0
// gc: 5 phút (5 * 1000* 60)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})
// const AppContext = createContext({
//   isAuth: false,
//   role: undefined as RoleType | undefined,
//   setRole: (role?: RoleType | undefined) => {},
//   socket: undefined as Socket | undefined,
//   setSocket: (socket?: Socket | undefined) => {},
//   disconnectSocket: () => {}
// })

type CustomCourse = {
  chapters: Array<{
    id: string
    title?: string
    lessons: any[]
    [key: string]: any
  }>
}

type AppStoreType = {
  isAuth: boolean
  role: RoleType | undefined
  setRole: (role?: RoleType | undefined) => void
  socket: Socket | undefined
  setSocket: (socket?: Socket | undefined) => void
  disconnectSocket: () => void
  avatar: string | undefined
  setAvatar: (avatar?: string | undefined) => void
  username: string | undefined
  setUsername: (username?: string | undefined) => void
  user: AccountResType['data'] | undefined
  setUser: (user?: AccountResType['data'] | undefined) => void
  checkoutData: CartDetailResType['data'] | undefined
  setCheckoutData: (data?: CartDetailResType['data'] | undefined) => void
  pickAddress: AccountOneAddressResType['data'] | undefined
  setPickAddress: (address?: AccountOneAddressResType['data'] | undefined) => void
  checkoutBuyNow: OrderBuyNowResType['data'] | undefined
  setCheckoutBuyNow: (data?: OrderBuyNowResType['data'] | undefined) => void
  customCourse: CustomCourse
  setCustomCourse: (customCourse: CustomCourse) => void
  orderId: string | undefined
  setOrderId: (orderId: string | undefined) => void
  childProfile: ProfileChildResType['data'] | undefined
  setChildProfile: (childProfile?: ProfileChildResType['data'] | undefined) => void
}

export const useAppStore = create<AppStoreType>((set) => ({
  isAuth: false,
  role: undefined as RoleType | undefined,
  setRole: (role?: RoleType | undefined) => {
    set({ role, isAuth: Boolean(role) })
    if (!role) {
      removeTokensFromLocalStorage()
    }
  },
  socket: undefined as Socket | undefined,
  setSocket: (socket?: Socket | undefined) => set({ socket }),
  disconnectSocket: () =>
    set((state) => {
      state.socket?.disconnect()
      return { socket: undefined }
    }),
  avatar: undefined,
  setAvatar: (avatar?: string | undefined) => set({ avatar }),
  username: undefined,
  setUsername: (username?: string | undefined) => set({ username }),
  user: undefined,
  setUser: (user?: AccountResType['data'] | undefined) => set({ user }),
  checkoutData: undefined as CartDetailResType['data'] | undefined,
  setCheckoutData: async (data?: CartDetailResType['data'] | undefined) => {
    set({ checkoutData: data })

    if (data) {
      removeCheckoutDataFromLocalStorage()
      removeCheckoutBuyNowFromLocalStorage()
      setCheckoutDataToLocalStorage(data)
    } else {
      removeCheckoutDataFromLocalStorage()
      removeCheckoutBuyNowFromLocalStorage()
    }
  },
  pickAddress: undefined,
  setPickAddress: (address?: AccountOneAddressResType['data'] | undefined) => set({ pickAddress: address }),
  checkoutBuyNow: undefined,
  setCheckoutBuyNow: async (data?: OrderBuyNowResType['data'] | undefined) => {
    set({ checkoutBuyNow: data })

    if (data) {
      removeCheckoutBuyNowFromLocalStorage()
      removeCheckoutDataFromLocalStorage()
      setCheckoutBuyNowToLocalStorage(data)
    } else {
      removeCheckoutBuyNowFromLocalStorage()
      removeCheckoutDataFromLocalStorage()
    }
  },
  customCourse: { chapters: [] },
  setCustomCourse: (customCourse) => set({ customCourse }),
  orderId: undefined,
  setOrderId: (orderId: string | undefined) => {
    set({ orderId })

    if (orderId) {
      removeOrderIdFromLocalStorage()
      setOrderIdToLocalStorage(orderId)
    } else {
      removeOrderIdFromLocalStorage()
    }
  },
  childProfile: undefined,
  setChildProfile: (childProfile?: ProfileChildResType['data'] | undefined) => set({ childProfile })
}))

// export const useAppContext = () => {
//   return useContext(AppContext)
// }
export default function AppProvider({ children }: { children: React.ReactNode }) {
  const setRole = useAppStore((state) => state.setRole)
  const setCheckoutData = useAppStore((state) => state.setCheckoutData)
  const setCheckoutBuyNow = useAppStore((state) => state.setCheckoutBuyNow)
  const setOrderId = useAppStore((state) => state.setOrderId)

  // const [socket, setSocket] = useState<Socket | undefined>()
  // const [role, setRoleState] = useState<RoleType | undefined>()
  const count = useRef(0)

  useEffect(() => {
    if (count.current === 0) {
      const accessToken = getAccessTokenFromLocalStorage()

      if (accessToken) {
        const role = decodeToken(accessToken).role
        setRole(role)
      }

      const checkoutData = getCheckoutDataFromLocalStorage()
      if (checkoutData) {
        setCheckoutData(checkoutData)
      }

      const checkoutBuyNow = getCheckoutBuyNowFromLocalStorage()
      if (checkoutBuyNow) {
        setCheckoutBuyNow(checkoutBuyNow)
      }

      const orderId = getOrderIdFromLocalStorage()
      if (orderId) {
        setOrderId(orderId)
      }

      count.current++
    }
  }, [setRole, setCheckoutData, setCheckoutBuyNow, setOrderId])

  // useEffect(() => {
  //   const checkoutData = getCheckoutDataFromLocalStorage()
  //   if (checkoutData) {
  //     setCheckoutData(checkoutData)
  //   }
  // }, [setCheckoutData])

  // const disconnectSocket = useCallback(() => {
  //   socket?.disconnect()
  //   setSocket(undefined)
  // }, [socket, setSocket])

  // Các bạn nào mà dùng Next.js 15 và React 19 thì không cần dùng useCallback đoạn này cũng được
  // const setRole = useCallback((role?: RoleType | undefined) => {
  //   setRoleState(role)
  //   if (!role) {
  //     removeTokensFromLocalStorage()
  //   }
  // }, [])
  // const isAuth = Boolean(role)
  // Nếu mọi người dùng React 19 và Next.js 15 thì không cần AppContext.Provider, chỉ cần AppContext là đủ
  return (
    // <AppContext.Provider
    //   value={{ role, setRole, isAuth, socket, setSocket, disconnectSocket }}
    // >
    <QueryClientProvider client={queryClient}>
      <AuthModalProvider>
        {children}
        <RefreshToken />
        {/* <ListenLogoutSocket /> */}
      </AuthModalProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    // </AppContext.Provider>
  )
}
