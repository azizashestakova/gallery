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

export const Cards: FC<CardsProps> = ({ artists }) => {
  const hasArtists = artists.length > 0

  return (
    <Grid
      as="ul"
      cols={1}
      gap="l"
      breakpoints={{
        768: {
          cols: 2,
          gap: "xl",
        },
        1280: {
          cols: 3,
          gap: "2xl",
        },
      }}
    >
      {hasArtists
        ? artists.map(({ _id, mainPainting, name, yearsOfLife }) => (
            <GridItem className={cx("item")} key={_id} as="li">
              <Link to={`/artists/${_id}`} className={cx("link")}>
                <Card
                  className={cx("card")}
                  imageSet={mainPainting?.image}
                  name={name}
                  yearsOfLife={yearsOfLife}
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
}
