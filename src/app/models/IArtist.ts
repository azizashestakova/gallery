import type { IGenre } from "./IGenres"

export interface ImageSet {
  original: string
  src: string
  src2x: string
  webp: string
  webp2x: string
  _id: string
}

interface IMainPainting {
  artist: string
  image: ImageSet
  name: string
  yearOfCreation: string
  _id: string
}

export interface IArtist {
  _id: string
  mainPainting: IMainPainting
  name: string
  yearsOfLife: string
  genres: string[]
  description: string
}

export interface IArtistMetaResponse {
  count: number
  pageNumber: number
  perPage: number
}

export interface IArtistsResponse {
  data: IArtist[]
  meta: IArtistMetaResponse
}

export interface IPaintings {
  artist: string
  image: ImageSet
  name: string
  yearOfCreation: string
  _id: string
}

export interface IArtistParams {
  sortBy?: string
  name?: string
  orderBy?: "asc" | "desc"
  perPage?: string
  genres?: string[]
  pageNumber?: string
}

interface IPainting {
  artist: string
  image: ImageSet
  _id: string
  name: string
  yearOfCreation: string
}

export interface IArtistResponse {
  avatar: ImageSet
  description: string
  genres: IGenre[]
  mainPainting: IMainPainting
  name: string
  paintings: IPainting[]
  yearsOfLife: string
  _id: string
}
