import { api } from "./api"

import { IProducts } from "@/app/models/IProducts"

export const postApi = api.injectEndpoints({
  endpoints: (build) => ({
    fetchAllPosts: build.query<IProducts, any>({
      query: ({ limit, skip }) => ({
        url: "",
        params: {
          limit: limit,
          skip: skip,
        },
      }),
      providesTags: (result) => ["Post"],
    }),
    createPost: build.mutation<any, any>({
      query: (post) => ({
        url: "/posts",
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["Post"],
    }),
  }),
})
