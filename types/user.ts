export interface User {
  id: number
  first_name: string
  last_name: string
  email: string
  role: string
  adminType?: string
  profile_image?: string
  enrolledCourseIDs: { [key: number]:boolean}
  completedTopics: { [key: number]:boolean}
  completedModules: { [key: number]:boolean}
  completedPrograms: { [key: number]:boolean}
  completedResources: { [key: number]:boolean}
  completedQuizzes: { [key: number]:number}
  attemptedQuizzes: { [key: number]: {start:Date, score:number} }
}