import { apiService } from "./api"

import type {
  IArtistResponse,
  IArtist,
  IArtistParams,
} from "@/app/models/IArtist"

export const artistApi = apiService.injectEndpoints({
  endpoints: (build) => ({
    fetchAllArtists: build.query<
      IArtistResponse,
      { isAuthenticated: boolean; params: IArtistParams }
    >({
      query: ({ isAuthenticated, params }) => {
        console.log("params", params)
        return {
          url: isAuthenticated ? "/artists" : "/artists/static",
          params,
        }
      },
      transformResponse: (
        response: IArtist[] | IArtistResponse,
        meta,
        { isAuthenticated },
      ): IArtistResponse =>
        (isAuthenticated ? response : { data: response }) as IArtistResponse,
      providesTags: ["Artists"],
    }),
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
