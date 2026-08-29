import { baseApi } from "@/redux/api/baseApi/baseApi"
import { QuizResultListResponse, QuizResultResponse, SubmitQuizPayload } from "./result.type"

export const resultApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getQuizResults: build.query<QuizResultListResponse, { studentId?: string | number } | void>({
      query: (params) => {
        const queryParams = new URLSearchParams()
        if (params?.studentId) queryParams.append("filters[student][id][$eq]", params.studentId.toString())
        queryParams.append("populate", "*")
        return `/quiz-results?${queryParams.toString()}`
      },
      providesTags: ["Result"],
    }),

    getQuizResultById: build.query<QuizResultResponse, string | number>({
      query: (id) => `/quiz-results/${id}?populate=*`,
      providesTags: (_res, _err, id) => [{ type: "Result", id }],
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
