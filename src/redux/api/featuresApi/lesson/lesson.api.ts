import { baseApi } from "@/redux/api/baseApi/baseApi"
import { LessonListResponse, LessonResponse, CreateLessonPayload } from "./lesson.type"

export interface LessonQueryParams {
  courseId?: string | number
}

export const lessonApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getLessons: build.query<LessonListResponse, LessonQueryParams | void>({
      query: (params) => ({
        url: "/lessons",
        method: "GET",
        params: {
          populate: "*",
          ...(params?.courseId && { "filters[course][id][$eq]": params.courseId }),
        },
      }),
      providesTags: ["Lesson"],
    }),

    getLessonById: build.query<LessonResponse, { id: string | number }>({
      query: ({ id }) => ({
        url: `/lessons/${id}`,
        method: "GET",
        params: { populate: "*" },
      }),
      providesTags: (_res, _err, { id }) => [{ type: "Lesson", id }],
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

    deleteLesson: build.mutation<{ id: number }, { id: string | number }>({
      query: ({ id }) => ({
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
