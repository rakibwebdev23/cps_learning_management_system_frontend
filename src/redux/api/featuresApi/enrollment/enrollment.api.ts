import { baseApi } from "@/redux/api/baseApi/baseApi"
import { EnrollmentListResponse, EnrollmentResponse, CreateEnrollmentPayload } from "./enrollment.type"

export const enrollmentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getEnrollments: build.query<EnrollmentListResponse, { studentId?: string | number } | void>({
      query: (params) => {
        const queryParams = new URLSearchParams()
        if (params?.studentId) queryParams.append("filters[student][id][$eq]", params.studentId.toString())
        queryParams.append("populate", "*")
        return `/enrollments?${queryParams.toString()}`
      },
      providesTags: ["Enrollment"],
    }),

    createEnrollment: build.mutation<EnrollmentResponse, CreateEnrollmentPayload>({
      query: (payload) => ({
        url: "/enrollments",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Enrollment", "Course"],
    }),

    updateEnrollmentStatus: build.mutation<EnrollmentResponse, { id: string | number; status: "active" | "completed" | "dropped" }>({
      query: ({ id, status }) => ({
        url: `/enrollments/${id}`,
        method: "PUT",
        body: { data: { status } },
      }),
      invalidatesTags: ["Enrollment"],
    }),
  }),
})

export const {
  useGetEnrollmentsQuery,
  useCreateEnrollmentMutation,
  useUpdateEnrollmentStatusMutation,
} = enrollmentApi
