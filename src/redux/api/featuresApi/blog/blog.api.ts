import { baseApi } from "@/redux/api/baseApi/baseApi"
import { BlogPostListResponse, BlogPostResponse, CreateBlogPostPayload } from "./blog.type"

export const blogApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getBlogPosts: build.query<BlogPostListResponse, void>({
      query: () => "/blog-posts?populate=*",
      providesTags: ["Blog"],
    }),

    getBlogPostById: build.query<BlogPostResponse, string | number>({
      query: (id) => `/blog-posts/${id}?populate=*`,
      providesTags: (_res, _err, id) => [{ type: "Blog", id }],
    }),

    createBlogPost: build.mutation<BlogPostResponse, CreateBlogPostPayload>({
      query: (payload) => ({
        url: "/blog-posts",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Blog"],
    }),

    updateBlogPost: build.mutation<BlogPostResponse, { id: string | number; payload: CreateBlogPostPayload }>({
      query: ({ id, payload }) => ({
        url: `/blog-posts/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: (_res, _err, { id }) => ["Blog", { type: "Blog", id }],
    }),

    deleteBlogPost: build.mutation<{ id: number }, string | number>({
      query: (id) => ({
        url: `/blog-posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Blog"],
    }),
  }),
})

export const {
  useGetBlogPostsQuery,
  useGetBlogPostByIdQuery,
  useCreateBlogPostMutation,
  useUpdateBlogPostMutation,
  useDeleteBlogPostMutation,
} = blogApi
