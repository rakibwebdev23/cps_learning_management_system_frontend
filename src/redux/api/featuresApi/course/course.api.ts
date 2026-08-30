import { baseApi } from "@/redux/api/baseApi/baseApi"
import { CourseListResponse, CourseResponse, CreateCoursePayload } from "./course.type"

export interface CourseQueryParams {
  page?: number
  pageSize?: number
  search?: string
}

export const courseApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCourses: build.query<CourseListResponse, CourseQueryParams | void>({
      query: (params) => ({
        url: "/courses",
        method: "GET",
        params: {
          ...(params?.page && { "pagination[page]": params.page }),
          ...(params?.pageSize && { "pagination[pageSize]": params.pageSize }),
          ...(params?.search && { "filters[title][$contains]": params.search }),
        },
      }),
      providesTags: ["Course"],
    }),

    getCourseById: build.query<CourseResponse, { id: string | number }>({
      query: ({ id }) => ({
        url: `/courses/${id}`,
        method: "GET",
        params: { populate: "*" },
      }),
      providesTags: (_result, _err, { id }) => [{ type: "Course", id }],
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

    deleteCourse: build.mutation<{ id: number }, { id: string | number }>({
      query: ({ id }) => ({
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
