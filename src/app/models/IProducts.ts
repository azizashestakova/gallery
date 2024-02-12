import { IProduct } from "./IProduct"

export interface IProducts {
  limit: number
  products: IProduct[]
  skip: number
  total: number
}
