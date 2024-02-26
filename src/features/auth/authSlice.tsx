import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { RootState } from "@/app/store"

type AuthState = {
  accessToken: string | null
  isAuthenticated: boolean
}

const slice = createSlice({
  name: "auth",
  initialState: {
    accessToken: localStorage.getItem("jwt-access") || null,
    isAuthenticated: localStorage.getItem("jwt-access") ? true : false,
  } as AuthState,
  reducers: {
    setAuth: (
      state,
      { payload: { accessToken } }: PayloadAction<{ accessToken: string }>,
    ) => {
      localStorage.setItem("jwt-access", accessToken)

      state.accessToken = accessToken
      state.isAuthenticated = true
    },
    removeAuth: (state) => {
      localStorage.removeItem("jwt-access")

      state.accessToken = null
      state.isAuthenticated = false
    },
  },
})

export const { setAuth, removeAuth } = slice.actions

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated

export default slice.reducer
