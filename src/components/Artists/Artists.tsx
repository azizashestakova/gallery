import { FC, useContext } from "react"
import cn from "classnames/bind"

import { Grid } from "@consta/uikit/Grid"

import { useAppSelector } from "@/app/hooks"
import { ActionBar } from "@/components/ActionBar"
import { ArtistAddButton } from "@/components/ArtistAddButton"
import { Cards } from "@/components/Cards"
import { NoMatchResult } from "@/components/NoMatchResult"
import { Pagination } from "@/components/Pagination"
import { Search } from "@/components/Search"
import { limit } from "@/constants"
import { FilterContext } from "@/context/FilterProvider"
import { selectIsAuthenticated } from "@/features/auth/authSlice"
import { artistApi } from "@/services/ArtistService"

import styles from "./Artists.module.scss"

const cx = cn.bind(styles)

export const Artists: FC = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  const { filters, changeFilters } = useContext(FilterContext)

  const params = { ...filters, genres: filters.genres?.split(",") }

  const { data: { data: artists = [], meta } = {} } =
    artistApi.useFetchAllArtistsQuery({
      isAuthenticated,
      params,
    })

  const changePagination = (number: number) => {
    changeFilters({
      ...filters,
      pageNumber: `${number}`,
    })
  }

  const textNoMatchResult =
    filters.name && filters.genres
      ? `${filters.name} and genres`
      : filters.name || "genres"

  const isArtistsNotFound = !artists?.length && (filters.name || filters.genres)

  const hasPaginations = isAuthenticated && meta && meta.count > limit

  return (
    <Grid as="article" className={cx("wrapper")}>
      {isAuthenticated && (
        <ActionBar>
          <ArtistAddButton />
          <Search />
        </ActionBar>
      )}

      {isArtistsNotFound ? (
        <NoMatchResult text={textNoMatchResult} />
      ) : (
        <Cards artists={artists} />
      )}

      <Pagination
        totalPosts={meta?.count || 0}
        onChangePagination={changePagination}
        page={Number(filters.pageNumber)}
        hasPaginations={hasPaginations}
      />
    </Grid>
  )
}
