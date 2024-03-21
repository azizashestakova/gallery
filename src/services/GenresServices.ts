import type { IGenre } from "@/app/models/IGenres"

import { apiService } from "./api"

export const genresApi = apiService.injectEndpoints({
  endpoints: (build) => ({
    fetchGenres: build.query<IGenre[], null>({
      query: () => ({
        url: "/genres",
      }),
    }),
  }),
})
