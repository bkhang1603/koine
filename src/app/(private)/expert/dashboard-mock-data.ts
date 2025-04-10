// Mock data for the expert dashboard

// Stats data
export const statsData = {
  // Course stats
  totalCourses: 24,
  activeCourses: 12,
  completedCourses: 8,
  coursesEnrollments: 876,
  courseAverageRating: 4.7,

  // Event stats
  totalEvents: 38,
  activeEvents: 5,
  completedEvents: 22,
  eventParticipants: 380,
  eventAverageRating: 4.5
}

// Mock data for course trend chart
export const courseTrendData = [
  { date: '01/08', created: 1, completed: 0 },
  { date: '08/08', created: 2, completed: 1 },
  { date: '15/08', created: 1, completed: 0 },
  { date: '22/08', created: 3, completed: 1 },
  { date: '29/08', created: 2, completed: 2 },
  { date: '05/09', created: 1, completed: 3 },
  { date: '12/09', created: 3, completed: 1 },
  { date: '19/09', created: 2, completed: 2 },
  { date: '26/09', created: 1, completed: 0 },
  { date: '03/10', created: 4, completed: 1 },
  { date: '10/10', created: 2, completed: 2 },
  { date: '17/10', created: 2, completed: 1 }
]

// Mock data for event trend chart
export const eventTrendData = [
  { date: '01/08', created: 2, completed: 1 },
  { date: '08/08', created: 3, completed: 2 },
  { date: '15/08', created: 1, completed: 3 },
  { date: '22/08', created: 2, completed: 1 },
  { date: '29/08', created: 4, completed: 2 },
  { date: '05/09', created: 5, completed: 3 },
  { date: '12/09', created: 1, completed: 4 },
  { date: '19/09', created: 2, completed: 3 },
  { date: '26/09', created: 3, completed: 2 },
  { date: '03/10', created: 2, completed: 3 },
  { date: '10/10', created: 3, completed: 2 },
  { date: '17/10', created: 1, completed: 4 }
]

// Mock data for course status chart
export const courseStatusData = [
  { status: 'Đã hoàn thành', count: 8 },
  { status: 'Đang diễn ra', count: 12 },
  { status: 'Chưa bắt đầu', count: 3 },
  { status: 'Tạm dừng', count: 1 }
]

// Mock data for event status chart
export const eventStatusData = [
  { name: 'Đã kết thúc', count: 22, percentage: 57.9 },
  { name: 'Đang diễn ra', count: 2, percentage: 5.3 },
  { name: 'Sắp diễn ra', count: 3, percentage: 7.8 },
  { name: 'Đã hủy', count: 11, percentage: 29.0 }
]

// Chart colors
export const courseStatusColors = {
  'Đã hoàn thành': '#22c55e', // Green
  'Đang diễn ra': '#3b82f6', // Blue
  'Chưa bắt đầu': '#f59e0b', // Amber
  'Tạm dừng': '#ef4444' // Red
}

export const eventStatusColors = {
  'Đã kết thúc': '#22c55e', // Green
  'Đang diễn ra': '#3b82f6', // Blue
  'Sắp diễn ra': '#f59e0b', // Amber
  'Đã hủy': '#ef4444' // Red
}
