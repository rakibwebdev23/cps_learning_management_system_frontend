import { baseApi } from "@/redux/api/baseApi/baseApi"
import { QuizListResponse, QuizResponse, CreateQuizPayload } from "./quiz.type"

export const quizApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getQuizzes: build.query<QuizListResponse, { courseId?: string | number } | void>({
      query: (params) => {
        const queryParams = new URLSearchParams()
        if (params?.courseId) queryParams.append("filters[course][id][$eq]", params.courseId.toString())
        queryParams.append("populate", "questions.options")
        return `/quizzes?${queryParams.toString()}`
      },
      providesTags: ["Quiz"],
    }),

    getQuizById: build.query<QuizResponse, string | number>({
      query: (id) => `/quizzes/${id}?populate[questions][populate]=options`,
      providesTags: (_res, _err, id) => [{ type: "Quiz", id }],
    }),

    createQuiz: build.mutation<QuizResponse, CreateQuizPayload>({
      query: (payload) => ({
        url: "/quizzes",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Quiz"],
    }),

    updateQuiz: build.mutation<QuizResponse, { id: string | number; payload: CreateQuizPayload }>({
      query: ({ id, payload }) => ({
        url: `/quizzes/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: (_res, _err, { id }) => ["Quiz", { type: "Quiz", id }],
    }),

    deleteQuiz: build.mutation<{ id: number }, string | number>({
      query: (id) => ({
        url: `/quizzes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Quiz"],
    }),
  }),
})

export const {
  useGetQuizzesQuery,
  useGetQuizByIdQuery,
  useCreateQuizMutation,
  useUpdateQuizMutation,
  useDeleteQuizMutation,
} = quizApi
