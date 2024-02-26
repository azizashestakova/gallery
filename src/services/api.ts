import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

import { RootState } from "@/app/store"

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

export const apiService = createApi({
  baseQuery: baseQuery,
  tagTypes: ["Artists", "Artist"],
  endpoints: () => ({}),
})
