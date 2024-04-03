import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import Cookies from "js-cookie"

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
    setCredentials: (
      state,
      {
        payload: { accessToken, refreshToken },
      }: PayloadAction<{ accessToken: string; refreshToken: string }>, //
    ) => {
      localStorage.setItem("jwt-access", accessToken)

      Cookies.set("jwt-refresh", refreshToken)

      state.accessToken = accessToken
      state.isAuthenticated = true
    },

    loggedOut: (state) => {
      localStorage.removeItem("jwt-access")

      Cookies.remove("jwt-refresh")

      state.accessToken = null
      state.isAuthenticated = false
    },
  },
})

export const { setCredentials, loggedOut } = slice.actions

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated

export default slice.reducer
