import { apiService } from "./api"

export const artistApi = apiService.injectEndpoints({
  endpoints: (build) => ({
    fetchArtist: build.query<any, { id: string }>({
      query: ({ id }) => ({
        url: `/artists/static/${id}`,
      }),
      providesTags: (result) => ["Artist"],
    }),
    deleteArtist: build.mutation<null, string>({
      query: (artistId) => ({ method: "DELETE", url: `/artists/${artistId}` }),
      invalidatesTags: ["Artists"],
    }),
    deletePainting: build.mutation<
      null,
      { artistId: string; paintingId: string }
    >({
      query: ({ artistId, paintingId }) => ({
        method: "DELETE",
        url: `/artists/${artistId}/paintings/${paintingId}`,
      }),
      invalidatesTags: ["Artist"],
    }),
  }),
})
