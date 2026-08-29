export type UserRole = "ADMIN" | "CONTENT_MANAGER" | "INSTRUCTOR" | "STUDENT"
export type UserStatus = "active" | "inactive" | "suspended"

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  avatar?: string
  role: UserRole
  status: UserStatus
  bio?: string
  joinedAt: string
  lastActive?: string
}
