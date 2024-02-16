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
}

export interface IPaintings {
  artist: string
  image: ImageSet
  name: string
  yearOfCreation: string
  _id: string
}
