// Mock data for the expert dashboard

// Stats data
export const statsData = {
  // Course stats
  totalCourses: 24,
  activeCourses: 12,
  coursesEnrollments: 876,
  courseAverageRating: 4.7,

  // Event stats
  totalEvents: 38,
  activeEvents: 5,
  eventParticipants: 380,
  eventAverageRating: 4.5
}

// Mock data for course trend chart
export const courseTrendData = [
  { date: '01/08', created: 2, enrolled: 8 },
  { date: '08/08', created: 1, enrolled: 12 },
  { date: '15/08', created: 3, enrolled: 5 },
  { date: '22/08', created: 2, enrolled: 10 },
  { date: '29/08', created: 4, enrolled: 15 },
  { date: '05/09', created: 3, enrolled: 20 },
  { date: '12/09', created: 1, enrolled: 6 },
  { date: '19/09', created: 3, enrolled: 18 },
  { date: '26/09', created: 4, enrolled: 22 },
  { date: '03/10', created: 2, enrolled: 14 },
  { date: '10/10', created: 5, enrolled: 30 },
  { date: '17/10', created: 3, enrolled: 25 }
]

// Mock data for event trend chart
export const eventTrendData = [
  { date: '01/08', events: 2, participants: 15 },
  { date: '08/08', events: 3, participants: 22 },
  { date: '15/08', events: 1, participants: 8 },
  { date: '22/08', events: 2, participants: 18 },
  { date: '29/08', events: 4, participants: 35 },
  { date: '05/09', events: 5, participants: 42 },
  { date: '12/09', events: 1, participants: 12 },
  { date: '19/09', events: 2, participants: 20 },
  { date: '26/09', events: 3, participants: 28 },
  { date: '03/10', events: 2, participants: 25 },
  { date: '10/10', events: 3, participants: 30 },
  { date: '17/10', events: 1, participants: 10 }
]

// Mock data for course status chart
export const courseStatusData = [
  { status: 'PENDINGREVIEW', count: 8 },
  { status: 'PENDINGPRICING', count: 4 },
  { status: 'REJECTED', count: 2 },
  { status: 'ACTIVE', count: 12 }
]

// Mock data for event status chart
export const eventStatusData = [
  { status: 'COMPLETED', count: 22 },
  { status: 'ACTIVE', count: 2 },
  { status: 'UPCOMING', count: 3 },
  { status: 'CANCELLED', count: 11 }
]
