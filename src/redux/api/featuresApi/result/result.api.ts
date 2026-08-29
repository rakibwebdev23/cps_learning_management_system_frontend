import { baseApi } from "@/redux/api/baseApi/baseApi"
import { QuizResultListResponse, QuizResultResponse, SubmitQuizPayload } from "./result.type"

export interface ResultQueryParams {
  studentId?: string | number
}

export const resultApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getQuizResults: build.query<QuizResultListResponse, ResultQueryParams | void>({
      query: (params) => ({
        url: "/quiz-results",
        method: "GET",
        params: {
          populate: "*",
          ...(params?.studentId && { "filters[student][id][$eq]": params.studentId }),
        },
      }),
      providesTags: ["Result"],
    }),

    getQuizResultById: build.query<QuizResultResponse, { id: string | number }>({
      query: ({ id }) => ({
        url: `/quiz-results/${id}`,
        method: "GET",
        params: { populate: "*" },
      }),
      providesTags: (_res, _err, { id }) => [{ type: "Result", id }],
    }),

    submitQuizResult: build.mutation<QuizResultResponse, SubmitQuizPayload>({
      query: (payload) => ({
        url: "/quiz-results",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Result"],
    }),
  }),
})

export const {
  useGetQuizResultsQuery,
  useGetQuizResultByIdQuery,
  useSubmitQuizResultMutation,
} = resultApi
