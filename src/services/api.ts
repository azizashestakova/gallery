import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const baseQuery = fetchBaseQuery({
  baseUrl: "https://jsonplaceholder.typicode.com/",
})

export const api = createApi({
  baseQuery: baseQuery,
  tagTypes: ["Post"],
  endpoints: () => ({}),
})
