import { FC } from "react"
import cn from "classnames/bind"

import { Grid, GridItem } from "@consta/uikit/Grid"

import type { IArtist } from "@/app/models/IArtist"

import { Card } from "@/components/Card"
import { Skeleton } from "@/components/Skeleton"

import { limit } from "@/constants"

import styles from "./Cards.module.css"

const cx = cn.bind(styles)

interface CardsProps {
  artists: IArtist[]
  isLoading: boolean
}

export const Cards: FC<CardsProps> = ({ artists, isLoading }) => (
  <Grid
    cols={1}
    gap="l"
    breakpoints={{
      576: {
        cols: 2,
        gap: "xl",
      },
      1024: {
        cols: 3,
        gap: "2xl",
      },
    }}
  >
    {isLoading && artists.length
      ? artists.map(({ _id, mainPainting, name, yearsOfLife }) => (
          <GridItem className={cx("item")} key={_id}>
            <Card
              mainPainting={mainPainting}
              name={name}
              yearsOfLife={yearsOfLife}
            />
          </GridItem>
        ))
      : Array.from(Array(limit).keys()).map((item) => (
          <GridItem className={cx("item")} key={item}>
            <Skeleton />
          </GridItem>
        ))}
  </Grid>
)
