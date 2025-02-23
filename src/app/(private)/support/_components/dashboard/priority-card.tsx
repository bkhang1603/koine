import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'

interface PriorityCardProps {
  title: string
  value: number | string
  icon: React.ReactNode
  color: 'primary' | 'destructive' | 'yellow'
  children: React.ReactNode
  action: {
    label: string
    href: string
  }
}

export function PriorityCard({ title, value, icon, color, children, action }: PriorityCardProps) {
  const colorStyles = {
    primary: {
      border: 'border-primary',
      bg: 'bg-primary',
      text: 'text-primary',
      iconBg: 'bg-primary/10'
    },
    destructive: {
      border: 'border-destructive',
      bg: 'bg-destructive',
      text: 'text-destructive',
      iconBg: 'bg-destructive/10'
    },
    yellow: {
      border: '',
      bg: 'bg-yellow-500',
      text: 'text-yellow-600',
      iconBg: 'bg-yellow-50'
    }
  }

  const styles = colorStyles[color]

  return (
    <Card className={`relative overflow-hidden ${styles.border}`}>
      <div className={`absolute top-0 left-0 w-full h-1 ${styles.bg}`} />
      <CardContent className='pt-6'>
        <div className='flex justify-between items-start'>
          <div>
            <p className={`text-sm font-medium ${styles.text}`}>{title}</p>
            <p className='text-3xl font-bold mt-2'>{value}</p>
          </div>
          <div className={`p-3 ${styles.iconBg} rounded-full`}>{icon}</div>
        </div>
        {children}
        <Button className='w-full mt-4' variant={color === 'destructive' ? 'destructive' : 'default'} asChild>
          <Link href={action.href}>{action.label}</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
