import { createSlice, isAnyOf } from "@reduxjs/toolkit"

import { artistApi } from "@/services/ArtistService"
import { genresApi } from "@/services/GenresServices"
import { authApi } from "@/services/AuthService"
import { apiService } from "@/services/api"

import type { IErrorResponse } from "@/app/models/IError"

interface INotificationSliceState {
  message: string | null
}

const initialState: INotificationSliceState = {
  message: null,
}

const slice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    deleteNotification(store) {
      store.message = null
    },
  },
  extraReducers: (builder) => {
    const endpoints = {
      ...artistApi.endpoints,
      ...genresApi.endpoints,
      ...authApi.endpoints,
    }

    const matchRejectedEndpoints = Object.keys(apiService.endpoints).map(
      (key) => endpoints[key as keyof typeof endpoints].matchRejected,
    )

    builder.addMatcher(
      isAnyOf(...matchRejectedEndpoints),
      (state, { payload }) => {
        state.message = (payload?.data as unknown as IErrorResponse).message
      },
    )
  },
})

export const { deleteNotification } = slice.actions

export default slice.reducer
