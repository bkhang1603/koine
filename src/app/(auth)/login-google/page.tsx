'use client'

import icons from '@/assets/icons'
import { useAppStore } from '@/components/app-provider'
import { checkAndSetTokenToCookieByLoginGoogle } from '@/lib/utils'
import { RoleType } from '@/types/jwt.types'
import { jwtDecode } from 'jwt-decode'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

function LoginGoogle() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const refreshTokenFromUrl = searchParams.get('refreshToken')
  const accessTokenFromUrl = searchParams.get('accessToken')
  const setRole = useAppStore((state) => state.setRole)

  useEffect(() => {
    if (refreshTokenFromUrl && accessTokenFromUrl) {
      const decode = jwtDecode(accessTokenFromUrl) as { role: RoleType }

      checkAndSetTokenToCookieByLoginGoogle({
        refreshToken: refreshTokenFromUrl,
        accessToken: accessTokenFromUrl,
        onSuccess: () => {
          setRole(decode.role)

          router.push('/')
        }
      })
    } else {
      router.push('/')
    }
  }, [router, refreshTokenFromUrl, accessTokenFromUrl, setRole])

  return (
    <section className='w-screen h-screen flex justify-center items-center'>
      <Image src={icons.loadingLogo} alt='Koine' width={200} height={200} className='animate-spin' />
    </section>
  )
}

export default LoginGoogle
