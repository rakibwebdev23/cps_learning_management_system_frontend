export interface BlogPost {
  id: number | string
  documentId?: string
  title: string
  slug?: string
  content?: string
  excerpt?: string
  body?: string
  authorName?: string
  thumbnail_url?: string
  featuredImage?: string
  category?: string
  cover_image_url?: string
  status?: string
  blog_status?: "draft" | "published"
  author?: {
    id: number | string
    name?: string
    username?: string
    email?: string
    documentId?: string
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
    content?: string
    excerpt?: string
    cover_image_url?: string
    blog_status?: "draft" | "published"
  }
}
