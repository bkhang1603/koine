declare module 'sonner' {
  export const Toaster: React.FC<any>
  export const toast: {
    (options: any): void
    success: (options: any) => void
    error: (options: any) => void
    info: (options: any) => void
    warning: (options: any) => void
    promise: (promise: Promise<any>, options: any) => Promise<any>
  }
}
