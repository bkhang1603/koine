import { BookOpen, Eye, ThumbsUp, Clock, MessageSquare, Star, Plus } from 'lucide-react'
import { Course, QuizQuestion } from '../course/types'

export const dashboardStats = [
  {
    title: 'Tổng nội dung',
    value: '24',
    trend: '↑ 4 bài mới tuần này',
    icon: BookOpen,
    color: 'primary'
  },
  {
    title: 'Lượt xem',
    value: '12.5K',
    trend: '↑ 18% so với tháng trước',
    icon: Eye,
    color: 'blue'
  },
  {
    title: 'Đánh giá tích cực',
    value: '98%',
    trend: '↑ 2.4% so với tháng trước',
    icon: ThumbsUp,
    color: 'yellow'
  },
  {
    title: 'Thời gian tương tác',
    value: '45p',
    trend: '↑ 5p trung bình/người dùng',
    icon: Clock,
    color: 'green'
  }
]

export const performanceData = [
  { name: 'T2', views: 2400, engagement: 1800 },
  { name: 'T3', views: 1398, engagement: 1200 },
  { name: 'T4', views: 9800, engagement: 7600 },
  { name: 'T5', views: 3908, engagement: 2800 },
  { name: 'T6', views: 4800, engagement: 3800 },
  { name: 'T7', views: 3800, engagement: 2800 },
  { name: 'CN', views: 4300, engagement: 3300 }
]

export const featuredContent = [
  {
    title: 'Giới tính và sự phát triển cơ thể',
    type: 'Bài giảng',
    views: 1234,
    engagement: 85
  },
  {
    title: 'An toàn trên mạng xã hội',
    type: 'Blog',
    views: 856,
    engagement: 92
  },
  {
    title: 'Kỹ năng tự bảo vệ bản thân',
    type: 'Khóa học',
    views: 654,
    engagement: 78
  }
]

export const notifications = [
  {
    type: 'comment',
    title: 'Bình luận mới',
    message: 'Phụ huynh Nguyễn Văn A đã bình luận về bài viết "An toàn trên mạng"',
    time: '5 phút trước',
    icon: MessageSquare,
    color: 'text-blue-500'
  },
  {
    type: 'review',
    title: 'Đánh giá khóa học',
    message: 'Khóa học "Giới tính và sự phát triển" nhận được đánh giá 5 sao',
    time: '30 phút trước',
    icon: Star,
    color: 'text-yellow-500'
  },
  {
    type: 'alert',
    title: 'Nội dung cần duyệt',
    message: 'Có 3 bài viết mới đang chờ được duyệt',
    time: '1 giờ trước',
    icon: Clock,
    color: 'text-orange-500'
  }
]

export const tasks = [
  {
    task: 'Duyệt bình luận mới',
    deadline: 'Hôm nay',
    priority: 'Cao',
    status: 'pending'
  },
  {
    task: 'Cập nhật nội dung khóa học',
    deadline: 'Ngày mai',
    priority: 'Trung bình',
    status: 'in-progress'
  },
  {
    task: 'Trả lời phản hồi phụ huynh',
    deadline: '2 ngày nữa',
    priority: 'Thấp',
    status: 'pending'
  }
]

export const ageAnalytics = [
  { age: '6-8 tuổi', percentage: 35 },
  { age: '9-11 tuổi', percentage: 45 },
  { age: '12-14 tuổi', percentage: 20 }
]

export const parentFeedback = [
  { category: 'Nội dung phù hợp', rating: 4.8 },
  { category: 'Dễ hiểu', rating: 4.6 },
  { category: 'Tính tương tác', rating: 4.5 },
  { category: 'Hỗ trợ kịp thời', rating: 4.7 }
]

export const quickActions = [
  {
    title: 'Tạo bài viết mới',
    description: 'Chia sẻ kiến thức mới',
    icon: Plus,
    variant: 'default'
  },
  {
    title: 'Tạo khóa học',
    description: 'Xây dựng nội dung giáo dục',
    icon: BookOpen,
    variant: 'outline'
  },
  {
    title: 'Phản hồi',
    description: 'Xem bình luận mới',
    icon: MessageSquare,
    variant: 'outline'
  }
]

// Thêm categories cho khóa học
export const courseCategories = [
  {
    id: 'sex-edu',
    name: 'Giáo dục giới tính',
    description: 'Kiến thức về giới tính và sự phát triển',
    color: 'blue'
  },
  {
    id: 'safety',
    name: 'An toàn & Bảo vệ',
    description: 'Kỹ năng tự bảo vệ bản thân',
    color: 'green'
  },
  {
    id: 'social',
    name: 'Kỹ năng xã hội',
    description: 'Phát triển kỹ năng giao tiếp và ứng xử',
    color: 'purple'
  },
  {
    id: 'mental',
    name: 'Sức khỏe tinh thần',
    description: 'Phát triển cảm xúc và tâm lý',
    color: 'yellow'
  }
]

// Cập nhật lại data khóa học
export const courses: Course[] = [
  {
    id: '1',
    title: 'Toán học vui vẻ 🔢',
    description: 'Khám phá thế giới số học...',
    thumbnail: 'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-meo-ngau-42.jpg',
    banner: 'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-meo-ngau-42.jpg',
    categories: ['sex-edu'],
    level: 'Cơ bản',
    ageGroup: '9-11 tuổi',
    status: 'published',
    totalLessons: 12,
    duration: 360, // 6 giờ tính bằng phút
    durationDisplay: '6 giờ',
    creatorId: 'creator-1',
    creator: {
      id: 'creator-1',
      username: 'Teacher Anna'
    },
    chapters: [
      {
        id: 'chapter-1',
        courseId: '1',
        title: 'Chương 1: Tổng quan về cơ thể người',
        description: 'Giới thiệu các kiến thức cơ bản về cơ thể',
        duration: 45,
        durationDisplay: '45 phút',
        sequence: 1,
        creatorId: 'creator-1',
        creator: {
          id: 'creator-1',
          username: 'Teacher Anna'
        },
        lessons: [
          {
            id: 'lesson-1',
            chapterId: 'chapter-1',
            type: 'text',
            title: 'Bài 1: Cấu tạo cơ thể người',
            description: 'Tìm hiểu về cấu tạo cơ thể người',
            content: '<div class="lesson-content">...</div>',
            videoUrl: null,
            duration: 15,
            durationDisplay: '15 phút',
            sequence: 1,
            status: 'published',
            creator: {
              id: 'creator-1',
              username: 'Teacher Anna'
            }
          },
          {
            id: 'lesson-2',
            chapterId: 'chapter-1',
            type: 'video',
            title: 'Bài 2: Tìm hiểu về các cơ quan',
            description: 'Video giới thiệu về các cơ quan trong cơ thể',
            content: '<div class="lesson-content">...</div>',
            videoUrl: 'https://example.com/video1',
            duration: 10,
            durationDisplay: '10 phút',
            sequence: 2,
            status: 'published',
            creator: {
              id: 'creator-1',
              username: 'Teacher Anna'
            }
          },
          {
            id: 'lesson-3',
            chapterId: 'chapter-1',
            type: 'quiz',
            title: 'Bài 3: Kiểm tra kiến thức',
            description: 'Bài kiểm tra kiến thức về cơ thể người',
            content: null,
            videoUrl: null,
            duration: 20,
            durationDisplay: '20 phút',
            sequence: 3,
            status: 'published',
            creator: {
              id: 'creator-1',
              username: 'Teacher Anna'
            }
          }
        ]
      },
      {
        id: 'chapter-2',
        courseId: '1',
        title: 'Chương 2: Các thay đổi trong giai đoạn dậy thì',
        description: 'Khám phá các thay đổi trong giai đoạn dậy thì',
        duration: 30,
        durationDisplay: '30 phút',
        sequence: 2,
        creatorId: 'creator-1',
        creator: {
          id: 'creator-1',
          username: 'Teacher Anna'
        },
        lessons: [
          {
            id: 'lesson-4',
            chapterId: 'chapter-2',
            type: 'text',
            title: 'Bài 1: Các thay đổi trong giai đoạn dậy thì',
            description: 'Tìm hiểu về các thay đổi trong giai đoạn dậy thì',
            content: 'Nội dung bài học về các thay đổi...',
            videoUrl: null,
            duration: 15,
            durationDisplay: '15 phút',
            sequence: 1,
            status: 'published',
            creator: {
              id: 'creator-1',
              username: 'Teacher Anna'
            }
          }
        ]
      }
    ]
  }
  // ... thêm 5 khóa học nữa
]

export const blogCategories = [
  {
    id: '1',
    name: 'Hướng dẫn phụ huynh',
    description: 'Hướng dẫn phụ huynh'
  },
  {
    id: '2',
    name: 'Tư vấn giáo dục',
    description: 'Tư vấn giáo dục'
  },
  {
    id: '3',
    name: 'Tin tức giáo dục',
    description: 'Tin tức giáo dục'
  }
]

// Thêm mock data cho quiz questions
export const quizQuestions: QuizQuestion[] = [
  {
    id: 'quiz-1',
    lessonId: 'lesson-3',
    question: 'Cơ thể người có bao nhiêu hệ cơ quan chính?',
    options: ['5 hệ', '7 hệ', '9 hệ', '11 hệ'],
    correctAnswer: 2,
    sequence: 1
  },
  {
    id: 'quiz-2',
    lessonId: 'lesson-3',
    question: 'Hệ tuần hoàn có chức năng gì?',
    options: [
      'Vận chuyển máu và các chất dinh dưỡng',
      'Trao đổi khí với môi trường',
      'Tiêu hóa thức ăn',
      'Điều khiển cơ thể'
    ],
    correctAnswer: 0,
    sequence: 2
  }
]

// Thêm mock data cho blog posts
export const blogPosts = [
  {
    id: '1',
    title: 'Làm sao để nói chuyện với con về giới tính?',
    description: 'Hướng dẫn chi tiết cho phụ huynh...',
    imageUrl: 'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-meo-ngau-42.jpg',
    creatorInfo: {
      id: 'creator-1',
      firstName: 'Dr. Nguyễn Văn A',
      avatarUrl: '/images/avatars/creator-1.jpg'
    },
    totalReact: 45,
    totalComment: 12,
    createdAt: '2024-03-15T00:00:00Z',
    updatedAt: '2024-03-15T12:00:00Z',
    category: ['Hướng dẫn phụ huynh', 'Tư vấn giáo dục', 'Tin tức giáo dục'],
    status: 'published'
  }
  // Thêm các bài viết khác...
]
