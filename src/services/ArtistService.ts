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
    createPainting: build.mutation<null, { artistId: string; data: FormData }>({
      query: ({ artistId, data }) => ({
        method: "POST",
        url: `/artists/${artistId}/paintings`,
        body: data,
      }),
      invalidatesTags: ["Artist", "Artists"],
    }),
    editPainting: build.mutation<
      null,
      { artistId: string; paintingId: string; data: FormData }
    >({
      query: ({ artistId, paintingId, data }) => ({
        method: "PUT",
        url: `/artists/${artistId}/paintings/${paintingId}`,
        body: data,
      }),
      invalidatesTags: ["Artist"],
    }),
    createArtist: build.mutation<null, FormData>({
      query: (data) => ({
        method: "POST",
        url: "artists",
        body: data,
      }),
      invalidatesTags: ["Artists"],
    }),
    editArtist: build.mutation<null, { artistId: string; data: FormData }>({
      query: ({ artistId, data }) => ({
        method: "PUT",
        url: `/artists/${artistId}`,
        body: data,
      }),
      invalidatesTags: ["Artist", "Artists"],
    }),
    editArtistMainPainting: build.mutation<
      null,
      { artistId: string; paintingId: string }
    >({
      query: ({ artistId, paintingId }) => ({
        method: "PATCH",
        url: `/artists/${artistId}/main-painting`,
        body: { mainPainting: paintingId },
      }),
      invalidatesTags: ["Artist", "Artists"],
    }),
  }),
})
