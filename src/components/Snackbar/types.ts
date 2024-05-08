export interface Item {
  key: number
  title: string
  text: string
  status: string
}

type Type = "add" | "remove"

export interface IAction {
  type: Type
  item: Item
}
