import type { ContentItem } from "./types"

export const geItems = (genres: ContentItem[]) => [
  {
    label: "Genres",
    content: genres,
  },
  {
    label: "Sort by",
    content: [
      { name: "A-Z", _id: "asc" },
      { name: "Z-A", _id: "desc" },
    ],
  },
]
