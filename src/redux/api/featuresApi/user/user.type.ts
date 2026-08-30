export interface User {
  id: number | string
  documentId?: string
  username: string
  name?: string
  email: string
  password?: string
  provider?: string
  confirmed?: boolean
  blocked?: boolean
  data?: any
  createdAt?: string
  updatedAt?: string
  role?: {
    id: number | string
    name: string
    description: string
    type: string
  }
}

export interface UserListResponse {
  data: User[]
  meta?: Record<string, any>
}
