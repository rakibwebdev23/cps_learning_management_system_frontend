import { baseApi } from "@/redux/api/baseApi/baseApi"
import { QuizListResponse, QuizResponse, CreateQuizPayload } from "./quiz.type"

export interface QuizQueryParams {
  courseId?: string | number
}

export const quizApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getQuizzes: build.query<QuizListResponse, QuizQueryParams | void>({
      query: (params) => ({
        url: "/quizzes",
        method: "GET",
        params: {
          populate: "questions.options",
          ...(params?.courseId && { "filters[course][id][$eq]": params.courseId }),
        },
      }),
      providesTags: ["Quiz"],
    }),

    getQuizById: build.query<QuizResponse, { id: string | number }>({
      query: ({ id }) => ({
        url: `/quizzes/${id}`,
        method: "GET",
        params: { "populate[questions][populate]": "options" },
      }),
      providesTags: (_res, _err, { id }) => [{ type: "Quiz", id }],
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

    deleteQuiz: build.mutation<{ id: number }, { id: string | number }>({
      query: ({ id }) => ({
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
