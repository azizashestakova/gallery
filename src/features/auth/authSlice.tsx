import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { RootState } from "@/app/store"

interface IAuthSliceState {
  accessToken: string | null
  isAuthenticated: boolean
}

const initialState: IAuthSliceState = {
  accessToken: localStorage.getItem("jwt-access") || null,
  isAuthenticated: localStorage.getItem("jwt-access") ? true : false,
}

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (
      state,
      { payload: { accessToken } }: PayloadAction<{ accessToken: string }>,
    ) => {
      localStorage.setItem("jwt-access", accessToken)

      state.accessToken = accessToken
      state.isAuthenticated = true
    },
    loggedOut: (state) => {
      localStorage.removeItem("jwt-access")

      state.accessToken = null
      state.isAuthenticated = false
    },
  },
})

export const { setAuth, loggedOut } = slice.actions

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated

export default slice.reducer
