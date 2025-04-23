// Mock data for the content creator dashboard

// Stats data
export const statsData = {
  // Course stats
  totalCourses: 18,
  activeCourses: 9,
  pendingReviewCourses: 4,
  pendingPricingCourses: 3,
  rejectedCourses: 2,
  totalCourseEnrollments: 845,
  totalCourseViews: 3250,
  averageCourseRating: 4.7
}

// Mock data for content trend chart - enrollments data
export const contentTrendData = [
  {
    date: '01/03',
    enrollments: 125
  },
  {
    date: '08/03',
    enrollments: 143
  },
  {
    date: '15/03',
    enrollments: 157
  },
  {
    date: '22/03',
    enrollments: 184
  },
  {
    date: '29/03',
    enrollments: 196
  },
  {
    date: '05/04',
    enrollments: 212
  },
  {
    date: '12/04',
    enrollments: 240
  },
  {
    date: '19/04',
    enrollments: 265
  },
  {
    date: '26/04',
    enrollments: 283
  },
  {
    date: '03/05',
    enrollments: 310
  },
  {
    date: '10/05',
    enrollments: 325
  },
  {
    date: '17/05',
    enrollments: 348
  }
]

// Mock data for course status
export const contentStatusData = {
  course: [
    { status: 'ACTIVE', count: 9 },
    { status: 'PENDINGREVIEW', count: 4 },
    { status: 'PENDINGPRICING', count: 3 },
    { status: 'REJECTED', count: 2 }
  ]
}

// Mock data for content by age group
export const ageGroupData = [
  { group: '6-8 tuổi', percentage: 25, count: 13 },
  { group: '9-11 tuổi', percentage: 45, count: 24 },
  { group: '12-14 tuổi', percentage: 30, count: 16 }
]

// Mock data for popular courses
export const popularContentData = [
  {
    id: '1',
    title: 'Kỹ năng tự bảo vệ bản thân',
    engagement: 85
  },
  {
    id: '3',
    title: 'Giới tính và sự phát triển',
    engagement: 78
  },
  {
    id: '5',
    title: 'Kỹ năng giao tiếp cơ bản',
    engagement: 80
  },
  {
    id: '7',
    title: 'Kỹ năng giao tiếp cơ bản',
    engagement: 80
  },
  {
    id: '9',
    title: 'Kỹ năng giao tiếp cơ bản',
    engagement: 80
  }
]
