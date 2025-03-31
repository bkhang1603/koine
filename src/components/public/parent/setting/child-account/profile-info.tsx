import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Award, BookOpen, Calendar, Clock, Mail, PhoneCall, User } from 'lucide-react'

interface Category {
  id: string
  name: string
}

interface Course {
  id: string
  title: string
  completionRate?: number
  categories?: Category[]
}

interface ProfileInfoProps {
  childData: {
    firstName?: string
    lastName?: string
    username?: string
    dob?: string
    gender?: string
    course?: Course[]
  }
}

export const ProfileInfo = ({ childData }: ProfileInfoProps) => {
  const courses = childData.course || []

  // Calculate stats
  const completedCourses = courses.filter((c) => (c.completionRate || 0) === 100).length
  const inProgressCourses = courses.filter((c) => (c.completionRate || 0) < 100 && (c.completionRate || 0) > 0).length

  // Get all categories from courses
  const allCategories = courses.flatMap((course) => course.categories || [])
  const uniqueCategories = Array.from(new Set(allCategories.map((cat) => cat.id))).map((id) =>
    allCategories.find((cat) => cat.id === id)
  )

  return (
    <div className='grid gap-6 grid-cols-1 md:grid-cols-3'>
      {/* Basic Information */}
      <Card className='border-none shadow-md overflow-hidden md:col-span-2'>
        <CardHeader className='bg-gradient-to-r from-blue-50 to-indigo-50 pb-2'>
          <CardTitle className='flex items-center gap-2'>
            <User className='h-5 w-5 text-primary' />
            Thông tin cá nhân
          </CardTitle>
        </CardHeader>
        <CardContent className='pt-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='space-y-6'>
              <div className='space-y-2'>
                <p className='text-sm font-medium text-gray-500 flex items-center gap-2'>
                  <User className='h-4 w-4 text-gray-400' />
                  <span>Họ tên</span>
                </p>
                <p className='font-medium text-gray-800 text-lg'>{`${childData.firstName || ''} ${childData.lastName || ''}`}</p>
              </div>

              <div className='space-y-2'>
                <p className='text-sm font-medium text-gray-500 flex items-center gap-2'>
                  <User className='h-4 w-4 text-gray-400' />
                  <span>Tên đăng nhập</span>
                </p>
                <p className='font-medium text-gray-800'>{childData.username || ''}</p>
              </div>

              <div className='space-y-2'>
                <p className='text-sm font-medium text-gray-500 flex items-center gap-2'>
                  <Mail className='h-4 w-4 text-gray-400' />
                  <span>Email</span>
                </p>
                <p className='font-medium text-gray-800'>student@example.com</p>
              </div>
            </div>

            <div className='space-y-6'>
              <div className='space-y-2'>
                <p className='text-sm font-medium text-gray-500 flex items-center gap-2'>
                  <Calendar className='h-4 w-4 text-gray-400' />
                  <span>Ngày sinh</span>
                </p>
                <p className='font-medium text-gray-800'>{childData.dob || 'Chưa cập nhật'}</p>
              </div>

              <div className='space-y-2'>
                <p className='text-sm font-medium text-gray-500 flex items-center gap-2'>
                  <User className='h-4 w-4 text-gray-400' />
                  <span>Giới tính</span>
                </p>
                <p className='font-medium text-gray-800'>{childData.gender || 'Chưa cập nhật'}</p>
              </div>

              <div className='space-y-2'>
                <p className='text-sm font-medium text-gray-500 flex items-center gap-2'>
                  <PhoneCall className='h-4 w-4 text-gray-400' />
                  <span>Số điện thoại</span>
                </p>
                <p className='font-medium text-gray-800'>Chưa cập nhật</p>
              </div>
            </div>
          </div>

          {uniqueCategories.length > 0 && (
            <div className='mt-6 pt-6 border-t border-gray-100'>
              <h4 className='text-sm font-medium text-gray-600 mb-3'>Lĩnh vực quan tâm</h4>
              <div className='flex flex-wrap gap-2'>
                {uniqueCategories
                  .filter((category): category is Category => category !== undefined)
                  .map((category) => (
                    <span key={category.id} className='px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs'>
                      {category.name}
                    </span>
                  ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Stats Card */}
      <Card className='border-none shadow-md overflow-hidden'>
        <CardHeader className='bg-gradient-to-r from-purple-50 to-pink-50 pb-2'>
          <CardTitle className='flex items-center gap-2'>
            <Award className='h-5 w-5 text-primary' />
            Thống kê học tập
          </CardTitle>
        </CardHeader>
        <CardContent className='pt-6'>
          <div className='space-y-6'>
            <div className='bg-blue-50 rounded-lg p-4 flex items-center gap-4'>
              <div className='bg-blue-100 p-3 rounded-full'>
                <BookOpen className='h-6 w-6 text-blue-600' />
              </div>
              <div>
                <p className='text-sm text-blue-700 font-medium'>Khóa học đã đăng ký</p>
                <p className='text-2xl font-bold text-blue-800'>{courses.length}</p>
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
              <div className='bg-green-50 rounded-lg p-3 flex flex-col'>
                <div className='flex items-center mb-2'>
                  <div className='bg-green-100 p-2 rounded-full mr-2'>
                    <Award className='h-4 w-4 text-green-600' />
                  </div>
                  <p className='text-xs text-green-700 font-medium'>Hoàn thành</p>
                </div>
                <p className='text-xl font-bold text-green-800 text-center my-1'>{completedCourses}</p>
                <div className='w-full bg-white rounded-full h-1.5 mt-1'>
                  <div
                    className='bg-green-500 h-1.5 rounded-full'
                    style={{ width: `${courses.length ? (completedCourses / courses.length) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>

              <div className='bg-purple-50 rounded-lg p-3 flex flex-col'>
                <div className='flex items-center mb-2'>
                  <div className='bg-purple-100 p-2 rounded-full mr-2'>
                    <Clock className='h-4 w-4 text-purple-600' />
                  </div>
                  <p className='text-xs text-purple-700 font-medium'>Đang tiến hành</p>
                </div>
                <p className='text-xl font-bold text-purple-800 text-center my-1'>{inProgressCourses}</p>
                <div className='w-full bg-white rounded-full h-1.5 mt-1'>
                  <div
                    className='bg-purple-500 h-1.5 rounded-full'
                    style={{ width: `${courses.length ? (inProgressCourses / courses.length) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {courses.length > 0 && (
              <div className='pt-4'>
                <h4 className='text-xs font-medium text-gray-500 mb-3'>Tiến độ tổng thể</h4>
                <div className='w-full h-2 bg-gray-100 rounded-full overflow-hidden'>
                  <div
                    className='h-full bg-gradient-to-r from-blue-500 to-primary rounded-full'
                    style={{
                      width: `${courses.reduce((acc, course) => acc + (course.completionRate || 0), 0) / (courses.length || 1)}%`
                    }}
                  ></div>
                </div>
                <div className='flex justify-between mt-1'>
                  <span className='text-xs text-gray-500'>0%</span>
                  <span className='text-xs text-gray-500'>100%</span>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
