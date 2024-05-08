import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react"
import { Mutex } from "async-mutex"
import Cookies from "js-cookie"

import { RootState } from "@/app/store"
import { API_BASE_URL } from "@/constants"
import { loggedOut, setCredentials } from "@/features/auth/authSlice"
import { getFingerprint } from "@/utils/getFingerprint"

import type { AuthResponse } from "@/app/models/IAuth"

const mutex = new Mutex()

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
  await mutex.waitForUnlock()

  let result = await baseQuery(args, api, extraOptions)

  const refreshToken = Cookies.get("jwt-refresh")

  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()

      try {
        const fingerprint = await getFingerprint()

        const refreshResult = await baseQuery(
          {
            url: "/auth/refresh",
            method: "POST",
            body: { refreshToken, fingerprint },
          },
          api,
          extraOptions,
        )

        if (refreshResult.data) {
          api.dispatch(setCredentials(refreshResult.data as AuthResponse))

          result = await baseQuery(args, api, extraOptions)
        } else {
          api.dispatch(loggedOut())
        }
      } finally {
        release()
      }
    } else {
      await mutex.waitForUnlock()

      result = await baseQuery(args, api, extraOptions)
    }
  }

  return result
}

export const apiService = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Artists", "Artist"],
  endpoints: () => ({}),
})
