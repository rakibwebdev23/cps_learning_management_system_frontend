import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { RootState } from "@/redux/store"

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "https://cps-lms.up.railway.app/api",
    credentials: "include",

    prepareHeaders: (headers, { getState }) => {
      let token = (getState() as RootState).auth?.accessToken

      if (!token && typeof document !== "undefined") {
        const match = document.cookie
          .split("; ")
          .find((row) => row.startsWith("accessToken=") || row.startsWith("access=") || row.startsWith("jwt="))
        token = match?.split("=")[1] ?? null
      }

      if (token) {
        headers.set("Authorization", `Bearer ${token}`)
      }

      return headers
    },
  }),
  tagTypes: ["Auth", "User", "Course", "Lesson", "Quiz", "Question", "Option", "Result", "Enrollment", "Blog", "LessonProgress"],
  endpoints: () => ({}),
})