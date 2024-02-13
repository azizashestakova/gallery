interface Image {
  original: string
  src: string
  src2x: string
  webp: string
  webp2x: string
  _id: string
}

export interface IMainPainting {
  artist: string
  image: Image
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
