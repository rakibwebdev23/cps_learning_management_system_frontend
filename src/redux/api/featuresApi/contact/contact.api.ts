import { baseApi } from "@/redux/api/baseApi/baseApi"

export interface CreateContactPayload {
  name: string
  email: string
  subject: string
  message: string
}

export const contactApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    submitContact: build.mutation<any, CreateContactPayload>({
      query: (data) => ({
        url: "/contacts",
        method: "POST",
        body: { data },
      }),
    }),
  }),
})

export const { useSubmitContactMutation } = contactApi
