import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const API_BASE_URL = import.meta.env.VITE__API_BASE_URL

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
})

export const apiService = createApi({
  baseQuery: baseQuery,
  tagTypes: ["Artists", "Artist"],
  endpoints: () => ({}),
})
