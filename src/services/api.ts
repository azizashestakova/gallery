import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react"

import { RootState } from "@/app/store"

import { loggedOut, setAuth } from "@/features/auth/authSlice"

const API_BASE_URL = import.meta.env.VITE__API_BASE_URL

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const accessToken = (getState() as RootState).auth.accessToken

    if (accessToken) {
      headers.set("authorization", `Bearer ${accessToken}`)
    }

    return headers
  },
})

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  console.log("api", api)

  if (result.error && result.error.status === 401) {
    // const refreshResult = await baseQuery("/auth/refresh", api, extraOptions)
    const refreshResult = await baseQuery(
      {
        url: "/auth/refresh",
        method: "POST",
        body: {
          refreshToken: localStorage.getItem("refreshToken"),
        },
      },
      api,
      extraOptions,
    )

    console.log("refreshResult", refreshResult)

    if (refreshResult.data) {
      // api.dispatch(setAuth(refreshResult.data))

      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(loggedOut())
    }
  }
  return result
}

export const apiService = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Artists", "Artist"],
  endpoints: () => ({}),
})
