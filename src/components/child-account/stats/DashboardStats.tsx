import React from 'react'
import { StatCard } from './StatCard'
import { BookOpen, Star, Activity, Clock } from 'lucide-react'

interface DashboardStatsProps {
  stats: {
    totalCourses: number
    completedCourses: number
    inProgressCourses: number
    notStartedCourses: number
    overallProgress: number
    completionPercentage: number
  }
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ stats }) => (
  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
    <StatCard icon={BookOpen} label='Tổng số khóa học' value={stats.totalCourses} color='text-gray-600' />
    <StatCard icon={Star} label='Đã hoàn thành' value={stats.completedCourses} color='text-green-600' />
    <StatCard icon={Activity} label='Đang tiến hành' value={stats.inProgressCourses} color='text-blue-600' />
    <StatCard icon={Clock} label='Tiến độ tổng thể' value={`${stats.overallProgress}%`} color='text-purple-600' />
  </div>
) 