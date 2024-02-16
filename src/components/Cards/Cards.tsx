import { FC } from "react"
import cn from "classnames/bind"
import { Link } from "react-router-dom"

import { Grid, GridItem } from "@consta/uikit/Grid"

import type { IArtist } from "@/app/models/IArtist"

import { Card } from "@/components/Card"
import { Skeleton } from "@/components/Skeleton"

import { limit } from "@/constants"

import styles from "./Cards.module.css"

const cx = cn.bind(styles)

interface CardsProps {
  artists: IArtist[]
}

export const Cards: FC<CardsProps> = ({ artists }) => (
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
    {artists.length
      ? artists.map(({ _id, mainPainting, name, yearsOfLife }) => (
          <GridItem className={cx("item")} key={_id}>
            <Link to={`/artists/${_id}`}>
              <Card
                imageSet={mainPainting?.image}
                name={name}
                yearsOfLife={yearsOfLife}
                id={_id}
              />
            </Link>
          </GridItem>
        ))
      : Array.from(Array(limit).keys()).map((item) => (
          <GridItem className={cx("item")} key={item}>
            <Skeleton />
          </GridItem>
        ))}
  </Grid>
)
