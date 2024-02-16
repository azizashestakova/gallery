import { apiService } from "./api"

import { IArtist } from "@/app/models/IArtist"

export const artistsApi = apiService.injectEndpoints({
  endpoints: (build) => ({
    fetchAllArtists: build.query<IArtist[], any>({
      query: () => ({
        url: "/artists/static",
      }),
      providesTags: (result) => ["Artists"],
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
