'use client'

import LoginModal from '@/components/auth/login-modal'
import RegisterModal from '@/components/auth/register-modal'
import { createContext, useContext, useState, ReactNode } from 'react'

interface AuthModalContextType {
  showLoginModal: () => void
  showRegisterModal: () => void
  hideLoginModal: () => void
  isLoginModalOpen: boolean
  isRegisterModalOpen: boolean
}

const AuthModalContext = createContext<AuthModalContextType | undefined>(undefined)

export function useAuthModal() {
  const context = useContext(AuthModalContext)
  if (context === undefined) {
    throw new Error('useAuthModal must be used within an AuthModalProvider')
  }
  return context
}

export function AuthModalProvider({ children }: { children: ReactNode }) {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)

  const showLoginModal = () => {
    setIsRegisterModalOpen(false)
    setIsLoginModalOpen(true)
  }

  const showRegisterModal = () => {
    setIsLoginModalOpen(false)
    setIsRegisterModalOpen(true)
  }

  const hideLoginModal = () => {
    setIsLoginModalOpen(false)
    setIsRegisterModalOpen(false)
  }

  return (
    <AuthModalContext.Provider
      value={{
        showLoginModal,
        showRegisterModal,
        hideLoginModal,
        isLoginModalOpen,
        isRegisterModalOpen
      }}
    >
      {children}
      <LoginModal
        open={isLoginModalOpen}
        onOpenChange={setIsLoginModalOpen}
        onSuccess={hideLoginModal}
        onRegisterClick={() => {
          setIsLoginModalOpen(false)
          setIsRegisterModalOpen(true)
        }}
      />

      <RegisterModal
        open={isRegisterModalOpen}
        onOpenChange={setIsRegisterModalOpen}
        onSuccess={hideLoginModal}
        onLoginClick={() => {
          setIsRegisterModalOpen(false)
          setIsLoginModalOpen(true)
        }}
      />
    </AuthModalContext.Provider>
  )
}
