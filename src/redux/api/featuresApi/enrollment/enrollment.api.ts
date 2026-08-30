import { baseApi } from "@/redux/api/baseApi/baseApi"
import { EnrollmentListResponse, EnrollmentResponse, CreateEnrollmentPayload } from "./enrollment.type"

export interface EnrollmentQueryParams {
  studentId?: string | number
  courseId?: string | number
}

export const enrollmentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getEnrollments: build.query<EnrollmentListResponse, EnrollmentQueryParams | void>({
      query: (params) => ({
        url: "/enrollments",
        method: "GET",
        params: {
          populate: "*",
          ...(params?.studentId && { "filters[student][id][$eq]": params.studentId }),
          ...(params?.courseId && { "filters[course][id][$eq]": params.courseId }),
        },
      }),
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
