import {
  MutationActionCreatorResult,
  MutationDefinition,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query"

import type { IArtistResponse } from "@/app/models/IArtist"

import { MenuItem } from "./types"

export const menu = (
  setIsOpenModalDelete: (value: boolean) => void,
  setIsOpen: (value: boolean) => void,
  setIsShowGear: (value: boolean) => void,
  setIsOpenModalPaintings: (value: boolean) => void,
  paintingId: string,
  //TODO:: отредактировать ts
  editMainPainting: {
    (arg: {
      artistId: string
      paintingId: string
    }): MutationActionCreatorResult<
      MutationDefinition<
        { artistId: string; paintingId: string },
        BaseQueryFn<
          string | FetchArgs,
          unknown,
          FetchBaseQueryError,
          object,
          FetchBaseQueryMeta
        >,
        "Artists" | "Artist",
        null,
        "api"
      >
    >
    (arg0: { artistId: string; paintingId: string }): void
  },
  artistId: string,
  artist?: IArtistResponse,
): MenuItem[] => [
  {
    as: "button",
    text: "Delete",
    onClick: () => {
      setIsOpenModalDelete(true)
      setIsOpen(false)
      setIsShowGear(false)
    },
  },
  {
    as: "button",
    text: "Edit",
    onClick: () => {
      setIsOpenModalPaintings(true)
      setIsOpen(false)
      setIsShowGear(false)
    },
  },
  {
    as: "button",
    text:
      artist?.mainPainting?._id === paintingId
        ? "Remove the cover"
        : "Make the cover",
    onClick: () => {
      editMainPainting({ artistId, paintingId })
      setIsOpen(false)
    },
  },
]
