import { api } from "./api"
import { IPost } from "../app/models/IPost"

export const postApi = api.injectEndpoints({
  endpoints: (build) => ({
    fetchAllPosts: build.query<IPost[], number>({
      query: (limit: number = 5) => ({
        url: "/posts",
        params: {
          _limit: limit,
        },
      }),
      providesTags: (result) => ["Post"],
    }),
    createPost: build.mutation<IPost, IPost>({
      query: (post) => ({
        url: "/posts",
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["Post"],
    }),
  }),
})
