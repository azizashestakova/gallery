import { FC, useContext, useState } from "react"
import cn from "classnames/bind"

import { Grid } from "@consta/uikit/Grid"

import { Cards } from "@/components/Cards"
import { ActionBar } from "@/components/ActionBar"
import { NoMatchResult } from "@/components/NoMatchResult"
import { Search } from "@/components/Search"
import { Button } from "@/components/Button"
import { ModalArtist } from "@/components/ModalArtist"

import { artistsApi } from "@/services/ArtistsService"

import { useAppSelector } from "@/app/hooks"

import { selectIsAuthenticated } from "@/features/auth/authSlice"

import { FilterContext } from "@/context/FilterProvider"

import { IconCustom } from "@/utils/icon"

import PlusIcon from "@/assets/plus.svg"

import styles from "./Artists.module.css"

const cx = cn.bind(styles)

export const Artists: FC = () => {
  const [isOpenModalArtist, setIsOpenModalArtist] = useState(false)
  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  const { filters } = useContext(FilterContext)

  const params = { ...filters, genres: filters.genres?.split(",") }

  const { data: { data: artists = [] } = {} } =
    artistsApi.useFetchAllArtistsQuery({
      isAuthenticated,
      params,
    })

  const isArtistsNotFound = !artists?.length && filters.name

  return (
    <Grid as="article" className={cx("wrapper")}>
      {isAuthenticated ? (
        <ActionBar>
          <Button
            label="Add artist"
            className={cx("button")}
            view="ghost"
            iconLeft={IconCustom(PlusIcon)}
            onClick={() => {
              setIsOpenModalArtist(true)
            }}
          />
          <ModalArtist
            isOpen={isOpenModalArtist}
            setIsOpen={setIsOpenModalArtist}
          />
          <Search />
        </ActionBar>
      ) : null}
      {isArtistsNotFound ? (
        <NoMatchResult text={filters.name} />
      ) : (
        <Cards artists={artists || []} />
      )}
    </Grid>
  )
}
