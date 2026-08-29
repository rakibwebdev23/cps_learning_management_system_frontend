export interface BlogPost {
  id: number | string
  documentId?: string
  title: string
  body?: string
  cover_image_url?: string
  blog_status?: "draft" | "published"
  author?: {
    id: number | string
    username?: string
    email?: string
  }
  createdAt?: string
  updatedAt?: string
}

export interface BlogPostListResponse {
  data: BlogPost[]
  meta?: Record<string, any>
}

export interface BlogPostResponse {
  data: BlogPost
}

export interface CreateBlogPostPayload {
  data: {
    title: string
    body?: string
    cover_image_url?: string
    blog_status?: "draft" | "published"
  }
}
