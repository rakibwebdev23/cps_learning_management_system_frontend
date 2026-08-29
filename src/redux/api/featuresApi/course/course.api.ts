import { baseApi } from "@/redux/api/baseApi/baseApi"
import { CourseListResponse, CourseResponse, CreateCoursePayload } from "./course.type"

export const courseApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCourses: build.query<CourseListResponse, { page?: number; pageSize?: number; search?: string } | void>({
      query: (params) => {
        const queryParams = new URLSearchParams()
        if (params?.page) queryParams.append("pagination[page]", params.page.toString())
        if (params?.pageSize) queryParams.append("pagination[pageSize]", params.pageSize.toString())
        if (params?.search) queryParams.append("filters[title][$contains]", params.search)
        queryParams.append("populate", "*")
        return `/courses?${queryParams.toString()}`
      },
      providesTags: ["Course"],
    }),

    getCourseById: build.query<CourseResponse, string | number>({
      query: (id) => `/courses/${id}?populate=*`,
      providesTags: (_result, _err, id) => [{ type: "Course", id }],
    }),

    createCourse: build.mutation<CourseResponse, CreateCoursePayload>({
      query: (payload) => ({
        url: "/courses",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Course"],
    }),

    updateCourse: build.mutation<CourseResponse, { id: string | number; payload: CreateCoursePayload }>({
      query: ({ id, payload }) => ({
        url: `/courses/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: (_result, _err, { id }) => ["Course", { type: "Course", id }],
    }),

    deleteCourse: build.mutation<{ id: number }, string | number>({
      query: (id) => ({
        url: `/courses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Course"],
    }),
  }),
})

export const {
  useGetCoursesQuery,
  useGetCourseByIdQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
} = courseApi
