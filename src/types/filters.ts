import type { IArtistParams } from "@/app/models/IArtist"

export type Filters = { genres?: string } & Omit<IArtistParams, "genres"> &
  Record<string, string | string[]> // TODO:: проверить получчится ли выбрать несколько жанров
