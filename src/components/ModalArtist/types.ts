import type { IGenre } from "@/app/models/IGenres"

export interface IDefaultValues {
  name: string
  yearsOfLife: string
  description: string
  genres: IGenre[]
  avatar: string
}
