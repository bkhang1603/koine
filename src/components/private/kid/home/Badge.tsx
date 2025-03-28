type BadgeProps = {
  icon: React.ReactNode
  value: number
  label: string
  color?: string
}

export const Badge = ({ icon, value, label, color = 'bg-blue-100' }: BadgeProps) => (
  <div className='flex flex-col items-center bg-white/80 p-4 rounded-xl shadow-sm hover:shadow transition-all'>
    <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center text-white mb-2`}>{icon}</div>
    <span className='text-xl font-bold text-slate-700'>{value}</span>
    <span className='text-xs text-slate-500'>{label}</span>
  </div>
)
