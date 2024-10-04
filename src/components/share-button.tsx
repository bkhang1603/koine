'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Link, Share2, Facebook, Twitter, Instagram } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'

export default function ShareButton() {
  const [isOpen, setIsOpen] = useState(false)

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const shareToTwitter = () => {
    const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const shareToInstagram = () => {
    const url = `https://www.instagram.com/`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const copyLink = () => {
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        toast({
          title: 'Link đã được sao chép!',
          description: 'Bạn có thể dán link vào bất kỳ đâu bạn muốn.'
        })
      })
      .catch(() => {
        toast({
          title: 'Không thể sao chép link',
          description: 'Có lỗi xảy ra khi sao chép link.',
          variant: 'destructive'
        })
      })
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant={'ghost'}
          className='w-full flex items-center justify-center gap-2 text-third hover:text-third hover:bg-third/5 focus-visible:ring-0'
        >
          <Share2 className='w-5 h-5' />
          <span>Chia sẻ</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='start'>
        <DropdownMenuItem onClick={shareToInstagram} className='flex items-center justify-start gap-3 text-gray-500'>
          <Instagram className='w-5 h-5' />
          <p className='font-medium'>Instagram</p>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={shareToFacebook} className='flex items-center justify-start gap-3 text-gray-500'>
          <Facebook className='w-5 h-5' />
          <p className='font-medium'>Facebook</p>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={shareToTwitter} className='flex items-center justify-start gap-3 text-gray-500'>
          <Twitter className='w-5 h-5' />
          <p className='font-medium'>Twitter</p>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={copyLink} className='flex items-center justify-start gap-3 text-gray-500'>
          <Link className='w-5 h-5' />
          <p className='font-medium'>Sao chép link</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
