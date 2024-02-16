import { apiService } from "./api"

export const artistApi = apiService.injectEndpoints({
  endpoints: (build) => ({
    fetchArtist: build.query<any, { id: string }>({
      query: ({ id }) => ({
        url: `/artists/static/${id}`,
      }),
      providesTags: (result) => ["Artist"],
    }),
  }),
})
