import { useAppStore } from '@/components/app-provider'
import { handleErrorApi } from '@/lib/utils'
import { useLogoutMutation } from '@/queries/useAuth'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

const UNAUTHENTICATED_PATH = ['/login', '/logout', '/refresh-token']
export default function ListenLogoutSocket() {
  const pathname = usePathname()
  const router = useRouter()
  const { isPending, mutateAsync } = useLogoutMutation()
  const setRole = useAppStore((state: any) => state.setRole)
  const disconnectSocket = useAppStore((state: any) => state.disconnectSocket)
  const socket = useAppStore((state: any) => state.socket)
  useEffect(() => {
    if (UNAUTHENTICATED_PATH.includes(pathname)) return
    async function onLogout() {
      if (isPending) return
      try {
        await mutateAsync()
        setRole()
        disconnectSocket()
        router.push('/')
      } catch (error: any) {
        handleErrorApi({
          error
        })
      }
    }
    socket?.on('logout', onLogout)
    return () => {
      socket?.off('logout', onLogout)
    }
  }, [socket, pathname, setRole, router, isPending, mutateAsync, disconnectSocket])
  return null
}
