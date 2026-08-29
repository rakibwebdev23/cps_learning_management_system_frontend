export type BlogStatus = "draft" | "published" | "archived"

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  featuredImage: string
  category: string
  tags: string[]
  authorId: string
  authorName: string
  authorAvatar?: string
  status: BlogStatus
  viewCount: number
  createdAt: string
  updatedAt: string
  publishedAt?: string
}
