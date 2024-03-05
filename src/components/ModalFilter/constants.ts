export type ContentItem = {
  name: string
  _id: string
}

type Item = {
  label: string
  content: ContentItem[]
}

export const geItems = (genres: ContentItem[]): Item[] => [
  {
    label: "Genres",
    content: genres,
  },
  {
    label: "Sort by",
    content: [
      // { name: "Recently added", _id: "recently" }, // TODO:: какой id?
      { name: "A-Z", _id: "asc" },
      { name: "Z-A", _id: "desc" },
    ],
  },
]
