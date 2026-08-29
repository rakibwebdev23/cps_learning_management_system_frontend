import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AuthState, User, LoginResponse } from "./auth.type"

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; accessToken?: string; jwt?: string; refreshToken?: string }>
    ) => {
      state.user = action.payload.user
      state.accessToken = action.payload.accessToken || action.payload.jwt || null
      state.refreshToken = action.payload.refreshToken || null
      state.isAuthenticated = true
    },

    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload
      if (!action.payload) {
        state.isAuthenticated = false
      }
    },

    setAccessToken: (state, action: PayloadAction<string | null>) => {
      state.accessToken = action.payload
      state.isAuthenticated = !!action.payload
    },

    setRefreshToken: (state, action: PayloadAction<string | null>) => {
      state.refreshToken = action.payload
    },

    logout: (state) => {
      state.user = null
      state.accessToken = null
      state.refreshToken = null
      state.isAuthenticated = false
    },
  },
})

export const {
  setCredentials,
  setUser,
  setAccessToken,
  setRefreshToken,
  logout,
} = authSlice.actions

export default authSlice.reducer