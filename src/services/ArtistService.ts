import type {
  IArtistsResponse,
  IArtist,
  IArtistParams,
  IArtistResponse,
} from "@/app/models/IArtist"

import { apiService } from "./api"

export const artistApi = apiService.injectEndpoints({
  endpoints: (build) => ({
    fetchAllArtists: build.query<
      IArtistsResponse,
      { isAuthenticated: boolean; params: IArtistParams }
    >({
      query: ({ isAuthenticated, params }) => ({
        url: isAuthenticated ? "/artists" : "/artists/static",
        params,
      }),
      transformResponse: (
        response: IArtist[] | IArtistsResponse,
        _meta,
        { isAuthenticated },
      ): IArtistsResponse =>
        (isAuthenticated ? response : { data: response }) as IArtistsResponse,
      providesTags: ["Artists"],
    }),

    fetchArtist: build.query<IArtistResponse, { id: string }>({
      query: ({ id }) => ({
        url: `/artists/static/${id}`,
      }),
      providesTags: () => ["Artist"],
    }),

    deleteArtist: build.mutation<null, string>({
      query: (artistId) => ({ method: "DELETE", url: `/artists/${artistId}` }),
      invalidatesTags: ["Artists"],
    }),

    createArtist: build.mutation<null, FormData>({
      query: (data) => ({
        method: "POST",
        url: "artists",
        body: data,
      }),
    }),

    editArtist: build.mutation<null, { artistId: string; data: FormData }>({
      query: ({ artistId, data }) => ({
        method: "PUT",
        url: `/artists/${artistId}`,
        body: data,
      }),
      invalidatesTags: ["Artist"],
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
      invalidatesTags: ["Artist"],
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
  }),
})
