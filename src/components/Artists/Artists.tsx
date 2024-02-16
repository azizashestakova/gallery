import { FC } from "react"
import cn from "classnames/bind"

import { Grid } from "@consta/uikit/Grid"

import { Cards } from "@/components/Cards"

import { artistsApi } from "@/services/ArtistsService"

import styles from "./Artists.module.css"

const cx = cn.bind(styles)

export const Artists: FC = () => {
  const { data: artists } = artistsApi.useFetchAllArtistsQuery({})

  return (
    <Grid as="article" className={cx("wrapper")}>
      <Cards artists={artists || []} />
    </Grid>
  )
}
