import { baseApi } from "@/redux/api/baseApi/baseApi"
import { LoginResponse, RegisterResponse, User } from "./auth.type"

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation<RegisterResponse, Record<string, any>>({
      query: (data) => ({
        url: "/auth/local/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth", "User"],
    }),
    login: build.mutation<LoginResponse, { identifier?: string; email?: string; password: string }>({
      query: (data) => ({
        url: "/auth/local",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth", "User"],
    }),
    getMe: build.query<User, void>({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    updateProfile: build.mutation<User, Partial<User>>({
      query: (data) => ({
        url: "/users/me",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
})

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetMeQuery,
  useUpdateProfileMutation,
} = authApi
