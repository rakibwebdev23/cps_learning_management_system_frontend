export type UserRole = "admin" | "content_manager" | "instructor" | "student"

export interface User {
  id: number | string
  documentId?: string
  username: string
  name?: string
  email: string
  user_role: UserRole
  role?: any
  avatar?: string
  blocked?: boolean
  confirmed?: boolean
  createdAt?: string
  updatedAt?: string
}

export interface AuthState {
  user: User | null
  accessToken: string | null
  refreshToken: string | null
  isAuthenticated: boolean
}

export interface LoginRequest {
  identifier?: string
  email?: string
  password: string
}

export interface LoginResponse {
  jwt: string
  message?: string
  user: User
}

export interface RegisterRequest {
  username: string
  email: string
  password: string
  user_role: UserRole
}

export interface RegisterResponse {
  jwt: string
  message?: string
  user: User
}
