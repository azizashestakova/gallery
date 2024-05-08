import type { ImageSet } from "@/app/models/IArtist"
import type { IGenre } from "@/app/models/IGenres"

export interface IField {
  avatar?: ImageSet
  name: string
  yearsOfLife: string
  description: string
  genres: IGenre[]
}
