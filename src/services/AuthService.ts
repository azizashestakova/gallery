import type { AuthDto, AuthResponse, RefreshTokenDto } from "@/app/models/IAuth"

import { apiService } from "./api"

export const authApi = apiService.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation<AuthResponse, AuthDto>({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
    }),

    login: build.mutation<AuthResponse, AuthDto>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),

    refresh: build.mutation<AuthResponse, RefreshTokenDto>({
      query: (body) => ({
        url: "/auth/refresh",
        method: "POST",
        body,
      }),
    }),
  }),
})
