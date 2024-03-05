import { apiService } from "./api"

import type { IGenre } from "@/app/models/IGenres"

export const genresApi = apiService.injectEndpoints({
  endpoints: (build) => ({
    fetchGenres: build.query<IGenre[], null>({
      query: () => ({
        url: "/genres",
      }),
    }),
  }),
})
