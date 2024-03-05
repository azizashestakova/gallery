import { apiService } from "./api"

import type {
  IArtistResponse,
  IArtist,
  IArtistParams,
} from "@/app/models/IArtist"

export const artistsApi = apiService.injectEndpoints({
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

    createPost: build.mutation<any, any>({
      query: (post) => ({
        url: "/posts",
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["Artists"],
    }),
  }),
})
