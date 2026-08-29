import { baseApi } from "@/redux/api/baseApi/baseApi"
import { LessonListResponse, LessonResponse, CreateLessonPayload } from "./lesson.type"

export const lessonApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getLessons: build.query<LessonListResponse, { courseId?: string | number } | void>({
      query: (params) => {
        const queryParams = new URLSearchParams()
        if (params?.courseId) queryParams.append("filters[course][id][$eq]", params.courseId.toString())
        queryParams.append("populate", "*")
        return `/lessons?${queryParams.toString()}`
      },
      providesTags: ["Lesson"],
    }),

    getLessonById: build.query<LessonResponse, string | number>({
      query: (id) => `/lessons/${id}?populate=*`,
      providesTags: (_res, _err, id) => [{ type: "Lesson", id }],
    }),

    createLesson: build.mutation<LessonResponse, CreateLessonPayload>({
      query: (payload) => ({
        url: "/lessons",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Lesson"],
    }),

    updateLesson: build.mutation<LessonResponse, { id: string | number; payload: CreateLessonPayload }>({
      query: ({ id, payload }) => ({
        url: `/lessons/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: (_res, _err, { id }) => ["Lesson", { type: "Lesson", id }],
    }),

    deleteLesson: build.mutation<{ id: number }, string | number>({
      query: (id) => ({
        url: `/lessons/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Lesson"],
    }),
  }),
})

export const {
  useGetLessonsQuery,
  useGetLessonByIdQuery,
  useCreateLessonMutation,
  useUpdateLessonMutation,
  useDeleteLessonMutation,
} = lessonApi
