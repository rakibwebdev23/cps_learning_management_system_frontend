// dashboard stats and chart data for all roles

export const adminStats = {
  totalUsers: 12,
  students: 7,
  instructors: 3,
  contentManagers: 1,
  courses: 10,
  totalCourses: 10,
  lessons: 16,
  totalLessons: 16,
  quizzes: 4,
  totalQuizzes: 4,
  enrollments: 8,
  totalEnrollments: 8,
  quizAttempts: 5,
  revenue: 248700,
  totalRevenue: 248700,
}

export const studentStats = {
  enrolledCourses: 2,
  inProgress: 2,
  completed: 0,
  dropped: 0,
  quizAverage: 80,
  totalLessonsCompleted: 54,
}

export const instructorStats = {
  totalCourses: 4,
  totalStudents: 286,
  totalLessons: 12,
  avgCompletion: 72,
}

export const contentManagerStats = {
  courses: 10,
  totalCourses: 10,
  lessons: 16,
  totalLessons: 16,
  quizzes: 4,
  totalQuizzes: 4,
  blogs: 8,
  totalBlogs: 8,
  draftContent: 2,
  publishedContent: 14,
}

// enrollment growth chart (monthly)
export const enrollmentGrowth = [
  { month: "Jan", enrollments: 42 },
  { month: "Feb", enrollments: 58 },
  { month: "Mar", enrollments: 75 },
  { month: "Apr", enrollments: 91 },
  { month: "May", enrollments: 118 },
  { month: "Jun", enrollments: 142 },
  { month: "Jul", enrollments: 178 },
  { month: "Aug", enrollments: 205 },
]

// student progress chart
export const studentProgressData = [
  { course: "Next.js", completed: 65, total: 100 },
  { course: "Python DS", completed: 30, total: 100 },
  { course: "React Native", completed: 50, total: 100 },
  { course: "AWS", completed: 78, total: 100 },
  { course: "Figma", completed: 88, total: 100 },
]

// quiz performance chart
export const quizPerformanceData = [
  { quiz: "Next.js Quiz", avgScore: 82, passRate: 78 },
  { quiz: "Python Quiz", avgScore: 71, passRate: 65 },
  { quiz: "React Native", avgScore: 76, passRate: 72 },
  { quiz: "AWS Quiz", avgScore: 85, passRate: 81 },
]

// course completion chart
export const courseCompletionData = [
  { name: "Completed", value: 28, color: "#10B981" },
  { name: "In Progress", value: 54, color: "#0075FD" },
  { name: "Not Started", value: 18, color: "#CBD5E1" },
]

// user distribution chart
export const userDistributionData = [
  { name: "Students", value: 7, color: "#0075FD" },
  { name: "Instructors", value: 3, color: "#0052B4" },
  { name: "Content Managers", value: 1, color: "#10B981" },
  { name: "Admins", value: 1, color: "#0F172A" },
]

// student learning activity (weekly)
export const learningActivityData = [
  { day: "Mon", minutes: 45 },
  { day: "Tue", minutes: 90 },
  { day: "Wed", minutes: 30 },
  { day: "Thu", minutes: 120 },
  { day: "Fri", minutes: 60 },
  { day: "Sat", minutes: 150 },
  { day: "Sun", minutes: 20 },
]

// instructor course performance
export const coursePerformanceData = [
  { course: "Next.js Bootcamp", students: 3450, revenue: 148200, rating: 4.8, completion: 71 },
  { course: "UI/UX with Figma", students: 1870, revenue: 74800, rating: 4.6, completion: 68 },
  { course: "Cybersecurity", students: 2780, revenue: 152900, rating: 4.9, completion: 74 },
  { course: "React Native", students: 2210, revenue: 99450, rating: 4.7, completion: 65 },
]
