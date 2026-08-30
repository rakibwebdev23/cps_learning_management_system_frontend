import { baseApi } from "@/redux/api/baseApi/baseApi"
import { User, UserListResponse } from "./user.type"

export interface UserQueryParams {
  role?: string
}

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<User[], UserQueryParams | void>({
      query: (params) => ({
        url: "/users",
        method: "GET",
        params: {
          populate: "role",
          ...(params?.role && { "filters[role][name][$eqi]": params.role }),
        },
      }),
      providesTags: ["User"],
    }),

    getUserById: build.query<User, { id: string | number }>({
      query: ({ id }) => ({
        url: `/users/${id}`,
        method: "GET",
        params: { populate: "role" },
      }),
      providesTags: (_res, _err, { id }) => [{ type: "User", id }],
    }),

    createUser: build.mutation<User, Partial<User>>({
      query: (payload) => ({
        url: "/users",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["User"],
    }),

    updateUser: build.mutation<User, { id: string | number; payload: Partial<User> }>({
      query: ({ id, payload }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: (_res, _err, { id }) => ["User", { type: "User", id }],
    }),

    deleteUser: build.mutation<User, { id: string | number }>({
      query: ({ id }) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
})

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi
