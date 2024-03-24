import { FC } from "react"
import cn from "classnames/bind"
import { Link } from "react-router-dom"

import { Grid, GridItem } from "@consta/uikit/Grid"

import { Card } from "@/components/Card"
import { Skeleton } from "@/components/Skeleton"
import { limit } from "@/constants"

import type { IArtist } from "@/app/models/IArtist"

import styles from "./Cards.module.scss"

const cx = cn.bind(styles)

interface CardsProps {
  artists: IArtist[]
}

export const Cards: FC<CardsProps> = ({ artists }) => (
  <Grid
    as="ul"
    cols={1}
    gap="l"
    breakpoints={{
      768: {
        cols: 2,
        gap: "xl",
      },
      1440: {
        cols: 3,
        gap: "2xl",
      },
    }}
  >
    {artists.length
      ? artists.map(({ _id, mainPainting, name, yearsOfLife }) => (
          <GridItem className={cx("item")} key={_id} as="li">
            <Link to={`/artists/${_id}`} className={cx("link")}>
              <Card
                className={cx("card")}
                imageSet={mainPainting?.image}
                name={name}
                yearsOfLife={yearsOfLife}
                id={_id}
              />
            </Link>
          </GridItem>
        ))
      : Array.from(Array(limit).keys()).map((item) => (
          <GridItem className={cx("item")} key={item} as="li">
            <Skeleton />
          </GridItem>
        ))}
  </Grid>
)
