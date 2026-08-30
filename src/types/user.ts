export type UserRole = "ADMIN" | "CONTENT_MANAGER" | "INSTRUCTOR" | "STUDENT"
export type UserStatus = "active" | "inactive" | "suspended"

export interface User {
  id: string | number
  documentId?: string
  name?: string
  username?: string
  email: string
  phone?: string
  avatar?: string
  role?: any
  status?: string
  bio?: string
  joinedAt?: string
  lastActive?: string
}
