import { FC, useContext, useState } from "react"
import cn from "classnames/bind"

import { Grid } from "@consta/uikit/Grid"

import { Cards } from "@/components/Cards"
import { ActionBar } from "@/components/ActionBar"
import { NoMatchResult } from "@/components/NoMatchResult"
import { Search } from "@/components/Search"
import { Button } from "@/components/Button"
import { ModalArtist } from "@/components/ModalArtist"
import { Pagination } from "@/components/Pagination"

import { artistApi } from "@/services/ArtistService"

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

  const { filters, changeFilters } = useContext(FilterContext)

  const params = { ...filters, genres: filters.genres?.split(",") }

  const { data: { data: artists = [], meta } = {} } =
    artistApi.useFetchAllArtistsQuery({
      isAuthenticated,
      params,
    })

  const isArtistsNotFound = !artists?.length && (filters.name || filters.genres)

  const paginationChange = (number: number) => {
    changeFilters({
      ...filters,
      pageNumber: `${number}`,
    })
  }

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
        <NoMatchResult
          text={
            filters.name && filters.genres
              ? `${filters.name} and genres`
              : filters.name || "genres"
          }
        />
      ) : (
        <Cards artists={artists} />
      )}
      {isAuthenticated && meta && (
        <Pagination
          totalPosts={meta.count}
          paginationChange={paginationChange}
          page={Number(filters.pageNumber)}
        />
      )}
    </Grid>
  )
}
